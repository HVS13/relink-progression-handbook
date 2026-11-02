const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('Relink_Defender_Field_Guide_Revised.html','utf8');
const script=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:['stoneCap','stoneSupp'].includes(id)?'0':'',classList:{toggle(){}},querySelectorAll:()=>[],insertAdjacentElement(){},get innerText(){return this.innerHTML.replace(/<[^>]+>/g,' ');}});return elements.get(id);}
const display=require('./research/display.json');
const skillCatalog=require('./research/skill-catalog-0.json').characters;
const legalSigils=new Set(Object.values(require('./research/logs-sigils.json')).map(s=>s.text));
const synthesisTraits=new Set(require('./research/logs-synthesis-traits.json').map(id=>display.traitOrder[id]?.name));
if(synthesisTraits.has('HP'))synthesisTraits.add('Health');
const context={document:{getElementById:el,addEventListener(){}},console,skillCatalog,legalSigils,synthesisTraits,URLSearchParams,history:{replaceState(){}},location:{pathname:'/',hash:''}};
vm.createContext(context);vm.runInContext(script,context);
const data=require('./revision-data.json');
assert.equal(data.PATCH_REVIEW.version,'2.0.6');
assert.equal(data.PATCH_REVIEW.checked,'2026-11-02');
assert.equal(Object.keys(data.PATCH_REVIEW.characters).length,28);
for(const c of data.CHARS){const patch=data.PATCH_REVIEW.characters[c.slug];assert(patch?.note&&data.PATCH_REVIEW.articles.some(a=>a.version===patch.version),'Missing official patch reference: '+c.slug);}
assert(/max lvl 5/.test(data.GAME.fediel.Insight.perks.rank2.text),'Stale Fediel stack limit');
const ioReaction=data.GAME.io.Essence.perks.rank3.text;
assert(ioReaction.includes('Freeze + Lightning: Inflicts ATK↓ (20%)')&&ioReaction.includes('Fire + Lightning: Conjures a circle that inflicts Burn'),'Io reaction labels reversed');
assert(ioReaction.includes('Editorial label correction')&&ioReaction.includes('no longer inflicts Paralysis'),'Io reaction correction lost provenance or drawback');
const ioRaw=Object.values(require('./research/pl0400.json')).find(n=>n.rankRow===2&&n.text.startsWith('Landing Lightning'));
assert(ioRaw.text.includes('Fire + Lightning: Inflicts'),'Original conflicting source snapshot was overwritten');
for(const style of ['Insight','Essence','Crux']){
 assert(!data.ALLOC.rosetta[style].rank2.some(n=>n.take&&n.id==='82120bef'),'Rosetta retains the unresolved or untriggerable Bloomed modifier');
 assert(data.ALLOC.rosetta[style].rank2.some(n=>n.take&&n.id===(style==='Crux'?'a733025f':'8ddafdfb')),'Rosetta missing explicit replacement');
}
assert(data.GAME.rosetta.Crux.pools.rank3.find(n=>n.id==='f803a804').text.includes('Stackable ATK↑, Supplementary DMG, and DMG↑'),'Rosetta missing named buff effects');
assert(data.GAME.tweyen.Crux.perks.rank2.text.includes('removes Dawnray and Dull Point'),'Tweyen missing removal conditions');
assert(data.GAME.lancelot.Insight.pools.EX.find(n=>n.id==='a5292e0b').text.includes('when Enhanced Damage Skills is removed'),'Lancelot missing reset condition');
assert(data.GAME.yodarha.Insight.perks.rank2.text.startsWith('Normal attacks and combo finishers'),'Yodarha missing timed attack category');
const stonePools=require('./research/logs-transmarvel-pool.json').wrightstones.combos;
const traitId=name=>Object.entries(display.traitOrder).find(([,t])=>t.name===name)?.[0];
assert(stonePools.some(p=>p.slots.every((slot,i)=>slot.traits.includes(traitId(['HP','Supplementary DMG','Autorevive'][i]))&&slot.levels.includes([20,15,10][i]))),'Unsupported 20/15/10 Wrightstone');
for(const [slug,variants]of Object.entries(data.WEAPONS))for(const w of variants){
 assert.deepEqual(w.levels,w.primary==='Greater Aegis'?[30,25,15,10,15]:[35,25,15,10,15],slug+' weapon levels');
}
assert.equal(data.WEAPONS.seofon[0].primary,'Greater Aegis');
assert.equal(data.WEAPONS.seofon[0].levels[0],30);
assert(data.GAME.eugen.Crux.pools.rank3.some(n=>/both Poison and Paralysis/.test(n.text)),'Lost status-only names');
assert(data.GAME.beatrix.Essence.pools.rank1.some(n=>/Näed Nulli:/.test(n.text)),'Lost clock-mode names');
for(const [slug,variants]of Object.entries(data.ALLOC))for(const [style,groups]of Object.entries(variants)){
 for(const [rank,selection]of Object.entries(groups))for(const selected of selection.filter(n=>n.take)){
  const node=data.GAME[slug][selected.style].pools[rank].find(n=>n.id===selected.id);
  const namedSkill=skillCatalog[data.PROFILES[slug].id.replace('pl','Pl')].find(s=>node.text.startsWith(s.name+':'));
  if(namedSkill&&!data.PROFILES[slug].styles[style][0].includes(namedSkill.name))assert(rank!=='EX'&&selected.why.startsWith('Unlock-only:'),'Unequipped skill bonus without an unlock reason: '+slug+'/'+style+'/'+rank+' '+node.text);
  assert(!/Rank (11|111)\b/.test(node.text),'Rank-symbol decoding: '+slug+'/'+style);
  const dependency=node.text.match(/^(Insight|Essence|Crux) Rank ([123]):/);
  if(dependency&&dependency[2]!=='1')assert.equal(dependency[1],style,'Inactive perk modifier: '+slug+'/'+style+' '+node.text);
  if(slug==='io'&&style==='Essence')assert(!/^Insight Rank/.test(node.text),'Io spell-chain selected an inactive Concentration perk');
  if(slug==='io')assert(!/Io loses .*HP/.test(node.text),'High-HP Io selected repeated HP drain');
  if(slug==='io'&&style!=='Crux')assert(!/^Crux Rank/.test(node.text),'Io selected a modifier for unequipped Flowery Seven');
  if(slug==='captain'&&style!=='Essence')assert(!/^Essence Rank/.test(node.text),'Captain selected a healing-perk modifier without healing skills');
  if(slug==='captain'&&style!=='Crux')assert(!/^Crux Rank/.test(node.text),'Captain selected Charisma modifiers without a usable Substitute source');
  if(slug==='eugen'&&style==='Essence')assert(!/^Essence Rank 2: Intercept/.test(node.text),'Eugen selected a modifier for unequipped Intercept');
 }
 for(const [rank,budget]of Object.entries({rank1:10,rank2:10,rank3:10,EX:20})){
  const selected=groups[rank].filter(n=>n.take);if(rank==='EX')assert(selected.length>=19&&selected.length<=20);else assert.equal(selected.length,budget);assert.equal(new Set(selected.map(n=>n.id)).size,selected.length);
  if(rank==='rank2'||rank==='rank3')assert.equal(selected.filter(n=>n.style===style).length,6);
 }
}
const results=vm.runInContext(`(()=>{
 let views=0;const failures=[];
 for(const c of CHARS){active=c.slug;
  for(const st of STYLES){chosen[active]=st;
   for(const difficulty of STAGES){stage=difficulty;exReady=false;
    for(const paired of [true,false]){pairs=paired;render();views++;
     const gear=rows();if(gear.length!==12)failures.push(active+' / '+st+' / '+stage+' slot count');
     if((totals()['Quick Cooldown']||0)>45)failures.push(active+' redundant Quick Cooldown at '+stage);
     for(const r of gear)if(traitName(r.main)==='Improved Dodge'&&r.level<11)failures.push(active+' nonfunctional low-level Improved Dodge');
     for(const r of gear){
      if(PATCH_REVIEW.fixedLevelSigils.includes(traitName(r.main))&&r.level!==15)failures.push(active+' outdated fixed-level Sigil '+r.main);
      if(!legalSigils.has(rowItem(r)))failures.push(active+' nonexistent Sigil item '+rowItem(r));
      if(pairs&&r.secondary!=='—'&&r.kind==='rolledUnique'&&!UNIQUE_ROLLS[traitName(r.main)]?.secondaries.includes(r.secondary))failures.push(active+' unsupported unique roll '+r.main+'/'+r.secondary);
      if(pairs&&r.secondary!=='—'&&!['awakening','rolledUnique'].includes(r.kind)&&(!synthesisTraits.has(traitName(r.main))||!synthesisTraits.has(r.secondary)))failures.push(active+' unsupported ordinary synthesis '+r.main+'/'+r.secondary);
     }
     for(const skill of equippedSkills())if(!skillCatalog[profile().id.replace('pl','Pl')].some(x=>x.name===skill))failures.push(active+' nonexistent character skill '+skill);
     critCovered=true;if(rows().some(r=>traitName(r.main)==='Critical Hit Rate'))failures.push(active+' redundant crit primary at '+stage);critCovered=false;
     for(const r of gear){if(!TRAITS[traitName(r.main)])failures.push(active+' unknown primary '+r.main);if(r.secondary!=='—'&&!TRAITS[traitName(r.secondary)])failures.push(active+' unknown secondary '+r.secondary);}
     if(equippedSkills().length!==4||new Set(equippedSkills()).size!==4)failures.push(active+' invalid skills '+st);
     const copied=buildText();if(!copied.includes('Style: '+st))failures.push(active+' wrong copied style');
     if(!copied.includes('Official patch check: 2.0.6 / 2026-11-02')||!copied.includes(PATCH_REVIEW.characters[active].note))failures.push(active+' missing patch export');
     if(!document.getElementById('sources').innerHTML.includes(PATCH_REVIEW.characters[active].note.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))))failures.push(active+' missing visible patch note');
     for(const skill of equippedSkills())if(!copied.includes(skill))failures.push(active+' copied skill missing');
     if(!late()&&takenNodes().length)failures.push(active+' early nodes counted');
     if(!late()&&copied.includes('rank1\\n'))failures.push(active+' early export includes allocation');
     if(late()&&takenNodes().length!==(tier()>=5?30:tier()>=4?20:10))failures.push(active+' wrong unlocked node count');
     const visiblePrimarySupp=gear.filter(r=>traitName(r.main)==='Supplementary DMG').reduce((n,r)=>n+r.level,0);
     if(!pairs&&(totals()['Supplementary DMG']||0)!==visiblePrimarySupp)failures.push(active+' hidden secondary counted');
     if(!pairs&&gear.some(r=>/^Celestial/.test(rowItem(r))&&/ V$/.test(rowItem(r))))failures.push(active+' nonexistent single Celestial item');
    }
   }
   stage='Chaos++';exReady=true;pairs=true;render();if(takenNodes().length<49||takenNodes().length>50)failures.push(active+' wrong EX allocation/reserve');
  const withCrit=rows();critCovered=true;const withoutCrit=rows();if(!withoutCrit.some(r=>r.main==='Health V+'&&r.secondary==='Supplementary DMG'))failures.push(active+' missing crit replacement');critCovered=false;
  const category=categoryTargets();const basics=rows().filter(r=>TRAITS[traitName(r.main)]?.category===0).length;if(category.basic&&basics!==5)failures.push(active+' category-node build mismatch');
  }
 }
 active='io';chosen.io='Essence';stage='Chaos++';exReady=false;if(preset()[0].indexOf('Freeze')<0)failures.push('Io missing Freeze');
 active='rosetta';chosen.rosetta='Insight';for(const s of ['Lost Love','Spiral Rose'])if(!preset()[0].includes(s))failures.push('Rosetta missing '+s);
 active='eustace';chosen.eustace='Crux';if(preset()[0].includes('Heaven Comes Down'))failures.push('Eustace mixed styles');
 active='id';chosen.id='Crux';if(takenNodes().some(n=>/Max HP -30%/.test(n.text)))failures.push('Id HP penalty');
 active='id';chosen.id='Essence';stage='Chaos++';if(rows().some(r=>r.secondary==='Versalis Ignition'||r.main==='Versalis Ignition'))failures.push('Id Godmight-only Ignition in sealed-Godmight preset');
 active='zeta';chosen.zeta='Insight';if(takenNodes().some(n=>n.id==='7b0c5482'))failures.push('Zeta shortened-loop node');
 active='captain';chosen.captain='Insight';stage='Proud';pairs=true;const before=totals()['DMG Cap'];pairs=false;const after=totals()['DMG Cap'];if(before!==75||after!==30)failures.push('Secondary accounting mismatch');
 return {views,failures};
})()`,context);
assert.deepEqual([...new Set(results.failures)],[]);
assert(!/<script[^>]+src=/i.test(html));
assert(!/\b(?:fetch|XMLHttpRequest)\s*\(/.test(script));
console.log(`PASS ${results.views} character/style/stage/equipment views; 336 node budgets and perk dependencies; weapon curves; legal Wrightstone; actual Sigil and skill catalogues; eligible synthesis traits; preserved status names; crit replacements; category synergy; EX allocations and explicit reserves; consistent export; no runtime network dependencies.`);
