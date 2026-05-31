// // // import { useState, useEffect } from "react"

// // // const EXAMS_DATA = {
// // //   Engineering:  { exams: ["JEE Main","MHT CET","BITSAT","VITEEE"], icon: "⚙️", tip: "JEE Main is the most widely accepted. MHT CET for Maharashtra." },
// // //   Management:   { exams: ["CAT","XAT","CMAT","MAT","SNAP"],        icon: "📊", tip: "CAT is the gold standard for IIMs. CMAT is state-level for Maharashtra." },
// // //   Design:       { exams: ["UCEED","NID DAT","CEED"],                icon: "🎨", tip: "NID DAT opens doors to premier design institutes across India." },
// // //   Architecture: { exams: ["NATA","JEE B.Arch"],                    icon: "🏛️", tip: "NATA is mandatory for most architecture admissions." },
// // //   Law:          { exams: ["CLAT","AILET","LSAT India"],             icon: "⚖️", tip: "CLAT is the unified test for 22 National Law Universities." },
// // //   Pharmacy:     { exams: ["MHT CET","GPAT","NIPER JEE"],           icon: "💊", tip: "GPAT is required for M.Pharm admissions." },
// // //   Medical:      { exams: ["NEET","AIIMS"],                          icon: "🏥", tip: "NEET is the single national exam for all medical admissions." },
// // // }

// // // const STREAMS = Object.keys(EXAMS_DATA)

// // // export default function EntranceExams() {
// // //   const [stream, setStream] = useState("Engineering")
// // //   const data = EXAMS_DATA[stream]

// // //   return (
// // //     <div style={{ padding: 32, maxWidth: 680, margin: "0 auto" }}>
// // //       <h1 style={{ fontSize: 28, marginBottom: 6 }}>Entrance Exam Guide</h1>
// // //       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>Find the right exams for your target stream.</p>

// // //       <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
// // //         {STREAMS.map(s => (
// // //           <button key={s} onClick={() => setStream(s)} style={{
// // //             padding: "8px 16px", borderRadius: 20, border: "1px solid",
// // //             borderColor: stream === s ? "var(--accent)" : "var(--border)",
// // //             background: stream === s ? "rgba(108,99,255,0.15)" : "transparent",
// // //             color: stream === s ? "var(--accent)" : "var(--muted)",
// // //             cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif",
// // //             transition: "all 0.15s"
// // //           }}>{s}</button>
// // //         ))}
// // //       </div>

// // //       {data && (
// // //         <div className="fade-in">
// // //           <div className="card" style={{ marginBottom: 16 }}>
// // //             <div style={{ fontSize: 32, marginBottom: 12 }}>{data.icon}</div>
// // //             <h2 style={{ fontSize: 18, marginBottom: 16 }}>{stream} Exams</h2>
// // //             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// // //               {data.exams.map((e, i) => (
// // //                 <div key={e} style={{
// // //                   display: "flex", alignItems: "center", gap: 14,
// // //                   padding: "12px 16px", background: "var(--surface2)",
// // //                   borderRadius: 10, border: "1px solid var(--border)"
// // //                 }}>
// // //                   <span style={{ color: "var(--muted)", fontSize: 13, minWidth: 20 }}>#{i+1}</span>
// // //                   <span style={{ fontWeight: 500 }}>{e}</span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //           <div className="card" style={{ background: "rgba(108,99,255,0.08)", borderColor: "rgba(108,99,255,0.2)" }}>
// // //             <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>💡 {data.tip}</p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // import { useState } from "react"
// // import { getExamDetails } from "../api"

// // const EXAMS_DATA = {
// //   Engineering:  ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
// //   Management:   ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
// //   Design:       ["UCEED", "NID DAT", "CEED"],
// //   Architecture: ["NATA", "JEE B.Arch"],
// //   Law:          ["CLAT", "AILET", "LSAT India"],
// //   Pharmacy:     ["MHT CET", "GPAT", "NIPER JEE"],
// //   Medical:      ["NEET", "AIIMS"],
// // }

// // const STREAMS = Object.keys(EXAMS_DATA)

// // export default function EntranceExams() {
// //   const [stream,   setStream]   = useState("Engineering")
// //   const [selected, setSelected] = useState(null)
// //   const [details,  setDetails]  = useState(null)
// //   const [loading,  setLoading]  = useState(false)

// //   async function loadExamDetails(exam) {
// //     setSelected(exam)
// //     setDetails(null)
// //     setLoading(true)
// //     const data = await getExamDetails(stream, exam)
// //     setDetails(data)
// //     setLoading(false)
// //   }

// //   return (
// //     <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
// //       <h1 style={{ fontSize: 28, marginBottom: 6 }}>Entrance Exam Guide</h1>
// //       <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 14 }}>
// //         Click any exam to get AI-powered syllabus, resources and online courses.
// //       </p>

// //       {/* Stream selector */}
// //       <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
// //         {STREAMS.map(s => (
// //           <button key={s} onClick={() => { setStream(s); setSelected(null); setDetails(null) }}
// //             style={{
// //               padding: "8px 16px", borderRadius: 20, border: "1px solid",
// //               borderColor: stream === s ? "var(--accent)" : "var(--border)",
// //               background: stream === s ? "rgba(108,99,255,0.15)" : "transparent",
// //               color: stream === s ? "var(--accent)" : "var(--muted)",
// //               cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif",
// //               transition: "all 0.15s"
// //             }}>{s}</button>
// //         ))}
// //       </div>

// //       <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>

