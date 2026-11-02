# Book Chapter Map

**Document status:** Draft — synchronized with BVC Phase 2 Core Specifications v0.1.0  
**Book source baseline:** English International Edition manuscript and PDF dated 1 November 2026  
**Purpose:** Trace the concepts presented in the book to the corresponding documentation, specifications, examples, and planned artifacts in the public BVC companion repository.  
**Book:** _BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_  
**Author:** Dong Hong

---

## 1. Source Baseline and Mapping Policy

This map follows the published 21-chapter sequence and printed page references in the English International Edition manuscript and PDF dated 1 November 2026.

Chapter titles below preserve the wording, capitalization, punctuation, and sequence of the approved book table of contents. Printed page references are included for navigation and must not be changed unless a new approved book edition changes the pagination.

The purpose of this document is to establish traceability between the book and the public Beyond Vibe Coding (BVC) engineering companion repository.

It does not claim that every concept discussed in the book has already been implemented as a specification, software component, or production capability.

### 1.1. Mapping terminology

Each repository connection uses one of the following classifications.

**Current Documentation**

An existing explanatory document in the repository.

**Current Specification**

A published machine-readable Core Specification, currently Draft / Experimental v0.1.0.

**Current Example or Template**

An existing example, reusable template, validator, or test that demonstrates part of the concept.

**Future Artifact**

A planned specification, implementation, pattern, or reference component that has not yet been published or completed.

A link to a Current Specification does not imply that the entire capability discussed in the corresponding book chapter has been implemented.

### 1.2. Current BVC Core Specification baseline

Phase 2 publishes five connected, technology-neutral Core Specifications:

| Specification | Main responsibility | Repository status |
|---|---|---|
| Task Contract | Defines the task, authorized scope, constraints, expected outputs, acceptance criteria, verification requirements, and stopping conditions. | Draft / Experimental v0.1.0 |
| Context Manifest | Records selected context sources, authority, provenance, trust, freshness, inclusion, exclusion, and conflicts. | Draft / Experimental v0.1.0 |
| Project State | Records durable project facts, assumptions, decisions, tasks, risks, and recovery references. | Draft / Experimental v0.1.0 |
| Change Record | Records observed CREATE, MODIFY, DELETE operations, scope-integrity results, and change-budget outcomes. | Draft / Experimental v0.1.0 |
| Verification Evidence | Records verification checks, results, evidence references, limitations, and separate human acceptance information. | Draft / Experimental v0.1.0 |

Each specification has a human-readable guide and a JSON Schema using Draft 2020-12. The repository also provides YAML examples, reusable templates, Python validation utilities, automated tests, and GitHub Actions integration.

The specifications define portable data contracts. They do not constitute a complete PAECS runtime, a production-ready reference implementation, or a filesystem security sandbox.

### 1.3. Mapping and implementation boundaries

The following distinctions must be preserved:

- A concept discussed in the book may be more comprehensive than its current repository representation.
- A published specification may formalize only part of a chapter's engineering method.
- A validator can check supplied data but does not automatically enforce runtime permissions.
- A passing verification result does not automatically authorize production release.
- A planned artifact must remain labeled Future Artifact until it actually exists and has been reviewed.
- Project-specific practices demonstrated through Enerix Fin (EFIN) must not automatically become universal BVC requirements.

This map should be updated whenever an approved book edition or BVC specification version changes.

---

## 2. Introduction

| Book section | Printed page | Focus in the book | Repository connection |
|---|---:|---|---|
| Introduction — **I Built Software Before AI** | 6 | The author's software background, the arrival of AI-assisted coding, the value of Vibe Coding, and the central distinction between generating code quickly and finishing a real product. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). These establish the engineering problem, project-centric approach, and central BVC proposition. |

---

## 3. The 21 Chapters

### Chapter-to-repository traceability

