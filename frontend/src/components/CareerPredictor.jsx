// // // import { useState } from "react"
// // // import { predictCareer } from "../api"

// // // const STREAMS = ["Science","Commerce","Arts","Engineering","Management","Design","Architecture","Law","Pharmacy","Medical"]

// // // export default function CareerPredictor() {
// // //   const [from, setFrom]   = useState("Science")
// // //   const [to, setTo]       = useState("Engineering")
// // //   const [marks, setMarks] = useState(75)
// // //   const [result, setResult] = useState(null)
// // //   const [loading, setLoading] = useState(false)

// // //   async function predict() {
// // //     setLoading(true)
// // //     const data = await predictCareer(from, to, marks)
// // //     setResult(data)
// // //     setLoading(false)
// // //   }

// // //   const colorMap = { green: "var(--success)", amber: "var(--warning)", red: "var(--danger)" }

// // //   return (
// // //     <div style={{ padding: 32, maxWidth: 680, margin: "0 auto" }}>
// // //       <h1 style={{ fontSize: 28, marginBottom: 6 }}>Career Predictor</h1>
// // //       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>Estimate your success probability for a stream switch.</p>

// // //       <div className="card" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
// // //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// // //           <div>
// // //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Current Stream</label>
// // //             <select className="select" value={from} onChange={e => setFrom(e.target.value)}>
// // //               {STREAMS.map(s => <option key={s}>{s}</option>)}
// // //             </select>
// // //           </div>
// // //           <div>
// // //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Target Stream</label>
// // //             <select className="select" value={to} onChange={e => setTo(e.target.value)}>
// // //               {STREAMS.map(s => <option key={s}>{s}</option>)}
// // //             </select>
// // //           </div>
// // //         </div>

// // //         <div>
// // //           <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
// // //             Academic Marks: <strong style={{ color: "var(--text)" }}>{marks}%</strong>
// // //           </label>
// // //           <input type="range" min={40} max={100} value={marks}
// // //             onChange={e => setMarks(+e.target.value)}
// // //             style={{ width: "100%", accentColor: "var(--accent)" }} />
// // //           <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
// // //             <span>40%</span><span>100%</span>
// // //           </div>
// // //         </div>

// // //         <button className="btn btn-primary" onClick={predict} disabled={loading} style={{ alignSelf: "flex-start" }}>
// // //           {loading ? <span className="spinner" /> : "Predict Success"}
// // //         </button>
// // //       </div>

// // //       {result && (
// // //         <div className="fade-in">
// // //           <div className="card" style={{ textAlign: "center", marginBottom: 20 }}>
// // //             <div style={{
// // //               fontSize: 64, fontFamily: "Syne, sans-serif", fontWeight: 800,
// // //               color: colorMap[result.color], marginBottom: 8
// // //             }}>
// // //               {result.probability}%
// // //             </div>
// // //             <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{result.verdict} Probability</div>
// // //             <p style={{ color: "var(--muted)", fontSize: 14 }}>{result.advice}</p>
// // //           </div>

// // //           {result.exams?.length > 0 && (
// // //             <div className="card">
// // //               <h3 style={{ marginBottom: 14, fontSize: 15 }}>Recommended Entrance Exams</h3>
// // //               <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// // //                 {result.exams.map(e => (
// // //                   <span key={e} className="badge badge-purple" style={{ fontSize: 13, padding: "5px 12px" }}>{e}</span>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // import { useState } from "react"
// // import { predictCareer } from "../api"

// // const STREAMS = [
// //   "Science", "Commerce", "Arts",
// //   "Engineering", "Management", "Design",
// //   "Architecture", "Law", "Pharmacy", "Medical",
// // ]

// // const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]

// // const EXAMS_BY_STREAM = {
// //   Engineering:  ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
// //   Management:   ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
// //   Design:       ["UCEED", "NID DAT", "CEED"],
// //   Architecture: ["NATA", "JEE B.Arch"],
// //   Law:          ["CLAT", "AILET", "LSAT India"],
// //   Pharmacy:     ["MHT CET", "GPAT", "NIPER JEE"],
// //   Medical:      ["NEET", "AIIMS"],
// //   Science:      ["JEE Main", "NEET", "MHT CET"],
// //   Commerce:     ["CAT", "CMAT", "CLAT"],
// //   Arts:         ["CLAT", "NID DAT", "UCEED"],
// // }

// // const RESULT_LIMIT_OPTIONS = [10, 20, 30]

// // const colorMap = {
// //   green: { text: "#22c55e", bg: "#052a15" },
// //   amber: { text: "#f59e0b", bg: "#2a1a00" },
// //   red:   { text: "#ef4444", bg: "#2a0505" },
// // }

// // function CollegeRecommendationCard({ college, index }) {
// //   const [open, setOpen] = useState(false)

