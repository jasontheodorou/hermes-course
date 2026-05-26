import { useState, useEffect } from "react";

// ─── Shared arrow markers ───
function ArrowDefs() {
  return (
    <defs>
      <marker id="a-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#1d70b8"/></marker>
      <marker id="a-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#d4351c"/></marker>
      <marker id="a-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#00703c"/></marker>
      <marker id="a-purple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#4c2c92"/></marker>
      <marker id="a-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#f47738"/></marker>
      <marker id="a-black" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#0b0c0c"/></marker>
    </defs>
  );
}

const S = { w: "100%", d: "block", m: "20px auto" }; // shared svg style
const svgS = (maxW = 700) => ({ width: S.w, maxWidth: maxW, display: S.d, margin: S.m });
const F = { sans: "Source Sans 3,sans-serif", mono: "JetBrains Mono,monospace" };

// ─── 1.1 Agent Loop ───
function AgentLoopDiagram() {
  return (
    <svg viewBox="0 0 700 320" style={svgS()}>
      <ArrowDefs/>
      <rect x="20" y="120" width="120" height="60" rx="4" fill="#f3f2f1" stroke="#0b0c0c" strokeWidth="2"/>
      <text x="80" y="147" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#0b0c0c">You</text>
      <text x="80" y="165" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">type a message</text>
      <line x1="140" y1="150" x2="195" y2="150" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      <rect x="200" y="110" width="140" height="80" rx="4" fill="#1d70b8"/>
      <text x="270" y="143" textAnchor="middle" fontFamily={F.sans} fontSize="16" fontWeight="700" fill="#fff">LLM</text>
      <text x="270" y="162" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.85">decides what to do</text>
      <text x="270" y="178" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#fff" opacity="0.7">run_agent.py</text>
      <polygon points="440,150 490,120 540,150 490,180" fill="#fff" stroke="#0b0c0c" strokeWidth="2"/>
      <text x="490" y="147" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600">Tool</text>
      <text x="490" y="160" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600">needed?</text>
      <line x1="340" y1="150" x2="435" y2="150" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      <text x="518" y="195" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#d4351c">YES</text>
      <line x1="490" y1="180" x2="490" y2="240" stroke="#d4351c" strokeWidth="2" markerEnd="url(#a-red)"/>
      <rect x="420" y="245" width="140" height="55" rx="4" fill="#d4351c15" stroke="#d4351c" strokeWidth="2"/>
      <text x="490" y="268" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#d4351c">Tools</text>
      <text x="490" y="286" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#d4351c">terminal, files, web…</text>
      <path d="M420,272 L270,272 L270,195" fill="none" stroke="#d4351c" strokeWidth="2" markerEnd="url(#a-red)" strokeDasharray="6,3"/>
      <text x="345" y="264" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#d4351c" fontStyle="italic">result</text>
      <text x="558" y="140" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#00703c">NO</text>
      <line x1="540" y1="150" x2="590" y2="150" stroke="#00703c" strokeWidth="2" markerEnd="url(#a-green)"/>
      <rect x="595" y="120" width="90" height="60" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="2"/>
      <text x="640" y="147" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#00703c">Reply</text>
      <text x="640" y="163" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#00703c">to you</text>
      <rect x="260" y="18" width="180" height="32" rx="16" fill="#0b0c0c"/>
      <text x="350" y="39" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="600" fill="#fff">The Agent Loop</text>
      <text x="350" y="72" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Repeats until the LLM has a final answer</text>
    </svg>
  );
}

// ─── 1.1 Four Parts ───
function FourPartsDiagram() {
  const parts = [
    { label: "Agent Loop", sub: "run_agent.py", desc: "Calls LLM, handles tools", color: "#1d70b8", icon: "↻" },
    { label: "Tools", sub: "tools/*.py", desc: "79 capabilities", color: "#d4351c", icon: "🔧" },
    { label: "Memory", sub: "MEMORY.md + SQLite", desc: "Persists knowledge", color: "#00703c", icon: "🧠" },
    { label: "Gateway", sub: "gateway/", desc: "Messaging platforms", color: "#4c2c92", icon: "📡" },
  ];
  return (
    <svg viewBox="0 0 700 180" style={svgS()}>
      {parts.map((p, i) => {
        const x = i * 175 + 5;
        return (<g key={i}>
          <rect x={x} y="10" width="165" height="160" rx="4" fill={`${p.color}08`} stroke={p.color} strokeWidth="2"/>
          <text x={x+82} y="50" textAnchor="middle" fontSize="28">{p.icon}</text>
          <text x={x+82} y="80" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill={p.color}>{p.label}</text>
          <text x={x+82} y="100" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">{p.desc}</text>
          <rect x={x+20} y="115" width="125" height="22" rx="3" fill="#0b0c0c"/>
          <text x={x+82} y="130" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#d0d0d0">{p.sub}</text>
          {i<3 && <line x1={x+165} y1="90" x2={x+175} y2="90" stroke="#b1b4b6" strokeWidth="1" strokeDasharray="3,3"/>}
        </g>);
      })}
    </svg>
  );
}

// ─── 1.2 First Steps Journey ───
function FirstStepsDiagram() {
  const steps = [
    { label: "Install", cmd: "curl … | bash", icon: "📥", color: "#1d70b8" },
    { label: "Configure", cmd: "hermes model", icon: "⚙️", color: "#f47738" },
    { label: "Talk", cmd: '"Read my directory"', icon: "💬", color: "#00703c" },
    { label: "Observe", cmd: "/usage, /tools", icon: "👁️", color: "#4c2c92" },
  ];
  return (
    <svg viewBox="0 0 700 140" style={svgS()}>
      <ArrowDefs/>
      {steps.map((s, i) => {
        const x = i * 175 + 8;
        return (<g key={i}>
          <rect x={x} y="15" width="158" height="110" rx="6" fill={`${s.color}08`} stroke={s.color} strokeWidth="2"/>
          <circle cx={x+25} cy="42" r="15" fill={s.color}/>
          <text x={x+25} y="47" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="700">{i+1}</text>
          <text x={x+50} y="38" fontFamily={F.sans} fontSize="20">{s.icon}</text>
          <text x={x+79} y="38" fontFamily={F.sans} fontSize="14" fontWeight="700" fill={s.color}>{s.label}</text>
          <text x={x+79} y="80" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#505a5f">{s.cmd}</text>
          {i<3 && <line x1={x+158} y1="70" x2={x+175} y2="70" stroke="#b1b4b6" strokeWidth="2" markerEnd="url(#a-black)"/>}
        </g>);
      })}
    </svg>
  );
}

// ─── 1.3 Tool Registry ───
function ToolRegistryDiagram() {
  return (
    <svg viewBox="0 0 700 260" style={svgS()}>
      <ArrowDefs/>
      {["web_tools.py","file_tools.py","terminal_tool.py","browser_tool.py","memory_tool.py"].map((n,i) => (
        <g key={i}>
          <rect x="10" y={10+i*48} width="160" height="38" rx="3" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
          <text x="90" y={34+i*48} textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#0b0c0c">{n}</text>
          <line x1="170" y1={29+i*48} x2="250" y2="130" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)" opacity="0.6"/>
        </g>
      ))}
      <rect x="255" y="85" width="170" height="90" rx="4" fill="#1d70b8"/>
      <text x="340" y="118" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#fff">Tool Registry</text>
      <text x="340" y="138" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#fff" opacity="0.8">tools/registry.py</text>
      <text x="340" y="158" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.7">schema + handler + check</text>
      <line x1="425" y1="130" x2="490" y2="130" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      <rect x="495" y="95" width="185" height="70" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="2"/>
      <text x="587" y="125" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#00703c">model_tools.py</text>
      <text x="587" y="145" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Exposes tools to the LLM</text>
      <rect x="10" y="200" width="680" height="50" rx="3" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="20" y="222" fontFamily={F.sans} fontSize="12" fontWeight="700">Every tool has 3 parts:</text>
      {[{l:"Schema",d:"what the LLM sees",c:"#1d70b8",x:200},{l:"Handler",d:"function that runs",c:"#d4351c",x:390},{l:"Check",d:"is it available?",c:"#00703c",x:570}].map((p,i)=>(
        <g key={i}><rect x={p.x} y="208" width="14" height="14" rx="2" fill={p.c}/><text x={p.x+22} y="220" fontFamily={F.sans} fontSize="12" fontWeight="600" fill={p.c}>{p.l}</text><text x={p.x+22} y="238" fontFamily={F.sans} fontSize="11" fill="#505a5f">{p.d}</text></g>
      ))}
    </svg>
  );
}

// ─── 1.4 Config ───
function ConfigDiagram() {
  return (
    <svg viewBox="0 0 700 200" style={svgS()}>
      <rect x="20" y="20" width="300" height="160" rx="4" fill="#d4351c08" stroke="#d4351c" strokeWidth="2"/>
      <rect x="20" y="20" width="300" height="36" rx="4" fill="#d4351c"/><rect x="20" y="52" width="300" height="4" fill="#d4351c"/>
      <text x="170" y="44" textAnchor="middle" fontFamily={F.mono} fontSize="13" fontWeight="600" fill="#fff">~/.hermes/.env</text>
      <text x="170" y="80" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#d4351c">SECRETS ONLY</text>
      {["API keys","Tokens","Passwords"].map((t,i)=><text key={i} x="40" y={108+i*22} fontFamily={F.sans} fontSize="13">🔒 {t}</text>)}
      <rect x="380" y="20" width="300" height="160" rx="4" fill="#1d70b808" stroke="#1d70b8" strokeWidth="2"/>
      <rect x="380" y="20" width="300" height="36" rx="4" fill="#1d70b8"/><rect x="380" y="52" width="300" height="4" fill="#1d70b8"/>
      <text x="530" y="44" textAnchor="middle" fontFamily={F.mono} fontSize="13" fontWeight="600" fill="#fff">~/.hermes/config.yaml</text>
      <text x="530" y="80" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#1d70b8">EVERYTHING ELSE</text>
      {["Model, provider settings","Tool configuration","Display, security, memory"].map((t,i)=><text key={i} x="400" y={108+i*22} fontFamily={F.sans} fontSize="13">⚙️ {t}</text>)}
    </svg>
  );
}

// ─── 1.5 Memory ───
function MemoryDiagram() {
  return (
    <svg viewBox="0 0 700 220" style={svgS()}>
      <ArrowDefs/>
      <circle cx="350" cy="110" r="50" fill="#0b0c0c"/>
      <text x="350" y="105" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#fff">Hermes</text>
      <text x="350" y="122" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.7">Agent</text>
      <rect x="20" y="20" width="180" height="80" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="2"/>
      <text x="110" y="48" textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="#00703c">MEMORY.md</text>
      <text x="110" y="68" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">General knowledge</text>
      <text x="110" y="85" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">facts, procedures, notes</text>
      <line x1="200" y1="60" x2="300" y2="100" stroke="#00703c" strokeWidth="1.5" markerEnd="url(#a-green)"/>
      <rect x="20" y="120" width="180" height="80" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="2"/>
      <text x="110" y="148" textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="#1d70b8">USER.md</text>
      <text x="110" y="168" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">About you</text>
      <text x="110" y="185" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">preferences, patterns</text>
      <line x1="200" y1="160" x2="300" y2="120" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)"/>
      <rect x="500" y="60" width="180" height="100" rx="4" fill="#4c2c9215" stroke="#4c2c92" strokeWidth="2"/>
      <text x="590" y="90" textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="#4c2c92">state.db</text>
      <text x="590" y="110" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">Session history</text>
      <text x="590" y="127" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">FTS5 full-text search</text>
      <text x="590" y="144" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">cross-session recall</text>
      <line x1="400" y1="110" x2="500" y2="110" stroke="#4c2c92" strokeWidth="1.5" markerEnd="url(#a-purple)"/>
    </svg>
  );
}

// ─── 1.6 Checkpoint Project: README Generator ───
function ReadmeProjectDiagram() {
  const steps = [
    { label: "Scan directory", tool: "terminal", color: "#1d70b8" },
    { label: "Read key files", tool: "read_file", color: "#00703c" },
    { label: "Generate README", tool: "write_file", color: "#d4351c" },
    { label: "Save to memory", tool: "memory", color: "#4c2c92" },
  ];
  return (
    <svg viewBox="0 0 700 170" style={svgS()}>
      <ArrowDefs/>
      <rect x="10" y="10" width="680" height="150" rx="6" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="350" y="35" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#0b0c0c">Project flow: what the agent does end-to-end</text>
      {steps.map((s, i) => {
        const x = i * 165 + 25;
        return (<g key={i}>
          <rect x={x} y="50" width="145" height="55" rx="4" fill={`${s.color}15`} stroke={s.color} strokeWidth="2"/>
          <text x={x+72} y="72" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
          <rect x={x+25} y="82" width="95" height="18" rx="3" fill={s.color}/>
          <text x={x+72} y="95" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#fff">{s.tool}</text>
          {i<3 && <line x1={x+145} y1="78" x2={x+165} y2="78" stroke="#0b0c0c" strokeWidth="1.5" markerEnd="url(#a-black)"/>}
        </g>);
      })}
      <text x="350" y="140" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Watch /usage after — note total tool calls and cost</text>
    </svg>
  );
}

