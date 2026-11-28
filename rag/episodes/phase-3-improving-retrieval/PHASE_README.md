# Phase III — Improving Retrieval

**Episodes:** RAG-011 to RAG-015  
**Status:** Planned  
**Owner:** Dong Hong · Beyond Vibe Coding

## Phase objective

Move from understanding retrieval components to diagnosing retrieval failures and selecting methods based on workload-specific evidence.

## Episode sequence

- RAG-011 — Why Retrieval Fails
- RAG-012 — Dense Retrieval vs. BM25
- RAG-013 — Hybrid Search and Reciprocal Rank Fusion
- RAG-014 — Reranking, Cross-Encoders, and MMR
- RAG-015 — Query Rewriting, Multi-Query, HyDE, and Decomposition

## Phase-level outcome

Readers should be able to construct retrieval baselines, classify failure types, compare lexical and dense retrieval, evaluate fusion strategies, reason about reranker cost/latency, and assess query transformation techniques.

## Evaluation discipline

- Use judged query sets and explicit relevance labels.
- Report retrieval metrics appropriate to the workload.
- Compare methods against simple baselines.
- Track latency and compute cost alongside relevance.
- Avoid universal claims such as "hybrid always wins" or "reranking is always required."

## Phase exit criteria

- [ ] Each episode has a claim-to-source evidence register.
- [ ] Trade-offs are explicit and measured where appropriate.
- [ ] Experimental conditions and dataset limitations are documented.
- [ ] Retrieval quality is connected to end-to-end answer quality.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*
