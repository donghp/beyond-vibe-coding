
# Project 01 — BVC Task Management

**Program:** BEYOND VIBE CODING — Build & Learn  
**Learning level:** Beginner to Advanced  
**Product:** BVC Task Management — A Simple Daily Work Manager  
**Governance status:** Product Definition v0.1.0 remains the last formally frozen baseline. Product Definition v0.2.0 and the Phase 3.2 Architecture Package are proposals under review in PR #5.  
**Implementation status:** Not started

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

| Audience | What to practice |
|---|---|
| Beginner / Vibe Coder | Describe a real need, guide AI step by step, build a small feature, and check the result. |
| Independent Builder | Adapt the application to personal routines and daily work. |
| Developer | Understand the UI, data model, application structure, validation, and tests. |
| Tech Lead / Engineering Manager | Break work into bounded tasks and review changes and evidence. |
| CTO / Architect | Evaluate architecture, security, data ownership, and design trade-offs. |
| AI Engineer | Apply the BVC Engineering Task Contract and the five Core Specifications to AI-assisted code changes. |

## 3. Product baseline and change control

The repository currently recognizes:

- **Product Definition v0.1.0:** the last formally frozen product baseline.
- **Product Definition v0.2.0:** a proposed revision introducing the progressive three-level learning and product delivery model.
- **Product Change Record 001:** records the Owner-approved direction for the proposed change and is submitted for formal repository review.

Documents:

- [Product Definition v0.1.0 — Frozen Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Definition v0.2.0 — Draft for Product Owner Review](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Product Change Record 001](product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md)

**Authority rule:** Product Definition v0.1.0 remains the formal repository baseline until v0.2.0 receives explicit Product Owner approval and is accepted through the controlled repository process. Publishing v0.2.0 on a review branch does not automatically replace the frozen baseline.

Implementation must not silently introduce proposed product changes before the required approval gates are complete.

## 4. Project documentation

### Product

- [Product Definition v0.1.0 — Frozen Baseline](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Definition v0.2.0 — Draft](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
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

The Phase 3.1 UX package is preserved as the existing design reference. Its formal review and acceptance record remains a separate governance item. Phase 3.2 does not authorize a visual redesign or silently modify the Phase 3.1 UX files.

### Phase 3.2 — Application Architecture & Technical Design

- [Phase 3.2 Architecture Package — index](design/architecture/v0.1/README.md)
- [Application Architecture](design/architecture/v0.1/BVC_TASK_MANAGEMENT_APPLICATION_ARCHITECTURE_V0.1.md)
- [Data Model](design/architecture/v0.1/BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md)
- [Security & Environment](design/architecture/v0.1/BVC_TASK_MANAGEMENT_SECURITY_AND_ENVIRONMENT_V0.1.md)
- [Development, Testing & Deployment](design/architecture/v0.1/BVC_TASK_MANAGEMENT_DEVELOPMENT_TESTING_DEPLOYMENT_V0.1.md)
- [Phase 3.2 Architecture Review & Acceptance](design/architecture/v0.1/PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md)

The Phase 3.2 documents describe the proposed technical design. They do not prove that application code, database resources, hosting infrastructure, or runtime tests have been completed.

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

## 10. Current status and next gate

**Product governance**

- Product Definition v0.1.0 remains the last formally frozen repository baseline.
- Product Definition v0.2.0 is a draft proposed revision.
- Product Change Record 001 records the approved direction in the working conversation and is submitted for formal repository review.
- Product Definition v0.2.0 does not replace v0.1.0 until the required Product Owner approval and repository acceptance are complete.

**Design and architecture**

- Phase 3.1 UX artifacts are preserved as the design reference.
- The Phase 3.1 UX Review & Acceptance record remains a separate open governance item.
- The Phase 3.2 Architecture Package is prepared for Product Owner review in PR #5.
- The Phase 3.2 documents describe design intent; runtime and implementation evidence must be produced in the appropriate later phase.

**Implementation**

- Application implementation has not started.
- No Supabase cloud resource or application database is claimed as provisioned.
- No hosting project or live deployment is claimed as completed.
- No runtime security, integration, end-to-end or production deployment test is claimed as passed.

**Next gate**

1. Review Product Change Record 001 and Product Definition v0.2.0.
2. Review the Phase 3.2 Architecture Package and its acceptance criteria.
3. Resolve the required Product Owner decisions.
4. Formally approve the product and architecture baselines through the controlled repository process.
5. Only after the approval gates pass, prepare Phase 3.3 implementation Task Contracts.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
