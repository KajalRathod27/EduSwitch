# # # # # from fastapi import FastAPI, Query
# # # # # from fastapi.middleware.cors import CORSMiddleware
# # # # # from pydantic import BaseModel
# # # # # from dotenv import load_dotenv
# # # # # from rag import SwitchSmartRAG
# # # # # from career import CareerPredictor

# # # # # load_dotenv()

# # # # # app = FastAPI(title="EduSwitch API")

# # # # # app.add_middleware(
# # # # #     CORSMiddleware,
# # # # #     allow_origins=["http://localhost:5173", "http://localhost:3000"],
# # # # #     allow_methods=["*"],
# # # # #     allow_headers=["*"],
# # # # # )

# # # # # rag = SwitchSmartRAG()
# # # # # predictor = CareerPredictor()

# # # # # # ── Models ──────────────────────────────────────────────────────────
# # # # # class AdvisorRequest(BaseModel):
# # # # #     query: str
# # # # #     city: str = ""
# # # # #     stream: str = ""

# # # # # class PredictRequest(BaseModel):
# # # # #     from_stream: str
# # # # #     to_stream: str
# # # # #     marks: int

# # # # # # ── Routes ──────────────────────────────────────────────────────────
# # # # # @app.get("/health")
# # # # # def health():
# # # # #     return {"status": "ok"}

# # # # # @app.post("/advisor")
# # # # # def advisor(req: AdvisorRequest):
# # # # #     colleges = rag.retrieve(req.query, req.city, req.stream)
# # # # #     answer = rag.generate_response(req.query, colleges)
# # # # #     return {"answer": answer, "colleges": colleges}

# # # # # @app.get("/colleges")
# # # # # def search_colleges(
# # # # #     query: str = Query(""),
# # # # #     city: str = Query(""),
# # # # #     stream: str = Query("")
# # # # # ):
# # # # #     colleges = rag.retrieve(query, city, stream)
# # # # #     return {"colleges": colleges}

# # # # # @app.post("/predict")
# # # # # def predict(req: PredictRequest):
# # # # #     result = predictor.predict(req.from_stream, req.to_stream, req.marks)
# # # # #     return result

# # # # # @app.get("/exams/{stream}")
# # # # # def get_exams(stream: str):
# # # # #     from career import EXAMS
# # # # #     return {"exams": EXAMS.get(stream, [])}

# # # # # @app.get("/analytics")
# # # # # def analytics():
# # # # #     data = rag.collection.get()["metadatas"]
# # # # #     cities = {}
# # # # #     streams = {}
# # # # #     for d in data:
# # # # #         c = d.get("city", "Unknown")
# # # # #         s = d.get("course", "Unknown").split()[0]
# # # # #         cities[c] = cities.get(c, 0) + 1
# # # # #         streams[s] = streams.get(s, 0) + 1
# # # # #     return {
# # # # #         "total": len(data),
# # # # #         "by_city": cities,
# # # # #         "by_stream": streams
# # # # #     }

# # # # from __future__ import annotations

# # # # import os
# # # # from typing import List, Dict, Any

# # # # from fastapi import FastAPI, Query
# # # # from fastapi.middleware.cors import CORSMiddleware
# # # # from pydantic import BaseModel
# # # # from dotenv import load_dotenv
# # # # from typing import List, Dict, Any, cast

# # # # load_dotenv()          

# # # # from rag import SwitchSmartRAG
# # # # from career import CareerPredictor, EXAMS

# # # # app = FastAPI(title="EduSwitch API")

# # # # app.add_middleware(
# # # #     CORSMiddleware,
# # # #     allow_origins=["http://localhost:5173", "http://localhost:3000"],
# # # #     allow_methods=["*"],
# # # #     allow_headers=["*"],
# # # # )

# # # # # initialise once at startup
# # # # rag       = SwitchSmartRAG()
# # # # predictor = CareerPredictor()


# # # # # ── Pydantic models ────────────────────────────────────────────────
# # # # class AdvisorRequest(BaseModel):
# # # #     query:  str
# # # #     city:   str = ""
# # # #     stream: str = ""

# # # # class PredictRequest(BaseModel):
# # # #     from_stream: str
# # # #     to_stream:   str
# # # #     marks:       int


