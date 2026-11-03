
# BVC Task Management — Product Change Record 001

**Document ID:** BVC-TM-PCR-001  
**Version:** 0.1.1  
**Status:** Owner-approved direction in working discussion; formal repository review pending  
**Date:** 2026-11-04  
**Affected baseline:** BVC-TM-PD-001 Product Definition v0.1.0

## 1. Change summary

Replace the assumption that the product's single learning/implementation path is a Local-First, single-user application with a progressive three-level learning architecture:

1. Beginner — Google AI Studio Build mode; no external database.
2. Intermediate — Google AI Studio + Supabase; PostgreSQL, schema, SQL, Authentication and Row Level Security.
3. Advanced — Google AI Studio + GitHub + VS Code/Localhost + Supabase + Web App Hosting.

This is a product and learning architecture change, not a UI redesign.

The product remains one BVC Task Management application. The three levels represent progressively more capable learning and engineering environments, not three separate products.

## 2. Reason

The product is the practical project for BEYOND VIBE CODING. Readers should experience Vibe Coding directly in Google AI Studio and progressively learn databases, source control, local development, security and deployment only when they reach the corresponding level.

Requiring Localhost or a local developer setup at Beginner level creates unnecessary friction. Conversely, Advanced readers should learn a real source-to-production workflow.

## 3. Approved direction versus proposed technical choices

| Item | Decision status |
|---|---|
| No Localhost requirement at Beginner | Owner-approved direction |
| Beginner has no external database | Owner-approved direction |
| Intermediate introduces Supabase schema/SQL/RLS | Owner-approved direction |
| Advanced combines GAIS + GitHub + VS Code/Localhost + Supabase + Hosting | Owner-approved direction |
| One product and shared domain model across levels | Recommended architecture |
| Browser `localStorage` JSON persistence for Beginner | Proposed technical design |
| Supabase Free as default learning database tier | Proposed; subject to plan limits and Owner confirmation |
| Vercel Hobby as default personal/non-commercial practice hosting | Recommended; awaiting explicit final confirmation |
| React + TypeScript, Vercel-compatible app build | Recommended; verify generated GAIS scaffold |
| Supabase CLI and migrations in Advanced | Recommended |

The approved direction does not mean every technical implementation choice in this record has been finally approved.

## 4. Sections of Product Definition v0.1.0 affected

The following v0.1.0 statements conflict with the new direction and must be revised in the next controlled Product Definition revision:

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

Unchanged product behavior remains governed by Product Definition v0.1.0 unless separately revised: Task, Project, Checklist, Starter Kits, My Day, My Tasks, navigation, responsive behavior and everyday personal work-management positioning.

## 5. Replacement product behavior by level

### Beginner

- No external database and no sign-in.
- Google AI Studio Build mode is the practice environment.
- Browser `localStorage` may store a small versioned JSON workspace in the current browser profile.
- This is a no-database teaching mechanism, not a Local-First architecture and not a Localhost server.
- Versioned JSON backup/restore is required.
- Clearly disclose that browser-local data does not automatically synchronize across devices and may be lost if browser data is cleared.

### Intermediate

- Supabase PostgreSQL is introduced.
- User identity is supplied by Supabase Auth.
- Application records are owner-scoped using `user_id`.
- RLS is designed for all exposed application tables and must be tested before release.
- The product remains a personal task manager, not a collaboration platform.

### Advanced

- Google AI Studio remains available for AI-assisted changes.
- GitHub becomes the reviewed source history and integration point.
- VS Code + Localhost are introduced for code control, debugging and local tests.
- Supabase schema changes are versioned with migrations.
- A hosted Web App is deployed and verified.
- Vercel Hobby is the proposed default for personal/non-commercial book exercises; commercial projects require an eligible paid plan or alternative hosting.

## 6. What does NOT change

- Phase 3.1 UI/UX package remains unchanged and is not reopened for redesign.
- The product remains BVC Task Management — A Simple Daily Work Manager.
- It remains one responsive web application.
- Its everyday task-management focus and core Task/Project/Checklist/Starter Kit concepts remain.
- No CRM, POS, inventory, ERP, payroll or specialist business suite is introduced.
- No AI chatbot or Gemini API integration is added inside the product MVP by this change.
- No multi-user shared workspace or team collaboration is introduced.
- The five Phase 2 Core Specifications remain unchanged.

Preserving Phase 3.1 UX artifacts does not automatically close the separate Phase 3.1 UX Review & Acceptance record.

## 7. Compatibility and migration

- Keep the same logical domain model across Beginner and Supabase modes.
- Provide a versioned JSON export/import path from Beginner Browser Storage to Supabase.
- Preserve identifiers or create an explicit ID remapping during import.
- Validate all records and relationships before importing.
- Require a preview and confirmation before modifying an existing workspace.
- Do not claim that migration or synchronization has been implemented before it is verified.

## 8. Risks and controls

| Risk | Control |
|---|---|
| Product Definition v0.1 remains contradictory | Publish controlled v0.2.0 revision/addendum before implementation |
| Beginner data misunderstood as cloud-synced | Explicit browser-storage disclosure and export/restore |
| RLS misconfiguration exposes user data | RLS on every exposed table and negative tests before release |
| Vercel Hobby misused for commercial projects | State non-commercial restriction; teach alternative hosting |
| GAIS-generated scaffold incompatible with Vercel | Inspect scaffold and verify clean build before fixing framework |
| Two-way GAIS/GitHub sync creates conflicting edits | One writer per file set; review Git diff |
| Free-tier limits are mistaken for production guarantees | Document quotas, inactivity pauses, backup and fair-use limitations |

## 9. Approval and record status

- **Owner decision in working discussion:** The three-level product direction and Phase 3.2 progression were approved as the intended direction; no UI redesign.
- **Technical choices:** Browser storage, exact Supabase tier, hosting provider and frontend build configuration remain subject to their respective design and confirmation gates.
- **Vercel Hobby final selection:** Recommended, awaiting explicit confirmation.
- **Formal Product Definition v0.2.0:** Published as a draft on branch `phase3/3-2-architecture-product-update` and submitted for review in PR #5; formal approval and merge are pending.
- **GitHub repository update:** Published on the Phase 3.2 review branch; not yet merged into `main`.
- **Implementation authorization:** Not granted by this change record alone.

## 10. Required next action

1. Review Product Change Record 001 and Product Definition v0.2.0.
2. Resolve remaining Product Owner decisions.
3. Complete the Phase 3.2 Architecture Review & Acceptance.
4. Formally approve the product and architecture baselines through the controlled repository process.
5. Only after those gates pass should Phase 3.3 issue an implementation Task Contract.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