// ─── 2.1 Skills Anatomy ───
function SkillAnatomyDiagram() {
  return (
    <svg viewBox="0 0 700 230" style={svgS()}>
      <rect x="10" y="10" width="330" height="210" rx="4" fill="#f3f2f1" stroke="#0b0c0c" strokeWidth="2"/>
      <rect x="10" y="10" width="330" height="32" rx="4" fill="#0b0c0c"/>
      <text x="175" y="31" textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="#fff">~/.hermes/skills/workflow/deploy-check/SKILL.md</text>
      <text x="20" y="62" fontFamily={F.mono} fontSize="11" fill="#505a5f">---</text>
      <text x="20" y="78" fontFamily={F.mono} fontSize="11" fill="#1d70b8">name: deploy-check</text>
      <text x="20" y="94" fontFamily={F.mono} fontSize="11" fill="#1d70b8">description: Pre-deploy checks</text>
      <text x="20" y="110" fontFamily={F.mono} fontSize="11" fill="#505a5f">---</text>
      <text x="20" y="134" fontFamily={F.mono} fontSize="11" fill="#0b0c0c"># Procedure</text>
      <text x="20" y="154" fontFamily={F.mono} fontSize="11" fill="#505a5f">1. Run test suite</text>
      <text x="20" y="170" fontFamily={F.mono} fontSize="11" fill="#505a5f">2. Check for TODOs</text>
      <text x="20" y="186" fontFamily={F.mono} fontSize="11" fill="#505a5f">3. Verify changelog</text>
      <text x="20" y="202" fontFamily={F.mono} fontSize="11" fill="#505a5f">4. Report results</text>
      {/* Annotations */}
      <line x1="340" y1="80" x2="380" y2="80" stroke="#1d70b8" strokeWidth="1.5"/>
      <rect x="385" y="55" width="170" height="50" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="1.5"/>
      <text x="470" y="75" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#1d70b8">Frontmatter</text>
      <text x="470" y="93" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">how the agent finds it</text>
      <line x1="340" y1="160" x2="380" y2="160" stroke="#00703c" strokeWidth="1.5"/>
      <rect x="385" y="130" width="170" height="60" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="1.5"/>
      <text x="470" y="152" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#00703c">Instructions</text>
      <text x="470" y="170" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">step-by-step procedure</text>
      <text x="470" y="183" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">the agent follows these</text>
      <rect x="570" y="55" width="120" height="135" rx="4" fill="#4c2c9210" stroke="#4c2c92" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="630" y="80" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#4c2c92">Invoke via</text>
      <text x="630" y="105" textAnchor="middle" fontFamily={F.mono} fontSize="12" fill="#0b0c0c">/deploy-check</text>
      <text x="630" y="130" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">or ask the agent:</text>
      <text x="630" y="150" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f" fontStyle="italic">"run deploy</text>
      <text x="630" y="165" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f" fontStyle="italic">checks"</text>
    </svg>
  );
}

// ─── 2.2 Gateway ───
function GatewayDiagram() {
  return (
    <svg viewBox="0 0 700 280" style={svgS()}>
      <ArrowDefs/>
      {[{n:"Telegram",y:15,i:"💬"},{n:"Discord",y:65,i:"🎮"},{n:"Slack",y:115,i:"💼"},{n:"WhatsApp",y:165,i:"📱"},{n:"Signal",y:215,i:"🔐"}].map((p,idx)=>(
        <g key={idx}>
          <rect x="10" y={p.y} width="140" height="40" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
          <text x="80" y={p.y+25} textAnchor="middle" fontFamily={F.sans} fontSize="13">{p.i} {p.n}</text>
          <line x1="150" y1={p.y+20} x2="230" y2="140" stroke="#4c2c92" strokeWidth="1.5" markerEnd="url(#a-purple)" opacity="0.5"/>
        </g>
      ))}
      <rect x="235" y="90" width="200" height="100" rx="4" fill="#4c2c92"/>
      <text x="335" y="125" textAnchor="middle" fontFamily={F.sans} fontSize="16" fontWeight="700" fill="#fff">Gateway</text>
      <text x="335" y="147" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#fff" opacity="0.8">Single process</text>
      <text x="335" y="165" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#fff" opacity="0.8">All platforms</text>
      <text x="335" y="180" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#fff" opacity="0.6">hermes gateway start</text>
      <line x1="435" y1="140" x2="510" y2="140" stroke="#4c2c92" strokeWidth="2" markerEnd="url(#a-purple)"/>
      <rect x="515" y="100" width="170" height="80" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="2"/>
      <text x="600" y="132" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#1d70b8">AIAgent</text>
      <text x="600" y="152" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">Same loop as CLI</text>
      <text x="600" y="168" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Same tools, same memory</text>
    </svg>
  );
}

// ─── 2.3 Delegation ───
function DelegationDiagram() {
  return (
    <svg viewBox="0 0 700 300" style={svgS()}>
      <ArrowDefs/>
      <rect x="220" y="20" width="260" height="70" rx="4" fill="#1d70b8"/>
      <text x="350" y="50" textAnchor="middle" fontFamily={F.sans} fontSize="16" fontWeight="700" fill="#fff">Parent Agent</text>
      <text x="350" y="72" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#fff" opacity="0.8">calls delegate_task → waits for results</text>
      {[{x:230,tx:120},{x:350,tx:350},{x:470,tx:580}].map((a,i)=><line key={i} x1={a.x} y1="90" x2={a.tx} y2="145" stroke="#d4351c" strokeWidth="2" markerEnd="url(#a-red)"/>)}
      <text x="350" y="130" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#d4351c">runs in parallel</text>
      {[{x:20,l:"Child 1",t:"Audit CSS files"},{x:250,l:"Child 2",t:"Check API errors"},{x:480,l:"Child 3",t:"Review README"}].map((c,i)=>(
        <g key={i}>
          <rect x={c.x} y="150" width="200" height="60" rx="4" fill="#d4351c15" stroke="#d4351c" strokeWidth="2"/>
          <text x={c.x+100} y="175" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#d4351c">{c.l} (leaf)</text>
          <text x={c.x+100} y="195" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">{c.t}</text>
          <line x1={c.x+100} y1="210" x2={c.x+100} y2="250" stroke="#00703c" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#a-green)"/>
        </g>
      ))}
      <rect x="20" y="255" width="660" height="35" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="1.5"/>
      <text x="350" y="278" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="600" fill="#00703c">Results merge back → Parent continues with summaries</text>
    </svg>
  );
}

// ─── 2.4 Cron ───
function CronDiagram() {
  return (
    <svg viewBox="0 0 700 150" style={svgS()}>
      <ArrowDefs/>
      <circle cx="70" cy="75" r="45" fill="#f4773815" stroke="#f47738" strokeWidth="2"/>
      <text x="70" y="68" textAnchor="middle" fontSize="24">⏰</text>
      <text x="70" y="92" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#f47738">Schedule</text>
      <text x="70" y="108" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill="#505a5f">0 9 * * *</text>
      <line x1="115" y1="75" x2="185" y2="75" stroke="#f47738" strokeWidth="2" markerEnd="url(#a-orange)"/>
      <rect x="190" y="40" width="200" height="70" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="2"/>
      <text x="290" y="65" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#1d70b8">Agent session</text>
      <text x="290" y="82" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Runs skill, uses tools</text>
      <text x="290" y="97" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#d4351c" fontWeight="600">⚠️ 3 min max</text>
      <line x1="390" y1="75" x2="460" y2="75" stroke="#f47738" strokeWidth="2" markerEnd="url(#a-orange)"/>
      <rect x="465" y="40" width="220" height="70" rx="4" fill="#4c2c9215" stroke="#4c2c92" strokeWidth="2"/>
      <text x="575" y="65" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#4c2c92">Deliver result</text>
      <text x="575" y="85" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">📱 Telegram / Discord / Slack</text>
      <text x="575" y="100" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">or any gateway platform</text>
    </svg>
  );
}

// ─── 2.5 Model Selection Matrix ───
function ModelMatrixDiagram() {
  const rows = [
    { task: "Complex coding", rec: "Best model", cost: "💰💰💰", quality: "★★★", color: "#d4351c" },
    { task: "File operations", rec: "Cheap & fast", cost: "💰", quality: "★★", color: "#00703c" },
    { task: "Sub-agents", rec: "Mid-tier", cost: "💰💰", quality: "★★★", color: "#1d70b8" },
    { task: "Cron jobs", rec: "Cheapest", cost: "💰", quality: "★★", color: "#f47738" },
    { task: "Conversation", rec: "Best model", cost: "💰💰💰", quality: "★★★", color: "#4c2c92" },
  ];
  return (
    <svg viewBox="0 0 700 245" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Model Selection Cheat Sheet</text>
      <rect x="10" y="30" width="680" height="32" fill="#0b0c0c" rx="3"/>
      {["Task type","Recommended","Cost","Quality"].map((h,i)=>(
        <text key={i} x={[100,310,480,600][i]} y="51" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">{h}</text>
      ))}
      {rows.map((r,i)=>(
        <g key={i}>
          <rect x="10" y={67+i*34} width="680" height="32" fill={i%2?"#f3f2f1":"#fff"} stroke="#e0e0e0" strokeWidth="0.5"/>
          <rect x="10" y={67+i*34} width="4" height="32" fill={r.color}/>
          <text x="100" y={87+i*34} textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill={r.color}>{r.task}</text>
          <text x="310" y={87+i*34} textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#0b0c0c">{r.rec}</text>
          <text x="480" y={87+i*34} textAnchor="middle" fontSize="12">{r.cost}</text>
          <text x="600" y={87+i*34} textAnchor="middle" fontSize="12" fill="#f47738">{r.quality}</text>
        </g>
      ))}
      <rect x="10" y="240" width="680" height="0" fill="none"/>
    </svg>
  );
}

// ─── 2.6 MCP Integration ───
function McpDiagram() {
  return (
    <svg viewBox="0 0 700 220" style={svgS()}>
      <ArrowDefs/>
      {/* External services */}
      {[{n:"GitHub",y:10,c:"#0b0c0c"},{n:"Postgres",y:60,c:"#1d70b8"},{n:"Brave Search",y:110,c:"#f47738"},{n:"Filesystem",y:160,c:"#00703c"}].map((s,i)=>(
        <g key={i}>
          <rect x="10" y={s.y} width="130" height="40" rx="4" fill="#f3f2f1" stroke={s.c} strokeWidth="1.5"/>
          <text x="75" y={s.y+25} textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill={s.c}>{s.n}</text>
          <line x1="140" y1={s.y+20} x2="210" y2="115" stroke={s.c} strokeWidth="1" markerEnd="url(#a-black)" opacity="0.4"/>
        </g>
      ))}
      {/* MCP protocol zone */}
      <rect x="215" y="60" width="190" height="110" rx="6" fill="#4c2c9210" stroke="#4c2c92" strokeWidth="2"/>
      <text x="310" y="90" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#4c2c92">MCP Servers</text>
      <text x="310" y="110" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">External processes</text>
      <text x="310" y="127" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Standard JSON-RPC protocol</text>
      <text x="310" y="155" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#4c2c92">npx @mcp/server-*</text>
      {/* Arrow to Hermes */}
      <line x1="405" y1="115" x2="470" y2="115" stroke="#4c2c92" strokeWidth="2" markerEnd="url(#a-purple)"/>
      <text x="438" y="107" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">tools</text>
      {/* Hermes */}
      <rect x="475" y="75" width="210" height="80" rx="4" fill="#1d70b8" stroke="#1d70b8" strokeWidth="2"/>
      <text x="580" y="105" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#fff">Hermes Agent</text>
      <text x="580" y="125" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.8">sees MCP tools alongside</text>
      <text x="580" y="140" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.8">built-in tools</text>
      {/* Bottom note */}
      <rect x="140" y="190" width="420" height="25" rx="12" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="350" y="207" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">New capabilities without writing Python tool code</text>
    </svg>
  );
}

// ─── 2.7 Daily Briefing System ───
function BriefingSystemDiagram() {
  return (
    <svg viewBox="0 0 700 200" style={svgS()}>
      <ArrowDefs/>
      {/* Cron trigger */}
      <circle cx="55" cy="100" r="40" fill="#f4773815" stroke="#f47738" strokeWidth="2"/>
      <text x="55" y="95" textAnchor="middle" fontSize="20">⏰</text>
      <text x="55" y="115" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600" fill="#f47738">8am daily</text>
      <line x1="95" y1="100" x2="135" y2="100" stroke="#f47738" strokeWidth="2" markerEnd="url(#a-orange)"/>
      {/* Skill loaded */}
      <rect x="140" y="70" width="130" height="60" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="2"/>
      <text x="205" y="95" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#1d70b8">Load skill</text>
      <text x="205" y="112" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill="#505a5f">daily-briefing</text>
      <line x1="270" y1="100" x2="305" y2="100" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      {/* Delegate */}
      <rect x="310" y="45" width="160" height="110" rx="4" fill="#d4351c15" stroke="#d4351c" strokeWidth="2"/>
      <text x="390" y="70" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#d4351c">Delegate ×3</text>
      {["Check repos","Scan news","Read calendar"].map((t,i)=>(
        <text key={i} x="390" y={92+i*18} textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">→ {t}</text>
      ))}
      <line x1="470" y1="100" x2="505" y2="100" stroke="#d4351c" strokeWidth="2" markerEnd="url(#a-red)"/>
      {/* Compile */}
      <rect x="510" y="70" width="80" height="60" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="2"/>
      <text x="550" y="95" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="700" fill="#00703c">Compile</text>
      <text x="550" y="112" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">briefing</text>
      <line x1="590" y1="100" x2="615" y2="100" stroke="#00703c" strokeWidth="2" markerEnd="url(#a-green)"/>
      {/* Deliver */}
      <rect x="620" y="70" width="70" height="60" rx="4" fill="#4c2c92" stroke="#4c2c92" strokeWidth="2"/>
      <text x="655" y="95" textAnchor="middle" fontSize="20">📱</text>
      <text x="655" y="115" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600" fill="#fff">Send</text>
    </svg>
  );
}