# # # # # ── Routes ─────────────────────────────────────────────────────────
# # # # @app.get("/health")
# # # # def health() -> Dict[str, str]:
# # # #     return {"status": "ok"}


# # # # @app.post("/advisor")
# # # # def advisor(req: AdvisorRequest) -> Dict[str, Any]:
# # # #     colleges: List[Dict[str, Any]] = rag.retrieve(req.query, req.city, req.stream)
# # # #     answer:   str                  = rag.generate_response(req.query, colleges)
# # # #     return {"answer": answer, "colleges": colleges}


# # # # @app.get("/colleges")
# # # # def search_colleges(
# # # #     query:  str = Query(default=""),
# # # #     city:   str = Query(default=""),
# # # #     stream: str = Query(default=""),
# # # # ) -> Dict[str, Any]:
# # # #     colleges = rag.retrieve(query, city, stream)
# # # #     return {"colleges": colleges}


# # # # @app.post("/predict")
# # # # def predict(req: PredictRequest) -> Dict[str, Any]:
# # # #     result: Dict[str, Any] = predictor.predict(req.from_stream, req.to_stream, req.marks)
# # # #     return result


# # # # @app.get("/exams/{stream}")
# # # # def get_exams(stream: str) -> Dict[str, Any]:
# # # #     return {"exams": EXAMS.get(stream, [])}     # fixes data[] / dict .get() error


# # # # @app.get("/analytics")
# # # # def analytics() -> Dict[str, Any]:

# # # #     # ✅ Fix 5: cast collection.get() so ["metadatas"] key resolves
# # # #     raw_data: Dict[str, Any] = cast(Dict[str, Any], rag.collection.get())
# # # #     metadatas_raw: Any       = raw_data.get("metadatas") or []

# # # #     # ✅ Fix 6: explicit isinstance guard before iterating
# # # #     raw: List[Dict[str, Any]] = [
# # # #         dict(m) for m in metadatas_raw if isinstance(m, dict)
# # # #     ]

# # # #     cities:  Dict[str, int] = {}
# # # #     streams: Dict[str, int] = {}

# # # #     for d in raw:
# # # #         c = str(d.get("city",   "Unknown"))
# # # #         s = str(d.get("course", "Unknown")).split()[0]
# # # #         cities[c]  = cities.get(c,  0) + 1
# # # #         streams[s] = streams.get(s, 0) + 1

# # # #     return {"total": len(raw), "by_city": cities, "by_stream": streams}

# # # from __future__ import annotations

# # # import os
# # # from typing import List, Dict, Any, cast

# # # from fastapi import FastAPI, Query
# # # from fastapi.middleware.cors import CORSMiddleware
# # # from pydantic import BaseModel
# # # from dotenv import load_dotenv

# # # load_dotenv()

# # # app = FastAPI(title="EduSwitch API")

# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=["*"],   # ✅ allow all origins fixes frontend spinning
# # #     allow_methods=["*"],
# # #     allow_headers=["*"],
# # # )

# # # # ✅ Lazy load — prevents startup freeze
# # # _rag       = None
# # # _predictor = None

# # # def get_rag():
# # #     global _rag
# # #     if _rag is None:
# # #         print("⏳ Loading RAG system...")
# # #         from rag import SwitchSmartRAG
# # #         _rag = SwitchSmartRAG()
# # #         print("✅ RAG system ready")
# # #     return _rag

# # # def get_predictor():
# # #     global _predictor
# # #     if _predictor is None:
# # #         from career import CareerPredictor
# # #         _predictor = CareerPredictor()
# # #     return _predictor


# # # # ── Pydantic models ────────────────────────────────────────────────
# # # class AdvisorRequest(BaseModel):
# # #     query:  str
# # #     city:   str = ""
# # #     stream: str = ""

# # # class PredictRequest(BaseModel):
# # #     from_stream: str
# # #     to_stream:   str
# # #     marks:       int


# # # # ── Routes ─────────────────────────────────────────────────────────

# # # @app.get("/health")
# # # def health() -> Dict[str, str]:
# # #     return {"status": "ok"}   # ✅ instant — no RAG needed