| Chapter | Printed page | Published title | Focus in the book | Repository connection |
|---:|---:|---|---|---|
| 1 | 23 | **I Want to Build a Piece of Software** | From an idea and Vibe Coding to the realization that "it runs" is not the same as "done"; the task becomes the starting point, supported by decomposition, context, verification, state, and continuity. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Task Contract Guide](./task-contract.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** Task Decomposition patterns, task-planning methods, and broader practical exercises. |
| 2 | 40 | **A Stronger AI Does Not Mean You Will Move Faster** | Model capability versus task suitability; the real cost of a successful task, including retries, human time, risk, availability, and quota. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md), which establish model neutrality and project-centric execution. **Future Artifact:** Executor-selection methods, task-fit evaluation, and cost-per-verified-task examples. |
| 3 | 54 | **AI Does Not Remember Your Project** | The limits of chat history and AI memory; Project Knowledge versus Project State; canonical sources, checkpoints, events, handoffs, and the beginning of project continuity. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specifications:** [Project State](../specifications/v0.1/project-state.md) and [Context Manifest](../specifications/v0.1/context-manifest.md). **Future Artifact:** Durable event logs, checkpoints, Run Records, and executable continuity mechanisms. |
| 4 | 70 | **AI Does Not Just Need Context. It Needs the Right Context.** | Context is not a pile of information; relevance, authority, validity, freshness, retrieval, and the risk of relying on similar but incorrect or outdated information. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specification:** [Context Manifest](../specifications/v0.1/context-manifest.md). **Future Artifact:** Executable Context Compiler, advanced retrieval, dependency expansion, and context-conflict resolution implementation. |
| 5 | 80 | **AI Can Do It. But Is It Allowed to?** | Task boundaries, Task Decomposition, atomic engineering tasks, stopping conditions, acceptance criteria, and the distinction between capability and authority. | **Current Documentation:** [Framework Overview](./framework-overview.md), [Engineering Glossary](./glossary.md), and [Task Contract Guide](./task-contract.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** General project-level authority policy, advanced risk-based approval workflows, and additional task-decomposition patterns. |
| 6 | 94 | **When AI Runs Out of Quota, the Project Must Not Stop** | An AI stopping is not the same as a project stopping; Engineering Runs, executor changes, state synchronization, and handoff beyond the instruction "continue." | **Current Documentation:** [Conceptual Architecture](./architecture.md). **Current Specifications:** [Project State](../specifications/v0.1/project-state.md), [Change Record](../specifications/v0.1/change-record.md), and [Task Contract](../specifications/v0.1/task-contract.md). **Future Artifact:** Run Record, Run Delta, Checkpoint, and Handoff implementations. |
| 7 | 106 | **Multiple AIs, One Way of Working** | Multiple executors under one project method; preserving one version of project truth; adapters, Method Lock, Workspace Lock, and controlled canonical writes. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Framework Overview](./framework-overview.md). **Current Specification:** [Task Contract](../specifications/v0.1/task-contract.md) provides task-specific executor scope and authority declarations. **Future Artifact:** Provider-neutral Executor Adapter Contract, Workspace Lock implementation, and controlled multi-executor coordination. |
| 8 | 119 | **AI Should Not Control the Project** | Automation and capability do not automatically create authority; distinguish discovery, proposal, and execution; define controlled autonomy and approval boundaries. | **Current Documentation:** [Framework Overview](./framework-overview.md), [Conceptual Architecture](./architecture.md), and [Engineering Glossary](./glossary.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md) and [Verification Evidence](../specifications/v0.1/verification-evidence.md) define task-specific authority, approval declarations, and acceptance information. **Future Artifact:** A separate project-level Authority Policy, authenticated approval service, and advanced governance implementation. |
| 9 | 130 | **I Don't Want to Write Longer Prompts. I Want AI to Get What It Needs** | Prompt versus context; task-specific context; Project Truth and Task Requirements; Context Compiler pipeline for classification, retrieval, dependency expansion, filtering, conflict detection, and compilation. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specification:** [Context Manifest](../specifications/v0.1/context-manifest.md). **Future Artifact:** Executable Context Compiler pipeline, advanced retrieval, and context-preparation implementation. |
| 10 | 144 | **AI Said ‘Done.’ But I Don’t Trust It** | AI claims versus Engineering Evidence; implemented versus verified state; evidence scope and quality; Verification Budget and Verification Gate. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** Advanced Verification Gate, trusted evidence collection, and production verification integrations. |
| 11 | 154 | **I Don’t Build Memory for AI. I Build Continuity for the Project** | Chat history versus Project State; durable project engineering records; material events, snapshots, event logs, Run Records, Run Delta, checkpoints, and synchronized handoffs. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specifications:** [Project State](../specifications/v0.1/project-state.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** Durable Event Log, Checkpoint, Snapshot, Run Record, Run Delta, and Handoff implementations. |
| 12 | 166 | **AI Can Change. The Project Must Not Change Its Way of Working** | Separating project method and continuity from a particular AI; PAECS as a continuity-control system; continuity artifacts, recovery, and the components that govern task, change, state, evidence, verification, handoff, and security. | **Current Documentation:** [Framework Overview](./framework-overview.md), [Conceptual Architecture](./architecture.md), and [Engineering Glossary](./glossary.md). **Current Specifications:** All five BVC Core Specifications provide the initial technology-neutral record foundation for task, context, state, change, and evidence. **Future Artifact:** PAECS-oriented reference implementation, continuity runtime, recovery orchestration, and integrated governance validation. |
| 13 | 179 | **I Don't Want the Project to Depend on One AI** | Choosing and changing executors without replacing the project; provider neutrality, semantic contracts, adapters, and preserving project method and state. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). **Current Specification:** [Task Contract](../specifications/v0.1/task-contract.md) defines task requirements and authorized scope independently of a specific model. **Future Artifact:** Provider-neutral Executor Adapter Contract, multi-provider integration, and executor conformance tests. |
| 14 | 190 | **AI Can Write Code. But Is It Building a Product?** | Code progress versus product progress; product problem and intent, product scope, and keeping engineering tasks connected to customer and product outcomes. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md) provides task objectives and expected outputs; [Project State](../specifications/v0.1/project-state.md) records project decisions and current work. **Future Artifact:** Product-intent model, product-to-task traceability, and product-outcome evaluation examples. |
| 15 | 204 | **The Bugs AI Doesn't Tell Me About** | Happy-path limitations, assumptions and assumption debt, requirements, security, data and system boundaries, and the possibility of valid code with incorrect behavior. | **Current Documentation:** [Conceptual Architecture](./architecture.md), [Framework Overview](./framework-overview.md), and [Engineering Glossary](./glossary.md). **Current Specifications:** [Context Manifest](../specifications/v0.1/context-manifest.md), [Task Contract](../specifications/v0.1/task-contract.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** Broader failure-mode catalogs, adversarial examples, security verification patterns, and risk-informed testing methods. |
| 16 | 213 | **Architecture Is Still My Responsibility** | Architecture must fit the problem; complexity and trade-offs; simpler solutions where appropriate; AI may propose, while people retain responsibility for architecture decisions. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). **Current Specification:** [Project State](../specifications/v0.1/project-state.md) can record accepted architectural decisions and their status. **Future Artifact:** Architecture Decision Records, architecture review templates, and automated architecture-conformance checks. |
| 17 | 225 | **AI Can Build It. But Who Has the Authority to Release It?** | Build, deploy, and release are different; release as an authorized decision; release states, compatibility, rollback, and pre-release evidence. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Engineering Glossary](./glossary.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md) and [Verification Evidence](../specifications/v0.1/verification-evidence.md) distinguish task authority, required checks, evidence, and human acceptance information. **Future Artifact:** Project-level Release Authority Policy, release-state model, compatibility checks, rollback controls, and production approval integration. |
| 18 | 238 | **I Never Really Stopped Vibe Coding** | Vibe Coding remains useful for exploration; distinguish exploration from commitment; use a Vibe Budget and scale engineering controls with risk. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). **Current Specification:** [Task Contract](../specifications/v0.1/task-contract.md) provides a bounded way to define work and constraints. **Future Artifact:** Risk-tiered workflow examples, exploration-to-production transition patterns, and Vibe Budget guidance. |
| 19 | 249 | **From Local Project to Real Product** | The difference between a local project and a real product; production as an engineering environment; development, staging, production, and the work required to ship responsibly. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and [Framework Overview](./framework-overview.md). **Current Specifications:** [Project State](../specifications/v0.1/project-state.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md). **Future Artifact:** Environment-management patterns, delivery-readiness checklist, deployment controls, and production-operability examples. |
| 20 | 259 | **I Take EnerixFin Beyond My Laptop** | Deployment boundaries and the responsibilities around production environments, database changes, backups, security, and operational readiness, using EnerixFin as the engineering context. | **Current Documentation:** [Conceptual Architecture](./architecture.md) and the EFIN case-study description in the [Repository README](../README.md). **Current Specifications:** [Task Contract](../specifications/v0.1/task-contract.md), [Change Record](../specifications/v0.1/change-record.md), and [Verification Evidence](../specifications/v0.1/verification-evidence.md) provide generic foundations for controlled changes and verification. **Future Artifact:** Sanitized Enerix Fin (EFIN) deployment, database, backup, and operational case-study materials, subject to rights, confidentiality, and factual review. |
| 21 | 270 | **The First Customer Doesn't Buy Code** | Code versus customer value; product progress, evidence, and outcomes; applying the engineering method to the EnerixFin case and asking whether the software solves a real problem. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Repository README](../README.md). **Current Specifications:** [Project State](../specifications/v0.1/project-state.md) and [Verification Evidence](../specifications/v0.1/verification-evidence.md) provide initial structures for project progress and evidence. **Future Artifact:** Sanitized product-outcome case study, customer-value evaluation, and business-result measurement examples. |

