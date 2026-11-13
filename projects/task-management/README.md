> **Project navigation:** [Practical Labs Home](../../practical-labs/README.md) · [BVC Task Management Learning Path](../../practical-labs/bvc-task-management/CURRICULUM_MAP_V0.2.md) · [Phase A Index](../../practical-labs/bvc-task-management/phase-a/README.md) · [Product Definition](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)

# Project 01 — BVC Task Management

**Program:** BEYOND VIBE CODING — Build & Learn  
**Learning level:** Beginner to Advanced  
**Product:** BVC Task Management — A Simple Daily Work Manager  
**Governance status:** Product Definition v0.2.0 is the current Product Owner-approved baseline on `main` through merged PR #5. PR #6 Governance Reconciliation was Squash and Merged on 2026-11-05 (commit `5d230516a1eddede51c457c85d5fc6bef23506f8`). Phase 3.2 Architecture Design Baseline is accepted. Phase 3.1 UX Acceptance remains OPEN.  
**Implementation status:** The existing GAIS newbie app contains the B1 title-only task capture interface. The Human Owner accepted B1 on 2026-11-12 as COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS (PR #60). B1 is in-memory only; no persistence is claimed. DR-005 was approved by PR #62 and BVC-TM-TC-005 Revision 1 for B2 was approved by PR #64. B2 execution has NOT_STARTED pending live GAIS preflight and a separate Owner execution instruction.

> **Build something useful. Use it every day. Learn by doing.**

## 1. What you will build

BVC Task Management is a simple personal work-management application for people who want to capture tasks, decide what matters, organize work, and follow through every day.

The same application is designed to support different everyday contexts, including:

- Personal and independent work.
- Sales team leads.
- Marketing managers.
- Executives and business owners.
- Shop owners.
- Restaurant owners.
- Project managers.

It is one application with editable Role Starter Kits, not seven separate products. It is not intended to replace specialist CRM, POS, inventory, accounting, HR, restaurant, or enterprise project-management systems.

The product also serves as a progressive hands-on learning project. Readers start by building and using a simple application, then progressively learn databases, authentication, security, source control, local development, testing, and deployment.

## 2. Who can learn from this project

The learning path is designed to welcome people who have never programmed before. It starts with an everyday problem and an AI app-building tool, then introduces technical depth only when the learner is ready.

| Learner group | Where to start | What this project helps them learn |
|---|---|---|
| **First-time builders and non-programmers** — beginners, new Vibe Coders, and curious readers | Phase A — GAIS and the first blank app | Explain an everyday need, follow prepared steps, set Project Instructions, and ask AI for one clear task without needing to write code first. |
| **Independent builders, founders, and business owners** | Beginner — Build & Use | Turn a familiar personal or business routine into a useful application and learn by seeing the result in their own GAIS workspace. |
| **Students, aspiring developers, and software practitioners** | Beginner, then Intermediate | Progress from visual results to application structure, TypeScript, data, validation, testing, and security concepts. |
| **Developers and software engineers** | Intermediate and Advanced | Inspect the application, understand data and architecture, write and review code, test behavior, and manage source changes. |
| **Technical leaders and AI practitioners** — Tech Leads, Engineering Managers, CTOs, Architects, and AI Engineers | Advanced learning path | Evaluate bounded work, authority, architecture, security, data ownership, verification evidence, and controlled AI-assisted engineering. |

These are learning audiences, not separate application products. The everyday users of the app — for example, people managing personal work, sales follow-ups, marketing activity, shop routines, restaurant operations, and projects — are described separately in the Product Definition.

## 3. Product baseline and change control

The current product authority is **Product Definition v0.2.0**, approved by the Product Owner on 2026-11-04 and published on `main` through merged PR #5 (merge commit `ff59827d07eef982e0a23a11279e47c7817c457c`).

- **Product Definition v0.2.0:** current Product Baseline; defines the Beginner, Intermediate and Advanced learning model.
- **Product Definition v0.1.0:** historical frozen baseline; retained for traceability and not deleted.
- **Product Change Record 001:** records the approved transition from v0.1.0 to v0.2.0.

Documents:

- [Product Definition v0.2.0 — Current Product Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Product Definition v0.1.0 — Historical Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Change Record 001 — Approved and Published](product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md)

**Authority rule:** v0.2.0 governs current product scope on `main`. v0.1.0 remains immutable historical evidence of the original product direction. Any future product change requires a new reviewed revision and change record.

## 4. Project documentation

### Reader learning path — Practical Labs

The reader-facing lessons are maintained separately from the product, UX, architecture, and governance baselines. Start with these links:

- [BEYOND VIBE CODING — Practical Labs Home](../../practical-labs/README.md)
- [BVC Task Management Curriculum Map v0.2.0](../../practical-labs/bvc-task-management/CURRICULUM_MAP_V0.2.md)
- [Phase A — Meet AI & Build Your First App](../../practical-labs/bvc-task-management/phase-a/README.md)
- [Lesson A1 — Meet Google AI Studio](../../practical-labs/bvc-task-management/phase-a/01-meet-google-ai-studio/README.md)
- [Lesson A2 — Inspect Your First Web App Scaffold](../../practical-labs/bvc-task-management/phase-a/02-create-your-first-blank-web-app/README.md)
- [Lesson A3 — Set Up Project Instructions](../../practical-labs/bvc-task-management/phase-a/03-set-up-project-instructions/README.md)
- [Lesson A4 — Talk to AI Like a Teammate](../../practical-labs/bvc-task-management/phase-a/04-talk-to-ai-like-a-teammate/README.md)
- [Lesson Development and Evidence Register v0.2.0](../../practical-labs/bvc-task-management/LESSON_STATUS_REGISTER_V0.2.md)

The Beginner path starts with GAIS and prepared prompts. It does not require prior programming knowledge, GitHub, VS Code, Localhost, Supabase, or an external database.

### Product

- [Product Definition v0.2.0 — Current Product Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Product Definition v0.1.0 — Historical Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Change Record 001](product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md)

### Phase 3.1 — UX & Product Design

- [UX & Product Design v0.1.0 — index](design/ux/v0.1/README.md)
- [User Journey & Navigation](design/ux/v0.1/BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md)
- [Responsive Wireframes](design/ux/v0.1/BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md)
- [Responsive UI Specification](design/ux/v0.1/BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md)
- [UI Design System](design/ux/v0.1/BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md)
- [Interaction Specification](design/ux/v0.1/BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md)
- [Accessibility & Usability](design/ux/v0.1/BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md)
- [UX Acceptance Criteria](design/ux/v0.1/BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md)
- [Phase 3.1 UX Review & Acceptance Record](design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md)

The Phase 3.1 UX package remains the original v0.1.0 design reference, authored against Product Definition v0.1.0. The governance reconciliation in PR #6 (merged on 2026-11-05) updates authority metadata, learning-level data disclosures, and FR/AC traceability against current Product Definition v0.2.0; it does not redesign the visual, navigation, or interaction direction. Formal Phase 3.1 UX review and acceptance remain a separate OPEN gate.

### Governance & decisions

- [Governance records index](governance/README.md)
- [Phase 3 Product / UX Decision Register](governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md)
- [Governance Reconciliation Execution Record](governance/GOVERNANCE_RECONCILIATION_EXECUTION_RECORD_2026-11-04.md)

### Phase 3.2 — Application Architecture & Technical Design

- [Phase 3.2 Architecture Package — index](design/architecture/v0.1/README.md)
- [Application Architecture](design/architecture/v0.1/BVC_TASK_MANAGEMENT_APPLICATION_ARCHITECTURE_V0.1.md)
- [Data Model](design/architecture/v0.1/BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md)
- [Security & Environment](design/architecture/v0.1/BVC_TASK_MANAGEMENT_SECURITY_AND_ENVIRONMENT_V0.1.md)
- [Development, Testing & Deployment](design/architecture/v0.1/BVC_TASK_MANAGEMENT_DEVELOPMENT_TESTING_DEPLOYMENT_V0.1.md)
- [Phase 3.2 Architecture Review & Acceptance](design/architecture/v0.1/PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md)

The Phase 3.2 documents describe the Product Owner-accepted technical design baseline. They do not prove that application code, database resources, hosting infrastructure, or runtime tests have been completed.

### Application, starter kits, and examples

These areas will be added when their artifacts are ready and reviewed. They are not represented as implemented yet.

```text
application/       # Planned: responsive web application and project-specific tests
starter-kits/      # Planned: editable role-based sample configurations
examples/          # Planned: synthetic example data and walkthroughs
```

## 5. Product experience at a glance

The application uses a small set of everyday work-management areas:

- **My Day:** what needs attention today, overdue work, and upcoming tasks.
- **My Tasks:** all tasks, with search, filters, sorting, and list/Kanban views.
- **Projects:** optional groups for related work.
- **More:** templates, settings, backup, restore, and help; wider screens may expose some entries directly.

The approved Phase 3.1 navigation and responsive design remain the reference for implementation.

The interface is planned as one responsive web application for iPhone, Android, tablets, laptops, and desktop browsers.

## 6. Three-level learning and product delivery model

Product Definition v0.2.0 proposes one product with three progressively more capable learning environments.

| Level | Learning environment | Data and persistence | Main learning outcome |
|---|---|---|---|
| Beginner | Google AI Studio Build mode and app preview | Small browser JSON workspace; no external database | Build and use a useful application without database or local development setup. |
| Intermediate | Google AI Studio + Supabase | Supabase PostgreSQL, Auth and RLS | Learn relational data, SQL, authentication, authorization and CRUD. |
| Advanced | Google AI Studio + GitHub + VS Code/Localhost + Supabase + Web App Hosting | Hosted database and controlled application deployment | Learn source control, local development, testing, deployment and operational verification. |

### Level 1 — Beginner: Build & Use

The Beginner learning path is designed to minimize setup friction.

- Use Google AI Studio Build mode and its application preview.
- No external database is required.
- Supabase and sign-in are not required.
- VS Code and Localhost are not required.
- GitHub is not required for the Beginner learning path.

For basic practice persistence, the application may store a small, versioned JSON workspace in the browser's built-in `localStorage`.

This is a lightweight browser-storage mechanism. It is **not a Local-First architecture**, does not require Localhost, and does not provide automatic synchronization between devices.

The Beginner experience should support:

- Creating, viewing, editing, completing and deleting tasks.
- Organizing tasks into optional projects.
- Using approved list and Kanban views where appropriate.
- Applying editable Role Starter Kits.
- Retaining the practice workspace in the same browser profile.
- Exporting and importing a validated JSON backup.

Users must be told that browser data can be lost when browser storage is cleared and does not automatically synchronize across devices.

### Level 2 — Intermediate: Build & Connect

The Intermediate learning path introduces a real hosted database.

- Google AI Studio for AI-assisted creation and refinement.
- Supabase PostgreSQL for persistent relational data.
- Supabase Auth for user identity.
- Row Level Security (RLS) for user-scoped access.
- SQL, schema, tables, relationships, constraints and indexes.
- CRUD operations through the Supabase client.
- Safe migration of validated Beginner browser data into a Supabase workspace.

Each authenticated user owns a personal workspace. Team collaboration and shared workspaces are not introduced by this learning level.

### Level 3 — Advanced: Production Engineering

The Advanced learning path introduces a controlled source-to-production workflow.

- **Google AI Studio:** AI-assisted creation and refinement.
- **GitHub:** source control, branches, commits, Pull Requests and source history.
- **VS Code:** local code editing, debugging and engineering control.
- **Localhost:** local development and testing.
- **Supabase:** hosted database, Auth, RLS and schema migrations.
- **Web App Hosting:** deploy and operate a publicly accessible web application.

Vercel Hobby is a proposed default for personal, educational and non-commercial practice only, subject to current provider terms and limits. It is not represented as a commercial hosting plan or an enterprise production SLA. Experienced developers and Tech Leads may select another suitable hosting provider.

## 7. Important data and synchronization limitations

Data behavior depends on the learning level.

| Level | Storage | Account | Cross-device behavior |
|---|---|---|---|
| Beginner | Small versioned JSON workspace in browser `localStorage` | No account required | No automatic synchronization. JSON export/import is used to move practice data. |
| Intermediate | Supabase PostgreSQL | Supabase Auth | Authenticated users can access their own hosted data from supported devices. |
| Advanced | Supabase PostgreSQL with version-controlled schema migrations | Supabase Auth | Hosted data access with controlled Preview and Production environments. |

The Beginner browser workspace is a teaching mechanism for simple persistence. It must not be described as cloud storage, automatic synchronization, or a Local-First system.

Cloud data, identity, and access control are introduced at Intermediate level.

Backup, restore, import and migration must be clearly distinguished from automatic synchronization.

## 8. Relationship to BVC engineering specifications

Everyday Business Tasks in this application are separate from Engineering Tasks assigned to AI to modify project files.

The five frozen BVC Core Specifications remain in `/specifications/v0.1/`:

1. Task Contract.
2. Context Manifest.
3. Project State.
4. Change Record.
5. Verification Evidence.

They govern suitable engineering work. They do not define or replace the application's Business Task data model.

These five Core Specifications are outside the scope of the proposed product learning-level change and must remain unchanged unless separately reviewed and approved.

## 9. Planned learning progression

The project follows this progression:

### Beginner — Build & Use

1. Understand the everyday work-management problem.
2. Explore Google AI Studio Build mode.
3. Describe the application and guide AI through small changes.
4. Create and manage tasks.
5. Organize work with projects and starter kits.
6. Understand browser storage and JSON backup/restore.
7. Review the application and verify its behavior.

### Intermediate — Build & Connect

1. Understand relational database concepts.
2. Create a Supabase project and PostgreSQL schema.
3. Learn tables, keys, relationships and SQL.
4. Introduce Supabase Auth.
5. Apply and test RLS policies.
6. Connect the application to Supabase.
7. Migrate validated Beginner data into a personal cloud workspace.

### Advanced — Production Engineering

1. Understand the exported application source code.
2. Use GitHub for branches, commits and Pull Requests.
3. Use VS Code and Localhost for local development.
4. Manage database schema changes through version-controlled migrations.
5. Configure Preview and Production environments.
6. Connect the repository to a suitable hosting provider.
7. Deploy and verify a Preview version.
8. Review and promote approved changes to Production.
9. Verify the live application, security and data behavior.
10. Learn maintenance, troubleshooting and rollback.

The step-by-step lessons will live under the repository-level `/practical-labs/` directory and link back to this project. They will not duplicate the application source code.

### 9.1 Learning-material rule — start from zero

The reader-facing guide must assume that a Beginner has never programmed before. Do not make the book start with Task Contracts, repositories, databases, frameworks, or other engineering vocabulary. Those controls govern how the project team builds the product; the learner should encounter them only when the lesson naturally teaches them.

Every practical lesson must be written as a numbered sequence: **Step 1, Step 2, Step 3…** Each step should contain one clear action, explain why it is needed in plain language, show exactly what to click or type, identify what the reader should see afterward, and provide a simple way to check whether it worked. Introduce technical terms only when needed and explain each term the first time it appears. Never assume the reader knows where a menu, button, file, or setting is located.

A lesson must stop at a meaningful checkpoint before adding the next layer of complexity. Include common mistakes and recovery instructions. The goal is that a reader can follow the steps independently and understand what they have built—not merely copy a long Prompt and hope for the best. The canonical lesson and prompt-authoring requirements are in the [BVC Practical Labs Authoring Standard v0.2.0](../../practical-labs/standards/BVC_PRACTICAL_LABS_AUTHORING_STANDARD_V0.2.md), [Project Instructions Standard v0.1.0](../../practical-labs/standards/BVC_PROJECT_INSTRUCTIONS_STANDARD_V0.1.md), and [Task Prompt Standard v0.1.0](../../practical-labs/standards/BVC_TASK_PROMPT_STANDARD_V0.1.md).

## 10. Current status and next gate

**Product governance**

- Product Definition v0.2.0 is the current Product Owner-approved baseline on `main`; PR #5 is merged.
- Product Definition v0.1.0 is retained as historical baseline and is not deleted.
- Product Change Record 001 records the approved transition and publication.
- The five Phase 2 Core Specifications remain Draft / Experimental v0.1.0 and are unchanged.

**Design and architecture**

- Phase 3.1 UX artifacts remain the historical design package originally authored against v0.1.0.
- PR #6 was merged into `main` on 2026-11-05, publishing the v0.2.0 compatibility reconciliation for authority metadata, level-specific data disclosures, and FR/AC traceability. This did not close formal UX Acceptance, which remains OPEN until its independent review gate is completed.
- Phase 3.2 Architecture Design Baseline is Product Owner Accepted; PR #5 is merged.
- Data Model and Security design acceptance does not mean implementation, RLS tests, secret scanning or runtime verification have passed.

**Phase 3.3 implementation status**

- Phase 3.3 readiness and learning-curriculum preparation are underway. The blank scaffold exists in the Human Owner's GAIS workspace; the first functional Task Management feature has not yet been implemented.
- A blank GAIS web-app scaffold has been generated using BVCTM-PROMPT-0001. The actual Preview shows the exact text **“BVC Task Management Scaffold Inspection”**; the Preview image is committed in the Phase A lesson assets. The actual Code / File Explorer screenshot is also committed and supports the read-only A2 inspection lesson.
- The GAIS conversation screenshot shows an initial development-server startup problem followed by the AI reporting that dependencies were installed, the Next.js development server was running on port 3000, and the Preview request returned HTTP 200 OK. The visible Preview is **OBSERVED**; the recovery details are the AI's reported actions, not an independently repeated build or test.
- The Custom Instructions summary card is visible in GAIS Chat settings, and the Human Owner supplied the complete response to the read-only BVCTM-PROMPT-0002 understanding check. The response's exact technology-version claims remain NOT VERIFIED because the response also states that no project files were read during that turn. Independent before/after file-tree evidence remains pending.
- B1 title-only task capture is present in the existing GAIS newbie app and was Owner-accepted with known limitations. B2 browser persistence is not yet implemented or runtime-verified.
- No provisioned Supabase learning project, application database, hosting project or live deployment is claimed.
- No B2 persistence runtime test, automated browser E2E, Supabase/Auth integration or production deployment test is claimed as passed.

**Next gates**

1. Preflight the existing GAIS newbie app and inspect the exact app/page.tsx; compare it with the Owner-supplied B1 source, review the visible file inventory and confirm no competing writer.
2. Run the canonical read-only BVCTM-PROMPT-0005 and review its result. It must change zero files.
3. Obtain the Human Owner's separate instruction before Gemini implements B2 under approved BVC-TM-TC-005 Revision 1. Modify app/page.tsx only.
4. Verify B2 save/load, DR-005 disclosure, B1 regressions, storage failure behavior, malformed-data preservation and responsive UI using actual evidence.
5. After B2 acceptance, teach B3 as an independent learner close/reopen exercise, then continue B4 and Phase C one approved outcome at a time.

Branch Protection for `main` is a separate repository-administration task and is currently deferred; it does not block this documentation and readiness follow-up.

---
