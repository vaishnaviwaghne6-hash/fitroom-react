import {useRef,useEffect} from 'react';
import {TYPES,FLORAL} from '../data.js';
import {drawG} from '../draw.js';
function Thumb({t,w,h}){const r=useRef();useEffect(()=>{const c=r.current.getContext('2d'),s=h*2/304;c.clearRect(0,0,w*2,h*2);c.save();c.scale(s,s);c.translate(w/s-100,6);
 const gw=t.id==='gown';drawG(c,t.base,gw?'#f0d9e6':['#c0467a','#3b5fc0','#2fa085','#d9a02e','#8a5ad0','#3a3f55','#d97a4a','#2f7d9a'][TYPES.indexOf(t)%8],gw?FLORAL:null,gw,30,0,'cotton');c.restore()},[t.id]);
 return <canvas ref={r} width={w*2} height={h*2} style={{width:w,height:h,display:'block',margin:'0 auto 6px',boxShadow:'none',borderRadius:0,background:'transparent',cursor:'pointer'}}></canvas>}

export default Thumb;
