# RAG & Agentic RAG Learning Roadmap

**Series owner:** Dong Hong  
**Brand:** Beyond Vibe Coding  
**Roadmap version:** 1.0.0  
**Status:** Active learning roadmap

## Program objective

Build a coherent, evidence-led understanding of RAG and Agentic RAG: from the retrieval-augmented generation mental model to data preparation, retrieval algorithms, evaluation, secure production systems, and agentic orchestration.

The program prioritizes conceptual correctness, mechanism-level understanding, engineering trade-offs, and verifiable evidence. It does not assume that RAG, vector databases, agents, or any specific framework are appropriate for every workload.

## Phase I — Understanding RAG

**Goal:** Establish the mental model and distinguish RAG from adjacent methods.

| ID | Episode | Core questions | Planned outcome |
|---|---|---|---|
| RAG-001 | What Is RAG? How AI Finds External Knowledge Before It Answers | What problem does RAG solve? What are Indexing, Retrieval, and Generation? | Understand the basic architecture and its limits. |
| RAG-002 | Prompting vs. RAG vs. Fine-Tuning vs. Long Context | What changes: instructions, external knowledge, model weights, or context capacity? | Select an approach from requirements and evidence. |
| RAG-003 | Parametric vs. External Knowledge | Where is knowledge represented, stored, updated, and accessed? | Understand model memory and external knowledge boundaries. |
| RAG-004 | How a Question Flows Through RAG | What happens from user identity and query processing to retrieval, context assembly, generation, and citations? | Trace a complete query-time path. |

## Phase II — Building Basic RAG

**Goal:** Understand how source information becomes searchable and how retrieved evidence enters model context.

| ID | Episode | Core questions | Planned outcome |
|---|---|---|---|
| RAG-005 | Data Sources and Document Loaders | Which sources and formats can be ingested? What is a loader responsible for? | Design an ingestion boundary. |
| RAG-006 | Parsing, Cleaning, and Metadata | How are structure, provenance, versions, dates, and permissions preserved? | Design trustworthy document records. |
| RAG-007 | Chunking Strategies | How do fixed-size, recursive, semantic, hierarchical, and layout-aware strategies differ? | Choose and test chunking strategies. |
| RAG-008 | Embeddings Explained | How are texts represented as vectors? What do similarity and embedding-space limitations mean? | Understand dense representations. |
| RAG-009 | Vector Stores, Vector Databases, and Semantic Search | What is stored, indexed, filtered, and searched? | Understand vector retrieval infrastructure. |
| RAG-010 | Prompt and Context Construction | How should question, evidence, metadata, instructions, and token budgets be assembled? | Build grounded context deliberately. |

## Phase III — Improving Retrieval

**Goal:** Diagnose retrieval failures and understand ranking and query transformation techniques.

| ID | Episode | Core questions | Planned outcome |
|---|---|---|---|
| RAG-011 | Why Retrieval Fails | Which data, query, representation, filtering, and ranking issues cause misses? | Diagnose failure modes systematically. |
| RAG-012 | Dense Retrieval vs. BM25 | How do semantic and lexical retrieval differ? | Select retrieval baselines. |
| RAG-013 | Hybrid Search and Reciprocal Rank Fusion | How can lexical and dense result sets be combined? | Evaluate fusion approaches. |
| RAG-014 | Reranking, Cross-Encoders, and MMR | Why use a second-stage ranker? What are relevance, diversity, latency, and cost trade-offs? | Design a retrieval/reranking cascade. |
| RAG-015 | Query Rewriting, Multi-Query, HyDE, and Decomposition | How can a query be transformed to improve evidence discovery? | Choose query transformation methods. |

## Phase IV — Evaluation and Production

**Goal:** Measure system quality, secure data access, and operate a dependable RAG pipeline.

