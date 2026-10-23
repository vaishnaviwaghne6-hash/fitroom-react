import {useState,useEffect,useRef} from 'react';
import {clamp,FLORAL} from '../data.js';
import {stats,makeSwatch,texLabel} from '../utils.js';
function Capture({sw,setSw,stream,startCam,err,mat}){
 const vid=useRef(),[prog,setProg]=useState(null),[url,setUrl]=useState(null);
 useEffect(()=>{if(vid.current&&stream){vid.current.srcObject=stream;vid.current.play().catch(()=>{})}},[stream]);
 const record=()=>{const v=vid.current,c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d'),ch=[];let mr=null,t=0;const acc=[];
  try{mr=new MediaRecorder(stream);mr.ondataavailable=e=>ch.push(e.data);mr.onstop=()=>setUrl(URL.createObjectURL(new Blob(ch,{type:'video/webm'})));mr.start()}catch(e){}
  setProg(0);const id=setInterval(()=>{const z=Math.min(v.videoWidth,v.videoHeight)*.4;x.drawImage(v,(v.videoWidth-z)/2,(v.videoHeight-z)/2,z,z,0,0,96,96);acc.push(stats(c));t++;setProg(Math.round(t/24*100));
   if(t>=24){clearInterval(id);mr&&mr.state!=='inactive'&&mr.stop();const k=acc.length,a={};['r','g','b','hi','sd'].forEach(f=>a[f]=acc.reduce((s,o)=>s+o[f],0)/k);setSw(makeSwatch(c,a));setProg(null)}},250)};
 const upload=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=96;const z=Math.min(im.width,im.height)*.6;c.getContext('2d').drawImage(im,(im.width-z)/2,(im.height-z)/2,z,z,0,0,96,96);setSw(makeSwatch(c,stats(c)))};im.src=URL.createObjectURL(f)};
 const match=sw?Math.round(clamp(100-.6*Math.abs(sw.tex-mat.tex)-.4*Math.abs(sw.shn-mat.sheen))):0;
 return <div><h2>Capture the fabric</h2><p className="mute">Hold the {mat.name.toLowerCase()} fabric in front of the camera, inside the dashed box, and record 6 seconds. The colour and texture are measured from the video frames.</p>
 <div className="cols"><div>
  <div className={'cam'+(prog!==null?' rec':'')}>{stream?<video ref={vid} muted playsInline></video>:'Camera is off'}{stream&&<div className="guide">hold fabric here</div>}</div>
  {prog!==null&&<div className="prog"><i style={{width:prog+'%'}}></i></div>}
  <div className="bar">{!stream?<button className="btn" onClick={startCam}>Start camera</button>:<button className="btn" disabled={prog!==null} onClick={record}>{prog!==null?'Recording '+prog+'%':'Record 6 s'}</button>}
   <label className="btn alt" style={{margin:0,cursor:'pointer'}}>Upload fabric photo<input type="file" accept="image/*" hidden onChange={upload}/></label>
   <button className="btn alt" onClick={()=>setSw({canvas:mat.id==='floral'?FLORAL:null,floral:mat.id==='floral',hex:mat.c,tex:mat.tex,shn:mat.sheen,url:null,skipped:true})}>Skip, use catalog colour</button></div>
  {err&&<div className="err">{err}</div>}
  {url&&<><p className="mute" style={{marginTop:12}}>Your recording</p><video src={url} controls style={{width:'100%',borderRadius:10}}></video></>}
 </div><div>
  <h3>Analysis</h3>
  {!sw?<p className="mute">No fabric captured yet.</p>:<div>
   {sw.url&&<img src={sw.url} width="96" height="96" style={{borderRadius:10,border:'1px solid var(--line)'}}/>}
   <div className="kv"><span>Colour</span><b><span className="sw" style={{background:sw.hex}}></span>{sw.hex}</b></div>
   <div className="kv"><span>Texture</span><b>{texLabel(sw.tex)} ({Math.round(sw.tex)})</b></div>
   <div className="kv"><span>Sheen</span><b>{Math.round(sw.shn)}</b></div>
   {!sw.skipped&&<div className="kv"><span>Match with {mat.name}</span><b>{match}%</b></div>}
   <p className="mute">{sw.skipped?'Using the catalog colour for '+mat.name+'.':match>=70?'The fabric you showed behaves like '+mat.name+'.':'The fabric looks different from '+mat.name+'. You may have picked another material.'}</p></div>}
 </div></div></div>;
}


export default Capture;
