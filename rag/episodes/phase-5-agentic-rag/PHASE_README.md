# Phase V — Agentic RAG

**Episodes:** RAG-020 to RAG-024  
**Status:** Planned  
**Owner:** Dong Hong · Beyond Vibe Coding

## Phase objective

Understand when retrieval should be orchestrated by an agent, how reasoning/action loops and graph workflows operate, and how to design bounded, evaluated, secure Agentic RAG systems.

## Episode sequence

- RAG-020 — Traditional RAG vs. Agentic RAG
- RAG-021 — ReAct: Reasoning and Acting
- RAG-022 — LangGraph: State, Nodes, Edges, and Checkpointing
- RAG-023 — Graph Retrieval and Knowledge Graphs
- RAG-024 — Designing an Agentic RAG System

## Phase-level outcome

Readers should be able to distinguish deterministic retrieval pipelines from agentic orchestration, explain stateful tool-use loops, reason about graph retrieval, and design bounded systems with observability, guardrails, evaluation, and human oversight.

## Architecture principles

- Agentic orchestration is justified by requirements, not trend.
- Tool access follows least privilege.
- Loops, retries, latency, tokens, and tool budgets must be bounded.
- Retrieved data remains untrusted input.
- Graph retrieval and agentic control are different architectural dimensions and can be combined.
- Compare agentic systems with deterministic baselines.

## Phase exit criteria

- [ ] Tool permissions and trust boundaries are explicit.
- [ ] State, checkpointing, retry, and stop conditions are documented.
- [ ] Evaluation includes task success, safety, latency, and cost.
- [ ] Graph and agent approaches are compared to simpler baselines.
- [ ] Human oversight and failure recovery are addressed.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*
