'use client';
import { useState, useRef, useEffect } from 'react';
import { TOOLS, PILLARS } from '../lib/tools';

function md(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3 style="font-size:15px;font-weight:700;margin:18px 0 6px;color:#111">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:17px;font-weight:700;margin:20px 0 8px;color:#111">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:20px;font-weight:700;margin:20px 0 10px;color:#111">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^[-*] (.+)$/gm, '<li style="margin:4px 0;margin-left:18px;list-style:disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:6px 0;margin-left:18px;list-style:decimal">$1</li>')
    .replace(/\n{2,}/g, '</p><p style="margin:8px 0">')
    .replace(/\n/g, '<br/>');
}

export default function Home() {
  const [activeTool, setActiveTool] = useState(null);
  const [inputs, setInputs] = useState({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(0);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const filtered = filter === 0 ? TOOLS : TOOLS.filter(t => t.pillar === filter);

  useEffect(() => {
    document.body.style.overflow = activeTool ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeTool]);

  const open = (tool) => { setActiveTool(tool); setInputs({}); setOutput(''); setError(''); };
  const close = () => { setActiveTool(null); setOutput(''); setError(''); };

  const run = async () => {
    const missing = activeTool.fields.find(f => !inputs[f.key]?.trim());
    if (missing) { setError(`Please fill in: ${missing.label}`); return; }
    setError(''); setLoading(true); setOutput('');
    const labeled = {};
    activeTool.fields.forEach(f => { labeled[f.label] = inputs[f.key]; });
    try {
      const res = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: activeTool.id, inputs: labeled, systemPrompt: activeTool.systemPrompt }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else { setOutput(data.result); setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); }
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F6F3', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .tc{transition:all .18s ease}
        .tc:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
        textarea:focus{outline:none}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
        @media(max-width:680px){.grid3{grid-template-columns:1fr!important}.grid4{grid-template-columns:repeat(2,1fr)!important}.h1big{font-size:30px!important}}
      `}</style>

      {/* MODAL */}
      {activeTool && (
        <div onClick={e => { if (e.target === e.currentTarget) close(); }}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.55)', zIndex:1000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'20px 16px', overflowY:'auto', backdropFilter:'blur(4px)' }}>
          <div style={{ background:'#fff', borderRadius:'20px', maxWidth:'680px', width:'100%', marginTop:'20px', marginBottom:'20px', overflow:'hidden', boxShadow:'0 40px 120px rgba(0,0,0,.25)', animation:'fadeUp .2s ease' }}>

            <div style={{ background:activeTool.lightBg, padding:'26px 30px 22px', borderBottom:'1px solid rgba(0,0,0,.07)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', gap:'12px' }}>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'.1em', color:activeTool.color, background:'rgba(255,255,255,.7)', padding:'3px 10px', borderRadius:'20px' }}>{activeTool.pillarLabel}</span>
                  <div style={{ fontSize:'30px', margin:'10px 0 6px' }}>{activeTool.emoji}</div>
                  <h2 style={{ fontSize:'21px', fontWeight:'700', color:'#0a0a0a', margin:'0 0 7px' }}>{activeTool.title}</h2>
                  <p style={{ fontSize:'13px', color:'#555', lineHeight:'1.6' }}>{activeTool.desc}</p>
                </div>
                <button onClick={close} aria-label="Close" style={{ background:'rgba(0,0,0,.08)', border:'none', borderRadius:'50%', width:'34px', height:'34px', cursor:'pointer', fontSize:'20px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#444' }}>×</button>
              </div>
            </div>

            <div style={{ padding:'26px 30px' }}>
              {activeTool.fields.map(f => (
                <div key={f.key} style={{ marginBottom:'16px' }}>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#222', marginBottom:'6px' }}>{f.label}</label>
                  <textarea placeholder={f.placeholder} value={inputs[f.key]||''} onChange={e=>setInputs(p=>({...p,[f.key]:e.target.value}))}
                    rows={f.key==='resume'||f.key==='job_posting'?6:3}
                    style={{ width:'100%', padding:'11px 13px', border:`1.5px solid #E0E0DA`, borderRadius:'10px', fontSize:'13px', resize:'vertical', lineHeight:'1.6', fontFamily:'inherit', background:'#FAFAF8', transition:'border-color .2s' }}
                    onFocus={e=>e.target.style.borderColor=activeTool.color}
                    onBlur={e=>e.target.style.borderColor='#E0E0DA'} />
                </div>
              ))}
              {error && <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color:'#B91C1C', marginBottom:'14px' }}>⚠️ {error}</div>}
              <button onClick={run} disabled={loading}
                style={{ width:'100%', padding:'14px', background:loading?'#999':activeTool.color, color:'#fff', border:'none', borderRadius:'12px', fontWeight:'700', fontSize:'15px', cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontFamily:'inherit' }}>
                {loading ? <><span style={{ width:'17px', height:'17px', border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 1s linear infinite', display:'inline-block' }}></span>Analyzing...</> : '✨ Generate with AI'}
              </button>
            </div>

            {output && (
              <div ref={outputRef} style={{ borderTop:'1px solid #F0EFEB', padding:'26px 30px', background:'#FDFDFB' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22C55E', animation:'pulse 2s infinite', display:'inline-block' }}></span>
                    <span style={{ fontSize:'12px', fontWeight:'600', color:'#555' }}>AI Result</span>
                  </div>
                  <button onClick={copy} style={{ background:copied?activeTool.lightBg:'#F3F3EF', border:'none', borderRadius:'8px', padding:'5px 13px', fontSize:'12px', cursor:'pointer', color:copied?activeTool.color:'#555', fontWeight:'600', fontFamily:'inherit' }}>
                    {copied?'✓ Copied!':'📋 Copy'}
                  </button>
                </div>
                <div style={{ fontSize:'14px', lineHeight:'1.75', color:'#1a1a1a' }} dangerouslySetInnerHTML={{ __html: md(output) }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ background:'#fff', borderBottom:'1px solid #EBEBE5', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:'1120px', margin:'0 auto', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'34px', height:'34px', background:'linear-gradient(135deg,#0D7A5F,#1558A8)', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px' }}>🛡️</div>
            <div>
              <div style={{ fontSize:'15px', fontWeight:'700', color:'#0a0a0a', lineHeight:1.1, fontFamily:"'DM Serif Display',serif" }}>AIClaimPath</div>
              <div style={{ fontSize:'10px', color:'#999', letterSpacing:'.07em' }}>OPEN SOURCE TOOLKIT</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <a href="https://github.com/rahul12riim/aiclaimpath_ucm" target="_blank" rel="noreferrer"
              style={{ fontSize:'12px', color:'#555', textDecoration:'none', padding:'7px 13px', border:'1px solid #DEDED8', borderRadius:'8px', fontWeight:'600' }}>⭐ GitHub</a>
            <a href="#tools" style={{ fontSize:'12px', background:'#0D7A5F', color:'#fff', textDecoration:'none', borderRadius:'8px', padding:'7px 16px', fontWeight:'700' }}>Try Free →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background:'#0C1A2E', color:'#fff', padding:'70px 24px 56px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.04, backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize:'40px 40px' }}></div>
        <div style={{ position:'absolute', top:'-60px', left:'50%', transform:'translateX(-50%)', width:'500px', height:'260px', background:'radial-gradient(ellipse,rgba(13,122,95,.3) 0%,transparent 70%)', pointerEvents:'none' }}></div>
        <div style={{ maxWidth:'680px', margin:'0 auto', position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', borderRadius:'24px', padding:'5px 14px 5px 10px', marginBottom:'22px', fontSize:'12px', color:'#9FE1CB' }}>
            <span style={{ width:'7px', height:'7px', background:'#4ADE80', borderRadius:'50%', animation:'pulse 2s infinite', display:'inline-block', flexShrink:0 }}></span>
            Free · Open Source · 9 AI Tools · All 50 States
          </div>
          <h1 className="h1big" style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(28px,5vw,50px)', fontWeight:'400', lineHeight:1.15, marginBottom:'14px' }}>
            Your complete <em style={{ fontStyle:'italic', color:'#5DCAA5' }}>unemployment</em><br/>recovery toolkit
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,.6)', lineHeight:1.75, marginBottom:'32px', maxWidth:'500px', margin:'0 auto 32px' }}>
            File claims · Land your next job · Reskill for free. AI-powered, no sign-up required.
          </p>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            {PILLARS.map(p => (
              <button key={p.id} onClick={() => { setFilter(p.id); document.getElementById('tools').scrollIntoView({ behavior:'smooth' }); }}
                style={{ padding:'10px 20px', background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.18)', borderRadius:'30px', color:'rgba(255,255,255,.85)', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:'inherit' }}>
                {p.emoji} {p.title} →
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:'#fff', borderBottom:'1px solid #EBEBE5' }}>
        <div className="grid4" style={{ maxWidth:'1120px', margin:'0 auto', padding:'16px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', textAlign:'center' }}>
          {[['9','AI Tools'],['50','States'],['100%','Free'],['MIT','License']].map(([n,l]) => (
            <div key={l}><div style={{ fontSize:'20px', fontWeight:'700', color:'#0D7A5F', fontFamily:"'DM Serif Display',serif" }}>{n}</div><div style={{ fontSize:'11px', color:'#777', marginTop:'2px' }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* PILLAR TABS */}
      <div style={{ background:'#F7F6F3', borderBottom:'1px solid #EBEBE5', padding:'16px 24px' }}>
        <div className="grid3" style={{ maxWidth:'1120px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
          {PILLARS.map(p => (
            <button key={p.id} onClick={() => setFilter(filter===p.id?0:p.id)}
              style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', borderRadius:'12px', border:`2px solid ${filter===p.id?p.color:'#E5E5DF'}`, background:filter===p.id?p.lightBg:'#fff', cursor:'pointer', textAlign:'left', fontFamily:'inherit', transition:'all .15s' }}>
              <div style={{ width:'40px', height:'40px', background:p.lightBg, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>{p.emoji}</div>
              <div>
                <div style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'.09em', color:p.color }}>{p.label}</div>
                <div style={{ fontSize:'13px', fontWeight:'700', color:'#111' }}>{p.title}</div>
                <div style={{ fontSize:'11px', color:'#777' }}>{p.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TOOLS */}
      <main id="tools" style={{ maxWidth:'1120px', margin:'0 auto', padding:'36px 24px 60px' }}>
        {filter !== 0 && (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontSize:'19px', fontWeight:'700', color:'#111' }}>{PILLARS.find(p=>p.id===filter)?.title} Tools</h2>
            <button onClick={()=>setFilter(0)} style={{ fontSize:'12px', color:'#555', background:'#EEEEE8', border:'none', borderRadius:'8px', padding:'6px 14px', cursor:'pointer', fontFamily:'inherit', fontWeight:'500' }}>← All Tools</button>
          </div>
        )}
        <div className="grid3" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'14px' }}>
          {filtered.map((tool, i) => (
            <div key={tool.id} className="tc" onClick={() => open(tool)}
              style={{ background:'#fff', borderRadius:'16px', border:'1px solid #E5E5DF', padding:'22px', cursor:'pointer', position:'relative', overflow:'hidden', animation:`fadeUp .25s ease ${i*.04}s both` }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:tool.color, opacity:.8 }}></div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
                <div style={{ width:'44px', height:'44px', background:tool.lightBg, borderRadius:'11px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'21px' }}>{tool.emoji}</div>
                <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'.09em', color:tool.color, background:tool.lightBg, padding:'3px 10px', borderRadius:'20px' }}>{tool.pillarLabel}</span>
              </div>
              <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#0a0a0a', margin:'0 0 4px' }}>{tool.title}</h3>
              <p style={{ fontSize:'12px', color:'#888', fontStyle:'italic', margin:'0 0 10px' }}>{tool.subtitle}</p>
              <p style={{ fontSize:'12px', color:'#555', lineHeight:'1.55', margin:'0 0 16px' }}>{tool.desc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:'4px', color:tool.color, fontSize:'12px', fontWeight:'700' }}>Use tool →</div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background:'#0C1A2E', color:'rgba(255,255,255,.4)', padding:'32px 24px', textAlign:'center', fontSize:'12px', lineHeight:'2.2' }}>
        <div style={{ fontSize:'24px', marginBottom:'8px' }}>🛡️</div>
        <strong style={{ color:'rgba(255,255,255,.85)', fontSize:'14px' }}>AIClaimPath.com</strong><br/>
        Open Source Unemployment Recovery Toolkit · MIT License<br/>
        Free forever · No tracking · No data stored · Powered by Claude AI<br/>
        <a href="https://github.com/rahul12riim/aiclaimpath_ucm" target="_blank" rel="noreferrer" style={{ color:'#5DCAA5', textDecoration:'none', fontWeight:'600' }}>⭐ Star on GitHub</a>
        {' · '}
        <a href="mailto:eg13rahuliim@gmail.com" style={{ color:'#60A5FA', textDecoration:'none' }}>Contribute</a>
      </footer>
    </div>
  );
}
