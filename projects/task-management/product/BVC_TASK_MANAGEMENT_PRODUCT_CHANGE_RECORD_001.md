# BVC Task Management — Product Change Record 001

**Document ID:** BVC-TM-PCR-001  
**Version:** 0.1.2  
**Status:** Product Owner Approved — 2026-11-04; controlled repository merge pending  
**Date:** 2026-11-04  
**Affected baseline:** BVC-TM-PD-001 Product Definition v0.1.0  
**Target revision:** BVC-TM-PD-001 Product Definition v0.2.0

## 1. Change summary

Replace the assumption that the product's single learning/implementation path is a Local-First, single-user application with a progressive three-level learning architecture:

1. **Beginner:** Google AI Studio Build mode; no external database, sign-in or local development setup.
2. **Intermediate:** Google AI Studio + Supabase; PostgreSQL, schema, SQL, Authentication and Row Level Security.
3. **Advanced:** Google AI Studio + GitHub + VS Code/Localhost + Supabase + free-tier Web App Hosting.

This is a product and learning architecture change, not a UI redesign.

The product remains one BVC Task Management application. The three levels represent progressively more capable learning and engineering environments, not three separate products.

The Product Owner approved the revised product direction on 2026-11-04. Product Definition v0.2.0 is the target controlled revision.

## 2. Reason

The product is the practical project for BEYOND VIBE CODING.

Readers should experience Vibe Coding directly in Google AI Studio and progressively learn databases, source control, local development, security and deployment only when they reach the corresponding level.

Requiring Localhost or a local developer setup at Beginner level creates unnecessary friction.

Conversely, Advanced readers should learn a real source-to-deployment workflow, understand how application code is managed, and deploy a working web application using an accessible hosting option.

The book should focus on teaching practical concepts and workflows. It should not require readers to purchase a hosting subscription or use a particular hosting vendor.

## 3. Approved product direction versus implementation choices

| Item | Decision status |
|---|---|
| No Localhost requirement at Beginner | Product Owner approved |
| Beginner has no external database | Product Owner approved |
| Intermediate introduces Supabase schema/SQL/RLS | Product Owner approved |
| Advanced combines GAIS + GitHub + VS Code/Localhost + Supabase + Web App Hosting | Product Owner approved |
| One product and shared logical domain model across levels | Accepted product direction |
| Browser `localStorage` JSON persistence for Beginner | Accepted for the learning design; implementation verification in Phase 3.3 |
| Supabase Free as the reference database environment for book exercises | Product Owner approved learning direction |
| Free-tier hosting as the focus of the Advanced practical walkthrough | Product Owner approved learning direction |
| Vercel Hobby as one optional hosting example | Optional illustration only; not mandatory |
| Any other compatible free-tier hosting provider | Reader choice |
| React + TypeScript frontend | Recommended; verify actual generated GAIS scaffold |
| Exact frontend build tool | Deferred until actual scaffold inspection |
| Supabase CLI and migrations in Advanced | Recommended learning workflow |
| Exact Supabase project configuration and authentication method | Deferred to Phase 3.3 |

The approved product direction does not mean every technical implementation choice has been frozen.

The book's reference examples must remain accessible to readers using free-tier services. Provider terms, quotas and eligibility requirements must be checked against current official documentation at the time the practical guide is published or updated.

## 4. Sections of Product Definition v0.1.0 affected

The following v0.1.0 statements conflict with the revised direction and are addressed by Product Definition v0.2.0:

- §4 Product Principle 8: “Local-first and transparent”.
- §7.2 Non-goals: no login, cloud database or cloud backup.
- §13 Local data and multi-device behavior.
- §14 FR-023 and FR-025.
- §15 NFR-007, NFR-009 and NFR-013.
- §16 Data concepts: no registered account.
- §17 Implementation constraints 3, 5 and 6.
- §18 AC-011 through AC-016, which cover local persistence, backup/restore and device-local data disclosure.
- §20 local-data loss and synchronization risk mitigations.
- §23 Product baseline statement that freezes Local-First.

The AC-025/AC-026 references are intentionally excluded from the local-only conflict list because they are not the relevant local-persistence acceptance criteria.

Unchanged product behavior remains governed by Product Definition v0.1.0 unless separately revised:

- Task, Project, Checklist and Starter Kit concepts.
- My Day, My Tasks and navigation.
- Responsive behavior and existing Phase 3.1 UX direction.
- Everyday personal work-management positioning.
- Separation between Business Tasks and Engineering Tasks.

## 5. Replacement product behavior by level

### 5.1 Beginner

- No external database and no sign-in.
- Google AI Studio Build mode is the practice environment.
- Browser `localStorage` stores a small versioned JSON workspace in the current browser profile.
- This is a no-database teaching mechanism, not a Local-First architecture and not a Localhost server.
- Versioned JSON backup/restore is required.
- Browser-local data does not automatically synchronize across devices.
- The application must explain that clearing browser data may remove the workspace unless the user has exported a backup.

### 5.2 Intermediate

