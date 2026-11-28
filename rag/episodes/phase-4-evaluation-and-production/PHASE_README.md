# Phase IV — Evaluation and Production

**Episodes:** RAG-016 to RAG-019  
**Status:** Planned  
**Owner:** Dong Hong · Beyond Vibe Coding

## Phase objective

Establish how to measure RAG quality, diagnose unsupported answers, secure retrieval and generation, and operate the complete document/index lifecycle in production.

## Episode sequence

- RAG-016 — RAG Evaluation: From Retrieval Metrics to RAGAS
- RAG-017 — Hallucinations, Source Freshness, and Citations
- RAG-018 — RAG Security: ACL, Data Leakage, and Prompt Injection
- RAG-019 — Production RAG: Deployment, Monitoring, Cost, and Index Lifecycle

## Phase-level outcome

Readers should be able to define an evaluation dataset, interpret retrieval and generation metrics, reason about source freshness and citation validity, threat-model RAG data boundaries, and design operational controls for latency, cost, indexing, deletion, monitoring, and rollback.

## Required evaluation and production controls

- Representative test questions and answer/evidence ground truth.
- Separate retrieval, context, generation, and end-to-end measurements.
- Reproducible benchmark configuration and limitations.
- Document versioning, content hashing, upsert, deletion, tombstones, and stale-chunk cleanup.
- ACL and metadata synchronization.
- Prompt-injection threat modeling and adversarial tests.
- Cost, latency, freshness, quality, and availability observability.

## Phase exit criteria

- [ ] Metrics are defined and used within their scope.
- [ ] No benchmark is reported without its dataset and measurement method.
- [ ] Security boundaries are explicit.
- [ ] Index lifecycle operations are documented.
- [ ] Operational trade-offs and failure recovery are addressed.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*
