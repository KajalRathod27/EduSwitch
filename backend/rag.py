# # # # # # # import chromadb
# # # # # # # import numpy as np
# # # # # # # from sentence_transformers import SentenceTransformer
# # # # # # # from rank_bm25 import BM25Okapi
# # # # # # # from groq import Groq
# # # # # # # import os

# # # # # # # class SwitchSmartRAG:
# # # # # # #     def __init__(self):
# # # # # # #         self.client = chromadb.PersistentClient(path="./chroma_db")
# # # # # # #         self.collection = self.client.get_collection("college_collection")
# # # # # # #         self.model = SentenceTransformer("all-MiniLM-L6-v2")
# # # # # # #         self.groq = Groq(api_key=os.getenv("GROQ_API_KEY"))

# # # # # # #         docs = self.collection.get()
# # # # # # #         self.metadata = docs["metadatas"]

# # # # # # #         corpus = [
# # # # # # #             f"{m.get('college_name','')} {m.get('course','')} {m.get('city','')} {m.get('facilities','')}"
# # # # # # #             for m in self.metadata
# # # # # # #         ]
# # # # # # #         tokenized = [doc.lower().split() for doc in corpus]
# # # # # # #         self.bm25 = BM25Okapi(tokenized)

# # # # # # #     def retrieve(self, query: str, city: str = "", stream: str = "", n=10):
# # # # # # #         if not query:
# # # # # # #             query = "college"

# # # # # # #         embedding = self.model.encode(query).tolist()
# # # # # # #         semantic = self.collection.query(query_embeddings=[embedding], n_results=n)
# # # # # # #         semantic_results = semantic["metadatas"][0]

# # # # # # #         scores = self.bm25.get_scores(query.lower().split())
# # # # # # #         top = np.argsort(scores)[::-1][:n]
# # # # # # #         keyword = [self.metadata[i] for i in top]

# # # # # # #         combined = semantic_results + keyword
# # # # # # #         unique = {c["college_name"]: c for c in combined}
# # # # # # #         results = list(unique.values())

# # # # # # #         filtered = []
# # # # # # #         for c in results:
# # # # # # #             if city and c.get("city", "").lower() != city.lower():
# # # # # # #                 continue
# # # # # # #             if stream and stream.lower() not in c.get("course", "").lower():
# # # # # # #                 continue
# # # # # # #             filtered.append(c)

# # # # # # #         return filtered[:n]

# # # # # # #     def generate_response(self, query: str, colleges: list) -> str:
# # # # # # #         if not colleges:
# # # # # # #             return "No colleges found matching your criteria."

# # # # # # #         context = ""
# # # # # # #         for c in colleges[:5]:
# # # # # # #             context += f"""
# # # # # # # - {c.get('college_name')} | {c.get('course')} | {c.get('city')}
# # # # # # #   Facilities: {c.get('facilities')}
# # # # # # # """

# # # # # # #         prompt = f"""You are EduSwitch, an expert academic advisor helping students switch career paths.

# # # # # # # Student question: {query}

# # # # # # # Relevant colleges:
# # # # # # # {context}

# # # # # # # Provide a structured response with:
# # # # # # # 1. **Career Switch Advice**: Is this switch feasible? What are the pros/cons?
# # # # # # # 2. **Steps to Switch**: Concrete action plan (3-5 steps)
# # # # # # # 3. **Top College Recommendations**: From the list above, recommend 3 best fits with reasons
# # # # # # # 4. **Timeline**: Realistic timeline for the transition

# # # # # # # Be encouraging, specific, and practical. Use the student's query context.
# # # # # # # """

# # # # # # #         response = self.groq.chat.completions.create(
# # # # # # #             model="llama-3.1-8b-instant",
# # # # # # #             messages=[{"role": "user", "content": prompt}],
# # # # # # #             max_tokens=1000
# # # # # # #         )
# # # # # # #         return response.choices[0].message.content

# # # # # # from __future__ import annotations

# # # # # # import os
# # # # # # import numpy as np
# # # # # # from typing import List, Dict, Any

# # # # # # import chromadb
# # # # # # from sentence_transformers import SentenceTransformer
# # # # # # from rank_bm25 import BM25Okapi
# # # # # # from groq import Groq


# # # # # # class SwitchSmartRAG:

# # # # # #     def __init__(self) -> None:

# # # # # #         self.client: chromadb.ClientAPI = chromadb.PersistentClient(path="./chroma_db")
# # # # # #         self.collection = self.client.get_collection("college_collection")
# # # # # #         self.embed_model: SentenceTransformer = SentenceTransformer("all-MiniLM-L6-v2")
# # # # # #         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# # # # # #         raw = self.collection.get()
# # # # # #         self.metadata: List[Dict[str, Any]] = raw["metadatas"] or []   # fixes self.metadata error

# # # # # #         corpus: List[str] = [
# # # # # #             " ".join([
# # # # # #                 str(m.get("college_name", "")),
# # # # # #                 str(m.get("course", "")),
# # # # # #                 str(m.get("city", "")),
# # # # # #                 str(m.get("facilities", "")),
# # # # # #             ])
# # # # # #             for m in self.metadata
# # # # # #         ]

# # # # # #         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]   # fixes .lower() / .split()
# # # # # #         self.bm25: BM25Okapi = BM25Okapi(tokenized)


# # # # # #     def retrieve(
# # # # # #         self,
# # # # # #         query: str,
# # # # # #         city: str = "",
# # # # # #         stream: str = "",
# # # # # #         n: int = 10,
# # # # # #     ) -> List[Dict[str, Any]]:

# # # # # #         if not query.strip():
# # # # # #             query = "college"

# # # # # #         # --- semantic search ---
# # # # # #         embedding: List[float] = self.embed_model.encode(query).tolist()   # fixes .tolist()

# # # # # #         semantic_raw = self.collection.query(
# # # # # #             query_embeddings=[embedding],
# # # # # #             n_results=min(n, len(self.metadata)) or 1,
# # # # # #         )
# # # # # #         # semantic_raw["metadatas"] is List[List[Dict]]
# # # # # #         semantic_results: List[Dict[str, Any]] = semantic_raw["metadatas"][0]   # fixes semantic[] error

# # # # # #         # --- BM25 keyword search ---
# # # # # #         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
# # # # # #         top_idx = np.argsort(scores)[::-1][:n]
# # # # # #         keyword_results: List[Dict[str, Any]] = [self.metadata[i] for i in top_idx]

# # # # # #         # --- merge & deduplicate ---
# # # # # #         combined = semantic_results + keyword_results
# # # # # #         unique: Dict[str, Dict[str, Any]] = {
# # # # # #             c.get("college_name", str(idx)): c
# # # # # #             for idx, c in enumerate(combined)
# # # # # #         }
# # # # # #         results = list(unique.values())

# # # # # #         # --- filter ---
# # # # # #         filtered: List[Dict[str, Any]] = []
# # # # # #         for c in results:
# # # # # #             if city   and str(c.get("city",   "")).lower() != city.lower():
# # # # # #                 continue
# # # # # #             if stream and stream.lower() not in str(c.get("course", "")).lower():
# # # # # #                 continue
# # # # # #             filtered.append(c)

# # # # # #         return filtered[:n]


# # # # # #     def generate_response(self, query: str, colleges: List[Dict[str, Any]]) -> str:

# # # # # #         if not colleges:
# # # # # #             return "No colleges found matching your criteria."

# # # # # #         context_lines: List[str] = []
# # # # # #         for c in colleges[:5]:
# # # # # #             context_lines.append(
# # # # # #                 f"• {c.get('college_name')} | {c.get('course')} | {c.get('city')}\n"
# # # # # #                 f"  Facilities: {c.get('facilities')}"
# # # # # #             )
# # # # # #         context: str = "\n".join(context_lines)

# # # # # #         prompt = (
# # # # # #             "You are EduSwitch, an expert academic advisor helping students switch career paths.\n\n"
# # # # # #             f"Student question: {query}\n\n"
# # # # # #             f"Relevant colleges:\n{context}\n\n"
# # # # # #             "Provide a structured response with:\n"
# # # # # #             "1. **Career Switch Advice** – Is this switch feasible?\n"
# # # # # #             "2. **Steps to Switch** – Concrete 3-5 step action plan\n"
# # # # # #             "3. **Top College Recommendations** – 3 best fits with reasons\n"
# # # # # #             "4. **Timeline** – Realistic timeline\n"
# # # # # #         )

# # # # # #         completion = self.groq_client.chat.completions.create(
# # # # # #             model="llama-3.1-8b-instant",
# # # # # #             messages=[{"role": "user", "content": prompt}],
# # # # # #             max_tokens=1000,
# # # # # #         )

# # # # # #         # fixes response.choices / .message.content errors
# # # # # #         return str(completion.choices[0].message.content)

# # # # # from __future__ import annotations

# # # # # import os
# # # # # import numpy as np
# # # # # from typing import List, Dict, Any, cast

# # # # # import chromadb
# # # # # from chromadb import Collection
# # # # # from chromadb.api import ClientAPI   
# # # # # from sentence_transformers import SentenceTransformer
# # # # # from rank_bm25 import BM25Okapi
# # # # # from groq import Groq


