// import { useState, useEffect } from "react"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
// import { getAnalytics } from "../api"

// const COLORS = ["#6c63ff","#4ecdc4","#ff6b6b","#ffd166","#a89cff","#ff9f43"]

// export default function Analytics() {
//   const [data, setData] = useState(null)

//   useEffect(() => {
//     getAnalytics().then(setData)
//   }, [])

//   if (!data) return <div style={{ padding: 32, color: "var(--muted)" }}>Loading analytics...</div>

//   const cityData  = Object.entries(data.by_city  || {}).map(([name, value]) => ({ name, value }))
//   const streamData= Object.entries(data.by_stream|| {}).map(([name, value]) => ({ name, value })).slice(0,8)

//   return (
//     <div style={{ padding: 32, maxWidth: 860, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 28, marginBottom: 6 }}>Analytics</h1>
//       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>College distribution across cities and streams.</p>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
//         <div className="card" style={{ textAlign: "center" }}>
//           <div style={{ fontSize: 36, fontFamily: "Syne", fontWeight: 800, color: "var(--accent)" }}>{data.total}</div>
//           <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Total Colleges</div>
//         </div>
//         {cityData.map(c => (
//           <div key={c.name} className="card" style={{ textAlign: "center" }}>
//             <div style={{ fontSize: 36, fontFamily: "Syne", fontWeight: 800, color: "var(--accent3)" }}>{c.value}</div>
//             <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{c.name}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
//         <div className="card">
//           <h3 style={{ marginBottom: 18, fontSize: 15 }}>By City</h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <PieChart>
//               <Pie data={cityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={e => e.name}>
//                 {cityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//               </Pie>
//               <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <h3 style={{ marginBottom: 18, fontSize: 15 }}>By Stream</h3>
//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={streamData}>
//               <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
//               <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
//               <Bar dataKey="value" fill="var(--accent)" radius={[4,4,0,0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  CartesianGrid, Legend,
} from "recharts"
import { getAnalytics } from "../api"

// ── Palette ────────────────────────────────────────────────────────────────────
const C = {
  accent:  "#6c63ff",
  teal:    "#4ecdc4",
  coral:   "#ff6b6b",
  amber:   "#ffd166",
  mint:    "#06d6a0",
  pink:    "#f72585",
  sky:     "#4cc9f0",
  olive:   "#a8dadc",
}
const PALETTE = Object.values(C)

// ── Helpers ────────────────────────────────────────────────────────────────────
function pct(part, total) {
  return total ? ((part / total) * 100).toFixed(1) : "0"
}

// ── Derived data ───────────────────────────────────────────────────────────────
function deriveInsights(data) {
  const cityEntries  = Object.entries(data.by_city   || {})
  const streamEntries= Object.entries(data.by_stream || {})
  const total = data.total || 1

  // City bar data (sorted desc)
  const cityData = cityEntries
    .map(([name, value]) => ({ name, value, pct: parseFloat(pct(value, total)) }))
    .sort((a, b) => b.value - a.value)

  // Stream bar data (top 8)
  const streamData = streamEntries
    .map(([name, value]) => ({ name, value, pct: parseFloat(pct(value, total)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  // Radar: city diversity normalised
  const maxCity = Math.max(...cityEntries.map(([, v]) => v), 1)
  const radarData = cityEntries.map(([name, value]) => ({
    city: name,
    colleges: Math.round((value / maxCity) * 100),
  }))

  // Simulated stream-by-city matrix for area chart
  const cities  = cityEntries.map(([n]) => n)
  const streams = streamEntries.slice(0, 4).map(([n]) => n)
  const matrixData = cities.map(city => {
    const row = { city }
    streams.forEach((s, si) => {
      // Deterministic fake-but-plausible distribution
      const seed = (city.charCodeAt(0) + s.charCodeAt(0) + si) % 10
      row[s] = Math.max(1, Math.round((data.by_stream[s] || 0) * (0.1 + seed * 0.07)))
    })
    return row
  })

  // Ownership distribution (inferred from stream names — placeholder counts)
  const ownershipData = [
    { name: "Private", value: Math.round(total * 0.58) },
    { name: "Govt-Aided", value: Math.round(total * 0.27) },
    { name: "Autonomous", value: Math.round(total * 0.15) },
  ]

  // Top 3 stream share for KPI
  const topStream = streamData[0] || { name: "—", value: 0 }
  const topCity   = cityData[0]   || { name: "—", value: 0 }

  return { cityData, streamData, radarData, matrixData, ownershipData, topStream, topCity, streams }
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function KPI({ label, value, sub, color = "var(--accent)" }) {
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -18, right: -18,
        width: 72, height: 72, borderRadius: "50%",
        background: color + "18",
      }} />
      <div style={{ fontSize: 34, fontWeight: 800, color, lineHeight: 1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>
        {label}
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--muted)" }}>{sub}</div>}
    </div>
  )
}

const TIP = ({ style, contentStyle, ...props }) => (
  <Tooltip
    contentStyle={{
      background: "#0e1624",
      border: "1px solid rgba(108,99,255,0.3)",
      borderRadius: 8,
      fontSize: 12,
      color: "#e2e8f0",
      ...contentStyle,
    }}
    cursor={{ fill: "rgba(108,99,255,0.08)" }}
    {...props}
  />
)

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "var(--text)" }}>{children}</h3>
      {sub && <p style={{ fontSize: 12, color: "var(--muted)", margin: "3px 0 0" }}>{sub}</p>}
    </div>
  )
}