// //         {/* Exam list */}
// //         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //           {(EXAMS_DATA[stream] || []).map(exam => (
// //             <button key={exam} onClick={() => loadExamDetails(exam)} style={{
// //               padding: "12px 16px", borderRadius: 10, border: "1px solid",
// //               borderColor: selected === exam ? "var(--accent)" : "var(--border)",
// //               background: selected === exam ? "rgba(108,99,255,0.15)" : "var(--surface)",
// //               color: selected === exam ? "var(--accent)" : "var(--text)",
// //               cursor: "pointer", fontSize: 14, fontFamily: "DM Sans, sans-serif",
// //               textAlign: "left", transition: "all 0.15s", fontWeight: selected === exam ? 600 : 400
// //             }}>{exam}</button>
// //           ))}
// //         </div>

// //         {/* Exam details panel */}
// //         <div>
// //           {!selected && (
// //             <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>
// //               <p style={{ fontSize: 32, marginBottom: 12 }}>👆</p>
// //               <p>Select an exam to see syllabus, resources and online courses</p>
// //             </div>
// //           )}

// //           {loading && (
// //             <div className="card" style={{ textAlign: "center", padding: 40 }}>
// //               <div className="spinner" style={{ margin: "0 auto 12px" }} />
// //               <p style={{ color: "var(--muted)", fontSize: 14 }}>
// //                 Fetching {selected} details from AI...
// //               </p>
// //             </div>
// //           )}

// //           {details && !loading && (
// //             <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

// //               {/* Header */}
// //               <div className="card">
// //                 <h2 style={{ fontSize: 20, marginBottom: 4 }}>{details.exam_name}</h2>
// //                 {details.full_form && <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 8 }}>{details.full_form}</p>}
// //                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //                   {details.conducting_body && <span className="badge badge-purple">{details.conducting_body}</span>}
// //                   {details.important_dates && <span className="badge badge-amber">{details.important_dates}</span>}
// //                 </div>
// //                 {details.eligibility && (
// //                   <p style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
// //                     <strong style={{ color: "var(--text)" }}>Eligibility: </strong>{details.eligibility}
// //                   </p>
// //                 )}
// //                 {details.exam_pattern && (
// //                   <p style={{ marginTop: 6, fontSize: 13, color: "var(--muted)" }}>
// //                     <strong style={{ color: "var(--text)" }}>Pattern: </strong>{details.exam_pattern}
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Subjects + Syllabus */}
// //               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //                 <div className="card">
// //                   <h3 style={{ fontSize: 15, marginBottom: 12 }}>📚 Subjects</h3>
// //                   {(details.subjects || []).map((s, i) => (
// //                     <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
// //                       {s}
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="card">
// //                   <h3 style={{ fontSize: 15, marginBottom: 12 }}>📝 Syllabus Topics</h3>
// //                   {(details.syllabus || []).map((t, i) => (
// //                     <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
// //                       • {t}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Prep tips */}
// //               {(details.preparation_tips || []).length > 0 && (
// //                 <div className="card" style={{ background: "rgba(108,99,255,0.08)", borderColor: "rgba(108,99,255,0.2)" }}>
// //                   <h3 style={{ fontSize: 15, marginBottom: 12 }}>💡 Preparation Tips</h3>
// //                   {details.preparation_tips.map((t, i) => (
// //                     <p key={i} style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>✓ {t}</p>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* Websites */}
// //               {(details.useful_websites || []).length > 0 && (
// //                 <div className="card">
// //                   <h3 style={{ fontSize: 15, marginBottom: 12 }}>🌐 Useful Websites</h3>
// //                   <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //                     {details.useful_websites.map((w, i) => (
// //                       <a key={i} href={w.url} target="_blank" rel="noreferrer" style={{
// //                         display: "flex", justifyContent: "space-between", alignItems: "center",
// //                         padding: "10px 14px", background: "var(--surface2)",
// //                         borderRadius: 8, border: "1px solid var(--border)",
// //                         color: "var(--accent)", textDecoration: "none", fontSize: 13
// //                       }}>
// //                         <span style={{ color: "var(--text)" }}>{w.name}</span>
// //                         <span>→ {w.url}</span>
// //                       </a>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Online Courses */}
// //               {(details.online_courses || []).length > 0 && (
// //                 <div className="card">
// //                   <h3 style={{ fontSize: 15, marginBottom: 12 }}>🎓 Online Courses & Resources</h3>
// //                   <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //                     {details.online_courses.map((c, i) => (
// //                       <a key={i} href={c.url} target="_blank" rel="noreferrer" style={{
// //                         display: "flex", justifyContent: "space-between", alignItems: "center",
// //                         padding: "12px 14px", background: "var(--surface2)",
// //                         borderRadius: 8, border: "1px solid var(--border)",
// //                         textDecoration: "none", transition: "border-color 0.15s"
// //                       }}>
// //                         <div>
// //                           <span className="badge badge-teal" style={{ marginBottom: 4, display: "inline-block" }}>
// //                             {c.platform}
// //                           </span>
// //                           <p style={{ fontSize: 13, color: "var(--text)", marginTop: 4 }}>{c.course}</p>
// //                         </div>
// //                         <span style={{ color: "var(--accent)", fontSize: 12 }}>Open →</span>
// //                       </a>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {details.error && (
// //                 <div style={{ background: "#3a1a1a", border: "1px solid #ff6b6b", borderRadius: 12, padding: 16, color: "#ff6b6b", fontSize: 13 }}>
// //                   Error loading details: {details.error}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// import { useState, useEffect } from "react"

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000"

// const STREAMS = ["Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