# # # # # class SwitchSmartRAG:

# # # # #     def __init__(self) -> None:

# # # # #         # ✅ Fix 1: cast PersistentClient to ClientAPI so linter resolves it
# # # # #         self.client: ClientAPI = cast(ClientAPI, chromadb.PersistentClient(path="./chroma_db"))

# # # # #         self.collection: Collection = self.client.get_collection("college_collection")

# # # # #         self.embed_model: SentenceTransformer = SentenceTransformer("all-MiniLM-L6-v2")
# # # # #         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# # # # #         # ✅ Fix 2: cast collection.get() result so ["metadatas"] is resolved
# # # # #         raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
# # # # #         metadatas_raw: Any       = raw_data.get("metadatas") or []

# # # # #         # ✅ Fix 3: explicit list comprehension cast instead of direct assignment
# # # # #         self.metadata: List[Dict[str, Any]] = [
# # # # #             dict(m) for m in metadatas_raw if isinstance(m, dict)
# # # # #         ]

# # # # #         corpus: List[str] = [
# # # # #             " ".join([
# # # # #                 str(m.get("college_name", "")),
# # # # #                 str(m.get("course",       "")),
# # # # #                 str(m.get("city",         "")),
# # # # #                 str(m.get("facilities",   "")),
# # # # #             ])
# # # # #             for m in self.metadata
# # # # #         ]

# # # # #         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
# # # # #         self.bm25: BM25Okapi       = BM25Okapi(tokenized)


# # # # #     def retrieve(
# # # # #         self,
# # # # #         query:  str,
# # # # #         city:   str = "",
# # # # #         stream: str = "",
# # # # #         n:      int = 10,
# # # # #     ) -> List[Dict[str, Any]]:

# # # # #         if not query.strip():
# # # # #             query = "college"

# # # # #         # --- semantic search ---
# # # # #         embedding: List[float] = self.embed_model.encode(query).tolist()

# # # # #         n_results = max(1, min(n, len(self.metadata)))

# # # # #         # ✅ Fix 4: cast query() result so ["metadatas"][0] resolves cleanly
# # # # #         query_result: Dict[str, Any] = cast(
# # # # #             Dict[str, Any],
# # # # #             self.collection.query(
# # # # #                 query_embeddings=[embedding],
# # # # #                 n_results=n_results,
# # # # #             )
# # # # #         )

# # # # #         metadatas_field: Any              = query_result.get("metadatas") or [[]]
# # # # #         semantic_results: List[Dict[str, Any]] = [
# # # # #             dict(m) for m in (metadatas_field[0] if metadatas_field else [])
# # # # #             if isinstance(m, dict)
# # # # #         ]

# # # # #         # --- BM25 ---
# # # # #         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
# # # # #         top_idx            = np.argsort(scores)[::-1][:n]
# # # # #         keyword_results: List[Dict[str, Any]] = [self.metadata[int(i)] for i in top_idx]

# # # # #         # --- merge & deduplicate ---
# # # # #         combined = semantic_results + keyword_results
# # # # #         unique: Dict[str, Dict[str, Any]] = {}
# # # # #         for idx, c in enumerate(combined):
# # # # #             key = str(c.get("college_name", idx))
# # # # #             if key not in unique:
# # # # #                 unique[key] = c

# # # # #         # --- filter ---
# # # # #         filtered: List[Dict[str, Any]] = []
# # # # #         for c in unique.values():
# # # # #             if city   and str(c.get("city",   "")).lower() != city.lower():
# # # # #                 continue
# # # # #             if stream and stream.lower() not in str(c.get("course", "")).lower():
# # # # #                 continue
# # # # #             filtered.append(c)

# # # # #         return filtered[:n]


# # # # #     def generate_response(self, query: str, colleges: List[Dict[str, Any]]) -> str:

# # # # #         if not colleges:
# # # # #             return "No colleges found matching your criteria."

# # # # #         context_lines: List[str] = [
# # # # #             f"• {c.get('college_name')} | {c.get('course')} | {c.get('city')}\n"
# # # # #             f"  Facilities: {c.get('facilities')}"
# # # # #             for c in colleges[:5]
# # # # #         ]
# # # # #         context = "\n".join(context_lines)

# # # # #         prompt = (
# # # # #             "You are EduSwitch, an expert academic advisor.\n\n"
# # # # #             f"Student question: {query}\n\n"
# # # # #             f"Relevant colleges:\n{context}\n\n"
# # # # #             "Provide:\n"
# # # # #             "1. **Career Switch Advice**\n"
# # # # #             "2. **Steps to Switch** (3-5 steps)\n"
# # # # #             "3. **Top College Recommendations**\n"
# # # # #             "4. **Timeline**\n"
# # # # #         )

# # # # #         completion = self.groq_client.chat.completions.create(
# # # # #             model="llama-3.1-8b-instant",
# # # # #             messages=[{"role": "user", "content": prompt}],
# # # # #             max_tokens=1000,
# # # # #         )

# # # # #         return str(completion.choices[0].message.content)

# # # # from __future__ import annotations

# # # # import os
# # # # import torch
# # # # import numpy as np
# # # # from typing import List, Dict, Any, cast

# # # # torch.set_num_threads(1)  # prevents CPU freeze on Windows

# # # # import chromadb
# # # # from chromadb import Collection
# # # # from sentence_transformers import SentenceTransformer
# # # # from rank_bm25 import BM25Okapi
# # # # from groq import Groq


# # # # class SwitchSmartRAG:

# # # #     def __init__(self) -> None:

# # # #         self.client: Any = chromadb.PersistentClient(path="./chroma_db")
# # # #         self.collection: Collection = self.client.get_collection("college_collection")

# # # #         print("✅ ChromaDB connected")

# # # #         self.embed_model: SentenceTransformer = SentenceTransformer(
# # # #             "all-MiniLM-L6-v2",
# # # #             device="cpu"
# # # #         )
# # # #         print("✅ Embedding model loaded")

# # # #         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# # # #         # Load metadata
# # # #         raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
# # # #         metadatas_raw: Any = raw_data.get("metadatas") or []
# # # #         self.metadata: List[Dict[str, Any]] = [
# # # #             dict(m) for m in metadatas_raw if isinstance(m, dict)
# # # #         ]
# # # #         print(f"✅ Loaded {len(self.metadata)} college records")

# # # #         # Build BM25 index
# # # #         corpus: List[str] = [
# # # #             " ".join([
# # # #                 str(m.get("college_name", "")),
# # # #                 str(m.get("course",       "")),
# # # #                 str(m.get("city",         "")),
# # # #                 str(m.get("facilities",   "")),
# # # #             ])
# # # #             for m in self.metadata
# # # #         ]
# # # #         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
# # # #         self.bm25: BM25Okapi = BM25Okapi(tokenized)
# # # #         print("✅ BM25 index built — RAG ready")


# # # #     def retrieve(
# # # #         self,
# # # #         query:  str,
# # # #         city:   str = "",
# # # #         stream: str = "",
# # # #         n:      int = 10,
# # # #     ) -> List[Dict[str, Any]]:

# # # #         if not query.strip():
# # # #             query = "college"

# # # #         # Semantic search
# # # #         embedding: List[float] = self.embed_model.encode(
# # # #             query, convert_to_numpy=True
# # # #         ).tolist()

# # # #         n_results = max(1, min(n, len(self.metadata)))

# # # #         query_result: Dict[str, Any] = cast(
# # # #             Dict[str, Any],
# # # #             self.collection.query(
# # # #                 query_embeddings=[embedding],
# # # #                 n_results=n_results,
# # # #             )
# # # #         )

# # # #         metadatas_field: Any = query_result.get("metadatas") or [[]]
# # # #         semantic_results: List[Dict[str, Any]] = [
# # # #             dict(m)
# # # #             for m in (metadatas_field[0] if metadatas_field else [])
# # # #             if isinstance(m, dict)
# # # #         ]

# # # #         # BM25 keyword search
# # # #         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
# # # #         top_idx = np.argsort(scores)[::-1][:n]
# # # #         keyword_results: List[Dict[str, Any]] = [
# # # #             self.metadata[int(i)] for i in top_idx
# # # #         ]

# # # #         # Merge and deduplicate
# # # #         combined = semantic_results + keyword_results
# # # #         unique: Dict[str, Dict[str, Any]] = {}
# # # #         for idx, c in enumerate(combined):
# # # #             key = str(c.get("college_name", str(idx)))
# # # #             if key not in unique:
# # # #                 unique[key] = c

# # # #         # Filter by city and stream
# # # #         filtered: List[Dict[str, Any]] = []
# # # #         for c in unique.values():
# # # #             if city and str(c.get("city", "")).lower() != city.lower():
# # # #                 continue
# # # #             if stream and stream.lower() not in str(c.get("course", "")).lower():
# # # #                 continue
# # # #             filtered.append(c)

# # # #         return filtered[:n]


# # # #     def generate_response(
# # # #         self,
# # # #         query:    str,
# # # #         colleges: List[Dict[str, Any]],
# # # #     ) -> str:

# # # #         if not colleges:
# # # #             return "No colleges found matching your criteria."

