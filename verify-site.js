const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const page=fs.readFileSync('dist/index.html','utf8');
const data=fs.readFileSync('dist/assets/data.js','utf8');
const runtime=fs.readFileSync('dist/assets/handbook.js','utf8');
const offline=fs.readFileSync('dist/Relink_Defender_Field_Guide_Revised.html','utf8');
assert(page.includes('defer src="assets/data.js"'));
assert(page.includes('defer src="assets/handbook.js"'));
assert(!/<script>/.test(page),'Hosted HTML must keep the large data outside its document');
assert(offline.includes(data+'\n'+runtime),'Offline and hosted editions must use identical builds');
for(const match of page.matchAll(/(?:src|href)="((?:assets\/)[^"]+)"/g))assert(fs.existsSync('dist/'+match[1]),match[1]);
assert(!page.includes('C:/Users/'),'Machine-specific build dependency');
function open(search='',hash=''){
 const elements=new Map();let ready;
 const el=id=>{if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',textContent:'',classList:{toggle(){}},querySelectorAll:()=>[],insertAdjacentElement(){},setAttribute(){},get innerText(){return this.innerHTML.replace(/<[^>]+>/g,' ');}});return elements.get(id);};
 const location={pathname:'/relink-progression-handbook/',search,hash};
 const context={console,URLSearchParams,location,history:{replaceState(_,__,url){const parsed=new URL(url,'https://example.com');location.search=parsed.search;location.hash=parsed.hash;}},document:{getElementById:el,querySelector:el,createElement:()=>({}),addEventListener(name,callback){if(name==='DOMContentLoaded')ready=callback;}}};
 vm.createContext(context);vm.runInContext(data+'\n'+runtime,context);ready();
 return {context,elements,location,state:()=>vm.runInContext('({active,stage,style:active?master():null,exReady,pairs,critCovered})',context)};
}
const selected=open('?character=id&stage=Chaos%2B%2B&style=Essence&ex=1&view=primary&crit=1');
assert.deepEqual(JSON.parse(JSON.stringify(selected.state())),{active:'id',stage:'Chaos++',style:'Essence',exReady:true,pairs:false,critCovered:true});
assert(selected.context.document.title.includes('Id · Chaos++ · Essence'));
assert(!selected.elements.get('sigils').innerHTML.includes('<strong>Versalis Soul+'));
const roundTrip=open(selected.location.search);assert.equal(JSON.stringify(roundTrip.state()),JSON.stringify(selected.state()));
assert.equal(open('?character=invalid').state().active,null);
const invalid=open('?character=io&stage=invalid&style=invalid&ex=1').state();assert.equal(invalid.stage,'Extreme');assert.equal(invalid.exReady,false);
assert.equal(open('','#seofon').state().active,'seofon','Old character links must continue to work');
assert.equal(open().state().active,null);
console.log('PASS hosted assets, matching offline edition, share-link initialization and round trip, invalid parameters, and legacy character links.');
