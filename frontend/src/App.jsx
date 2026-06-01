// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import { useState } from "react"
// import Sidebar from "./components/Sidebar"
// import ChatAdvisor from "./components/ChatAdvisor"
// import CollegeSearch from "./components/CollegeSearch"
// import CareerPredictor from "./components/CareerPredictor"
// import EntranceExams from "./components/EntranceExams"
// import Analytics from "./components/Analytics"
// import "./index.css"

// export default function App() {
//   const [page, setPage] = useState("advisor")

//   const pages = {
//     advisor:   <ChatAdvisor />,
//     search:    <CollegeSearch />,
//     predict:   <CareerPredictor />,
//     exams:     <EntranceExams />,
//     analytics: <Analytics />,
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar active={page} setActive={setPage} />
//       <main style={{ flex: 1, overflowY: "auto" }}>
//         {pages[page]}
//       </main>
//     </div>
//   )
// }

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatAdvisor from "./components/ChatAdvisor"
import CollegeSearch from "./components/CollegeSearch"
import CareerPredictor from "./components/CareerPredictor"
import EntranceExams from "./components/EntranceExams"
import Analytics from "./components/Analytics"
import "./index.css"

export default function App() {
  const [page, setPage] = useState("advisor")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pages = {
    advisor:   <ChatAdvisor />,
    search:    <CollegeSearch />,
    predict:   <CareerPredictor />,
    exams:     <EntranceExams />,
    analytics: <Analytics />,
  }

  const pageLabels = {
    advisor: "AI Advisor", search: "College Search",
    predict: "Career Predictor", exams: "Entrance Exams", analytics: "Analytics",
  }

  function navigate(id) {
    setPage(id)
    setSidebarOpen(false)
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar — hidden on mobile unless open */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
        display: "block",
      }}
        className="sidebar-mobile"
      >
        <Sidebar active={page} setActive={navigate} />
      </div>

      {/* Desktop sidebar — always visible on large screens */}
      <div style={{ display: "none" }} className="sidebar-desktop">
        <Sidebar active={page} setActive={navigate} />
      </div>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>

        {/* Mobile top bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 16px",
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "sticky", top: 0, zIndex: 50,
        }}
          className="mobile-topbar"
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "6px 10px", cursor: "pointer",
              color: "var(--text)", fontSize: 18, lineHeight: 1,
              display: "flex", alignItems: "center",
            }}
          >
            ☰
          </button>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: 16, color: "#a89cff", fontWeight: 700 }}>
            EduSwitch
          </span>
          <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: 4 }}>
            · {pageLabels[page]}
          </span>
        </div>

        {/* Page content */}
        <div style={{ flex: 1 }}>
          {pages[page]}
        </div>
      </main>

      <style>{`
        @media (min-width: 769px) {
          .sidebar-mobile { display: none !important; }
          .sidebar-desktop { display: block !important; position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
          .mobile-topbar { display: none !important; }
          main { margin-left: 0; }
        }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}