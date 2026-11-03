# BVC Task Management — Product Change Record 001

**Document ID:** BVC-TM-PCR-001\
**Version:** 0.1.0\
**Status:** Owner-approved direction in ChatGPT; submitted for formal repository review\
**Date:** 2026-11-04\
**Affected baseline:** BVC-TM-PD-001 Product Definition v0.1.0

## 1. Change summary

Replace the assumption that the product's single learning/implementation path is a Local-First, single-user application with a progressive three-level learning architecture:

1. Beginner — GAIS Build mode; no external database.
2. Intermediate — GAIS + Supabase; PostgreSQL, schema, SQL, Authentication and RLS.
3. Advanced — GAIS + GitHub + VS Code/Localhost + Supabase + Web App Hosting.

This is a product/learning architecture change, not a UI redesign.

## 2. Reason

The product is the practical project for BEYOND VIBE CODING. Readers should experience Vibe Coding directly in Google AI Studio and progressively learn database, source control, local development, security and deployment only when they reach the corresponding level.

Requiring Localhost or a local developer setup at Beginner level creates unnecessary friction. Conversely, Advanced readers should learn a real source-to-production workflow.

## 3. Approved direction versus proposed technical choices

| Item | Decision status |
|---|---|
| No Localhost requirement at Beginner | Owner-approved |
| Beginner has no external database | Owner-approved |
| Intermediate introduces Supabase schema/SQL/RLS | Owner-approved |
| Advanced combines GAIS + GitHub + VS Code/Localhost + Supabase + Hosting | Owner-approved |
| One product and shared domain model across levels | Recommended architecture |
| Browser `localStorage` JSON persistence for Beginner | Proposed |
| Supabase Free as default learning database tier | Proposed |
| Vercel Hobby as default personal/non-commercial practice hosting | Recommended; awaiting explicit final confirmation |
| React + TypeScript, Vercel-compatible app build | Recommended; verify generated GAIS scaffold |
| Supabase CLI and migrations in Advanced | Recommended |

## 4. Sections of Product Definition v0.1.0 affected

The following v0.1.0 statements conflict with the new direction and must be revised in the next controlled Product Definition revision:

- §4 Product Principle 8: “Local-first and transparent”.
- §7.2 Non-goals: no login, cloud database or cloud backup.
- §13 Local data and multi-device behavior.
- §14 FR-023 and FR-025.
- §15 NFR-007, NFR-009 and NFR-013.
- §16 Data concepts: no registered account.
- §17 Implementation constraints 3, 5 and 6.
- §18 AC-011 through AC-016 and AC-025/AC-026 wording where local-only behavior is assumed.
- §20 local-data loss and synchronization risk mitigations.
- §23 Product baseline statement that freezes Local-First.

Unchanged product behavior remains governed by Product Definition v0.1.0 unless separately revised: Task, Project, Checklist, Starter Kits, My Day, My Tasks, navigation, responsive behavior and everyday personal work-management positioning.

## 5. Replacement product behavior by level

### Beginner

- No external database and no sign-in.
- GAIS Build mode is the practice environment.
- Browser `localStorage` stores a small versioned JSON workspace in the current browser profile. This is a no-database teaching mechanism, not a Local-First architecture and not a Localhost server.
- Versioned JSON backup/restore is required.
- Clearly disclose that the browser-local dataset does not automatically synchronize across devices.

### Intermediate

- Supabase PostgreSQL is introduced.
- User identity is supplied by Supabase Auth.
- Application records are owner-scoped using `user_id`.
- RLS is enabled and tested on all exposed application tables.
- The product remains a personal task manager, not a collaboration platform.

### Advanced

- GAIS remains available for AI-assisted changes.
- GitHub becomes the reviewed source history and integration point.
- VS Code + Localhost are introduced for code control, debugging and local tests.
- Supabase schema changes are versioned with migrations.
- A hosted Web App is deployed and verified.
- Vercel Hobby is the proposed default for personal/non-commercial book exercises; commercial projects require an eligible paid plan or alternative hosting.

## 6. What does NOT change

- Phase 3.1 UI/UX package remains unchanged and is not reopened.
- The product remains BVC Task Management — A Simple Daily Work Manager.
- It remains one responsive web application.
- Its everyday task-management focus and core Task/Project/Checklist/Starter Kit concepts remain.
- No CRM, POS, inventory, ERP, payroll or specialist business suite is introduced.
- No AI chatbot or Gemini API integration is added inside the product MVP by this change.
- No multi-user shared workspace/team collaboration is introduced.
- The five Phase 2 Core Specifications remain unchanged.

## 7. Compatibility and migration

- Keep the same domain model across Beginner and Supabase modes.
- Provide a versioned JSON export/import path from Beginner Browser Storage to Supabase.
- Preserve identifiers or create an explicit ID remapping during import.
- Validate all records and relationships before importing.
- Require a preview and confirmation before modifying an existing workspace.

## 8. Risks and controls

| Risk | Control |
|---|---|
| Product Definition v0.1 remains contradictory | Publish controlled v0.2.0 revision/addendum before implementation |
| Beginner data misunderstood as cloud-synced | Explicit browser-storage disclosure and export/restore |
| RLS misconfiguration exposes user data | RLS on every exposed table and negative tests |
| Vercel Hobby misused for commercial projects | State non-commercial restriction; teach alternative hosting |
| GAIS-generated scaffold incompatible with Vercel | Inspect scaffold and verify clean build before fixing framework |
| Two-way GAIS/GitHub sync creates conflicting edits | One writer per file set; review Git diff |
| Free-tier limits are mistaken for production guarantees | Document quotas, inactivity pauses, backup and fair-use limitations |

## 9. Approval and record status

- **Owner decision in conversation:** Approved the three-level direction and Phase 3.2 progression; no UI redesign.
- **Vercel Hobby final selection:** Recommended, awaiting explicit confirmation.
- **Formal Product Definition v0.2.0:** Published as a draft on branch phase3/3-2-architecture-product-update and submitted for review in PR #5; formal approval and merge are pending.
- **GitHub repository update:** Published on branch phase3/3-2-architecture-product-update and submitted for review in PR #5; not yet merged into main.
- **Implementation authorization:** Not granted by this change record alone.

## 10. Required next action

Review and formally approve Product Definition v0.2.0 and the Phase 3.2 Architecture Package. Only after those gates pass should Phase 3.3 issue an implementation Task Contract.