// const SUBJECT_COLORS = {
//   purple: { bg: "rgba(108,99,255,0.12)", text: "#534AB7", dot: "#7F77DD" },
//   teal:   { bg: "rgba(29,158,117,0.12)", text: "#0F6E56", dot: "#1D9E75" },
//   amber:  { bg: "rgba(186,117,23,0.12)", text: "#854F0B", dot: "#BA7517" },
//   coral:  { bg: "rgba(216,90,48,0.12)",  text: "#993C1D", dot: "#D85A30" },
//   blue:   { bg: "rgba(55,138,221,0.12)", text: "#185FA5", dot: "#378ADD" },
//   pink:   { bg: "rgba(212,83,126,0.12)", text: "#993556", dot: "#D4537E" },
// }

// const FALLBACK_COLORS = ["purple", "teal", "amber", "coral", "blue", "pink"]

// export default function EntranceExams() {
//   const [stream,      setStream]      = useState("Engineering")
//   const [examList,    setExamList]    = useState([])
//   const [selected,    setSelected]    = useState(null)
//   const [details,     setDetails]     = useState(null)
//   const [loading,     setLoading]     = useState(false)
//   const [activeTab,   setActiveTab]   = useState("syllabus")
//   const [examsLoading, setExamsLoading] = useState(false)

//   // fetch exam list for the chosen stream from backend
//   useEffect(() => {
//     setSelected(null)
//     setDetails(null)
//     setExamList([])
//     setExamsLoading(true)
//     fetch(`${API_BASE}/exams/${stream}`)
//       .then(r => r.json())
//       .then(data => { setExamList(data.exams || []); setExamsLoading(false) })
//       .catch(() => setExamsLoading(false))
//   }, [stream])

//   async function loadExam(exam) {
//     setSelected(exam)
//     setDetails(null)
//     setLoading(true)
//     setActiveTab("syllabus")
//     try {
//       const res  = await fetch(`${API_BASE}/exam-details/${stream}/${encodeURIComponent(exam)}`)
//       const data = await res.json()
//       // assign fallback colors to subjects if not provided
//       if (data.subjects) {
//         data.subjects = data.subjects.map((s, i) => ({
//           ...s,
//           color: s.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length]
//         }))
//       }
//       setDetails(data)
//     } catch (e) {
//       setDetails({ exam_name: exam, error: String(e), subjects: [], youtube_resources: [], top_coachings: [], useful_websites: [], preparation_tips: [] })
//     }
//     setLoading(false)
//   }

//   const tabs = [
//     { id: "syllabus",  label: "Subject Syllabus" },
//     { id: "youtube",   label: "YouTube Resources" },
//     { id: "coaching",  label: "Best Coachings" },
//     { id: "websites",  label: "Websites & Courses" },
//     { id: "tips",      label: "Prep Tips" },
//   ]

//   return (
//     <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 26, marginBottom: 6 }}>Entrance Exam Guide</h1>
//       <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 13 }}>
//         Select a stream and exam — all syllabus, resources, and coaching info is fetched live from AI.
//       </p>

//       {/* Stream tabs */}
//       <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
//         {STREAMS.map(s => (
//           <button key={s} onClick={() => setStream(s)} style={{
//             padding: "7px 16px", borderRadius: 20, border: "1px solid",
//             borderColor: stream === s ? "var(--accent)" : "var(--border)",
//             background: stream === s ? "rgba(108,99,255,0.15)" : "transparent",
//             color: stream === s ? "var(--accent)" : "var(--muted)",
//             cursor: "pointer", fontSize: 13, fontFamily: "inherit", transition: "all 0.15s"
//           }}>{s}</button>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }}>

//         {/* Exam list — from backend */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//           {examsLoading && <p style={{ fontSize: 12, color: "var(--muted)", padding: "8px 4px" }}>Loading exams…</p>}
//           {!examsLoading && examList.length === 0 && (
//             <p style={{ fontSize: 12, color: "var(--muted)", padding: "8px 4px" }}>No exams found for {stream}</p>
//           )}
//           {examList.map(exam => (
//             <button key={exam} onClick={() => loadExam(exam)} style={{
//               padding: "11px 14px", borderRadius: 10, border: "1px solid",
//               borderColor: selected === exam ? "var(--accent)" : "var(--border)",
//               background: selected === exam ? "rgba(108,99,255,0.15)" : "var(--surface)",
//               color: selected === exam ? "var(--accent)" : "var(--text)",
//               cursor: "pointer", fontSize: 13, fontFamily: "inherit",
//               textAlign: "left", transition: "all 0.15s",
//               fontWeight: selected === exam ? 600 : 400
//             }}>{exam}</button>
//           ))}
//         </div>

//         {/* Details panel */}
//         <div>
//           {!selected && (
//             <div className="card" style={{ textAlign: "center", padding: 48, color: "var(--muted)" }}>
//               <p style={{ fontSize: 28, marginBottom: 10 }}>👆</p>
//               <p>Select an exam to see AI-generated syllabus, YouTube resources, and coaching info</p>
//             </div>
//           )}

//           {loading && (
//             <div className="card" style={{ textAlign: "center", padding: 48 }}>
//               <div className="spinner" style={{ margin: "0 auto 14px" }} />
//               <p style={{ color: "var(--muted)", fontSize: 13 }}>Fetching {selected} details from AI…</p>
//               <p style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}>This includes syllabus, YouTube channels, and coaching institutes</p>
//             </div>
//           )}

//           {details && !loading && (
//             <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//               {/* Header card */}
//               <div className="card">
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
//                   <div>
//                     <h2 style={{ fontSize: 20, marginBottom: 3 }}>{details.exam_name}</h2>
//                     {details.full_form && <p style={{ color: "var(--muted)", fontSize: 12 }}>{details.full_form}</p>}
//                   </div>
//                   <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                     {details.conducting_body && <span className="badge badge-purple">{details.conducting_body}</span>}
//                     {details.important_dates && <span className="badge badge-amber">{details.important_dates}</span>}
//                   </div>
//                 </div>
//                 {details.eligibility && (
//                   <p style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
//                     <strong style={{ color: "var(--text)" }}>Eligibility: </strong>{details.eligibility}
//                   </p>
//                 )}
//                 {details.exam_pattern && (
//                   <p style={{ marginTop: 5, fontSize: 12, color: "var(--muted)" }}>
//                     <strong style={{ color: "var(--text)" }}>Pattern: </strong>{details.exam_pattern}
//                   </p>
//                 )}
//               </div>

