
# BVC Task Management — Phase 3.2 Architecture Package v0.1

**Program:** BEYOND VIBE CODING — Build & Learn  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.2 — Application Architecture & Technical Design  
**Package version:** 0.1.1  
**Status:** Product Owner Accepted — Phase 3.2 Design Baseline  
**Prepared:** 2026-11-04

## 1. Purpose

This package translates the approved three-level learning direction into an implementable architecture.

It preserves the Phase 3.1 UI/UX package as the existing design reference and does not reopen visual design or redesign the user experience.

This package is a technical design baseline. It does not claim that application implementation, cloud provisioning, database migration, deployment or runtime verification has been completed.

The architecture supports one BVC Task Management product across three progressive learning levels:

1. Beginner — Google AI Studio and browser JSON persistence without an external database.
2. Intermediate — Google AI Studio + Supabase PostgreSQL, Auth and RLS.
3. Advanced — Google AI Studio + GitHub + VS Code/Localhost + Supabase + free-tier Web App Hosting.

## 2. Governing product documents

- [Product Definition v0.1.0 — Historical Frozen Baseline](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Definition v0.2.0 — Product Owner Approved](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Product Change Record 001](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md)

**Baseline authority:** Product Definition v0.2.0 was approved by the Product Owner on 2026-11-04 and is the current operational Product Baseline on `main` through merged PR #5 (commit `ff59827d07eef982e0a23a11279e47c7817c457c`). Product Definition v0.1.0 is retained as the historical baseline and is not the current product authority.

## 3. Approved learning direction

The following product direction is the basis for this architecture:

1. Beginner works directly in Google AI Studio; no Localhost or VS Code is required.
2. Beginner has no external database; a small browser JSON workspace may be used only for practice persistence.
3. Intermediate introduces Supabase PostgreSQL, schema/SQL, Auth and RLS.
4. Supabase Free is the reference database environment for the book's practical exercises.
5. Advanced combines GAIS + GitHub + VS Code/Localhost + Supabase + free-tier Web App Hosting.
6. The same BVC Task Management product progresses through all levels.
7. Phase 3.1 UX is a fixed design input; no UI redesign is included.
8. Hosting is provider-neutral. A free-tier provider may be used as an illustrative walkthrough, but no hosting vendor is mandatory.

The exact browser persistence implementation, Supabase project configuration, authentication method and frontend build configuration remain subject to their implementation and verification steps.

### 3.1 Phase 3.1 UX version boundary

The Phase 3.1 UX package was originally authored against Product Definition v0.1.0. It remains versioned as the historical v0.1.0 design package; its current compatibility with Product Definition v0.2.0 is being reconciled. Some UX descriptions therefore contain historical local-only assumptions or earlier single-level product references.

For Phase 3.2:

- Preserve the existing Phase 3.1 visual design, screens, navigation, responsive behavior and interaction guidance.
- Do not modify or redesign Phase 3.1 UX files as part of this architecture consistency update.
- Interpret storage, identity and synchronization behavior by learning level according to Product Definition v0.2.0: Beginner browser storage; Intermediate/Advanced authenticated Supabase workspace.
- Record genuine behavior conflicts and undecided interactions in the canonical Decision Register for explicit Product Owner resolution.
- Rebuild FR/AC traceability against v0.2.0; do not reuse v0.1.0 requirement numbers where their meanings changed.
- Do not silently change the UX package's historical version or make it appear formally accepted.

The Phase 3.1 UX Review & Acceptance record remains a separate governance item.

Preserving the UX files does not mean that the formal UX acceptance gate has passed.

## 4. Canonical governance decisions

Open Product, UX, interaction and implementation-design decisions are consolidated in the [Phase 3 Product / UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md). This register preserves source aliases; proposed defaults remain OPEN until the Product Owner explicitly decides otherwise.

## 5. Package contents

| File | Purpose |
|---|---|
| `BVC_TASK_MANAGEMENT_APPLICATION_ARCHITECTURE_V0.1.md` | System architecture, components, three learning levels and boundaries |
| `BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md` | Logical entities, browser/Supabase persistence, PostgreSQL model, date semantics and migration |
| `BVC_TASK_MANAGEMENT_SECURITY_AND_ENVIRONMENT_V0.1.md` | Authentication, RLS, secrets, environments, privacy and backup |
| `BVC_TASK_MANAGEMENT_DEVELOPMENT_TESTING_DEPLOYMENT_V0.1.md` | GAIS/GitHub/VS Code workflow, CI, free-tier hosting and operational verification |
| `PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md` | Review gates and Phase 3.2 exit criteria |

## 6. Status and governance

- Product Definition v0.2.0 was approved by the Product Owner on 2026-11-04 and published on `main` through merged PR #5.
- Product Change Record 001 records the approved product change.
- Supabase Free is the reference database environment for Intermediate/Advanced book exercises.
- The practical hosting guide focuses on compatible free-tier hosting.
- Hosting is provider-neutral. Vercel may be used as one optional illustrative example, but it is not mandatory or an architectural standard.
- The book must link to current provider documentation for free-tier limitations instead of hardcoding permanent quotas.
- The actual GAIS-exported scaffold must be inspected before freezing the frontend build tool or assuming compatibility with a particular hosting provider.
- The Phase 3.2 Architecture Package has received Product Owner acceptance as a design baseline.
- Runtime implementation, RLS tests, secret scanning, scaffold compatibility and deployment verification are deferred to Phase 3.3.
- No cloud resource, Supabase project/database or hosting project is claimed as created.
- No runtime security, integration or deployment verification is claimed as completed.
- Private hosting accounts, paid subscriptions, billing arrangements and personal infrastructure choices are outside this package's scope.

## 7. Review sequence and handoff

1. Review Product Change Record 001 and Product Definition v0.2.0.
2. Review Application Architecture.
3. Review Data Model and Security/RLS design.
4. Review Development, Testing and Deployment design.
5. Complete Architecture Review & Acceptance.
6. Complete the UX compatibility and traceability review; keep UX Acceptance OPEN until Owner decisions and required design evidence are recorded.
7. Resolve or explicitly defer all decisions required by the first Beginner implementation scope.
8. Verify the actual GAIS-exported scaffold and approve a bounded Phase 3.3 Task Contract before implementation.
9. Implement and verify each bounded change with evidence.

## 8. External technical references

### Google AI Studio

- Google AI Studio Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

### Supabase — reference database environment

- Supabase pricing: https://supabase.com/pricing
- Supabase billing and quotas: https://supabase.com/docs/guides/platform/billing-on-supabase
- Supabase Free project pausing: https://supabase.com/docs/guides/platform/free-project-pausing
- Supabase database backups: https://supabase.com/docs/guides/platform/backups
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod

### Optional hosting example

- Vercel Hobby plan: https://vercel.com/docs/plans/hobby
- Vercel terms: https://vercel.com/legal/terms

Vercel references are included only when the book uses Vercel as an optional practical example. They do not define a mandatory hosting provider.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*