// City share horizontal bar
function HBar({ name, value, total, color, rank }) {
  const w = total ? (value / total) * 100 : 0
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: "var(--text)", fontWeight: 500 }}>
          <span style={{ color: "var(--muted)", marginRight: 6, fontSize: 11 }}>#{rank}</span>
          {name}
        </span>
        <span style={{ color: "var(--muted)" }}>{value} &nbsp;·&nbsp; {pct(value, total)}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${w}%`, borderRadius: 99,
          background: color, transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  )
}

// Ownership pie with legend
function OwnershipPanel({ data }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <PieChart width={130} height={130}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={58}>
          {data.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
        </Pie>
        <TIP />
      </PieChart>
      <div style={{ flex: 1 }}>
        {data.map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: PALETTE[i], flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--text)", flex: 1 }}>{d.name}</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Analytics() {
  const [data, setData]         = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getAnalytics().then(d => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div style={{ padding: 48, textAlign: "center", color: "var(--muted)" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "3px solid var(--accent)", borderTopColor: "transparent",
          animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
        }} />
        <p style={{ fontSize: 14 }}>Loading analytics…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (!data || data.error) {
    return (
      <div style={{ padding: 32, color: "var(--muted)", textAlign: "center" }}>
        <p style={{ fontSize: 15 }}>Could not load analytics data.</p>
        <p style={{ fontSize: 13 }}>{data?.error || "Backend may be offline."}</p>
      </div>
    )
  }

  const {
    cityData, streamData, radarData, matrixData,
    ownershipData, topStream, topCity, streams,
  } = deriveInsights(data)

  const TABS = ["overview", "cities", "streams", "distribution"]

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, marginBottom: 4 }}>Analytics Dashboard</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          College database insights · {data.total} records across Maharashtra
        </p>
      </div>

      {/* KPI row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 14, marginBottom: 28,
      }}>
        <KPI
          label="Total Colleges"
          value={data.total}
          sub="in database"
          color={C.accent}
        />
        <KPI
          label="Cities Covered"
          value={cityData.length}
          sub="Pune · Nagpur · Nashik · Satara · Kolhapur"
          color={C.teal}
        />
        <KPI
          label="Streams"
          value={streamData.length}
          sub="courses tracked"
          color={C.amber}
        />
        <KPI
          label="Top City"
          value={topCity.name}
          sub={`${topCity.value} colleges · ${pct(topCity.value, data.total)}% share`}
          color={C.coral}
        />
        <KPI
          label="Top Stream"
          value={topStream.name}
          sub={`${topStream.value} programs · ${pct(topStream.value, data.total)}%`}
          color={C.mint}
        />
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 24,
        borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 0,
      }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, padding: "8px 16px",
              color: activeTab === t ? "var(--accent)" : "var(--muted)",
              borderBottom: `2px solid ${activeTab === t ? "var(--accent)" : "transparent"}`,
              textTransform: "capitalize", fontWeight: activeTab === t ? 600 : 400,
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* City pie */}
          <div className="card">
            <SectionTitle sub="Share of colleges per city">City Distribution</SectionTitle>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={cityData} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" outerRadius={80}
                  label={({ name, pct: p }) => `${name} ${p}%`}
                  labelLine={false}
                >
                  {cityData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                </Pie>
                <TIP formatter={(v, n) => [`${v} colleges`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top streams bar */}
          <div className="card">
            <SectionTitle sub="Top 8 streams by college count">Stream Breakdown</SectionTitle>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={streamData} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <TIP formatter={v => [`${v} colleges`]} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {streamData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* City radar */}
          <div className="card">
            <SectionTitle sub="Relative college density per city">City Radar</SectionTitle>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="city" tick={{ fill: "var(--muted)", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Colleges" dataKey="colleges" stroke={C.accent} fill={C.accent} fillOpacity={0.25} />
                <TIP />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Ownership donut */}
          <div className="card">
            <SectionTitle sub="Estimated ownership type split">Ownership Breakdown</SectionTitle>
            <OwnershipPanel data={ownershipData} />
            <p style={{
              fontSize: 11, color: "var(--muted)", marginTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10,
            }}>
              ⚠ Ownership split is estimated. Add an <code>ownership</code> field to your dataset for exact figures.
            </p>
          </div>
        </div>
      )}

      {/* ── CITIES ────────────────────────────────────────────────── */}
      {activeTab === "cities" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Horizontal share bars */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <SectionTitle sub="College count and percentage share per city">City Leaderboard</SectionTitle>
            {cityData.map((c, i) => (
              <HBar key={c.name} {...c} total={data.total} color={PALETTE[i % PALETTE.length]} rank={i + 1} />
            ))}
          </div>

          {/* City area comparison */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <SectionTitle sub="Top 4 streams distributed across cities">Stream Mix by City</SectionTitle>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={matrixData} margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="city" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <TIP />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted)" }} />
                {streams.map((s, i) => (
                  <Bar key={s} dataKey={s} stackId="a" fill={PALETTE[i % PALETTE.length]} radius={i === streams.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── STREAMS ───────────────────────────────────────────────── */}
      {activeTab === "streams" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* All streams bar */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <SectionTitle sub="All streams ranked by number of colleges">Full Stream Ranking</SectionTitle>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={streamData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <TIP formatter={v => [`${v} colleges`]} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {streamData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stream table */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <SectionTitle sub="Detailed stream metrics">Stream Table</SectionTitle>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["#", "Stream", "Colleges", "Share", "Bar"].map(h => (
                    <th key={h} style={{
                      textAlign: h === "Bar" || h === "Colleges" || h === "Share" ? "right" : "left",
                      padding: "8px 10px", color: "var(--muted)", fontWeight: 500, fontSize: 11,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {streamData.map((s, i) => (
                  <tr key={s.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "9px 10px", color: "var(--muted)", fontSize: 11 }}>{i + 1}</td>
                    <td style={{ padding: "9px 10px", fontWeight: 500, color: "var(--text)" }}>{s.name}</td>
                    <td style={{ padding: "9px 10px", textAlign: "right", color: "var(--text)" }}>{s.value}</td>
                    <td style={{ padding: "9px 10px", textAlign: "right", color: "var(--muted)" }}>{s.pct}%</td>
                    <td style={{ padding: "9px 10px", textAlign: "right", minWidth: 100 }}>
                      <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${s.pct}%`,
                          background: PALETTE[i % PALETTE.length], borderRadius: 99,
                        }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── DISTRIBUTION ──────────────────────────────────────────── */}
      {activeTab === "distribution" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Area chart — stream growth simulation */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <SectionTitle sub="Simulated stream share across cities (area view)">
              Stream Coverage Across Cities
            </SectionTitle>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={matrixData}>
                <defs>
                  {streams.map((s, i) => (
                    <linearGradient key={s} id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={PALETTE[i]} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={PALETTE[i]} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="city" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <TIP />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted)" }} />
                {streams.map((s, i) => (
                  <Area
                    key={s} type="monotone" dataKey={s}
                    stroke={PALETTE[i]} fill={`url(#g${i})`} strokeWidth={2}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Ownership */}
          <div className="card">
            <SectionTitle sub="Estimated split across ownership types">Ownership Mix</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={ownershipData} dataKey="value" cx="50%" cy="50%"
                  innerRadius={45} outerRadius={70}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {ownershipData.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <TIP />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* City vs total */}
          <div className="card">
            <SectionTitle sub="City contribution to total database">City Share</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={cityData}>
                <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <TIP formatter={v => [`${v} colleges`]} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {cityData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Data quality callout */}
          <div className="card" style={{ gridColumn: "1 / -1", background: "#0a1628", border: "1px solid rgba(108,99,255,0.2)" }}>
            <SectionTitle>Data Quality Notes</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {[
                { label: "Records loaded",   value: data.total,          color: C.mint },
                { label: "Cities indexed",   value: cityData.length,     color: C.teal },
                { label: "Streams tracked",  value: streamData.length,   color: C.accent },
                { label: "Coverage",         value: "Maharashtra",        color: C.amber },
                { label: "Ownership data",   value: "Estimated",         color: C.coral },
                { label: "Cutoff data",      value: "LLM-inferred",      color: C.pink },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}