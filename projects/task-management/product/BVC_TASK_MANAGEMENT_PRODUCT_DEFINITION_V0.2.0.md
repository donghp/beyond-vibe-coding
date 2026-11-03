# BEYOND VIBE CODING — Build & Learn
# BVC Task Management — Product Definition v0.2.0

**Document ID:** BVC-TM-PD-001\
**Version:** 0.2.0\
**Status:** Draft — Product Owner Review Required\
**Prepared:** 2026-11-04\
**Supersedes:** BVC-TM-PD-001 v0.1.0, only after formal Owner approval and merge\
**Change Record:** BVC-TM-PCR-001\
**Product:** BVC Task Management — A Simple Daily Work Manager

---

## 1. Purpose and authority

This document defines the product direction, user needs, functional scope, three-level learning path, quality requirements and acceptance criteria for BVC Task Management.

Version 0.2.0 revises the original learning/deployment model from one Local-First implementation path to a progressive three-level Vibe Coding experience:

1. Beginner — build in Google AI Studio without an external database.
2. Intermediate — connect Supabase and learn database design, SQL, Authentication and Row Level Security.
3. Advanced — combine Google AI Studio, GitHub, VS Code/Localhost, Supabase and Web App Hosting.

The product remains one practical Task Management application. The levels introduce progressively more capable engineering environments; they do not create three unrelated products.

This document becomes the operational Product Baseline only after explicit Product Owner approval and publication through the repository's controlled change process. Until then, v0.1.0 remains the last formally frozen repository baseline, while this v0.2.0 is the proposed revision.

## 2. Product identity and positioning

**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides.

**Promise:**

> Build something useful. Use it every day. Learn by doing.

**First practical project:** BVC Task Management — A Simple Daily Work Manager.

BVC Task Management is a straightforward personal work-management application that helps people capture tasks, decide what matters, organize work and follow through every day.

It is both:
- a useful everyday product for non-technical and technical users; and
- a hands-on learning project through which readers progressively learn Vibe Coding and software engineering.

It is not primarily a software-development issue tracker, enterprise portfolio management system, CRM, POS, inventory application, accounting system or ERP.

## 3. Product vision and core user questions

Help people turn scattered daily work into a clear, manageable list of actions using a simple tool they can understand, adapt and use in real life.

The application should make it easy to answer:
1. What do I need to do today?
2. What is important or overdue?
3. Which project or work area does this task belong to?
4. What have I completed, and what remains?
5. What should I do next?

## 4. Product principles

1. **Useful before impressive:** solve a real everyday problem before adding advanced features.
2. **Simple on first use:** a person can create a task without reading a manual.
3. **One product, progressive engineering:** the same product evolves through Beginner, Intermediate and Advanced.
4. **Progressive disclosure:** show essential actions first; reveal complexity only when needed.
5. **Human-readable language:** My Day, My Tasks, Projects and Templates.
6. **UI continuity:** Phase 3.1 UX design is the fixed design input for Phase 3.2 and implementation; no UI redesign is included in this revision.
7. **Provider-aware, not provider-locked:** teach a concrete default stack while explaining how experienced developers can choose their own infrastructure.
8. **Transparent data handling:** clearly state where data is stored, whether it synchronizes and what backup means at each level.
9. **Secure by default:** authentication, access control and secret management must be introduced when cloud data is introduced.
10. **Verify before claiming:** a successful AI response or build is not proof of functional correctness.
11. **AI builds the product; AI does not silently control user work data:** the Task Management MVP does not require an AI chatbot or AI API inside the application.

## 5. Target users

### 5.1 Everyday product users

- Sales Team Lead — follow-ups, meetings, proposals and weekly priorities.
- Marketing Manager — campaigns, content, events and publication deadlines.
- CEO / Executive — strategic priorities, decisions and follow-ups.
- Shop Owner — opening/closing routines, suppliers and maintenance.
- Restaurant Owner — preparation, service readiness, cleaning and maintenance.
- Project Manager — project actions, milestones and deadlines.
- Individual / Independent Builder — personal responsibilities, learning and side projects.

### 5.2 Learning audiences

- Beginner / Vibe Coder.
- Independent Builder.
- Developer.
- Tech Lead / Engineering Manager.
- CTO / Software Architect.
- AI Engineer.
- Business Owner / Founder.

The learning audience does not change the everyday Business Task model. A Business Task is a task managed by the application. An Engineering Task is a bounded task authorizing a human or AI executor to change project artifacts. They must remain distinct.

## 6. Three-level learning and product delivery model

### 6.1 Level 1 — Beginner: Build & Use

