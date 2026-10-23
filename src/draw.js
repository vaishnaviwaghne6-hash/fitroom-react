import {PATHS,DETAIL} from './data.js';
const HEMY={tee:200,polo:200,tank:200,shirt:206,hood:206,jacket:206,blazer:206,sweater:206,croptop:112,kurta:270,dress:284,gown:284,skirt:190,maxiskirt:280,shorts:100,jeans:280,trousers:280};
const HEMX={dress:[34,166],gown:[32,168],kurta:[56,144],skirt:[44,156],maxiskirt:[28,172],shorts:[56,144]};
const FOLD={dress:[106,288,78],gown:[110,292,86],maxiskirt:[16,286,76],skirt:[16,194,60],kurta:[100,274,50]};
function drawG(c,base,fill,cv,floral,shn,now,mid){
 const pa=new Path2D(PATHS[base]),hl=.1+shn/400,sy=Math.sin(now/900)*3,leg=['shorts','jeans','trousers'].includes(base),top=!FOLD[base]&&!leg,P2=d=>new Path2D(d);
 c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=12;c.shadowOffsetY=5;c.fillStyle=fill;c.fill(pa);c.restore();
 if(cv){const pt=c.createPattern(cv,'repeat');pt.setTransform(new DOMMatrix().scale(floral?1.15:.45));c.save();c.globalAlpha*=floral?1:.8;c.fillStyle=pt;c.fill(pa);c.restore()}
 c.save();c.clip(pa);c.lineCap='round';c.lineJoin='round';
 let g=c.createLinearGradient(15,0,185,0);g.addColorStop(0,'rgba(0,0,0,.38)');g.addColorStop(.25,'rgba(0,0,0,0)');g.addColorStop(.62,'rgba(255,255,255,.09)');g.addColorStop(1,'rgba(0,0,0,.42)');c.fillStyle=g;c.fillRect(0,-20,200,330);
 c.strokeStyle='rgba(0,0,0,.22)';c.lineWidth=12;c.stroke(pa);
 const dk=(d,w,a)=>{c.strokeStyle='rgba(0,0,0,'+a+')';c.lineWidth=w;c.stroke(P2(d))},lt=(d,w)=>{c.strokeStyle='rgba(255,255,255,'+hl+')';c.lineWidth=w;c.stroke(P2(d))};
 if(FOLD[base]){const [y0,y1,hw]=FOLD[base];for(let i=-7;i<=7;i++){const x0=100+i*5,x1=100+i*hw/7,d='M'+x0+' '+y0+'Q'+((x0+x1)/2+sy*(i%2?1:-1)*.7)+' '+((y0+y1)/2)+' '+x1+' '+y1;if(i%2)lt(d,5);else dk(d,6,.17)}}
 if(leg){['M64 40Q80 60 92 50','M60 150Q74 160 92 152','M108 152Q126 160 140 150','M56 268Q74 276 94 270','M106 270Q126 276 144 268'].forEach(d=>dk(d,4,.16));lt('M70 44Q82 62 90 54',2);
  if(mid==='denim'||base==='jeans'){g=c.createRadialGradient(78,90,4,78,90,55);g.addColorStop(0,'rgba(255,255,255,.16)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,200,300);g=c.createRadialGradient(122,90,4,122,90,55);g.addColorStop(0,'rgba(255,255,255,.16)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,200,300)}}
 if(top){['M66 96Q84 122 70 160','M134 96Q116 122 130 160','M84 152Q100 164 116 152','M92 76Q100 100 92 132'].forEach(d=>dk(d,6,.14));lt('M72 98Q88 122 76 158',3);lt('M128 98Q112 122 124 158',3);['M58 70Q66 84 58 104','M142 70Q134 84 142 104'].forEach(d=>dk(d,5,.15));
  ['M32 68Q44 64 54 74','M168 68Q156 64 146 74'].forEach(d=>dk(d,3,.2));
  if(['shirt','hood','jacket','blazer','sweater'].includes(base)){['M30 112Q42 120 36 136','M170 112Q158 120 164 136','M26 140Q38 146 34 158'].forEach(d=>dk(d,5,.15));lt('M36 108Q46 116 40 130',2)}}
 const ph=((now/2800)%1.8)*220-60;g=c.createLinearGradient(ph-40,0,ph+40,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,'+(.06+shn/500)+')');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,-20,200,330);
 if(top&&base!=='tank'){c.fillStyle='rgba(0,0,0,.45)';c.fill(P2('M82 14Q100 34 118 14Q100 22 82 14Z'))}
 c.restore();
 c.strokeStyle='rgba(0,0,0,.5)';c.lineWidth=1.3;c.stroke(pa);
 const hy=HEMY[base],hx=HEMX[base]||[62,138];c.save();c.setLineDash([3,3]);c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=1;c.beginPath();c.moveTo(hx[0]+2,hy-6);c.lineTo(hx[1]-2,hy-6);c.stroke();c.restore();
 c.strokeStyle='rgba(0,0,0,.38)';c.lineWidth=1.3;DETAIL[base].forEach(d=>c.stroke(P2(d)));
 const bt=(x,y)=>{c.fillStyle='rgba(255,255,255,.88)';c.beginPath();c.arc(x,y,2.4,0,7);c.fill();c.strokeStyle='rgba(0,0,0,.5)';c.lineWidth=.6;c.stroke()};
 const col=d=>{c.fillStyle=fill;c.fill(P2(d));c.fillStyle='rgba(255,255,255,.16)';c.fill(P2(d));c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=1.2;c.stroke(P2(d))};
 if(base==='shirt'){col('M82 12L100 46L86 46L68 22Z');col('M118 12L100 46L114 46L132 22Z');[62,88,114,140,166,190].forEach(y=>bt(100,y))}
 if(base==='polo'){col('M82 14L98 44L100 41L102 44L118 14L110 9L100 24L90 9Z');bt(100,54);bt(100,70)}
 if(base==='kurta')[46,62,78,94].forEach(y=>bt(100,y));
 if(base==='blazer'){col('M82 14L98 84L100 74L96 40Z');col('M118 14L102 84L100 74L104 40Z');bt(100,100);bt(100,124)}
 if(base==='jacket'){col('M76 18L82 6Q100 20 118 6L124 18Q100 40 76 18Z');c.save();c.setLineDash([2,2]);c.strokeStyle='#e8e8e8';c.lineWidth=3;c.stroke(P2('M100 30V206'));c.restore()}
 if(base==='hood'){c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=2.2;c.stroke(P2('M92 40V80M109 40V80'))}
 if(base==='jeans'){c.save();c.setLineDash([2,2]);c.strokeStyle='#d9a23a';c.lineWidth=1.1;['M62 26H138','M66 30Q70 58 92 54','M134 30Q130 58 108 54'].forEach(d=>c.stroke(P2(d)));c.restore();c.fillStyle='rgba(0,0,0,.28)';[70,94,104,128].forEach(x=>c.fillRect(x,12,5,16));bt(68,56);bt(132,56)}
 if(base==='dress'||base==='gown'){c.fillStyle='rgba(255,255,255,.5)';c.fillRect(86,98,28,10)}}
