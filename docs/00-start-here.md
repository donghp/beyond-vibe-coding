# Start Here

> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**
>
> **Prompting gets you a prototype. Engineering gets you to production.**

Welcome to **Beyond Vibe Coding**, a project-centric approach to building and maintaining software with AI coding tools and agents.

This repository is the public engineering companion to **_BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_** by **Dong Hong**. It is intended for software developers, technical leads, software architects, AI engineers, engineering managers, technology leaders, and technical product managers.

The central question is not simply how to make an AI write more code. It is:

> **How can a software project remain understandable, controlled, verifiable, and continuable while AI executors, models, providers, conversations, and environments change?**

---

## 1. The five-minute orientation

### Minute 1 — Understand the problem

AI can produce a working prototype quickly. A growing software project still has to manage requirements, architecture, context, state, dependencies, verification, authority, deployment, and customer outcomes.

A conversation may contain useful history, but conversation history is not the same as the project's current state. An AI saying “done” is not evidence that a requirement has been met. A provider change should not force a project to reconstruct its engineering history from scratch.

### Minute 2 — Learn the project-centric principle

The project should retain the durable information required to continue engineering work:

- **Project Knowledge:** what the project knows and which sources are authoritative.
- **Project State:** where the project stands now, including active work, blockers, and accepted changes.
- **Authority:** which actions and decisions are permitted, and which require approval.
- **Evidence:** what supports a claim that work has been checked or completed.
- **Continuity artifacts:** records such as changes, run records, checkpoints, handoffs, and recovery instructions.

The AI consumes authorized task context and performs an assigned task. It does not become the project's canonical source of truth merely because it generated an answer or remembers a conversation.

### Minute 3 — Follow the engineering lifecycle

The conceptual lifecycle is:

1. Define the engineering goal.
2. Decompose the goal into bounded tasks.
3. Define scope, constraints, dependencies, and acceptance criteria.
4. Resolve authority and select an eligible executor.
5. Read the current project state and retrieve relevant knowledge.
6. Compile the task-specific context.
7. Execute within the authorized scope.
8. Record material changes and collect evidence.
9. Verify the result and obtain required approval.
10. Update project state, create a checkpoint, and prepare the next task or handoff.

See [Architecture](./architecture.md) for the full conceptual model.

### Minute 4 — Try the continuity thought experiment

Imagine that an AI coding session stops halfway through a task because its quota is exhausted. A different model or provider must continue the work.

Ask whether the project artifacts can explain:

- the active task and its authorized scope;
- the current project state;
- the changes already made;
- the evidence already collected;
- the acceptance criteria that remain unmet;
- the latest checkpoint and recovery point;
- the next safe action.

If the next executor needs the old conversation to reconstruct all of this, project continuity is incomplete. This thought experiment is a starting point for evaluating the ideas in this repository; it is not a benchmark result or a claim that the repository already automates the handoff.

### Minute 5 — Choose your reading path

| Your role | Start with | Then explore |
|---|---|---|
| CTO / Technology Leader | [Framework Overview](./framework-overview.md) | [Architecture](./architecture.md), governance and adoption implications |
| Software / Solution Architect | [Architecture](./architecture.md) | Project Knowledge, State, Context Compiler, Authority, and Evidence |
| AI Engineer | [Architecture](./architecture.md) | Context resolution, executor adapters, Engineering Runs, and verification |
| Engineering Manager / Tech Lead | [Framework Overview](./framework-overview.md) | Task contracts, handoffs, checkpoints, and review practices |
| Senior Developer | [Start with the problem](#1-the-five-minute-orientation) | Task Decomposition, Context Engineering, and the chapter map |
| Technical Product Manager | [Framework Overview](./framework-overview.md) | Product intent, scope, acceptance criteria, and customer outcomes |

---

## 2. What this repository is — and is not

### This repository is

- A public companion explaining the engineering ideas in the book.
- A place to publish clearly versioned specifications, patterns, examples, and eventually reference code.
- A place to discuss task control, context, project state, authority, evidence, and continuity across AI-assisted engineering work.
- An evolving engineering resource whose claims should be reviewed against examples and tests as artifacts are added.

### This repository is not (yet)

- A completed PAECS product or orchestration engine.
- A coding agent, foundation model, or provider-specific AI tool.
- A production-ready library with a stable API or compatibility guarantee.
- A replacement for Git, source control, architecture review, secure development practices, testing, or human accountability.
- A claim that a particular workflow guarantees correct software.

The current milestone defines the framework's vocabulary and conceptual architecture. Specifications, runnable examples, tests, and reference implementation will be published in later increments. A planned item must not be treated as an implemented capability.

---

## 3. Read the five foundation documents

1. [Framework Overview](./framework-overview.md) — the problem, purpose, design principles, and capability areas.
2. [Architecture](./architecture.md) — the conceptual components, records, workflow, and boundaries.
3. [Glossary](./glossary.md) — the terms used consistently across the book companion.
4. [Book Chapter Map](./book-chapter-map.md) — how the repository's concepts relate to the published 21-chapter book.

This file is the orientation and quick-start entry point.

---

## 4. Current maturity and how to evaluate it

**Repository foundation: Draft v0.1 — Framework Definition & Architecture.**

At this stage, the repository documents the method and intended architecture. It does not yet publish validated JSON Schemas, a runnable reference implementation, or a stable conformance suite. Those items should be treated as future work until the actual files, tests, and release notes are present.

When evaluating or adopting an artifact, check:

1. Its declared status: Draft, Experimental, Stable, Deprecated, or Retired.
2. Its version and change history.
3. Whether examples validate against the published specification.
4. Whether tests cover valid, invalid, and boundary cases.
5. Its known limitations and compatibility notes.

Do not infer implementation maturity from a diagram, roadmap entry, or explanatory document alone.

---

## 5. Companion book

The repository provides an open, practical companion to the broader reasoning, engineering method, trade-offs, and examples developed in the book.

**_BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_** — Dong Hong.

[**Read the book on Google Play Books →**](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

---

## 6. How to participate

Useful contributions include reproducible engineering examples, specification reviews, failure cases, architecture trade-offs, validation tests, and documentation improvements.

- [Open an issue](https://github.com/donghp/beyond-vibe-coding/issues)
- [View the repository](https://github.com/donghp/beyond-vibe-coding)

Please do not publish secrets, credentials, customer data, confidential commercial information, or proprietary code in public issues or pull requests.

---

**Project principle:** the executor may change; the project must retain enough authorized knowledge, state, evidence, and recovery information to continue responsibly.