---

## 4. Conclusion and End Matter

| Book section | Printed page | Role in the book | Repository connection |
|---|---:|---|---|
| Conclusion — **If I Were Starting Again Today** | 279 | Synthesizes the author's learning and the path from Vibe Coding toward a more deliberate AI Engineering method. | **Current Documentation:** [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md). |
| Acknowledgments | 280 | Acknowledges people and support involved in the book. | Editorial end matter; no framework artifact is implied. |
| About the Author | 281 | Author background and motivation. | [Repository Author Information](../README.md). |
| EnerixFin Case Study | 281 | A real-world engineering laboratory for the ideas in the book, covering Solar/BESS engineering and investment workflows, project continuity, and the gap between AI output and real-world correctness. | **Current Documentation:** EFIN is identified as a case-study context in the [Repository README](../README.md). **Future Artifact:** Sanitized materials under `case-studies/enerixfin/` after rights, confidentiality, and factual review. |
| Glossary | 284 | Plain-English definitions of technical terms used throughout the book. | [Repository Engineering Glossary](./glossary.md). |

---

## 5. Reading Paths by Role

The following reading paths help different audiences navigate the book. They are suggestions, not separate curricula, certifications, or prerequisites for using the repository.

| Reader | Suggested sequence | Why |
|---|---|---|
| CTO / Technology Leader | Introduction → Chapters 8, 12, 17, 19, 21 → Conclusion | Authority, continuity, release responsibility, production, and customer outcomes. |
| Software Architect | Chapters 3, 4, 7, 9, 12, 13, 15, 16 | Project knowledge, context, multiple executors, architecture integrity, and continuity. |
| AI Engineer | Chapters 2, 4, 6, 7, 9, 10, 12, 13 | Task suitability, context, execution, evidence, provider changes, and adapters. |
| Engineering Manager / Tech Lead | Chapters 5, 6, 7, 8, 10, 11, 17 | Task boundaries, handoffs, authority, verification, continuity, and release. |
| Senior Developer | Chapters 1, 3, 4, 5, 9, 10, 15, 18 | Practical work decomposition, context, verification, and risk-proportionate engineering. |
| Beginner / Independent Builder | Introduction → Chapters 1, 5, 10, 18 → Conclusion | Understanding the gap between a prototype and controlled software, task boundaries, verification, and proportionate engineering. |
| Technical Product Manager | Chapters 1, 5, 14, 17, 19, 21 | Product intent, scope, acceptance, release, and customer outcomes. |

