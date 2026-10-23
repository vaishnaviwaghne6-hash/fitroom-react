import {useState,useEffect,useRef,useMemo} from 'react';
import {PATHS,DETAIL,TYPES,SIZES,B,HOME} from '../data.js';
import {drawG,sway,drawModel,drawRoom} from '../draw.js';
import Thumb from './Thumb.jsx';
function TryOn(p){
 const {type,size,recIdx,sw,mat,stream,startCam,err,onSave,score}=p;
 const cv=useRef(),vid=useRef(),[src,setSrc]=useState('model'),[mir,setMir]=useState(true),[img,setImg]=useState(null),[t,setT]=useState(HOME(p.gender,B(type))),[tint,setTint]=useState(null),[note,setNote]=useState('');
 const base=useMemo(()=>{const c=document.createElement('canvas');c.width=480;c.height=640;return c},[]);const scn=useMemo(()=>{const c=document.createElement('canvas');c.width=480;c.height=640;return c},[]);
 const rel=SIZES[size].k/SIZES[recIdx].k;const use=s=>{setSrc(s);setMir(s==='model');setT(s==='model'?HOME(p.gender,B(type)):{x:240,y:250,s:1,r:0,o:95})};
 const R=useRef();const st=useRef(0);useEffect(()=>{st.current=performance.now()},[type,size,mat.id,tint]);R.current={t,src,img,tint,type,rel,sw,gender:p.gender,mir,mid:mat.id};useEffect(()=>{if(R.current.src==='model')setT(HOME(p.gender,B(type)))},[type,p.gender]);
 useEffect(()=>{if(vid.current&&stream){vid.current.srcObject=stream;vid.current.play().catch(()=>{})}},[stream]);
 useEffect(()=>{let raf;const loop=()=>{const {t,src,img,tint,type,rel,sw}=R.current,W=480,H=640,b=base.getContext('2d'),v=vid.current;
  const now=performance.now();b.fillStyle='#d9dde3';b.fillRect(0,0,W,H);let el=null,w,h;
  if(src==='cam'&&v&&v.videoWidth){el=v;w=v.videoWidth;h=v.videoHeight}else if(src==='photo'&&img){el=img;w=img.width;h=img.height}
  if(el){const s=Math.max(W/w,H/h);b.save();if(src==='cam'){b.translate(W,0);b.scale(-1,1)}b.drawImage(el,(W-w*s)/2,(H-h*s)/2,w*s,h*s);b.restore()}
  else if(src==='model'){drawModel(b,now,R.current.gender,B(type).cat);el=1}else{b.fillStyle='#667085';b.font='16px Manrope,sans-serif';b.textAlign='center';b.fillText('Start the camera or upload your photo',W/2,H/2)}
  const main=cv.current.getContext('2d'),mir=R.current.mir,c=mir?scn.getContext('2d'):main;if(mir)c.clearRect(0,0,W,H);c.drawImage(base,0,0);
  if(el){const e=Math.min(1,(now-st.current)/450),eo=1+2.7*Math.pow(e-1,3)+1.7*Math.pow(e-1,2),s=t.s*rel*(W*.46/84)*eo,pa=new Path2D(PATHS[B(type).base]);c.save();if(src==='model')sway(c,now);c.translate(t.x,t.y);c.rotate(t.r*Math.PI/180);c.scale(s,s*(B(type).vy||.74));c.translate(-100,-14);c.globalAlpha=t.o/100*Math.min(1,e*2);
   drawG(c,B(type).base,tint||sw.hex,(!tint&&sw.canvas)?sw.canvas:null,sw.floral,sw.shn,now,R.current.mid);c.restore()}
  if(mir)drawRoom(main,scn,now,R.current.gender,R.current.src==='model');raf=requestAnimationFrame(loop)};loop();return()=>cancelAnimationFrame(raf)},[]);
 const align=async()=>{if(!('FaceDetector' in window)){setNote('Auto-align needs a browser with face detection (Chrome). Drag the garment or use the sliders.');return}
  try{const f=await new FaceDetector({fastMode:true}).detect(base);if(!f.length){setNote('No face found. Move so your face is visible, or align manually.');return}
   const b=f[0].boundingBox;setT(o=>({...o,x:b.x+b.width/2,y:b.y+b.height*1.15,s:+(b.width*2.6/(rel*480*.46)).toFixed(2),r:0}));setNote('Aligned to your face. Fine-tune with the sliders.')}catch(e){setNote('Face detection failed. Align manually.')}};
 const drag=useRef(null);
 const mv=e=>{if(!drag.current||R.current.mir)return;const r=cv.current.getBoundingClientRect(),k=480/r.width;setT(o=>({...o,x:o.x+e.movementX*k,y:o.y+e.movementY*k}))};
 const photo=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{setImg(im);use('photo')};im.src=URL.createObjectURL(f)};
 const sl=(k,a,b,s)=><input type="range" min={a} max={b} step={s} value={t[k]} onInput={e=>setT({...t,[k]:+e.target.value})}/>;
 return <div className="cols"><div>
  <div style={{position:'relative'}}><canvas ref={cv} width="480" height="640" onPointerDown={e=>{drag.current=1;e.target.setPointerCapture(e.pointerId)}} onPointerMove={mv} onPointerUp={()=>drag.current=null}></canvas>{mir&&<div className="gpanel">{p.pool.slice(0,10).map(t=><button key={t.id} className={t.id===type?'on':''} title={t.name} onClick={()=>p.setType(t.id)}><Thumb t={t} w={26} h={40}/></button>)}</div>}</div>
  <video ref={vid} muted playsInline style={{display:'none'}}></video>
  <div className="bar"><button className="btn" disabled={src==='model'} onClick={align}>Auto-align to me</button><button className="btn alt" onClick={()=>onSave(cv.current.toDataURL('image/jpeg',.7))}>Save look</button>
   <button className={'btn alt'+(src==='model'?' on':'')} onClick={()=>use('model')}>Dummy model</button><button className="btn alt" onClick={()=>p.setGender(p.gender==='male'?'female':'male')}>{p.gender==='male'?'Switch to female':'Switch to male'}</button><button className={'btn alt'+(mir?' on':'')} onClick={()=>setMir(!mir)}>Mirror room</button><button className={'btn alt'+(src==='cam'?' on':'')} onClick={async()=>{if(!stream)await startCam();use('cam')}}>{stream?'My camera':'Start camera'}</button>
   <label className="btn alt" style={{margin:0,cursor:'pointer'}}>Upload my photo<input type="file" accept="image/*" hidden onChange={photo}/></label></div>
  <p className="mute">{note||err||'Tip: for a photo-real look, upload a full-body photo of a real person with a plain background.'}</p>
 </div><div className="card">
  <h3>Adjust</h3>
  <label>Left / right</label>{sl('x',0,480,1)}<label>Up / down</label>{sl('y',0,640,1)}<label>Fit scale</label>{sl('s',.5,1.8,.01)}<label>Rotate</label>{sl('r',-15,15,.5)}<label>Opacity</label>{sl('o',50,100,1)}
  <label>Recolour</label><div className="seg">{[null,'#14181f','#f2efe6','#2f5fa8','#a3262a','#2f7d4f'].map(c=><button key={c||'n'} className={tint===c?'on':''} onClick={()=>setTint(c)}>{c?<span className="sw" style={{background:c,margin:0}}></span>:'Captured fabric'}</button>)}</div>
  <h3 style={{marginTop:14}}>Fit report</h3>
  <div className="kv"><span>Dress</span><b>{TYPES.find(x=>x.id===type).name}, {SIZES[size].id}</b></div>
  <div className="kv"><span>Your estimated size</span><b>{SIZES[recIdx].id} (chest ~{SIZES[recIdx].chest} cm)</b></div>
  <div className="kv"><span>Overall match</span><div className="ring" style={{'--p':score}}><b>{score}</b></div></div><p className="mute">{p.tip}</p>
 </div></div>;
}


export default TryOn;