| ID | Episode | Core questions | Planned outcome |
|---|---|---|---|
| RAG-016 | RAG Evaluation: From Retrieval Metrics to RAGAS | How do Recall@K, Precision@K, MRR, NDCG, Faithfulness, Answer Relevancy, Context Precision, and Context Recall differ? | Build an evaluation protocol and test set. |
| RAG-017 | Hallucinations, Source Freshness, and Citations | How do unsupported claims, stale evidence, contradictory sources, and citation failures occur? | Design evidence and freshness controls. |
| RAG-018 | RAG Security: ACL, Data Leakage, and Prompt Injection | How should authorization, tenant isolation, untrusted content, and indirect prompt injection be handled? | Threat-model a RAG application. |
| RAG-019 | Production RAG: Deployment, Monitoring, Cost, and Index Lifecycle | How are latency, cost, observability, incremental indexing, deletion, re-indexing, and rollback managed? | Define production operating controls. |

## Phase V — Agentic RAG

**Goal:** Understand when retrieval should become part of a tool-using, multi-step control loop.

| ID | Episode | Core questions | Planned outcome |
|---|---|---|---|
| RAG-020 | Traditional RAG vs. Agentic RAG | What changes when an LLM can plan, choose tools, and iterate? | Identify when agentic orchestration is justified. |
| RAG-021 | ReAct: Reasoning and Acting | How do reasoning steps, actions, observations, and stopping conditions interact? | Understand a tool-use loop. |
| RAG-022 | LangGraph: State, Nodes, Edges, and Checkpointing | How can stateful workflows, conditional transitions, retries, and checkpoints be represented? | Understand graph-based orchestration. |
| RAG-023 | Graph Retrieval and Knowledge Graphs | When do entity relationships and graph traversal improve retrieval? | Evaluate graph retrieval against simpler baselines. |
| RAG-024 | Designing an Agentic RAG System | How do retrieval, tools, state, evaluation, guardrails, and observability fit together? | Design an end-to-end architecture from requirements. |

## Cross-cutting engineering topics

These topics are integrated into the relevant episodes rather than forced into Episode 01:

- **Incremental indexing and document lifecycle:** stable document IDs, content hashes, upsert, deletion, versioning, tombstones, stale-chunk cleanup, and ACL/metadata synchronization (primarily Episodes 06 and 19).
- **Context stuffing and Lost in the Middle:** context budget, evidence density, ordering, compression, latency, and token cost (primarily Episodes 10 and 17).
- **Evaluation discipline:** retrieval and generation metrics, gold datasets, reproducibility, confidence intervals where appropriate, and end-to-end task success (primarily Episode 16).
- **Multimodal retrieval:** document layout, tables, images, OCR/extraction limitations, and cross-modal retrieval (considered as an extension to Episodes 05–10 or a separately approved module).
- **Architecture selection:** SQL, APIs, rules engines, lexical search, long-context models, RAG, and fine-tuning are alternatives or complements depending on workload.
- **Failure diagnosis and error attribution:** preserve the RAGEC four-stage taxonomy as a reference while extending BVC diagnostics to source governance, query processing, context assembly, post-generation verification, security, orchestration, and runtime. Record first observed failure, root cause, contributing labels, downstream symptoms, evidence, and uncertainty (primarily Episodes 11 and 16–19).
- **Evaluation and evaluator reliability:** separate answer outcome, retrieval/context quality, grounding, citation validity, abstention, and evaluator accuracy. Validate LLM judges against human-adjudicated samples and retain uncertainty instead of forcing unsupported labels (primarily Episode 16).
- **Reproducible diagnosis:** pin code, datasets, model/tokenizer revisions, chunking units, similarity metric, prompts, filters, Top-K, and artifact lineage for every benchmark run (primarily Episodes 07–09 and 16–19).


## Editorial sequencing

Episode 01 is the foundational article. Later episodes should deepen one mechanism at a time. A later episode may refer back to concepts rather than duplicating the entire introductory explanation.

The roadmap is a plan, not a claim that all episodes are researched, written, validated, or published.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*


Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