# # # # @app.get("/analytics")
# # # # def analytics() -> Dict[str, Any]:
# # # #     try:
# # # #         rag      = get_rag()
# # # #         raw_data = cast(Dict[str, Any], rag.collection.get())
# # # #         raw: List[Dict[str, Any]] = [
# # # #             dict(m)
# # # #             for m in (raw_data.get("metadatas") or [])
# # # #             if isinstance(m, dict)
# # # #         ]
# # # #         cities:  Dict[str, int] = {}
# # # #         streams: Dict[str, int] = {}
# # # #         for d in raw:
# # # #             c = str(d.get("city",   "Unknown"))
# # # #             s = str(d.get("course", "Unknown")).split()[0]
# # # #             cities[c]  = cities.get(c,  0) + 1
# # # #             streams[s] = streams.get(s, 0) + 1
# # # #         return {"total": len(raw), "by_city": cities, "by_stream": streams}
# # # #     except Exception as e:
# # # #         print(f"Analytics error: {e}")
# # # #         return {"error": str(e), "total": 0, "by_city": {}, "by_stream": {}}


# # # @app.post("/advisor")
# # # def advisor(req: AdvisorRequest) -> Dict[str, Any]:
# # #     try:
# # #         rag      = get_rag()
# # #         colleges = rag.retrieve(req.query, req.city, req.stream)
# # #         answer   = rag.generate_response(req.query, colleges)
# # #         return {"answer": answer, "colleges": colleges}
# # #     except Exception as e:
# # #         print(f"Advisor error: {e}")
# # #         return {"answer": f"Error: {str(e)}", "colleges": []}


# # # @app.get("/colleges")
# # # def search_colleges(
# # #     query:  str = Query(default=""),
# # #     city:   str = Query(default=""),
# # #     stream: str = Query(default=""),
# # # ) -> Dict[str, Any]:
# # #     try:
# # #         rag      = get_rag()
# # #         colleges = rag.retrieve(query, city, stream)
# # #         return {"colleges": colleges}
# # #     except Exception as e:
# # #         print(f"College search error: {e}")
# # #         return {"colleges": [], "error": str(e)}


# # # @app.post("/predict")
# # # def predict(req: PredictRequest) -> Dict[str, Any]:
# # #     try:
# # #         predictor = get_predictor()
# # #         return predictor.predict(req.from_stream, req.to_stream, req.marks)
# # #     except Exception as e:
# # #         print(f"Predict error: {e}")
# # #         return {"error": str(e), "probability": 0}


# # # @app.get("/exams/{stream}")
# # # def get_exams(stream: str) -> Dict[str, Any]:
# # #     from career import EXAMS
# # #     return {"exams": EXAMS.get(stream, [])}

# # # @app.get("/exam-details/{stream}/{exam}")
# # # def exam_details(stream: str, exam: str) -> Dict[str, Any]:
# # #     try:
# # #         details = rag.get_exam_details(exam, stream)
# # #         return details
# # #     except Exception as e:
# # #         return {"error": str(e)}


# # # @app.get("/analytics")
# # # def analytics() -> Dict[str, Any]:
# # #     try:
# # #         raw_data = cast(Dict[str, Any], rag.collection.get())
# # #         raw: List[Dict[str, Any]] = [
# # #             dict(m) for m in (raw_data.get("metadatas") or [])
# # #             if isinstance(m, dict)
# # #         ]
# # #         cities:  Dict[str, int] = {}
# # #         streams: Dict[str, int] = {}
# # #         for d in raw:
# # #             c = str(d.get("city",   "Unknown"))
# # #             s = str(d.get("course", "Unknown")).split()[0]
# # #             cities[c]  = cities.get(c,  0) + 1
# # #             streams[s] = streams.get(s, 0) + 1
# # #         return {"total": len(raw), "by_city": cities, "by_stream": streams}
# # #     except Exception as e:
# # #         return {"error": str(e), "total": 0, "by_city": {}, "by_stream": {}}

# # from __future__ import annotations

# # import os
# # from typing import List, Dict, Any, cast

# # from fastapi import FastAPI, Query
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # from dotenv import load_dotenv

# # load_dotenv()

# # app = FastAPI(title="EduSwitch API")

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # _rag       = None
# # _predictor = None

