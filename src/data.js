const FLORAL=(()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');x.fillStyle='#f6efe6';x.fillRect(0,0,96,96);const cols=['#e0508a','#7b4fd0','#f2b134','#3aa86f','#ff7a59'];let seed=7;const r=()=>(seed=(seed*9301+49297)%233280)/233280;
 for(let i=0;i<9;i++){const px=r()*96,py=r()*96;x.fillStyle=cols[i%5];for(let k=0;k<5;k++){x.beginPath();x.ellipse(px+Math.cos(k*1.2566)*7,py+Math.sin(k*1.2566)*7,6,4,k*1.2566,0,7);x.fill()}x.fillStyle='#ffe08a';x.beginPath();x.arc(px,py,3,0,7);x.fill();x.fillStyle='#3aa86f';x.beginPath();x.ellipse(px+12,py+10,6,2.5,.8,0,7);x.fill()}return c})();
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const PATHS={
 tee:'M62 20L82 14Q100 32 118 14L138 20L182 58L160 82L142 68L142 200Q100 206 58 200L58 68L40 82L18 58Z',
 tank:'M70 14Q82 52 100 54Q118 52 130 14L142 18L144 70L142 200Q100 206 58 200L56 70L58 18Z',
 shirt:'M62 20L82 14L100 28L118 14L138 20L172 62L180 170L158 172L142 96L142 206Q100 212 58 206L58 96L42 172L20 170L28 62Z',
 hood:'M62 22L82 15Q100 34 118 15L138 22L170 62L180 160L156 162L142 96L142 206Q100 212 58 206L58 96L44 162L20 160L30 62Z',
 kurta:'M62 20L82 14Q100 32 118 14L138 20L172 60L178 140L156 142L142 90L150 272Q100 280 50 272L58 90L44 142L22 140L28 60Z',
 dress:'M70 16Q84 46 100 48Q116 46 130 16L140 22L132 80L114 104L178 285Q100 296 22 285L86 104L68 80L60 22Z'};
