
# BEYOND VIBE CODING — Build & Learn
# BVC Task Management — Product Definition v0.2.0

**Document ID:** BVC-TM-PD-001  
**Version:** 0.2.0  
**Status:** Product Owner Approved — 2026-11-04; pending controlled merge into `main`  
**Prepared:** 2026-11-04  
**Supersedes:** BVC-TM-PD-001 v0.1.0, effective after controlled merge  
**Change Record:** BVC-TM-PCR-001  
**Product:** BVC Task Management — A Simple Daily Work Manager

---

## 1. Purpose and authority

This document defines the product direction, user needs, functional scope, three-level learning path, quality requirements and acceptance criteria for BVC Task Management.

Version 0.2.0 revises the original learning and implementation model from a single Local-First implementation path to a progressive three-level Vibe Coding experience:

1. **Beginner:** Build and use the application in Google AI Studio without an external database or local development setup.
2. **Intermediate:** Connect the application to Supabase and learn PostgreSQL, database design, SQL, Authentication and Row Level Security.
3. **Advanced:** Use Google AI Studio, GitHub, VS Code/Localhost, Supabase and a free-tier Web App Hosting service to learn a controlled development and deployment workflow.

The product remains one practical Task Management application. The levels introduce progressively more capable learning and engineering environments; they do not create three unrelated products.

The Product Owner approved Product Definition v0.2.0 on 2026-11-04.

The repository's active baseline on `main` remains v0.1.0 until this revision is merged through the controlled repository process. After the approved PR is merged, v0.2.0 becomes the operational Product Baseline.

Application implementation remains subject to Phase 3.2 Architecture Acceptance and a separately approved Phase 3.3 implementation Task Contract.

## 2. Product identity and positioning

**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides.

**Product promise:**

> Build something useful. Use it every day. Learn by doing.

**First practical project:**

BVC Task Management — A Simple Daily Work Manager.

BVC Task Management is a straightforward personal work-management application that helps people capture tasks, decide what matters, organize work and follow through every day.

It is both:

- A useful everyday product for non-technical and technical users.
- A hands-on learning project through which readers progressively learn Vibe Coding and software engineering.

It is not primarily a software-development issue tracker, enterprise portfolio-management system, CRM, POS, inventory application, accounting system or ERP.

## 3. Product vision and core user questions

Help people turn scattered daily work into a clear, manageable list of actions using a simple tool they can understand, adapt and use in real life.

The application should make it easy to answer:

1. What do I need to do today?
2. What is important or overdue?
3. Which project or work area does this task belong to?
4. What have I completed, and what remains?
5. What should I do next?

## 4. Product principles

1. **Useful before impressive:** Solve a real everyday problem before adding advanced features.
2. **Simple on first use:** A person can create a task without reading a manual.
3. **One product, progressive engineering:** The same product evolves through Beginner, Intermediate and Advanced.
4. **Progressive disclosure:** Show essential actions first; reveal complexity only when needed.
5. **Human-readable language:** Use familiar product concepts such as My Day, My Tasks, Projects and Templates.
6. **UI continuity:** Phase 3.1 UX design is the fixed design input for Phase 3.2 and implementation. No UI redesign is included in this revision.
7. **Provider-neutral infrastructure:** Teach the concepts and workflow without requiring readers to use one particular hosting provider. Use accessible free-tier services for the practical walkthrough.
8. **Transparent data handling:** Clearly state where data is stored, whether it synchronizes and what backup means at each learning level.
9. **Secure by default:** Authentication, access control and secret management must be introduced when cloud data is introduced.
10. **Verify before claiming:** A successful AI response or build is not proof of functional correctness.
11. **AI builds the product; AI does not silently control user work data:** The Task Management MVP does not require an AI chatbot or AI API inside the application.
12. **Privacy of individual infrastructure:** The project and book do not require disclosure of an author's or reader's private hosting accounts, subscriptions, billing arrangements or infrastructure choices.

## 5. Target users

### 5.1 Everyday product users

- Sales Team Lead — Follow-ups, meetings, proposals and weekly priorities.
- Marketing Manager — Campaigns, content, events and publication deadlines.
- CEO / Executive — Strategic priorities, decisions and follow-ups.
- Shop Owner — Opening/closing routines, suppliers and maintenance.
- Restaurant Owner — Preparation, service readiness, cleaning and maintenance.
- Project Manager — Project actions, milestones and deadlines.
- Individual / Independent Builder — Personal responsibilities, learning and side projects.

### 5.2 Learning audiences