# # # #         context_lines: List[str] = [
# # # #             f"• {c.get('college_name')} | {c.get('course')} | {c.get('city')}\n"
# # # #             f"  Facilities: {c.get('facilities')}"
# # # #             for c in colleges[:5]
# # # #         ]
# # # #         context = "\n".join(context_lines)

# # # #         prompt = (
# # # #             "You are EduSwitch, an expert academic advisor helping Indian students switch careers.\n\n"
# # # #             f"Student question: {query}\n\n"
# # # #             f"Relevant colleges:\n{context}\n\n"
# # # #             "Provide a structured response with:\n"
# # # #             "1. **Career Switch Advice** - Is this feasible?\n"
# # # #             "2. **Steps to Switch** - 3 to 5 concrete steps\n"
# # # #             "3. **Top College Recommendations** - 3 best fits with reasons\n"
# # # #             "4. **Timeline** - Realistic timeline\n"
# # # #         )

# # # #         try:
# # # #             completion = self.groq_client.chat.completions.create(
# # # #                 model="llama-3.1-8b-instant",
# # # #                 messages=[{"role": "user", "content": prompt}],
# # # #                 max_tokens=1000,
# # # #             )
# # # #             return str(completion.choices[0].message.content)
# # # #         except Exception as e:
# # # #             return f"AI response error: {str(e)}"

# # # from __future__ import annotations

# # # import os
# # # import torch
# # # import numpy as np
# # # from typing import List, Dict, Any, cast

# # # torch.set_num_threads(1)

# # # import chromadb
# # # from chromadb import Collection
# # # from sentence_transformers import SentenceTransformer
# # # from rank_bm25 import BM25Okapi
# # # from groq import Groq


# # # class SwitchSmartRAG:

# # #     def __init__(self) -> None:
# # #         self.client: Any = chromadb.PersistentClient(path="./chroma_db")
# # #         self.collection: Collection = self.client.get_collection("college_collection")
# # #         print("✅ ChromaDB connected")

# # #         self.embed_model: SentenceTransformer = SentenceTransformer(
# # #             "all-MiniLM-L6-v2", device="cpu"
# # #         )
# # #         print("✅ Embedding model loaded")

# # #         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# # #         raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
# # #         metadatas_raw: Any = raw_data.get("metadatas") or []
# # #         self.metadata: List[Dict[str, Any]] = [
# # #             dict(m) for m in metadatas_raw if isinstance(m, dict)
# # #         ]
# # #         print(f"✅ Loaded {len(self.metadata)} college records")

# # #         corpus: List[str] = [
# # #             " ".join([
# # #                 str(m.get("college_name", "")),
# # #                 str(m.get("course",       "")),
# # #                 str(m.get("city",         "")),
# # #                 str(m.get("facilities",   "")),
# # #             ])
# # #             for m in self.metadata
# # #         ]
# # #         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
# # #         self.bm25: BM25Okapi = BM25Okapi(tokenized)
# # #         print("✅ BM25 index built — RAG ready")


# # #     def retrieve(
# # #         self,
# # #         query:  str,
# # #         city:   str = "",
# # #         stream: str = "",
# # #         n:      int = 10,
# # #     ) -> List[Dict[str, Any]]:

# # #         if not query.strip():
# # #             query = "college"

# # #         embedding: List[float] = self.embed_model.encode(
# # #             query, convert_to_numpy=True
# # #         ).tolist()

# # #         n_results = max(1, min(n, len(self.metadata)))

# # #         query_result: Dict[str, Any] = cast(
# # #             Dict[str, Any],
# # #             self.collection.query(
# # #                 query_embeddings=[embedding],
# # #                 n_results=n_results,
# # #             )
# # #         )

# # #         metadatas_field: Any = query_result.get("metadatas") or [[]]
# # #         semantic_results: List[Dict[str, Any]] = [
# # #             dict(m)
# # #             for m in (metadatas_field[0] if metadatas_field else [])
# # #             if isinstance(m, dict)
# # #         ]

# # #         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
# # #         top_idx = np.argsort(scores)[::-1][:n]
# # #         keyword_results: List[Dict[str, Any]] = [
# # #             self.metadata[int(i)] for i in top_idx
# # #         ]

# # #         combined = semantic_results + keyword_results
# # #         unique: Dict[str, Dict[str, Any]] = {}
# # #         for idx, c in enumerate(combined):
# # #             key = str(c.get("college_name", str(idx)))
# # #             if key not in unique:
# # #                 unique[key] = c

# # #         filtered: List[Dict[str, Any]] = []
# # #         for c in unique.values():
# # #             if city   and str(c.get("city",   "")).lower() != city.lower():
# # #                 continue
# # #             if stream and stream.lower() not in str(c.get("course", "")).lower():
# # #                 continue
# # #             filtered.append(c)

# # #         return filtered[:n]


# # #     def generate_response(
# # #         self,
# # #         query:    str,
# # #         colleges: List[Dict[str, Any]],
# # #     ) -> str:

# # #         # ✅ Build college context from YOUR dataset
# # #         if colleges:
# # #             college_lines = [
# # #                 f"• {c.get('college_name')} | {c.get('course')} | "
# # #                 f"{c.get('city')} | {c.get('ownership','')}\n"
# # #                 f"  Facilities: {c.get('facilities','')}"
# # #                 for c in colleges[:5]
# # #             ]
# # #             context = "\n".join(college_lines)
# # #         else:
# # #             context = "No specific colleges found in database."

# # #         # ✅ Updated prompt with Skills + Bridge Courses sections
# # #         prompt = f"""You are EduSwitch, an expert Indian academic and career advisor.

# # # Student question: {query}

# # # Colleges from our database:
# # # {context}

# # # Give a detailed structured response with ALL these sections:

# # # 1. **Career Switch Advice**
# # #    - Is this switch feasible?
# # #    - Pros and cons of this transition

# # # 2. **Skills Required**
# # #    - List 5-8 key technical and soft skills needed for this career switch
# # #    - Rate each skill importance: High / Medium / Low

# # # 3. **Bridge Courses**
# # #    - List 3-5 bridge courses or certifications to fill knowledge gaps
# # #    - Mention if available online or offline
# # #    - Approximate duration of each

# # # 4. **Steps to Switch**
# # #    - Concrete 4-5 step action plan with timeline

# # # 5. **Top College Recommendations**
# # #    - Recommend 3 colleges from the database above with specific reasons
# # #    - Mention course, city, and why it suits this student

# # # 6. **Timeline**
# # #    - Realistic month-by-month timeline for the full transition

# # # Be specific, practical, and encouraging. Focus on Indian education system."""

# # #         try:
# # #             completion = self.groq_client.chat.completions.create(
# # #                 model="llama-3.1-8b-instant",
# # #                 messages=[{"role": "user", "content": prompt}],
# # #                 max_tokens=1500,
# # #             )
# # #             return str(completion.choices[0].message.content)
# # #         except Exception as e:
# # #             return f"AI response error: {str(e)}"


# # #     # ✅ NEW: Entrance exam details from Groq
# # #     def get_exam_details(self, exam_name: str, stream: str) -> Dict[str, Any]:
# # #     prompt = f"""You are an expert on Indian entrance exams with deep knowledge of all coaching institutes, YouTube channels, and online resources.

# # # Generate complete, accurate details for the {exam_name} entrance exam (stream: {stream}).

# # # Return ONLY a valid JSON object. No markdown, no backticks, no preamble.

# # # The JSON must follow this exact structure — fill every field with REAL data specific to {exam_name}:

# # # {{
# # #   "exam_name": "{exam_name}",
# # #   "full_form": "actual full form",
# # #   "conducting_body": "actual conducting body",
# # #   "eligibility": "actual eligibility criteria",
# # #   "exam_pattern": "actual pattern: sections, questions, marks, duration, negative marking",
# # #   "important_dates": "actual months when exam is typically held",

# # #   "subjects": [
# # #     {{
# # #       "name": "subject name (e.g. Physics)",
# # #       "color": "purple",
# # #       "topics": [
# # #         {{
# # #           "chapter": "chapter name",
# # #           "concepts": ["concept1", "concept2", "concept3", "concept4"]
# # #         }}
# # #       ]
# # #     }}
# # #   ],

# # #   "youtube_resources": [
# # #     {{
# # #       "subject": "subject name",
# # #       "channels": [
# # #         {{
# # #           "channel": "real channel name",
# # #           "playlist": "specific playlist or series name for {exam_name}",
# # #           "url": "real youtube channel or playlist URL",
# # #           "subscribers": "approximate subscriber count"
# # #         }}
# # #       ]
# # #     }}
# # #   ],

# # #   "top_coachings": [
# # #     {{
# # #       "name": "real institute name",
# # #       "cities": ["city1", "city2", "city3"],
# # #       "fees_1yr": "amount range in INR",
# # #       "fees_2yr": "amount range in INR",
# # #       "crash_course_fees": "amount in INR",
# # #       "tenure_options": ["option1", "option2"],
# # #       "online_available": true,
# # #       "online_platform": "name of online platform",
# # #       "online_url": "real website URL",
# # #       "highlights": ["highlight1", "highlight2", "highlight3"],
# # #       "rating": "rating out of 5",
# # #       "website": "real website URL"
# # #     }}
# # #   ],

