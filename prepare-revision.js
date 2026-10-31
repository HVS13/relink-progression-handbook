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
const norm=s=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
const selections={};
const coreActions={pl0000:['Power Raise'],pl0200:['Pactstrike','Ares'],pl0300:["Bull's Eye Blast"],pl0400:['Stargaze'],pl0500:['Grenades','Charged Attacks'],pl0600:['Rose Attacks'],pl0700:['Pets','Onslaught'],pl0800:['Perfect Finishers'],pl0900:['Beatdown'],pl1000:['Schlacht'],pl1100:['Perfect Strikes','Perfect Executions'],pl1200:['Noble Stance'],pl1300:['Combo Finishers'],pl1400:['Dawnfly','Freeflutter'],pl1500:['Raging Fist'],pl1600:['Arvess Hammer','Loop Combos'],pl1700:['Grynoth','Charged Attacks'],pl1800:['Collapse'],pl1900:['Godmight','Dragonform'],pl2100:['Chromatic Wings','Zohar Strike'],pl2200:['Avatar Finishers'],pl2300:['Multilock Hail','Power Finishers','Charged Attacks'],pl2400:['Turbine'],pl2500:['Blade Dance'],pl2600:['Delta Clock'],pl2700:['Grade II','Grade III','Grade IV'],pl2800:['Flip Kick'],pl2900:['Miasma Hands','Voidskip','Sphere of Reversal']};
function score(node,st,main,p,group){
 const t=norm(node.text);const skills=p.styles[main][0].map(norm);let score=0;let why='Flexible stat/utility choice for this preset.';
 const reject=/while inflicted with|debuffs on self|max hp -|summon cost [+-]1|flight over fight|can no longer be extended/.test(t)||(p.id==='pl1600'&&node.id==='7b0c5482');
 if(reject)return {score:-10000,why:'Skip: conditional self-debuff, HP/timing penalty or conflicting utility; not part of this Defender preset.'};
 let dep=t.match(/^(insight|essence|crux) rank (1|2|3):/);
 if(dep&&dep[1]!==main.toLowerCase()&&dep[2]!=='1')return {score:-9000,why:'Skip: modifies an inactive higher-rank perk.'};
 if(dep&&p.id==='pl0400'&&main==='Essence'&&dep[1]==='insight')return {score:-9000,why:'Skip: Pure Concentration is not activated in this spell-chain preset.'};
 if(dep&&p.id==='pl1500'&&main!=='Insight'&&dep[1]==='insight')return {score:-9000,why:'Skip: this preset does not activate the slower Insight Rank 1 perk.'};
 if(dep&&p.id==='pl0000'&&dep[1]==='essence'&&main!=='Essence')return {score:-9000,why:'Skip: Combat Healer requires a healing skill, which this preset does not equip.'};
 if(dep&&p.id==='pl0000'&&dep[1]==='crux'&&main!=='Crux')return {score:-9000,why:'Skip: Substitute is not equipped; Phalanx alone requires the inactive Crux Rank 2 perk to generate Charisma.'};
 if(dep&&p.id==='pl0400'&&dep[1]==='crux'&&main!=='Crux')return {score:-9000,why:'Skip: Flowery Seven is not equipped in this preset.'};
 if(p.id==='pl0400'&&/io loses .*hp/.test(t))return {score:-9000,why:'Skip: repeated HP loss conflicts with this high-current-HP Defender preset; reserve it for a dedicated shield/low-HP setup.'};
 if(/^(insight|essence|crux) style perk:/.test(t)&&st!==main)return {score:-9000,why:'Skip: prioritize direct effects over a different style’s perk modifier.'};
 const afterDependency=dep?t.slice(dep[0].length).trim():t;
 const skillNames=skillCatalog[p.id.replace('pl','Pl')].map(x=>norm(x.name));
 const specificSkill=skillNames.find(s=>afterDependency===s||afterDependency.startsWith(s+':')||afterDependency.startsWith(s+' '));
 if(dep&&specificSkill&&!skills.includes(specificSkill))return {score:-9000,why:'Skip: modifies '+specificSkill+', which is not equipped in this preset.'};
 const prefix=t.split(':')[0];const named=skills.some(s=>prefix.includes(s))||(coreActions[p.id]||[]).some(s=>prefix.includes(norm(s)));
 const otherSkill=skillNames.find(s=>t.startsWith(s+' ')||t.startsWith(s+':'));
 const abilityPrefix=Boolean(otherSkill)||(/^[^:]+:/.test(t)&&!/(rank|style perk|while|whenever|upon|against|attack|combo|shot|finisher|gauge|at lvl|at max|after |when |charge|critical|max sigils)/.test(prefix));
 if(abilityPrefix&&!named){score-=130;why='Perk-unlock filler: its named skill is not equipped in this four-skill preset.';}
 if(named){score+=90;why='Improves an equipped skill or its required resource loop.';}
 if(dep&&dep[1]===main.toLowerCase()){score+=85;why='Strengthens the selected style’s active perk.';}
 if(t.startsWith(main.toLowerCase()+' style perk:')){score+=85;why='Strengthens the selected style’s active perk.';}
 if(/dmg dealt|enhanced dmg/.test(t)&&!abilityPrefix){score+=65;why='Improves actual damage when the stated condition is met.';}
 if(/dmg cap \+20% per .*basic/.test(t)){score+=100;why='Uses the five Basic Stats primary Sigils in the later-stage plan.';}
 else if(/dmg cap/.test(t)&&!abilityPrefix){score+=50;why='Adds a separate cap bonus; useful once attacks reach their current cap.';}
 if(/max hp \+|hp \+10000 per/.test(t)){score+=65;why='Supports Defender Ecru’s maximum-HP requirement.';}
 if(/def \+6% per/.test(t)){score+=70;why='Adds defense from the actual Defense/Support primary Sigils.';}
 if(/skill cooldown|cooldown -/.test(t)&&(!abilityPrefix||named)){score+=40;why='Improves the preset’s skill/resource uptime.';}
 if(/critical hit rate/.test(t)){score+=15;why='Crit headroom while gearing; replace with a useful skipped node if already at 100% effective crit.';}
 if(/atk \+|critical hit dmg/.test(t)&&!abilityPrefix)score+=20;
 if(/shield|guard break resistance/.test(t)&&!abilityPrefix)score+=10;
 if(/charge time \+|longer to charge|lowered by|lowers def/.test(t)){score-=10;why+=' Includes the charge/defense trade-off printed on the node.';}
 if(/rank 1/.test(t)&&st!==main&&p.id==='pl1500'&&st==='Insight')score-=200;
 return {score,why};
}
for(const c of baseline.CHARS){const p=profiles[c.slug]; selections[c.slug]={};
 for(const main of styles){let out={};
  const avoidRank1=(c.slug==='io'&&main==='Essence')?'Insight':(c.slug==='ghandagoza'&&main!=='Insight')?'Insight':null;
  for(const group of ['rank1','rank2','rank3','EX']){
   const all=styles.flatMap(st=>game[c.slug][st].pools[group].map(n=>({...n,style:st,...score(n,st,main,p,group)})));
   const sorted=a=>a.sort((a,b)=>b.score-a.score||styles.indexOf(a.style)-styles.indexOf(b.style)||a.row-b.row||a.col-b.col);
   let chosen=[];
   if(group==='rank1'){
    for(const st of styles){const count=st===avoidRank1?2:3;chosen.push(...sorted(all.filter(n=>n.style===st)).slice(0,count));}
    chosen.push(...sorted(all.filter(n=>!chosen.includes(n)&&n.style!==avoidRank1)).slice(0,10-chosen.length));
   }else if(group==='EX')chosen=sorted(all.filter(n=>n.score>-9000)).slice(0,20);
   else{chosen=sorted(all.filter(n=>n.style===main)).slice(0,6);chosen.push(...sorted(all.filter(n=>n.style!==main&&n.score>-9000)).slice(0,4));}
   if(chosen.some(n=>n.score<=-9000))throw Error(`Unsafe forced choice ${c.slug} ${main} ${group}`);
   out[group]=all.map(n=>({id:n.id,style:n.style,take:chosen.includes(n),why:chosen.includes(n)?n.why:(n.score<0?n.why:'Lower priority than the selected nodes for this loadout.')}));
  }
  selections[c.slug][main]=out;
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
const payload={CHARS:baseline.CHARS,STAGES:baseline.STAGES,PROFILES:profiles,GAME:game,ALLOC:selections,TRAITS:traitMeta,WEAPONS:weapons,AWAKENINGS:awakenings,UNIQUE_ROLLS:uniqueRolls,SYNTHESIZABLE:synthesizable};
fs.writeFileSync('revision-data.json',JSON.stringify(payload));
console.log(`Prepared ${baseline.CHARS.length} character profiles, ${Object.values(game).reduce((n,x)=>n+Object.keys(x).length,0)} styles and legal 10/10/10/20 node allocations.`);
