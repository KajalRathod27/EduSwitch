// // const BASE = "http://localhost:8000"

// // export async function askAdvisor(query, city, stream) {
// //   const r = await fetch(`${BASE}/advisor`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ query, city, stream })
// //   })
// //   return r.json()
// // }

// // export async function searchColleges(query, city, stream) {
// //   const p = new URLSearchParams({ query, city, stream })
// //   const r = await fetch(`${BASE}/colleges?${p}`)
// //   return r.json()
// // }

// // export async function predictCareer(from_stream, to_stream, marks) {
// //   const r = await fetch(`${BASE}/predict`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ from_stream, to_stream, marks })
// //   })
// //   return r.json()
// // }

// // export async function getAnalytics() {
// //   const r = await fetch(`${BASE}/analytics`)
// //   return r.json()
// // }

// const BASE = "http://localhost:8000"

// async function fetchJSON(url, options = {}) {
//   try {
//     const controller = new AbortController()
//     // 60 second timeout — RAG takes time on first request
//     const timer = setTimeout(() => controller.abort(), 60000)

//     const r = await fetch(url, { ...options, signal: controller.signal })
//     clearTimeout(timer)

//     if (!r.ok) {
//       const text = await r.text()
//       throw new Error(`HTTP ${r.status}: ${text}`)
//     }

//     return await r.json()

//   } catch (e) {
//     if (e.name === "AbortError") {
//       return { error: "Request timed out after 60s. Backend may still be loading." }
//     }
//     console.error("API Error:", e.message)
//     return { error: e.message }
//   }
// }

// export async function askAdvisor(query, city, stream) {
//   return fetchJSON(`${BASE}/advisor`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, city, stream })
//   })
// }

// export async function searchColleges(query, city, stream) {
//   const p = new URLSearchParams({ query, city, stream })
//   return fetchJSON(`${BASE}/colleges?${p}`)
// }

// export async function predictCareer(from_stream, to_stream, marks) {
//   return fetchJSON(`${BASE}/predict`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ from_stream, to_stream, marks })
//   })
// }

// export async function getAnalytics() {
//   return fetchJSON(`${BASE}/analytics`)
// }

// export async function checkHealth() {
//   return fetchJSON(`${BASE}/health`)
// }

// export const getExamDetails = (exam, stream) =>
//   fetchJSON(`${BASE}/exam-details/${encodeURIComponent(stream)}/${encodeURIComponent(exam)}`)

// const BASE = "http://localhost:8000"
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function fetchJSON(url, options = {}) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 60000)

    const r = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timer)

    if (!r.ok) {
      const text = await r.text()
      throw new Error(`HTTP ${r.status}: ${text}`)
    }

    return await r.json()

  } catch (e) {
    if (e.name === "AbortError") {
      return { error: "Request timed out after 60s. Backend may still be loading." }
    }
    console.error("API Error:", e.message)
    return { error: e.message }
  }
}

export async function askAdvisor(query, city, stream) {
  return fetchJSON(`${BASE}/advisor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, city, stream })
  })
}

export async function searchColleges(query, city, stream) {
  const p = new URLSearchParams({ query, city, stream })
  return fetchJSON(`${BASE}/colleges?${p}`)
}

export async function predictCareer(from_stream, to_stream, marks) {
  return fetchJSON(`${BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from_stream, to_stream, marks })
  })
}

export async function recommendColleges(from_stream, to_stream, hsc_marks, exam, exam_marks, city, limit) {
  const p = new URLSearchParams({
    from_stream,
    to_stream,
    hsc_marks,
    exam,
    exam_marks,
    city,
    limit,
  })
  return fetchJSON(`${BASE}/recommend-colleges?${p}`)
}

export async function getAnalytics() {
  return fetchJSON(`${BASE}/analytics`)
}

export async function checkHealth() {
  return fetchJSON(`${BASE}/health`)
}

export const getExamDetails = (exam, stream) =>
  fetchJSON(`${BASE}/exam-details/${encodeURIComponent(stream)}/${encodeURIComponent(exam)}`)

export const getNearbyCoachings = (exam, city, lat = 0, lng = 0) => {
  const p = new URLSearchParams({ exam, city, lat, lng })
  return fetchJSON(`${BASE}/nearby-coachings?${p}`)
}