# # #   "useful_websites": [
# # #     {{
# # #       "name": "site name",
# # #       "url": "real URL",
# # #       "description": "what this site offers for {exam_name} preparation"
# # #     }}
# # #   ],

# # #   "preparation_tips": ["specific tip1", "specific tip2", "specific tip3", "specific tip4"]
# # # }}

# # # Rules:
# # # - subjects array must have ALL subjects tested in {exam_name} (e.g. JEE has Physics, Chemistry, Maths; NEET has Physics, Chemistry, Biology)
# # # - each subject must have at least 6 topics, each topic must have at least 4 concepts
# # # - youtube_resources must have one entry per subject, each with at least 3 real YouTube channels that are known for {exam_name} preparation
# # # - top_coachings must list at least 4 real institutes known for {exam_name}
# # # - all URLs must be real, working URLs — no placeholders like "https://youtube.com/..."
# # # - fees must be realistic INR amounts for 2024-25
# # # - do NOT invent data — only include institutes, channels, and websites that actually exist for {exam_name}"""

# # #     try:
# # #         completion = self.groq_client.chat.completions.create(
# # #             model="llama-3.1-8b-instant",
# # #             messages=[{"role": "user", "content": prompt}],
# # #             max_tokens=3000,
# # #         )
# # #         import json
# # #         raw = str(completion.choices[0].message.content).strip()
# # #         # strip any accidental markdown fences
# # #         if raw.startswith("```"):
# # #             raw = raw.split("```")[1]
# # #             if raw.startswith("json"):
# # #                 raw = raw[4:]
# # #         return json.loads(raw.strip())
# # #     except Exception as e:
# # #         return {
# # #             "exam_name": exam_name,
# # #             "error": str(e),
# # #             "subjects": [],
# # #             "youtube_resources": [],
# # #             "top_coachings": [],
# # #             "useful_websites": [],
# # #             "preparation_tips": []
# # #         }

# # from __future__ import annotations

# # import os
# # import json
# # import torch
# # import numpy as np
# # from typing import List, Dict, Any, cast

# # torch.set_num_threads(1)

# # import chromadb
# # from chromadb import Collection
# # from sentence_transformers import SentenceTransformer
# # from rank_bm25 import BM25Okapi
# # from groq import Groq


# # class SwitchSmartRAG:

# #     def __init__(self) -> None:
# #         self.client: Any = chromadb.PersistentClient(path="./chroma_db")
# #         self.collection: Collection = self.client.get_collection("college_collection")
# #         print("✅ ChromaDB connected")

# #         self.embed_model: SentenceTransformer = SentenceTransformer(
# #             "all-MiniLM-L6-v2", device="cpu"
# #         )
# #         print("✅ Embedding model loaded")

# #         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

# #         raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
# #         metadatas_raw: Any = raw_data.get("metadatas") or []
# #         self.metadata: List[Dict[str, Any]] = [
# #             dict(m) for m in metadatas_raw if isinstance(m, dict)
# #         ]
# #         print(f"✅ Loaded {len(self.metadata)} college records")

# #         corpus: List[str] = [
# #             " ".join([
# #                 str(m.get("college_name", "")),
# #                 str(m.get("course",       "")),
# #                 str(m.get("city",         "")),
# #                 str(m.get("facilities",   "")),
# #             ])
# #             for m in self.metadata
# #         ]
# #         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
# #         self.bm25: BM25Okapi = BM25Okapi(tokenized)
# #         print("✅ BM25 index built — RAG ready")


# #     def retrieve(
# #         self,
# #         query:  str,
# #         city:   str = "",
# #         stream: str = "",
# #         n:      int = 10,
# #     ) -> List[Dict[str, Any]]:

# #         if not query.strip():
# #             query = "college"

# #         embedding: List[float] = self.embed_model.encode(
# #             query, convert_to_numpy=True
# #         ).tolist()

# #         n_results = max(1, min(n, len(self.metadata)))

# #         query_result: Dict[str, Any] = cast(
# #             Dict[str, Any],
# #             self.collection.query(
# #                 query_embeddings=[embedding],
# #                 n_results=n_results,
# #             )
# #         )

# #         metadatas_field: Any = query_result.get("metadatas") or [[]]
# #         semantic_results: List[Dict[str, Any]] = [
# #             dict(m)
# #             for m in (metadatas_field[0] if metadatas_field else [])
# #             if isinstance(m, dict)
# #         ]

# #         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
# #         top_idx = np.argsort(scores)[::-1][:n]
# #         keyword_results: List[Dict[str, Any]] = [
# #             self.metadata[int(i)] for i in top_idx
# #         ]

# #         combined = semantic_results + keyword_results
# #         unique: Dict[str, Dict[str, Any]] = {}
# #         for idx, c in enumerate(combined):
# #             key = str(c.get("college_name", str(idx)))
# #             if key not in unique:
# #                 unique[key] = c

# #         filtered: List[Dict[str, Any]] = []
# #         for c in unique.values():
# #             if city   and str(c.get("city",   "")).lower() != city.lower():
# #                 continue
# #             if stream and stream.lower() not in str(c.get("course", "")).lower():
# #                 continue
# #             filtered.append(c)

# #         return filtered[:n]


# #     def generate_response(
# #         self,
# #         query:    str,
# #         colleges: List[Dict[str, Any]],
# #     ) -> str:

# #         if colleges:
# #             college_lines = [
# #                 f"• {c.get('college_name')} | {c.get('course')} | "
# #                 f"{c.get('city')} | {c.get('ownership','')}\n"
# #                 f"  Facilities: {c.get('facilities','')}"
# #                 for c in colleges[:5]
# #             ]
# #             context = "\n".join(college_lines)
# #         else:
# #             context = "No specific colleges found in database."

# #         prompt = f"""You are EduSwitch, an expert Indian academic and career advisor.

# # Student question: {query}

# # Colleges from our database:
# # {context}

# # Give a detailed structured response with ALL these sections:

# # 1. **Career Switch Advice**
# #    - Is this switch feasible?
# #    - Pros and cons of this transition

# # 2. **Skills Required**
# #    - List 5-8 key technical and soft skills needed for this career switch
# #    - Rate each skill importance: High / Medium / Low

# # 3. **Bridge Courses**
# #    - List 3-5 bridge courses or certifications to fill knowledge gaps
# #    - Mention if available online or offline
# #    - Approximate duration of each

# # 4. **Steps to Switch**
# #    - Concrete 4-5 step action plan with timeline

# # 5. **Top College Recommendations**
# #    - Recommend 3 colleges from the database above with specific reasons
# #    - Mention course, city, and why it suits this student

# # 6. **Timeline**
# #    - Realistic month-by-month timeline for the full transition

# # Be specific, practical, and encouraging. Focus on Indian education system."""

# #         try:
# #             completion = self.groq_client.chat.completions.create(
# #                 model="llama-3.1-8b-instant",
# #                 messages=[{"role": "user", "content": prompt}],
# #                 max_tokens=1500,
# #             )
# #             return str(completion.choices[0].message.content)
# #         except Exception as e:
# #             return f"AI response error: {str(e)}"


# #     def get_exam_details(self, exam_name: str, stream: str) -> Dict[str, Any]:
# #         prompt = f"""You are an expert on Indian entrance exams with deep knowledge of all coaching institutes, YouTube channels, and online resources.

# # Generate complete, accurate details for the {exam_name} entrance exam (stream: {stream}).

# # Return ONLY a valid JSON object. No markdown, no backticks, no preamble.

# # The JSON must follow this exact structure — fill every field with REAL data specific to {exam_name}:

# # {{
# #   "exam_name": "{exam_name}",
# #   "full_form": "actual full form",
# #   "conducting_body": "actual conducting body",
# #   "eligibility": "actual eligibility criteria",
# #   "exam_pattern": "actual pattern: sections, questions, marks, duration, negative marking",
# #   "important_dates": "actual months when exam is typically held",

# #   "subjects": [
# #     {{
# #       "name": "subject name (e.g. Physics)",
# #       "color": "purple",
# #       "topics": [
# #         {{
# #           "chapter": "chapter name",
# #           "concepts": ["concept1", "concept2", "concept3", "concept4"]
# #         }}
# #       ]
# #     }}
# #   ],

# #   "youtube_resources": [
# #     {{
# #       "subject": "subject name",
# #       "channels": [
# #         {{
# #           "channel": "real channel name",
# #           "playlist": "specific playlist or series name for {exam_name}",
# #           "url": "real youtube channel or playlist URL",
# #           "subscribers": "approximate subscriber count"
# #         }}
# #       ]
# #     }}
# #   ],

# #   "top_coachings": [
# #     {{
# #       "name": "real institute name",
# #       "cities": ["city1", "city2", "city3"],
# #       "fees_1yr": "amount range in INR",
# #       "fees_2yr": "amount range in INR",
# #       "crash_course_fees": "amount in INR",
# #       "tenure_options": ["option1", "option2"],
# #       "online_available": true,
# #       "online_platform": "name of online platform",
# #       "online_url": "real website URL",
# #       "highlights": ["highlight1", "highlight2", "highlight3"],
# #       "rating": "rating out of 5",
# #       "website": "real website URL"
# #     }}
# #   ],

