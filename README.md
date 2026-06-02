# EduSwitch 🎓

> **AI-powered career transition guide for Maharashtra students** — find the right college, predict your stream switch probability, and get personalised entrance exam prep, all in one place.

---

## 📽️ Demo

<video src="EduSwitch.mp4" controls width="100%"></video>

> _Full walkthrough of AI Advisor, College Search, Career Predictor, Entrance Exam Guide, and Analytics Dashboard._

---

## ✨ What is EduSwitch?

EduSwitch helps students across **Pune, Nagpur, Nashik, Satara, and Kolhapur** navigate the confusing world of stream switching and college admissions. Instead of browsing dozens of websites, students can:

- **Ask an AI advisor** natural-language questions about switching from Science to MBA, Commerce to Engineering, and more
- **Search colleges** with city and stream filters, grouped by location with expandable detail cards
- **Predict success probability** for any stream switch based on HSC marks and entrance exam scores, then get matched college recommendations
- **Explore entrance exams** with AI-fetched syllabus, YouTube channels, top coaching institutes, nearby classes, and prep tips
- **View analytics** — rich charts showing college distribution across cities and streams in Maharashtra

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Recharts** | Bar, pie, radar, and area charts in Analytics |
| **React Markdown** | Renders AI advisor responses |
| **CSS Variables** | Dark-mode theming via `var(--accent)`, `var(--surface)`, etc. |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** (Python) | REST API server |
| **LLM / AI layer** | Career prediction, exam details, advisor responses, college recommendations |
| **RAG pipeline** | College database search with vector retrieval |
| **Uvicorn** | ASGI server |

### Key API Endpoints
| Endpoint | Description |
|---|---|
| `POST /advisor` | AI career advisor — natural language Q&A |
| `GET /colleges` | College search with city/stream filters |
| `POST /predict` | Stream switch probability prediction |
| `GET /recommend-colleges` | Colleges matched to exam scores and quotas |
| `GET /analytics` | Aggregate stats by city and stream |
| `GET /exams/{stream}` | Exam list for a stream |
| `GET /exam-details/{stream}/{exam}` | AI-generated syllabus, YouTube, coachings |
| `GET /nearby-coachings` | Coaching centers by city and exam |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+

### 1. Clone the repo
```bash
git clone https://github.com/your-username/eduswitch.git
cd eduswitch
```

### 2. Start the backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Start the frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Configure environment
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
eduswitch/
├── EduSwitch.mp4              # Demo video
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatAdvisor.jsx
│   │   │   ├── CollegeSearch.jsx
│   │   │   ├── CareerPredictor.jsx
│   │   │   ├── EntranceExams.jsx
│   │   │   └── Analytics.jsx
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── main.py
    ├── requirements.txt
    └── data/                  # College dataset
```

---

## 🌟 Key Features

### 💬 AI Career Advisor
Ask free-form questions like _"I scored 65% in HSC Science, is Law a good option?"_ and get structured advice with matching college cards. Includes quick-prompt chips for common queries.

### 🔍 College Search
Full-text search across 5 Maharashtra cities. Results auto-group by city when no city filter is applied. Each card expands to show affiliation, NAAC grade, fees, intake, and phone.

### 📊 Career Predictor
3-step wizard:
1. Enter current stream, target stream, and HSC marks → get a probability score (green / amber / red)
2. Enter entrance exam and percentile → filter by preferred city and result count
3. Browse matched colleges with cutoffs, quotas, and admission chances

### 📝 Entrance Exam Guide
Select a stream → pick an exam → explore 6 tabs:
- **Syllabus** — subjects, chapters, and concept chips
- **YouTube** — curated channels per subject
- **Coachings** — top institutes with fees and programs
- **Nearby** — coaching centers searchable by your city
- **Websites & Courses** — official sites and online courses
- **Prep Tips** — numbered tips from AI

### 📈 Analytics Dashboard
4-tab dashboard (Overview / Cities / Streams / Distribution) with KPI cards, pie charts, horizontal bar leaderboard, radar chart, stacked bar, and area chart — all driven by live backend data.

---

## 🔧 Configuration

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | Backend base URL |
| Backend port | `8000` | Set via `uvicorn --port` |

---

## 📱 Responsive Design

EduSwitch is fully responsive:
- Sidebar collapses on mobile with a bottom nav pattern
- All grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`
- Tab bars scroll horizontally on narrow screens
- `clamp()` used for fluid typography

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

<p align="center">Built with ❤️ for Maharashtra students navigating career transitions</p>