# # def get_rag():
# #     global _rag
# #     if _rag is None:
# #         print("⏳ Loading RAG system...")
# #         from rag import SwitchSmartRAG
# #         _rag = SwitchSmartRAG()
# #         print("✅ RAG system ready")
# #     return _rag

# # def get_predictor():
# #     global _predictor
# #     if _predictor is None:
# #         from career import CareerPredictor
# #         _predictor = CareerPredictor()
# #     return _predictor


# # class AdvisorRequest(BaseModel):
# #     query:  str
# #     city:   str = ""
# #     stream: str = ""

# # class PredictRequest(BaseModel):
# #     from_stream: str
# #     to_stream:   str
# #     marks:       int


# # @app.get("/health")
# # def health() -> Dict[str, str]:
# #     return {"status": "ok"}


# # @app.post("/advisor")
# # def advisor(req: AdvisorRequest) -> Dict[str, Any]:
# #     try:
# #         rag      = get_rag()          # ✅ always use get_rag()
# #         colleges = rag.retrieve(req.query, req.city, req.stream)
# #         answer   = rag.generate_response(req.query, colleges)
# #         return {"answer": answer, "colleges": colleges}
# #     except Exception as e:
# #         print(f"Advisor error: {e}")
# #         return {"answer": f"Error: {str(e)}", "colleges": []}


# # @app.get("/colleges")
# # def search_colleges(
# #     query:  str = Query(default=""),
# #     city:   str = Query(default=""),
# #     stream: str = Query(default=""),
# # ) -> Dict[str, Any]:
# #     try:
# #         rag      = get_rag()          # ✅
# #         colleges = rag.retrieve(query, city, stream)
# #         return {"colleges": colleges}
# #     except Exception as e:
# #         print(f"College search error: {e}")
# #         return {"colleges": [], "error": str(e)}


# # @app.post("/predict")
# # def predict(req: PredictRequest) -> Dict[str, Any]:
# #     try:
# #         predictor = get_predictor()   # ✅
# #         return predictor.predict(req.from_stream, req.to_stream, req.marks)
# #     except Exception as e:
# #         print(f"Predict error: {e}")
# #         return {"error": str(e), "probability": 0}


# # @app.get("/exams/{stream}")
# # def get_exams(stream: str) -> Dict[str, Any]:
# #     from career import EXAMS
# #     return {"exams": EXAMS.get(stream, [])}


# # @app.get("/exam-details/{stream}/{exam}")
# # def exam_details(stream: str, exam: str) -> Dict[str, Any]:
# #     try:
# #         rag = get_rag()               # ✅ was missing — caused the underline error
# #         details = rag.get_exam_details(exam, stream)
# #         return details
# #     except Exception as e:
# #         print(f"Exam details error: {e}")
# #         return {"error": str(e)}


# # @app.get("/analytics")
# # def analytics() -> Dict[str, Any]:
# #     try:
# #         rag      = get_rag()          # ✅ was missing — caused the underline error
# #         raw_data = cast(Dict[str, Any], rag.collection.get())
# #         raw: List[Dict[str, Any]] = [
# #             dict(m) for m in (raw_data.get("metadatas") or [])
# #             if isinstance(m, dict)
# #         ]
# #         cities:  Dict[str, int] = {}
# #         streams: Dict[str, int] = {}
# #         for d in raw:
# #             c = str(d.get("city",   "Unknown"))
# #             s = str(d.get("course", "Unknown")).split()[0]
# #             cities[c]  = cities.get(c,  0) + 1
# #             streams[s] = streams.get(s, 0) + 1
# #         return {"total": len(raw), "by_city": cities, "by_stream": streams}
# #     except Exception as e:
# #         print(f"Analytics error: {e}")
# #         return {"error": str(e), "total": 0, "by_city": {}, "by_stream": {}}
    
# # @app.get("/nearby-coachings")
# # def nearby_coachings(
# #     exam: str = Query(default="JEE Main"),
# #     city: str = Query(default=""),
# #     lat: float = Query(default=0.0),
# #     lng: float = Query(default=0.0),
# # ) -> Dict[str, Any]:
# #     """
# #     Returns AI-generated nearby coaching info for a given exam and city/coords.
# #     In production, swap the Groq call with a real Places API (Google/OSM).
# #     """
# #     try:
# #         rag = get_rag()
# #         from groq import Groq
# #         groq_client = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# #         location_hint = city if city else f"coordinates {lat},{lng}"