function sway(c,now){c.translate(240,610);c.rotate(Math.sin(now/1500)*.012);c.translate(-240,-610)}
function drawModel(b,now,gd,cat,md){
 const F=gd!=='male',P=F?{a:178,b:302,w0:198,w1:282,h0:170,h1:310,wy:322,ar:11}:{a:164,b:316,w0:192,w1:288,h0:180,h1:300,wy:325,ar:13};
 const P2=(d)=>new Path2D(d),ell=(x,y,rx,ry,r)=>{b.beginPath();b.ellipse(x,y,rx,ry,r||0,0,7)},ln=(d,c,w)=>{b.strokeStyle=c;b.lineWidth=w;b.lineCap='round';b.stroke(P2(d))};
 let g;if(!md){g=b.createLinearGradient(0,0,0,640);g.addColorStop(0,F?'#f1e6f8':'#e1eaf8');g.addColorStop(1,F?'#fcf0f4':'#eef3fa');b.fillStyle=g;b.fillRect(0,0,480,640);
  g=b.createRadialGradient(240,300,20,240,300,330);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');b.fillStyle=g;b.fillRect(0,0,480,640);
  g=b.createRadialGradient(240,616,5,240,616,120);g.addColorStop(0,'rgba(60,30,110,.3)');g.addColorStop(1,'rgba(60,30,110,0)');b.fillStyle=g;b.save();b.scale(1,.14);b.translate(0,616*(1/.14-1));b.fillRect(100,616,280,120);b.restore()}
 b.save();sway(b,now);
 const sk=b.createLinearGradient(150,0,330,0);sk.addColorStop(0,'#c98c6b');sk.addColorStop(.3,'#e9b896');sk.addColorStop(.55,'#f6d0b4');sk.addColorStop(1,'#c88b6a');
 const hg=b.createLinearGradient(0,20,0,280);hg.addColorStop(0,F?'#6a4430':'#43322a');hg.addColorStop(1,F?'#2b180f':'#1f150f');
 if(F){b.fillStyle=hg;b.fill(P2('M196 62Q174 150 190 252Q200 290 226 286L254 286Q280 290 290 252Q306 150 284 62Z'))}
 const leg=P2('M'+P.h0+' 400Q'+(P.h0-5)+' 500 194 604L234 604L240 440L240 400Z');
 for(const m of [1,-1]){b.save();if(m<0){b.translate(480,0);b.scale(-1,1)}
  if(cat==='bottom'){b.fillStyle=sk}else{const jg=b.createLinearGradient(170,0,240,0);jg.addColorStop(0,'#232640');jg.addColorStop(.6,'#454b72');jg.addColorStop(1,'#2d3150');b.fillStyle=jg}
  b.fill(leg);if(cat!=='bottom')ln('M206 420Q204 520 210 600','rgba(255,255,255,.1)',5);
  b.fillStyle='#f7f7fa';ell(210,607,28,10);b.fill();b.fillStyle='#d3d6df';ell(210,614,28,5);b.fill();b.fillStyle='#e8eaf1';ell(203,602,14,6);b.fill();
  ln('M'+(P.a-4)+' 162Q'+(P.a-26)+' 250 '+(P.a-22)+' 330Q'+(P.a-20)+' 372 '+(P.a-14)+' 402','#bf8363',2*P.ar+2);
  ln('M'+(P.a-4)+' 162Q'+(P.a-26)+' 250 '+(P.a-22)+' 330Q'+(P.a-20)+' 372 '+(P.a-14)+' 402',sk,2*P.ar-5);
  b.fillStyle=sk;ell(P.a-13,412,P.ar,P.ar+6,.1);b.fill();b.restore()}
 const tor=P2('M'+P.a+' 150Q'+(P.a-8)+' 235 '+P.w0+' '+P.wy+'Q'+(P.h0-8)+' 365 '+P.h0+' 410L'+P.h1+' 410Q'+(P.h1+8)+' 365 '+P.w1+' '+P.wy+'Q'+(P.b+8)+' 235 '+P.b+' 150Z');
 b.fillStyle=sk;b.fill(tor);
 g=b.createLinearGradient(P.a,0,P.b,0);g.addColorStop(0,'rgba(120,60,40,.3)');g.addColorStop(.2,'rgba(120,60,40,0)');g.addColorStop(.8,'rgba(120,60,40,0)');g.addColorStop(1,'rgba(120,60,40,.3)');b.fillStyle=g;b.fill(tor);
 if(cat==='bottom'){b.save();b.beginPath();b.rect(0,140,480,P.wy-132);b.clip();g=b.createLinearGradient(P.a,0,P.b,0);g.addColorStop(0,'#e4e0ec');g.addColorStop(.5,'#fbf9fd');g.addColorStop(1,'#dedae8');b.fillStyle=g;b.fill(tor);b.restore()}
 else{ln('M213 162Q226 155 238 161','rgba(150,80,55,.4)',1.6);ln('M242 161Q254 155 267 162','rgba(150,80,55,.4)',1.6)}
 b.fillStyle=sk;b.fill(P2('M225 104V162Q240 176 255 162V104Z'));
 g=b.createLinearGradient(0,104,0,140);g.addColorStop(0,'rgba(120,60,40,.5)');g.addColorStop(1,'rgba(120,60,40,0)');b.fillStyle=g;b.fillRect(225,104,30,36);
 if(F){b.fillStyle=hg;b.fill(P2('M210 80Q194 130 198 192Q204 216 218 192Q226 140 224 98Z'));b.fill(P2('M270 80Q286 130 282 192Q276 216 262 192Q254 140 256 98Z'))}
 b.fillStyle='#dba583';ell(210,80,5,9);b.fill();ell(270,80,5,9);b.fill();
 if(F){b.fillStyle='#e8c14e';ell(210,91,2.2,2.2);b.fill();ell(270,91,2.2,2.2);b.fill()}
 g=b.createRadialGradient(236,70,6,240,78,48);g.addColorStop(0,'#fbd9c2');g.addColorStop(.7,'#efc2a3');g.addColorStop(1,'#d6a080');b.fillStyle=g;
 b.fill(P2(F?'M211 70Q211 38 240 36Q269 38 269 70Q269 96 252 110Q240 118 228 110Q211 96 211 70Z':'M208 68Q208 38 240 36Q272 38 272 68Q274 96 256 110Q240 120 224 110Q206 96 208 68Z'));
 for(const x of [227,253]){
  ln('M'+(x-9)+' 76Q'+x+' 69 '+(x+9)+' 76','rgba(140,80,60,.25)',3);
  b.fillStyle='#fff';b.fill(P2('M'+(x-8)+' 80Q'+x+' 73 '+(x+8)+' 80Q'+x+' 85 '+(x-8)+' 80Z'));
  b.fillStyle='#5a3a28';ell(x,79.5,3.7,3.7);b.fill();b.fillStyle='#120a07';ell(x,79.5,1.7,1.7);b.fill();b.fillStyle='rgba(255,255,255,.9)';ell(x+1.3,78.2,.9,.9);b.fill();
  ln('M'+(x-8)+' 80Q'+x+' 73 '+(x+8)+' 80','#1c120d',2);if(F)ln('M'+(x+(x<240?-8:8))+' 80L'+(x+(x<240?-11:11))+' 77.5','#1c120d',1.6);
  ln('M'+(x-9)+' 70Q'+x+' 64 '+(x+9)+' 69',F?'#3a2418':'#2b1b12',F?2.4:3.4)}
 ln('M238 82Q235 92 238 95','rgba(150,85,60,.5)',2);ln('M242 83Q244 90 243 93','rgba(255,255,255,.3)',1.4);b.fillStyle='rgba(120,60,40,.4)';ell(236.5,96,2,1.2);b.fill();ell(243.5,96,2,1.2);b.fill();
 if(F){b.fillStyle='#b63c55';b.fill(P2('M231 104Q236 100 240 102Q244 100 249 104Q240 108 231 104Z'));b.fillStyle='#cc566b';b.fill(P2('M231 104Q240 114 249 104Q240 108 231 104Z'));b.fillStyle='rgba(255,255,255,.4)';ell(240,108,4,1.2);b.fill();
  b.fillStyle='rgba(240,110,120,.16)';ell(221,96,9,6);b.fill();ell(259,96,9,6);b.fill()}
 else{b.fillStyle='#b9776a';b.fill(P2('M231 105Q240 101 249 105Q240 111 231 105Z'));ln('M230 105Q240 108 250 105','rgba(90,40,30,.5)',1.2)}
 b.fillStyle=hg;b.fill(P2(F?'M209 76Q205 30 242 27Q277 31 272 76Q266 50 246 45Q224 44 209 76Z':'M208 70Q204 28 240 24Q276 28 272 70Q270 48 240 44Q210 48 208 70Z'));
 for(const d of ['M226 34Q214 50 211 74','M240 30Q232 44 222 58','M256 32Q268 48 270 72','M246 30Q256 40 262 52'])ln(d,'rgba(255,220,190,.22)',1.4);
 if(md==='back'){b.fillStyle=hg;b.beginPath();b.ellipse(240,76,F?30:32,41,0,0,7);b.fill();if(F){ell(240,36,17,17);b.fill();ln('M228 40Q240 28 252 40','rgba(255,220,190,.25)',1.5)}
  for(const d of ['M222 50Q214 76 224 104','M240 40Q236 78 240 108','M258 50Q266 76 256 104'])ln(d,'rgba(255,220,190,.18)',1.5);
  b.fillStyle=sk;b.fill(P2('M227 108V162Q240 176 253 162V108Z'));
  b.save();b.beginPath();b.rect(0,140,480,160);b.clip();g=b.createLinearGradient(P.a,0,P.b,0);g.addColorStop(0,'#757981');g.addColorStop(.5,'#a0a4ac');g.addColorStop(1,'#757981');b.fillStyle=g;b.fill(tor);b.restore();
  ln('M240 170V290','rgba(0,0,0,.1)',2);
  b.save();b.beginPath();b.rect(0,335,480,80);b.clip();b.fillStyle='#6a6e76';b.fill(tor);b.restore();
  for(const m of [1,-1]){b.save();if(m<0){b.translate(480,0);b.scale(-1,1)}b.fillStyle='#6a6e76';b.fill(leg);ln('M206 420Q204 520 210 600','rgba(255,255,255,.12)',5);b.fillStyle=sk;ell(212,610,24,8);b.fill();b.restore()}}
 b.restore()}