// //   return (
// //     <div
// //       className="card"
// //       style={{ padding: 16, cursor: "pointer" }}
// //       onClick={() => setOpen(v => !v)}
// //     >
// //       <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
// //         <div
// //           style={{
// //             minWidth: 32,
// //             height: 32,
// //             borderRadius: "50%",
// //             background: "#0f2233",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: 13,
// //             fontWeight: 700,
// //             color: "var(--accent)",
// //             flexShrink: 0,
// //           }}
// //         >
// //           {index + 1}
// //         </div>

// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>
// //             {college.college_name}
// //           </p>

// //           <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
// //             {college.city && <span className="badge badge-purple">{college.city}</span>}
// //             {college.course && (
// //               <span className="badge badge-teal">
// //                 {college.course.split(" ").slice(0, 4).join(" ")}
// //               </span>
// //             )}
// //             {college.ownership && (
// //               <span className="badge badge-amber">{college.ownership}</span>
// //             )}
// //             {college.cutoff && (
// //               <span
// //                 className="badge"
// //                 style={{ background: "#0f2233", color: "#5ba4cf" }}
// //               >
// //                 Cutoff: {college.cutoff}
// //               </span>
// //             )}
// //             {college.quota && (
// //               <span
// //                 className="badge"
// //                 style={{ background: "#1a2a1a", color: "#4ade80" }}
// //               >
// //                 {college.quota}
// //               </span>
// //             )}
// //           </div>

// //           {college.chance && (
// //             <p style={{ fontSize: 12, color: "#22c55e", marginBottom: 4 }}>
// //               ✓ {college.chance}
// //             </p>
// //           )}

// //           {college.facilities && (
// //             <p style={{ fontSize: 11, color: "var(--muted)" }}>
// //               🏢 {college.facilities}
// //             </p>
// //           )}

// //           {open && (
// //             <div
// //               style={{
// //                 marginTop: 12,
// //                 paddingTop: 12,
// //                 borderTop: "1px solid rgba(255,255,255,0.07)",
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
// //                 gap: 8,
// //                 fontSize: 12,
// //                 color: "var(--muted)",
// //               }}
// //             >
// //               {college.affiliation && (
// //                 <div>
// //                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Affiliation</span>
// //                   <br />{college.affiliation}
// //                 </div>
// //               )}
// //               {college.fees && (
// //                 <div>
// //                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Fees</span>
// //                   <br />{college.fees}
// //                 </div>
// //               )}
// //               {college.intake && (
// //                 <div>
// //                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Intake</span>
// //                   <br />{college.intake}
// //                 </div>
// //               )}
// //               {college.naac_grade && (
// //                 <div>
// //                   <span style={{ color: "var(--text)", fontWeight: 500 }}>NAAC</span>
// //                   <br />{college.naac_grade}
// //                 </div>
// //               )}
// //               {college.why_recommended && (
// //                 <div style={{ gridColumn: "1 / -1" }}>
// //                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Why recommended</span>
// //                   <br />{college.why_recommended}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           <div style={{ marginTop: 6, display: "flex", justifyContent: "flex-end" }}>
// //             <span style={{ fontSize: 10, color: "var(--muted)" }}>
// //               {open ? "▲ less" : "▼ more"}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default function CareerPredictor() {
// //   const [from, setFrom]     = useState("Science")
// //   const [to, setTo]         = useState("Engineering")
// //   const [marks, setMarks]   = useState(75)
// //   const [exam, setExam]     = useState("")
// //   const [examMarks, setExamMarks] = useState(70)
// //   const [city, setCity]     = useState("")
// //   const [limit, setLimit]   = useState(10)
// //   const [result, setResult] = useState(null)
// //   const [colleges, setColleges] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [loadingColleges, setLoadingColleges] = useState(false)
// //   const [step, setStep]     = useState(1)

// //   const availableExams = EXAMS_BY_STREAM[to] || []

// //   async function predict() {
// //     setLoading(true)
// //     setResult(null)
// //     setColleges([])
// //     try {
// //       const data = await predictCareer(from, to, marks)
// //       setResult(data)
// //       setStep(2)
// //     } catch (e) {
// //       alert("API error: " + e.message)
// //     }
// //     setLoading(false)
// //   }

// //   async function findColleges() {
// //     if (!exam) { alert("Please select the entrance exam you attempted."); return }
// //     setLoadingColleges(true)
// //     setColleges([])
// //     try {
// //       const res = await fetch(
// //         `/api/recommend-colleges?` +
// //         new URLSearchParams({
// //           from_stream: from,
// //           to_stream: to,
// //           hsc_marks: marks,
// //           exam,
// //           exam_marks: examMarks,
// //           city,
// //           limit,
// //         })
// //       )
// //       const data = await res.json()
// //       setColleges(data.colleges || [])
// //     } catch {
// //       setColleges(await fetchCollegesViaGroq())
// //     }
// //     setLoadingColleges(false)
// //   }

