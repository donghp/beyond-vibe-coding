# BVC Task Management — Practical Learning Path

**Curriculum version:** 0.2.0  
**Product baseline:** BVC Task Management Product Definition v0.2.0  
**Audience:** Beginner to Advanced  
**Status:** Updated learning map — individual lessons retain their own evidence status  
**Supersedes:** Curriculum Map v0.1.0

---

## 1. Purpose

Use one familiar, everyday application to teach people how to work with AI coding tools and progressively understand software engineering.

Readers begin with Google AI Studio and a blank web app. They then learn to give AI durable project instructions, prepare clear task prompts, and build a useful application through small, verified outcomes.

The product evolves through Beginner, Intermediate, and Advanced learning levels. These are learning stages of one product, not three unrelated applications.

## 2. PHASE A — MEET AI & BUILD YOUR FIRST APP

**Learning level:** Beginner  
**Environment:** Google AI Studio Build mode and application Preview.

| Lesson | Title | What the reader will do | Completion checkpoint |
|---|---|---|---|
| A1 | Meet Google AI Studio | Understand GAIS, Build mode, Chat, Code, and Preview using the observed interface. | Relevant GAIS screens and first app entry point are observed and recorded. |
| A2 | Create Your First Blank Web App | Use BVCTM-PROMPT-0001 to create a minimal blank WEB app and inspect its Preview and scaffold. | Blank Preview and actual file tree are observed; framework, dependencies, versions, package manager, and commands are recorded only when verified. |
| A3 | Set Up Project Instructions | Copy the canonical BVC Task Management Project Instructions into GAIS Custom Instructions and run BVCTM-PROMPT-0002 as a read-only check. | Instructions are saved; AI explains them accurately; no application files change. |
| A4 | Talk to AI Like a Teammate | Learn goal, everyday context, boundary, expected outcome, and confirmation before implementation. | Learner can prepare and review one clear, bounded request. |

### Phase A result

The learner can:
- Start a web app in GAIS.
- Recognize and inspect the actual generated scaffold.
- Give AI the project's working rules.
- Separate Project Instructions from task-specific prompts.
- Describe one task clearly and check AI's understanding.

### Phase A boundary

No database, Supabase, Auth, RLS, GitHub, VS Code, Localhost, or deployment is required.

Project Instructions and the read-only understanding check do not implement Task Management features.

## 3. PHASE B — BUILD YOUR FIRST TASK

**Learning level:** Beginner  
**Theme:** First Vertical Slice  
**Status:** B1 scope approved by the Human Owner; implementation and runtime evidence remain separate acceptance items.

| Lesson | Title | What the reader will do | Completion checkpoint |
|---|---|---|---|
| B1 | Create Your First Task | Enter a title, add the task, and see it in a list. Keep it in page memory only. | A valid title appears; blank and spaces-only titles are rejected. Refreshing resets the temporary list. |
| B2 | Save Your Task | Save the task in the approved Beginner browser workspace after the first-use disclosure decision is resolved. | The actual save behavior is verified; the app gives truthful feedback. |
| B3 | Close and Reopen | Reload or reopen the app in the same browser profile and app origin. | The exact saved task remains available without being re-created. |
| B4 | Improve One Small Thing | Make one approved, bounded improvement and repeat the relevant regression checks. | The improvement is visible and B1–B3 still work. |

### The B1/B2 distinction

The First Vertical Slice is taught in two separate data-lifecycle steps:

1. **B1 — Create:** keep tasks in the current page's in-memory state and show them in a list. No browser persistence is added.
2. **B2 — Save:** introduce the approved, versioned Beginner browser workspace. DR-014 is ACCEPTED FOR DESIGN; runtime behavior still requires evidence.
3. **B3 — Reopen:** verify that the same saved task is loaded again in the same browser profile and application origin.

A task disappearing after refresh during B1 is expected. Do not describe it as a persistence bug or add storage to B1.

### Phase B implementation gates

- B1 scope has been approved by the Human Owner; use the active, published B1 Contract and exact file allowlist before executing.
- B2 must not be implemented until DR-005 (first-use storage disclosure timing and exact copy) is explicitly resolved and a separate B2 scope is approved.
- The actual GAIS scaffold and existing files must be inspected before choosing implementation details.
- Beginner does not require an external database, sign-in, Supabase, VS Code, Localhost, or deployment.
- A Preview or successful build is not proof that the task flow works.
- Keep formal Phase 3.1 UX Acceptance OPEN; do not treat this learning-path update as formal UX acceptance.

## 4. PHASE C — MAKE IT USEFUL EVERY DAY

**Learning level:** Beginner expansion  
**Theme:** Add everyday value progressively.

