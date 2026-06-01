// // import { useState } from "react"
// // import ReactMarkdown from "react-markdown"
// // import { askAdvisor } from "../api"

// // const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
// // const STREAMS = ["Engineering","Management","Design","Architecture","Law","Pharmacy","Medical"]

// // export default function ChatAdvisor() {
// //   const [query, setQuery] = useState("")
// //   const [city, setCity] = useState("")
// //   const [stream, setStream] = useState("Engineering")
// //   const [loading, setLoading] = useState(false)
// //   const [result, setResult] = useState(null)

// //   async function submit() {
// //     if (!query.trim()) return
// //     setLoading(true); setResult(null)
// //     try {
// //       const data = await askAdvisor(query, city, stream)
// //       setResult(data)
// //     } catch(e) { alert("API error: " + e.message) }
// //     setLoading(false)
// //   }

// //   return (
// //     <div style={{ padding: 32, maxWidth: 860, margin: "0 auto" }}>
// //       <h1 style={{ fontSize: 28, marginBottom: 6 }}>AI Career Advisor</h1>
// //       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>
// //         Ask anything about switching careers, streams, or finding the right college.
// //       </p>

// //       <div className="card" style={{ marginBottom: 20 }}>
// //         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
// //           <textarea
// //             className="textarea"
// //             placeholder="e.g. I'm from Science stream, want to switch to MBA. What should I do?"
// //             value={query} onChange={e => setQuery(e.target.value)}
// //           />
// //           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
// //             <div style={{ flex: 1, minWidth: 140 }}>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>City</label>
// //               <select className="select" value={city} onChange={e => setCity(e.target.value)}>
// //                 {CITIES.map(c => <option key={c} value={c}>{c || "All cities"}</option>)}
// //               </select>
// //             </div>
// //             <div style={{ flex: 1, minWidth: 160 }}>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Target Stream</label>
// //               <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
// //                 {STREAMS.map(s => <option key={s}>{s}</option>)}
// //               </select>
// //             </div>
// //             <div style={{ display: "flex", alignItems: "flex-end" }}>
// //               <button className="btn btn-primary" onClick={submit} disabled={loading}>
// //                 {loading ? <span className="spinner" /> : "Get Advice"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {result && (
// //         <div className="fade-in">
// //           <div className="card" style={{ marginBottom: 20, lineHeight: 1.7 }}>
// //             <ReactMarkdown>{result.answer}</ReactMarkdown>
// //           </div>

// //           {result.colleges?.length > 0 && (
// //             <div>
// //               <h3 style={{ marginBottom: 14, fontSize: 16 }}>Matching Colleges ({result.colleges.length})</h3>
// //               <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
// //                 {result.colleges.map((c, i) => (
// //                   <div key={i} className="card" style={{ padding: 16 }}>
// //                     <p style={{ fontWeight: 500, marginBottom: 6, fontSize: 14 }}>{c.college_name}</p>
// //                     <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
// //                       <span className="badge badge-purple">{c.city}</span>
// //                       <span className="badge badge-teal">{c.course?.split(" ").slice(0,3).join(" ")}</span>
// //                       {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
// //                     </div>
// //                     {c.facilities && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>{c.facilities}</p>}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// import { useState } from "react"
// import ReactMarkdown from "react-markdown"
// import { askAdvisor } from "../api"

// const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
// const STREAMS = ["Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

// const EXAMPLE_PROMPTS = [
//   "I'm from Science stream, want to switch to MBA. What should I do?",
//   "Can a Commerce student do Engineering after a gap year?",
//   "Which Pune colleges are best for B.Arch after PCM?",
//   "I scored 65% in HSC Science. Is Law a good option?",
// ]

// export default function ChatAdvisor() {
//   const [query, setQuery] = useState("")
//   const [city, setCity] = useState("")
//   const [stream, setStream] = useState("Engineering")
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)

//   async function submit() {
//     if (!query.trim()) return
//     setLoading(true)
//     setResult(null)
//     try {
//       const data = await askAdvisor(query, city, stream)
//       setResult(data)
//     } catch (e) {
//       alert("API error: " + e.message)
//     }
//     setLoading(false)
//   }

//   return (
//     <div style={{ padding: 32, maxWidth: 880, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 28, marginBottom: 4 }}>AI Career Advisor</h1>
//       <p style={{ color: "var(--muted)", marginBottom: 20, fontSize: 14 }}>
//         Ask anything about switching careers, streams, or finding the right college across Maharashtra.
//       </p>

