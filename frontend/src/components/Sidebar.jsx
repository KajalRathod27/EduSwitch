// export default function Sidebar({ active, setActive }) {
//   const items = [
//     { id: "advisor",  icon: "💬", label: "AI Advisor"        },
//     { id: "search",   icon: "🔍", label: "College Search"    },
//     { id: "predict",  icon: "📊", label: "Career Predictor"  },
//     { id: "exams",    icon: "📝", label: "Entrance Exams"    },
//     { id: "analytics",icon: "📈", label: "Analytics"         },
//   ]

//   return (
//     <aside style={{
//       width: 220, minHeight: "100vh", background: "var(--bg2)",
//       borderRight: "1px solid var(--border)", padding: "24px 12px",
//       display: "flex", flexDirection: "column", gap: 6, flexShrink: 0
//     }}>
//       <div style={{ marginBottom: 32, padding: "0 8px" }}>
//         <h2 style={{ fontSize: 22, color: "#a89cff", letterSpacing: -0.5 }}>EduSwitch</h2>
//         <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Career transition guide</p>
//       </div>
//       {items.map(i => (
//         <button key={i.id} onClick={() => setActive(i.id)} style={{
//           display: "flex", alignItems: "center", gap: 10,
//           padding: "10px 12px", borderRadius: 10, border: "none",
//           background: active === i.id ? "var(--surface2)" : "transparent",
//           color: active === i.id ? "var(--text)" : "var(--muted)",
//           cursor: "pointer", fontSize: 14, fontFamily: "DM Sans, sans-serif",
//           transition: "all 0.15s", textAlign: "left", width: "100%",
//           borderLeft: active === i.id ? "2px solid var(--accent)" : "2px solid transparent",
//         }}>
//           <span style={{ fontSize: 16 }}>{i.icon}</span>
//           {i.label}
//         </button>
//       ))}
//     </aside>
//   )
// }

export default function Sidebar({ active, setActive }) {
  const items = [
    { id: "advisor",   icon: "💬", label: "AI Advisor"       },
    { id: "search",    icon: "🔍", label: "College Search"   },
    { id: "predict",   icon: "📊", label: "Career Predictor" },
    { id: "exams",     icon: "📝", label: "Entrance Exams"   },
    { id: "analytics", icon: "📈", label: "Analytics"        },
  ]

  return (
    <aside style={{
      width: 220, height: "100vh", background: "var(--bg2)",
      borderRight: "1px solid var(--border)", padding: "24px 12px",
      display: "flex", flexDirection: "column", gap: 6, flexShrink: 0,
      overflowY: "auto",
    }}>
      <div style={{ marginBottom: 32, padding: "0 8px" }}>
        <h2 style={{ fontSize: 22, color: "#a89cff", letterSpacing: -0.5, fontFamily: "Syne, sans-serif" }}>
          EduSwitch
        </h2>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Career transition guide</p>
      </div>

      {items.map(i => (
        <button
          key={i.id}
          onClick={() => setActive(i.id)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10, border: "none",
            background: active === i.id ? "var(--surface2)" : "transparent",
            color: active === i.id ? "var(--text)" : "var(--muted)",
            cursor: "pointer", fontSize: 14, fontFamily: "DM Sans, sans-serif",
            transition: "all 0.15s", textAlign: "left", width: "100%",
            borderLeft: active === i.id ? "2px solid var(--accent)" : "2px solid transparent",
          }}
        >
          <span style={{ fontSize: 16 }}>{i.icon}</span>
          {i.label}
        </button>
      ))}
    </aside>
  )
}