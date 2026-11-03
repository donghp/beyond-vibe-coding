# Beyond Vibe Coding

### A Project-Centric Engineering Framework for AI-Assisted Software Development

> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**
>
> **Prompting gets you a prototype. Engineering gets you to production.**

**Beyond Vibe Coding (BVC)** explores a more disciplined way to build and maintain real software with AI coding tools and agents.

This repository is the open engineering companion to **_BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_** by **Dong Hong**.

BVC does not aim to make prompts longer, build more autonomous agents, or depend on a particular AI provider. Its purpose is to help people build software that remains understandable, secure, controlled, verifiable, and maintainable as AI participates in engineering work.

[**Read BEYOND VIBE CODING on Google Play Books →**](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

---

## Start Here

New to AI-assisted software development? You do not need to be an AI engineer to begin.

BVC provides a practical foundation for people who want to use AI coding tools without losing control of the software they build. Through **Build & Learn**, readers can also start with a practical project that solves an everyday work problem.

**Recommended starting points:**

1. [Start Here — A 5-Minute Introduction](docs/00-start-here.md)
2. [Framework Overview](docs/framework-overview.md)
3. [Task Contract Guide](docs/task-contract.md)
4. [Core Specifications Index](specifications/v0.1/README.md)
5. [Build & Learn — BVC Task Management Product Definition](projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)

You can also explore the [Documentation Index](docs/README.md) for the complete reading path.

### Choose your learning path

| Audience | What you will learn |
|---|---|
| **Beginner / Vibe Coder** | How to start with a simple practical project, explain what you need, guide AI step by step, and check the result. |
| **Individual / Independent Builder** | How to build and use small personal tools, organize project knowledge, and keep control of AI-assisted changes. |
| **Business User / Owner** | How to use a role-based starter kit as a starting point for everyday work, then adapt the tool to your own needs. |
| **Developer** | How to apply structured task contracts, validation, testing, and source-control practices. |
| **Team Lead / Engineering Manager** | How to coordinate AI-assisted work, review changes, and maintain consistent engineering practices. |
| **CTO / Software Architect** | How to reason about authority, security, architecture integrity, risk, and project governance. |
| **AI Engineer** | How to integrate AI executors into a technology-neutral, project-controlled engineering method. |

BVC is intended to make practical building and engineering discipline progressively accessible. Beginners can start with simple projects; experienced practitioners can examine the specifications, schemas, validators, tests, and engineering boundaries.

---

## The Problem: Generating Code Is Not the Same as Finishing Software

AI coding tools can turn ideas into working prototypes remarkably quickly.

But as a project grows, speed alone does not solve the harder engineering problems:

- **Unbounded tasks:** Broad requests produce changes that are difficult to scope, review, and verify.
- **Context degradation:** Requirements, decisions, constraints, and project knowledge become fragmented across files and conversations.
- **State loss:** A new session, model, provider, or executor may not know what has actually changed or what remains incomplete.
- **Architectural drift:** Locally plausible changes can violate system-wide decisions, interfaces, or constraints.
- **Unverified completion:** An AI response saying "done" is not evidence that the requirement has been met.
- **Unclear authority:** An executor may propose or perform changes beyond its intended scope.
- **Security exposure:** AI-generated code and tool actions can introduce risks that are not obvious from a successful build.
- **Broken continuity:** Engineering work becomes dependent on one model, one provider, or one conversation instead of the project itself.

A prototype can run and still be far from a reliable product.

The central challenge is not simply how to make AI write code faster. It is how to keep software understandable, secure, verifiable, and under human control throughout its development.

---

## The Project-Centric Approach

The central principle of Beyond Vibe Coding is:

> **The AI performs a task. The project retains the truth.**

The project—not the conversation or the currently selected AI model—must remain the durable source of its requirements, accepted decisions, current state, authority rules, and engineering evidence.

BVC organizes its initial engineering method around five connected concerns:

| Concern | Engineering question | Intended outcome |
|---|---|---|
| **Task** | What exactly is the executor allowed and expected to do? | Bounded work with explicit scope and completion criteria. |
| **Context** | What information is relevant, current, authoritative, permitted, and sufficient? | A controlled, task-specific working context. |
| **State** | What is true about the project now? | A durable record of progress, decisions, and unresolved work. |
| **Change** | What actually changed during execution? | Traceable changes and scope-integrity information. |
| **Evidence** | How do we know the result has been checked? | Verifiable support for completion and acceptance decisions. |

These concerns work together.

They are not intended to make every task complicated. The amount of control should be proportionate to the task's scope, risk, and impact.

---

## Core Engineering Principles

### 1. Decompose Work Before Execution

Turn broad engineering goals into bounded tasks with clear objectives, scope, inputs, constraints, dependencies, acceptance criteria, and verification requirements.

Tasks should be small enough to control while preserving meaningful engineering context.

### 2. Compile the Right Context

Context Engineering is more than adding more files to a prompt.

Select information according to its relevance, freshness, authority, scope, dependencies, conflicts, and access permissions.

The book develops the **Context Compiler** as a way to prepare task-specific execution context. Its purpose is to select and organize project truth—not invent it.

### 3. Keep Project State Outside the Executor

A project should be able to explain what has been completed, what has changed, what is blocked, which decisions are in force, and what must happen next without depending on an AI conversation's memory.

### 4. Keep Authority and Responsibility Clear

AI may analyze, propose, and execute within an assigned scope.

The project must define which actions are permitted and which require human authorization, especially where security, data, architecture, financial calculations, production systems, or customer outcomes are involved.

### 5. Preserve Scope Integrity

The ability of an AI executor to perform an action does not mean it has permission to perform that action.

CREATE, MODIFY, and DELETE permissions must be distinguishable. An executor must not silently expand its authorized scope.

### 6. Verify Before Declaring Completion

Generated output is not proof of correctness.

Define completion criteria before execution and collect appropriate evidence—such as tests, review results, checks, or explicit human approval—before accepting consequential changes.

### 7. Make Continuity Explicit

When an AI executor, model, provider, run, or environment changes, the next executor should receive a controlled handoff containing task status, relevant context, current state, decisions, changes, evidence, and unresolved items.

### 8. Keep the Method Technology-Neutral

The engineering method should not depend on one AI model, provider, IDE, programming language, or execution framework.

The project owns its method and records. Tools and executors operate within the project's defined boundaries.

---

## A Reference Engineering Workflow

The following diagram illustrates the intended BVC engineering lifecycle.

It is a conceptual workflow, not a claim that this repository already ships an executable orchestration engine.

```mermaid
flowchart TD
    A["Engineering Goal"] --> B["Decompose into Bounded Tasks"]
    B --> C["Define Scope and Constraints"]
    C --> D["Resolve Authority and Executor"]
    D --> E["Read Current Project State"]
    E --> F["Compile Task Context"]
    F --> G["Execute with AI Executor"]
    G --> H["Collect Changes and Evidence"]
    H --> I{"Verification Passed?"}
    I -->|"No"| J["Record Failure and Revise"]
    J --> B
    I -->|"Yes"| K{"Human Approval Required?"}
    K -->|"Yes"| L["Human Review and Authorization"]
    K -->|"No"| M["Accept Verified Result"]
    L --> M
    M --> N["Update Project State and Checkpoint"]
    N --> O["Prepare Next Task or Handoff"]
```

### Workflow step reference

| Step | Meaning |
|---|---|
| Engineering Goal | Establish the intended engineering outcome. |
| Decompose into Bounded Tasks | Break the goal into manageable, reviewable units of work. |
| Define Scope and Constraints | Specify allowed work, constraints, dependencies, and acceptance criteria. |
| Resolve Authority and Executor | Determine who or what may perform the task and which actions require approval. |
| Read Current Project State | Load the authoritative current state before changing the project. |
| Compile Task Context | Select relevant, current, permitted, and sufficient information. |
| Execute with AI Executor | Perform the assigned task within its authorized scope. |
| Collect Changes and Evidence | Record what changed and collect evidence needed to evaluate the result. |
| Verification Passed? | Check the result against acceptance criteria and required evidence. |
| Record Failure and Revise | Record the failure, correct the task or implementation, and retry or escalate. |
| Human Review and Authorization | Review evidence and authorize consequential actions where required. |
| Accept Verified Result | Accept the result only after required checks and approvals. |
| Update Project State and Checkpoint | Record the new state and create a recoverable checkpoint. |
| Prepare Next Task or Handoff | Prepare the next task or transfer work to another executor. |

---

# Phase 1 — Framework Foundation

Phase 1 establishes the conceptual foundation of Beyond Vibe Coding.

The five foundation documents explain the problem, method, architecture, terminology, and relationship between the book and the companion repository.

| Document | Purpose |
|---|---|
| [Start Here](docs/00-start-here.md) | Introduction and recommended learning paths. |
| [Framework Overview](docs/framework-overview.md) | BVC philosophy, principles, problems, and capability areas. |
| [Conceptual Architecture](docs/architecture.md) | Project-centric engineering architecture and intended boundaries. |
| [Engineering Glossary](docs/glossary.md) | Shared terminology and technical definitions. |
| [Book Chapter Map](docs/book-chapter-map.md) | Mapping to the English edition's Introduction, 21 chapters, Conclusion, and end matter. |

These documents describe the intended method and architecture. They do not claim that every conceptual component has already been implemented.

---

# Phase 2 — Core Specifications

Phase 2 turns the central BVC engineering concepts into structured, machine-readable data contracts.

The five specifications form an initial traceable engineering control cycle.

All five are currently **Draft / Experimental v0.1.0** and use JSON Schema Draft 2020-12. Phase 2 integration was completed and merged through [Pull Request #2](https://github.com/donghp/beyond-vibe-coding/pull/2). Completion of the integration does not promote the specifications to Stable.

## The Five Core Specifications

### 1. Task Contract

**Question: What is the AI executor expected and authorized to do?**

Defines:

- Task identity and objective.
- Project baseline.
- Risk policy reference.
- Authorized scope.
- Separate CREATE, MODIFY, and DELETE permissions.
- Forbidden paths and constraints.
- Required context.
- Expected outputs.
- Acceptance criteria.
- Verification requirements.
- Change Budget.
- Authority and Human Approval.
- Stopping conditions.
- Reporting and continuity requirements.

Resources:

- [Task Contract Specification](specifications/v0.1/task-contract.md)
- [JSON Schema](specifications/v0.1/task-contract.schema.json)
- [Examples](specifications/v0.1/examples/)
- [Reusable Template](templates/task-contract.yaml)

### 2. Context Manifest

**Question: Which information is selected for the task, and why should it be used?**

Records:

- Context source identity.
- Provenance and references.
- Source authority and trust classification.
- Freshness and relevance.
- Included and excluded sources.
- Conflicts and unresolved issues.
- Context preparation status.

Resources:

- [Context Manifest Specification](specifications/v0.1/context-manifest.md)
- [JSON Schema](specifications/v0.1/context-manifest.schema.json)
- [Example](specifications/v0.1/core-examples/context-manifest.example.yaml)
- [Reusable Template](templates/context-manifest.yaml)

### 3. Project State

**Question: What is the durable, current state of the project?**

Records:

- Verified project facts.
- Assumptions.
- Accepted decisions.
- Active and completed tasks.
- Blockers.
- Risks.
- Next actions.
- Baseline and recovery references.

Resources:

- [Project State Specification](specifications/v0.1/project-state.md)
- [JSON Schema](specifications/v0.1/project-state.schema.json)
- [Example](specifications/v0.1/core-examples/project-state.example.yaml)
- [Reusable Template](templates/project-state.yaml)

### 4. Change Record

**Question: What actually changed during engineering execution?**

Records:

- Observed file changes.
- CREATE, MODIFY, and DELETE operations.
- Repository baseline references.
- Changed-file inventory.
- Scope-integrity results.
- Change Budget results.
- Deviations and unresolved issues.

Resources:

- [Change Record Specification](specifications/v0.1/change-record.md)
- [JSON Schema](specifications/v0.1/change-record.schema.json)
- [Example](specifications/v0.1/core-examples/change-record.example.yaml)
- [Reusable Template](templates/change-record.yaml)

### 5. Verification Evidence

**Question: Which checks were performed, what evidence resulted, and has the work been accepted?**

Records:

- Acceptance criteria references.
- Verification check definitions.
- Actual check results.
- Evidence references.
- Known limitations.
- Verification outcome.
- Separate human acceptance information.

Resources:

- [Verification Evidence Specification](specifications/v0.1/verification-evidence.md)
- [JSON Schema](specifications/v0.1/verification-evidence.schema.json)
- [Example](specifications/v0.1/core-examples/verification-evidence.example.yaml)
- [Reusable Template](templates/verification-evidence.yaml)

## How the Five Specifications Work Together

```text
             TASK CONTRACT
        Authorized task and scope
                 |
          +------+------+
          |             |
          v             v
    CONTEXT MANIFEST  PROJECT STATE
    Selected sources  Current project facts
          |             |
          +------+------+
                 |
          AI EXECUTION
                 |
                 v
           CHANGE RECORD
         Actual changes observed
                 |
                 v
       VERIFICATION EVIDENCE
         Checks and evidence
                 |
                 v
          HUMAN ACCEPTANCE
```

This is a conceptual traceability relationship, not a mandatory storage sequence for every operation.

The records must preserve their identities, revisions, source baselines, and references to one another.

**Important:** A valid data record does not automatically prove that a real-world action was authorized or correctly performed. Runtime enforcement and trusted evidence collection require additional implementation.

## Validate the Core Specifications

The repository currently provides:

- Five JSON Schemas.
- Three Task Contract YAML examples.
- Four companion Core Specification YAML examples.
- One changed-files inventory JSON example.
- Five reusable YAML templates.
- Two Python validation scripts.
- Automated unit tests.
- A GitHub Actions workflow.

See the [Core Specification Index](specifications/v0.1/README.md) for complete details.

---

## Run the Validation Tools Locally

The current validation tools use Python.

You can run them from the repository root.

### Requirements

- Python 3.12.
- Git.
- A terminal or integrated terminal in VS Code.

### Installation

```bash
python -m pip install -r requirements-dev.txt
```

### Validate Task Contracts

```bash
python scripts/validate_task_contracts.py
```

This checks the published Task Contract examples against the JSON Schema and additional semantic rules.

### Validate the Four Companion Specifications

```bash
python scripts/validate_core_specifications.py
```

This checks the four companion schemas and examples, together with selected relationships across the five-record example bundle.

### Run All Automated Tests

```bash
python -m unittest discover -s tests -v
```

The repository contains 17 Task Contract test cases and 27 companion Core Specification test cases, for a total of **44 automated test cases**.

The most recently reported local full-suite run completed with **44/44 tests PASS**. This is the latest reported local result, not a claim that this README update has already been tested. Check GitHub Actions for the result associated with the exact commit or pull request under review.

---

## Continuous Integration — GitHub Actions

The repository includes a GitHub Actions workflow:

[`.github/workflows/validate-task-contracts.yml`](.github/workflows/validate-task-contracts.yml)

For relevant changes on `main` and Pull Requests targeting `main`, the workflow is designed to:

1. Check out the repository.
2. Set up Python 3.12.
3. Install validation dependencies.
4. Validate Task Contract examples.
5. Validate all five Core Specifications and selected cross-record relationships.
6. Run the automated test suite.

The workflow helps identify invalid schemas, examples, semantic rules, and regressions before changes are accepted.

A passing CI run confirms only that the configured checks passed for the tested revision.

It does not prove that every possible Task Contract is safe, that an AI executor obeyed its permissions, or that a production system is correct.

[**View GitHub Actions →**](https://github.com/donghp/beyond-vibe-coding/actions)

---

## What This Repository Does — and Does Not — Provide

Transparency about implementation maturity is a core BVC principle.

### Currently Provided

- A documented project-centric engineering method.
- Five framework foundation documents.
- Five machine-readable Draft / Experimental Core Specifications.
- Five JSON Schemas using Draft 2020-12.
- YAML examples and reusable templates.
- Python validation utilities.
- Automated unit tests.
- GitHub Actions validation workflow.
- A documented relationship between the book and the technical companion repository.
- The Build & Learn direction and the BVC Task Management Product Definition v0.1.0.

### Not Yet Provided

- A complete PAECS runtime.
- A production-ready AI orchestration engine.
- A filesystem sandbox that prevents unauthorized writes during execution.
- A trusted Git diff collector connected to every AI execution.
- A service that authenticates human approvals.
- Automatic enforcement of all project-specific risk policies.
- A completed BVC Task Management application.
- Cloud synchronization or multi-user collaboration for BVC Task Management.
- A stable API or guaranteed backward compatibility.

The current Task Contract Validator performs structural and semantic checks and can inspect a supplied post-run changed-files inventory.

It does not independently collect all actual changes from a trusted execution environment or prevent an AI executor from writing outside its authorized scope.

These limitations are intentional to state clearly. A data specification and its validator are not the same as a complete runtime security system.

---

## Phase 3 — Build & Learn: Practical Projects and Hands-on Guides

**Build & Learn** is a practical learning space for readers who want to use AI to create useful products for real everyday needs. It welcomes beginners and experienced practitioners through simple projects and progressively deeper hands-on guides.

The guiding idea is:

> **Build something useful. Use it every day. Learn by doing.**

The goal is not to build software merely to practice coding. The goal is to start with a real need, build a useful tool with AI, use it in everyday work, and learn how to guide, control, and verify the development process.

### First project — BVC Task Management

**[BVC Task Management — A Simple Daily Work Manager](projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)** is the first Build & Learn project.

It is intended to be a simple personal work-management application that people can adapt to different everyday roles and responsibilities, including:

- Individual and personal work.
- Sales team leads.
- Marketing managers.
- Executives and business owners.
- Shop owners.
- Restaurant owners.
- Project managers.

The initial product direction is one core application with role-based starter kits—not separate applications for every profession. Starter kits provide relevant example categories, projects, tasks, and checklists that users can change to suit their own work.

The initial product experience is organized around a small set of understandable areas:

- **My Day:** focus on what needs attention today, overdue work, and upcoming tasks.
- **My Tasks:** view, create, update, search, and filter work items.
- **Projects:** group related tasks by project or area of responsibility.
- **Templates:** choose a starter kit and adapt it to personal work.
- **Settings & Backup:** manage preferences and export or restore local data.

The exact MVP scope and acceptance criteria are defined in the Product Definition. Features must not be added merely because they are technically possible; they should solve a clear user need without making everyday use unnecessarily complicated.

### User experience direction

The application is intended to provide a simple, natural, responsive experience across:

- iPhone and Android phones.
- Tablets in portrait and landscape orientations.
- Laptops and desktop PCs.

The design direction is mobile-first and responsive. The interface should make the next useful action easy to discover, keep common tasks simple, reveal advanced details only when needed, and support touch, keyboard, and accessible interaction.

Responsive display across devices does **not** mean automatic data synchronization between them.

### Local-first MVP and its limits

The first version is planned as a browser-based, local-first, single-user application. User data is stored locally on the current device and browser. The MVP does not automatically synchronize data between a phone, tablet, laptop, or PC. Moving data between devices requires an explicit backup and restore process.

Cloud synchronization, accounts, multi-user access, team collaboration, and real-time updates are future scope. They will be considered only when real user needs justify the additional security, privacy, authorization, and operational requirements.

The specific application architecture and technology choices will be evaluated in the next design stage. The Product Definition describes the user-facing product and its scope; it does not by itself settle the implementation architecture.

### Build & Learn and the five Core Specifications

Build & Learn also provides a way to learn how AI-assisted development can be controlled and verified.

The five Phase 2 Core Specifications remain the engineering control foundation:

1. **Task Contract** — define the engineering task, its authorized scope, and acceptance criteria.
2. **Context Manifest** — record the sources selected for the engineering task.
3. **Project State** — record the durable state of the project.
4. **Change Record** — record observed repository changes.
5. **Verification Evidence** — record checks performed and the evidence produced.

These specifications govern AI-assisted engineering work. They are not the same as the everyday Business Tasks that a person creates and manages inside BVC Task Management. The two concepts must remain separate. An application task may reference an engineering task where useful, but the application must not silently redefine or modify the frozen Core Specifications.

Build & Learn will progressively publish practical projects, role-based starter kits, examples, and hands-on guides. Product implementation and learning materials will be published only when their stated behavior and instructions have been reviewed and verified.

**Current Phase 3 status:** Product Definition v0.1.0 establishes the proposed MVP baseline. Application implementation has not started.

---

## Project Case Study — Enerix Fin (EFIN)

The book uses **Enerix Fin (EFIN)**, also referred to by its product name **EnerixFin**, as a real-world engineering laboratory for exploring the ideas in this project.

Its domain includes Solar and Battery Energy Storage System (BESS) engineering and investment workflows.

The case study follows a connected engineering process:

- Customer and site information.
- Engineering analysis.
- Solar and BESS design.
- Energy analysis.
- CAPEX and bill of quantities.
- Financial modeling.
- Investment proposals.
- Verification and engineering continuity.

It illustrates why real engineering products require consistent data, dependencies, verification, security, and continuity—not just generated screens or isolated code changes.

BVC generalizes the applicable engineering principles. EFIN-specific repository paths, governance identifiers, policies, and operational arrangements are not automatically universal BVC requirements.

Any public examples derived from EFIN must be sanitized and published only where the relevant rights and permissions allow.

This repository does not disclose customer data, credentials, confidential commercial information, or proprietary implementation details. The case study must not be interpreted as a claim that every described workflow is a deployed production system.

---

## Technology, Model, and Provider Neutrality

BVC is intended to remain independent of a particular AI model, model provider, IDE, or coding assistant.

The project should own:

- Its requirements.
- Its authoritative knowledge.
- Its current state.
- Its engineering policies.
- Its task boundaries.
- Its verification evidence.
- Its continuity records.

AI models and coding tools are replaceable executors.

Examples may refer to specific technologies where useful, but no provider is endorsed by this repository. Tool-specific behavior should be verified against the relevant tool's current documentation.

---

## Repository Roadmap

The project is developed incrementally. Each phase should produce reviewable, documented, and verifiable artifacts.

| Phase | Objective | Status |
|---|---|---|
| **Phase 1** | Framework Foundation and Conceptual Architecture | Published |
| **Phase 2** | Five Core Specifications and validation foundation | Integration completed and merged via PR #2; specifications remain Draft / Experimental v0.1.0 |
| **Phase 3** | Build & Learn — Practical Projects and Hands-on Guides; first project: BVC Task Management | Product Definition v0.1.0 establishes the proposed MVP baseline; implementation not started |
| **Future Evolution** | Cloud synchronization, team collaboration, advanced runtime enforcement, and broader integrations | Future scope; subject to real use cases, security requirements, and evidence |

Advanced multi-agent orchestration, Router–Worker systems, and complex Harness implementations are not prerequisites for the beginner-friendly Build & Learn projects.

They may be evaluated in future versions when real use cases and validation evidence justify them.

The priority is a simple, secure, and useful learning experience—not unnecessary complexity.

---

## Repository Status and Maturity

**Current development focus: Phase 3 — Build & Learn.**

Phase 2 provides five machine-readable Core Specifications, all **Draft / Experimental v0.1.0**, together with JSON Schemas, examples, templates, Python validators, automated tests, and a GitHub Actions workflow.

The repository provides a testable initial foundation for project-centric AI-assisted engineering. Build & Learn is the practical project and learning direction. Its first Product Definition establishes the proposed MVP baseline; the Task Management application has not yet been implemented.

However:

- The specifications are not an internationally certified standard.
- Draft / Experimental status does not provide stable API or compatibility guarantees.
- The existing validators do not replace runtime security controls.
- Automated test success does not prove universal correctness.
- Human responsibility for architecture, security, acceptance, and release remains essential.

A future Stable specification should require broader valid and invalid examples, boundary and adversarial testing, compatibility rules, independent implementation experience, documented change control, and technical review.

Please check the repository's actual contents, version history, validation results, and known limitations before adopting an artifact.

---

## Contributing and Discussion

Practical feedback is welcome.

Useful contributions include:

- Reproducible engineering examples.
- Specification reviews.
- Schema improvements.
- Validation test cases.
- Implementation experiments.
- Security threat models.
- Failure cases.
- Architecture trade-offs.
- Documentation improvements.
- Suggestions that improve clarity and interoperability.
- Feedback on practical projects, starter kits, and hands-on guides.

When opening an issue, please include:

1. The engineering problem and intended outcome.
2. The relevant task or workflow context.
3. A minimal reproducible example, where possible.
4. Expected behavior versus observed behavior.
5. Security, compatibility, or operational implications.

Please do not publish secrets, credentials, personal data, customer information, or proprietary code in public issues or pull requests.

[**Open a GitHub Issue →**](https://github.com/donghp/beyond-vibe-coding/issues)

---

## Companion Book

**_BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_**

**Author: Dong Hong**

The book develops the ideas behind this repository across 21 chapters, from Vibe Coding and task decomposition to context engineering, project continuity, verification, governance, architecture, and real-world product outcomes.

The book provides the broader reasoning, engineering method, trade-offs, and deeper discussion.

This GitHub repository provides a free practical engineering companion with specifications, templates, examples, validation tools, practical projects, and hands-on guides.

**Read the book and explore the companion resources:**

[**BEYOND VIBE CODING on Google Play Books →**](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

---

## License and Reuse

**No repository-wide license has been declared yet.**

Until an applicable license is added, repository contents remain protected by their applicable copyright. Public visibility does not automatically grant permission to reuse, redistribute, or commercially exploit the material.

Code, specifications, diagrams, documentation, and book content may require different licensing terms.

Third-party materials, if any, remain subject to their own licenses.

Please check the applicable licensing terms before reusing or redistributing repository content.

---

## Author

**Dong Hong** began programming in 1999 and has worked in software development and outsourcing environments.

Beyond Vibe Coding reflects an ongoing effort to understand how software engineering should evolve when AI systems participate directly in analysis, implementation, testing, and delivery.

The method is presented as an evolving body of practical work—not as the only way to build software.

Its principles should be tested against real project constraints, reviewed by practitioners, and improved when evidence shows a better approach.

---

> **Security First. Human in Control. AI as Executor. Evidence before Acceptance.**

**Beyond Vibe Coding** — from generating code to engineering software that can be understood, secured, verified, and continued.