// ─── 3.1 Troubleshooting ───
function TroubleshootingDiagram() {
  const rows = [
    { symptom: "Won't start", check: "hermes doctor", file: "—", color: "#d4351c" },
    { symptom: "API errors", check: "errors.log", file: "~/.hermes/logs/errors.log", color: "#f47738" },
    { symptom: "Wrong tool", check: "agent.log", file: "~/.hermes/logs/agent.log", color: "#1d70b8" },
    { symptom: "Gateway down", check: "gateway.log", file: "~/.hermes/logs/gateway.log", color: "#4c2c92" },
    { symptom: "High cost", check: "/usage", file: "check cache hits", color: "#00703c" },
  ];
  return (
    <svg viewBox="0 0 700 230" style={svgS()}>
      <text x="10" y="20" fontFamily={F.sans} fontSize="14" fontWeight="700">Troubleshooting Quick Reference</text>
      <rect x="10" y="30" width="680" height="30" fill="#0b0c0c" rx="3"/>
      {["Symptom","First check","Where to look"].map((h,i)=>(
        <text key={i} x={[80,310,545][i]} y="50" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">{h}</text>
      ))}
      {rows.map((r,i)=>(
        <g key={i}>
          <rect x="10" y={65+i*32} width="680" height="30" fill={i%2?"#f3f2f1":"#fff"} stroke="#e0e0e0" strokeWidth="0.5"/>
          <rect x="10" y={65+i*32} width="4" height="30" fill={r.color}/>
          <text x="80" y={84+i*32} textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill={r.color}>{r.symptom}</text>
          <text x="310" y={84+i*32} textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#0b0c0c">{r.check}</text>
          <text x="545" y={84+i*32} textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#505a5f">{r.file}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── 3.2 Context Window ───
function ContextWindowDiagram() {
  const sections = [
    { label: "System prompt", size: 15, color: "#0b0c0c" },
    { label: "SOUL.md", size: 5, color: "#4c2c92" },
    { label: "Memory", size: 8, color: "#00703c" },
    { label: "Skills", size: 10, color: "#1d70b8" },
    { label: "Tool schemas", size: 12, color: "#d4351c" },
    { label: "Conversation", size: 40, color: "#f47738" },
    { label: "Free", size: 10, color: "#b1b4b6" },
  ];
  let offset = 0;
  return (
    <svg viewBox="0 0 700 180" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Context Window — what the LLM sees each turn</text>
      {sections.map((s,i)=>{const w=s.size*6.6;const x=offset*6.6+10;offset+=s.size;return(
        <g key={i}>
          <rect x={x} y="35" width={w} height="50" fill={s.color} opacity={s.color==="#b1b4b6"?0.3:0.85} rx="1"/>
          <text x={x+w/2} y="65" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600" fill="#fff">{s.size}%</text>
          <text x={x+w/2} y="115" textAnchor="middle" fontFamily={F.sans} fontSize="10" transform={`rotate(-35,${x+w/2},115)`}>{s.label}</text>
        </g>
      );})}
      <rect x="10" y="35" width="660" height="50" fill="none" stroke="#0b0c0c" strokeWidth="2" rx="3"/>
      <text x="350" y="106" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">↑ grows with every turn — /compress shrinks it back down</text>
    </svg>
  );
}

// ─── 3.3 Terminal Backends ───
function TerminalBackendsDiagram() {
  const backends = [
    { name: "Local", icon: "💻", desc: "Your machine", risk: "Full access", color: "#d4351c" },
    { name: "Docker", icon: "📦", desc: "Container", risk: "Isolated", color: "#00703c" },
    { name: "SSH", icon: "🔗", desc: "Remote server", risk: "Network access", color: "#1d70b8" },
    { name: "Modal", icon: "☁️", desc: "Serverless", risk: "Hibernates", color: "#4c2c92" },
  ];
  return (
    <svg viewBox="0 0 700 160" style={svgS()}>
      {backends.map((b,i)=>{const x=i*175+5;return(
        <g key={i}>
          <rect x={x} y="10" width="165" height="140" rx="4" fill={`${b.color}08`} stroke={b.color} strokeWidth="2"/>
          <text x={x+82} y="45" textAnchor="middle" fontSize="24">{b.icon}</text>
          <text x={x+82} y="72" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill={b.color}>{b.name}</text>
          <text x={x+82} y="92" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">{b.desc}</text>
          <rect x={x+25} y="108" width="115" height="24" rx="3" fill={b.color} opacity="0.15"/>
          <text x={x+82} y="125" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill={b.color}>{b.risk}</text>
        </g>
      );})}
    </svg>
  );
}

// ─── 3.4 Plugin Architecture ───
function PluginDiagram() {
  return (
    <svg viewBox="0 0 700 200" style={svgS()}>
      <ArrowDefs/>
      {/* Plugin box */}
      <rect x="10" y="10" width="220" height="180" rx="4" fill="#f3f2f1" stroke="#0b0c0c" strokeWidth="2"/>
      <rect x="10" y="10" width="220" height="30" rx="4" fill="#0b0c0c"/>
      <text x="120" y="30" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill="#fff">~/.hermes/plugins/my-plugin/</text>
      <text x="30" y="60" fontFamily={F.mono} fontSize="11" fill="#505a5f">├─ plugin.yaml</text>
      <text x="30" y="80" fontFamily={F.mono} fontSize="11" fill="#505a5f">└─ __init__.py</text>
      <rect x="45" y="100" width="160" height="30" rx="3" fill="#1d70b815" stroke="#1d70b8" strokeWidth="1"/>
      <text x="125" y="119" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#1d70b8">def register(ctx):</text>
      <rect x="45" y="140" width="160" height="40" rx="3" fill="#00703c15" stroke="#00703c" strokeWidth="1"/>
      <text x="125" y="157" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#00703c">ctx.register_tool()</text>
      <text x="125" y="172" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">ctx.on("pre_tool_call")</text>
      {/* Arrow to registry */}
      <line x1="230" y1="100" x2="305" y2="100" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      {/* Core Hermes */}
      <rect x="310" y="30" width="190" height="140" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="2"/>
      <text x="405" y="60" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#1d70b8">Hermes Core</text>
      <text x="405" y="85" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">Tool Registry</text>
      <line x1="340" y1="95" x2="470" y2="95" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="405" y="115" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">built-in tools</text>
      <text x="405" y="133" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#1d70b8" fontWeight="600">+ your plugin tools</text>
      <text x="405" y="155" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">+ lifecycle hooks</text>
      {/* Warning */}
      <rect x="530" y="50" width="160" height="100" rx="4" fill="#d4351c10" stroke="#d4351c" strokeWidth="1.5"/>
      <text x="610" y="80" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#d4351c">⚠️ Never edit</text>
      <text x="610" y="100" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#d4351c">core files</text>
      <text x="610" y="125" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Always use plugins</text>
      <text x="610" y="140" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">for custom features</text>
    </svg>
  );
}

// ─── 3.5 API Endpoints ───
function ApiEndpointDiagram() {
  return (
    <svg viewBox="0 0 700 230" style={svgS()}>
      <ArrowDefs/>
      {[{n:"React App",y:20,i:"⚛️"},{n:"Mobile App",y:80,i:"📱"},{n:"Other Service",y:140,i:"🔗"}].map((a,i)=>(
        <g key={i}>
          <rect x="20" y={a.y} width="160" height="45" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
          <text x="100" y={a.y+28} textAnchor="middle" fontFamily={F.sans} fontSize="13">{a.i} {a.n}</text>
          <line x1="180" y1={a.y+22} x2="270" y2="115" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)"/>
        </g>
      ))}
      <rect x="275" y="75" width="180" height="80" rx="4" fill="#1d70b8"/>
      <text x="365" y="105" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#fff">API Server</text>
      <text x="365" y="123" textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#fff" opacity="0.8">:8080/api/chat</text>
      <text x="365" y="143" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#fff" opacity="0.7">POST + auth token</text>
      <line x1="455" y1="115" x2="510" y2="115" stroke="#1d70b8" strokeWidth="2" markerEnd="url(#a-blue)"/>
      <rect x="515" y="80" width="170" height="70" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="2"/>
      <text x="600" y="108" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#00703c">AIAgent</text>
      <text x="600" y="128" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">tools + memory + skills</text>
      <rect x="140" y="190" width="420" height="30" rx="15" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="350" y="210" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">Your frontend apps talk to Hermes like any other API backend</text>
    </svg>
  );
}

// ─── 4.1 Agent Team ───
function AgentTeamDiagram() {
  const agents = [
    { name: "Inbox", x: 20, y: 30, color: "#1d70b8", schedule: "Real-time" },
    { name: "Dev", x: 240, y: 30, color: "#d4351c", schedule: "On-demand" },
    { name: "Research", x: 460, y: 30, color: "#00703c", schedule: "On-demand" },
    { name: "Ops", x: 20, y: 150, color: "#f47738", schedule: "Every 30m" },
    { name: "Briefing", x: 240, y: 150, color: "#4c2c92", schedule: "Daily 8am" },
    { name: "Finance", x: 460, y: 150, color: "#0b0c0c", schedule: "Weekly" },
  ];
  return (
    <svg viewBox="0 0 700 280" style={svgS()}>
      <rect x="240" y="100" width="220" height="45" rx="20" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="350" y="128" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="600" fill="#505a5f">🗂️ Shared Kanban Board</text>
      {agents.map((a,i)=>(<g key={i}>
        <rect x={a.x} y={a.y} width="200" height="60" rx="4" fill={`${a.color}10`} stroke={a.color} strokeWidth="2"/>
        <text x={a.x+100} y={a.y+25} textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill={a.color}>{a.name} Agent</text>
        <text x={a.x+100} y={a.y+45} textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">{a.schedule}</text>
        <line x1={a.x+100} y1={a.y<100?a.y+60:a.y} x2="350" y2={a.y<100?100:145} stroke={a.color} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
      </g>))}
      <rect x="240" y="230" width="220" height="40" rx="4" fill="#0b0c0c"/>
      <text x="350" y="255" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700" fill="#fff">📱 You — via Telegram / API</text>
      <line x1="350" y1="210" x2="350" y2="230" stroke="#0b0c0c" strokeWidth="2" strokeDasharray="4,3"/>
    </svg>
  );
}

// ─── 4.2 Profiles ───
function ProfilesDiagram() {
  return (
    <svg viewBox="0 0 700 200" style={svgS()}>
      <rect x="230" y="10" width="240" height="40" rx="4" fill="#0b0c0c"/>
      <text x="350" y="35" textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="#fff">~/.hermes/</text>
      {[{n:"default",x:20,c:"#1d70b8",d:"Your main agent"},{n:"dev-agent",x:250,c:"#d4351c",d:"Coding specialist"},{n:"ops-agent",x:480,c:"#00703c",d:"Infrastructure monitor"}].map((p,i)=>(
        <g key={i}>
          <line x1="350" y1="50" x2={p.x+100} y2="80" stroke="#b1b4b6" strokeWidth="1.5"/>
          <rect x={p.x} y="80" width="200" height="110" rx="4" fill={`${p.c}08`} stroke={p.c} strokeWidth="2"/>
          <rect x={p.x} y="80" width="200" height="30" rx="4" fill={p.c}/><rect x={p.x} y="106" width="200" height="4" fill={p.c}/>
          <text x={p.x+100} y="100" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill="#fff">{p.n}</text>
          <text x={p.x+100} y="132" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">{p.d}</text>
          {["config.yaml",".env","SOUL.md","MEMORY.md"].map((f,j)=>(
            <text key={j} x={p.x+15} y={148+j*12} fontFamily={F.mono} fontSize="9" fill="#505a5f">├─ {f}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ─── 4.3 Kanban Coordination ───
function KanbanDiagram() {
  const cols = [
    { title: "Backlog", color: "#b1b4b6", tasks: ["Review auth module", "Write API tests"] },
    { title: "In Progress", color: "#f47738", tasks: ["Audit CSS a11y"] },
    { title: "Done", color: "#00703c", tasks: ["Update README", "Fix login bug"] },
  ];
  return (
    <svg viewBox="0 0 700 220" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Kanban Board — tasks flow left to right</text>
      {cols.map((col, ci) => {
        const x = ci * 230 + 10;
        return (<g key={ci}>
          <rect x={x} y="35" width="215" height="175" rx="4" fill="#f3f2f1" stroke={col.color} strokeWidth="2"/>
          <rect x={x} y="35" width="215" height="28" rx="4" fill={col.color}/>
          <text x={x+107} y="54" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#fff">{col.title}</text>
          {col.tasks.map((t, ti) => (
            <g key={ti}>
              <rect x={x+10} y={72+ti*42} width="195" height="34" rx="3" fill="#fff" stroke="#b1b4b6" strokeWidth="1"/>
              <text x={x+107} y={93+ti*42} textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#0b0c0c">{t}</text>
            </g>
          ))}
        </g>);
      })}
      <ArrowDefs/>
      <line x1="225" y1="160" x2="240" y2="160" stroke="#0b0c0c" strokeWidth="2" markerEnd="url(#a-black)"/>
      <line x1="455" y1="160" x2="470" y2="160" stroke="#0b0c0c" strokeWidth="2" markerEnd="url(#a-black)"/>
      <text x="350" y="205" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Dispatcher auto-assigns → agent profile claims → completes → moves to Done</text>
    </svg>
  );
}

// ─── 4.4 SOUL.md Anatomy ───
function SoulMdDiagram() {
  return (
    <svg viewBox="0 0 700 200" style={svgS()}>
      {/* Two profiles side by side */}
      {[
        { title: "dev-agent SOUL.md", x: 10, color: "#d4351c", lines: ["You are a senior engineer", "Be direct and technical", "Flag security concerns", "Never run destructive cmds"] },
        { title: "research-agent SOUL.md", x: 370, color: "#00703c", lines: ["You are a research analyst", "Be thorough and cited", "Compare multiple sources", "Summarise with confidence"] },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="10" width="320" height="180" rx="4" fill={`${p.color}08`} stroke={p.color} strokeWidth="2"/>
          <rect x={p.x} y="10" width="320" height="32" rx="4" fill={p.color}/>
          <text x={p.x+160} y="31" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill="#fff">{p.title}</text>
          {p.lines.map((l, li) => (
            <g key={li}>
              <rect x={p.x+15} y={52+li*35} width="290" height="28" rx="3" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
              <text x={p.x+160} y={70+li*35} textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#0b0c0c">{l}</text>
            </g>
          ))}
        </g>
      ))}
      {/* VS label */}
      <circle cx="350" cy="100" r="16" fill="#0b0c0c"/>
      <text x="350" y="105" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="700" fill="#fff">vs</text>
    </svg>
  );
}

// ─── 4.5 Final System Overview ───
function FinalSystemDiagram() {
  return (
    <svg viewBox="0 0 700 320" style={svgS()}>
      <ArrowDefs/>
      {/* You at top */}
      <rect x="260" y="10" width="180" height="45" rx="6" fill="#0b0c0c"/>
      <text x="350" y="38" textAnchor="middle" fontFamily={F.sans} fontSize="15" fontWeight="700" fill="#fff">📱 You</text>
      {/* Telegram + API */}
      <line x1="310" y1="55" x2="180" y2="85" stroke="#4c2c92" strokeWidth="1.5" markerEnd="url(#a-purple)"/>
      <line x1="390" y1="55" x2="520" y2="85" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)"/>
      <rect x="100" y="88" width="160" height="35" rx="4" fill="#4c2c92" stroke="#4c2c92" strokeWidth="2"/>
      <text x="180" y="110" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">📬 Gateway (Telegram)</text>
      <rect x="440" y="88" width="160" height="35" rx="4" fill="#1d70b8" stroke="#1d70b8" strokeWidth="2"/>
      <text x="520" y="110" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">🔌 API Server :8080</text>
      {/* Agents row */}
      {[
        { name: "Inbox", x: 10, color: "#1d70b8" },
        { name: "Dev", x: 150, color: "#d4351c" },
        { name: "Research", x: 290, color: "#00703c" },
        { name: "Ops", x: 430, color: "#f47738" },
        { name: "Briefing", x: 570, color: "#4c2c92" },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y="155" width="120" height="50" rx="4" fill={`${a.color}15`} stroke={a.color} strokeWidth="2"/>
          <text x={a.x+60} y="178" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill={a.color}>{a.name}</text>
          <text x={a.x+60} y="195" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">Profile</text>
        </g>
      ))}
      {/* Lines down from gateways */}
      {[80,220].map((x,i)=><line key={i} x1={x+100} y1="123" x2={x+100} y2="155" stroke="#b1b4b6" strokeWidth="1" strokeDasharray="3,3"/>)}
      {/* Shared resources row */}
      <rect x="60" y="235" width="180" height="35" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="150" y="257" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">🗂️ Kanban Board</text>
      <rect x="260" y="235" width="180" height="35" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="350" y="257" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">⏰ Cron Scheduler</text>
      <rect x="460" y="235" width="180" height="35" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="550" y="257" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#505a5f">🧠 Shared Skills</text>
      {/* Bottom motto */}
      <rect x="150" y="288" width="400" height="28" rx="14" fill="#0b0c0c"/>
      <text x="350" y="307" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">Your agent team — specialised, coordinated, always running</text>
    </svg>
  );
}

// ─── NEW: File Tree Diagram (1.2) ───
function FileTreeDiagram() {
  const items = [
    { indent: 0, icon: "📁", name: "~/.hermes/", color: "#0b0c0c", bold: true },
    { indent: 1, icon: "📄", name: "config.yaml", color: "#1d70b8", note: "all settings" },
    { indent: 1, icon: "🔒", name: ".env", color: "#d4351c", note: "API keys only" },
    { indent: 1, icon: "🧠", name: "MEMORY.md", color: "#00703c", note: "agent's notebook" },
    { indent: 1, icon: "👤", name: "USER.md", color: "#4c2c92", note: "facts about you" },
    { indent: 1, icon: "✨", name: "SOUL.md", color: "#f47738", note: "agent personality" },
    { indent: 1, icon: "📁", name: "skills/", color: "#0b0c0c", bold: true },
    { indent: 2, icon: "📋", name: "workflow/deploy-check/SKILL.md", color: "#505a5f" },
    { indent: 1, icon: "📁", name: "plugins/", color: "#0b0c0c", bold: true },
    { indent: 1, icon: "📁", name: "profiles/", color: "#0b0c0c", bold: true },
    { indent: 1, icon: "📁", name: "logs/", color: "#0b0c0c", bold: true },
    { indent: 2, icon: "📝", name: "agent.log, errors.log, gateway.log", color: "#505a5f" },
    { indent: 1, icon: "🗄️", name: "state.db", color: "#4c2c92", note: "SQLite sessions" },
  ];
  return (
    <svg viewBox="0 0 700 345" style={svgS()}>
      <rect x="10" y="10" width="680" height="325" rx="6" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1"/>
      <text x="350" y="35" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Your Hermes home directory — everything lives here</text>
      {items.map((item, i) => {
        const y = 55 + i * 22;
        const x = 30 + item.indent * 24;
        return (
          <g key={i}>
            <text x={x} y={y} fontFamily={F.sans} fontSize="13">{item.icon}</text>
            <text x={x + 22} y={y} fontFamily={item.bold ? F.sans : F.mono} fontSize={item.bold ? 13 : 12} fontWeight={item.bold ? 700 : 400} fill={item.color}>{item.name}</text>
            {item.note && <text x="520" y={y} fontFamily={F.sans} fontSize="11" fill="#505a5f">← {item.note}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Tool Call Trace (1.3) ───
function ToolCallTraceDiagram() {
  const steps = [
    { actor: "You", msg: '"List my project files"', color: "#0b0c0c" },
    { actor: "LLM", msg: 'I need terminal → ls -la', color: "#1d70b8" },
    { actor: "Tool", msg: 'terminal runs → returns file list', color: "#d4351c" },
    { actor: "LLM", msg: 'read_file → package.json', color: "#1d70b8" },
    { actor: "Tool", msg: 'read_file runs → returns contents', color: "#d4351c" },
    { actor: "LLM", msg: '"This is a React project that…"', color: "#00703c" },
  ];
  return (
    <svg viewBox="0 0 700 280" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Anatomy of a real conversation — 6 steps, 2 tool calls</text>
      <line x1="100" y1="35" x2="100" y2="270" stroke="#b1b4b6" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="350" y1="35" x2="350" y2="270" stroke="#b1b4b6" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="600" y1="35" x2="600" y2="270" stroke="#b1b4b6" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="100" y="48" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#0b0c0c">You</text>
      <text x="350" y="48" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#1d70b8">LLM</text>
      <text x="600" y="48" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#d4351c">Tools</text>
      {steps.map((s, i) => {
        const y = 60 + i * 36;
        const cx = s.actor === "You" ? 100 : s.actor === "LLM" ? 350 : 600;
        return (
          <g key={i}>
            <circle cx={cx} cy={y} r="5" fill={s.color}/>
            <rect x={cx - 130} y={y - 12} width="260" height="24" rx="12" fill={`${s.color}10`} stroke={s.color} strokeWidth="1"/>
            <text x={cx} y={y + 4} textAnchor="middle" fontFamily={F.mono} fontSize="10" fill={s.color}>{s.msg}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Security Layers (1.4) ───
function SecurityLayersDiagram() {
  const layers = [
    { label: "auto_approve: false", desc: "Every command needs your OK", color: "#d4351c", w: 660 },
    { label: "auto_approve_patterns", desc: 'Whitelist safe commands: "ls *", "git status"', color: "#f47738", w: 560 },
    { label: "Docker / SSH backend", desc: "Isolate execution from your machine", color: "#1d70b8", w: 460 },
    { label: "max_iterations: 90", desc: "Hard limit on agent loop cycles", color: "#00703c", w: 360 },
    { label: "API auth token", desc: "Protect the API endpoint", color: "#4c2c92", w: 260 },
  ];
  return (
    <svg viewBox="0 0 700 210" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Security layers — defence in depth</text>
      {layers.map((l, i) => {
        const x = (700 - l.w) / 2;
        const y = 32 + i * 35;
        return (
          <g key={i}>
            <rect x={x} y={y} width={l.w} height="30" rx="4" fill={`${l.color}12`} stroke={l.color} strokeWidth="1.5"/>
            <text x={x + 12} y={y + 19} fontFamily={F.sans} fontSize="11" fontWeight="700" fill={l.color}>{l.label}</text>
            <text x={x + l.w - 12} y={y + 19} textAnchor="end" fontFamily={F.sans} fontSize="11" fill="#505a5f">{l.desc}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Memory Lifecycle (1.5) ───
function MemoryLifecycleDiagram() {
  return (
    <svg viewBox="0 0 700 160" style={svgS()}>
      <ArrowDefs/>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">How memory grows — the nudge loop</text>
      {[
        { x: 10, label: "Conversation", sub: "you + agent talk", color: "#1d70b8", icon: "💬" },
        { x: 180, label: "Nudge fires", sub: "periodic self-check", color: "#f47738", icon: "⏰" },
        { x: 350, label: "Agent decides", sub: '"worth saving?"', color: "#0b0c0c", icon: "🤔" },
        { x: 520, label: "Writes to file", sub: "MEMORY.md / USER.md", color: "#00703c", icon: "💾" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="40" width="155" height="75" rx="4" fill={`${s.color}10`} stroke={s.color} strokeWidth="1.5"/>
          <text x={s.x + 77} y="65" textAnchor="middle" fontSize="18">{s.icon}</text>
          <text x={s.x + 77} y="85" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
          <text x={s.x + 77} y="102" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">{s.sub}</text>
          {i < 3 && <line x1={s.x + 155} y1="78" x2={s.x + 180} y2="78" stroke="#0b0c0c" strokeWidth="1.5" markerEnd="url(#a-black)"/>}
        </g>
      ))}
      <path d="M630,115 L665,115 L665,140 L45,140 L45,115 L10,115" fill="none" stroke="#00703c" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#a-green)"/>
      <text x="350" y="153" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#00703c">next conversation starts with memory already loaded</text>
    </svg>
  );
}

// ─── NEW: Slash Commands (1.6) ───
function SlashCommandsDiagram() {
  const cmds = [
    { cmd: "/new", desc: "Fresh conversation", cat: "Session", color: "#1d70b8" },
    { cmd: "/compress", desc: "Shrink context", cat: "Session", color: "#1d70b8" },
    { cmd: "/model", desc: "Switch model", cat: "Config", color: "#f47738" },
    { cmd: "/tools", desc: "List active tools", cat: "Config", color: "#f47738" },
    { cmd: "/usage", desc: "Token costs", cat: "Monitor", color: "#d4351c" },
    { cmd: "/help", desc: "All commands", cat: "Help", color: "#00703c" },
  ];
  return (
    <svg viewBox="0 0 700 170" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Slash commands you'll use daily</text>
      {cmds.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = col * 230 + 10;
        const y = 35 + row * 65;
        return (
          <g key={i}>
            <rect x={x} y={y} width="215" height="55" rx="4" fill="#fff" stroke={c.color} strokeWidth="1.5"/>
            <rect x={x} y={y} width="80" height="55" rx="4" fill={c.color}/>
            <rect x={x + 76} y={y} width="8" height="55" fill={c.color}/>
            <text x={x + 40} y={y + 32} textAnchor="middle" fontFamily={F.mono} fontSize="13" fontWeight="600" fill="#fff">{c.cmd}</text>
            <text x={x + 150} y={y + 28} textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#0b0c0c">{c.desc}</text>
            <text x={x + 150} y={y + 44} textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">{c.cat}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Skill Lifecycle (2.1) ───
function SkillLifecycleDiagram() {
  return (
    <svg viewBox="0 0 700 130" style={svgS()}>
      <ArrowDefs/>
      <text x="350" y="18" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Two ways skills are created</text>
      <rect x="10" y="35" width="120" height="40" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="1.5"/>
      <text x="70" y="59" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#1d70b8">You write it</text>
      <line x1="130" y1="55" x2="200" y2="55" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)"/>
      <rect x="10" y="85" width="120" height="40" rx="4" fill="#f4773815" stroke="#f47738" strokeWidth="1.5"/>
      <text x="70" y="109" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#f47738">Agent creates</text>
      <line x1="130" y1="105" x2="200" y2="105" stroke="#f47738" strokeWidth="1.5" markerEnd="url(#a-orange)"/>
      <rect x="205" y="55" width="140" height="70" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="275" y="80" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#0b0c0c">skills/</text>
      <text x="275" y="100" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">markdown files</text>
      <line x1="345" y1="90" x2="400" y2="90" stroke="#0b0c0c" strokeWidth="1.5" markerEnd="url(#a-black)"/>
      <rect x="405" y="65" width="120" height="50" rx="4" fill="#4c2c9215" stroke="#4c2c92" strokeWidth="1.5"/>
      <text x="465" y="87" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#4c2c92">Curator</text>
      <text x="465" y="104" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">auto-maintains</text>
      <line x1="525" y1="90" x2="575" y2="90" stroke="#4c2c92" strokeWidth="1.5" markerEnd="url(#a-purple)"/>
      <rect x="580" y="65" width="110" height="50" rx="4" fill="#00703c15" stroke="#00703c" strokeWidth="1.5"/>
      <text x="635" y="87" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#00703c">Loaded into</text>
      <text x="635" y="104" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#00703c">agent context</text>
    </svg>
  );
}

// ─── NEW: Gateway CLI vs Gateway (2.2) ───
function GatewaySecurityDiagram() {
  return (
    <svg viewBox="0 0 700 140" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Gateway security: what changes vs CLI</text>
      {[
        { label: "CLI", items: ["You see every command", "Interactive approval", "Single user"], color: "#1d70b8", x: 10 },
        { label: "Gateway", items: ["Runs unattended", "Needs auto_approve", "Multi-user DMs"], color: "#d4351c", x: 370 },
      ].map((col, ci) => (
        <g key={ci}>
          <rect x={col.x} y="30" width="320" height="100" rx="4" fill={`${col.color}08`} stroke={col.color} strokeWidth="2"/>
          <rect x={col.x} y="30" width="320" height="28" rx="4" fill={col.color}/>
          <text x={col.x + 160} y="49" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#fff">{col.label}</text>
          {col.items.map((item, ii) => (
            <text key={ii} x={col.x + 20} y={76 + ii * 18} fontFamily={F.sans} fontSize="12" fill="#0b0c0c">• {item}</text>
          ))}
        </g>
      ))}
      <text x="350" y="85" textAnchor="middle" fontFamily={F.sans} fontSize="20">→</text>
    </svg>
  );
}

// ─── NEW: Delegation Cost (2.3) ───
function DelegationCostDiagram() {
  return (
    <svg viewBox="0 0 700 150" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Cost multiplier: delegation vs single agent</text>
      <rect x="50" y="40" width="200" height="35" rx="4" fill="#00703c" opacity="0.8"/>
      <text x="150" y="62" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">Single agent: ~$0.05</text>
      <text x="30" y="62" textAnchor="end" fontFamily={F.sans} fontSize="11" fill="#505a5f">1×</text>
      <rect x="50" y="85" width="520" height="35" rx="4" fill="#d4351c" opacity="0.8"/>
      <text x="310" y="107" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">Parent + 3 children: ~$0.15–0.20</text>
      <text x="30" y="107" textAnchor="end" fontFamily={F.sans} fontSize="11" fill="#505a5f">3–4×</text>
      <text x="350" y="140" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Delegate when parallelism saves time, not just because you can</text>
    </svg>
  );
}

// ─── NEW: Cron Examples (2.4) ───
function CronExamplesDiagram() {
  const examples = [
    { expr: "0 9 * * *", meaning: "Every day at 9am", freq: "Daily", color: "#1d70b8" },
    { expr: "*/30 * * * *", meaning: "Every 30 minutes", freq: "Frequent", color: "#d4351c" },
    { expr: "0 9 * * 1", meaning: "Every Monday 9am", freq: "Weekly", color: "#00703c" },
    { expr: "0 0 1 * *", meaning: "First of each month", freq: "Monthly", color: "#4c2c92" },
  ];
  return (
    <svg viewBox="0 0 700 170" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Cron expression cheat sheet</text>
      {examples.map((e, i) => {
        const x = i * 172 + 8;
        return (
          <g key={i}>
            <rect x={x} y="35" width="162" height="125" rx="4" fill={`${e.color}08`} stroke={e.color} strokeWidth="1.5"/>
            <rect x={x + 20} y="48" width="122" height="26" rx="3" fill="#0b0c0c"/>
            <text x={x + 81} y="66" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#d0d0d0">{e.expr}</text>
            <text x={x + 81} y="100" textAnchor="middle" fontFamily={F.sans} fontSize="12" fill="#0b0c0c">{e.meaning}</text>
            <rect x={x + 30} y="112" width="102" height="22" rx="11" fill={e.color}/>
            <text x={x + 81} y="127" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#fff">{e.freq}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Model Cost vs Quality (2.5) ───
function ModelCostQualityDiagram() {
  const models = [
    { name: "GPT-4o", x: 520, y: 60, color: "#1d70b8" },
    { name: "Claude Sonnet", x: 460, y: 80, color: "#4c2c92" },
    { name: "Gemini Flash", x: 180, y: 130, color: "#00703c" },
    { name: "Llama 3.3", x: 120, y: 170, color: "#f47738" },
    { name: "GPT-4o-mini", x: 260, y: 140, color: "#d4351c" },
  ];
  return (
    <svg viewBox="0 0 700 230" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Cost vs Quality — pick the right spot</text>
      <line x1="60" y1="40" x2="60" y2="200" stroke="#b1b4b6" strokeWidth="1.5"/>
      <line x1="60" y1="200" x2="650" y2="200" stroke="#b1b4b6" strokeWidth="1.5"/>
      <text x="30" y="120" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f" transform="rotate(-90,30,120)">Quality →</text>
      <text x="350" y="220" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Cost per request →</text>
      {models.map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy={m.y} r="20" fill={`${m.color}20`} stroke={m.color} strokeWidth="2"/>
          <text x={m.x} y={m.y + 4} textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="600" fill={m.color}>{m.name}</text>
        </g>
      ))}
      <rect x="220" y="100" width="200" height="80" rx="8" fill="none" stroke="#00703c" strokeWidth="2" strokeDasharray="6,3"/>
      <text x="320" y="195" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600" fill="#00703c">sweet spot for most tasks</text>
    </svg>
  );
}

// ─── NEW: MCP vs Built-in (2.6) ───
function McpVsBuiltinDiagram() {
  return (
    <svg viewBox="0 0 700 140" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Built-in tools vs MCP tools — same interface, different source</text>
      {[
        { label: "Built-in (79)", items: ["Python code in tools/", "Ship with Hermes", "Always available"], color: "#1d70b8", x: 10 },
        { label: "MCP (unlimited)", items: ["External processes", "npm/pip packages", "Added via config.yaml"], color: "#4c2c92", x: 370 },
      ].map((col, ci) => (
        <g key={ci}>
          <rect x={col.x} y="30" width="320" height="100" rx="4" fill={`${col.color}08`} stroke={col.color} strokeWidth="2"/>
          <rect x={col.x} y="30" width="320" height="28" rx="4" fill={col.color}/>
          <text x={col.x + 160} y="49" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#fff">{col.label}</text>
          {col.items.map((item, ii) => (
            <text key={ii} x={col.x + 20} y={76 + ii * 18} fontFamily={F.sans} fontSize="12" fill="#0b0c0c">• {item}</text>
          ))}
        </g>
      ))}
      <rect x="290" y="65" width="120" height="28" rx="14" fill="#0b0c0c"/>
      <text x="350" y="83" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#fff">LLM sees both</text>
    </svg>
  );
}

// ─── NEW: Compression Before/After (3.2) ───
function CompressionDiagram() {
  return (
    <svg viewBox="0 0 700 160" style={svgS()}>
      <ArrowDefs/>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">/compress — before and after</text>
      <rect x="20" y="40" width="260" height="100" rx="4" fill="#d4351c10" stroke="#d4351c" strokeWidth="2"/>
      <text x="150" y="62" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#d4351c">Before /compress</text>
      <rect x="35" y="72" width="230" height="12" rx="2" fill="#f47738" opacity="0.6"/>
      <rect x="35" y="88" width="230" height="12" rx="2" fill="#f47738" opacity="0.5"/>
      <rect x="35" y="104" width="180" height="12" rx="2" fill="#f47738" opacity="0.4"/>
      <text x="150" y="132" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#d4351c">~45,000 tokens</text>
      <line x1="280" y1="90" x2="410" y2="90" stroke="#0b0c0c" strokeWidth="2" markerEnd="url(#a-black)"/>
      <text x="345" y="82" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#0b0c0c">/compress</text>
      <rect x="420" y="40" width="260" height="100" rx="4" fill="#00703c10" stroke="#00703c" strokeWidth="2"/>
      <text x="550" y="62" textAnchor="middle" fontFamily={F.sans} fontSize="13" fontWeight="700" fill="#00703c">After /compress</text>
      <rect x="435" y="72" width="230" height="12" rx="2" fill="#00703c" opacity="0.6"/>
      <rect x="435" y="88" width="80" height="12" rx="2" fill="#00703c" opacity="0.4"/>
      <text x="550" y="132" textAnchor="middle" fontFamily={F.mono} fontSize="11" fill="#00703c">~12,000 tokens ✓</text>
    </svg>
  );
}

// ─── NEW: Backend Decision Tree (3.3) ───
function BackendDecisionDiagram() {
  return (
    <svg viewBox="0 0 700 180" style={svgS()}>
      <ArrowDefs/>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Which backend should I use?</text>
      <polygon points="350,40 410,65 350,90 290,65" fill="#fff" stroke="#0b0c0c" strokeWidth="2"/>
      <text x="350" y="68" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600">Need isolation?</text>
      <text x="235" y="72" fontFamily={F.sans} fontSize="10" fontWeight="700" fill="#d4351c">No</text>
      <line x1="290" y1="65" x2="200" y2="65" stroke="#d4351c" strokeWidth="1.5" markerEnd="url(#a-red)"/>
      <rect x="80" y="48" width="115" height="34" rx="4" fill="#d4351c15" stroke="#d4351c" strokeWidth="1.5"/>
      <text x="137" y="70" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#d4351c">💻 Local</text>
      <text x="420" y="72" fontFamily={F.sans} fontSize="10" fontWeight="700" fill="#00703c">Yes</text>
      <line x1="410" y1="65" x2="460" y2="65" stroke="#00703c" strokeWidth="1.5" markerEnd="url(#a-green)"/>
      <polygon points="530,40 590,65 530,90 470,65" fill="#fff" stroke="#0b0c0c" strokeWidth="2"/>
      <text x="530" y="68" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600">Remote?</text>
      <text x="475" y="108" fontFamily={F.sans} fontSize="10" fontWeight="700" fill="#1d70b8">No</text>
      <line x1="530" y1="90" x2="470" y2="130" stroke="#1d70b8" strokeWidth="1.5" markerEnd="url(#a-blue)"/>
      <rect x="380" y="120" width="115" height="34" rx="4" fill="#1d70b815" stroke="#1d70b8" strokeWidth="1.5"/>
      <text x="437" y="142" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#1d70b8">📦 Docker</text>
      <text x="590" y="108" fontFamily={F.sans} fontSize="10" fontWeight="700" fill="#4c2c92">Yes</text>
      <line x1="530" y1="90" x2="600" y2="130" stroke="#4c2c92" strokeWidth="1.5" markerEnd="url(#a-purple)"/>
      <rect x="540" y="120" width="70" height="34" rx="4" fill="#4c2c9215" stroke="#4c2c92" strokeWidth="1.5"/>
      <text x="575" y="142" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#4c2c92">🔗 SSH</text>
      <rect x="620" y="120" width="70" height="34" rx="4" fill="#f4773815" stroke="#f47738" strokeWidth="1.5"/>
      <text x="655" y="142" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#f47738">☁️ Modal</text>
    </svg>
  );
}

// ─── NEW: Plugin Hooks (3.4) ───
function PluginHooksDiagram() {
  const hooks = [
    { name: "pre_tool_call", when: "Before any tool runs", color: "#1d70b8" },
    { name: "post_tool_call", when: "After tool returns", color: "#00703c" },
    { name: "pre_completion", when: "Before LLM call", color: "#f47738" },
    { name: "post_completion", when: "After LLM responds", color: "#4c2c92" },
    { name: "on_error", when: "When something fails", color: "#d4351c" },
  ];
  return (
    <svg viewBox="0 0 700 180" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Plugin lifecycle hooks — where you can intercept</text>
      <rect x="30" y="40" width="640" height="30" rx="4" fill="#0b0c0c"/>
      <text x="350" y="59" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600" fill="#fff">Agent Loop Timeline →</text>
      {hooks.map((h, i) => {
        const x = i * 132 + 30;
        return (
          <g key={i}>
            <line x1={x + 60} y1="70" x2={x + 60} y2="95" stroke={h.color} strokeWidth="2"/>
            <circle cx={x + 60} cy="70" r="4" fill={h.color}/>
            <rect x={x} y="98" width="125" height="65" rx="4" fill={`${h.color}10`} stroke={h.color} strokeWidth="1.5"/>
            <text x={x + 62} y="118" textAnchor="middle" fontFamily={F.mono} fontSize="9" fontWeight="600" fill={h.color}>{h.name}</text>
            <text x={x + 62} y="145" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill="#505a5f">{h.when}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: API Flow (3.5) ───
function ApiFlowDiagram() {
  return (
    <svg viewBox="0 0 700 180" style={svgS()}>
      <ArrowDefs/>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">API request lifecycle</text>
      {[
        { x: 10, label: "POST /api/chat", sub: "{ message, token }", color: "#1d70b8", icon: "📤" },
        { x: 185, label: "Auth check", sub: "verify bearer token", color: "#d4351c", icon: "🔐" },
        { x: 360, label: "Agent session", sub: "tools, memory, LLM", color: "#00703c", icon: "🤖" },
        { x: 535, label: "JSON response", sub: '{ response, usage }', color: "#4c2c92", icon: "📥" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="40" width="160" height="80" rx="4" fill={`${s.color}10`} stroke={s.color} strokeWidth="1.5"/>
          <text x={s.x + 80} y="65" textAnchor="middle" fontSize="18">{s.icon}</text>
          <text x={s.x + 80} y="85" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
          <text x={s.x + 80} y="105" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill="#505a5f">{s.sub}</text>
          {i < 3 && <line x1={s.x + 160} y1="80" x2={s.x + 185} y2="80" stroke="#0b0c0c" strokeWidth="1.5" markerEnd="url(#a-black)"/>}
        </g>
      ))}
      <text x="350" y="150" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">Same agent loop as CLI — just triggered by HTTP instead of keyboard</text>
    </svg>
  );
}

// ─── NEW: Team Design Worksheet (4.1) ───
function TeamDesignWorksheet() {
  const domains = [
    { domain: "Email triage", trigger: "Real-time", tools: "web_search, gmail MCP", agent: "Inbox Agent" },
    { domain: "Code reviews", trigger: "On PR open", tools: "terminal, github MCP", agent: "Dev Agent" },
    { domain: "Research", trigger: "On-demand", tools: "web_search, web_extract", agent: "Research Agent" },
    { domain: "Infra health", trigger: "Every 30m", tools: "terminal, ssh backend", agent: "Ops Agent" },
    { domain: "Morning brief", trigger: "Daily 8am", tools: "delegation, gateway", agent: "Briefing Agent" },
  ];
  return (
    <svg viewBox="0 0 700 215" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Agent team design worksheet — map your life domains</text>
      <rect x="10" y="30" width="680" height="28" fill="#0b0c0c" rx="3"/>
      {["Domain","Trigger","Key tools","Agent name"].map((h,i)=>(
        <text key={i} x={[95,255,430,610][i]} y="49" textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#fff">{h}</text>
      ))}
      {domains.map((d, i) => (
        <g key={i}>
          <rect x="10" y={62+i*30} width="680" height="28" fill={i%2?"#f3f2f1":"#fff"} stroke="#e0e0e0" strokeWidth="0.5"/>
          <text x="95" y={80+i*30} textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#0b0c0c">{d.domain}</text>
          <text x="255" y={80+i*30} textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#505a5f">{d.trigger}</text>
          <text x="430" y={80+i*30} textAnchor="middle" fontFamily={F.mono} fontSize="10" fill="#505a5f">{d.tools}</text>
          <text x="610" y={80+i*30} textAnchor="middle" fontFamily={F.sans} fontSize="11" fontWeight="600" fill="#1d70b8">{d.agent}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── NEW: Profile Isolation (4.2) ───
function ProfileIsolationDiagram() {
  return (
    <svg viewBox="0 0 700 130" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">Profile isolation — nothing shared by default</text>
      {[
        { label: "Config", icon: "⚙️", shared: false },
        { label: "Memory", icon: "🧠", shared: false },
        { label: "Skills", icon: "📋", shared: true },
        { label: "SOUL.md", icon: "✨", shared: false },
        { label: "Logs", icon: "📝", shared: false },
      ].map((item, i) => {
        const x = i * 138 + 8;
        return (
          <g key={i}>
            <rect x={x} y="35" width="128" height="85" rx="4" fill={item.shared ? "#00703c10" : "#d4351c10"} stroke={item.shared ? "#00703c" : "#d4351c"} strokeWidth="1.5"/>
            <text x={x + 64} y="62" textAnchor="middle" fontSize="18">{item.icon}</text>
            <text x={x + 64} y="82" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="600">{item.label}</text>
            <rect x={x + 24} y="92" width="80" height="20" rx="10" fill={item.shared ? "#00703c" : "#d4351c"}/>
            <text x={x + 64} y="106" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="600" fill="#fff">{item.shared ? "Can share" : "Per-profile"}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── NEW: Evaluation Scorecard (4.5) ───
function EvalScorecardDiagram() {
  const criteria = [
    { label: "Saves time", target: "Measurably", icon: "⏱️" },
    { label: "Cost", target: "< $30/month", icon: "💰" },
    { label: "Trust level", target: "Routine tasks", icon: "🤝" },
    { label: "Learning", target: "Memory growing", icon: "📈" },
    { label: "Debug skill", target: "Can use logs", icon: "🔍" },
  ];
  return (
    <svg viewBox="0 0 700 160" style={svgS()}>
      <text x="350" y="20" textAnchor="middle" fontFamily={F.sans} fontSize="14" fontWeight="700">1-week evaluation scorecard</text>
      {criteria.map((c, i) => {
        const x = i * 138 + 8;
        return (
          <g key={i}>
            <rect x={x} y="35" width="128" height="115" rx="4" fill="#f3f2f1" stroke="#b1b4b6" strokeWidth="1.5"/>
            <text x={x + 64} y="62" textAnchor="middle" fontSize="22">{c.icon}</text>
            <text x={x + 64} y="85" textAnchor="middle" fontFamily={F.sans} fontSize="12" fontWeight="700" fill="#0b0c0c">{c.label}</text>
            <line x1={x + 15} y1="95" x2={x + 113} y2="95" stroke="#b1b4b6" strokeWidth="1"/>
            <text x={x + 64} y="115" textAnchor="middle" fontFamily={F.sans} fontSize="11" fill="#00703c" fontWeight="600">{c.target}</text>
            <rect x={x + 49} y="125" width="30" height="16" rx="8" fill="#00703c20" stroke="#00703c" strokeWidth="1"/>
            <text x={x + 64} y="138" textAnchor="middle" fontFamily={F.sans} fontSize="8" fontWeight="600" fill="#00703c">PASS?</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── DIAGRAM MAP — most modules now have 2+ visuals ───
const DIAGRAMS = {
  "1.1": [AgentLoopDiagram, FourPartsDiagram],
  "1.2": [FirstStepsDiagram, FileTreeDiagram],
  "1.3": [ToolRegistryDiagram, ToolCallTraceDiagram],
  "1.4": [ConfigDiagram, SecurityLayersDiagram],
  "1.5": [MemoryDiagram, MemoryLifecycleDiagram],
  "1.6": [ReadmeProjectDiagram, SlashCommandsDiagram],
  "2.1": [SkillAnatomyDiagram, SkillLifecycleDiagram],
  "2.2": [GatewayDiagram, GatewaySecurityDiagram],
  "2.3": [DelegationDiagram, DelegationCostDiagram],
  "2.4": [CronDiagram, CronExamplesDiagram],
  "2.5": [ModelMatrixDiagram, ModelCostQualityDiagram],
  "2.6": [McpDiagram, McpVsBuiltinDiagram],
  "2.7": [BriefingSystemDiagram],
  "3.1": [TroubleshootingDiagram],
  "3.2": [ContextWindowDiagram, CompressionDiagram],
  "3.3": [TerminalBackendsDiagram, BackendDecisionDiagram],
  "3.4": [PluginDiagram, PluginHooksDiagram],
  "3.5": [ApiEndpointDiagram, ApiFlowDiagram],
  "4.1": [AgentTeamDiagram, TeamDesignWorksheet],
  "4.2": [ProfilesDiagram, ProfileIsolationDiagram],
  "4.3": [KanbanDiagram],
  "4.4": [SoulMdDiagram],
  "4.5": [FinalSystemDiagram, EvalScorecardDiagram],
};

// ─── Course Data ───

const COURSE_DATA = {
  meta: { title: "Hermes Agent Mastery", subtitle: "12-week practical course", goal: "Build a team of agents that run your life" },
  phases: [
    {
      id: "foundation", title: "Phase 1: Foundation", weeks: "Weeks 1–3", color: "#1d70b8",
      description: "Install it. Run it. Understand what it does.",
      modules: [
        { id: "1.1", title: "What Hermes actually is", duration: "45 min", type: "concept",
          objectives: ["Name the 4 parts: agent loop, tools, memory, gateway","Explain what happens when you press Enter","Draw the loop: you → LLM → tool call → result → LLM → response"],
          content: `## The mental model\n\nHermes is a **loop**. That's it.\n\n1. You send a message\n2. An LLM reads it\n3. The LLM decides: "I need a tool" or "I can answer now"\n4. If it uses a tool, the result goes back to the LLM\n5. Repeat until done\n\nThe loop lives in \`run_agent.py\` → \`AIAgent.run_conversation()\`.\n\n**Everything else** — memory, skills, gateway, TUI — is built around this loop.`,
          checklist: ["I can explain the agent loop in one sentence","I know the 4 parts and where they live","I have run the install command"] },
        { id: "1.2", title: "Install and first conversation", duration: "30 min", type: "hands-on",
          objectives: ["Complete installation","Set up an API key","Have your first real conversation"],
          content: `## Steps\n\n### 1. Finish install\n\`\`\`bash\nsource ~/.bashrc\nhermes\n\`\`\`\n\n### 2. Set up a model\n\`\`\`bash\nhermes model\n\`\`\`\n\nPick one: **OpenRouter** (easiest), **Nous Portal** (all-in-one), or **OpenAI / Anthropic** (if you have a key).\n\n### 3. First conversation\n\nType something real:\n\n> "Read the contents of my current directory and tell me what this project does"\n\nWatch the tool calls. **That's the loop in action.**\n\n### 4. Slash commands\n\`/help\` · \`/new\` · \`/model\` · \`/usage\` · \`/tools\``,
          checklist: ["Hermes is installed and runs","I have set up an API provider","I have had a conversation where tools were used","I have used /help and /usage"] },
        { id: "1.3", title: "How tools work", duration: "60 min", type: "concept + hands-on",
          objectives: ["List the 10 most important tools","Understand tool registration","Read a tool file and understand its structure"],
          content: `## The tool system\n\nEvery tool follows the same pattern — see the diagram above.\n\n### The 10 tools you'll use most\n\n| Tool | Does what |\n|------|----------|\n| \`terminal\` | Runs shell commands |\n| \`read_file\` | Reads file contents |\n| \`write_file\` | Creates/overwrites files |\n| \`patch\` | Edits specific lines |\n| \`search_files\` | Finds text (ripgrep) |\n| \`web_search\` | Searches the web |\n| \`web_extract\` | Scrapes a URL |\n| \`delegate_task\` | Spawns a sub-agent |\n| \`execute_code\` | Runs Python/JS sandbox |\n| \`memory\` | Saves/reads persistent notes |\n\n### Do this now\n\n1. Open \`tools/web_tools.py\`\n2. Find the \`registry.register()\` call\n3. Read the schema — that's what the LLM sees\n4. Find the handler — that's what runs`,
          checklist: ["I can name 10 core tools","I have read a tool file and found schema + handler","I understand: schema → handler → check"] },
        { id: "1.4", title: "Configuration deep dive", duration: "45 min", type: "hands-on",
          objectives: ["Edit config.yaml confidently","Understand .env vs config.yaml"],
          content: `## Two files, clear rules\n\nSee the diagram — secrets vs settings.\n\n### Key config\n\n\`\`\`yaml\nmodel: claude-sonnet-4-20250514\nagent:\n  max_iterations: 90\nterminal:\n  cwd: /home/you/projects\nsecurity:\n  auto_approve_commands: false\n\`\`\`\n\n### Do this now\n\n1. Edit \`~/.hermes/config.yaml\`\n2. Change model, set \`terminal.cwd\`\n3. Verify with \`hermes\`\n4. Run \`hermes doctor\``,
          checklist: ["I know secrets → .env, settings → config.yaml","I have edited config.yaml and verified","I have run hermes doctor"] },
        { id: "1.5", title: "Memory and persistence", duration: "60 min", type: "concept + hands-on",
          objectives: ["Understand the 3 memory systems","Verify memory persists across sessions"],
          content: `## 3 memory systems\n\nSee the diagram — three stores feeding the agent.\n\n### Do this now\n\n1. Tell Hermes about a project\n2. Ask it to remember key details\n3. Start \`/new\` → ask what it remembers\n4. Check \`~/.hermes/MEMORY.md\`\n5. Try session search: "Search our past conversations for [topic]"\n\n### The nudge system\n\nHermes periodically nudges itself: "Should I save anything?" This is a system prompt instruction on a timer — not magic.`,
          checklist: ["I can name all 3 memory systems","Memory persists across /new sessions","I have read MEMORY.md and USER.md on disk"] },
        { id: "1.6", title: "Week 3 checkpoint: build something", duration: "2 hours", type: "project",
          objectives: ["Complete a real task end-to-end","Observe the full loop","Identify what worked and what confused you"],
          content: `## Project: README generator\n\nAsk Hermes to scan a project directory, read key files, generate a README, write it to disk, and remember what it learned.\n\n### Judgement exercise\n\n- Was the README good? What would you change?\n- Too many tool calls? Too few?\n- Check \`/usage\` — what did it cost?\n- Did it remember the right things?\n\n**Write down your observations.** This is your baseline.`,
          checklist: ["Project completed end-to-end","I know the cost via /usage","I have written observations"] },
      ],
    },
    {
      id: "intermediate", title: "Phase 2: Control", weeks: "Weeks 4–7", color: "#00703c",
      description: "Tune it. Connect it. Make it do real work.",
      modules: [
        { id: "2.1", title: "Skills: teaching Hermes procedures", duration: "60 min", type: "concept + hands-on",
          objectives: ["Create a custom skill","Understand SKILL.md frontmatter","Use a skill in conversation"],
          content: `## What skills are\n\nA skill is a **procedure document** — markdown, not code. See the anatomy diagram above.\n\n### Do this now\n\n1. Create \`~/.hermes/skills/workflow/deploy-check/SKILL.md\`\n2. Write a skill for something YOU do repeatedly\n3. Invoke it with \`/deploy-check\`\n4. Iterate the SKILL.md content\n\nHermes also creates skills autonomously after complex tasks. The **curator** system manages their lifecycle.`,
          checklist: ["I have created a custom skill","I have used it via slash command","I have iterated at least once"] },
        { id: "2.2", title: "The gateway: Telegram, Discord, Slack", duration: "90 min", type: "hands-on",
          objectives: ["Set up gateway for one platform","Send a message from your phone"],
          content: `## Gateway architecture\n\nOne process, many platforms — see the diagram.\n\n\`\`\`bash\nhermes gateway setup\nhermes gateway start\n\`\`\`\n\n### Security\n\n\`\`\`yaml\nsecurity:\n  auto_approve_patterns:\n    - "ls *"\n    - "cat *"\n    - "git status"\n\`\`\``,
          checklist: ["Gateway running on one platform","I have messaged from my phone","I have configured auto_approve_patterns"] },
        { id: "2.3", title: "Delegation: agents spawning agents", duration: "60 min", type: "concept + hands-on",
          objectives: ["Understand parent/child agents","Use delegate_task for parallel work","Know leaf vs orchestrator roles"],
          content: `## How delegation works\n\nSee the diagram — parent spawns children, waits, collects.\n\n\`\`\`yaml\ndelegation:\n  max_concurrent_children: 3\n  max_spawn_depth: 2\n  child_timeout_seconds: 300\n\`\`\`\n\n### Judgement: when to delegate\n\n- Tasks genuinely independent? → Delegate\n- Could one agent handle it? → Don't\n- Cost-sensitive? → Delegation multiplies cost`,
          checklist: ["I have used delegate_task","I have used batch delegation","I understand cost implications"] },
        { id: "2.4", title: "Cron: scheduled agents", duration: "45 min", type: "hands-on",
          objectives: ["Set up a cron job","Deliver results to a platform","Understand 3-min timeout"],
          content: `## Cron = unattended scheduled agent\n\nSee the diagram — schedule → agent → deliver.\n\n| Format | Example |\n|--------|--------|\n| Duration | \`30m\`, \`2h\`, \`1d\` |\n| Natural | \`every monday 9am\` |\n| Cron | \`0 9 * * *\` |\n\n### Do this now\n\n1. Create a recurring job\n2. Verify: \`hermes cron list\`\n3. Test: \`hermes cron run <job-id>\``,
          checklist: ["Working cron job","Verified delivery","I understand the 3-min timeout"] },
        { id: "2.5", title: "Model selection strategy", duration: "60 min", type: "concept",
          objectives: ["Choose models by task type","Set up fallbacks","Use auxiliary overrides"],
          content: `## A judgement skill\n\nSee the cheat sheet above. The key insight: **different tasks need different models.**\n\n### Fallback\n\n\`\`\`yaml\nagent:\n  fallback_model:\n    provider: openrouter\n    model: google/gemini-2.5-flash\n\`\`\`\n\n### Auxiliary overrides\n\n\`\`\`yaml\nauxiliary:\n  title_generation:\n    model: google/gemini-2.5-flash\n  curator:\n    model: anthropic/claude-sonnet-4-20250514\n\`\`\`\n\n### Do this now\n\n1. Try 3 models on the same task\n2. Compare quality, speed, cost (\`/usage\`)`,
          checklist: ["Tested 3+ models","Fallback configured","Auxiliary overrides set"] },
        { id: "2.6", title: "MCP integration", duration: "60 min", type: "hands-on",
          objectives: ["Understand MCP servers","Connect one","Use MCP tools"],
          content: `## MCP = Model Context Protocol\n\nSee the diagram — external servers give Hermes new tools without writing Python.\n\n\`\`\`yaml\nmcp:\n  servers:\n    - name: github\n      command: npx\n      args: ["-y", "@modelcontextprotocol/server-github"]\n      env:\n        GITHUB_TOKEN: your-token\n\`\`\`\n\n### Do this now\n\n1. Add an MCP server to config.yaml\n2. Restart Hermes\n3. Verify with \`/tools\`\n4. Use it in conversation`,
          checklist: ["Connected an MCP server","Used MCP tools in conversation"] },
        { id: "2.7", title: "Week 7 checkpoint: automated workflow", duration: "3 hours", type: "project",
          objectives: ["Build end-to-end automation","Combine skills + cron + gateway + delegation"],
          content: `## Project: Daily briefing system\n\nSee the flow diagram above — this is what you're building.\n\n1. Write the skill: \`daily-briefing/SKILL.md\`\n2. Set up the cron job\n3. Configure gateway delivery\n4. Test with \`hermes cron run <job-id>\`\n5. Iterate until useful`,
          checklist: ["Briefing system working end-to-end","Delivers to my phone","Cost/quality optimised"] },
      ],
    },
    {
      id: "advanced", title: "Phase 3: Mastery", weeks: "Weeks 8–10", color: "#d4351c",
      description: "Troubleshoot. Optimise. Build systems.",
      modules: [
        { id: "3.1", title: "Troubleshooting: reading the signs", duration: "60 min", type: "concept + hands-on",
          objectives: ["Read agent.log and errors.log","Diagnose common failures","Use hermes doctor"],
          content: `## Where to look\n\nUse the reference table above as first-line triage.\n\n### Common fixes\n\n**"Model not found"** → \`hermes model\`\n\n**"Rate limit"** → set up a fallback\n\n**"Tool call failed"** → read tool output (usually permissions)\n\n**"Context too long"** → \`/compress\` or \`/new\`\n\n**SQLite locking** → move ~/.hermes off network filesystem`,
          checklist: ["I know where all 3 log files are","I have read an agent.log trace","I have diagnosed an intentional failure"] },
        { id: "3.2", title: "Context management", duration: "45 min", type: "concept",
          objectives: ["Understand context windows","Use compression","Manage prompt caching"],
          content: `## Context = everything the LLM sees\n\nSee the bar chart above — conversation history is the biggest consumer.\n\n\`\`\`yaml\ncompression:\n  auto_compress: true\n  threshold: 0.7\n\`\`\`\n\n**Rule: never change the system prompt mid-conversation.** Invalidates the cache.\n\n### Do this now\n\n1. Have a 20+ turn conversation\n2. Check \`/usage\` → note tokens\n3. Run \`/compress\`\n4. Check again`,
          checklist: ["I understand what fills context","Used /compress, verified reduction","I understand prompt caching"] },
        { id: "3.3", title: "Terminal backends", duration: "60 min", type: "hands-on",
          objectives: ["Run tools in Docker","Know when to use each backend"],
          content: `## Why different backends?\n\nSee the comparison above. Default = local = dangerous for production.\n\n\`\`\`yaml\nterminal:\n  backend: docker\n  docker:\n    image: ubuntu:24.04\n    volumes:\n      - /path/to/projects:/workspace\n\`\`\`\n\n### Do this now\n\n1. Set backend to \`docker\`\n2. Run a conversation with terminal commands\n3. Verify isolation\n4. Switch back when done`,
          checklist: ["Run commands in Docker backend","I can articulate when to use each"] },
        { id: "3.4", title: "Plugins and extending Hermes", duration: "60 min", type: "hands-on",
          objectives: ["Write a plugin","Register a custom tool"],
          content: `## Plugins vs core\n\nSee the diagram — plugins inject into the registry without touching core files.\n\n### Do this now\n\n1. Create \`~/.hermes/plugins/my-plugin/\`\n2. Write \`plugin.yaml\` + \`__init__.py\`\n3. Restart Hermes, verify with \`/tools\`\n4. Use your custom tool in conversation`,
          checklist: ["Plugin installed","Custom tool in /tools","Used it in conversation"] },
        { id: "3.5", title: "API endpoints: agents as services", duration: "90 min", type: "hands-on",
          objectives: ["Run Hermes as API server","Connect a frontend app"],
          content: `## Hermes as a backend\n\nSee the diagram — your apps talk to Hermes like any API.\n\n\`\`\`yaml\ngateway:\n  platforms:\n    api_server:\n      enabled: true\n      host: 0.0.0.0\n      port: 8080\n      auth_token: your-secret\n\`\`\`\n\n\`\`\`bash\ncurl -X POST http://localhost:8080/api/chat \\\n  -H "Authorization: Bearer your-secret" \\\n  -H "Content-Type: application/json" \\\n  -d '{"message": "Check my project status"}'\n\`\`\`\n\n### Do this now\n\n1. Enable api_server\n2. Start gateway\n3. Make a curl request\n4. Build a tiny HTML page that talks to it`,
          checklist: ["API running","Successful curl request","Built a minimal frontend"] },
      ],
    },
    {
      id: "expert", title: "Phase 4: Agent Team", weeks: "Weeks 11–12", color: "#4c2c92",
      description: "Build the system. Run your life.",
      modules: [
        { id: "4.1", title: "Designing your agent team", duration: "90 min", type: "concept",
          objectives: ["Map life domains to agents","Design team architecture"],
          content: `## The team model\n\nYou need **specialised agents** — see the diagram.\n\n### Do this now\n\n1. List 5 domains that need an agent\n2. For each: what it does, when it runs, what tools\n3. Draw the connections\n4. Identify communication patterns`,
          checklist: ["Life domains mapped","Team architecture written","Communication patterns identified"] },
        { id: "4.2", title: "Profiles: isolated instances", duration: "60 min", type: "hands-on",
          objectives: ["Create multiple profiles","Run simultaneously"],
          content: `## Profiles = fully isolated\n\nSee the diagram — each profile is its own world.\n\n\`\`\`bash\nhermes profile create dev-agent\nhermes profile create ops-agent\n\`\`\`\n\nRun simultaneously:\n\`\`\`bash\nHERMES_HOME=~/.hermes/profiles/dev-agent hermes gateway start &\nHERMES_HOME=~/.hermes/profiles/ops-agent hermes gateway start &\n\`\`\``,
          checklist: ["2+ profiles created","Each has own config + memory","Running simultaneously"] },
        { id: "4.3", title: "Kanban: multi-agent coordination", duration: "60 min", type: "hands-on",
          objectives: ["Set up kanban board","Agents complete tasks"],
          content: `## Kanban = shared task board\n\nSee the board above — tasks flow from Backlog → In Progress → Done.\n\n\`\`\`bash\nhermes kanban init my-board\nhermes kanban create "Review auth module" --board my-board\n\`\`\`\n\n\`\`\`yaml\nkanban:\n  dispatch_in_gateway: true\n\`\`\``,
          checklist: ["Working kanban board","Agent completed a task from it"] },
        { id: "4.4", title: "SOUL.md: agent personality", duration: "45 min", type: "hands-on",
          objectives: ["Write SOUL.md files","Tune behaviour per domain"],
          content: `## SOUL.md = identity\n\nSee the comparison above — different agents need different personalities.\n\nLives at \`~/.hermes/SOUL.md\` (per-profile). Loaded into system prompt.\n\n### Do this now\n\n1. Write SOUL.md for your primary agent\n2. Write a different one for a specialist\n3. Compare output quality before/after`,
          checklist: ["SOUL.md for 2+ profiles","Visible behaviour difference"] },
        { id: "4.5", title: "Final project: your agent team", duration: "8 hours", type: "project",
          objectives: ["Deploy multi-agent system","Connect to daily life"],
          content: `## Build it\n\nSee the full system diagram above — this is your target.\n\n### Minimum viable team\n\n1. **2+ profiles** with SOUL.md\n2. **Skills** per profile\n3. **Cron jobs** for scheduled work\n4. **Gateway** to your phone\n5. **API endpoint** for one agent\n\n### Evaluate after 1 week\n\n| Question | Target |\n|----------|--------|\n| Saves time? | Measurably |\n| Cost? | Under $30/month |\n| Trust? | For routine tasks |\n| Learning? | Memory improving |\n\n**The agent grows with you. But you have to tend it.**`,
          checklist: ["System deployed","2+ profiles with roles","Cron delivering output","Gateway connected","API endpoint working","Cost measured for 1 week"] },
      ],
    },
  ],
  reference: {
    title: "Quick Reference",
    items: [
      { label: "Install", command: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash" },
      { label: "Start", command: "hermes" },
      { label: "Setup", command: "hermes setup" },
      { label: "Model", command: "hermes model" },
      { label: "Tools", command: "hermes tools" },
      { label: "Gateway", command: "hermes gateway start" },
      { label: "Health", command: "hermes doctor" },
      { label: "Logs", command: "hermes logs --follow" },
      { label: "Update", command: "hermes update" },
      { label: "Profile", command: "hermes profile create <name>" },
      { label: "Cron", command: "hermes cron list" },
      { label: "Kanban", command: "hermes kanban init <name>" },
    ],
  },
};

// ─── Styles ───

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`;

const styles = {
  page: { fontFamily: "'Source Sans 3', sans-serif", background: "#fff", color: "#0b0c0c", maxWidth: 960, margin: "0 auto", padding: "0 16px", lineHeight: 1.6, fontSize: 16 },
  header: { borderBottom: "10px solid #0b0c0c", padding: "16px 0 12px", marginBottom: 32 },
  crown: { fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#505a5f" },
  h1: { fontSize: 36, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" },
  subtitle: { fontSize: 18, color: "#505a5f", margin: 0, fontWeight: 400 },
  goal: { background: "#f3f2f1", padding: "12px 16px", borderLeft: "4px solid #0b0c0c", margin: "0 0 40px", fontSize: 17, fontWeight: 600 },
  nav: { display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid #b1b4b6", flexWrap: "wrap" },
  navBtn: (active, color) => ({ padding: "10px 20px", border: "none", borderBottom: active ? `4px solid ${color}` : "4px solid transparent", background: active ? "#f3f2f1" : "transparent", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: active ? 700 : 400, color: active ? "#0b0c0c" : "#505a5f", cursor: "pointer" }),
  phaseHeader: (color) => ({ borderLeft: `4px solid ${color}`, paddingLeft: 16, marginBottom: 24 }),
  phaseTitle: { fontSize: 28, fontWeight: 700, margin: "0 0 2px" },
  phaseWeeks: { fontSize: 14, color: "#505a5f", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 },
  phaseDesc: { fontSize: 17, color: "#505a5f", margin: "4px 0 0" },
  moduleList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2 },
  moduleItem: (expanded, color) => ({ border: `1px solid ${expanded ? color : "#b1b4b6"}`, borderLeft: `4px solid ${color}`, background: expanded ? "#f8f8f8" : "#fff" }),
  moduleBtn: { width: "100%", padding: "14px 16px", border: "none", background: "transparent", textAlign: "left", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", display: "flex", alignItems: "center", gap: 12 },
  moduleId: (color) => ({ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color, background: `${color}11`, padding: "2px 8px", borderRadius: 2, flexShrink: 0 }),
  moduleTitle: { fontSize: 17, fontWeight: 600, color: "#0b0c0c", flex: 1 },
  moduleMeta: { display: "flex", gap: 8, alignItems: "center", flexShrink: 0 },
  badge: (bg, fg) => ({ fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 2, background: bg, color: fg, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }),
  duration: { fontSize: 13, color: "#505a5f", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" },
  chevron: (expanded) => ({ fontSize: 18, color: "#505a5f", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.15s", flexShrink: 0 }),
  moduleContent: { padding: "0 16px 20px 40px", borderTop: "1px solid #e0e0e0" },
  objectives: { background: "#fff", border: "1px solid #b1b4b6", padding: "12px 16px", margin: "16px 0" },
  objTitle: { fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#505a5f", margin: "0 0 8px" },
  objList: { margin: 0, paddingLeft: 20 },
  objItem: { fontSize: 15, marginBottom: 4 },
  prose: { fontSize: 16, lineHeight: 1.7 },
  checklist: { background: "#f3f2f1", padding: "12px 16px", margin: "20px 0 0" },
  checkTitle: { fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#505a5f", margin: "0 0 8px" },
  checkItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 15 },
  checkbox: { width: 18, height: 18, flexShrink: 0, marginTop: 2, accentColor: "#00703c", cursor: "pointer" },
  refGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8, marginTop: 16 },
  refItem: { background: "#f3f2f1", padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 },
  refLabel: { fontSize: 14, fontWeight: 600 },
  refCmd: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#505a5f", wordBreak: "break-all" },
  progressBar: { height: 4, background: "#e0e0e0", borderRadius: 2, overflow: "hidden", margin: "8px 0 24px" },
  progressFill: (pct, color) => ({ height: "100%", width: `${pct}%`, background: color, borderRadius: 2, transition: "width 0.3s ease" }),
  footer: { borderTop: "1px solid #b1b4b6", padding: "16px 0 40px", marginTop: 48, color: "#505a5f", fontSize: 14 },
};

const TYPE_COLORS = { concept: { bg: "#d4351c15", fg: "#d4351c" }, "hands-on": { bg: "#00703c15", fg: "#00703c" }, "concept + hands-on": { bg: "#1d70b815", fg: "#1d70b8" }, project: { bg: "#4c2c9215", fg: "#4c2c92" } };

// ─── Markdown ───
function Prose({ text }) {
  const html = text
    .replace(/### (.*)/g, '<h4 style="font-size:17px;font-weight:700;margin:20px 0 8px;color:#0b0c0c">$1</h4>')
    .replace(/## (.*)/g, '<h3 style="font-size:20px;font-weight:700;margin:24px 0 8px;color:#0b0c0c;border-bottom:1px solid #e0e0e0;padding-bottom:4px">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:13px;background:#f3f2f1;padding:1px 6px;border-radius:2px;color:#d4351c">$1</code>')
    .replace(/^- (.*)/gm, '<li style="margin-bottom:4px">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="padding-left:20px;margin:8px 0">$&</ul>')
    .replace(/^> (.*)/gm, '<blockquote style="border-left:4px solid #1d70b8;margin:12px 0;padding:8px 16px;background:#1d70b808;font-style:italic">$1</blockquote>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre style="background:#0b0c0c;color:#d0d0d0;padding:12px 16px;overflow-x:auto;font-family:JetBrains Mono,monospace;font-size:13px;line-height:1.5;margin:12px 0"><code>${c.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (_, h, b) => {
      const ths = h.split('|').filter(c=>c.trim()).map(c=>`<th style="text-align:left;padding:8px 12px;border-bottom:2px solid #0b0c0c;font-size:14px;font-weight:700">${c.trim()}</th>`).join('');
      const rows = b.trim().split('\n').map(r=>{const tds=r.split('|').filter(c=>c.trim()).map(c=>`<td style="padding:6px 12px;border-bottom:1px solid #e0e0e0;font-size:14px">${c.trim()}</td>`).join('');return`<tr>${tds}</tr>`;}).join('');
      return`<table style="width:100%;border-collapse:collapse;margin:12px 0"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    })
    .replace(/\n\n/g, '</p><p style="margin:8px 0">')
    .replace(/^(?!<[hupltbo])(.+)$/gm, '<p style="margin:8px 0">$1</p>');
  return <div style={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Module ───
function Module({ mod, phaseColor, checks, onCheck }) {
  const [open, setOpen] = useState(false);
  const tc = TYPE_COLORS[mod.type] || TYPE_COLORS["concept"];
  const allChecked = mod.checklist?.every((_, i) => checks[`${mod.id}-${i}`]);
  const diagrams = DIAGRAMS[mod.id] || [];
  return (
    <li style={styles.moduleItem(open, phaseColor)}>
      <button style={styles.moduleBtn} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span style={styles.moduleId(phaseColor)}>{mod.id}</span>
        <span style={styles.moduleTitle}>{allChecked && <span style={{color:"#00703c",marginRight:6}}>✓</span>}{mod.title}</span>
        <span style={styles.moduleMeta}><span style={styles.badge(tc.bg,tc.fg)}>{mod.type}</span><span style={styles.duration}>{mod.duration}</span></span>
        <span style={styles.chevron(open)}>▾</span>
      </button>
      {open && (
        <div style={styles.moduleContent}>
          <div style={styles.objectives}>
            <p style={styles.objTitle}>By the end you will</p>
            <ol style={styles.objList}>{mod.objectives.map((o,i)=><li key={i} style={styles.objItem}>{o}</li>)}</ol>
          </div>
          {diagrams.map((D,i)=><D key={i}/>)}
          <Prose text={mod.content}/>
          {mod.checklist && (
            <div style={styles.checklist}>
              <p style={styles.checkTitle}>Done?</p>
              {mod.checklist.map((item,i)=>(
                <label key={i} style={styles.checkItem}>
                  <input type="checkbox" style={styles.checkbox} checked={!!checks[`${mod.id}-${i}`]} onChange={()=>onCheck(`${mod.id}-${i}`)}/>
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

// ─── App ───
export default function HermesMasteryCourse() {
  const [activePhase, setActivePhase] = useState("foundation");
  const [checks, setChecks] = useState({});
  useEffect(() => { try { const r = localStorage.getItem("hermes-course-v3"); if (r) setChecks(JSON.parse(r)); } catch {} }, []);
  const handleCheck = (key) => { const next = {...checks,[key]:!checks[key]}; setChecks(next); try { localStorage.setItem("hermes-course-v3", JSON.stringify(next)); } catch {} };
  const phase = COURSE_DATA.phases.find(p => p.id === activePhase);
  const totalChecks = COURSE_DATA.phases.flatMap(p=>p.modules).flatMap(m=>m.checklist||[]).length;
  const doneChecks = Object.values(checks).filter(Boolean).length;
  const pct = totalChecks ? Math.round(doneChecks/totalChecks*100) : 0;
  const phaseChecks = phase ? phase.modules.flatMap(m=>(m.checklist||[]).map((_,i)=>`${m.id}-${i}`)) : [];
  const phaseDone = phaseChecks.filter(k=>checks[k]).length;
  const phasePct = phaseChecks.length ? Math.round(phaseDone/phaseChecks.length*100) : 0;
  return (
    <><style>{fonts}</style>
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.crown}>Nous Research · Self-study course</p>
        <h1 style={styles.h1}>{COURSE_DATA.meta.title}</h1>
        <p style={styles.subtitle}>{COURSE_DATA.meta.subtitle} · {doneChecks}/{totalChecks} checks ({pct}%)</p>
      </header>
      <div style={styles.goal}>Goal: {COURSE_DATA.meta.goal}</div>
      <div style={styles.progressBar}><div style={styles.progressFill(pct,"#0b0c0c")}/></div>
      <nav style={styles.nav}>
        {COURSE_DATA.phases.map(p=><button key={p.id} style={styles.navBtn(activePhase===p.id,p.color)} onClick={()=>setActivePhase(p.id)}>{p.title}</button>)}
        <button style={styles.navBtn(activePhase==="ref","#0b0c0c")} onClick={()=>setActivePhase("ref")}>Reference</button>
      </nav>
      {activePhase!=="ref" && phase && (<>
        <div style={styles.phaseHeader(phase.color)}>
          <p style={styles.phaseWeeks}>{phase.weeks}</p>
          <h2 style={styles.phaseTitle}>{phase.title}</h2>
          <p style={styles.phaseDesc}>{phase.description}</p>
        </div>
        <div style={styles.progressBar}><div style={styles.progressFill(phasePct,phase.color)}/></div>
        <ul style={styles.moduleList}>{phase.modules.map(m=><Module key={m.id} mod={m} phaseColor={phase.color} checks={checks} onCheck={handleCheck}/>)}</ul>
      </>)}
      {activePhase==="ref" && (<div>
        <h2 style={styles.phaseTitle}>{COURSE_DATA.reference.title}</h2>
        <div style={styles.refGrid}>{COURSE_DATA.reference.items.map((item,i)=>(
          <div key={i} style={styles.refItem}><span style={styles.refLabel}>{item.label}</span><code style={styles.refCmd}>{item.command}</code></div>
        ))}</div>
      </div>)}
      <footer style={styles.footer}>
        <p>Built from the Hermes Agent source code at github.com/NousResearch/hermes-agent</p>
        <p>Progress saves automatically between sessions.</p>
      </footer>
    </div></>
  );
}
