
# BVC Phase 3.2 — Architecture Review & Acceptance

**Document ID:** BVC-TM-AR-001  
**Phase:** 3.2 — Application Architecture & Technical Design  
**Version:** 0.1.1  
**Status:** Draft — Owner Review Required  
**Date:** 2026-11-04

## 1. Purpose

Record whether the Phase 3.2 architecture is coherent, implementable, sufficiently specified for the defined learning scope, and consistent with the proposed three-level product direction.

This record separates architecture design review from implementation and runtime verification.

It does not claim that application implementation, cloud provisioning, deployment or runtime tests have occurred.

## 2. Phase 3.2 scope

Phase 3.2 defines:

- Three-level architecture and tool responsibilities.
- Application structure, routing and persistence boundaries.
- Logical and PostgreSQL data models.
- Date/time semantics.
- Authentication and RLS design.
- Secrets and environment management.
- Backup/import/export and Beginner-to-Supabase migration.
- Source-control, CI and deployment workflow.
- Testing strategy and operational acceptance criteria.

Phase 3.2 does not:

- Implement the application.
- Create cloud resources.
- Apply production database migrations.
- Deploy a live application.
- Claim runtime or production test results.
- Reopen or redesign Phase 3.1 UI/UX.

## 3. Review gates

| Gate | Acceptance question | Evidence required | Status |
|---|---|---|---|
| G1 — Product change control | Has the Local-First v0.1 conflict been resolved through a controlled revision? | Approved BVC-TM-PCR-001 and Product Definition v0.2.0 | OPEN |
| G2 — Phase boundary | Is the Phase 3.1 UX package preserved without redesign in Phase 3.2? | Owner direction and repository diff showing no Phase 3.1 UX file modifications | PASS — Scope boundary only |
| G3 — Three-level architecture | Are Beginner, Intermediate and Advanced flows distinct and coherent? | Application Architecture document and diagrams | DRAFT |
| G4 — Persistence model | Is the same domain model supported by browser and Supabase adapters? | Data Model document | DRAFT |
| G5 — Database/RLS design | Are tables, ownership, constraints, grants and RLS policies specified? | Data Model and Security documents | DRAFT |
| G6 — Secrets/environments design | Are client-safe keys separated from privileged secrets? | Security document and environment matrix | DRAFT |
| G7 — Backup/migration design | Is export/import versioned and safe? | Data Model and migration procedure | DRAFT |
| G8 — Development workflow | Are GAIS, GitHub and VS Code responsibilities clear? | Development workflow document | DRAFT |
| G9 — Hosting/deployment decision | Is the hosting provider selected and are Preview/Production boundaries defined? | Deployment document and explicit Owner provider decision | OPEN |
| G10 — Testing strategy | Are unit, integration, RLS, E2E, responsive and deployment checks defined? | Test matrix | DRAFT |
| G11 — Baseline integrity | Are the five Phase 2 Core Specifications unchanged? | Repository comparison of the Phase 3.2 branch against its base | NOT VERIFIED — Final diff check required |
| G12 — Human acceptance | Has the Owner formally accepted the Phase 3.2 Architecture Package? | Recorded Product Owner acceptance | OPEN |

G2 PASS is limited to the scope boundary: Phase 3.2 must preserve Phase 3.1 UX files. It does not mean that the separate Phase 3.1 UX Review & Acceptance record has been formally closed.

## 4. Phase 3.2 design acceptance criteria

The following criteria assess whether the design is adequately specified. They do not assert that the application has been implemented.

- [ ] One product/domain model is defined across all three levels.
- [ ] Beginner does not require Localhost, VS Code, SQL, Supabase or an external database.
- [ ] Beginner browser JSON persistence (`localStorage`) and its limitations are explained.
- [ ] Beginner browser persistence is not incorrectly described as a Local-First architecture.
- [ ] Intermediate introduces Supabase PostgreSQL, Auth and RLS.
- [ ] Advanced includes GAIS, GitHub, VS Code/Localhost, Supabase and Web App Hosting.
- [ ] GitHub is defined as the reviewed source history and PR boundary.
- [ ] GAIS two-way sync conflict risk is addressed with a one-writer rule.
- [ ] Supabase data model defines ownership and referential integrity.
- [ ] RLS policies and required negative tests are specified for exposed application tables.
- [ ] Privileged secrets are explicitly prohibited from client bundles and public repository files.
- [ ] Date-only product concepts are separated from UTC audit timestamps.
- [ ] Backup/restore is versioned, validated and non-destructive on invalid input.
- [ ] Beginner-to-Supabase migration is specified.
- [ ] Deployment flow distinguishes Preview from Production.
- [ ] Vercel Hobby limitations and non-commercial restriction are disclosed if selected.
- [ ] Automated tests and GitHub Actions storage-conscious behavior are specified.
- [ ] Phase 3.1 UX is not redesigned or silently modified.
- [ ] Historical Local-First assumptions in the v0.1 product baseline are handled through formal versioning, not silent edits.
- [ ] Technical assumptions and unresolved decisions are documented.