- Beginner / Vibe Coder.
- Independent Builder.
- Developer.
- Tech Lead / Engineering Manager.
- CTO / Software Architect.
- AI Engineer.
- Business Owner / Founder.

The learning audience does not change the everyday Business Task model.

A Business Task is a task managed by the application.

An Engineering Task is a bounded task authorizing a human or AI executor to change project artifacts.

These two concepts must remain distinct.

## 6. Three-level learning and product delivery model

### 6.1 Level 1 — Beginner: Build & Use

**Primary environment:** Google AI Studio Build mode and its application preview.  
**Database:** None.  
**Supabase:** Not required.  
**Authentication:** Not required.  
**VS Code / Localhost:** Not required.  
**GitHub:** Not required for the Beginner learning path.

The reader uses natural language and iterative Vibe Coding in Google AI Studio to create and refine the application.

For basic persistence without a database, the application may store a small, versioned workspace JSON document in the browser's built-in `localStorage`.

This is a lightweight browser-storage implementation detail. It is **not** a Local-First system architecture, does not require a local development server and does not provide automatic synchronization between devices.

The reader must be able to:

- Create, view, edit, complete and delete tasks.
- Organize tasks into optional projects.
- Use list and Kanban views where screen width supports them.
- Use the approved starter kits.
- Close and reopen the application in the same browser profile and retain the small practice workspace.
- Export and import a validated JSON backup.

The application must disclose that browser data is tied to that browser profile and can be lost if browser data is cleared. The user should export backups for important practice data.

**Level 1 outcome:** A useful application built and used from the GAIS practice environment, without database setup or local development tooling.

### 6.2 Level 2 — Intermediate: Build & Connect

**Primary environment:** Google AI Studio + Supabase.  
**Database:** Supabase PostgreSQL.  
**Reference database plan for the book:** Supabase Free.  
**Authentication:** Supabase Auth.  
**Authorization:** Row Level Security (RLS).

The reader learns:

- Relational database concepts.
- Tables, primary keys, foreign keys and relationships.
- SQL, constraints and indexes.
- Schema changes and migrations.
- Authentication and user identity.
- RLS policies and owner-scoped data access.
- CRUD operations through the Supabase client.
- Safe migration of Beginner browser data into a signed-in Supabase workspace.

Supabase Free is the reference environment for the book's hands-on database exercises. It provides a practical way to learn PostgreSQL, Auth, RLS and database integration without requiring a paid database subscription for the introductory exercises.

The book must explain that free-tier quotas and conditions may change. Readers must consult the current Supabase documentation before creating a project or relying on it for important data.

The learning guide must also explain relevant Free-plan limitations, including inactivity pausing, resource quotas and the absence of provider-managed automatic backups on the Free plan. Readers must learn to export and protect important data.

Each authenticated user owns a personal workspace. This level does not introduce team collaboration, invitations or shared workspaces.

**Level 2 outcome:** A user can sign in, save data to hosted PostgreSQL, access only their own records and explain how schema, Auth and RLS work.

### 6.3 Level 3 — Advanced: Production Engineering

**Toolchain:**

- **Google AI Studio:** AI-assisted creation and refinement.
- **GitHub:** Source control, branches, commits, Pull Requests and source history.
- **VS Code:** Local code editing, debugging and engineering control.
- **Localhost:** Local development and testing.
- **Supabase:** Hosted database, Auth, RLS and schema migrations.
- **Free-tier Web App Hosting:** Publish and operate a practical learning application on the Internet.

The book focuses on a practical deployment workflow that uses a hosting service with an available free tier.

A representative provider may be used for the step-by-step walkthrough. Vercel Hobby may be shown as one optional example for eligible personal and non-commercial exercises, but it is not a mandatory platform or an architectural standard.

The reader may select another hosting provider when its free tier supports the application's framework, runtime, build output and deployment requirements.

The book must not require readers to disclose their hosting provider, account, subscription, billing details or private infrastructure choices.

The Advanced workflow teaches:

1. Build and refine with Google AI Studio.
2. Synchronize and review source through GitHub.
3. Clone or pull and develop, debug and test with VS Code + Localhost.
4. Manage Supabase schema changes through version-controlled migrations.
5. Configure separate Preview and Production environment variables where supported.
6. Connect GitHub to a compatible hosting service.
7. Deploy a Preview version for review where the provider supports it.
8. Promote an approved change to the live deployment.
9. Verify the live web application, access controls and data behavior.
10. Monitor, troubleshoot, recover and maintain the application within the selected free-tier limits.

The book must distinguish a real public deployment exercise from a guarantee of enterprise availability, commercial eligibility, compliance or SLA.

