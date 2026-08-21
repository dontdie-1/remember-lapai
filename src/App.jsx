import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Home as HomeIcon, Database, ClipboardList, Landmark, Menu, Search, User,
  ChevronLeft, ChevronRight, Lock, RefreshCw, Plus, FileText, TrendingUp,
  Baby, Cross, HomeIcon as HouseIcon, MoreVertical, Building2, Users2,
  Mic, GraduationCap,
} from "lucide-react";

/* ============================================================
   Matches the reference design: navy header, light neutral
   background, teal + gold accent system, bottom tab bar.
   ============================================================ */

const C = {
  navy: "#142A4F",
  navyLight: "#1F3D6E",
  bg: "#F2F5F9",
  card: "#FFFFFF",
  teal: "#6BC7B8",
  gold: "#E0A94D",
  green: "#2E9E5B",
  text: "#16202B",
  textDim: "#6B7686",
  border: "#E4E9F0",
};

const FONTS = {
  display: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// ---------- Sample data ----------

const vitalEvents = [
  { q: "Q1", births: 60, deaths: 30, marriages: 55 },
  { q: "Q2", births: 120, deaths: 60, marriages: 90 },
  { q: "Q3", births: 150, deaths: 100, marriages: 70 },
  { q: "Q4", births: 170, deaths: 140, marriages: 100 },
];

const activityFeed = [
  { icon: Baby, tone: C.teal, title: "Birth registered", meta: "Ward 3 · 2 hrs ago" },
  { icon: HouseIcon, tone: C.gold, title: "Household update", meta: "Ward 5 · 4 hrs ago" },
  { icon: Cross, tone: "#93A0B4", title: "Death registered", meta: "Ward 1 · Yesterday" },
  { icon: HouseIcon, tone: C.gold, title: "Household update", meta: "Ward 2 · Yesterday" },
];

const rulers = [
  { period: "1825 - 1832", name: "Emir Da'udu Maza dan Jaura", note: "The first Etsu Lapai. The Fulani petitioned the Emir of Gwandu to establish Lapai as an independent emirate in 1825, and Da'udu Maza dan Jaura became its founding ruler." },
  { period: "1838 - 1874", name: "Emir Jantabu dan Jaura", note: "4th Etsu Lapai. Established the traditional seat and oversaw one of the longest early reigns of the emirate." },
  { period: "1893 - 1907", name: "Emir Abd al-Qadiri dan Jantabu", note: "7th Etsu Lapai." },
  { period: "1954 - 2002", name: "Emir Muhammadu Kobo", note: "11th Etsu Lapai. Trained as a teacher before ascending the throne, and reigned for close to five decades." },
  { period: "2002 - present", name: "Emir Umaru Bago Tafida", note: "12th and current Etsu Lapai, appointed in 2002." },
];

function artifactSvg(bg1, bg2, iconPath) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${bg1}'/>
        <stop offset='100%' stop-color='${bg2}'/>
      </linearGradient>
    </defs>
    <rect width='300' height='300' fill='url(#g)'/>
    <g transform='translate(150,150)' opacity='0.55'>${iconPath}</g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const artifacts = [
  {
    label: "Founding Decree (1825)",
    img: artifactSvg("#EFE6D0", "#C9B77E", "<rect x='-45' y='-60' width='90' height='120' rx='4' fill='#fff' opacity='0.85'/><line x1='-30' y1='-35' x2='30' y2='-35' stroke='#8a7a4a' stroke-width='3'/><line x1='-30' y1='-15' x2='30' y2='-15' stroke='#8a7a4a' stroke-width='3'/><line x1='-30' y1='5' x2='30' y2='5' stroke='#8a7a4a' stroke-width='3'/><line x1='-30' y1='25' x2='10' y2='25' stroke='#8a7a4a' stroke-width='3'/>"),
  },
  {
    label: "Brass Alms Bowl (19th c.)",
    img: artifactSvg("#E7C77E", "#A8822E", "<ellipse cx='0' cy='20' rx='55' ry='16' fill='#fff8e0' opacity='0.5'/><path d='M -55 15 Q 0 60 55 15 L 55 5 Q 0 45 -55 5 Z' fill='#fff8e0' opacity='0.85'/>"),
  },
  {
    label: "Ceremonial Staff",
    img: artifactSvg("#D8CBAE", "#8C7A52", "<rect x='-4' y='-70' width='8' height='140' rx='3' fill='#fff' opacity='0.85'/><circle cx='0' cy='-70' r='16' fill='#fff' opacity='0.85'/>"),
  },
  {
    label: "Correspondence Ledger",
    img: artifactSvg("#EFE6D0", "#B7A66E", "<rect x='-50' y='-55' width='100' height='110' rx='4' fill='#fff' opacity='0.85'/><line x1='-35' y1='-30' x2='35' y2='-30' stroke='#8a7a4a' stroke-width='3'/><line x1='-35' y1='-10' x2='35' y2='-10' stroke='#8a7a4a' stroke-width='3'/><line x1='-35' y1='10' x2='35' y2='10' stroke='#8a7a4a' stroke-width='3'/><line x1='-35' y1='30' x2='15' y2='30' stroke='#8a7a4a' stroke-width='3'/>"),
  },
];

// ---------- Building blocks ----------

function Avatar({ size = 64, seed = 0 }) {
  const hue = (seed * 47) % 360;
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, hsl(${hue},30%,32%), hsl(${hue + 30},25%,55%))`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <Landmark size={size * 0.4} color="#ffffffaa" />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta, iconBg }) {
  return (
    <div style={{ background: C.card, borderRadius: 14, padding: "16px 18px", flex: 1, border: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {Icon && (
          <div style={{ width: 26, height: 26, borderRadius: 7, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={14} color={C.navy} />
          </div>
        )}
        <span style={{ fontSize: 13, color: C.textDim, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 600, color: C.text }}>{value}</div>
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: C.green, fontWeight: 600 }}>
          <TrendingUp size={12} /> {delta}
        </div>
      )}
    </div>
  );
}

function TopHeader({ title, onBack, dark = true }) {
  return (
    <div
      style={{
        background: C.navy, color: "#fff", padding: "18px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack ? (
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex" }}>
            <ChevronLeft size={22} />
          </button>
        ) : (
          <Menu size={20} />
        )}
        <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 17, letterSpacing: 0.3 }}>{title}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Search size={18} />
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#ffffff22", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={16} />
        </div>
      </div>
    </div>
  );
}

// ---------- Home ----------

function HomePage({ go }) {
  const stats = [
    { icon: Building2, label: "Historical Sites", value: "148+" },
    { icon: Users2, label: "Active Members", value: "3,250+" },
    { icon: Mic, label: "Oral Histories", value: "612+" },
    { icon: FileText, label: "Artifacts Documented", value: "294+" },
  ];
  const actions = [
    { icon: FileText, label: "Access Archive", tab: "archive" },
    { icon: ClipboardList, label: "Register Household", tab: "register" },
    { icon: Landmark, label: "Explore the Museum", tab: "museum" },
  ];

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopHeader title="Remembering Lapai" />

      <div
        style={{
          position: "relative", height: 220, overflow: "hidden",
          background: `linear-gradient(135deg, ${C.navy}, #2A4A7F)`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.25, background: `radial-gradient(circle at 70% 30%, ${C.gold}, transparent 60%)` }} />
        <div style={{ position: "relative", padding: "24px 20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ color: "#fff", fontFamily: FONTS.display, fontSize: 26, lineHeight: 1.25, margin: 0, fontWeight: 600, maxWidth: 260 }}>
            Preserving Our Heritage. Connecting Generations.
          </h1>
          <button
            onClick={() => go("museum")}
            style={{
              marginTop: 16, alignSelf: "flex-start", background: C.gold, color: C.navy,
              border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700,
              fontSize: 14, cursor: "pointer",
            }}
          >
            Explore History
          </button>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} iconBg="#EFE6D0" />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={() => go(a.tab)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: C.navy, color: "#fff", border: "none", borderRadius: 10,
                  padding: "16px 18px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon size={18} />
                  {a.label}
                </span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Data Center (dashboard) ----------

function DataCenter() {
  const [year, setYear] = useState("2026");
  const [ward, setWard] = useState("All Wards");

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ background: C.navy, padding: "18px 20px 20px" }}>
        <div style={{ color: "#fff", fontFamily: FONTS.display, fontWeight: 600, fontSize: 19, marginBottom: 14 }}>
          Lapai Data Center
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { value: year, set: setYear, opts: ["2024", "2025", "2026"], label: "Year" },
            { value: ward, set: setWard, opts: ["All Wards", "Lapai Central", "Gulu Ward"], label: "Ward" },
          ].map((f) => (
            <div key={f.label} style={{ flex: 1, background: "#ffffff14", borderRadius: 10, padding: "8px 12px" }}>
              <div style={{ fontSize: 11, color: "#ffffffaa", marginBottom: 2 }}>{f.label}</div>
              <select
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                style={{ background: "transparent", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, width: "100%" }}
              >
                {f.opts.map((o) => <option key={o} value={o} style={{ color: C.text }}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ background: C.card, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: C.textDim, fontWeight: 500 }}>Total Population in Lapai</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.green, fontWeight: 600 }}>
              <TrendingUp size={12} /> 1.13%
            </span>
          </div>
          <div style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 600, color: C.text, marginBottom: 12 }}>
            48,910
          </div>
          <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.textDim, marginBottom: 3 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, display: "inline-block" }} />
                Township Residents
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 19, fontWeight: 600, color: C.text }}>34,500</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.textDim, marginBottom: 3 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
                Transient Students
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 19, fontWeight: 600, color: C.text }}>14,410</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <StatCard icon={HouseIcon} label="Registered Households" value="1,284" delta="26%" iconBg="#F3E7CE" />
          <StatCard icon={GraduationCap} label="Students Currently in Town" value="8,420" iconBg="#DCEEE9" />
        </div>

        <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 14 }}>Gender Distribution</div>
          {[{ label: "Male", pct: 49.2, color: C.teal }, { label: "Female", pct: 50.8, color: C.gold }].map((g) => (
            <div key={g.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.textDim, marginBottom: 5 }}>
                <span>{g.label}</span><span style={{ color: C.text, fontWeight: 600 }}>{g.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 5, background: "#EEF1F5", overflow: "hidden" }}>
                <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 5 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 4 }}>Period-over-period changes in vital events</div>
          <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 12, color: C.textDim }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><i style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, display: "inline-block" }} />Births</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><i style={{ width: 8, height: 8, borderRadius: "50%", background: "#93A0B4", display: "inline-block" }} />Deaths</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><i style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, display: "inline-block" }} />Marriages</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={vitalEvents}>
              <defs>
                <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.teal} stopOpacity={0.5} /><stop offset="100%" stopColor={C.teal} stopOpacity={0} /></linearGradient>
                <linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#93A0B4" stopOpacity={0.5} /><stop offset="100%" stopColor="#93A0B4" stopOpacity={0} /></linearGradient>
                <linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.gold} stopOpacity={0.5} /><stop offset="100%" stopColor={C.gold} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: C.textDim }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textDim }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: `1px solid ${C.border}` }} />
              <Area type="monotone" dataKey="births" stroke={C.teal} fill="url(#b)" strokeWidth={2} />
              <Area type="monotone" dataKey="deaths" stroke="#93A0B4" fill="url(#d)" strokeWidth={2} />
              <Area type="monotone" dataKey="marriages" stroke={C.gold} fill="url(#m)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.card, borderRadius: 14, padding: "6px 6px 6px", border: `1px solid ${C.border}` }}>
          {activityFeed.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < activityFeed.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${a.tone}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={a.tone} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: C.textDim }}>{a.meta}</div>
                </div>
                <MoreVertical size={16} color={C.textDim} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Household Registration ----------