## 5. Runtime and implementation verification — Phase 3.3

The following checks cannot be marked PASS based on architecture documents alone. They must be executed and supported by implementation evidence.

| Area | Required evidence | Phase |
|---|---|---|
| Application build | Clean install and successful production build | 3.3 |
| Browser persistence | CRUD, reload, quota/error handling and JSON import/export tests | 3.3 |
| Supabase schema | Applied migrations and schema inspection | 3.3 |
| Authentication | Sign-up/sign-in/sign-out and recovery verification | 3.3 |
| RLS | Positive and negative cross-user access tests | 3.3 |
| Secret protection | Repository scan and built client-bundle inspection | 3.3 |
| Migration | Beginner export/import with record and relationship verification | 3.3 |
| Responsive behavior | Tests on supported phone, tablet and desktop breakpoints | 3.3 |
| Accessibility | Keyboard, focus, labels, contrast and zoom checks | 3.3 |
| Deployment | Preview deployment and live URL verification | 3.3 |
| Production safety | Environment separation and production data isolation | 3.3 |
| Recovery | Backup restore and rollback/redeployment evidence | 3.3 |
| CI | Actual GitHub Actions workflow results for required checks | 3.3 |

No runtime item is PASS until the corresponding test has been executed and its evidence is recorded.

## 6. Open decisions

| ID | Decision | Recommended default | Status |
|---|---|---|---|
| ODEC-001 | Final hosting provider | Vercel Hobby for personal/non-commercial practice | Owner confirmation pending |
| ODEC-002 | Supabase tier for learning | Free tier, with documented inactivity and backup limits | Owner confirmation pending |
| ODEC-003 | Beginner browser store | Small versioned browser JSON workspace (`localStorage`) | Proposed |
| ODEC-004 | Frontend build tool | Inspect GAIS scaffold; verify React/build configuration and hosting compatibility | Proposed |
| ODEC-005 | Authentication method | Supabase email/password or magic link; choose one in Phase 3.3 | Deferred |
| ODEC-006 | Local Supabase stack | Optional Advanced practice; CLI migrations recommended | Proposed |
| ODEC-007 | Product Definition baseline transition | v0.2.0 replaces v0.1.0 only after explicit approval and controlled repository acceptance | OPEN |

## 7. Phase 3.2 exit criteria

Phase 3.2 is complete only when:

1. All design review gates are PASS or explicitly accepted as deferred with rationale.
2. Product Change Record 001 is formally accepted.
3. Product Definition v0.2.0 is formally approved and published through the controlled repository process.
4. Architecture, Data Model, Security and Deployment documents are reviewed and approved.
5. Hosting and Supabase learning-tier decisions are explicitly resolved or deferred with rationale.
6. The five Phase 2 Core Specifications are verified unchanged by repository diff.
7. The separate Phase 3.1 UX acceptance status is accurately recorded and is not implied to be closed by Phase 3.2.
8. The first Phase 3.3 implementation Task Contract can be written without inventing architecture decisions.

Runtime and deployment checks listed in Section 5 belong to Phase 3.3 and are not prerequisites for accepting the Phase 3.2 design package, provided their requirements and evidence responsibilities are explicitly defined.

## 8. Current overall outcome

**Current outcome: NOT YET ACCEPTED — Architecture package prepared for Product Owner review.**

- Product Definition v0.1.0 remains the last formally frozen repository baseline.
- Product Definition v0.2.0 remains a draft pending formal approval.
- Phase 3.1 UX artifacts are preserved; their separate acceptance record remains independent.
- Phase 3.2 architecture and technical design are prepared for review.
- Final Phase 2 Core Specification integrity verification remains required.
- No application implementation, cloud provisioning, RLS runtime test or deployment has been verified.

**Next action:** Complete the Product Owner review and resolve the open gates before authorizing Phase 3.3 implementation.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
