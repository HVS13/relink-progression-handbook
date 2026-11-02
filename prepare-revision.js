const fs=require('node:fs');
const baseline=require('./baseline-data.json');
const profiles=require('./revision-content.js');
const display=require('./research/display.json');
const levels=require('./research/levels.json');
const writtenPools=require('./research/master-pools.json');
const skillCatalog=require('./research/skill-catalog-0.json').characters;
const weaponNames=require('./research/logs-weapons.json');
const weaponLevels=require('./research/logs-weapon-transcendence.json');
const weaponTraits=require('./research/logs-weapon-traits.json');
const transmarvel=require('./research/logs-transmarvel-pool.json');
const sigilNames=require('./research/logs-sigils.json');
const styles=['Insight','Essence','Crux'];
function clean(s){
 return String(s||'').replace(/(?:\{icon:1700\}){1,3}/g,m=>String(m.match(/\{icon:1700\}/g).length)).replace(/\{(icon|status):(\d+)(?:\.\d+)?\}/g,(token,type,id,offset,source)=>{
  if(type==='icon'&&id==='3')return '[Y]';
  if(type==='icon'&&id==='4')return '[X]';
  const meta=type==='status'?display.statusCatalog[id]:display.textIcons[id];
  const label=type==='status'?meta?.name:(['button','rank','status'].includes(meta?.band)?meta.label:'');
  if(!label)return '';
  const before=source.slice(0,offset).trimEnd().toLowerCase();
  return before.endsWith(label.toLowerCase())||before.endsWith(label.toLowerCase()+"'s")?'':label;
 }).replace(/\s+/g,' ').trim();
}
const game={};
for(const c of baseline.CHARS){
 const p=profiles[c.slug]; const raw=JSON.parse(fs.readFileSync(`research/${p.id}.json`));const pools={};
 for(const st of styles)pools[st]={pools:{rank1:[],rank2:[],rank3:[],EX:[]},perks:{}};
 for(const [id,n] of Object.entries(raw)){
  if(!n.text)continue;const st={SB_DEF:'Insight',SB_ATK:'Essence',SB_LIMIT:'Crux'}[n.board];if(!st)continue;
  const node={id,text:clean(n.text).replace(/^(Insight|Essence|Crux) ([123]):/,'$1 Rank $2:'),row:n.row,col:n.col};
  if(n.rankRow!==undefined)pools[st].perks[n.group]={id,text:clean(n.text),name:n.name};
  else if(n.cost===50)pools[st].pools[n.group].push(node);
 }
 for(const st of styles)for(const [group,a] of Object.entries(pools[st].pools)){
  a.sort((x,y)=>x.row-y.row||x.col-y.col);
  const anchor=({captain:'gran',seofon:'seofon-siete',tweyen:'tweyen-song'})[c.slug]||c.slug;
  const reference=writtenPools[anchor+'-'+st.toLowerCase()];
  const referenceGroup=reference&&Object.entries(reference).find(([label])=>new RegExp('Style Rank\\s*'+(group==='EX'?'EX':group.slice(-1))+'(?:\\b|\\s)').test(label))?.[1];
  a.forEach((n,i)=>{
   if(!new RegExp('^'+st+' Rank\\s*:').test(n.text))return;
   const rank=referenceGroup?.length===a.length&&referenceGroup[i].match(new RegExp('^'+st+'\\s+Rank\\s+(?:Perk\\s*)?([123])'))?.[1];
   n.text=n.text.replace(new RegExp('^'+st+' Rank\\s*:'),st+(rank?' Rank '+rank+':':' style perk:'));
  });
 }
 // Cygames' 2.0.5 patch overrides the older localization in the extracted table.
 if(c.slug==='fediel')pools.Insight.perks.rank2.text=pools.Insight.perks.rank2.text.replace('max lvl 10','max lvl 5')+' [Updated by official patch 2.0.5.]';
 game[c.slug]=pools;
}
// Fixed editorial selections are versioned explicitly; rebuilding does not re-rank nodes.
const reviewed=require('./master-selections.json');
const progression=require('./progression-content.js');
const selections={};
for(const c of baseline.CHARS){
 if(!progression[c.slug])throw Error('Missing progression '+c.slug);
 selections[c.slug]={};
 for(const main of styles){
  selections[c.slug][main]={};
  for(const rank of ['rank1','rank2','rank3','EX']){
   const selected=reviewed[c.slug]?.[main]?.[rank];
   if(!selected||(rank==='EX'?(selected.length<19||selected.length>20):selected.length!==10)||new Set(selected.map(n=>n.id)).size!==selected.length)throw Error('Invalid explicit allocation '+c.slug+'/'+main+'/'+rank);
   const all=styles.flatMap(st=>game[c.slug][st].pools[rank].map(n=>({...n,style:st})));
   for(const n of selected)if(!all.some(a=>a.id===n.id&&a.style===n.style))throw Error('Node not in source pool '+n.id);
   selections[c.slug][main][rank]=all.map(n=>{
    const pick=selected.find(x=>x.id===n.id);
    const healing=/(Panacea|Heal|Reinforce|Stave of Divinity).*instead of healing HP/.test(n.text);
    const category=/per Attack-type/.test(n.text);
    const risky=/while inflicted with|Debuffs on self|Max HP -|Summon Cost [+-]1/i.test(n.text);
    return {id:n.id,style:n.style,take:Boolean(pick),why:pick?pick.why:category?'Not selected: this primary-category effect is not a useful contribution to the displayed gear. An EX point may remain unspent instead of buying a zero-effect node.':healing?'Not selected: preserves HP recovery instead of converting it to Shield.':risky?'Not selected: self-debuff, maximum-HP or Summon-cost trade-off is outside this progression plan.':'Not selected in this fixed loadout. Compare its printed condition with the equipped skills; changing a node must preserve the rank budget and specialization unlock.'};
   });
  }
 }
}
const traitMeta={};
for(const [id,m]of Object.entries(display.traitOrder)){const l=levels[id];traitMeta[m.name]={category:m.category,summary:clean(l?.summary),max:l?.maxLevel||15,effect:clean(l?.levels?.at(-1)?.t)};}
traitMeta.Health=traitMeta.HP;
const weapons={};
for(const c of baseline.CHARS){
 const p=profiles[c.slug];
 const variants=(c.slug==='captain'?['pl0000','pl0100']:[p.id]).map(chara=>{
  const candidates=Object.entries(weaponNames).filter(([id,w])=>new RegExp('^WEP_'+chara.toUpperCase()+'_\\d{2}$').test(w.key)&&weaponLevels[id]&&['HP','Greater Aegis'].includes(display.traitOrder[weaponTraits[id]?.[0]?.id]?.name));
  if(candidates.length!==1)throw Error('Ambiguous Defender: '+chara);
  const [id,w]=candidates[0],curves=weaponLevels[id];
  return {id,key:w.key,name:w.text,primary:display.traitOrder[weaponTraits[id][0].id].name,levels:curves.map(x=>Math.max(...x.levels))};
 });
 weapons[c.slug]=variants;
 c.defender=variants.map((w,i)=>w.name+(variants.length===2?(i===0?' (Gran)':' (Djeeta)'):'')).join(' / ');
 for(const [style,[skills]]of Object.entries(p.styles))for(const skill of skills)if(!skillCatalog[p.id.replace('pl','Pl')].some(s=>s.name===skill))throw Error('Invalid skill: '+c.slug+'/'+style+'/'+skill);
}
const awakenings={};
for(const [slug,p]of Object.entries(profiles)){
 const fixed=transmarvel.sigils.flatMap(s=>s.fixedPairs.map(pair=>({main:display.traitOrder[s.trait]?.name,secondary:display.traitOrder[pair.trait2]?.name,item:sigilNames[pair.sigilId]?.text})));
 const match=fixed.find(x=>p.unique.includes(x.main)&&p.unique.includes(x.secondary));
 if(match)awakenings[slug]=match;
}
const uniqueRolls={};
const uniqueNames=new Set([...Object.values(profiles).flatMap(p=>p.unique),"Veteran's Vision"]);
for(const row of transmarvel.sigils){
 const name=display.traitOrder[row.trait]?.name;
 if(uniqueNames.has(name))uniqueRolls[name]={item:sigilNames[row.sigilId]?.text,secondaries:(transmarvel.trait2Lots[row.trait2Lot]||[]).map(id=>display.traitOrder[id]?.name).filter(Boolean)};
}
const synthesizable=require('./research/logs-synthesis-traits.json').map(id=>display.traitOrder[id]?.name).filter(Boolean);
if(synthesizable.includes('HP'))synthesizable.push('Health');
const payload={CHARS:baseline.CHARS,STAGES:baseline.STAGES,PROFILES:profiles,GAME:game,ALLOC:selections,TRAITS:traitMeta,WEAPONS:weapons,AWAKENINGS:awakenings,UNIQUE_ROLLS:uniqueRolls,SYNTHESIZABLE:synthesizable,PROGRESSION:progression,EQUIPMENT_EVIDENCE:require('./equipment-evidence.json')};
fs.writeFileSync('revision-data.json',JSON.stringify(payload));
console.log(`Prepared ${baseline.CHARS.length} character profiles, ${Object.values(game).reduce((n,x)=>n+Object.keys(x).length,0)} styles and legal 10/10/10/20 node allocations.`);