**Primary environment:** Google AI Studio Build mode and its application preview.\
**Database:** None.\
**Supabase:** Not required.\
**Authentication:** Not required.\
**VS Code / Localhost:** Not required.\
**GitHub:** Not required for the beginner learning path.

The reader uses natural language and iterative Vibe Coding in Google AI Studio to create and refine the application.

For basic persistence without a database, the application may store a small, versioned workspace JSON document in the browser's built-in `localStorage`. This is a lightweight browser-storage implementation detail. It is **not** a Local-First system architecture, does not require a local development server and does not provide automatic synchronization between devices.

The reader must be able to:
- create, view, edit, complete and delete tasks;
- organize tasks into optional projects;
- use list and Kanban views where screen width supports them;
- use the approved starter kits;
- close and reopen the application in the same browser profile and retain the small practice workspace;
- export and import a validated JSON backup.

The application must disclose that browser data is tied to that browser profile and can be lost if browser data is cleared. The user should export backups for important practice data.

**Level 1 outcome:** a useful application built and used from the GAIS practice environment, without database setup or local development tooling.

### 6.2 Level 2 — Intermediate: Build & Connect

**Primary environment:** Google AI Studio + Supabase.\
**Database:** Supabase PostgreSQL.\
**Authentication:** Supabase Auth.\
**Authorization:** Row Level Security (RLS).

The reader learns:
- relational database concepts;
- tables, primary keys, foreign keys and relationships;
- SQL, constraints and indexes;
- schema changes and migrations;
- Authentication and user identity;
- RLS policies and owner-scoped data access;
- CRUD operations through the Supabase client;
- safe migration of Beginner browser data into a signed-in Supabase workspace.

Each authenticated user owns a personal workspace. This level does not introduce team collaboration, invitations or shared workspaces.

**Level 2 outcome:** a user can sign in, save data to hosted PostgreSQL, access only their own records and explain how schema, Auth and RLS work.

### 6.3 Level 3 — Advanced: Production Engineering

**Toolchain:**
- Google AI Studio — AI-assisted creation and refinement.
- GitHub — source control, branches, commits, Pull Requests and source history.
- VS Code — local code editing, debugging and engineering control.
- Localhost — local development and testing.
- Supabase — hosted database, Auth, RLS and schema migrations.
- Web App Hosting — deploy and operate a publicly accessible web application.

**Recommended default practice hosting:** Vercel Hobby for personal, educational and non-commercial exercises, subject to the current Vercel terms and limits. Experienced developers and Tech Leads may select their own hosting/cloud infrastructure. Commercial, customer-facing or revenue-generating use must use a hosting plan/provider that is eligible for that use.

The Advanced workflow teaches:
1. build/refine with GAIS;
2. synchronize/review source through GitHub;
3. clone/pull and develop/debug/test with VS Code + Localhost;
4. manage Supabase schema changes through version-controlled migrations;
5. configure separate Preview and Production environment variables;
6. connect GitHub to the selected hosting provider;
7. deploy a Preview version for review;
8. promote an approved change to Production;
9. verify the live web application, access controls and data behavior;
10. monitor, troubleshoot, roll back and maintain the application.

The book must distinguish a real public deployment exercise from a guarantee of enterprise availability, compliance or SLA. Vercel Hobby is not represented as suitable for commercial applications or as a production SLA.

**Level 3 outcome:** a reader can control the source-to-production workflow and deploy a working web application to the Internet.

## 7. Product scope and navigation

The product remains a simple personal daily work manager.

### 7.1 Primary navigation

| Area | Purpose |
|---|---|
| My Day | Today's focus, overdue work and upcoming tasks |
| My Tasks | All tasks, search, filters, sorting, list/Kanban views |
| Projects | Group tasks by project or work area |
| More | Templates, settings, backup/restore and help |

The approved Phase 3.1 responsive behavior remains unchanged: compact screens use bottom navigation; wider screens may expose a sidebar and additional entries.

### 7.2 My Day order

Preserve the Phase 3.1 ordering and placement rules:
1. Overdue.
2. Due Today.
3. Today's Focus.
4. Upcoming.
5. Add task.

A task appears only once. Focus is an additional marker, not a status or priority.

### 7.3 Quick task capture

A user can create a task by entering only a title. Status defaults to To Do, priority defaults to Normal, due date and project are optional. Additional details are progressively disclosed.

### 7.4 Projects

Projects/work areas are optional groupings. A task may exist without a project. Removing a project must not silently delete its tasks; the proposed safe behavior is to preserve tasks and detach them from the project.

### 7.5 Starter Kits