PATHS.polo=PATHS.tee;PATHS.jacket=PATHS.hood;
const DETAIL={tee:['M82 14Q100 32 118 14'],polo:['M82 14L100 44L118 14','M100 44V90'],tank:['M70 14Q82 52 100 54Q118 52 130 14'],shirt:['M82 12L100 46L118 12','M100 46V206','M110 104H132V130H110Z'],hood:['M82 14Q100 40 118 14','M91 40V80M109 40V80','M66 140H134L140 172H60Z'],jacket:['M100 30V206','M76 18Q100 40 124 18','M68 150H84M132 150H116'],kurta:['M82 14Q100 34 118 14','M100 34V100'],dress:['M86 98H114L113 108H87Z','M100 108V288M92 108L66 288M108 108L134 288']};
PATHS.skirt='M64 14L136 14L160 190Q100 198 40 190Z';PATHS.maxiskirt='M64 14L136 14L176 280Q100 292 24 280Z';PATHS.shorts='M62 14L138 14L146 100L104 104L100 70L96 104L54 100Z';PATHS.jeans='M62 14L138 14L146 280L106 282L100 90L94 282L54 280Z';PATHS.croptop='M62 20L82 14Q100 32 118 14L138 20L182 58L160 82L142 68L142 112Q100 118 58 112L58 68L40 82L18 58Z';PATHS.trousers=PATHS.jeans;PATHS.sweater=PATHS.hood;PATHS.blazer=PATHS.jacket;
DETAIL.sweater=['M82 14Q100 34 118 14','M58 190H142'];DETAIL.blazer=['M82 14L98 84L100 74','M118 14L102 84L100 74','M100 84V206','M72 150H92'];DETAIL.croptop=['M82 14Q100 32 118 14'];DETAIL.skirt=['M64 22H136','M80 22L66 190M100 22V194M120 22L134 190'];DETAIL.maxiskirt=['M64 22H136','M80 22L58 284M100 22V290M120 22L142 284'];DETAIL.shorts=['M62 22H138','M100 22V70'];DETAIL.jeans=['M62 22H138','M100 22V90','M68 36H84'];DETAIL.trousers=['M62 22H138','M100 22V90','M78 24V280M122 24V280'];
PATHS.gown='M78 18Q86 36 100 62Q114 36 122 18L136 12Q150 14 152 28L134 34L126 96L186 285Q100 302 14 285L74 96L66 34L48 28Q50 14 64 12Z';DETAIL.gown=['M78 18Q100 70 122 18','M74 96H126L130 110H70Z','M100 110V292M90 110L56 290M110 110L144 290M80 110L30 288M120 110L170 288'];
const TYPES=[
 {id:'tee',name:'T-shirt',w:30,kw:'tshirt tee round neck casual top'},{id:'polo',name:'Polo',w:35,kw:'collar golf'},{id:'tank',name:'Tank top',w:10,kw:'vest sleeveless gym camisole'},
 {id:'shirt',name:'Formal shirt',w:40,kw:'button office full sleeve'},{id:'hood',name:'Hoodie',w:85,kw:'sweatshirt pullover winter'},{id:'sweater',name:'Sweater',w:90,kw:'jumper pullover knit woolen'},
 {id:'jacket',name:'Jacket',w:90,kw:'coat bomber zip windcheater'},{id:'blazer',name:'Blazer',w:60,kw:'suit coat formal'},{id:'kurta',name:'Kurta',cat:'full',w:45,kw:'kurti ethnic indian festive'},
 {id:'sherwani',name:'Sherwani',base:'kurta',cat:'full',g:'m',w:55,kw:'wedding ethnic groom',n:'Shown as long kurta shape'},{id:'waistcoat',name:'Waistcoat',base:'tank',g:'m',w:40,kw:'vest nehru',n:'Shown as vest shape'},
 {id:'dress',name:'Gown / Dress',cat:'full',g:'f',w:40,kw:'frock gown maxi party evening'},{id:'gown',name:'Ball gown',cat:'full',g:'f',w:50,kw:'princess wedding bridal party evening ballgown floral'},{id:'saree',name:'Saree',base:'dress',cat:'full',g:'f',w:40,kw:'sari ethnic indian',n:'Shown as long dress shape'},
 {id:'croptop',name:'Crop top',g:'f',w:15,kw:'short top'},{id:'skirt',name:'Skirt',cat:'bottom',g:'f',vy:.45,w:25,kw:'mini midi pleated'},{id:'lehenga',name:'Lehenga',base:'maxiskirt',cat:'bottom',g:'f',vy:.45,w:50,kw:'long skirt ethnic bridal',n:'Shown as long skirt'},
 {id:'shorts',name:'Shorts',cat:'bottom',vy:.7,w:10,kw:'bermuda half pant'},{id:'jeans',name:'Jeans',cat:'bottom',vy:.58,w:55,kw:'denim pant'},{id:'trousers',name:'Trousers',cat:'bottom',vy:.58,w:45,kw:'pants chinos formal pant'},{id:'joggers',name:'Joggers',base:'jeans',cat:'bottom',vy:.58,w:50,kw:'track pants lower sweatpants'}
].map(t=>({base:t.id,cat:'top',g:'u',...t}));
const B=id=>TYPES.find(x=>x.id===id)||TYPES[0];
const HOME=(g,it)=>({x:240,y:it.cat==='bottom'?(g==='male'?325:320):140,s:g==='male'?.76:.7,r:0,o:95});
const norm=x=>x.toLowerCase().replace(/[^a-z ]/g,'');
const bg2=w=>{const z=new Set();for(let i=0;i<w.length-1;i++)z.add(w.slice(i,i+2));return z};
const dice=(a,b)=>{const x=bg2(a),y=bg2(b);if(!x.size||!y.size)return a===b?1:0;let n=0;x.forEach(v=>y.has(v)&&n++);return 2*n/(x.size+y.size)};
const sim=(q,t)=>{const ws=norm(t.name+' '+t.kw).split(' ');return norm(q).split(' ').filter(Boolean).reduce((a,k)=>a+Math.max(...ws.map(w=>dice(k,w))),0)};
const TIPS={top:['dark jeans and white sneakers','tailored trousers and loafers','a blazer and one bold accessory','joggers and running shoes'],bottom:['a fitted white tee','a crisp shirt tucked in','a satin top and statement earrings','a performance tee'],full:['comfortable sneakers or juttis','formal shoes and a light stole','statement jewellery and heels','comfortable sports shoes']};
const SIZES=[{id:'S',chest:90,k:.9},{id:'M',chest:96,k:.97},{id:'L',chest:102,k:1.04},{id:'XL',chest:109,k:1.12}];
const MATS=[
 {id:'cotton',name:'Cotton',c:'#d9d4c7',tex:35,sheen:12,warm:30,air:90,drape:55,note:'soft and breathable'},
 {id:'linen',name:'Linen',c:'#cdbb97',tex:60,sheen:8,warm:20,air:98,drape:70,note:'airy, creases easily'},
 {id:'silk',name:'Silk',c:'#7b5ea7',tex:10,sheen:75,warm:40,air:70,drape:96,note:'fluid with a natural sheen'},
 {id:'denim',name:'Denim',c:'#2f5fa8',tex:70,sheen:10,warm:65,air:45,drape:25,note:'sturdy and structured'},
 {id:'wool',name:'Wool',c:'#8a5a44',tex:80,sheen:5,warm:96,air:50,drape:60,note:'warm, best for cool weather'},
 {id:'floral',name:'Floral print',c:'#f0d9e6',tex:40,sheen:30,warm:35,air:75,drape:75,note:'printed satin, festive'},
 {id:'poly',name:'Polyester',c:'#2fbf9b',tex:20,sheen:45,warm:45,air:40,drape:50,note:'durable and quick-drying'}];
const OCC={casual:{cotton:90,linen:75,silk:45,denim:85,wool:60,poly:65,floral:55},work:{cotton:80,linen:80,silk:75,denim:35,wool:85,poly:60,floral:40},party:{cotton:50,linen:55,silk:95,denim:60,wool:55,poly:50,floral:90},sport:{cotton:55,linen:40,silk:15,denim:10,wool:25,poly:95,floral:10}};
const CLIM={hot:15,mild:50,cold:90};
const STEPS=['Dress type','Size','Material','Fabric capture','Try-on'];


export {FLORAL,clamp,PATHS,DETAIL,TYPES,B,HOME,norm,sim,TIPS,SIZES,MATS,OCC,CLIM,STEPS};
