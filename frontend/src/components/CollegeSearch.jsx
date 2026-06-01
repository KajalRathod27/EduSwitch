// // import { useState } from "react"
// // import { searchColleges } from "../api"

// // const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
// // const STREAMS = ["", "Engineering","Management","Design","Architecture","Law","Pharmacy","Medical"]

// // export default function CollegeSearch() {
// //   const [query, setQuery]     = useState("")
// //   const [city, setCity]       = useState("")
// //   const [stream, setStream]   = useState("")
// //   const [colleges, setColleges] = useState([])
// //   const [loading, setLoading] = useState(false)

// //   async function search() {
// //     setLoading(true)
// //     const data = await searchColleges(query, city, stream)
// //     setColleges(data.colleges || [])
// //     setLoading(false)
// //   }

// //   return (
// //     <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
// //       <h1 style={{ fontSize: 28, marginBottom: 6 }}>College Search</h1>
// //       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>Search across Pune, Nagpur, Nashik & Satara colleges.</p>

// //       <div className="card" style={{ marginBottom: 24 }}>
// //         <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
// //           <div style={{ flex: 2, minWidth: 200 }}>
// //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Search</label>
// //             <input className="input" placeholder="College name, course..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} />
// //           </div>
// //           <div style={{ flex: 1, minWidth: 130 }}>
// //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>City</label>
// //             <select className="select" value={city} onChange={e => setCity(e.target.value)}>
// //               {CITIES.map(c => <option key={c} value={c}>{c || "All"}</option>)}
// //             </select>
// //           </div>
// //           <div style={{ flex: 1, minWidth: 150 }}>
// //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Stream</label>
// //             <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
// //               {STREAMS.map(s => <option key={s} value={s}>{s || "All"}</option>)}
// //             </select>
// //           </div>
// //           <button className="btn btn-primary" onClick={search} disabled={loading}>
// //             {loading ? <span className="spinner" /> : "Search"}
// //           </button>
// //         </div>
// //       </div>

