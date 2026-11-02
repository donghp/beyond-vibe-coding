# Book Chapter Map

**Document status:** Draft v0.1  
**Purpose:** Trace the public BVC repository concepts to the English International Edition book.  
**Book:** _BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_  
**Author:** Dong Hong

## 1. Source baseline and mapping policy

This map follows the 21-chapter sequence and printed page references in the English International Edition manuscript and PDF dated 1 November 2026. Chapter titles below preserve the published table-of-contents wording, including numbering and punctuation. Printed page references are included for navigation; pagination may change in a later edition.

The “repository connection” column describes where a concept belongs in this companion project. A connection marked **current docs** points to one of the foundation documents. A connection marked **future artifact** is planned and must not be read as an existing file or implemented feature.

The map is a guide to the relationship between the book and repository. It does not claim that every idea in a chapter has already been implemented as a specification or software component.

## 2. Introduction

| Book section | Printed page | Focus in the book | Repository connection |
|---|---:|---|---|
| Introduction — **I Built Software Before AI** | 6 | The author's software background, arrival of AI-assisted coding, the value of Vibe Coding, and the central distinction between generating code quickly and finishing a real product. | **Current docs:** [Framework Overview](./framework-overview.md). Establishes the problem and core proposition. |

## 3. The 21 chapters

| Chapter | Printed page | Published title | Focus in the book | Repository connection |
|---:|---:|---|---|---|
| 1 | 23 | **I Want to Build a Piece of Software** | From an idea and Vibe Coding to the realization that “it runs” is not the same as “done”; the task becomes the starting point, supported by decomposition, context, verification, state, and continuity. | **Current docs:** [Framework Overview](./framework-overview.md). **Future artifact:** task contract and task-decomposition examples. |
| 2 | 40 | **A Stronger AI Does Not Mean You Will Move Faster** | Model capability versus task suitability; the real cost of a successful task, including retries, human time, risk, availability, and quota. | **Current docs:** [Framework Overview](./framework-overview.md). **Future artifact:** executor-selection and cost-per-successful-task examples. |
| 3 | 54 | **AI Does Not Remember Your Project** | The limits of chat history and AI memory; Project Knowledge versus Project State; canonical sources, checkpoints, events, handoffs, and the beginning of project continuity. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** Project State, checkpoint, and continuity records. |
| 4 | 70 | **AI Does Not Just Need Context. It Needs the Right Context.** | Context is not a pile of information; relevance, authority, validity, freshness, retrieval, and the risk of relying on similar but incorrect or outdated information. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** context manifest and retrieval examples. |
| 5 | 80 | **AI Can Do It. But Is It Allowed to?** | Task boundaries, Task Decomposition, atomic engineering tasks, stopping conditions, acceptance criteria, and the distinction between capability and authority. | **Current docs:** [Framework Overview](./framework-overview.md), [Glossary](./glossary.md). **Future artifact:** task contract and authority policy. |
| 6 | 94 | **When AI Runs Out of Quota, the Project Must Not Stop** | An AI stopping is not the same as a project stopping; Engineering Runs, executor changes, state synchronization, and handoff beyond the instruction “continue.” | **Current docs:** [Architecture](./architecture.md). **Future artifact:** Run Record, Run Delta, and Handoff Contract examples. |
| 7 | 106 | **Multiple AIs, One Way of Working** | Multiple executors under one project method; preserving one version of project truth; adapters, Method Lock, Workspace Lock, and controlled canonical writes. | **Current docs:** [Architecture](./architecture.md). **Future artifact:** executor adapter contract and Workspace Lock pattern. |
| 8 | 119 | **AI Should Not Control the Project** | Automation and capability do not automatically create authority; distinguish discovery, proposal, and execution; define controlled autonomy and approval boundaries. | **Current docs:** [Framework Overview](./framework-overview.md), [Architecture](./architecture.md). **Future artifact:** authority policy and risk-based approval examples. |
| 9 | 130 | **I Don't Want to Write Longer Prompts. I Want AI to Get What It Needs** | Prompt versus context; task-specific context; Project Truth and Task Requirements; Context Compiler pipeline for classification, retrieval, dependency expansion, filtering, conflict detection, and compilation. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** Context Manifest and Context Compiler example. |
| 10 | 144 | **AI Said ‘Done.’ But I Don’t Trust It** | AI claims versus Engineering Evidence; implemented versus verified state; evidence scope and quality; Verification Budget and Verification Gate. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** verification-evidence schema and validation examples. |
| 11 | 154 | **I Don’t Build Memory for AI. I Build Continuity for the Project** | Chat history versus Project State; durable project engineering records; material events, snapshots, event logs, Run Records, Run Delta, checkpoints, and synchronized handoffs. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** state, event, checkpoint, and handoff templates. |
| 12 | 166 | **AI Can Change. The Project Must Not Change Its Way of Working** | Separating project method and continuity from a particular AI; PAECS as a continuity-control system; continuity artifacts, recovery, and the components that govern task, change, state, evidence, verification, handoff, and security. | **Current docs:** [Framework Overview](./framework-overview.md), [Architecture](./architecture.md). **Future artifact:** PAECS-oriented reference model and continuity validation. |
| 13 | 179 | **I Don't Want the Project to Depend on One AI** | Choosing and changing executors without replacing the project; provider neutrality, semantic contracts, adapters, and preserving project method and state. | **Current docs:** [Framework Overview](./framework-overview.md), [Architecture](./architecture.md). **Future artifact:** provider-neutral executor adapter contract. |
| 14 | 190 | **AI Can Write Code. But Is It Building a Product?** | Code progress versus product progress; product problem and intent, product scope, and keeping engineering tasks connected to customer and product outcomes. | **Current docs:** [Framework Overview](./framework-overview.md). **Future artifact:** product-intent and task-traceability examples. |
| 15 | 204 | **The Bugs AI Doesn't Tell Me About** | Happy-path limitations, assumptions and assumption debt, requirements, security, data and system boundaries, and the possibility of valid code with incorrect behavior. | **Current docs:** [Architecture](./architecture.md). **Future artifact:** failure-mode and risk-informed verification patterns. |
| 16 | 213 | **Architecture Is Still My Responsibility** | Architecture must fit the problem; complexity and trade-offs; simpler solutions where appropriate; AI may propose, while people retain responsibility for architecture decisions. | **Current docs:** [Framework Overview](./framework-overview.md), [Architecture](./architecture.md). **Future artifact:** architecture decision and review templates. |
| 17 | 225 | **AI Can Build It. But Who Has the Authority to Release It?** | Build, deploy, and release are different; release as an authorized decision; release states, compatibility, rollback, and pre-release evidence. | **Current docs:** [Architecture](./architecture.md), [Glossary](./glossary.md). **Future artifact:** release-state and approval examples. |
| 18 | 238 | **I Never Really Stopped Vibe Coding** | Vibe Coding remains useful for exploration; distinguish exploration from commitment; use a Vibe Budget and scale engineering controls with risk. | **Current docs:** [Framework Overview](./framework-overview.md). **Future artifact:** risk-tiered workflow examples. |
| 19 | 249 | **From Local Project to Real Product** | The difference between a local project and a real product; production as an engineering environment; development, staging, production, and the work required to ship responsibly. | **Current docs:** [Architecture](./architecture.md). **Future artifact:** environment and delivery readiness checklist. |
| 20 | 259 | **I Take EnerixFin Beyond My Laptop** | Deployment boundaries and the responsibilities around production environments, database changes, backups, security, and operational readiness, using EnerixFin as the engineering context. | **Current docs:** [Architecture](./architecture.md). **Future artifact:** sanitized EnerixFin deployment and operational case-study materials. |
| 21 | 270 | **The First Customer Doesn't Buy Code** | Code versus customer value; product progress, evidence, and outcomes; applying the engineering method to the EnerixFin case and asking whether the software solves a real problem. | **Current docs:** [Framework Overview](./framework-overview.md). **Future artifact:** sanitized product-outcome case study and evaluation examples. |