Readers may also follow the repository's [Start Here guide](./00-start-here.md), which provides separate learning paths for beginners, developers, team leads, CTOs, architects, and AI engineers.

---

## 6. Book-to-Repository Traceability Policy

The companion repository must preserve a clear distinction between what the book discusses and what the repository actually documents, specifies, validates, or implements.

The following rules apply:

1. A chapter-to-concept mapping is documentation, not proof of implementation.
2. A Current Documentation link must point to an existing repository document.
3. A Current Specification link must point to an existing specification with a declared version and maturity status.
4. A Current Example or Template must exist at the referenced path and must be consistent with its applicable schema.
5. A Future Artifact must remain labeled as planned until it is actually published and reviewed.
6. A specification must not be called Stable merely because its JSON Schema validates or its current examples pass tests.
7. A specification's maturity must reflect its validation coverage, compatibility rules, implementation experience, and documented limitations.
8. Project-specific EFIN paths, policies, governance identifiers, and implementation details must not be represented as universal BVC requirements without separate justification.
9. Changes to the book's titles, printed pages, or chapter order must be checked against a new approved publication source.
10. Any update to this map must preserve the relationship between the exact published book edition and the corresponding repository version.

The purpose of traceability is to help readers move from the book's engineering concepts to practical resources without confusing conceptual discussion, published specifications, and implemented capabilities.

---

## 7. Core Specification Reference

The five current Core Specifications can be accessed from the [BVC Core Specification Index](../specifications/v0.1/README.md).

- [Task Contract v0.1.0](../specifications/v0.1/task-contract.md)
- [Context Manifest v0.1.0](../specifications/v0.1/context-manifest.md)
- [Project State v0.1.0](../specifications/v0.1/project-state.md)
- [Change Record v0.1.0](../specifications/v0.1/change-record.md)
- [Verification Evidence v0.1.0](../specifications/v0.1/verification-evidence.md)

All five are Draft / Experimental. They provide a technology-neutral data foundation, not a complete runtime or production-ready implementation.

For validation instructions, schemas, examples, and reusable templates, consult the [Core Specification Index](../specifications/v0.1/README.md).

---

## 8. Book and Companion Repository

**_BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_** by **Dong Hong** develops the engineering method and its broader reasoning across the Introduction, 21 chapters, Conclusion, and end matter.

This repository provides a free practical companion with framework documentation, Core Specifications, examples, templates, and validation tools.

The book and repository serve complementary purposes:

- The book explains the reasoning, engineering philosophy, trade-offs, and lessons in depth.
- The repository provides practical starting points and reviewable engineering artifacts.
- Future implementations and case studies will be published only when they have been properly developed, validated, and reviewed.

[**Read BEYOND VIBE CODING on Google Play Books →**](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

[**Explore the Beyond Vibe Coding GitHub Repository →**](https://github.com/donghp/beyond-vibe-coding)

---

**Beyond Vibe Coding** — from generating code to engineering software that can be understood, secured, verified, and continued.