function Register() {
  const [form, setForm] = useState({ head: "", address: "", date: "", residents: "" });
  const [log, setLog] = useState([
    { text: "User Login", meta: "10:15 AM" },
  ]);

  const field = (key, label, placeholder) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>{label}</div>
      <input
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "13px 14px", borderRadius: 8,
          border: `1px solid ${C.border}`, fontSize: 14, boxSizing: "border-box",
          fontFamily: FONTS.body, background: "#fff",
        }}
      />
    </div>
  );

  const handleAdd = () => {
    if (!form.head) return;
    setLog([{ text: `Form Submitted by ${form.head}`, meta: "Just now" }, ...log]);
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ background: `linear-gradient(90deg, ${C.navy}, ${C.navyLight})`, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#E0A94D22", border: `1px solid ${C.gold}66`, borderRadius: 999, padding: "5px 12px" }}>
          <RefreshCw size={13} color={C.gold} />
          <span style={{ fontSize: 12, color: C.gold, fontWeight: 600 }}>Offline / Syncing</span>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={16} color={C.navy} />
        </div>
      </div>

      <div style={{ padding: "24px 20px" }}>
        <div style={{ fontSize: 13, color: C.textDim, marginBottom: 4 }}>Step by-step</div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 24, color: C.navy, margin: "0 0 22px", fontWeight: 700 }}>
          Household Registration
        </h2>

        {field("head", "Head of Household Name", "e.g. Ibrahim Suleiman")}
        {field("address", "Address", "e.g. 14 Gulu Ward Road")}
        {field("date", "Date of Registration", "dd/mm/yyyy")}
        {field("residents", "Number of Residents", "e.g. 5")}

        <button
          onClick={handleAdd}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            background: `linear-gradient(90deg, ${C.navy}, ${C.navyLight})`, color: "#fff", border: "none",
            borderRadius: 10, padding: "15px 18px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 12,
          }}
        >
          Add Household Member
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={14} color="#fff" />
          </span>
        </button>

        <button
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#fff", color: C.navy, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "13px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24,
          }}
        >
          <ClipboardList size={16} /> Report Vital Event
        </button>

        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 12 }}>
            <Lock size={15} /> Access Log
          </div>
          {log.map((l, i) => (
            <div key={i} style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>
              {l.text} - {l.meta}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- The Lapai Museum ----------

function Museum({ goHome }) {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopHeader title="THE LAPAI MUSEUM" onBack={goHome} />

      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: 12, color: C.textDim, marginBottom: 18, lineHeight: 1.6 }}>
          A verified timeline of the Etsu Lapai lineage, drawn from public historical reference
          sources, alongside sample artifacts and documents held in the community archive.
        </div>

        <div style={{ position: "relative", paddingLeft: 4 }}>
          {rulers.map((r, i) => {
            const left = i % 2 === 0;
            return (
              <div key={r.name} style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", marginBottom: 22, position: "relative" }}>
                <div
                  style={{
                    position: "absolute", left: "50%", top: 6, width: 10, height: 10,
                    borderRadius: "50%", background: C.gold, transform: "translateX(-50%)",
                    border: "2px solid #fff", boxShadow: "0 0 0 1px " + C.border,
                  }}
                />
                <div style={{ width: "46%" }}>
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12 }}>
                    <Avatar size={56} seed={i} />
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: C.navy, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.3 }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.gold, fontWeight: 600, margin: "2px 0 6px" }}>({r.period})</div>
                    <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.5 }}>{r.note}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: C.navy, margin: "24px 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Historical Artifacts &amp; Documents
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {artifacts.map((a) => (
            <div key={a.label} style={{ flexShrink: 0, width: 120 }}>
              <div style={{ width: 120, height: 120, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <img
                  src={a.img}
                  alt={a.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ fontSize: 11, color: C.textDim, marginTop: 6, textAlign: "center", fontWeight: 600 }}>{a.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#E0A94D14", border: `1px dashed ${C.gold}88`, borderRadius: 10, padding: "14px 16px", marginTop: 20, fontSize: 12, color: C.textDim, lineHeight: 1.6 }}>
          Ruler entries are drawn from public reference sources and should be reviewed with Lapai's
          traditional institution and local historians. Artifact photos shown here are generic stock
          images standing in for the real items, which will be photographed and uploaded once the
          museum archive is populated.
        </div>
      </div>
    </div>
  );
}

// ---------- Bottom tab bar ----------

function BottomNav({ tab, setTab }) {
  const items = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "datacenter", label: "Data Center", icon: Database },
    { key: "register", label: "Register", icon: ClipboardList },
    { key: "museum", label: "Museum", icon: Landmark },
  ];
  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto",
        background: "#fff", borderTop: `1px solid ${C.border}`, display: "flex",
        padding: "8px 0 10px", boxShadow: "0 -4px 16px rgba(20,42,79,0.06)",
      }}
    >
      {items.map((it) => {
        const Icon = it.icon;
        const active = tab === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setTab(it.key)}
            style={{
              flex: 1, background: "none", border: "none", display: "flex",
              flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer",
              color: active ? C.navy : "#A6AEBB", padding: "4px 0",
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------- App ----------

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div
      style={{
        maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: C.bg,
        fontFamily: FONTS.body, color: C.text, position: "relative",
        boxShadow: "0 0 40px rgba(0,0,0,0.06)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        select { -webkit-appearance: none; appearance: none; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${C.gold}; outline-offset: 1px; }
      `}</style>

      {tab === "home" && <HomePage go={setTab} />}
      {tab === "datacenter" && <DataCenter />}
      {tab === "register" && <Register />}
      {tab === "museum" && <Museum goHome={() => setTab("home")} />}
      {tab === "archive" && <Museum goHome={() => setTab("home")} />}

      <BottomNav tab={tab === "archive" ? "museum" : tab} setTab={setTab} />
    </div>
  );
}