# #         prompt = f"""List 5 real coaching institutes for {exam} near {location_hint} in India.
# # Return ONLY valid JSON array:
# # [
# #   {{
# #     "name": "Institute Name",
# #     "address": "Full address",
# #     "city": "{city or 'India'}",
# #     "distance_km": 1.2,
# #     "fees_per_year": "80000-120000",
# #     "tenure_options": ["1 Year", "2 Year", "Crash Course"],
# #     "online_available": true,
# #     "phone": "+91XXXXXXXXXX",
# #     "website": "https://...",
# #     "maps_query": "Institute Name {city or 'India'}",
# #     "rating": "4.2",
# #     "highlights": ["point1", "point2"]
# #   }}
# # ]
# # No extra text, no markdown."""

# #         completion = groq_client.chat.completions.create(
# #             model="llama-3.1-8b-instant",
# #             messages=[{"role": "user", "content": prompt}],
# #             max_tokens=1200,
# #         )
# #         import json
# #         raw = str(completion.choices[0].message.content).replace("```json","").replace("```","").strip()
# #         institutes = json.loads(raw)
# #         return {"institutes": institutes, "city": city or "India"}
# #     except Exception as e:
# #         print(f"Nearby coachings error: {e}")
# #         return {"institutes": [], "error": str(e)}    

# from __future__ import annotations

# import os
# import json
# from typing import List, Dict, Any, cast

