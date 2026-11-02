const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=require('./revision-data.json');
const selected=require('./master-selections.json');
const skills=require('./research/skill-catalog-0.json').characters;
const elements=new Map();
const el=id=>{if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',textContent:'',classList:{toggle(){}},querySelectorAll:()=>[],insertAdjacentElement(){},get innerText(){return this.innerHTML.replace(/<[^>]+>/g,' ');}});return elements.get(id);};
const ctx={document:{getElementById:el,addEventListener(){}},URLSearchParams,history:{replaceState(){}},location:{pathname:'/',hash:''}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/assets/data.js','utf8')+'\n'+fs.readFileSync('dist/assets/handbook.js','utf8'),ctx);
for(const [slug,p]of Object.entries(data.PROGRESSION)){
 assert.equal(p.skills.length,4,slug+' foundation');assert.equal(new Set(p.skills).size,4);
 for(const name of p.skills)assert(skills[data.PROFILES[slug].id.replace('pl','Pl')].some(s=>s.name===name),slug+' '+name);
 assert(p.loop&&p.upgrade&&p.check,slug+' missing progression rationale');
 for(const style of ['Insight','Essence','Crux']){
  assert.equal(p.styleFocus[style].length,3);for(const name of p.styleFocus[style])assert(data.TRAITS[name],slug+' unknown focus '+name);
  for(const rank of ['rank1','rank2','rank3','EX']){
   const chosen=data.ALLOC[slug][style][rank].filter(n=>n.take);
   assert.deepEqual(chosen.map(n=>n.id).sort(),selected[slug][style][rank].map(n=>n.id).sort(),slug+' selection drift');
   const healing=slug==='captain'&&style==='Essence'||slug==='katalina'&&style==='Crux'||slug==='cagliostro'&&style==='Crux';
   if(healing)for(const n of chosen){const text=data.GAME[slug][n.style].pools[rank].find(x=>x.id===n.id).text;assert(!/instead of healing HP/.test(text),slug+' silently converts HP recovery');}
  }
 }
}
const result=vm.runInContext(`(()=>{
 const assert=(ok,message)=>{if(!ok)throw Error(message);};let views=0;
 for(const c of CHARS){active=c.slug;
  for(const style of STYLES){chosen[active]=style;
   for(const difficulty of STAGES){stage=difficulty;exReady=tier()===5;pairs=true;critCovered=false;render();views++;
    assert(document.getElementById('characterProgression').innerText.includes(progression().check),active+' missing checkpoint');
    assert(buildText().includes('Skills: '+equippedSkills().join(' / ')),active+' exported wrong phase skills');
    assert(document.getElementById('sigils').innerText.includes('Acquisition and maximum equipment targets'),active+' missing acquisition guidance');
    assert(buildText().includes('Equipment priorities:'),active+' missing exported equipment limits');
    for(const r of rows())assert(acquisition(r).length>40,active+' missing acquisition route');
    assert(!buildText().includes('Before changing a save:')&&!buildText().includes('95–98%'),active+' personal save preference leaked into guide');
    assert(new Set(overmasteryPlan().map(x=>x.split(' +')[0])).size===4,active+' duplicate Over Mastery type');
    if(late()){
     for(const [name,trait,level,bonus,value]of summonPlan()){
      const pool=EQUIPMENT_EVIDENCE.summons[name];
      assert(pool.trait===trait&&pool.levels.includes(level),active+' unsupported Summon main trait');
      assert(summonRolls(name,bonus).includes(value),active+' unsupported Summon bonus');
      assert(value===Math.max(...summonRolls(name,bonus)),active+' guide downgraded from legal maximum');
     }
     assert(document.getElementById('summons').innerText.includes('lower values are not the endgame recommendation'),active+' missing maximum-roll recommendation');
    }
    if(!late())assert(JSON.stringify(equippedSkills())===JSON.stringify(progression().skills),active+' future skill plan before unlock');
    if(tier()===5){
     const attackPrimaries=rows().filter(r=>TRAITS[traitName(r.main)]?.category===1).length;
     assert(attackPrimaries||!takenNodes().some(n=>/ATK \+10% per Attack-type/.test(n.text)&&!n.why.startsWith('Unlock-only:')),active+' unlabelled zero-contribution category node');
     if(categoryTargets().basic)assert(rows().filter(r=>TRAITS[traitName(r.main)]?.category===0).length===5,active+' wrong Basic Stats layout');
     if(categoryTargets().defense)assert(rows().filter(r=>[2,3].includes(TRAITS[traitName(r.main)]?.category)).length>=4,active+' insufficient HP/DEF primaries');
    }
    if(late()&&lowHP()){
     assert(rows().some(r=>traitName(r.main)==='Celestial Nyx'||r.secondary==='Celestial Nyx'),active+' missing low-HP cap plan');
     assert(rows().some(r=>traitName(r.main)==='Celestial Ventus'),active+' missing ally-healing restriction');
     assert(!rows().some(r=>/Stamina|Celestial Lumen/.test(r.main+' '+r.secondary)),active+' conflicting current-HP conditions');
    }
    if(active==='vaseraga')assert((totals()['Quick Charge']||0)<=15,'Vaseraga automatically spends a second charge slot');
   }
  }
 }
 active='ghandagoza';chosen[active]='Essence';stage='Chaos+';assert(!lowHP(),'Ghandagoza assumes Rank-3 conversion too early');stage='Chaos++';assert(lowHP(),'Ghandagoza missing Rank-3 conversion');
 active='cagliostro';chosen[active]='Insight';assert(equippedSkills().includes('Mehen'),'Cagliostro missing equipped debuff field');assert(takenNodes().some(n=>n.id==='4a0e5cec'),'Cagliostro missing debuff recovery');
 active='lancelot';chosen[active]='Essence';assert(rows().some(r=>traitName(r.main)==='Improved Guard'),'Lancelot missing guard route');
 active='seofon';chosen[active]='Crux';assert(takenNodes().some(n=>n.id==='f59b12a4'),'Seofon missing avatar window');
 active='eustace';chosen[active]='Crux';assert(takenNodes().some(n=>n.id==='a6acb163'),'Eustace missing reload support');
 assert(summonRolls('Behemoth III','Normal Attack Damage Cap Up').includes(45),'missing legal near-maximum roll');
 assert(!summonRolls('Behemoth III','Normal Attack Damage Cap Up').includes(100),'tier-III Summon given Astral ceiling');
 assert(!summonRolls('Lilith','Healing Cap Up').includes(100),'healing bonus given damage-cap ceiling');
 assert(acquisition({kind:'rolledUnique',item:'test',secondary:'DMG Cap'}).includes('cannot create it'),'unique pairing route suggests generic synthesis');
 return views;
})()`,ctx);
console.log(`PASS ${result} progression/EX views, 28 legal foundation skill plans, 84 trait priorities, fixed-node fidelity, preserved healing, low-HP rank gates, and resource-loop regressions.`);