//               {/* Tab bar */}
//               <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                 {tabs.map(t => (
//                   <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
//                     padding: "6px 14px", borderRadius: 20, border: "1px solid",
//                     borderColor: activeTab === t.id ? "var(--accent)" : "var(--border)",
//                     background: activeTab === t.id ? "rgba(108,99,255,0.15)" : "transparent",
//                     color: activeTab === t.id ? "var(--accent)" : "var(--muted)",
//                     cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all 0.15s"
//                   }}>{t.label}</button>
//                 ))}
//               </div>

//               {/* ── TAB: Subject Syllabus ── */}
//               {activeTab === "syllabus" && (
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
//                   {(details.subjects || []).map((subj, si) => {
//                     const clr = SUBJECT_COLORS[subj.color] || SUBJECT_COLORS.purple
//                     return (
//                       <div key={si} className="card">
//                         <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12,
//                           color: clr.text, background: clr.bg,
//                           padding: "5px 10px", borderRadius: 8, display: "inline-block" }}>
//                           {subj.name}
//                         </h3>
//                         {(subj.topics || []).map((topic, ti) => (
//                           <div key={ti} style={{ marginBottom: 10 }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
//                               <span style={{ width: 7, height: 7, borderRadius: "50%",
//                                 background: clr.dot, flexShrink: 0, display: "inline-block" }} />
//                               <span style={{ fontSize: 13, fontWeight: 500 }}>{topic.chapter}</span>
//                             </div>
//                             <div style={{ paddingLeft: 14, display: "flex", flexWrap: "wrap", gap: 4 }}>
//                               {(topic.concepts || []).map((c, ci) => (
//                                 <span key={ci} style={{
//                                   fontSize: 11, padding: "2px 7px", borderRadius: 10,
//                                   background: "var(--surface2)", border: "1px solid var(--border)",
//                                   color: "var(--muted)"
//                                 }}>{c}</span>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )
//                   })}
//                   {(!details.subjects || details.subjects.length === 0) && (
//                     <p style={{ color: "var(--muted)", fontSize: 13 }}>No syllabus data returned.</p>
//                   )}
//                 </div>
//               )}