// //       {colleges.length > 0 && (
// //         <div className="fade-in">
// //           <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 14 }}>{colleges.length} results found</p>
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             {colleges.map((c, i) => (
// //               <div key={i} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
// //                 <div style={{ flex: 1 }}>
// //                   <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{c.college_name}</p>
// //                   <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
// //                     <span className="badge badge-purple">{c.city}</span>
// //                     <span className="badge badge-teal">{c.course?.split(" ").slice(0,4).join(" ")}</span>
// //                     {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
// //                     {c.duration && <span className="badge" style={{ background: "#1a2535", color: "#7a8299" }}>{c.duration}</span>}
// //                   </div>
// //                   {c.facilities && <p style={{ fontSize: 12, color: "var(--muted)" }}>🏢 {c.facilities}</p>}
// //                 </div>
// //                 {c.link && <a href={c.link} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: 12, whiteSpace: "nowrap" }}>View →</a>}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// import { useState } from "react"
// import { searchColleges } from "../api"

// const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
// const STREAMS = ["", "Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

// function CollegeCard({ c, index }) {
//   const [expanded, setExpanded] = useState(false)

//   return (
//     <div
//       className="card"
//       style={{
//         display: "flex",
//         gap: 16,
//         alignItems: "flex-start",
//         cursor: "pointer",
//         transition: "box-shadow 0.15s",
//       }}
//       onClick={() => setExpanded(v => !v)}
//     >
//       <div
//         style={{
//           minWidth: 36,
//           height: 36,
//           borderRadius: "50%",
//           background: "var(--accent-muted, #1a2535)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "var(--accent)",
//           fontWeight: 700,
//           fontSize: 14,
//           flexShrink: 0,
//         }}
//       >
//         {index + 1}
//       </div>

//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, lineHeight: 1.3 }}>
//           {c.college_name || "—"}
//         </p>

//         <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
//           {c.city && <span className="badge badge-purple">{c.city}</span>}
//           {c.course && (
//             <span className="badge badge-teal">
//               {c.course.split(" ").slice(0, 4).join(" ")}
//             </span>
//           )}
//           {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
//           {c.duration && (
//             <span className="badge" style={{ background: "#1a2535", color: "#7a8299" }}>
//               {c.duration}
//             </span>
//           )}
//           {c.stream && (
//             <span className="badge" style={{ background: "#0f2233", color: "#5ba4cf" }}>
//               {c.stream}
//             </span>
//           )}
//         </div>

//         {c.facilities && (
//           <p style={{ fontSize: 12, color: "var(--muted)" }}>
//             🏢 {c.facilities}
//           </p>
//         )}

//         {expanded && (
//           <div
//             style={{
//               marginTop: 12,
//               paddingTop: 12,
//               borderTop: "1px solid rgba(255,255,255,0.07)",
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
//               gap: 8,
//               fontSize: 12,
//               color: "var(--muted)",
//             }}
//           >
//             {c.affiliation && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>Affiliation</span>
//                 <br />{c.affiliation}
//               </div>
//             )}
//             {c.naac_grade && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>NAAC Grade</span>
//                 <br />{c.naac_grade}
//               </div>
//             )}
//             {c.established && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>Est.</span>
//                 <br />{c.established}
//               </div>
//             )}
//             {c.intake && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>Intake</span>
//                 <br />{c.intake}
//               </div>
//             )}
//             {c.fees && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>Fees</span>
//                 <br />{c.fees}
//               </div>
//             )}
//             {c.phone && (
//               <div>
//                 <span style={{ color: "var(--text)", fontWeight: 500 }}>Phone</span>
//                 <br />{c.phone}
//               </div>
//             )}
//           </div>
//         )}

//         <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center" }}>
//           {c.link && (
//             <a
//               href={c.link}
//               target="_blank"
//               rel="noreferrer"
//               style={{ color: "var(--accent)", fontSize: 12, whiteSpace: "nowrap" }}
//               onClick={e => e.stopPropagation()}
//             >
//               Website →
//             </a>
//           )}
//           <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>
//             {expanded ? "▲ collapse" : "▼ details"}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function CollegeSearch() {
//   const [query, setQuery] = useState("")
//   const [city, setCity] = useState("")
//   const [stream, setStream] = useState("")
//   const [colleges, setColleges] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searched, setSearched] = useState(false)

//   async function search() {
//     setLoading(true)
//     setSearched(true)
//     try {
//       const data = await searchColleges(query, city, stream)
//       setColleges(data.colleges || [])
//     } catch (e) {
//       alert("API error: " + e.message)
//       setColleges([])
//     }
//     setLoading(false)
//   }

//   const groupedByCity = {}
//   for (const c of colleges) {
//     const key = c.city || "Other"
//     if (!groupedByCity[key]) groupedByCity[key] = []
//     groupedByCity[key].push(c)
//   }

//   const showGrouped = !city && colleges.length > 0

//   return (
//     <div style={{ padding: 32, maxWidth: 980, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 28, marginBottom: 4 }}>College Search</h1>
//       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>
//         Search colleges across Pune · Nagpur · Nashik · Satara · Kolhapur
//       </p>

//       <div className="card" style={{ marginBottom: 24 }}>
//         <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
//           <div style={{ flex: 2, minWidth: 200 }}>
//             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
//               Search
//             </label>
//             <input
//               className="input"
//               placeholder="College name, course, keyword..."
//               value={query}
//               onChange={e => setQuery(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && search()}
//             />
//           </div>

//           <div style={{ flex: 1, minWidth: 130 }}>
//             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
//               City
//             </label>
//             <select className="select" value={city} onChange={e => setCity(e.target.value)}>
//               {CITIES.map(c => (
//                 <option key={c} value={c}>{c || "All Cities"}</option>
//               ))}
//             </select>
//           </div>

//           <div style={{ flex: 1, minWidth: 150 }}>
//             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
//               Stream
//             </label>
//             <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
//               {STREAMS.map(s => (
//                 <option key={s} value={s}>{s || "All Streams"}</option>
//               ))}
//             </select>
//           </div>

//           <button className="btn btn-primary" onClick={search} disabled={loading}>
//             {loading ? <span className="spinner" /> : "Search"}
//           </button>
//         </div>
//       </div>

//       {loading && (
//         <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 14 }}>
//           <span className="spinner" style={{ marginRight: 10 }} />
//           Searching colleges...
//         </div>
//       )}

//       {!loading && searched && colleges.length === 0 && (
//         <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
//           <p style={{ fontSize: 16, marginBottom: 6 }}>No colleges found</p>
//           <p style={{ fontSize: 13 }}>
//             Try broadening your search — remove city or stream filter.
//           </p>
//         </div>
//       )}

//       {!loading && colleges.length > 0 && (
//         <div className="fade-in">
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 16,
//             }}
//           >
//             <p style={{ color: "var(--muted)", fontSize: 13 }}>
//               {colleges.length} college{colleges.length !== 1 ? "s" : ""} found
//               {city ? ` in ${city}` : ""}
//               {stream ? ` · ${stream}` : ""}
//             </p>
//           </div>

//           {showGrouped ? (
//             Object.entries(groupedByCity).map(([cityName, list]) => (
//               <div key={cityName} style={{ marginBottom: 32 }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     marginBottom: 14,
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       letterSpacing: "0.08em",
//                       color: "var(--accent)",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {cityName}
//                   </span>
//                   <span
//                     style={{
//                       fontSize: 11,
//                       background: "#1a2535",
//                       color: "#7a8299",
//                       borderRadius: 20,
//                       padding: "2px 8px",
//                     }}
//                   >
//                     {list.length}
//                   </span>
//                   <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   {list.map((c, i) => (
//                     <CollegeCard key={i} c={c} index={i} />
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {colleges.map((c, i) => (
//                 <CollegeCard key={i} c={c} index={i} />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

import { useState } from "react"
import { searchColleges } from "../api"

const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
const STREAMS = ["", "Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

function CollegeCard({ c, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="card"
      style={{ display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer" }}
      onClick={() => setExpanded(v => !v)}
    >
      <div style={{
        minWidth: 34, height: 34, borderRadius: "50%",
        background: "var(--surface2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent)", fontWeight: 700, fontSize: 13, flexShrink: 0,
      }}>
        {index + 1}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.4 }}>
          {c.college_name || "—"}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {c.city && <span className="badge badge-purple">{c.city}</span>}
          {c.course && <span className="badge badge-teal">{c.course.split(" ").slice(0, 4).join(" ")}</span>}
          {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
          {c.duration && <span className="badge" style={{ background: "#1a2535", color: "#7a8299" }}>{c.duration}</span>}
          {c.stream && <span className="badge" style={{ background: "#0f2233", color: "#5ba4cf" }}>{c.stream}</span>}
        </div>

        {c.facilities && <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>🏢 {c.facilities}</p>}

        {expanded && (
          <div style={{
            marginTop: 12, paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
            gap: 8, fontSize: 12, color: "var(--muted)",
          }}>
            {c.affiliation && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Affiliation</span><br />{c.affiliation}</div>}
            {c.naac_grade && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>NAAC Grade</span><br />{c.naac_grade}</div>}
            {c.established && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Est.</span><br />{c.established}</div>}
            {c.intake && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Intake</span><br />{c.intake}</div>}
            {c.fees && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Fees</span><br />{c.fees}</div>}
            {c.phone && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Phone</span><br />{c.phone}</div>}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center" }}>
          {c.link && (
            <a href={c.link} target="_blank" rel="noreferrer"
              style={{ color: "var(--accent)", fontSize: 12 }}
              onClick={e => e.stopPropagation()}>
              Website →
            </a>
          )}
          <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>
            {expanded ? "▲ collapse" : "▼ details"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CollegeSearch() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [stream, setStream] = useState("")
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function search() {
    setLoading(true)
    setSearched(true)
    try {
      const data = await searchColleges(query, city, stream)
      setColleges(data.colleges || [])
    } catch (e) {
      alert("API error: " + e.message)
      setColleges([])
    }
    setLoading(false)
  }

  const groupedByCity = {}
  for (const c of colleges) {
    const key = c.city || "Other"
    if (!groupedByCity[key]) groupedByCity[key] = []
    groupedByCity[key].push(c)
  }
  const showGrouped = !city && colleges.length > 0

  return (
    <div style={{ padding: "24px 16px", maxWidth: 980, margin: "0 auto", width: "100%" }}>
      <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4, fontFamily: "Syne, sans-serif" }}>
        College Search
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 14 }}>
        Search colleges across Pune · Nagpur · Nashik · Satara · Kolhapur
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        {/* Search input full width */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Search</label>
          <input
            className="input"
            placeholder="College name, course, keyword..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
          />
        </div>

        {/* Filters + button row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 130px", minWidth: 0 }}>
            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>City</label>
            <select className="select" value={city} onChange={e => setCity(e.target.value)}>
              {CITIES.map(c => <option key={c} value={c}>{c || "All Cities"}</option>)}
            </select>
          </div>
          <div style={{ flex: "1 1 150px", minWidth: 0 }}>
            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Stream</label>
            <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
              {STREAMS.map(s => <option key={s} value={s}>{s || "All Streams"}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={search} disabled={loading}
            style={{ whiteSpace: "nowrap", alignSelf: "flex-end" }}>
            {loading ? <span className="spinner" /> : "Search"}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 14 }}>
          <span className="spinner" style={{ marginRight: 10 }} />
          Searching colleges...
        </div>
      )}

      {!loading && searched && colleges.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
          <p style={{ fontSize: 16, marginBottom: 6 }}>No colleges found</p>
          <p style={{ fontSize: 13 }}>Try broadening your search — remove city or stream filter.</p>
        </div>
      )}

      {!loading && colleges.length > 0 && (
        <div className="fade-in">
          <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>
            {colleges.length} college{colleges.length !== 1 ? "s" : ""} found
            {city ? ` in ${city}` : ""}
            {stream ? ` · ${stream}` : ""}
          </p>

          {showGrouped ? (
            Object.entries(groupedByCity).map(([cityName, list]) => (
              <div key={cityName} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" }}>
                    {cityName}
                  </span>
                  <span style={{ fontSize: 11, background: "#1a2535", color: "#7a8299", borderRadius: 20, padding: "2px 8px" }}>
                    {list.length}
                  </span>
                  <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {list.map((c, i) => <CollegeCard key={i} c={c} index={i} />)}
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {colleges.map((c, i) => <CollegeCard key={i} c={c} index={i} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}