**Level 3 outcome:** A reader can control the source-to-deployment workflow and deploy a working web application using a suitable free-tier hosting service.

## 7. Product scope and navigation

The product remains a simple personal daily work manager.

### 7.1 Primary navigation

| Area | Purpose |
|---|---|
| My Day | Today's focus, overdue work and upcoming tasks |
| My Tasks | All tasks, with search, filters, sorting, list/Kanban views |
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

A user can create a task by entering only a title.

Status defaults to To Do, priority defaults to Normal, and due date and project are optional. Additional details are progressively disclosed.

### 7.4 Projects

Projects/work areas are optional groupings. A task may exist without a project.

Removing a project must not silently delete its tasks. The proposed safe behavior is to preserve tasks and detach them from the project.

### 7.5 Starter Kits

Role Starter Kits are editable starting configurations, not account roles or permissions.

They may provide sample project/work-area names, reusable checklists and optional synthetic example tasks.

Applying a kit must not silently overwrite user-created data and must avoid uncontrolled duplicates.

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
| FR-023 | Advanced workflow supports Preview and live Web App deployment using a compatible hosting service. | Must |
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
| Intermediate | Supabase PostgreSQL; Supabase Free is the book's reference learning tier | Supabase Auth | Account-based access across devices |
| Advanced | Same Supabase model with version-controlled migrations | Supabase Auth | Account-based access; operational environment separation |

The Beginner browser store is deliberately limited to a small practice workspace. It is not intended for large datasets or enterprise durability.

Supabase Free is used as a learning environment, not as a promise of free production infrastructure or guaranteed service availability.

### 9.1 Migration between levels

Beginner → Intermediate:

1. Export a versioned JSON workspace.
2. Authenticate to the Supabase-backed application.
3. Validate and preview imported records.
4. Map records to the authenticated user.
5. Preserve UUIDs where safe or create explicit ID mappings.
6. Import without partial writes where technically possible.
7. Verify record counts and relationships.
8. Report added, skipped and rejected records.

Intermediate → Advanced changes the engineering workflow and hosting lifecycle. It does not require a business-data migration when the same Supabase project and schema are retained.

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
- The learning guide must explain the backup limitations of Supabase Free and the need to export important data.
- Database backups, workspace exports and schema migrations are three different concepts and must not be presented as interchangeable.

## 12. UI/UX baseline and scope protection

The Phase 3.1 UX package is the fixed design input for Phase 3.2 and subsequent implementation:

- User journey and navigation.
- Responsive wireframes.
- Responsive UI specification.
- UI design system.
- Interaction specification.
- Accessibility/usability.
- UX acceptance criteria.

**No UI redesign or reopening of Phase 3.1 visual design is part of Product Definition v0.2.0.**

Implementation must follow the published design package.

If a genuine product behavior conflict is found, record it and seek an explicit Product Owner decision; do not silently redesign the UI.

Preserving Phase 3.1 files does not automatically mean that the separate Phase 3.1 UX Review & Acceptance record has been closed.

## 13. Technology direction and boundaries

| Layer | Beginner | Intermediate | Advanced |
|---|---|---|---|
| AI-assisted creation | Google AI Studio | Google AI Studio | Google AI Studio |
| Frontend | GAIS-generated web app | Same app | Same app |
| Data persistence | Browser JSON storage | Supabase PostgreSQL | Supabase PostgreSQL |
| Identity | None | Supabase Auth | Supabase Auth |
| Data security | Browser profile boundary | RLS | RLS + environment controls |
| IDE/local runtime | Not required | Not required for learning path | VS Code + Localhost |
| Source control | Optional | Introduced as helpful | GitHub required |
| Hosting | GAIS Preview | GAIS Preview / practice | A suitable free-tier hosting service |

The exact frontend framework and build tool must be verified against the actual exported GAIS scaffold before they are frozen.

React, Vite or another compatible arrangement may be selected based on observed scaffold and hosting requirements.

Do not invent or assume the current generated project structure.

The book must teach the general deployment concepts without making a single hosting provider a product requirement.

## 14. Hosting and deployment

### 14.1 Learning principle

The book focuses on free-tier hosting for practical exercises.

The purpose is to help readers understand how a web application moves from source code to an Internet-accessible deployment without requiring a paid hosting subscription for the initial learning exercise.

The book may use one representative free-tier provider for its step-by-step walkthrough. Vercel Hobby may be used as an optional example when appropriate for the exercise and eligible under the provider's current terms.

This example does not make Vercel a required provider, an architectural dependency or a product standard.