//       {!result && (
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
//           {EXAMPLE_PROMPTS.map((p, i) => (
//             <button
//               key={i}
//               style={{
//                 background: "#0e1a2b",
//                 border: "1px solid #1e2e42",
//                 color: "var(--muted)",
//                 borderRadius: 8,
//                 padding: "6px 12px",
//                 fontSize: 12,
//                 cursor: "pointer",
//               }}
//               onClick={() => setQuery(p)}
//             >
//               {p}
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="card" style={{ marginBottom: 20 }}>
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           <textarea
//             className="textarea"
//             placeholder="e.g. I'm from Science stream, want to switch to MBA. What should I do?"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//             style={{ minHeight: 90 }}
//           />
//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//             <div style={{ flex: 1, minWidth: 140 }}>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
//                 Preferred City
//               </label>
//               <select className="select" value={city} onChange={e => setCity(e.target.value)}>
//                 {CITIES.map(c => (
//                   <option key={c} value={c}>{c || "Any city"}</option>
//                 ))}
//               </select>
//             </div>
//             <div style={{ flex: 1, minWidth: 160 }}>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
//                 Target Stream
//               </label>
//               <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
//                 {STREAMS.map(s => (
//                   <option key={s}>{s}</option>
//                 ))}
//               </select>
//             </div>
//             <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
//               {result && (
//                 <button
//                   className="btn"
//                   onClick={() => { setResult(null); setQuery("") }}
//                   style={{ fontSize: 13 }}
//                 >
//                   New Question
//                 </button>
//               )}
//               <button className="btn btn-primary" onClick={submit} disabled={loading}>
//                 {loading ? <span className="spinner" /> : "Get Advice"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading && (
//         <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 14 }}>
//           <span className="spinner" style={{ marginRight: 10 }} />
//           Generating personalised advice...
//         </div>
//       )}

//       {result && (
//         <div className="fade-in">
//           <div className="card" style={{ marginBottom: 24, lineHeight: 1.8 }}>
//             <ReactMarkdown>{result.answer}</ReactMarkdown>
//           </div>

//           {result.colleges?.length > 0 && (
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   marginBottom: 16,
//                 }}
//               >
//                 <h3 style={{ fontSize: 16, margin: 0 }}>Matching Colleges</h3>
//                 <span
//                   style={{
//                     fontSize: 11,
//                     background: "#1a2535",
//                     color: "#7a8299",
//                     borderRadius: 20,
//                     padding: "2px 8px",
//                   }}
//                 >
//                   {result.colleges.length} found
//                 </span>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gap: 12,
//                   gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
//                 }}
//               >
//                 {result.colleges.map((c, i) => (
//                   <div key={i} className="card" style={{ padding: 16 }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: 10,
//                         alignItems: "flex-start",
//                         marginBottom: 10,
//                       }}
//                     >
//                       <div
//                         style={{
//                           minWidth: 30,
//                           height: 30,
//                           borderRadius: "50%",
//                           background: "#0f2233",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: 12,
//                           fontWeight: 700,
//                           color: "var(--accent)",
//                           flexShrink: 0,
//                         }}
//                       >
//                         {i + 1}
//                       </div>
//                       <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3, margin: 0 }}>
//                         {c.college_name || "—"}
//                       </p>
//                     </div>

//                     <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
//                       {c.city && <span className="badge badge-purple">{c.city}</span>}
//                       {c.course && (
//                         <span className="badge badge-teal">
//                           {c.course.split(" ").slice(0, 3).join(" ")}
//                         </span>
//                       )}
//                       {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
//                       {c.duration && (
//                         <span
//                           className="badge"
//                           style={{ background: "#1a2535", color: "#7a8299" }}
//                         >
//                           {c.duration}
//                         </span>
//                       )}
//                     </div>

//                     {c.facilities && (
//                       <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
//                         🏢 {c.facilities}
//                       </p>
//                     )}

//                     <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11, color: "var(--muted)" }}>
//                       {c.affiliation && <span>📎 {c.affiliation}</span>}
//                       {c.naac_grade && <span>★ NAAC {c.naac_grade}</span>}
//                       {c.fees && <span>💰 {c.fees}</span>}
//                     </div>

