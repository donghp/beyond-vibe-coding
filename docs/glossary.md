# Glossary

**Document status:** Draft v0.1  
**Document role:** Shared terminology for the BVC repository  
**Source alignment:** Terms are drawn from the English International Edition book and its glossary; concise explanations below preserve the distinctions used in the book.

Use these definitions consistently across documentation, specifications, examples, and future implementations. Where a term has more than one meaning in the wider industry, this glossary describes how it is used in Beyond Vibe Coding.

## A

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Acceptance Criteria** | Specific conditions used to determine whether a requirement or task has been satisfied. |
| **ADR — Architecture Decision Record** | A record of an important architecture decision and the reasons behind it. |
| **AI Capability** | What an AI system can actually do, such as read files, analyze data, write code, or fix a defect. Capability does not itself grant permission. |
| **AI Engineering** | An organized way to use AI to build software under defined methods and controls. |
| **AI Executor** | An AI system selected and assigned to perform a specific task directly. It executes within the task's authorized scope. |
| **AI Memory** | Information an AI system or conversation may retain. It can be useful, but it is not the project's durable canonical source of truth. |
| **Authority** | Permission to perform an action or make a decision. The book distinguishes capability from authority. |
| **Authority Engine** | A named PAECS component in the book's conceptual description, concerned with resolving and enforcing authority. It is not a shipped component in this repository. |

## B

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **BESS — Battery Energy Storage System** | A system that stores electrical energy in batteries and makes it available for later use. |
| **Blast Radius** | The scope of impact if a change or failure causes a problem. |
| **BOQ — Bill of Quantities** | A structured list of materials, equipment, or work items required for a project. |
| **Build** | The process of producing a software artifact that can run or be deployed. A successful build does not, by itself, authorize a release. |

## C

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Canonical Source / Canonical Record** | The source that the project officially recognizes as authoritative. When recognized sources conflict, the project's defined precedence rules determine which one governs. |
| **Capability** | What a person or system is able to do. Capability is distinct from permission or authority. |
| **CAPEX — Capital Expenditure** | Initial investment cost for assets, equipment, and infrastructure. |
| **Checkpoint** | A saved project position that helps work continue or recover later. It is a recovery point, not necessarily the current state. |
| **Change** | A material modification to code, configuration, requirements, architecture, data, knowledge, or project state that may affect subsequent engineering work. |
| **Change Impact** | An analysis of which components, requirements, interfaces, data, or behaviors may be affected by a change. |
| **Context** | The information an executor needs to understand and perform a task correctly. |
| **Context Compiler** | A mechanism described in the book that transforms task requirements and recognized project truth into a task-specific working context. It is not another AI model or an agent that owns project truth. |
| **Context Engineering** | Selecting, validating, organizing, and supplying the right information for a task and executor. More context is not automatically better. |
| **Context Manifest** | A proposed structured record describing the context selected for a task, including sources and relevant metadata. A normative schema has not yet been published in this repository. |
| **Controlled Autonomy** | Allowing an executor to act within defined limits, permissions, and approval rules rather than granting unrestricted control. |
| **Current State** | The project's recognized position now, including accepted work, active tasks, blockers, versions, and verification status. |

## D

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Deployment** | Installing or making a software artifact available in an environment. Deployment is not the same as release authorization. |
| **Deterministic Subtask** | A bounded task whose objective, inputs, constraints, and expected result are defined sufficiently for review and verification. The term does not imply that an AI model's internal generation is deterministic. |

## E

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Engineering Evidence** | Inspectable information supporting a claim about a change or requirement, such as test results, review records, checks, logs, or other relevant proof. |
| **Engineering Method** | The project's agreed way of defining, authorizing, executing, verifying, recording, and continuing engineering work. |
| **Engineering Run** | A bounded period during which an AI Executor or a developer performs authorized work on a project. A run is temporary; the project continues beyond it. |
| **Evidence Package** | A compact collection of task, change, verification, evidence, limitation, and state information used to support review, handoff, recovery, or release decisions. |
| **Executor Eligibility** | The determination that a candidate executor is suitable and permitted for a particular task, considering capability, context, risk, permissions, state compatibility, availability, and other task requirements. |

## F

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Fail Closed** | When a critical condition such as state integrity, authority, or a required record cannot be established, block the action rather than assume or guess. |
| **Feature Flag** | A mechanism for controlling whether a feature is enabled in a given environment or for a given audience. The book discusses it in the context of release control. |

## G

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Governance** | The rules, responsibilities, constraints, and approval boundaries that determine how engineering work and consequential decisions are controlled. |

## H

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Handoff** | A controlled transfer of unfinished or continuing work to another executor or person, supported by synchronized task, state, changes, evidence, blockers, and next action. |
| **Handoff Contract** | The information required for a recipient to continue work accurately, including active task, completion status, current state, material changes, evidence, blockers, constraints, and next action. |