Role Starter Kits are editable starting configurations, not account roles or permissions. They may provide sample project/work-area names, reusable checklists and optional synthetic example tasks. Applying a kit must not silently overwrite user-created data and must avoid uncontrolled duplicates.

## 8. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | First use offers a blank workspace or an editable starter kit. | Must |
| FR-002 | User can create a task with only a title. | Must |
| FR-003 | User can view, edit, complete and delete a task with truthful feedback. | Must |
| FR-004 | User can set status: To Do, In Progress, Done. | Must |
| FR-005 | User can set priority: Low, Normal, High. | Must |
| FR-006 | User can set/clear an optional due date. | Must |
| FR-007 | User can create and manage optional projects/work areas. | Must |
| FR-008 | A task can exist without a project. | Must |
| FR-009 | User can add notes and checklist items. | Should |
| FR-010 | My Day shows Overdue, Due Today, Today's Focus and Upcoming without duplicate task rows. | Must |
| FR-011 | User can view tasks in a list. | Must |
| FR-012 | Kanban view is available where the viewport supports it. | Should |
| FR-013 | Kanban status changes have a non-drag alternative. | Must |
| FR-014 | User can search and filter tasks. | Should |
| FR-015 | User can preview and apply a starter kit. | Must |
| FR-016 | Starter-kit application does not silently overwrite existing user data. | Must |
| FR-017 | Beginner mode stores a small practice workspace in browser storage without requiring a database or Localhost. | Must |
| FR-018 | Beginner mode exports and imports a versioned JSON backup. | Must |
| FR-019 | Intermediate/Advanced mode supports Supabase Auth and user-owned PostgreSQL records. | Must |
| FR-020 | Every exposed application table is protected by RLS and least-privilege grants. | Must |
| FR-021 | User can migrate validated Beginner data into a Supabase workspace. | Must |
| FR-022 | Advanced workflow supports GitHub source control and VS Code/Localhost development. | Must |
| FR-023 | Advanced workflow supports Preview and Production Web App deployment. | Must |
| FR-024 | The application explains the storage/synchronization behavior of the selected level. | Must |
| FR-025 | The application provides clear loading, success, validation, empty and error states. | Must |

## 9. Data concepts and persistence

Core concepts:
- Task.
- Project / Work Area.
- Task Checklist Item.
- Starter Kit.
- Workspace Settings.
- Applied Starter Kit history.

One logical domain model is shared across the three levels.

| Level | Persistence | Identity | Synchronization |
|---|---|---|---|
| Beginner | Small versioned JSON workspace in browser `localStorage` | No account | No automatic cross-device sync |
| Intermediate | Supabase PostgreSQL | Supabase Auth | Account-based access across devices |
| Advanced | Same Supabase model with version-controlled migrations | Supabase Auth | Account-based access; operational environment separation |

The Beginner browser store is deliberately limited to a small practice workspace. It is not intended for large datasets or enterprise durability.

### 9.1 Migration between levels

Beginner → Intermediate:
1. export a versioned JSON workspace;
2. authenticate to the Supabase-backed application;
3. validate and preview imported records;
4. map records to the authenticated user;
5. preserve UUIDs where safe or create explicit ID mappings;
6. import without partial writes where technically possible;
7. verify record counts and relationships;
8. report added, skipped and rejected records.

Intermediate → Advanced changes the engineering workflow and hosting lifecycle; it does not require a business-data migration when the same Supabase project and schema are retained.

## 10. Authentication, authorization and security

- Beginner has no sign-in and no cloud database.
- Intermediate and Advanced use Supabase Auth.
- Each user's data is scoped to `auth.uid()`.
- RLS is enabled on every exposed application table.
- Policies cover SELECT, INSERT, UPDATE and DELETE.
- Child records must be authorized through their parent ownership.
- The browser may contain only the Supabase publishable/anon key intended for client use.
- Service-role/secret keys, database passwords, hosting tokens and other privileged credentials must remain server-side or in secure platform settings.
- Secrets must never be committed to GitHub or included in browser bundles.
- Validate imports and user-provided text; avoid unsafe HTML rendering.
- Public examples use synthetic data only.

The product does not introduce team collaboration or role-based access between multiple people.

## 11. Backup, restore and data portability

- Beginner uses versioned JSON export/import.
- Intermediate/Advanced should provide a user-level data export/import path.
- Validate format version, field types, IDs, record counts and relationships before modifying data.
- Invalid imports must not corrupt existing data.
- Replacing an existing workspace requires explicit confirmation.
- An application export is not a provider-managed database backup.
- The learning guide must explain the backup limitations of the selected Supabase plan and the need to test restore.