# from fastapi import FastAPI, Query
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI(title="EduSwitch API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# _rag       = None
# _predictor = None

# def get_rag():
#     global _rag
#     if _rag is None:
#         print("⏳ Loading RAG system...")
#         from rag import SwitchSmartRAG
#         _rag = SwitchSmartRAG()
#         print("✅ RAG system ready")
#     return _rag

# def get_predictor():
#     global _predictor
#     if _predictor is None:
#         from career import CareerPredictor
#         _predictor = CareerPredictor()
#     return _predictor


# class AdvisorRequest(BaseModel):
#     query:  str
#     city:   str = ""
#     stream: str = ""

# class PredictRequest(BaseModel):
#     from_stream: str
#     to_stream:   str
#     marks:       int


# @app.get("/health")
# def health() -> Dict[str, str]:
#     return {"status": "ok"}


# @app.post("/advisor")
# def advisor(req: AdvisorRequest) -> Dict[str, Any]:
#     try:
#         rag      = get_rag()
#         colleges = rag.retrieve(req.query, req.city, req.stream)
#         answer   = rag.generate_response(req.query, colleges)
#         return {"answer": answer, "colleges": colleges}
#     except Exception as e:
#         print(f"Advisor error: {e}")
#         return {"answer": f"Error: {str(e)}", "colleges": []}


# @app.get("/colleges")
# def search_colleges(
#     query:  str = Query(default=""),
#     city:   str = Query(default=""),
#     stream: str = Query(default=""),
# ) -> Dict[str, Any]:
#     try:
#         rag      = get_rag()
#         colleges = rag.retrieve(query, city, stream)
#         return {"colleges": colleges}
#     except Exception as e:
#         print(f"College search error: {e}")
#         return {"colleges": [], "error": str(e)}


# @app.post("/predict")
# def predict(req: PredictRequest) -> Dict[str, Any]:
#     try:
#         predictor = get_predictor()
#         return predictor.predict(req.from_stream, req.to_stream, req.marks)
#     except Exception as e:
#         print(f"Predict error: {e}")
#         return {"error": str(e), "probability": 0}


# @app.get("/exams/{stream}")
# def get_exams(stream: str) -> Dict[str, Any]:
#     from career import EXAMS
#     return {"exams": EXAMS.get(stream, [])}


# @app.get("/exam-details/{stream}/{exam}")
# def exam_details(stream: str, exam: str) -> Dict[str, Any]:
#     try:
#         rag = get_rag()
#         return rag.get_exam_details(exam, stream)
#     except Exception as e:
#         print(f"Exam details error: {e}")
#         return {"error": str(e)}


# @app.get("/nearby-coachings")
# def nearby_coachings(
#     exam: str   = Query(default="JEE Main"),
#     city: str   = Query(default=""),
#     lat:  float = Query(default=0.0),
#     lng:  float = Query(default=0.0),
# ) -> Dict[str, Any]:
#     try:
#         rag        = get_rag()
#         institutes = rag.get_nearby_coachings(exam, city, lat, lng)
#         return {"institutes": institutes, "city": city or "India"}
#     except Exception as e:
#         print(f"Nearby coachings error: {e}")
#         return {"institutes": [], "error": str(e)}


# @app.get("/analytics")
# def analytics() -> Dict[str, Any]:
#     try:
#         rag      = get_rag()
#         raw_data = cast(Dict[str, Any], rag.collection.get())
#         raw: List[Dict[str, Any]] = [
#             dict(m) for m in (raw_data.get("metadatas") or [])
#             if isinstance(m, dict)
#         ]
#         cities:  Dict[str, int] = {}
#         streams: Dict[str, int] = {}
#         for d in raw:
#             c = str(d.get("city",   "Unknown"))
#             s = str(d.get("course", "Unknown")).split()[0]
#             cities[c]  = cities.get(c,  0) + 1
#             streams[s] = streams.get(s, 0) + 1
#         return {"total": len(raw), "by_city": cities, "by_stream": streams}
#     except Exception as e:
#         print(f"Analytics error: {e}")
#         return {"error": str(e), "total": 0, "by_city": {}, "by_stream": {}}
    
# @app.get("/recommend-colleges")
# def recommend_colleges(
#     from_stream: str   = Query(default="Science"),
#     to_stream:   str   = Query(default="Engineering"),
#     hsc_marks:   int   = Query(default=75),
#     exam:        str   = Query(default="JEE Main"),
#     exam_marks:  float = Query(default=70),
#     city:        str   = Query(default=""),
#     limit:       int   = Query(default=10),
# ) -> Dict[str, Any]:
#     """
#     Recommend colleges the student can get admission in based on:
#     - HSC marks, entrance exam attempted and score/percentile
#     - Target stream and city preference
#     - Last year cutoffs and quota-wise eligibility
#     Returns colleges sorted by match probability (best first).
#     """
#     try:
#         rag = get_rag()
 
#         # Step 1: pull matching colleges from vector DB
#         query_text = f"{exam} {to_stream} {city} college admission cutoff"
#         raw_colleges = rag.retrieve(
#             query  = query_text,
#             city   = city,
#             stream = to_stream,
#             n      = max(limit * 2, 30),   # fetch extra so LLM can rank/filter
#         )
 
#         colleges = rag.recommend_by_cutoff(
#             from_stream = from_stream,
#             to_stream   = to_stream,
#             hsc_marks   = hsc_marks,
#             exam        = exam,
#             exam_marks  = exam_marks,
#             city        = city,
#             limit       = limit,
#             raw_colleges = raw_colleges,
#         )
#         return {"colleges": colleges, "count": len(colleges)}
#     except Exception as e:
#         print(f"Recommend colleges error: {e}")
#         return {"colleges": [], "error": str(e)}


from __future__ import annotations

import os
import json
from typing import List, Dict, Any, cast

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EduSwitch API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_rag       = None
_predictor = None


def get_rag():
    global _rag
    if _rag is None:
        print("⏳ Loading RAG system...")
        from rag import SwitchSmartRAG
        _rag = SwitchSmartRAG()
        print("✅ RAG system ready")
    return _rag


def get_predictor():
    global _predictor
    if _predictor is None:
        from career import CareerPredictor
        _predictor = CareerPredictor()
    return _predictor


# ── Pydantic models ────────────────────────────────────────────────────────────

class AdvisorRequest(BaseModel):
    query:  str
    city:   str = ""
    stream: str = ""


class PredictRequest(BaseModel):
    from_stream: str
    to_stream:   str
    marks:       int


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/advisor")
def advisor(req: AdvisorRequest) -> Dict[str, Any]:
    try:
        rag      = get_rag()
        colleges = rag.retrieve(req.query, req.city, req.stream)
        answer   = rag.generate_response(req.query, colleges)
        return {"answer": answer, "colleges": colleges}
    except Exception as e:
        print(f"Advisor error: {e}")
        return {"answer": f"Error: {str(e)}", "colleges": []}


@app.get("/colleges")
def search_colleges(
    query:  str = Query(default=""),
    city:   str = Query(default=""),
    stream: str = Query(default=""),
) -> Dict[str, Any]:
    try:
        rag      = get_rag()
        colleges = rag.retrieve(query, city, stream)
        return {"colleges": colleges}
    except Exception as e:
        print(f"College search error: {e}")
        return {"colleges": [], "error": str(e)}


@app.post("/predict")
def predict(req: PredictRequest) -> Dict[str, Any]:
    try:
        predictor = get_predictor()
        return predictor.predict(req.from_stream, req.to_stream, req.marks)
    except Exception as e:
        print(f"Predict error: {e}")
        return {"error": str(e), "probability": 0}


@app.get("/exams/{stream}")
def get_exams(stream: str) -> Dict[str, Any]:
    from career import EXAMS
    return {"exams": EXAMS.get(stream, [])}


@app.get("/exam-details/{stream}/{exam}")
def exam_details(stream: str, exam: str) -> Dict[str, Any]:
    try:
        rag = get_rag()
        return rag.get_exam_details(exam, stream)
    except Exception as e:
        print(f"Exam details error: {e}")
        return {"error": str(e)}


@app.get("/nearby-coachings")
def nearby_coachings(
    exam: str   = Query(default="JEE Main"),
    city: str   = Query(default=""),
    lat:  float = Query(default=0.0),
    lng:  float = Query(default=0.0),
) -> Dict[str, Any]:
    try:
        rag        = get_rag()
        institutes = rag.get_nearby_coachings(exam, city, lat, lng)
        return {"institutes": institutes, "city": city or "India"}
    except Exception as e:
        print(f"Nearby coachings error: {e}")
        return {"institutes": [], "error": str(e)}


@app.get("/analytics")
def analytics() -> Dict[str, Any]:
    try:
        import pandas as pd

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(BASE_DIR, "../data/final_merged_all_cities.csv")

        df = pd.read_csv(csv_path)

        cities  = df["City"].value_counts().to_dict()
        streams = df["Stream"].value_counts().to_dict()

        return {
            "total":     len(df),
            "by_city":   cities,
            "by_stream": streams,
        }
    except Exception as e:
        print(f"Analytics error: {e}")
        return {"error": str(e), "total": 0, "by_city": {}, "by_stream": {}}

@app.get("/recommend-colleges")
def recommend_colleges(
    from_stream: str   = Query(default="Science"),
    to_stream:   str   = Query(default="Engineering"),
    hsc_marks:   int   = Query(default=75),
    exam:        str   = Query(default="JEE Main"),
    exam_marks:  float = Query(default=70),
    city:        str   = Query(default=""),
    limit:       int   = Query(default=10),
) -> Dict[str, Any]:
    """
    Recommend colleges the student can get admission in based on:
    - HSC marks, entrance exam attempted and score/percentile
    - Target stream and city preference
    - Last year cutoffs and quota-wise eligibility
    Returns colleges sorted by match probability (best first).
    """
    try:
        rag = get_rag()

        # Step 1: pull matching colleges from vector DB
        query_text = f"{exam} {to_stream} {city} college admission cutoff"
        raw_colleges = rag.retrieve(
            query  = query_text,
            city   = city,
            stream = to_stream,
            n      = max(limit * 2, 30),  # fetch extra so LLM can rank/filter
        )

        # Step 2: LLM ranks and annotates with cutoff/quota info
        colleges = rag.recommend_by_cutoff(
            from_stream  = from_stream,
            to_stream    = to_stream,
            hsc_marks    = hsc_marks,
            exam         = exam,
            exam_marks   = exam_marks,
            city         = city,
            limit        = limit,
            raw_colleges = raw_colleges,
        )
        return {"colleges": colleges, "count": len(colleges)}
    except Exception as e:
        print(f"Recommend colleges error: {e}")
        return {"colleges": [], "error": str(e)}