- Supabase PostgreSQL is introduced.
- Supabase Free is the reference database environment for the book's practical exercises.
- User identity is supplied by Supabase Auth.
- Application records are owner-scoped using `user_id`.
- RLS is required on all exposed application tables.
- The learning material explains SQL, schema, relationships, constraints, CRUD and access control.
- The learning material explains Free-plan quotas, inactivity pausing and backup limitations.
- The product remains a personal task manager, not a collaboration platform.

### 5.3 Advanced

- Google AI Studio remains available for AI-assisted changes.
- GitHub becomes the reviewed source history and integration point.
- VS Code + Localhost are introduced for code control, debugging and local tests.
- Supabase schema changes are versioned with migrations.
- A compatible free-tier hosting service is used for the book's deployment exercise.
- The hosting walkthrough may use Vercel Hobby as one optional example, subject to current provider terms and eligibility.
- Readers may use another compatible free-tier provider.
- The book does not prescribe an individual's hosting account, plan or private infrastructure arrangement.

## 6. What does NOT change

- Phase 3.1 UI/UX package remains unchanged and is not reopened for redesign.
- The product remains BVC Task Management — A Simple Daily Work Manager.
- It remains one responsive web application.
- Its everyday task-management focus and core Task/Project/Checklist/Starter Kit concepts remain.
- No CRM, POS, inventory, ERP, payroll or specialist business suite is introduced.
- No AI chatbot or Gemini API integration is added inside the product MVP by this change.
- No multi-user shared workspace or team collaboration is introduced.
- The five Phase 2 Core Specifications remain unchanged.
- No hosting provider becomes a mandatory architectural dependency.
- No private hosting account, subscription, billing information or infrastructure choice is required to be disclosed or recorded.

Preserving Phase 3.1 UX files does not automatically close the separate Phase 3.1 UX Review & Acceptance record.

## 7. Compatibility and migration

- Keep the same logical domain model across Beginner and Supabase modes.
- Provide a versioned JSON export/import path from Beginner Browser Storage to Supabase.
- Preserve identifiers or create an explicit ID remapping during import.
- Validate all records and relationships before importing.
- Require a preview and confirmation before modifying an existing workspace.
- Do not claim that migration or synchronization has been implemented before it is verified.

Beginner → Intermediate is a data migration between persistence adapters.

Intermediate → Advanced primarily changes the engineering and deployment workflow; it does not require a business-data migration when the same Supabase project and schema are retained.

## 8. Risks and controls

| Risk | Control |
|---|---|
| Product Definition v0.1 remains contradictory | Publish controlled v0.2.0 revision before implementation |
| Beginner data misunderstood as cloud-synced | Explicit browser-storage disclosure and export/restore |
| RLS misconfiguration exposes user data | RLS on every exposed table and negative tests before release |
| Supabase Free limits are mistaken for unlimited service | Document current quotas, inactivity and backup limitations |
| Free hosting limits disrupt practice deployment | Use a simple compatible exercise; explain provider terms and limits |
| A provider example is mistaken for a mandatory product choice | State explicitly that hosting is provider-neutral and the example is optional |
| GAIS-generated scaffold is incompatible with the selected host | Inspect scaffold and verify a clean build before freezing deployment instructions |
| Two-way GAIS/GitHub sync creates conflicting edits | One writer per file set; review Git diff |
| Product scope grows into ERP/CRM | Preserve the everyday personal task-management focus |
| Phase 3.1 UI is reopened unnecessarily | Treat the existing UX package as the design input; no redesign in Phase 3.2 |

## 9. Approval and record status

- **Product direction:** Product Owner approved the three-level learning direction on 2026-11-04.
- **Product Definition v0.2.0:** Approved by the Product Owner on 2026-11-04; controlled repository merge pending.
- **Database learning environment:** Supabase Free is the reference environment for the book's practical exercises.
- **Hosting approach:** Provider-neutral; free-tier hosting is the focus of the practical walkthrough.
- **Vercel:** May be used as an optional illustrative example; it is not a mandatory platform or Product Owner hosting decision.
- **Supabase plan limitations:** Current quotas, inactivity rules and backup capabilities must be checked against official documentation before the book's practical instructions are published or updated.
- **Frontend build configuration:** Actual GAIS-exported scaffold must be inspected before the build tool and deployment compatibility are frozen.
- **Phase 3.1 UX:** Existing UX package remains unchanged; its separate UX Review & Acceptance record is not automatically closed.
- **Phase 2 Core Specifications:** Remain unchanged.
- **Phase 3.2 Architecture:** Design acceptance is recorded separately in BVC-TM-AR-001. Runtime verification is deferred to Phase 3.3.
- **Implementation authorization:** This change record alone does not authorize coding. Phase 3.3 requires a separately approved implementation Task Contract.
- **Repository publication:** PR #5 remains open until the controlled merge into `main`.

## 10. Required next action

1. Publish the approved Product Definition v0.2.0 through the controlled repository process.
2. Complete Phase 3.2 Architecture Review & Acceptance.
3. Preserve the Phase 3.1 UX package and the five Phase 2 Core Specifications.
4. Prepare Phase 3.3 implementation Task Contracts only after the required approval gates pass.
5. Verify the actual GAIS scaffold before finalizing framework/build and deployment instructions.
6. Use Supabase Free and a suitable free-tier hosting service as the reference practical learning environment; verify current provider documentation before publication.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*