//               {/* ── TAB: YouTube Resources ── */}
//               {activeTab === "youtube" && (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                   {(details.youtube_resources || []).map((res, ri) => (
//                     <div key={ri} className="card">
//                       <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--accent)" }}>
//                         {res.subject}
//                       </h3>
//                       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                         {(res.channels || []).map((ch, ci) => (
//                           <a key={ci} href={ch.url} target="_blank" rel="noreferrer" style={{
//                             display: "flex", justifyContent: "space-between", alignItems: "center",
//                             padding: "10px 14px", background: "var(--surface2)",
//                             borderRadius: 8, border: "1px solid var(--border)",
//                             textDecoration: "none", transition: "border-color 0.15s"
//                           }}>
//                             <div>
//                               <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>
//                                 {ch.channel}
//                               </p>
//                               <p style={{ fontSize: 11, color: "var(--muted)" }}>
//                                 {ch.playlist} {ch.subscribers ? `· ${ch.subscribers} subscribers` : ""}
//                               </p>
//                             </div>
//                             <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Watch →</span>
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                   {(!details.youtube_resources || details.youtube_resources.length === 0) && (
//                     <p style={{ color: "var(--muted)", fontSize: 13 }}>No YouTube resources returned.</p>
//                   )}
//                 </div>
//               )}

//               {/* ── TAB: Best Coachings ── */}
//               {activeTab === "coaching" && (
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
//                   {(details.top_coachings || []).map((inst, ii) => (
//                     <div key={ii} className="card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                         <h3 style={{ fontSize: 14, fontWeight: 600 }}>{inst.name}</h3>
//                         {inst.rating && (
//                           <span className="badge badge-amber">★ {inst.rating}</span>
//                         )}
//                       </div>

//                       {inst.cities && inst.cities.length > 0 && (
//                         <p style={{ fontSize: 12, color: "var(--muted)" }}>
//                           📍 {inst.cities.join(", ")}
//                         </p>
//                       )}

//                       <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                         {inst.fees_1yr && <span className="badge badge-purple">1-yr: ₹{inst.fees_1yr}</span>}
//                         {inst.fees_2yr && <span className="badge badge-teal">2-yr: ₹{inst.fees_2yr}</span>}
//                         {inst.crash_course_fees && <span className="badge badge-coral">Crash: ₹{inst.crash_course_fees}</span>}
//                       </div>

//                       {inst.tenure_options && inst.tenure_options.length > 0 && (
//                         <p style={{ fontSize: 12, color: "var(--muted)" }}>
//                           <strong style={{ color: "var(--text)" }}>Programs: </strong>
//                           {inst.tenure_options.join(" · ")}
//                         </p>
//                       )}

//                       {(inst.highlights || []).length > 0 && (
//                         <ul style={{ margin: 0, paddingLeft: 16 }}>
//                           {inst.highlights.map((h, hi) => (
//                             <li key={hi} style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>{h}</li>
//                           ))}
//                         </ul>
//                       )}

//                       <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
//                         {inst.website && (
//                           <a href={inst.website} target="_blank" rel="noreferrer" style={{
//                             fontSize: 12, color: "var(--accent)", textDecoration: "none",
//                             padding: "4px 10px", border: "1px solid var(--accent)",
//                             borderRadius: 6
//                           }}>Website →</a>
//                         )}
//                         {inst.online_available && inst.online_url && (
//                           <a href={inst.online_url} target="_blank" rel="noreferrer" style={{
//                             fontSize: 12, color: "var(--muted)", textDecoration: "none",
//                             padding: "4px 10px", border: "1px solid var(--border)",
//                             borderRadius: 6
//                           }}>Online: {inst.online_platform || "Portal"} →</a>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   {(!details.top_coachings || details.top_coachings.length === 0) && (
//                     <p style={{ color: "var(--muted)", fontSize: 13 }}>No coaching data returned.</p>
//                   )}
//                 </div>
//               )}

//               {/* ── TAB: Websites & Online Courses ── */}
//               {activeTab === "websites" && (
//                 <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                   {(details.useful_websites || []).length > 0 && (
//                     <div className="card">
//                       <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Useful Websites</h3>
//                       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                         {details.useful_websites.map((w, wi) => (
//                           <a key={wi} href={w.url} target="_blank" rel="noreferrer" style={{
//                             display: "flex", justifyContent: "space-between", alignItems: "center",
//                             padding: "10px 14px", background: "var(--surface2)",
//                             borderRadius: 8, border: "1px solid var(--border)",
//                             textDecoration: "none"
//                           }}>
//                             <div>
//                               <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>{w.name}</p>
//                               {w.description && <p style={{ fontSize: 11, color: "var(--muted)" }}>{w.description}</p>}
//                             </div>
//                             <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Open →</span>
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {(details.online_courses || []).length > 0 && (
//                     <div className="card">
//                       <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Online Courses</h3>
//                       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                         {details.online_courses.map((c, ci) => (
//                           <a key={ci} href={c.url} target="_blank" rel="noreferrer" style={{
//                             display: "flex", justifyContent: "space-between", alignItems: "center",
//                             padding: "12px 14px", background: "var(--surface2)",
//                             borderRadius: 8, border: "1px solid var(--border)",
//                             textDecoration: "none"
//                           }}>
//                             <div>
//                               <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
//                                 <span className="badge badge-teal">{c.platform}</span>
//                                 {c.free && <span className="badge badge-purple">Free</span>}
//                                 {c.duration && <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.duration}</span>}
//                               </div>
//                               <p style={{ fontSize: 13, color: "var(--text)" }}>{c.course}</p>
//                             </div>
//                             <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Open →</span>
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {(!details.useful_websites?.length && !details.online_courses?.length) && (
//                     <p style={{ color: "var(--muted)", fontSize: 13 }}>No website data returned.</p>
//                   )}
//                 </div>
//               )}

//               {/* ── TAB: Prep Tips ── */}
//               {activeTab === "tips" && (
//                 <div className="card" style={{ background: "rgba(108,99,255,0.06)", borderColor: "rgba(108,99,255,0.2)" }}>
//                   <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Preparation Tips</h3>
//                   {(details.preparation_tips || []).map((tip, ti) => (
//                     <div key={ti} style={{
//                       display: "flex", gap: 10, padding: "10px 0",
//                       borderBottom: ti < details.preparation_tips.length - 1 ? "1px solid var(--border)" : "none"
//                     }}>
//                       <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, flexShrink: 0 }}>
//                         {String(ti + 1).padStart(2, "0")}
//                       </span>
//                       <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{tip}</p>
//                     </div>
//                   ))}
//                   {(!details.preparation_tips || details.preparation_tips.length === 0) && (
//                     <p style={{ color: "var(--muted)", fontSize: 13 }}>No tips returned.</p>
//                   )}
//                 </div>
//               )}

//               {details.error && (
//                 <div style={{ background: "#3a1a1a", border: "1px solid #ff6b6b", borderRadius: 12, padding: 16, color: "#ff6b6b", fontSize: 13 }}>
//                   AI error: {details.error}
//                 </div>
//               )}

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000"

const STREAMS = ["Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]

const SUBJECT_COLORS = {
  purple: { bg: "rgba(108,99,255,0.12)", text: "#534AB7", dot: "#7F77DD" },
  teal: { bg: "rgba(29,158,117,0.12)", text: "#0F6E56", dot: "#1D9E75" },
  amber: { bg: "rgba(186,117,23,0.12)", text: "#854F0B", dot: "#BA7517" },
  coral: { bg: "rgba(216,90,48,0.12)", text: "#993C1D", dot: "#D85A30" },
  blue: { bg: "rgba(55,138,221,0.12)", text: "#185FA5", dot: "#378ADD" },
  pink: { bg: "rgba(212,83,126,0.12)", text: "#993556", dot: "#D4537E" },
}

const FALLBACK_COLORS = ["purple", "teal", "amber", "coral", "blue", "pink"]

export default function EntranceExams() {
  const [stream, setStream] = useState("Engineering")
  const [examList, setExamList] = useState([])
  const [selected, setSelected] = useState(null)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("syllabus")
  const [examsLoading, setExamsLoading] = useState(false)
  const [userCity, setUserCity] = useState("")
  const [nearby, setNearby] = useState([])
  const [nearbyLoad, setNearbyLoad] = useState(false)
  const [nearbySearched, setNearbySearched] = useState(false)

  useEffect(() => {
    setSelected(null)
    setDetails(null)
    setExamList([])
    setNearby([])
    setNearbySearched(false)
    setExamsLoading(true)
    fetch(`${API_BASE}/exams/${stream}`)
      .then(r => r.json())
      .then(data => { setExamList(data.exams || []); setExamsLoading(false) })
      .catch(() => setExamsLoading(false))
  }, [stream])

  async function loadExam(exam) {
    setSelected(exam)
    setDetails(null)
    setLoading(true)
    setActiveTab("syllabus")
    setNearby([])
    setNearbySearched(false)
    try {
      const res = await fetch(`${API_BASE}/exam-details/${stream}/${encodeURIComponent(exam)}`)
      const data = await res.json()
      if (data.subjects) {
        data.subjects = data.subjects.map((s, i) => ({
          ...s,
          color: s.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length]
        }))
      }
      setDetails(data)
    } catch (e) {
      setDetails({
        exam_name: exam, error: String(e),
        subjects: [], youtube_resources: [],
        top_coachings: [], useful_websites: [], preparation_tips: []
      })
    }
    setLoading(false)
  }

  async function loadNearby() {
    if (!selected) return
    setNearbyLoad(true)
    setNearby([])
    setNearbySearched(true)
    try {
      const params = new URLSearchParams({ exam: selected, city: userCity })
      const res = await fetch(`${API_BASE}/nearby-coachings?${params}`)
      const data = await res.json()
      setNearby(data.institutes || [])
    } catch (e) {
      console.error("Nearby error:", e)
      setNearby([])
    }
    setNearbyLoad(false)
  }

  const tabs = [
    { id: "syllabus", label: "Subject Syllabus" },
    { id: "youtube", label: "YouTube Resources" },
    { id: "coaching", label: "Best Coachings" },
    { id: "nearby", label: "Nearby Classes" },
    { id: "websites", label: "Websites & Courses" },
    { id: "tips", label: "Prep Tips" },
  ]

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Entrance Exam Guide</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 13 }}>
        Select a stream and exam — all syllabus, resources, and coaching info is fetched live from AI.
      </p>

      {/* Stream tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {STREAMS.map(s => (
          <button key={s} onClick={() => setStream(s)} style={{
            padding: "7px 16px", borderRadius: 20, border: "1px solid",
            borderColor: stream === s ? "var(--accent)" : "var(--border)",
            background: stream === s ? "rgba(108,99,255,0.15)" : "transparent",
            color: stream === s ? "var(--accent)" : "var(--muted)",
            cursor: "pointer", fontSize: 13, fontFamily: "inherit", transition: "all 0.15s"
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }}>

        {/* Exam list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {examsLoading && (
            <p style={{ fontSize: 12, color: "var(--muted)", padding: "8px 4px" }}>Loading exams…</p>
          )}
          {!examsLoading && examList.length === 0 && (
            <p style={{ fontSize: 12, color: "var(--muted)", padding: "8px 4px" }}>No exams found for {stream}</p>
          )}
          {examList.map(exam => (
            <button key={exam} onClick={() => loadExam(exam)} style={{
              padding: "11px 14px", borderRadius: 10, border: "1px solid",
              borderColor: selected === exam ? "var(--accent)" : "var(--border)",
              background: selected === exam ? "rgba(108,99,255,0.15)" : "var(--surface)",
              color: selected === exam ? "var(--accent)" : "var(--text)",
              cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              textAlign: "left", transition: "all 0.15s",
              fontWeight: selected === exam ? 600 : 400
            }}>{exam}</button>
          ))}
        </div>

        {/* Details panel */}
        <div>

          {/* Empty state */}
          {!selected && (
            <div className="card" style={{ textAlign: "center", padding: 48, color: "var(--muted)" }}>
              <p style={{ fontSize: 28, marginBottom: 10 }}>👆</p>
              <p>Select an exam to see AI-generated syllabus, YouTube resources, and coaching info</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="card" style={{ textAlign: "center", padding: 48 }}>
              <div className="spinner" style={{ margin: "0 auto 14px" }} />
              <p style={{ color: "var(--muted)", fontSize: 13 }}>Fetching {selected} details from AI…</p>
              <p style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}>
                Fetching syllabus, YouTube channels, and coaching institutes (two AI calls)…
              </p>
            </div>
          )}

          {/* Details loaded */}
          {details && !loading && (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Header card */}
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h2 style={{ fontSize: 20, marginBottom: 3 }}>{details.exam_name}</h2>
                    {details.full_form && (
                      <p style={{ color: "var(--muted)", fontSize: 12 }}>{details.full_form}</p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {details.conducting_body && (
                      <span className="badge badge-purple">{details.conducting_body}</span>
                    )}
                    {details.important_dates && (
                      <span className="badge badge-amber">{details.important_dates}</span>
                    )}
                  </div>
                </div>
                {details.eligibility && (
                  <p style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--text)" }}>Eligibility: </strong>{details.eligibility}
                  </p>
                )}
                {details.exam_pattern && (
                  <p style={{ marginTop: 5, fontSize: 12, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--text)" }}>Pattern: </strong>{details.exam_pattern}
                  </p>
                )}
              </div>

              {/* Tab bar */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                    padding: "6px 14px", borderRadius: 20, border: "1px solid",
                    borderColor: activeTab === t.id ? "var(--accent)" : "var(--border)",
                    background: activeTab === t.id ? "rgba(108,99,255,0.15)" : "transparent",
                    color: activeTab === t.id ? "var(--accent)" : "var(--muted)",
                    cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all 0.15s"
                  }}>{t.label}</button>
                ))}
              </div>

              {/* ── TAB: Subject Syllabus ── */}
              {activeTab === "syllabus" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
                  {(details.subjects || []).map((subj, si) => {
                    const clr = SUBJECT_COLORS[subj.color] || SUBJECT_COLORS.purple
                    return (
                      <div key={si} className="card">
                        <h3 style={{
                          fontSize: 14, fontWeight: 600, marginBottom: 12,
                          color: clr.text, background: clr.bg,
                          padding: "5px 10px", borderRadius: 8, display: "inline-block"
                        }}>
                          {subj.name}
                        </h3>
                        {(subj.topics || []).map((topic, ti) => (
                          <div key={ti} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                              <span style={{
                                width: 7, height: 7, borderRadius: "50%",
                                background: clr.dot, flexShrink: 0, display: "inline-block"
                              }} />
                              <span style={{ fontSize: 13, fontWeight: 500 }}>{topic.chapter}</span>
                            </div>
                            <div style={{ paddingLeft: 14, display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {(topic.concepts || []).map((c, ci) => (
                                <span key={ci} style={{
                                  fontSize: 11, padding: "2px 7px", borderRadius: 10,
                                  background: "var(--surface2)", border: "1px solid var(--border)",
                                  color: "var(--muted)"
                                }}>{c}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {(!details.subjects || details.subjects.length === 0) && (
                    <p style={{ color: "var(--muted)", fontSize: 13 }}>No syllabus data returned.</p>
                  )}
                </div>
              )}

              {/* ── TAB: YouTube Resources ── */}
              {activeTab === "youtube" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(details.youtube_resources || []).map((res, ri) => (
                    <div key={ri} className="card">
                      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--accent)" }}>
                        {res.subject}
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {(res.channels || []).map((ch, ci) => (
                          <a key={ci} href={ch.url} target="_blank" rel="noreferrer" style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "10px 14px", background: "var(--surface2)",
                            borderRadius: 8, border: "1px solid var(--border)",
                            textDecoration: "none", transition: "border-color 0.15s"
                          }}>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>
                                {ch.channel}
                              </p>
                              <p style={{ fontSize: 11, color: "var(--muted)" }}>
                                {ch.playlist}{ch.subscribers ? ` · ${ch.subscribers} subscribers` : ""}
                              </p>
                            </div>
                            <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Watch →</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  {(!details.youtube_resources || details.youtube_resources.length === 0) && (
                    <p style={{ color: "var(--muted)", fontSize: 13 }}>No YouTube resources returned.</p>
                  )}
                </div>
              )}

              {/* ── TAB: Best Coachings ── */}
              {activeTab === "coaching" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                  {(details.top_coachings || []).map((inst, ii) => (
                    <div key={ii} className="card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600 }}>{inst.name}</h3>
                        {inst.rating && <span className="badge badge-amber">★ {inst.rating}</span>}
                      </div>
                      {inst.cities && inst.cities.length > 0 && (
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>
                          📍 {inst.cities.join(", ")}
                        </p>
                      )}
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {inst.fees_1yr && <span className="badge badge-purple">1-yr: ₹{inst.fees_1yr}</span>}
                        {inst.fees_2yr && <span className="badge badge-teal">2-yr: ₹{inst.fees_2yr}</span>}
                        {inst.crash_course_fees && <span className="badge badge-coral">Crash: ₹{inst.crash_course_fees}</span>}
                      </div>
                      {inst.tenure_options && inst.tenure_options.length > 0 && (
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>
                          <strong style={{ color: "var(--text)" }}>Programs: </strong>
                          {inst.tenure_options.join(" · ")}
                        </p>
                      )}
                      {(inst.highlights || []).length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                          {inst.highlights.map((h, hi) => (
                            <li key={hi} style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>{h}</li>
                          ))}
                        </ul>
                      )}
                      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                        {inst.website && (
                          <a href={inst.website} target="_blank" rel="noreferrer" style={{
                            fontSize: 12, color: "var(--accent)", textDecoration: "none",
                            padding: "4px 10px", border: "1px solid var(--accent)", borderRadius: 6
                          }}>Website →</a>
                        )}
                        {inst.online_available && inst.online_url && (
                          <a href={inst.online_url} target="_blank" rel="noreferrer" style={{
                            fontSize: 12, color: "var(--muted)", textDecoration: "none",
                            padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6
                          }}>Online: {inst.online_platform || "Portal"} →</a>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!details.top_coachings || details.top_coachings.length === 0) && (
                    <p style={{ color: "var(--muted)", fontSize: 13 }}>No coaching data returned.</p>
                  )}
                </div>
              )}

              {/* ── TAB: Nearby Classes ── */}
              {activeTab === "nearby" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* Search bar */}
                  <div className="card" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      placeholder="Enter your city (e.g. Mumbai, Pune, Delhi…)"
                      value={userCity}
                      onChange={e => setUserCity(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && loadNearby()}
                      style={{
                        flex: 1, minWidth: 200, padding: "9px 14px",
                        borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--surface)", color: "var(--text)",
                        fontSize: 13, fontFamily: "inherit", outline: "none"
                      }}
                    />
                    <button
                      onClick={loadNearby}
                      disabled={nearbyLoad}
                      style={{
                        padding: "9px 20px", borderRadius: 8,
                        background: nearbyLoad ? "transparent" : "rgba(108,99,255,0.15)",
                        border: "1px solid var(--accent)",
                        color: "var(--accent)", cursor: nearbyLoad ? "not-allowed" : "pointer",
                        fontSize: 13, fontFamily: "inherit", fontWeight: 600, whiteSpace: "nowrap",
                        opacity: nearbyLoad ? 0.6 : 1
                      }}
                    >
                      {nearbyLoad ? "Searching…" : "Find Classes"}
                    </button>
                  </div>

                  {/* Loading */}
                  {nearbyLoad && (
                    <div className="card" style={{ textAlign: "center", padding: 32 }}>
                      <div className="spinner" style={{ margin: "0 auto 12px" }} />
                      <p style={{ color: "var(--muted)", fontSize: 13 }}>
                        Finding coaching centers for {selected} in {userCity || "your area"}…
                      </p>
                    </div>
                  )}

                  {/* Prompt to search */}
                  {!nearbyLoad && !nearbySearched && (
                    <div className="card" style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}>
                      <p style={{ fontSize: 22, marginBottom: 8 }}>📍</p>
                      <p style={{ fontSize: 13 }}>Enter your city above and click Find Classes to see nearby coaching centers</p>
                    </div>
                  )}

                  {/* No results */}
                  {!nearbyLoad && nearbySearched && nearby.length === 0 && (
                    <div className="card" style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}>
                      <p style={{ fontSize: 13 }}>No coaching centers found for {selected} in {userCity || "your area"}. Try a different city.</p>
                    </div>
                  )}

                  {/* Results */}
                  {!nearbyLoad && nearby.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {nearby.map((inst, ii) => (
                        <div key={ii} className="card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                            <div>
                              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{inst.name}</h3>
                              {inst.address && (
                                <p style={{ fontSize: 12, color: "var(--muted)" }}>📍 {inst.address}</p>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                              {inst.rating && <span className="badge badge-amber">★ {inst.rating}</span>}
                              {inst.distance_km && (
                                <span className="badge badge-teal">{inst.distance_km} km away</span>
                              )}
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {inst.fees_per_year && (
                              <span className="badge badge-purple">₹{inst.fees_per_year} / yr</span>
                            )}
                            {inst.online_available && (
                              <span className="badge badge-teal">Online available</span>
                            )}
                          </div>

                          {inst.tenure_options && inst.tenure_options.length > 0 && (
                            <p style={{ fontSize: 12, color: "var(--muted)" }}>
                              <strong style={{ color: "var(--text)" }}>Programs: </strong>
                              {inst.tenure_options.join(" · ")}
                            </p>
                          )}

                          {(inst.highlights || []).length > 0 && (
                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                              {inst.highlights.map((h, hi) => (
                                <li key={hi} style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>{h}</li>
                              ))}
                            </ul>
                          )}

                          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                            {inst.website && (
                              <a href={inst.website} target="_blank" rel="noreferrer" style={{
                                fontSize: 12, color: "var(--accent)", textDecoration: "none",
                                padding: "4px 10px", border: "1px solid var(--accent)", borderRadius: 6
                              }}>Website →</a>
                            )}
                            {inst.maps_query && (
                              <a
                                href={`https://www.google.com/maps/search/${encodeURIComponent(inst.maps_query)}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  fontSize: 12,
                                  color: "var(--muted)",
                                  textDecoration: "none",
                                  padding: "4px 10px",
                                  border: "1px solid var(--border)",
                                  borderRadius: 6
                                }}
                              >
                                Open in Maps →
                              </a>
                            )}
                            {inst.phone && (
                              <a href={`tel:${inst.phone}`} style={{
                                fontSize: 12, color: "var(--muted)", textDecoration: "none",
                                padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6
                              }}>{inst.phone}</a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB: Websites & Online Courses ── */}
              {activeTab === "websites" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(details.useful_websites || []).length > 0 && (
                    <div className="card">
                      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Useful Websites</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {details.useful_websites.map((w, wi) => (
                          <a key={wi} href={w.url} target="_blank" rel="noreferrer" style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "10px 14px", background: "var(--surface2)",
                            borderRadius: 8, border: "1px solid var(--border)", textDecoration: "none"
                          }}>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>{w.name}</p>
                              {w.description && <p style={{ fontSize: 11, color: "var(--muted)" }}>{w.description}</p>}
                            </div>
                            <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Open →</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {(details.online_courses || []).length > 0 && (
                    <div className="card">
                      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Online Courses</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {details.online_courses.map((c, ci) => (
                          <a key={ci} href={c.url} target="_blank" rel="noreferrer" style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "12px 14px", background: "var(--surface2)",
                            borderRadius: 8, border: "1px solid var(--border)", textDecoration: "none"
                          }}>
                            <div>
                              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                                <span className="badge badge-teal">{c.platform}</span>
                                {c.free && <span className="badge badge-purple">Free</span>}
                                {c.duration && <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.duration}</span>}
                              </div>
                              <p style={{ fontSize: 13, color: "var(--text)" }}>{c.course}</p>
                            </div>
                            <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap" }}>Open →</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {(!details.useful_websites?.length && !details.online_courses?.length) && (
                    <p style={{ color: "var(--muted)", fontSize: 13 }}>No website data returned.</p>
                  )}
                </div>
              )}

              {/* ── TAB: Prep Tips ── */}
              {activeTab === "tips" && (
                <div className="card" style={{ background: "rgba(108,99,255,0.06)", borderColor: "rgba(108,99,255,0.2)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Preparation Tips</h3>
                  {(details.preparation_tips || []).map((tip, ti) => (
                    <div key={ti} style={{
                      display: "flex", gap: 10, padding: "10px 0",
                      borderBottom: ti < details.preparation_tips.length - 1 ? "1px solid var(--border)" : "none"
                    }}>
                      <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, flexShrink: 0 }}>
                        {String(ti + 1).padStart(2, "0")}
                      </span>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{tip}</p>
                    </div>
                  ))}
                  {(!details.preparation_tips || details.preparation_tips.length === 0) && (
                    <p style={{ color: "var(--muted)", fontSize: 13 }}>No tips returned.</p>
                  )}
                </div>
              )}

              {/* Error banner */}
              {details.error && (
                <div style={{
                  background: "#3a1a1a", border: "1px solid #ff6b6b",
                  borderRadius: 12, padding: 16, color: "#ff6b6b", fontSize: 13
                }}>
                  AI error: {details.error}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}