# #   "useful_websites": [
# #     {{
# #       "name": "site name",
# #       "url": "real URL",
# #       "description": "what this site offers for {exam_name} preparation"
# #     }}
# #   ],

# #   "preparation_tips": ["specific tip1", "specific tip2", "specific tip3", "specific tip4"]
# # }}

# # Rules:
# # - subjects array must have ALL subjects tested in {exam_name} (e.g. JEE has Physics, Chemistry, Maths; NEET has Physics, Chemistry, Biology)
# # - each subject must have at least 6 topics, each topic must have at least 4 concepts
# # - youtube_resources must have one entry per subject, each with at least 3 real YouTube channels that are known for {exam_name} preparation
# # - top_coachings must list at least 4 real institutes known for {exam_name}
# # - all URLs must be real, working URLs — no placeholders like "https://youtube.com/..."
# # - fees must be realistic INR amounts for 2024-25
# # - do NOT invent data — only include institutes, channels, and websites that actually exist for {exam_name}"""

# #         try:
# #             completion = self.groq_client.chat.completions.create(
# #                 model="llama-3.1-8b-instant",
# #                 messages=[{"role": "user", "content": prompt}],
# #                 max_tokens=3000,
# #             )
# #             raw = str(completion.choices[0].message.content).strip()
# #             if raw.startswith("```"):
# #                 raw = raw.split("```")[1]
# #                 if raw.startswith("json"):
# #                     raw = raw[4:]
# #             return json.loads(raw.strip())
# #         except Exception as e:
# #             return {
# #                 "exam_name": exam_name,
# #                 "error": str(e),
# #                 "subjects": [],
# #                 "youtube_resources": [],
# #                 "top_coachings": [],
# #                 "useful_websites": [],
# #                 "preparation_tips": []
# #             }

# from __future__ import annotations

# import os
# import json
# import torch
# import numpy as np
# from typing import List, Dict, Any, cast

# torch.set_num_threads(1)

# import chromadb
# from chromadb import Collection
# from sentence_transformers import SentenceTransformer
# from rank_bm25 import BM25Okapi
# from groq import Groq


# class SwitchSmartRAG:

#     def __init__(self) -> None:
#         self.client: Any = chromadb.PersistentClient(path="./chroma_db")
#         self.collection: Collection = self.client.get_collection("college_collection")
#         print("✅ ChromaDB connected")

#         self.embed_model: SentenceTransformer = SentenceTransformer(
#             "all-MiniLM-L6-v2", device="cpu"
#         )
#         print("✅ Embedding model loaded")

#         self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

#         raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
#         metadatas_raw: Any = raw_data.get("metadatas") or []
#         self.metadata: List[Dict[str, Any]] = [
#             dict(m) for m in metadatas_raw if isinstance(m, dict)
#         ]
#         print(f"✅ Loaded {len(self.metadata)} college records")

#         corpus: List[str] = [
#             " ".join([
#                 str(m.get("college_name", "")),
#                 str(m.get("course", "")),
#                 str(m.get("city", "")),
#                 str(m.get("facilities", "")),
#             ])
#             for m in self.metadata
#         ]
#         tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
#         self.bm25: BM25Okapi = BM25Okapi(tokenized)
#         print("✅ BM25 index built — RAG ready")

#     # ✅ FIXED: inside class
#     def retrieve(
#         self,
#         query: str,
#         city: str = "",
#         stream: str = "",
#         n: int = 10,
#     ) -> List[Dict[str, Any]]:

#         if not query.strip():
#             query = "college"

#         embedding: List[float] = self.embed_model.encode(
#             query, convert_to_numpy=True
#         ).tolist()

#         n_results = max(1, min(n, len(self.metadata)))

#         query_result: Dict[str, Any] = cast(
#             Dict[str, Any],
#             self.collection.query(
#                 query_embeddings=[embedding],
#                 n_results=n_results,
#             )
#         )

#         metadatas_field: Any = query_result.get("metadatas") or [[]]
#         semantic_results: List[Dict[str, Any]] = [
#             dict(m)
#             for m in (metadatas_field[0] if metadatas_field else [])
#             if isinstance(m, dict)
#         ]

#         scores: np.ndarray = self.bm25.get_scores(query.lower().split())
#         top_idx = np.argsort(scores)[::-1][:n]
#         keyword_results: List[Dict[str, Any]] = [
#             self.metadata[int(i)] for i in top_idx
#         ]

#         combined = semantic_results + keyword_results

#         unique: Dict[str, Dict[str, Any]] = {}
#         for idx, c in enumerate(combined):
#             key = str(c.get("college_name", str(idx)))
#             if key not in unique:
#                 unique[key] = c

#         filtered: List[Dict[str, Any]] = []

#         for c in unique.values():
#             c_city = str(c.get("city", "")).lower()
#             c_course = str(c.get("course", "")).lower()

#             if city and city.lower() not in c_city:
#                 continue

#             if stream and stream.lower() not in c_course:
#                 continue

#             filtered.append(c)

#         filtered.sort(key=lambda c: (
#             city.lower() not in str(c.get("city", "")).lower() if city else False,
#             stream.lower() not in str(c.get("course", "")).lower() if stream else False
#         ))

#         return filtered[:n]
    
#     def generate_response(
#         self,
#         query:    str,
#         colleges: List[Dict[str, Any]],
#     ) -> str:

#         if colleges:
#             college_lines = [
#                 f"• {c.get('college_name')} | {c.get('course')} | "
#                 f"{c.get('city')} | {c.get('ownership','')}\n"
#                 f"  Facilities: {c.get('facilities','')}"
#                 for c in colleges[:5]
#             ]
#             context = "\n".join(college_lines)
#         else:
#             context = "No specific colleges found in database."

#         prompt = f"""You are EduSwitch, an expert Indian academic and career advisor.

# Student question: {query}

# Colleges from our database:
# {context}

# Give a detailed structured response with ALL these sections:

# 1. **Career Switch Advice**
#    - Is this switch feasible?
#    - Pros and cons of this transition

# 2. **Skills Required**
#    - List 5-8 key technical and soft skills needed for this career switch
#    - Rate each skill importance: High / Medium / Low

# 3. **Bridge Courses**
#    - List 3-5 bridge courses or certifications to fill knowledge gaps
#    - Mention if available online or offline
#    - Approximate duration of each

# 4. **Steps to Switch**
#    - Concrete 4-5 step action plan with timeline

# 5. **Top College Recommendations**
#    - Recommend 3 colleges from the database above with specific reasons
#    - Mention course, city, and why it suits this student

# 6. **Timeline**
#    - Realistic month-by-month timeline for the full transition

# Be specific, practical, and encouraging. Focus on Indian education system."""

#         try:
#             completion = self.groq_client.chat.completions.create(
#                 model="llama-3.1-8b-instant",
#                 messages=[{"role": "user", "content": prompt}],
#                 max_tokens=1500,
#             )
#             return str(completion.choices[0].message.content)
#         except Exception as e:
#             return f"AI response error: {str(e)}"


#     def _parse_groq_json(self, prompt_text: str, max_tok: int) -> Dict[str, Any]:
#         """Helper: call Groq and parse JSON response robustly."""
#         completion = self.groq_client.chat.completions.create(
#             model="llama-3.1-8b-instant",
#             messages=[{"role": "user", "content": prompt_text}],
#             max_tokens=max_tok,
#         )
#         raw = str(completion.choices[0].message.content).strip()

#         # strip markdown fences if present
#         if "```" in raw:
#             for part in raw.split("```"):
#                 part = part.strip().lstrip("json").strip()
#                 if part.startswith("{") or part.startswith("["):
#                     raw = part
#                     break

#         # extract first complete JSON object
#         start = raw.find("{")
#         end   = raw.rfind("}") + 1
#         if start != -1 and end > start:
#             raw = raw[start:end]

#         return json.loads(raw)


#     def get_exam_details(self, exam_name: str, stream: str) -> Dict[str, Any]:

#         # ── Call 1: exam metadata, coachings, websites, tips ─────────
#         meta_prompt = f"""You are an Indian entrance exam expert.

# Return ONLY valid JSON for {exam_name} exam. No markdown, no extra text.