//                     {c.link && (
//                       <a
//                         href={c.link}
//                         target="_blank"
//                         rel="noreferrer"
//                         style={{
//                           display: "block",
//                           marginTop: 10,
//                           color: "var(--accent)",
//                           fontSize: 12,
//                         }}
//                       >
//                         Visit Website →
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { askAdvisor } from "../api"

const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
const STREAMS = ["Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

const EXAMPLE_PROMPTS = [
  "I'm from Science stream, want to switch to MBA. What should I do?",
  "Can a Commerce student do Engineering after a gap year?",
  "Which Pune colleges are best for B.Arch after PCM?",
  "I scored 65% in HSC Science. Is Law a good option?",
]

export default function ChatAdvisor() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [stream, setStream] = useState("Engineering")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function submit() {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const data = await askAdvisor(query, city, stream)
      setResult(data)
    } catch (e) {
      alert("API error: " + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: "24px 16px", maxWidth: 880, margin: "0 auto", width: "100%" }}>
      <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4, fontFamily: "Syne, sans-serif" }}>
        AI Career Advisor
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 20, fontSize: 14 }}>
        Ask anything about switching careers, streams, or finding the right college across Maharashtra.
      </p>

      {!result && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {EXAMPLE_PROMPTS.map((p, i) => (
            <button
              key={i}
              style={{
                background: "#0e1a2b", border: "1px solid #1e2e42",
                color: "var(--muted)", borderRadius: 8,
                padding: "6px 12px", fontSize: 12, cursor: "pointer",
                textAlign: "left", lineHeight: 1.4,
              }}
              onClick={() => setQuery(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <textarea
            className="textarea"
            placeholder="e.g. I'm from Science stream, want to switch to MBA. What should I do?"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ minHeight: 90 }}
          />

          {/* Filters row — stacks on mobile */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 140px", minWidth: 0 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
                Preferred City
              </label>
              <select className="select" value={city} onChange={e => setCity(e.target.value)}>
                {CITIES.map(c => <option key={c} value={c}>{c || "Any city"}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 160px", minWidth: 0 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
                Target Stream
              </label>
              <select className="select" value={stream} onChange={e => setStream(e.target.value)}>
                {STREAMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flex: "1 1 auto" }}>
              {result && (
                <button className="btn" onClick={() => { setResult(null); setQuery("") }} style={{ fontSize: 13 }}>
                  New Question
                </button>
              )}
              <button className="btn btn-primary" onClick={submit} disabled={loading} style={{ whiteSpace: "nowrap" }}>
                {loading ? <span className="spinner" /> : "Get Advice"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 14 }}>
          <span className="spinner" style={{ marginRight: 10 }} />
          Generating personalised advice...
        </div>
      )}

      {result && (
        <div className="fade-in">
          <div className="card" style={{ marginBottom: 24, lineHeight: 1.8, overflowX: "auto" }}>
            <ReactMarkdown>{result.answer}</ReactMarkdown>
          </div>

          {result.colleges?.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <h3 style={{ fontSize: 16, margin: 0 }}>Matching Colleges</h3>
                <span style={{ fontSize: 11, background: "#1a2535", color: "#7a8299", borderRadius: 20, padding: "2px 8px" }}>
                  {result.colleges.length} found
                </span>
              </div>

              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))" }}>
                {result.colleges.map((c, i) => (
                  <div key={i} className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{
                        minWidth: 30, height: 30, borderRadius: "50%", background: "#0f2233",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, color: "var(--accent)", flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3, margin: 0 }}>
                        {c.college_name || "—"}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                      {c.city && <span className="badge badge-purple">{c.city}</span>}
                      {c.course && <span className="badge badge-teal">{c.course.split(" ").slice(0, 3).join(" ")}</span>}
                      {c.ownership && <span className="badge badge-amber">{c.ownership}</span>}
                      {c.duration && <span className="badge" style={{ background: "#1a2535", color: "#7a8299" }}>{c.duration}</span>}
                    </div>

                    {c.facilities && <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>🏢 {c.facilities}</p>}

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11, color: "var(--muted)" }}>
                      {c.affiliation && <span>📎 {c.affiliation}</span>}
                      {c.naac_grade && <span>★ NAAC {c.naac_grade}</span>}
                      {c.fees && <span>💰 {c.fees}</span>}
                    </div>

                    {c.link && (
                      <a href={c.link} target="_blank" rel="noreferrer"
                        style={{ display: "block", marginTop: 10, color: "var(--accent)", fontSize: 12 }}>
                        Visit Website →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}