## 12. UI/UX baseline and scope protection

The Phase 3.1 UX package is the fixed design input for Phase 3.2 and subsequent implementation:
- user journey and navigation;
- responsive wireframes;
- responsive UI specification;
- UI design system;
- interaction specification;
- accessibility/usability;
- UX acceptance criteria.

**No UI redesign or reopening of Phase 3.1 visual design is part of Product Definition v0.2.0.**

Implementation must follow the published design package. If a genuine product behavior conflict is found, record it and seek an explicit Product Owner decision; do not silently redesign the UI.

## 13. Technology direction and boundaries

| Layer | Beginner | Intermediate | Advanced |
|---|---|---|---|
| AI-assisted creation | Google AI Studio | Google AI Studio | Google AI Studio |
| Frontend | React-based GAIS app | Same app | Same app |
| Data persistence | Browser JSON storage | Supabase PostgreSQL | Supabase PostgreSQL |
| Identity | None | Supabase Auth | Supabase Auth |
| Data security | Browser profile boundary | RLS | RLS + environment controls |
| IDE/local runtime | Not required | Not required for learning path | VS Code + Localhost |
| Source control | Optional | Introduced as helpful | GitHub required |
| Hosting | GAIS preview | GAIS preview / practice | Vercel or selected host |

The exact frontend framework/build tool must be verified against the actual exported GAIS scaffold before it is frozen. Vite/React SPA or another compatible arrangement may be selected based on observed scaffold and hosting requirements. Do not invent or assume the current generated project structure.

## 14. Hosting and deployment

### 14.1 Recommended practice default

Vercel Hobby is the proposed default for individual, personal, educational and non-commercial Level 3 exercises. Use the generated `*.vercel.app` URL initially; a custom domain is optional.

The book must:
- link to Vercel's current plan limits and terms;
- avoid promising permanent quotas or uninterrupted availability;
- state the Hobby non-commercial restriction;
- explain that over-limit behavior and limits can change;
- avoid presenting Hobby as a commercial/customer-production plan or contractual SLA.

### 14.2 Experienced readers

Developers, Tech Leads and organizations may choose Vercel Pro/Enterprise, Google Cloud Run, AWS, Azure or their own hosting/cloud environment, provided it meets the project's operational, security, privacy and cost requirements.

### 14.3 Deployment lifecycle

- GitHub feature branch / Pull Request → Preview Deployment.
- Human review and acceptance.
- Merge to the configured production branch → Production Deployment.
- Live smoke test and verification evidence.
- Rollback/redeploy instructions maintained.

The default recommendation is to use Vercel's native Git integration for deployment and GitHub Actions for quality checks, avoiding unnecessary duplicate builds and large workflow artifacts.

## 15. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-001 | Responsiveness | Preserve the Phase 3.1 responsive behavior across supported phone, tablet and desktop widths. |
| NFR-002 | Browser support | Validate current supported Safari/iOS, Chrome/Android and selected desktop browsers. |
| NFR-003 | Accessibility | Keyboard operation, visible focus, labels, contrast, text zoom and non-drag alternatives. |
| NFR-004 | Data integrity | Validate inputs, relationships and imports before persisting. |
| NFR-005 | Security | RLS, least privilege, secret separation and safe rendering. |
| NFR-006 | Portability | Versioned export/import between Beginner and Supabase modes. |
| NFR-007 | Reliability | Truthful error states and recovery for failed operations. |
| NFR-008 | Performance | Common task operations should feel responsive at typical personal task volumes. Define measurable budgets during implementation. |
| NFR-009 | Maintainability | Separate UI, domain rules and persistence adapters. |
| NFR-010 | Deployment | Verify preview and production deployments against the intended commit and environment. |
| NFR-011 | Privacy | Explain where data is stored and avoid sensitive data in public samples. |
| NFR-012 | Observability | Advanced level records useful deployment/runtime errors without leaking secrets or unnecessary personal data. |

## 16. Acceptance criteria

### Product behavior
- AC-001: First-time user can start blank or select a starter kit.
- AC-002: User can create a task with only a title.
- AC-003: User can edit, complete and delete a task with clear feedback.
- AC-004: User can change status/priority and set/clear a due date.
- AC-005: User can create a project and associate tasks with it; unassigned tasks remain supported.
- AC-006: My Day correctly groups overdue, due-today, focus and upcoming work without duplicate rows.
- AC-007: User can search and filter tasks.
- AC-008: User can use list and a suitable-width Kanban view.
- AC-009: Every Kanban status operation has a non-drag alternative.
- AC-010: Starter-kit application does not silently destroy or overwrite user data.