// //   async function fetchCollegesViaGroq() {
// //     try {
// //       const res = await fetch("/advisor", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           query: `I scored ${marks}% in HSC (${from} stream). I appeared for ${exam} and scored ${examMarks}%. 
// // I want admission in ${to} colleges${city ? ` in or near ${city}` : " in Maharashtra"}. 
// // List the top ${limit} colleges I can get admission in based on last year cutoffs and general/OBC/SC/ST quotas. 
// // For each college give: college name, city, course, ownership (govt/private/aided), estimated cutoff for ${exam}, 
// // my admission chances, fees, facilities.`,
// //           city,
// //           stream: to,
// //         }),
// //       })
// //       const data = await res.json()
// //       return data.colleges || []
// //     } catch {
// //       return []
// //     }
// //   }

// //   const colors = result ? colorMap[result.color] || colorMap.amber : null

// //   return (
// //     <div style={{ padding: 32, maxWidth: 780, margin: "0 auto" }}>
// //       <h1 style={{ fontSize: 28, marginBottom: 4 }}>Career Predictor</h1>
// //       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>
// //         Estimate your switch probability · Find colleges you qualify for
// //       </p>

// //       <div style={{ display: "flex", gap: 0, marginBottom: 28, position: "relative" }}>
// //         {["Stream & Marks", "Entrance Exam", "College Matches"].map((label, i) => (
// //           <div
// //             key={i}
// //             style={{
// //               flex: 1,
// //               textAlign: "center",
// //               fontSize: 12,
// //               color: step >= i + 1 ? "var(--accent)" : "var(--muted)",
// //               fontWeight: step === i + 1 ? 600 : 400,
// //               paddingBottom: 8,
// //               borderBottom: `2px solid ${step >= i + 1 ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
// //               cursor: step > i + 1 ? "pointer" : "default",
// //             }}
// //             onClick={() => { if (step > i + 1) setStep(i + 1) }}
// //           >
// //             {i + 1}. {label}
// //           </div>
// //         ))}
// //       </div>

// //       {step === 1 && (
// //         <div className="card" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
// //                 Current Stream
// //               </label>
// //               <select className="select" value={from} onChange={e => setFrom(e.target.value)}>
// //                 {STREAMS.map(s => <option key={s}>{s}</option>)}
// //               </select>
// //             </div>
// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
// //                 Target Stream / Field
// //               </label>
// //               <select className="select" value={to} onChange={e => { setTo(e.target.value); setExam("") }}>
// //                 {STREAMS.map(s => <option key={s}>{s}</option>)}
// //               </select>
// //             </div>
// //           </div>

// //           <div>
// //             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
// //               HSC / 12th Marks:{" "}
// //               <strong style={{ color: "var(--text)" }}>{marks}%</strong>
// //             </label>
// //             <input
// //               type="range" min={40} max={100} value={marks} step={1}
// //               onChange={e => setMarks(+e.target.value)}
// //               style={{ width: "100%", accentColor: "var(--accent)" }}
// //             />
// //             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
// //               <span>40%</span><span>100%</span>
// //             </div>
// //           </div>

// //           <button
// //             className="btn btn-primary"
// //             onClick={predict}
// //             disabled={loading}
// //             style={{ alignSelf: "flex-start" }}
// //           >
// //             {loading ? <span className="spinner" /> : "Check Switch Probability →"}
// //           </button>
// //         </div>
// //       )}

// //       {result && (
// //         <div className="fade-in">
// //           <div
// //             className="card"
// //             style={{
// //               textAlign: "center",
// //               marginBottom: 20,
// //               background: colors.bg,
// //               border: `1px solid ${colors.text}22`,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontSize: 56,
// //                 fontWeight: 800,
// //                 color: colors.text,
// //                 marginBottom: 6,
// //               }}
// //             >
// //               {result.probability}%
// //             </div>
// //             <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: colors.text }}>
// //               {result.verdict} Probability
// //             </div>
// //             <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 16 }}>
// //               {result.advice}
// //             </p>
// //             {step === 1 && (
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={() => setStep(2)}
// //                 style={{ margin: "0 auto" }}
// //               >
// //                 Find Colleges I Can Get Into →
// //               </button>
// //             )}
// //           </div>

// //           {result.exams?.length > 0 && step === 1 && (
// //             <div className="card" style={{ marginBottom: 20 }}>
// //               <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>
// //                 Recommended entrance exams for {to}:
// //               </p>
// //               <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //                 {result.exams.map(e => (
// //                   <span key={e} className="badge badge-purple" style={{ fontSize: 13, padding: "5px 12px" }}>
// //                     {e}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {step === 2 && (
// //         <div className="card fade-in" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
// //           <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
// //             Tell us which exam you attempted so we can find colleges you qualify for.
// //           </p>

// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
// //                 Exam Attempted
// //               </label>
// //               <select
// //                 className="select"
// //                 value={exam}
// //                 onChange={e => setExam(e.target.value)}
// //               >
// //                 <option value="">Select exam…</option>
// //                 {availableExams.map(e => (
// //                   <option key={e}>{e}</option>
// //                 ))}
// //                 <option value="other">Other</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
// //                 Exam Score / Percentile:{" "}
// //                 <strong style={{ color: "var(--text)" }}>{examMarks}%</strong>
// //               </label>
// //               <input
// //                 type="range" min={1} max={100} value={examMarks} step={1}
// //                 onChange={e => setExamMarks(+e.target.value)}
// //                 style={{ width: "100%", accentColor: "var(--accent)" }}
// //               />
// //               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
// //                 <span>1%</span><span>100%</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
// //                 Preferred City
// //               </label>
// //               <select className="select" value={city} onChange={e => setCity(e.target.value)}>
// //                 {CITIES.map(c => (
// //                   <option key={c} value={c}>{c || "Any / All Maharashtra"}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>
// //                 Number of Colleges to Show
// //               </label>
// //               <select
// //                 className="select"
// //                 value={limit}
// //                 onChange={e => setLimit(+e.target.value)}
// //               >
// //                 {RESULT_LIMIT_OPTIONS.map(n => (
// //                   <option key={n} value={n}>Top {n}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// //             <button
// //               className="btn btn-primary"
// //               onClick={findColleges}
// //               disabled={loadingColleges}
// //             >
// //               {loadingColleges ? <span className="spinner" /> : `Find Top ${limit} Colleges →`}
// //             </button>
// //             <button
// //               className="btn"
// //               style={{ fontSize: 13 }}
// //               onClick={() => setStep(1)}
// //             >
// //               ← Back
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {loadingColleges && (
// //         <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 14 }}>
// //           <span className="spinner" style={{ marginRight: 10 }} />
// //           Finding colleges based on cutoffs and quotas...
// //         </div>
// //       )}

// //       {colleges.length > 0 && (
// //         <div className="fade-in">
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 10,
// //               marginBottom: 16,
// //             }}
// //           >
// //             <h3 style={{ fontSize: 16, margin: 0 }}>
// //               Colleges You Can Get Into
// //             </h3>
// //             <span
// //               style={{
// //                 fontSize: 11,
// //                 background: "#1a2535",
// //                 color: "#7a8299",
// //                 borderRadius: 20,
// //                 padding: "2px 8px",
// //               }}
// //             >
// //               {colleges.length} matches
// //             </span>
// //           </div>

// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             {colleges.slice(0, limit).map((c, i) => (
// //               <CollegeRecommendationCard key={i} college={c} index={i} />
// //             ))}
// //           </div>

// //           {colleges.length === 0 && (
// //             <div
// //               className="card"
// //               style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}
// //             >
// //               <p>No colleges found for these criteria.</p>
// //               <p style={{ fontSize: 13 }}>
// //                 Try selecting a different city or adjusting your exam score.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// import { useState } from "react"
// import { predictCareer, recommendColleges } from "../api"

// const STREAMS = [
//   "Science", "Commerce", "Arts",
//   "Engineering", "Management", "Design",
//   "Architecture", "Law", "Pharmacy", "Medical",
// ]

// const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]

// const EXAMS_BY_STREAM = {
//   Engineering:  ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
//   Management:   ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
//   Design:       ["UCEED", "NID DAT", "CEED"],
//   Architecture: ["NATA", "JEE B.Arch"],
//   Law:          ["CLAT", "AILET", "LSAT India"],
//   Pharmacy:     ["MHT CET", "GPAT", "NIPER JEE"],
//   Medical:      ["NEET", "AIIMS"],
//   Science:      ["JEE Main", "NEET", "MHT CET"],
//   Commerce:     ["CAT", "CMAT", "CLAT"],
//   Arts:         ["CLAT", "NID DAT", "UCEED"],
// }

// const RESULT_LIMIT_OPTIONS = [10, 20, 30]

// const colorMap = {
//   green: { text: "#22c55e", bg: "#052a15" },
//   amber: { text: "#f59e0b", bg: "#2a1a00" },
//   red:   { text: "#ef4444", bg: "#2a0505" },
// }

// function CollegeRecommendationCard({ college, index }) {
//   const [open, setOpen] = useState(false)

//   return (
//     <div
//       className="card"
//       style={{ padding: 16, cursor: "pointer" }}
//       onClick={() => setOpen(v => !v)}
//     >
//       <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//         <div
//           style={{
//             minWidth: 32, height: 32, borderRadius: "50%",
//             background: "#0f2233",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: 13, fontWeight: 700, color: "var(--accent)", flexShrink: 0,
//           }}
//         >
//           {index + 1}
//         </div>

//         <div style={{ flex: 1, minWidth: 0 }}>
//           <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>
//             {college.college_name}
//           </p>

//           <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
//             {college.city      && <span className="badge badge-purple">{college.city}</span>}
//             {college.course    && <span className="badge badge-teal">{college.course.split(" ").slice(0, 4).join(" ")}</span>}
//             {college.ownership && <span className="badge badge-amber">{college.ownership}</span>}
//             {college.cutoff    && (
//               <span className="badge" style={{ background: "#0f2233", color: "#5ba4cf" }}>
//                 Cutoff: {college.cutoff}
//               </span>
//             )}
//             {college.quota && (
//               <span className="badge" style={{ background: "#1a2a1a", color: "#4ade80" }}>
//                 {college.quota}
//               </span>
//             )}
//           </div>

//           {college.chance && (
//             <p style={{ fontSize: 12, color: "#22c55e", marginBottom: 4 }}>✓ {college.chance}</p>
//           )}

//           {college.facilities && (
//             <p style={{ fontSize: 11, color: "var(--muted)" }}>🏢 {college.facilities}</p>
//           )}

//           {open && (
//             <div
//               style={{
//                 marginTop: 12, paddingTop: 12,
//                 borderTop: "1px solid rgba(255,255,255,0.07)",
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//                 gap: 8, fontSize: 12, color: "var(--muted)",
//               }}
//             >
//               {college.affiliation && (
//                 <div>
//                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Affiliation</span>
//                   <br />{college.affiliation}
//                 </div>
//               )}
//               {college.fees && (
//                 <div>
//                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Fees</span>
//                   <br />{college.fees}
//                 </div>
//               )}
//               {college.intake && (
//                 <div>
//                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Intake</span>
//                   <br />{college.intake}
//                 </div>
//               )}
//               {college.naac_grade && (
//                 <div>
//                   <span style={{ color: "var(--text)", fontWeight: 500 }}>NAAC</span>
//                   <br />{college.naac_grade}
//                 </div>
//               )}
//               {college.why_recommended && (
//                 <div style={{ gridColumn: "1 / -1" }}>
//                   <span style={{ color: "var(--text)", fontWeight: 500 }}>Why recommended</span>
//                   <br />{college.why_recommended}
//                 </div>
//               )}
//             </div>
//           )}

//           <div style={{ marginTop: 6, display: "flex", justifyContent: "flex-end" }}>
//             <span style={{ fontSize: 10, color: "var(--muted)" }}>{open ? "▲ less" : "▼ more"}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function CareerPredictor() {
//   const [from, setFrom]               = useState("Science")
//   const [to, setTo]                   = useState("Engineering")
//   const [marks, setMarks]             = useState(75)
//   const [exam, setExam]               = useState("")
//   const [examMarks, setExamMarks]     = useState(70)
//   const [city, setCity]               = useState("")
//   const [limit, setLimit]             = useState(10)
//   const [result, setResult]           = useState(null)
//   const [colleges, setColleges]       = useState([])
//   const [loading, setLoading]         = useState(false)
//   const [loadingColleges, setLoadingColleges] = useState(false)
//   const [step, setStep]               = useState(1)
//   const [error, setError]             = useState("")

//   const availableExams = EXAMS_BY_STREAM[to] || []

//   async function predict() {
//     setLoading(true)
//     setResult(null)
//     setColleges([])
//     setError("")
//     const data = await predictCareer(from, to, marks)
//     if (data.error) {
//       setError(data.error)
//     } else {
//       setResult(data)
//       setStep(2)
//     }
//     setLoading(false)
//   }

//   async function findColleges() {
//     if (!exam) { setError("Please select the entrance exam you attempted."); return }
//     setLoadingColleges(true)
//     setColleges([])
//     setError("")
//     // Uses api.js → GET http://localhost:8000/recommend-colleges
//     const data = await recommendColleges(from, to, marks, exam, examMarks, city, limit)
//     if (data.error) {
//       setError(data.error)
//     } else {
//       setColleges(data.colleges || [])
//       setStep(3)
//     }
//     setLoadingColleges(false)
//   }

//   const colors = result ? (colorMap[result.color] || colorMap.amber) : null

//   return (
//     <div style={{ padding: 32, maxWidth: 780, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 28, marginBottom: 4 }}>Career Predictor</h1>
//       <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>
//         Estimate your switch probability · Find colleges you qualify for
//       </p>

//       {/* Step tabs */}
//       <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
//         {["Stream & Marks", "Entrance Exam", "College Matches"].map((label, i) => (
//           <div
//             key={i}
//             style={{
//               flex: 1, textAlign: "center", fontSize: 12,
//               color: step >= i + 1 ? "var(--accent)" : "var(--muted)",
//               fontWeight: step === i + 1 ? 600 : 400,
//               paddingBottom: 8,
//               borderBottom: `2px solid ${step >= i + 1 ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
//               cursor: step > i + 1 ? "pointer" : "default",
//             }}
//             onClick={() => { if (step > i + 1) setStep(i + 1) }}
//           >
//             {i + 1}. {label}
//           </div>
//         ))}
//       </div>

//       {/* Error banner */}
//       {error && (
//         <div style={{
//           background: "#2a0505", border: "1px solid #ef444433",
//           borderRadius: 8, padding: "10px 16px",
//           color: "#ef4444", fontSize: 13, marginBottom: 16,
//         }}>
//           ⚠ {error}
//         </div>
//       )}

//       {/* Step 1 — Stream & Marks */}
//       {step === 1 && (
//         <div className="card" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Current Stream</label>
//               <select className="select" value={from} onChange={e => setFrom(e.target.value)}>
//                 {STREAMS.map(s => <option key={s}>{s}</option>)}
//               </select>
//             </div>
//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Target Stream / Field</label>
//               <select className="select" value={to} onChange={e => { setTo(e.target.value); setExam("") }}>
//                 {STREAMS.map(s => <option key={s}>{s}</option>)}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
//               HSC / 12th Marks: <strong style={{ color: "var(--text)" }}>{marks}%</strong>
//             </label>
//             <input
//               type="range" min={40} max={100} value={marks} step={1}
//               onChange={e => setMarks(+e.target.value)}
//               style={{ width: "100%", accentColor: "var(--accent)" }}
//             />
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
//               <span>40%</span><span>100%</span>
//             </div>
//           </div>

//           <button className="btn btn-primary" onClick={predict} disabled={loading} style={{ alignSelf: "flex-start" }}>
//             {loading ? <span className="spinner" /> : "Check Switch Probability →"}
//           </button>
//         </div>
//       )}

//       {/* Probability result — always visible once set */}
//       {result && (
//         <div className="fade-in">
//           <div
//             className="card"
//             style={{
//               textAlign: "center", marginBottom: 20,
//               background: colors.bg,
//               border: `1px solid ${colors.text}33`,
//             }}
//           >
//             <div style={{ fontSize: 56, fontWeight: 800, color: colors.text, marginBottom: 6 }}>
//               {result.probability}%
//             </div>
//             <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: colors.text }}>
//               {result.verdict} Probability
//             </div>
//             <p style={{ color: "var(--muted)", fontSize: 14 }}>{result.advice}</p>
//             {result.exams?.length > 0 && (
//               <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
//                 {result.exams.map(e => (
//                   <span key={e} className="badge badge-purple" style={{ fontSize: 13, padding: "5px 12px" }}>{e}</span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Step 2 — Exam details */}
//       {step === 2 && (
//         <div className="card fade-in" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
//           <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
//             Enter your entrance exam details so we can find colleges you qualify for.
//           </p>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Exam Attempted</label>
//               <select className="select" value={exam} onChange={e => setExam(e.target.value)}>
//                 <option value="">Select exam…</option>
//                 {availableExams.map(e => <option key={e}>{e}</option>)}
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
//                 Score / Percentile: <strong style={{ color: "var(--text)" }}>{examMarks}%</strong>
//               </label>
//               <input
//                 type="range" min={1} max={100} value={examMarks} step={1}
//                 onChange={e => setExamMarks(+e.target.value)}
//                 style={{ width: "100%", accentColor: "var(--accent)" }}
//               />
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
//                 <span>1%</span><span>100%</span>
//               </div>
//             </div>
//           </div>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Preferred City</label>
//               <select className="select" value={city} onChange={e => setCity(e.target.value)}>
//                 {CITIES.map(c => <option key={c} value={c}>{c || "Any / All Maharashtra"}</option>)}
//               </select>
//             </div>

//             <div>
//               <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Colleges to Show</label>
//               <select className="select" value={limit} onChange={e => setLimit(+e.target.value)}>
//                 {RESULT_LIMIT_OPTIONS.map(n => <option key={n} value={n}>Top {n}</option>)}
//               </select>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: 10 }}>
//             <button className="btn btn-primary" onClick={findColleges} disabled={loadingColleges}>
//               {loadingColleges ? <span className="spinner" /> : `Find Top ${limit} Colleges →`}
//             </button>
//             <button className="btn" style={{ fontSize: 13 }} onClick={() => { setStep(1); setResult(null) }}>
//               ← Back
//             </button>
//           </div>
//         </div>
//       )}

//       {loadingColleges && (
//         <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 14 }}>
//           <span className="spinner" style={{ marginRight: 10 }} />
//           Finding colleges based on cutoffs and quotas...
//         </div>
//       )}

//       {/* Step 3 — College results */}
//       {step === 3 && !loadingColleges && colleges.length > 0 && (
//         <div className="fade-in">
//           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//             <h3 style={{ fontSize: 16, margin: 0 }}>Colleges You Can Get Into</h3>
//             <span style={{ fontSize: 11, background: "#1a2535", color: "#7a8299", borderRadius: 20, padding: "2px 8px" }}>
//               {colleges.length} matches
//             </span>
//             <button className="btn" style={{ marginLeft: "auto", fontSize: 12 }} onClick={() => setStep(2)}>
//               ← Change Exam
//             </button>
//           </div>

//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {colleges.slice(0, limit).map((c, i) => (
//               <CollegeRecommendationCard key={i} college={c} index={i} />
//             ))}
//           </div>
//         </div>
//       )}

//       {step === 3 && !loadingColleges && colleges.length === 0 && (
//         <div className="card" style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}>
//           <p style={{ fontSize: 15, marginBottom: 6 }}>No colleges found for these criteria.</p>
//           <p style={{ fontSize: 13 }}>Try a different city or adjust your exam score.</p>
//           <button className="btn" style={{ marginTop: 14 }} onClick={() => setStep(2)}>← Try Again</button>
//         </div>
//       )}
//     </div>
//   )
// }

import { useState } from "react"
import { predictCareer, recommendColleges } from "../api"

const STREAMS = ["Science", "Commerce", "Arts", "Engineering", "Management", "Design", "Architecture", "Law", "Pharmacy", "Medical"]
const CITIES = ["", "Pune", "Nagpur", "Nashik", "Satara", "Kolhapur"]
const EXAMS_BY_STREAM = {
  Engineering:  ["JEE Main", "MHT CET", "BITSAT", "VITEEE"],
  Management:   ["CAT", "XAT", "CMAT", "MAT", "SNAP"],
  Design:       ["UCEED", "NID DAT", "CEED"],
  Architecture: ["NATA", "JEE B.Arch"],
  Law:          ["CLAT", "AILET", "LSAT India"],
  Pharmacy:     ["MHT CET", "GPAT", "NIPER JEE"],
  Medical:      ["NEET", "AIIMS"],
  Science:      ["JEE Main", "NEET", "MHT CET"],
  Commerce:     ["CAT", "CMAT", "CLAT"],
  Arts:         ["CLAT", "NID DAT", "UCEED"],
}
const RESULT_LIMIT_OPTIONS = [10, 20, 30]
const colorMap = {
  green: { text: "#22c55e", bg: "#052a15" },
  amber: { text: "#f59e0b", bg: "#2a1a00" },
  red:   { text: "#ef4444", bg: "#2a0505" },
}

function CollegeRecommendationCard({ college, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{ padding: 16, cursor: "pointer" }} onClick={() => setOpen(v => !v)}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          minWidth: 32, height: 32, borderRadius: "50%", background: "#0f2233",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "var(--accent)", flexShrink: 0,
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>{college.college_name}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            {college.city      && <span className="badge badge-purple">{college.city}</span>}
            {college.course    && <span className="badge badge-teal">{college.course.split(" ").slice(0, 4).join(" ")}</span>}
            {college.ownership && <span className="badge badge-amber">{college.ownership}</span>}
            {college.cutoff    && <span className="badge" style={{ background: "#0f2233", color: "#5ba4cf" }}>Cutoff: {college.cutoff}</span>}
            {college.quota     && <span className="badge" style={{ background: "#1a2a1a", color: "#4ade80" }}>{college.quota}</span>}
          </div>
          {college.chance    && <p style={{ fontSize: 12, color: "#22c55e", marginBottom: 4 }}>✓ {college.chance}</p>}
          {college.facilities && <p style={{ fontSize: 11, color: "var(--muted)" }}>🏢 {college.facilities}</p>}
          {open && (
            <div style={{
              marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))",
              gap: 8, fontSize: 12, color: "var(--muted)",
            }}>
              {college.affiliation  && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Affiliation</span><br />{college.affiliation}</div>}
              {college.fees         && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Fees</span><br />{college.fees}</div>}
              {college.intake       && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>Intake</span><br />{college.intake}</div>}
              {college.naac_grade   && <div><span style={{ color: "var(--text)", fontWeight: 500 }}>NAAC</span><br />{college.naac_grade}</div>}
              {college.why_recommended && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "var(--text)", fontWeight: 500 }}>Why recommended</span><br />{college.why_recommended}</div>}
            </div>
          )}
          <div style={{ marginTop: 6, display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>{open ? "▲ less" : "▼ more"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CareerPredictor() {
  const [from, setFrom]             = useState("Science")
  const [to, setTo]                 = useState("Engineering")
  const [marks, setMarks]           = useState(75)
  const [exam, setExam]             = useState("")
  const [examMarks, setExamMarks]   = useState(70)
  const [city, setCity]             = useState("")
  const [limit, setLimit]           = useState(10)
  const [result, setResult]         = useState(null)
  const [colleges, setColleges]     = useState([])
  const [loading, setLoading]       = useState(false)
  const [loadingColleges, setLoadingColleges] = useState(false)
  const [step, setStep]             = useState(1)
  const [error, setError]           = useState("")

  const availableExams = EXAMS_BY_STREAM[to] || []

  async function predict() {
    setLoading(true); setResult(null); setColleges([]); setError("")
    const data = await predictCareer(from, to, marks)
    if (data.error) setError(data.error)
    else { setResult(data); setStep(2) }
    setLoading(false)
  }

  async function findColleges() {
    if (!exam) { setError("Please select the entrance exam you attempted."); return }
    setLoadingColleges(true); setColleges([]); setError("")
    const data = await recommendColleges(from, to, marks, exam, examMarks, city, limit)
    if (data.error) setError(data.error)
    else { setColleges(data.colleges || []); setStep(3) }
    setLoadingColleges(false)
  }

  const colors = result ? (colorMap[result.color] || colorMap.amber) : null

  return (
    <div style={{ padding: "24px 16px", maxWidth: 780, margin: "0 auto", width: "100%" }}>
      <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4, fontFamily: "Syne, sans-serif" }}>
        Career Predictor
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 14 }}>
        Estimate your switch probability · Find colleges you qualify for
      </p>

      {/* Step tabs — scrollable on mobile */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {["Stream & Marks", "Entrance Exam", "College Matches"].map((label, i) => (
          <div key={i} style={{
            flex: "1 1 0", minWidth: 100, textAlign: "center", fontSize: 12,
            color: step >= i + 1 ? "var(--accent)" : "var(--muted)",
            fontWeight: step === i + 1 ? 600 : 400,
            paddingBottom: 8, whiteSpace: "nowrap", paddingInline: 4,
            borderBottom: `2px solid ${step >= i + 1 ? "var(--accent)" : "rgba(255,255,255,0.1)"}`,
            cursor: step > i + 1 ? "pointer" : "default",
          }} onClick={() => { if (step > i + 1) setStep(i + 1) }}>
            {i + 1}. {label}
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          background: "#2a0505", border: "1px solid #ef444433",
          borderRadius: 8, padding: "10px 16px", color: "#ef4444", fontSize: 13, marginBottom: 16,
        }}>⚠ {error}</div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="card" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Current Stream</label>
              <select className="select" value={from} onChange={e => setFrom(e.target.value)}>
                {STREAMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Target Stream / Field</label>
              <select className="select" value={to} onChange={e => { setTo(e.target.value); setExam("") }}>
                {STREAMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
              HSC / 12th Marks: <strong style={{ color: "var(--text)" }}>{marks}%</strong>
            </label>
            <input type="range" min={40} max={100} value={marks} step={1}
              onChange={e => setMarks(+e.target.value)}
              style={{ width: "100%", accentColor: "var(--accent)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
              <span>40%</span><span>100%</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={predict} disabled={loading} style={{ alignSelf: "flex-start" }}>
            {loading ? <span className="spinner" /> : "Check Switch Probability →"}
          </button>
        </div>
      )}

      {/* Probability result */}
      {result && (
        <div className="fade-in">
          <div className="card" style={{
            textAlign: "center", marginBottom: 20,
            background: colors.bg, border: `1px solid ${colors.text}33`,
          }}>
            <div style={{ fontSize: "clamp(40px, 10vw, 56px)", fontWeight: 800, color: colors.text, marginBottom: 6 }}>
              {result.probability}%
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: colors.text }}>{result.verdict} Probability</div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>{result.advice}</p>
            {result.exams?.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
                {result.exams.map(e => (
                  <span key={e} className="badge badge-purple" style={{ fontSize: 13, padding: "5px 12px" }}>{e}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="card fade-in" style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
            Enter your entrance exam details so we can find colleges you qualify for.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Exam Attempted</label>
              <select className="select" value={exam} onChange={e => setExam(e.target.value)}>
                <option value="">Select exam…</option>
                {availableExams.map(e => <option key={e}>{e}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 8 }}>
                Score / Percentile: <strong style={{ color: "var(--text)" }}>{examMarks}%</strong>
              </label>
              <input type="range" min={1} max={100} value={examMarks} step={1}
                onChange={e => setExamMarks(+e.target.value)}
                style={{ width: "100%", accentColor: "var(--accent)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                <span>1%</span><span>100%</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Preferred City</label>
              <select className="select" value={city} onChange={e => setCity(e.target.value)}>
                {CITIES.map(c => <option key={c} value={c}>{c || "Any / All Maharashtra"}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Colleges to Show</label>
              <select className="select" value={limit} onChange={e => setLimit(+e.target.value)}>
                {RESULT_LIMIT_OPTIONS.map(n => <option key={n} value={n}>Top {n}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={findColleges} disabled={loadingColleges}>
              {loadingColleges ? <span className="spinner" /> : `Find Top ${limit} Colleges →`}
            </button>
            <button className="btn" style={{ fontSize: 13 }} onClick={() => { setStep(1); setResult(null) }}>← Back</button>
          </div>
        </div>
      )}

      {loadingColleges && (
        <div style={{ textAlign: "center", padding: 40, color: "var(--muted)", fontSize: 14 }}>
          <span className="spinner" style={{ marginRight: 10 }} />
          Finding colleges based on cutoffs and quotas...
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && !loadingColleges && colleges.length > 0 && (
        <div className="fade-in">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 16, margin: 0 }}>Colleges You Can Get Into</h3>
            <span style={{ fontSize: 11, background: "#1a2535", color: "#7a8299", borderRadius: 20, padding: "2px 8px" }}>
              {colleges.length} matches
            </span>
            <button className="btn" style={{ marginLeft: "auto", fontSize: 12 }} onClick={() => setStep(2)}>← Change Exam</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {colleges.slice(0, limit).map((c, i) => <CollegeRecommendationCard key={i} college={c} index={i} />)}
          </div>
        </div>
      )}

      {step === 3 && !loadingColleges && colleges.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 32, color: "var(--muted)" }}>
          <p style={{ fontSize: 15, marginBottom: 6 }}>No colleges found for these criteria.</p>
          <p style={{ fontSize: 13 }}>Try a different city or adjust your exam score.</p>
          <button className="btn" style={{ marginTop: 14 }} onClick={() => setStep(2)}>← Try Again</button>
        </div>
      )}
    </div>
  )
}