The reader may choose another free-tier hosting service if it supports the generated application's framework, runtime, build output and deployment requirements.

The book must:

- Explain the general concepts of build, deployment, preview and live release.
- Use free-tier services for the principal hands-on exercise wherever practical.
- Link to current official provider terms and limits.
- Avoid hardcoding quotas or assuming that free-tier features will remain unchanged.
- Explain that free hosting may impose usage limits, project inactivity rules, build limits or other restrictions.
- Avoid presenting a free tier as a guarantee of commercial suitability, enterprise availability or a contractual SLA.
- Avoid requiring the reader to disclose their hosting account, plan, billing information or private infrastructure choices.

### 14.2 Database learning environment

Supabase Free is the reference database environment for the book's Intermediate and Advanced exercises.

The book uses Supabase to teach:

- PostgreSQL and relational database concepts.
- Tables, primary keys, foreign keys and constraints.
- SQL and schema design.
- Authentication and user identity.
- Row Level Security.
- CRUD operations.
- Database migrations.
- Data export and recovery considerations.

The guide must explain that Supabase Free has plan-specific quotas and conditions.

Readers must consult current official Supabase documentation for:

- Database and storage quotas.
- Project limits.
- Inactivity pausing.
- Backup and recovery capabilities.
- Current usage restrictions.

The book must not claim that Supabase Free provides provider-managed automatic backups equivalent to paid backup services.

### 14.3 Deployment lifecycle

- GitHub feature branch / Pull Request → Preview or test deployment where supported.
- Human review and acceptance.
- Merge to the configured production branch.
- Deployment to the selected hosting service.
- Live smoke test and verification evidence.
- Rollback/redeploy instructions maintained.

The exact deployment buttons, dashboard screens and provider-specific commands belong to the practical walkthrough, not to the provider-independent product architecture.

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
| NFR-010 | Deployment | Verify preview and live deployments against the intended commit and environment. |
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
- AC-033: A preview/test deployment is reviewed before promotion to the live deployment.
- AC-034: Live deployment is smoke-tested and linked to a known Git commit.
- AC-035: README identifies implemented capabilities, learning-level boundaries, free-tier limitations and known constraints.
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
| Free hosting limitations disrupt a practice deployment | Explain quotas, inactivity, build limits and alternatives; never promise permanent free availability. |
| Supabase Free limitations affect learning data | Explain quotas, inactivity pausing and manual export/recovery responsibilities. |
| Free-tier limits are mistaken for an SLA | Link current terms/limits and teach monitoring/recovery. |
| Product scope grows into ERP/CRM | Preserve the everyday personal task-management focus. |
| Phase 3.1 UI is reopened unnecessarily | Treat the approved UX package as the design input; no redesign in Phase 3.2. |

## 18. Relationship to BVC Core Specifications

The five Phase 2 Core Specifications remain unchanged and retain their Draft / Experimental v0.1.0 maturity:

1. Task Contract.
2. Context Manifest.
3. Project State.
4. Change Record.
5. Verification Evidence.

These govern suitable engineering work performed while changing the application and its supporting artifacts.

They do not define or replace the Business Task data model.

## 19. Product baseline and change control

Version 0.2.0 establishes the progressive three-level learning architecture and revises the single Local-First implementation path in v0.1.0.

The Product Owner approved v0.2.0 on 2026-11-04. It becomes the operational repository baseline after its controlled merge into `main`.

The following remain unchanged:

- Product identity and everyday personal work-management purpose.
- Task, Project, Checklist and Starter Kit concepts.
- My Day, My Tasks, Projects and More navigation.
- Phase 3.1 responsive UI/UX package.
- Non-goals around CRM/POS/ERP and team collaboration.
- Distinction between Business Tasks and Engineering Tasks.
- Five BVC Core Specifications.

Changes to product scope after v0.2.0 require a reviewed revision.

Technical implementation must not silently expand scope.

Hosting provider accounts, paid subscriptions, billing arrangements and individual infrastructure selections are not part of the product baseline and do not need to be recorded in this document.

## 20. References

- Google AI Studio Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Supabase pricing: https://supabase.com/pricing
- Supabase billing and quotas: https://supabase.com/docs/guides/platform/billing-on-supabase
- Supabase Free project pausing: https://supabase.com/docs/guides/platform/free-project-pausing
- Supabase database backups: https://supabase.com/docs/guides/platform/backups
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Vercel Hobby plan, when used as an optional example: https://vercel.com/docs/plans/hobby
- Vercel terms, when used as an optional example: https://vercel.com/legal/terms

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*