function drawRoom(c,sc,now,gd,back){
 let g=c.createLinearGradient(0,0,0,640);g.addColorStop(0,'#ebe8f0');g.addColorStop(1,'#f5f2f6');c.fillStyle=g;c.fillRect(0,0,480,640);
 g=c.createLinearGradient(0,540,0,640);g.addColorStop(0,'#dccab3');g.addColorStop(1,'#c8b196');c.fillStyle=g;c.fillRect(0,540,480,100);
 c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.moveTo(30,545);c.lineTo(200,545);c.lineTo(330,640);c.lineTo(90,640);c.fill();
 g=c.createLinearGradient(0,30,0,420);g.addColorStop(0,'#fff');g.addColorStop(1,'#dfeaf6');c.fillStyle=g;c.fillRect(14,30,96,390);
 c.strokeStyle='#cfd2da';c.lineWidth=6;c.strokeRect(14,30,96,390);c.lineWidth=3;c.beginPath();c.moveTo(62,30);c.lineTo(62,420);for(let y=110;y<420;y+=80){c.moveTo(14,y);c.lineTo(110,y)}c.stroke();
 c.fillStyle='rgba(60,30,110,.15)';c.beginPath();c.ellipse(105,600,52,9,0,0,7);c.fill();
 if(back){c.save();c.translate(105,77);c.scale(.85,.85);c.translate(-240,0);drawModel(c,now,gd,'top','back');c.restore()}
 const mx=204,my=44,mw=242,mh=532,k=.82,rr=(c.roundRect||c.rect);
 c.save();c.beginPath();rr.call(c,mx,my,mw,mh,16);c.clip();c.fillStyle='#eeecf3';c.fillRect(mx,my,mw,mh);
 c.drawImage(sc,mx+mw/2-240*k,60-26*k,480*k,640*k);
 g=c.createLinearGradient(mx,my,mx+mw,my+mh);g.addColorStop(0,'rgba(255,255,255,.3)');g.addColorStop(.35,'rgba(255,255,255,0)');g.addColorStop(.7,'rgba(255,255,255,.1)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(mx,my,mw,mh);
 c.restore();c.strokeStyle='#14141a';c.lineWidth=9;c.beginPath();rr.call(c,mx,my,mw,mh,16);c.stroke()}

export {drawG,sway,drawModel,drawRoom};