## 4. Conclusion and end matter

| Book section | Printed page | Role in the book | Repository connection |
|---|---:|---|---|
| Conclusion — **If I Were Starting Again Today** | 279 | Synthesizes the author's learning and the path from Vibe Coding toward a more deliberate AI Engineering method. | **Current docs:** [Framework Overview](./framework-overview.md). |
| Acknowledgments | 280 | Acknowledges people and support involved in the book. | Editorial end matter; no framework artifact is implied. |
| About the Author | 281 | Author background and motivation. | [Author and project information](../README.md). |
| EnerixFin Case Study | 281 | A real-world engineering laboratory for the ideas in the book, covering Solar/BESS engineering and investment workflows, project continuity, and the gap between AI output and real-world correctness. | **Future artifact:** sanitized materials under `case-studies/enerixfin/` after rights, confidentiality, and factual review. |
| Glossary | 284 | Plain-English definitions of technical terms used throughout the book. | [Repository Glossary](./glossary.md). |

## 5. Reading paths by role

| Reader | Suggested sequence | Why |
|---|---|---|
| CTO / Technology Leader | Introduction → Chapters 8, 12, 17, 19, 21 → Conclusion | Authority, continuity, release responsibility, production, and customer outcome. |
| Software Architect | Chapters 3, 4, 7, 9, 12, 13, 15, 16 | Knowledge, context, multiple executors, architecture integrity, and continuity. |
| AI Engineer | Chapters 2, 4, 6, 7, 9, 10, 12, 13 | Task fit, context, execution, evidence, provider change, and adapters. |
| Engineering Manager / Tech Lead | Chapters 5, 6, 7, 8, 10, 11, 17 | Task boundaries, handoffs, authority, verification, continuity, and release. |
| Senior Developer | Chapters 1, 3, 4, 5, 9, 10, 15, 18 | Practical work decomposition, context, verification, and risk-proportionate engineering. |
| Technical Product Manager | Chapters 1, 5, 14, 17, 19, 21 | Product intent, scope, acceptance, release, and customer outcomes. |

These reading paths are navigational suggestions, not separate curricula or certifications.

## 6. Book-to-repository traceability policy

The companion repository should preserve the distinction between what the book discusses and what the repository actually implements.

- A chapter-to-concept mapping is documentation, not proof of implementation.
- A future artifact must remain labeled Planned until the file exists.
- A specification must not be called Stable until it has a declared version, validation rules, valid and invalid examples, tests, compatibility notes, and known limitations.
- If the book's later edition changes a title, page number, or concept, update this map against the new approved publication source rather than silently rewriting the history of the existing edition.

[**Read BEYOND VIBE CODING on Google Play Books →**](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)