# {{
#   "exam_name": "{exam_name}",
#   "full_form": "actual full form of {exam_name}",
#   "conducting_body": "actual body that conducts {exam_name}",
#   "eligibility": "actual eligibility for {exam_name}",
#   "exam_pattern": "actual pattern of {exam_name} with sections, questions, marks, duration",
#   "important_dates": "actual months when {exam_name} is held",
#   "useful_websites": [
#     {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}},
#     {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}},
#     {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}}
#   ],
#   "top_coachings": [
#     {{
#       "name": "real institute name for {exam_name}",
#       "cities": ["city1", "city2"],
#       "fees_1yr": "INR amount",
#       "fees_2yr": "INR amount",
#       "crash_course_fees": "INR amount",
#       "tenure_options": ["option1", "option2"],
#       "online_available": true,
#       "online_platform": "platform name",
#       "online_url": "real url",
#       "highlights": ["point1", "point2", "point3"],
#       "rating": "x.x",
#       "website": "real url"
#     }},
#     {{
#       "name": "real institute name for {exam_name}",
#       "cities": ["city1", "city2"],
#       "fees_1yr": "INR amount",
#       "fees_2yr": "INR amount",
#       "crash_course_fees": "INR amount",
#       "tenure_options": ["option1", "option2"],
#       "online_available": true,
#       "online_platform": "platform name",
#       "online_url": "real url",
#       "highlights": ["point1", "point2", "point3"],
#       "rating": "x.x",
#       "website": "real url"
#     }},
#     {{
#       "name": "real institute name for {exam_name}",
#       "cities": ["city1", "city2"],
#       "fees_1yr": "INR amount",
#       "fees_2yr": "INR amount",
#       "crash_course_fees": "INR amount",
#       "tenure_options": ["option1", "option2"],
#       "online_available": true,
#       "online_platform": "platform name",
#       "online_url": "real url",
#       "highlights": ["point1", "point2", "point3"],
#       "rating": "x.x",
#       "website": "real url"
#     }},
#     {{
#       "name": "real institute name for {exam_name}",
#       "cities": ["city1", "city2"],
#       "fees_1yr": "INR amount",
#       "fees_2yr": "INR amount",
#       "crash_course_fees": "INR amount",
#       "tenure_options": ["option1", "option2"],
#       "online_available": true,
#       "online_platform": "platform name",
#       "online_url": "real url",
#       "highlights": ["point1", "point2", "point3"],
#       "rating": "x.x",
#       "website": "real url"
#     }}
#   ],
#   "preparation_tips": [
#     "specific tip 1 for {exam_name}",
#     "specific tip 2 for {exam_name}",
#     "specific tip 3 for {exam_name}",
#     "specific tip 4 for {exam_name}",
#     "specific tip 5 for {exam_name}"
#   ]
# }}"""

#         # ── Call 2: subjects syllabus + YouTube resources ─────────────
#         syllabus_prompt = f"""You are an Indian entrance exam expert.

# Return ONLY valid JSON for the syllabus and YouTube resources of {exam_name} ({stream} stream).
# No markdown, no extra text. Only the JSON object below.

# {{
#   "subjects": [
#     {{
#       "name": "first subject name in {exam_name}",
#       "color": "purple",
#       "topics": [
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}}
#       ]
#     }},
#     {{
#       "name": "second subject name in {exam_name}",
#       "color": "teal",
#       "topics": [
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}}
#       ]
#     }},
#     {{
#       "name": "third subject name in {exam_name}",
#       "color": "amber",
#       "topics": [
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}},
#         {{"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}}
#       ]
#     }}
#   ],
#   "youtube_resources": [
#     {{
#       "subject": "first subject name",
#       "channels": [
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}
#       ]
#     }},
#     {{
#       "subject": "second subject name",
#       "channels": [
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}
#       ]
#     }},
#     {{
#       "subject": "third subject name",
#       "channels": [
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},
#         {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}
#       ]
#     }}
#   ]
# }}

# Rules:
# - Replace ALL placeholder text with REAL {exam_name}-specific data
# - Subject names must be ACTUAL subjects in {exam_name}
# - Chapter names must be REAL chapters from the {exam_name} official syllabus
# - YouTube channel names must be REAL channels known for {exam_name} preparation
# - colors must be one of: purple, teal, amber, coral, blue, pink"""

#         try:
#             meta = self._parse_groq_json(meta_prompt, 1800)
#         except Exception as e:
#             print(f"Meta call failed for {exam_name}: {e}")
#             meta = {
#                 "exam_name":       exam_name,
#                 "full_form":       "",
#                 "conducting_body": "",
#                 "eligibility":     "",
#                 "exam_pattern":    "",
#                 "important_dates": "",
#                 "useful_websites": [],
#                 "top_coachings":   [],
#                 "preparation_tips": [],
#                 "error":           str(e),
#             }

#         try:
#             syllabus = self._parse_groq_json(syllabus_prompt, 2000)
#         except Exception as e:
#             print(f"Syllabus call failed for {exam_name}: {e}")
#             syllabus = {"subjects": [], "youtube_resources": []}

#         return {**meta, **syllabus}


#     def get_nearby_coachings(self, exam: str, city: str, lat: float, lng: float) -> List[Dict[str, Any]]:
#         """Groq-powered nearby coaching lookup. Replace with Google Places API in production."""
#         location_hint = city if city else f"near coordinates {lat},{lng} in India"

#         prompt = f"""List 5 real coaching institutes for {exam} in {location_hint}.
# Return ONLY a valid JSON array. No markdown, no extra text.

# [
#   {{
#     "name": "real institute name",
#     "address": "full address",
#     "city": "city name",
#     "distance_km": 1.2,
#     "fees_per_year": "INR range",
#     "tenure_options": ["1 Year", "2 Year", "Crash Course"],
#     "online_available": true,
#     "phone": "real phone number",
#     "website": "real website url",
#     "maps_query": "institute name city",
#     "rating": "x.x",
#     "highlights": ["point1", "point2"]
#   }}
# ]

# Rules:
# - All institutes must be REAL and actually present in {location_hint}
# - phone and website must be real
# - fees must be realistic INR amounts for 2024-25
# - Return ONLY the JSON array, nothing else"""

#         try:
#             completion = self.groq_client.chat.completions.create(
#                 model="llama-3.1-8b-instant",
#                 messages=[{"role": "user", "content": prompt}],
#                 max_tokens=1200,
#             )
#             raw = str(completion.choices[0].message.content).strip()

#             if "```" in raw:
#                 for part in raw.split("```"):
#                     part = part.strip().lstrip("json").strip()
#                     if part.startswith("["):
#                         raw = part
#                         break

#             start = raw.find("[")
#             end   = raw.rfind("]") + 1
#             if start != -1 and end > start:
#                 raw = raw[start:end]

#             return json.loads(raw)
#         except Exception as e:
#             print(f"Nearby coachings error: {e}")
#             return []
        
#     def recommend_by_cutoff(
#         self,
#         from_stream:  str,
#         to_stream:    str,
#         hsc_marks:    int,
#         exam:         str,
#         exam_marks:   float,
#         city:         str,
#         limit:        int,
#         raw_colleges: List[Dict[str, Any]],
#     ) -> List[Dict[str, Any]]:
#         '''
#         Use Groq LLM to rank + annotate raw_colleges based on cutoffs and quotas,
#         returning the top `limit` colleges the student most likely qualifies for.
#         '''
#         city_hint = city if city else "any Maharashtra city (Pune, Nagpur, Nashik, Satara, Kolhapur)"
 
#         college_list_text = "\\n".join([
#             f"{i+1}. {c.get('college_name','?')} | {c.get('city','?')} | "
#             f"{c.get('course','?')} | {c.get('ownership','?')} | Facilities: {c.get('facilities','')}"
#             for i, c in enumerate(raw_colleges[:30])
#         ])
 
#         prompt = f\"\"\"You are an Indian college admission expert for Maharashtra.
 
# Student profile:
# - From: {from_stream} stream
# - Target: {to_stream} stream
# - HSC Marks: {hsc_marks}%
# - Exam: {exam}
# - {exam} Score/Percentile: {exam_marks}%
# - Preferred city: {city_hint}
 
# Colleges in our database:
# {college_list_text}
 
# Task: From the list above, select the top {limit} colleges this student is most likely to get admission in.
# Consider:
# 1. Last year approximate cutoffs for {exam} in each college
# 2. General, OBC, SC/ST quota eligibility
# 3. Match with the student's {to_stream} stream goal
# 4. City preference ({city_hint})
 
# Return ONLY valid JSON array (no markdown, no extra text):
# [
#   {{
#     "college_name": "exact name from list",
#     "city": "city",
#     "course": "course name",
#     "ownership": "Govt/Private/Aided",
#     "cutoff": "approximate {exam} cutoff last year e.g. 85 percentile or 120 marks",
#     "quota": "General / OBC / SC-ST (whichever the student likely qualifies under)",
#     "chance": "High / Moderate / Low — reason in 10 words",
#     "fees": "approximate annual fees INR",
#     "facilities": "facilities string from above",
#     "why_recommended": "one sentence reason",
#     "naac_grade": "if known",
#     "intake": "if known"
#   }}
# ]
 
# Return exactly {limit} colleges maximum, sorted best match first.\"\"\"
 
#         try:
#             completion = self.groq_client.chat.completions.create(
#                 model="llama-3.1-8b-instant",
#                 messages=[{"role": "user", "content": prompt}],
#                 max_tokens=3000,
#             )
#             raw = str(completion.choices[0].message.content).strip()
 
#             if "```" in raw:
#                 for part in raw.split("```"):
#                     part = part.strip().lstrip("json").strip()
#                     if part.startswith("["):
#                         raw = part
#                         break
 
#             start = raw.find("[")
#             end   = raw.rfind("]") + 1
#             if start != -1 and end > start:
#                 raw = raw[start:end]
 
