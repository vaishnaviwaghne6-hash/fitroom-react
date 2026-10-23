import {useState,useEffect} from 'react';
import {FLORAL,clamp,PATHS,DETAIL,TYPES,B,HOME,norm,sim,TIPS,SIZES,MATS,OCC,CLIM,STEPS} from './data.js';
import Capture from './components/Capture.jsx';
import TryOn from './components/TryOn.jsx';
import Thumb from './components/Thumb.jsx';
function App(){
 const [step,setStep]=useState(0),[type,setType]=useState(null),[size,setSize]=useState(1),[mid,setMid]=useState('cotton'),[sw,setSw]=useState(null);
 const [ht,setHt]=useState(170),[wt,setWt]=useState(68),[clim,setClim]=useState('mild'),[occ,setOcc]=useState('casual'),[dark,setDark]=useState(false);
 const [stream,setStream]=useState(null),[err,setErr]=useState(''),[looks,setLooks]=useState([]),[gender,setGender]=useState('female'),[q,setQ]=useState('');
 useEffect(()=>{document.documentElement.setAttribute('data-theme',dark?'dark':'light')},[dark]);
 const startCam=async()=>{try{setStream(await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}));setErr('')}catch(e){setErr('The camera is blocked here. Open this page in its own tab and allow camera access, or upload photos instead.')}};
 const chest=.45*ht+.4*wt-(gender==='female'?15:12),recIdx=SIZES.reduce((b,s,i)=>Math.abs(s.chest-chest)<Math.abs(SIZES[b].chest-chest)?i:b,0);
 const mat=MATS.find(m=>m.id===mid),T=TYPES.find(x=>x.id===type)||TYPES[0];
 const fit=Math.max(40,100-Math.abs(size-recIdx)*20),match=sw&&!sw.skipped?clamp(100-.6*Math.abs(sw.tex-mat.tex)-.4*Math.abs(sw.shn-mat.sheen)):85;
 const heat=(T.w+mat.warm)/2,season=clamp(100-Math.abs(heat-CLIM[clim])*.8),score=Math.round(.45*fit+.25*match+.3*season);
 const rank=MATS.map(m=>({...m,sc:Math.round(clamp(.5*(100-Math.abs((T.w+m.warm)/2-CLIM[clim])*1.2)+.5*OCC[occ][m.id]))})).sort((a,b)=>b.sc-a.sc);
 const tip='Style tip: pair with '+TIPS[T.cat][['casual','work','party','sport'].indexOf(occ)]+'.';
 const pool=TYPES.filter(t=>t.g==='u'||t.g===(gender==='male'?'m':'f')),toks=norm(q).split(' ').filter(Boolean);
 const list=toks.length?pool.filter(t=>toks.every(k=>norm(t.name+' '+t.kw).includes(k))):pool;
 const close=toks.length&&!list.length?pool.map(t=>({t,s:sim(q,t)})).sort((a,b)=>b.s-a.s).slice(0,3).map(o=>o.t):[];
 const card=t=><button key={t.id} className={'opt'+(type===t.id?' sel':'')} onClick={()=>setType(t.id)}><Thumb t={t} w={58} h={88}/><b>{t.name}</b>{t.n&&<small>{t.n}</small>}</button>;
 const demo=()=>{setGender('female');setType('gown');setMid('floral');setSw({canvas:FLORAL,floral:true,hex:'#f0d9e6',tex:40,shn:30,url:null,skipped:true});setStep(4)};
 const ok=[type,true,true,sw,true][step];
 return <div className="wrap">
  <header><div className="brand"><span className="logo"></span><div><h1>Fitroom</h1><div className="mute">See a fabric on you before you buy it</div></div></div><button className="themebtn" onClick={()=>setDark(!dark)}>{dark?'Light':'Dark'} mode</button></header>
  <div className="steps">{STEPS.map((s,i)=><div key={s} className={i===step?'on':i<step?'done':''}>{i+1}. {s}</div>)}</div>
  {step<4?<div className="card" key={step}>
   {step===0&&<div><h2>Select a dress</h2><p className="mute">Choose the model, then search any dress or browse the list.</p>
    <div className="seg" style={{marginTop:12}}>{['female','male'].map(g=><button key={g} className={gender===g?'on':''} onClick={()=>setGender(g)}>{g==='female'?'Female model':'Male model'}</button>)}</div>
    <button className="btn alt" style={{marginBottom:8}} onClick={demo}>Quick demo: floral ball gown in the mirror room</button><input className="search" placeholder="Search any dress: saree, jeans, blazer, lehenga, hoodie…" value={q} onInput={e=>setQ(e.target.value)}/>
    {list.length?<div className="grid">{list.map(card)}</div>:<div><p className="mute" style={{marginTop:10}}>No exact model for “{q}”. Closest styles we can show:</p><div className="grid">{close.map(card)}</div></div>}</div>}
   {step===1&&<div className="cols"><div><h2>Choose your size</h2><p className="mute">S, M, L or XL.</p><div className="grid">{SIZES.map((s,i)=><button key={s.id} className={'opt'+(size===i?' sel':'')} onClick={()=>setSize(i)}><b style={{fontSize:22}}>{s.id}</b><small>chest {s.chest} cm</small></button>)}</div></div>
    <div><h3>Not sure? Estimate from your body</h3><div className="row2"><div><label>Height (cm)</label><input type="number" value={ht} onInput={e=>setHt(+e.target.value||0)}/></div><div><label>Weight (kg)</label><input type="number" value={wt} onInput={e=>setWt(+e.target.value||0)}/></div></div>
    <p style={{margin:'12px 0 6px'}}>Estimated chest <b>{Math.round(chest)} cm</b>, suggested size <b>{SIZES[recIdx].id}</b></p><button className="btn alt" onClick={()=>setSize(recIdx)}>Use {SIZES[recIdx].id}</button><p className="mute">This is a rough estimate. Check the brand's size chart for exact fit.</p></div></div>}
   {step===2&&<div><h2>Select a dress material</h2><p className="mute">Pick the fabric you are considering.</p><div className="grid">{MATS.map(m=><button key={m.id} className={'opt'+(mid===m.id?' sel':'')} onClick={()=>setMid(m.id)}><div style={{height:30,borderRadius:6,background:m.c,marginBottom:6}}></div><b>{m.name}</b><small>{m.note}</small><small style={{display:'block'}}>warmth {m.warm} · breathability {m.air}</small></button>)}</div></div>}
   {step===3&&<Capture sw={sw} setSw={setSw} stream={stream} startCam={startCam} err={err} mat={mat}/>}
   <div className="bar"><button className="btn" disabled={!ok} onClick={()=>setStep(step+1)}>{step===3?'See it on me':'Continue'}</button>{step>0&&<button className="btn alt" onClick={()=>setStep(step-1)}>Back</button>}</div>
  </div>:<div>
   <TryOn type={type} size={size} recIdx={recIdx} sw={sw} mat={mat} stream={stream} startCam={startCam} err={err} score={score} gender={gender} setGender={setGender} pool={pool} setType={setType} tip={tip} onSave={u=>setLooks([{u,l:T.name+' '+SIZES[size].id+' '+mat.name},...looks])}/>
   <div className="cols" style={{marginTop:18}}>
    <div className="card"><h3>Recommendation engine</h3><div className="mute">Climate</div><div className="seg">{Object.keys(CLIM).map(k=><button key={k} className={clim===k?'on':''} onClick={()=>setClim(k)}>{k}</button>)}</div>
     <div className="mute">Occasion</div><div className="seg">{Object.keys(OCC).map(k=><button key={k} className={occ===k?'on':''} onClick={()=>setOcc(k)}>{k}</button>)}</div>
     {rank.map((m,i)=><div className="rk" key={m.id} onClick={()=>setMid(m.id)} title="Select this material"><span style={{fontWeight:m.id===mid?800:500}}>{m.name}</span><em><i style={{width:m.sc+'%'}}></i></em><b>{m.sc}</b></div>)}
     <p className="mute">Best fabric for a {T.name.toLowerCase()}, {clim} weather, {occ} wear: <b>{rank[0].name}</b>. Click a row to switch the material.</p>
     <div className="bar"><button className="btn alt" onClick={()=>setStep(0)}>Try another dress</button><button className="btn alt" onClick={()=>setStep(3)}>Re-capture fabric</button></div></div>
    <div className="card"><h3>Saved looks</h3>{looks.length?<div className="gal">{looks.map((o,i)=><div key={i}><img src={o.u}/><div className="mute">{o.l}</div></div>)}</div>:<p className="mute">Press “Save look” to compare outfits side by side.</p>}</div>
   </div></div>}
 </div>;
}

export default App;