### Beginner persistence and portability
- AC-011: Beginner workspace persists after normal close/reopen in the same supported browser profile.
- AC-012: User can export a versioned JSON workspace.
- AC-013: A valid backup can be restored and matches the exported data.
- AC-014: An invalid/unsupported backup is rejected without corrupting current data.
- AC-015: Replacing existing data requires explicit confirmation.
- AC-016: UI clearly states that Beginner browser data does not automatically sync across devices.

### Responsive and accessible experience
- AC-017: Core phone screens work at 320, 360 and 390 CSS px without essential horizontal scrolling.
- AC-018: Tablet layouts work in selected portrait/landscape widths.
- AC-019: Laptop/desktop layouts work at approximately 1280, 1440 and 1920 CSS px.
- AC-020: Navigation, forms and buttons remain usable when the viewport changes or the on-screen keyboard appears.
- AC-021: Viewport resize/orientation change does not lose unsaved form input.
- AC-022: Primary touch targets aim for approximately 44 × 44 CSS px where practical.
- AC-023: Essential actions are keyboard operable with visible focus.
- AC-024: Status and priority do not rely on color alone.

### Intermediate / Advanced data and security
- AC-025: Authenticated users can create and retrieve only their own Supabase records.
- AC-026: RLS blocks cross-user SELECT, INSERT, UPDATE and DELETE attempts on exposed tables.
- AC-027: No privileged secret appears in browser bundles, public repository or client logs.
- AC-028: Beginner → Supabase import validates data and reports created/skipped/rejected records.
- AC-029: Database schema changes are version-controlled and reproducible through migrations at Advanced level.

### Release and deployment quality
- AC-030: Beginner-facing guide explains how to use the GAIS practice app without installing local developer tools.
- AC-031: Public examples contain only synthetic data and no secrets/customer information.
- AC-032: Automated tests cover domain rules, persistence, backup/restore, RLS and responsive critical paths.
- AC-033: Preview deployment is reviewed before Production promotion.
- AC-034: Live deployment is smoke-tested and linked to a known Git commit.
- AC-035: README identifies implemented capabilities, level boundaries, hosting eligibility and known limitations.
- AC-036: Required CI checks pass and a human reviews evidence before release.

## 17. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Beginner setup becomes too technical | No Localhost, IDE, SQL, Supabase or database in Beginner. |
| Browser storage mistaken for cloud sync | Prominent disclosure and JSON export/import. |
| Supabase RLS is misconfigured | Explicit policies and negative cross-user tests. |
| Secrets leak into frontend/GitHub | Publishable key only in browser; privileged secrets server-side. |
| GAIS and VS Code edits conflict | One active writer per file set; review diffs before sync/merge. |
| Generated GAIS scaffold does not deploy directly to chosen host | Inspect scaffold and verify a clean build before freezing hosting configuration. |
| Vercel Hobby used commercially | State non-commercial restriction; choose eligible paid/alternative hosting. |
| Free plan limits are mistaken for an SLA | Link current terms/limits and teach monitoring/recovery. |
| Product scope grows into ERP/CRM | Preserve the everyday personal task-management focus. |
| Phase 3.1 UI is reopened unnecessarily | Treat the approved UX package as the design input; no redesign in Phase 3.2. |

## 18. Relationship to BVC Core Specifications

The five Phase 2 Core Specifications remain unchanged and retain their Draft / Experimental v0.1.0 maturity:
1. Task Contract.
2. Context Manifest.
3. Project State.
4. Change Record.
5. Verification Evidence.

These govern suitable engineering work performed while changing the application and its supporting artifacts. They do not define the Business Task schema.

## 19. Product baseline and change control

Version 0.2.0 proposes the three-level learning architecture and supersedes the single Local-First implementation path in v0.1.0 only after formal Owner approval and merge.

The following remain unchanged:
- product identity and everyday personal work-management purpose;
- Task, Project, Checklist and Starter Kit concepts;
- My Day, My Tasks, Projects and More navigation;
- Phase 3.1 responsive UI/UX package;
- non-goals around CRM/POS/ERP and team collaboration;
- distinction between Business Tasks and Engineering Tasks;
- five BVC Core Specifications.

Changes to product scope after v0.2.0 require a reviewed revision. Technical implementation must not silently expand scope.

## 20. References

- Google AI Studio Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Vercel Hobby: https://vercel.com/docs/plans/hobby
- Vercel Git deployments: https://vercel.com/docs/git
- Vercel terms: https://vercel.com/legal/terms

---

**BEYOND VIBE CODING — Build & Learn**\
*Build something useful. Use it every day. Learn by doing.*
