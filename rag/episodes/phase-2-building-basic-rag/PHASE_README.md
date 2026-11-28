# Phase II — Building Basic RAG

**Episodes:** RAG-005 to RAG-010  
**Status:** Planned  
**Owner:** Dong Hong · Beyond Vibe Coding

## Phase objective

Understand how raw source material becomes searchable knowledge and how retrieved evidence is prepared for language-model generation.

## Episode sequence

- RAG-005 — Data Sources and Document Loaders
- RAG-006 — Parsing, Cleaning, and Metadata
- RAG-007 — Chunking Strategies
- RAG-008 — Embeddings Explained
- RAG-009 — Vector Stores, Vector Databases, and Semantic Search
- RAG-010 — Prompt and Context Construction

## Phase-level outcome

Readers should be able to explain and sketch an ingestion-to-query architecture, identify the data contracts between stages, and reason about provenance, document structure, vector representation, retrieval infrastructure, context limits, and failure modes.

## Required cross-cutting concerns

- Stable document and chunk identity.
- Source provenance and effective-date/version metadata.
- ACL propagation and authorization boundaries.
- Incremental updates, deletion, and stale-index cleanup.
- Multilingual and layout-sensitive extraction limitations.
- Context budget, evidence selection, and prompt boundaries.

## Phase exit criteria

- [ ] Each episode has an evidence register and reviewed research brief.
- [ ] At least one coherent end-to-end example connects the phase.
- [ ] Diagrams agree with terminology and text.
- [ ] Implementation-specific claims identify the relevant product/version.
- [ ] No unsupported benchmark claims are presented.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*