| Lesson group | Learning area | What the reader will learn | Boundary |
|---|---|---|---|
| C1 | My Day | Understand Overdue, Due Today, Today's Focus, and Upcoming. | Exact date horizon and Focus behavior must follow approved decisions. |
| C2 | My Tasks | View, create, edit, complete, prioritize, search, and filter tasks. | Implement only approved behavior and verify task state. |
| C3 | Projects | Organize tasks into personal projects or work areas. | Project-removal behavior must respect the current decision status. |
| C4 | Templates | Understand Role Starter Kits, preview, customization, and application. | Starter Kit packaging and repeat-application decisions must be resolved before dependent implementation. |
| C5 | Settings & Backup | Understand preferences, browser workspace, JSON export, and restore. | Restore conflict/replacement semantics must be approved and tested. |
| C6 | Responsive & Everyday Use | Use the same application on phone, tablet, laptop, and desktop; understand accessibility and data transparency. | Formal Phase 3.1 UX Acceptance remains OPEN; wireframes are not runtime evidence. |

The Beginner product uses a small browser workspace and may use localStorage for practice persistence. It is not cloud storage and does not automatically sync across browsers or devices. Data can be lost if the relevant browser data is cleared. The product baseline defines export/import as a portability mechanism; exact implementation and restore behavior require their applicable task scope and verification.

### Phase C governance reminders

- Check the current Product / UX Decision Register before implementing behavior affected by an OPEN decision.
- DR-001 through DR-019 retain their canonical status; do not infer approval.
- DR-014 is accepted for design, but runtime persistence still requires verification.
- Phase 3.1 UX Acceptance remains OPEN.
- Phase C implementation must use Product Definition v0.2.0 and the accepted Phase 3.2 architecture baseline.

## 5. PHASE D — BEYOND BEGINNER

**Learning levels:** Intermediate and Advanced  
**Theme:** Understand connected data, security, engineering workflow, and delivery.

### Intermediate — Build & Connect

| Lesson | Topic | Learning outcome | Boundary |
|---|---|---|---|
| D1 | Understand Relational Data | Understand records, tables, relationships, and basic SQL concepts. | Introduce concepts before changing the application. |
| D2 | Connect a Database | Connect the application to the approved Supabase PostgreSQL learning environment. | Requires an approved implementation scope and verified environment. |
| D3 | Authentication and Data Security | Understand sign-in, user ownership, and Row Level Security. | Auth method/recovery and RLS behavior require approved design and security tests. |

### Advanced — Engineering & Delivery

| Lesson | Topic | Learning outcome | Boundary |
|---|---|---|---|
| D4 | GitHub and Source Control | Learn repositories, branches, commits, Pull Requests, and reviewed source history. | Not a Beginner prerequisite. |
| D5 | Local Development and Testing | Use VS Code / Localhost, run tests, inspect changes, and understand CI. | Follow the observed scaffold and approved development workflow. |
| D6 | Deployment and Maintenance | Understand environments, build, deployment, release, monitoring, and maintenance. | Hosting remains provider-neutral; release requires explicit approval and evidence. |

## 6. Teaching and execution progression

Use the same seven-step process for write-capable tasks:

1. UNDERSTAND — define the real need and one outcome.
2. INSPECT — examine current project state and relevant sources.
3. PREPARE — define context, technology, scope, output, acceptance, and verification.
4. AUTHORIZE — confirm permission for the requested changes.
5. EXECUTE — perform the bounded task.
6. VERIFY — check actual changes and behavior.
7. ACCEPT — Human Owner reviews evidence and decides.

The Prompt Readiness Gate must be READY before write-capable execution. When context is incomplete, use read-only preparation or stop.

## 7. Curriculum governance

This curriculum is a reader-facing learning map. It does not modify:
- Product Definition v0.2.0.
- The accepted Phase 3.2 Architecture Design Baseline.
- The five BVC Core Specifications.
- The Phase 3 Product / UX Decision Register.
- Security controls, Task Contracts, or application source code.

Formal Phase 3.1 UX Acceptance remains OPEN. Beginner browser persistence requires runtime evidence. Intermediate database, Auth, and RLS work and Advanced source control, testing, and deployment work require their own approved scope and verification.

## 8. Lesson navigation and status

- [Phase A Index](phase-a/README.md)
- [Phase B Index](phase-b/README.md)
- [Lesson Status Register v0.2.0](LESSON_STATUS_REGISTER_V0.2.md)

A lesson may appear in this curriculum before it is ready for publication. Its actual status is controlled by the Lesson Status Register and its evidence, not by its presence in this table.

---

**BVC — Learn by Building.**  
*Build something useful. Use it every day. Learn by doing.*
