import {clamp} from './data.js';
function stats(c){const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data,n=d.length/4;let r=0,g=0,b=0,hi=0,L=[];
 for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];const l=.299*d[i]+.587*d[i+1]+.114*d[i+2];L.push(l);if(l>205)hi++}
 const m=L.reduce((a,v)=>a+v,0)/n;return{r:r/n,g:g/n,b:b/n,hi:hi/n,sd:Math.sqrt(L.reduce((a,v)=>a+(v-m)**2,0)/n)}}
const hex=(r,g,b)=>'#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
function makeSwatch(c,a){const sc=document.createElement('canvas');sc.width=sc.height=96;sc.getContext('2d').drawImage(c,0,0);
 return{canvas:sc,hex:hex(a.r,a.g,a.b),tex:clamp(a.sd*3),shn:clamp(a.hi*400),url:sc.toDataURL()}}
const texLabel=t=>t<25?'Smooth':t<55?'Medium weave':'Coarse weave';


export {stats,hex,makeSwatch,texLabel};