#             return json.loads(raw)[:limit]
#         except Exception as e:
#             print(f"recommend_by_cutoff LLM error: {e}")
#             # Graceful fallback: return raw colleges with minimal annotation
#             return [
#                 {**c, "chance": "Check cutoffs manually", "cutoff": "N/A", "quota": "General"}
#                 for c in raw_colleges[:limit]
#             ]


from __future__ import annotations

import os
import json
import torch
import numpy as np
from typing import List, Dict, Any, cast

torch.set_num_threads(1)

import chromadb
from chromadb import Collection
from sentence_transformers import SentenceTransformer
from rank_bm25 import BM25Okapi
from groq import Groq


class SwitchSmartRAG:

    def __init__(self) -> None:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        self.client: Any = chromadb.PersistentClient(path=os.path.join(BASE_DIR, "chroma_db"))
        self.collection: Collection = self.client.get_collection("college_collection")
        print("✅ ChromaDB connected")

        self.embed_model: SentenceTransformer = SentenceTransformer(
            "all-MiniLM-L6-v2", device="cpu"
        )
        print("✅ Embedding model loaded")

        self.groq_client: Groq = Groq(api_key=os.getenv("GROQ_API_KEY", ""))

        raw_data: Dict[str, Any] = cast(Dict[str, Any], self.collection.get())
        metadatas_raw: Any = raw_data.get("metadatas") or []
        self.metadata: List[Dict[str, Any]] = [
            dict(m) for m in metadatas_raw if isinstance(m, dict)
        ]
        print(f"✅ Loaded {len(self.metadata)} college records")

        corpus: List[str] = [
            " ".join([
                str(m.get("college_name", "")),
                str(m.get("course", "")),
                str(m.get("city", "")),
                str(m.get("facilities", "")),
            ])
            for m in self.metadata
        ]
        tokenized: List[List[str]] = [doc.lower().split() for doc in corpus]
        self.bm25: BM25Okapi = BM25Okapi(tokenized)
        print("✅ BM25 index built — RAG ready")

    def retrieve(
        self,
        query: str,
        city: str = "",
        stream: str = "",
        n: int = 10,
    ) -> List[Dict[str, Any]]:

        if not query.strip():
            query = "college"

        embedding: List[float] = self.embed_model.encode(
            query, convert_to_numpy=True
        ).tolist()

        n_results = max(1, min(n, len(self.metadata)))

        query_result: Dict[str, Any] = cast(
            Dict[str, Any],
            self.collection.query(
                query_embeddings=[embedding],
                n_results=n_results,
            )
        )

        metadatas_field: Any = query_result.get("metadatas") or [[]]
        semantic_results: List[Dict[str, Any]] = [
            dict(m)
            for m in (metadatas_field[0] if metadatas_field else [])
            if isinstance(m, dict)
        ]

        scores: np.ndarray = self.bm25.get_scores(query.lower().split())
        top_idx = np.argsort(scores)[::-1][:n]
        keyword_results: List[Dict[str, Any]] = [
            self.metadata[int(i)] for i in top_idx
        ]

        combined = semantic_results + keyword_results

        unique: Dict[str, Dict[str, Any]] = {}
        for idx, c in enumerate(combined):
            key = str(c.get("college_name", str(idx)))
            if key not in unique:
                unique[key] = c

        filtered: List[Dict[str, Any]] = []

        for c in unique.values():
            c_city = str(c.get("city", "")).lower()
            c_course = str(c.get("course", "")).lower()

            if city and city.lower() not in c_city:
                continue

            if stream and stream.lower() not in c_course:
                continue

            filtered.append(c)

        filtered.sort(key=lambda c: (
            city.lower() not in str(c.get("city", "")).lower() if city else False,
            stream.lower() not in str(c.get("course", "")).lower() if stream else False
        ))

        return filtered[:n]

    def generate_response(
        self,
        query: str,
        colleges: List[Dict[str, Any]],
    ) -> str:

        if colleges:
            college_lines = [
                f"• {c.get('college_name')} | {c.get('course')} | "
                f"{c.get('city')} | {c.get('ownership', '')}\n"
                f"  Facilities: {c.get('facilities', '')}"
                for c in colleges[:5]
            ]
            context = "\n".join(college_lines)
        else:
            context = "No specific colleges found in database."

        prompt = (
            "You are EduSwitch, an expert Indian academic and career advisor.\n\n"
            f"Student question: {query}\n\n"
            f"Colleges from our database:\n{context}\n\n"
            "Give a detailed structured response with ALL these sections:\n\n"
            "1. **Career Switch Advice**\n"
            "   - Is this switch feasible?\n"
            "   - Pros and cons of this transition\n\n"
            "2. **Skills Required**\n"
            "   - List 5-8 key technical and soft skills needed for this career switch\n"
            "   - Rate each skill importance: High / Medium / Low\n\n"
            "3. **Bridge Courses**\n"
            "   - List 3-5 bridge courses or certifications to fill knowledge gaps\n"
            "   - Mention if available online or offline\n"
            "   - Approximate duration of each\n\n"
            "4. **Steps to Switch**\n"
            "   - Concrete 4-5 step action plan with timeline\n\n"
            "5. **Top College Recommendations**\n"
            "   - Recommend 3 colleges from the database above with specific reasons\n"
            "   - Mention course, city, and why it suits this student\n\n"
            "6. **Timeline**\n"
            "   - Realistic month-by-month timeline for the full transition\n\n"
            "Be specific, practical, and encouraging. Focus on Indian education system."
        )

        try:
            completion = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1500,
            )
            return str(completion.choices[0].message.content)
        except Exception as e:
            return f"AI response error: {str(e)}"

    def _parse_groq_json(self, prompt_text: str, max_tok: int) -> Dict[str, Any]:
        """Helper: call Groq and parse JSON response robustly."""
        completion = self.groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt_text}],
            max_tokens=max_tok,
        )
        raw = str(completion.choices[0].message.content).strip()

        # strip markdown fences if present
        if "```" in raw:
            for part in raw.split("```"):
                part = part.strip().lstrip("json").strip()
                if part.startswith("{") or part.startswith("["):
                    raw = part
                    break

        # extract first complete JSON object
        start = raw.find("{")
        end   = raw.rfind("}") + 1
        if start != -1 and end > start:
            raw = raw[start:end]

        return json.loads(raw)

    def get_exam_details(self, exam_name: str, stream: str) -> Dict[str, Any]:

        # ── Call 1: exam metadata, coachings, websites, tips ─────────
        meta_prompt = (
            "You are an Indian entrance exam expert.\n\n"
            f"Return ONLY valid JSON for {exam_name} exam. No markdown, no extra text.\n\n"
            "{\n"
            f'  "exam_name": "{exam_name}",\n'
            f'  "full_form": "actual full form of {exam_name}",\n'
            f'  "conducting_body": "actual body that conducts {exam_name}",\n'
            f'  "eligibility": "actual eligibility for {exam_name}",\n'
            f'  "exam_pattern": "actual pattern of {exam_name} with sections, questions, marks, duration",\n'
            f'  "important_dates": "actual months when {exam_name} is held",\n'
            '  "useful_websites": [\n'
            f'    {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}},\n'
            f'    {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}},\n'
            f'    {{"name": "name", "url": "real url", "description": "what it offers for {exam_name}"}}\n'
            '  ],\n'
            '  "top_coachings": [\n'
            '    {\n'
            f'      "name": "real institute name for {exam_name}",\n'
            '      "cities": ["city1", "city2"],\n'
            '      "fees_1yr": "INR amount",\n'
            '      "fees_2yr": "INR amount",\n'
            '      "crash_course_fees": "INR amount",\n'
            '      "tenure_options": ["option1", "option2"],\n'
            '      "online_available": true,\n'
            '      "online_platform": "platform name",\n'
            '      "online_url": "real url",\n'
            '      "highlights": ["point1", "point2", "point3"],\n'
            '      "rating": "x.x",\n'
            '      "website": "real url"\n'
            '    },\n'
            '    {\n'
            f'      "name": "real institute name for {exam_name}",\n'
            '      "cities": ["city1", "city2"],\n'
            '      "fees_1yr": "INR amount",\n'
            '      "fees_2yr": "INR amount",\n'
            '      "crash_course_fees": "INR amount",\n'
            '      "tenure_options": ["option1", "option2"],\n'
            '      "online_available": true,\n'
            '      "online_platform": "platform name",\n'
            '      "online_url": "real url",\n'
            '      "highlights": ["point1", "point2", "point3"],\n'
            '      "rating": "x.x",\n'
            '      "website": "real url"\n'
            '    },\n'
            '    {\n'
            f'      "name": "real institute name for {exam_name}",\n'
            '      "cities": ["city1", "city2"],\n'
            '      "fees_1yr": "INR amount",\n'
            '      "fees_2yr": "INR amount",\n'
            '      "crash_course_fees": "INR amount",\n'
            '      "tenure_options": ["option1", "option2"],\n'
            '      "online_available": true,\n'
            '      "online_platform": "platform name",\n'
            '      "online_url": "real url",\n'
            '      "highlights": ["point1", "point2", "point3"],\n'
            '      "rating": "x.x",\n'
            '      "website": "real url"\n'
            '    },\n'
            '    {\n'
            f'      "name": "real institute name for {exam_name}",\n'
            '      "cities": ["city1", "city2"],\n'
            '      "fees_1yr": "INR amount",\n'
            '      "fees_2yr": "INR amount",\n'
            '      "crash_course_fees": "INR amount",\n'
            '      "tenure_options": ["option1", "option2"],\n'
            '      "online_available": true,\n'
            '      "online_platform": "platform name",\n'
            '      "online_url": "real url",\n'
            '      "highlights": ["point1", "point2", "point3"],\n'
            '      "rating": "x.x",\n'
            '      "website": "real url"\n'
            '    }\n'
            '  ],\n'
            '  "preparation_tips": [\n'
            f'    "specific tip 1 for {exam_name}",\n'
            f'    "specific tip 2 for {exam_name}",\n'
            f'    "specific tip 3 for {exam_name}",\n'
            f'    "specific tip 4 for {exam_name}",\n'
            f'    "specific tip 5 for {exam_name}"\n'
            '  ]\n'
            '}'
        )

        # ── Call 2: subjects syllabus + YouTube resources ─────────────
        syllabus_prompt = (
            "You are an Indian entrance exam expert.\n\n"
            f"Return ONLY valid JSON for the syllabus and YouTube resources of {exam_name} ({stream} stream).\n"
            "No markdown, no extra text. Only the JSON object below.\n\n"
            "{\n"
            '  "subjects": [\n'
            '    {\n'
            f'      "name": "first subject name in {exam_name}",\n'
            '      "color": "purple",\n'
            '      "topics": [\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}\n'
            '      ]\n'
            '    },\n'
            '    {\n'
            f'      "name": "second subject name in {exam_name}",\n'
            '      "color": "teal",\n'
            '      "topics": [\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}\n'
            '      ]\n'
            '    },\n'
            '    {\n'
            f'      "name": "third subject name in {exam_name}",\n'
            '      "color": "amber",\n'
            '      "topics": [\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]},\n'
            '        {"chapter": "chapter name", "concepts": ["concept1", "concept2", "concept3", "concept4"]}\n'
            '      ]\n'
            '    }\n'
            '  ],\n'
            '  "youtube_resources": [\n'
            '    {\n'
            '      "subject": "first subject name",\n'
            '      "channels": [\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}\n'
            '      ]\n'
            '    },\n'
            '    {\n'
            '      "subject": "second subject name",\n'
            '      "channels": [\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}\n'
            '      ]\n'
            '    },\n'
            '    {\n'
            '      "subject": "third subject name",\n'
            '      "channels": [\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}},\n'
            f'        {{"channel": "real channel name for {exam_name}", "playlist": "real playlist name", "url": "real youtube url", "subscribers": "count"}}\n'
            '      ]\n'
            '    }\n'
            '  ]\n'
            '}\n\n'
            "Rules:\n"
            f"- Replace ALL placeholder text with REAL {exam_name}-specific data\n"
            f"- Subject names must be ACTUAL subjects in {exam_name}\n"
            f"- Chapter names must be REAL chapters from the {exam_name} official syllabus\n"
            f"- YouTube channel names must be REAL channels known for {exam_name} preparation\n"
            "- colors must be one of: purple, teal, amber, coral, blue, pink"
        )

        try:
            meta = self._parse_groq_json(meta_prompt, 1800)
        except Exception as e:
            print(f"Meta call failed for {exam_name}: {e}")
            meta = {
                "exam_name":        exam_name,
                "full_form":        "",
                "conducting_body":  "",
                "eligibility":      "",
                "exam_pattern":     "",
                "important_dates":  "",
                "useful_websites":  [],
                "top_coachings":    [],
                "preparation_tips": [],
                "error":            str(e),
            }

        try:
            syllabus = self._parse_groq_json(syllabus_prompt, 2000)
        except Exception as e:
            print(f"Syllabus call failed for {exam_name}: {e}")
            syllabus = {"subjects": [], "youtube_resources": []}

        return {**meta, **syllabus}

    def get_nearby_coachings(self, exam: str, city: str, lat: float, lng: float) -> List[Dict[str, Any]]:
        """Groq-powered nearby coaching lookup. Replace with Google Places API in production."""
        location_hint = city if city else f"near coordinates {lat},{lng} in India"

        prompt = (
            f"List 5 real coaching institutes for {exam} in {location_hint}.\n"
            "Return ONLY a valid JSON array. No markdown, no extra text.\n\n"
            "[\n"
            "  {\n"
            '    "name": "real institute name",\n'
            '    "address": "full address",\n'
            '    "city": "city name",\n'
            '    "distance_km": 1.2,\n'
            '    "fees_per_year": "INR range",\n'
            '    "tenure_options": ["1 Year", "2 Year", "Crash Course"],\n'
            '    "online_available": true,\n'
            '    "phone": "real phone number",\n'
            '    "website": "real website url",\n'
            '    "maps_query": "institute name city",\n'
            '    "rating": "x.x",\n'
            '    "highlights": ["point1", "point2"]\n'
            "  }\n"
            "]\n\n"
            "Rules:\n"
            f"- All institutes must be REAL and actually present in {location_hint}\n"
            "- phone and website must be real\n"
            "- fees must be realistic INR amounts for 2024-25\n"
            "- Return ONLY the JSON array, nothing else"
        )

        try:
            completion = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1200,
            )
            raw = str(completion.choices[0].message.content).strip()

            if "```" in raw:
                for part in raw.split("```"):
                    part = part.strip().lstrip("json").strip()
                    if part.startswith("["):
                        raw = part
                        break

            start = raw.find("[")
            end   = raw.rfind("]") + 1
            if start != -1 and end > start:
                raw = raw[start:end]

            return json.loads(raw)
        except Exception as e:
            print(f"Nearby coachings error: {e}")
            return []

    def recommend_by_cutoff(
        self,
        from_stream:  str,
        to_stream:    str,
        hsc_marks:    int,
        exam:         str,
        exam_marks:   float,
        city:         str,
        limit:        int,
        raw_colleges: List[Dict[str, Any]],
    ) -> List[Dict[str, Any]]:
        """
        Use Groq LLM to rank + annotate raw_colleges based on cutoffs and quotas,
        returning the top `limit` colleges the student most likely qualifies for.
        """
        city_hint = city if city else "any Maharashtra city (Pune, Nagpur, Nashik, Satara, Kolhapur)"

        college_list_text = "\n".join([
            f"{i+1}. {c.get('college_name', '?')} | {c.get('city', '?')} | "
            f"{c.get('course', '?')} | {c.get('ownership', '?')} | Facilities: {c.get('facilities', '')}"
            for i, c in enumerate(raw_colleges[:30])
        ])

        prompt = (
            "You are an Indian college admission expert for Maharashtra.\n\n"
            "Student profile:\n"
            f"- From: {from_stream} stream\n"
            f"- Target: {to_stream} stream\n"
            f"- HSC Marks: {hsc_marks}%\n"
            f"- Exam: {exam}\n"
            f"- {exam} Score/Percentile: {exam_marks}%\n"
            f"- Preferred city: {city_hint}\n\n"
            "Colleges in our database:\n"
            f"{college_list_text}\n\n"
            f"Task: From the list above, select the top {limit} colleges this student is most likely to get admission in.\n"
            "Consider:\n"
            f"1. Last year approximate cutoffs for {exam} in each college\n"
            "2. General, OBC, SC/ST quota eligibility\n"
            f"3. Match with the student's {to_stream} stream goal\n"
            f"4. City preference ({city_hint})\n\n"
            "Return ONLY valid JSON array (no markdown, no extra text):\n"
            "[\n"
            "  {\n"
            '    "college_name": "exact name from list",\n'
            '    "city": "city",\n'
            '    "course": "course name",\n'
            '    "ownership": "Govt/Private/Aided",\n'
            f'    "cutoff": "approximate {exam} cutoff last year e.g. 85 percentile or 120 marks",\n'
            '    "quota": "General / OBC / SC-ST (whichever the student likely qualifies under)",\n'
            '    "chance": "High / Moderate / Low — reason in 10 words",\n'
            '    "fees": "approximate annual fees INR",\n'
            '    "facilities": "facilities string from above",\n'
            '    "why_recommended": "one sentence reason",\n'
            '    "naac_grade": "if known",\n'
            '    "intake": "if known"\n'
            "  }\n"
            "]\n\n"
            f"Return exactly {limit} colleges maximum, sorted best match first."
        )

        try:
            completion = self.groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=3000,
            )
            raw = str(completion.choices[0].message.content).strip()

            if "```" in raw:
                for part in raw.split("```"):
                    part = part.strip().lstrip("json").strip()
                    if part.startswith("["):
                        raw = part
                        break

            start = raw.find("[")
            end   = raw.rfind("]") + 1
            if start != -1 and end > start:
                raw = raw[start:end]

            return json.loads(raw)[:limit]
        except Exception as e:
            print(f"recommend_by_cutoff LLM error: {e}")
            # Graceful fallback: return raw colleges with minimal annotation
            return [
                {**c, "chance": "Check cutoffs manually", "cutoff": "N/A", "quota": "General"}
                for c in raw_colleges[:limit]
            ]