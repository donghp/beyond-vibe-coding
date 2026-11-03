
# BVC Task Management — Phase 3.2 Architecture Package v0.1

**Program:** BEYOND VIBE CODING — Build & Learn  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.2 — Application Architecture & Technical Design  
**Package version:** 0.1.0  
**Status:** Draft for Product Owner Review  
**Prepared:** 2026-11-04

## 1. Purpose

This package translates the proposed three-level learning direction into an implementable architecture.

It preserves the Phase 3.1 UI/UX package as the existing design reference and does not reopen visual design or redesign the user experience.

This package is a technical design proposal. It does not claim that application implementation, cloud provisioning, deployment or runtime verification has been completed.

## 2. Governing product documents

- [Product Definition v0.1.0 — Frozen Baseline](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Product Definition v0.2.0 — Draft](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Product Change Record 001](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_CHANGE_RECORD_001.md)

**Baseline authority:** Product Definition v0.1.0 remains the last formally frozen repository baseline until v0.2.0 is explicitly approved and accepted through the controlled repository process.

Product Definition v0.2.0 describes the proposed three-level learning model. Its publication on a review branch does not by itself replace the frozen baseline.

## 3. Owner-approved learning direction

The following product direction is the basis for this architecture proposal:

1. Beginner works directly in Google AI Studio; no Localhost or VS Code is required.
2. Beginner has no external database; a small browser JSON workspace may be used only for practice persistence.
3. Intermediate introduces Supabase PostgreSQL, schema/SQL, Auth and RLS.
4. Advanced combines GAIS + GitHub + VS Code/Localhost + Supabase + Web App Hosting.
5. The same BVC Task Management product progresses through all levels.
6. Phase 3.1 UX is a fixed design input; no UI redesign is included.

The exact browser persistence implementation, Supabase plan, hosting provider and frontend build configuration remain subject to the technical and Product Owner decisions recorded in the package.

### 3.1 Phase 3.1 UX version boundary

The Phase 3.1 UX package was prepared against Product Definition v0.1.0.

Some Phase 3.1 UX descriptions may therefore contain historical assumptions about local-only persistence or the earlier single-level product model.

For Phase 3.2:

- Preserve the existing Phase 3.1 visual design, screens, navigation, responsive behavior and interaction guidance.
- Do not modify or redesign Phase 3.1 UX files as part of this architecture consistency update.
- Interpret storage, identity, synchronization and hosting behavior according to the proposed three-level product direction in Product Definition v0.2.0, subject to formal approval.
- Record any genuine conflict between a UX behavior and the revised product direction for explicit Product Owner resolution.
- Do not silently change the UX package to make it appear formally accepted.

The Phase 3.1 UX Review & Acceptance record remains a separate governance item. Preserving the UX files does not mean that the formal UX acceptance gate has passed.

## 4. Package contents

| File | Purpose |
|---|---|
| `BVC_TASK_MANAGEMENT_APPLICATION_ARCHITECTURE_V0.1.md` | System architecture, components, three learning levels and boundaries |
| `BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md` | Logical entities, browser/Supabase persistence, PostgreSQL model, date semantics and migration |
| `BVC_TASK_MANAGEMENT_SECURITY_AND_ENVIRONMENT_V0.1.md` | Authentication, RLS, secrets, environments, privacy and backup |
| `BVC_TASK_MANAGEMENT_DEVELOPMENT_TESTING_DEPLOYMENT_V0.1.md` | GAIS/GitHub/VS Code workflow, CI, hosting and operational verification |
| `PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md` | Review gates and Phase 3.2 exit criteria |

## 5. Status and governance

- Product Definition v0.2.0 is a draft. It must be explicitly reviewed and approved before it replaces v0.1.0.
- Product Change Record 001 records the proposed baseline change and is submitted for formal repository review.
- Vercel Hobby is the proposed default hosting for personal/non-commercial practice; final selection remains subject to Owner confirmation.
- Supabase is the selected database platform for Intermediate/Advanced; the exact plan is subject to current provider limits and Owner confirmation.
- The actual GAIS-exported scaffold must be inspected before freezing the frontend build tool or assuming direct Vercel compatibility.
- This package is published on the GitHub Phase 3.2 review branch and is under PR #5 review. It has not yet been merged into `main` or formally accepted.
- No cloud resource, Supabase project/database or Vercel project is claimed as created.
- No runtime security, integration or deployment verification is claimed as completed.

## 6. Review sequence

1. Review Product Change Record 001 and Product Definition v0.2.0.
2. Review Application Architecture.
3. Review Data Model and Security/RLS design.
4. Review Development, Testing and Deployment design.
5. Resolve open technical decisions.
6. Complete Architecture Review & Acceptance.
7. Only after acceptance, prepare Phase 3.3 implementation Task Contracts.

## 7. External technical references

- Google AI Studio Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Supabase Production Checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Vercel Git deployments: https://vercel.com/docs/git
- Vercel Hobby plan: https://vercel.com/docs/plans/hobby
- Vercel Terms of Service: https://vercel.com/legal/terms

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*