## I

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Implementation** | The act of producing or modifying a software artifact. Implementation alone does not establish that the requirement is verified. |
| **Engineering Intent** | The intended outcome or purpose of a piece of engineering work, used to keep execution connected to the requirement or product goal. |

## K

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Knowledge Manifest** | A project artifact identifying recognized knowledge sources and relevant information about them. Its exact schema is future specification work. |

## L

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Last Known Good State** | The most recent state known to be acceptable and supported by the project's evidence and rules, used as a recovery reference. |

## M

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Method Lock** | The principle that changing an AI executor or provider should not silently change the project's agreed engineering method. |
| **Model / Provider** | The AI model or service supplying capabilities to an executor. The book argues that the project should not depend on one model or provider's memory. |

## P

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **PAECS — Project AI Engineering Continuity System** | The continuity-control system named in the book. Its purpose is to let a project continue in a controlled way when an executor changes, a run ends, or the environment changes. The book describes conceptual engines and controls; this repository is not yet a complete PAECS implementation. |
| **Project Knowledge** | Durable information the project recognizes about itself: architecture, business rules, engineering standards, terminology, dependencies, documentation, and accepted decisions. It answers: “What does the project know?” |
| **Project State** | The recognized current position of the project: active and completed work, blockers, changes, versions, verification status, and next actions. It answers: “Where does the project stand?” |
| **Project Continuity** | The capability to resume engineering work accurately from project-owned records, without depending on one AI conversation, model, provider, or executor. |
| **Project Memory** | An informal way of referring to durable project knowledge and state. The book refines this idea into structured Knowledge, State, Evidence, Events, Checkpoints, and retrieval rather than one large memory. |
| **Provenance** | Information about where a piece of knowledge or evidence came from and how it entered the project record. |

## R

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Recovery** | The ability to reconstruct or resume work from a known safe position after a run, tool, provider, environment, or working state fails. |
| **Release** | An authorized decision to make a software change or version available to its intended users or environment. A deployed artifact is not automatically released. |
| **Release State Machine** | A model of the distinct states and permitted transitions involved in deciding whether a build is ready, approved, released, or rolled back. |
| **Repository Adapter** | A source-control or storage system used to store and retrieve project artifacts. GitHub, local Git, GitLab, Gitea, or a private server may serve this role. A repository adapter does not automatically own engineering authority. |
| **Run Delta** | A compact summary of material changes during an Engineering Run, including relevant state transitions and evidence. |
| **Run Record** | A compact engineering record describing a run, such as its task, executor, start/end, state before and after, changes, verification, checkpoint, handoff, and open issues. It is not a full chat transcript. |

## S

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Semantic Contract** | A provider-neutral description of the task's meaning, constraints, expected behavior, and acceptance requirements, intended to preserve meaning across different executors. |
| **Snapshot** | A captured view of project state at a point in time. A snapshot complements an event log; it does not explain every event that led to that state. |
| **Stopping Condition** | A defined condition that tells an executor when the assigned task is complete, blocked, or must stop for review or clarification. |

## T

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Task** | A bounded unit of authorized engineering work with an objective, scope, inputs, constraints, dependencies, expected outputs, and completion conditions. |
| **Task Decomposition** | Breaking a broad engineering goal into smaller, bounded, reviewable tasks while retaining the context and dependencies needed for correctness. |
| **Task-First** | The approach of starting from task requirements and selecting an eligible executor, rather than starting from a preferred AI model. |

## V

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Verification** | Evaluating a result against requirements and acceptance criteria using appropriate evidence. It is not equivalent to receiving a completion statement or running any single test. |
| **Verification Budget** | The amount and type of verification effort appropriate for a task's risk, impact, uncertainty, and reversibility. |
| **Verification Gate** | A control point that determines whether the available evidence is sufficient for the requested state transition or acceptance decision. |
| **Vibe Budget** | The book's way of thinking about how much exploratory freedom is appropriate for a task, with freedom proportionate to risk. It is not a fixed numerical measure unless a project defines one. |

## W

| Term | Meaning in Beyond Vibe Coding |
|---|---|
| **Workspace Lock** | A control that limits who may write to the canonical working state. The book's default rule is “one active writer” unless coordinated concurrency has been explicitly designed. |

---

## Terminology rules

Use these distinctions consistently:

- **AI Memory is not Project Knowledge.**
- **Chat History is not Project State.**
- **A Checkpoint is not necessarily the Current State.**
- **A Claim is not Evidence.**
- **Implementation is not Verification.**
- **Deployment is not Release.**
- **Capability is not Authority.**
- **A Repository is not, by itself, the Engineering Authority.**
- **An Engineering Run is not the Project Lifecycle.**

For the book's exact chapter sequence and where terms are introduced, see [Book Chapter Map](./book-chapter-map.md).
