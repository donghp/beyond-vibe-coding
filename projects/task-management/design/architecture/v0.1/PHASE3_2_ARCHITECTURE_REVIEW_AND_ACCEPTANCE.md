# BVC Phase 3.2 — Architecture Review & Acceptance

**Document ID:** BVC-TM-AR-001  
**Phase:** 3.2 — Application Architecture & Technical Design  
**Version:** 0.1.2  
**Status:** Product Owner Accepted — Phase 3.2 Design Baseline  
**Product Definition:** BVC-TM-PD-001 v0.2.0  
**Acceptance date:** 2026-11-04

## 1. Purpose

Record the Product Owner's review and acceptance of the Phase 3.2 architecture design for BVC Task Management.

This record evaluates whether the architecture is coherent, sufficiently specified for the approved three-level learning scope, consistent with the product definition and ready to serve as the baseline for Phase 3.3 implementation planning.

This record separates architecture design acceptance from implementation and runtime verification.

It does not claim that application implementation, cloud provisioning, database migration, deployment or runtime tests have occurred.

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
- Free-tier hosting learning approach.
- Supabase Free as the reference database environment for practical exercises.
- Testing strategy and operational acceptance criteria.

Phase 3.2 does not:

- Implement the application.
- Create a GAIS application.
- Create cloud resources.
- Apply production database migrations.
- Deploy a live application.
- Claim runtime or production test results.
- Require a particular hosting provider.
- Require disclosure of private hosting accounts, subscriptions, billing or infrastructure choices.
- Reopen or redesign Phase 3.1 UI/UX.

## 3. Review gates

| Gate | Acceptance question | Evidence required | Status |
|---|---|---|---|
| G1 — Product change control | Has the Local-First v0.1 conflict been resolved through a controlled revision? | Product Owner approval of BVC-TM-PCR-001 and Product Definition v0.2.0 | PASS — Owner approval recorded 2026-11-04; merge pending |
| G2 — Phase boundary | Is the Phase 3.1 UX package preserved without redesign in Phase 3.2? | Owner direction and repository diff showing no Phase 3.1 UX file modifications | PASS — Scope boundary only |
| G3 — Three-level architecture | Are Beginner, Intermediate and Advanced flows distinct and coherent? | Application Architecture document and diagrams | PASS — Design accepted |
| G4 — Persistence model | Is the same logical domain model supported by browser and Supabase adapters? | Data Model document | PASS — Design accepted |
| G5 — Database/RLS design | Are tables, ownership, constraints, grants and RLS policies specified? | Data Model and Security documents | PASS — Design specified; runtime tests deferred |
| G6 — Secrets/environments design | Are client-safe keys separated from privileged secrets? | Security document and environment matrix | PASS — Design accepted; secret scan deferred |
| G7 — Backup/migration design | Is export/import versioned and safe? | Data Model and migration procedure | PASS — Design accepted; runtime tests deferred |
| G8 — Development workflow | Are GAIS, GitHub and VS Code responsibilities clear? | Development workflow document | PASS — Workflow accepted |
| G9 — Hosting/deployment design | Is a provider-neutral free-tier hosting learning approach defined? | Architecture and Development/Deployment documents | PASS — Provider-neutral design accepted |
| G10 — Testing strategy | Are unit, integration, RLS, E2E, responsive and deployment checks defined? | Test matrix | PASS — Strategy defined; execution deferred |
| G11 — Baseline integrity | Are the five Phase 2 Core Specifications unchanged? | Repository comparison of the Phase 3.2 branch against `main` | PASS — No Phase 2 specification files changed in PR #5 |
| G12 — Human acceptance | Has the Owner formally accepted the Phase 3.2 Architecture Package? | Product Owner acceptance recorded in this document | PASS — Owner acceptance recorded 2026-11-04 |

### 3.1 Acceptance boundary

The PASS state of G2 means only that the Phase 3.1 UX package is preserved as the design boundary for Phase 3.2.

It does not mean that the separate Phase 3.1 UX Review & Acceptance record has been formally closed.

The PASS state of G5, G6 and G7 refers to design completeness and specified controls. It does not claim that RLS, secret scanning, backup/restore or migration tests have already been executed.

The PASS state of G9 refers to the provider-neutral free-tier hosting design. It does not select a hosting provider or disclose any individual's hosting account or subscription.

G11 is based on the GitHub PR comparison showing that the current Phase 3.2 PR changes Task Management product and architecture documentation only, with no files under the Phase 2 Core Specifications path modified.

## 4. Phase 3.2 design acceptance criteria

The following criteria assess whether the design is adequately specified.

They do not assert that the application has been implemented or runtime-tested.

### 4.1 Product and architecture

- [x] One product and one logical domain model are defined across all three levels.
- [x] Beginner does not require Localhost, VS Code, SQL, Supabase or an external database.
- [x] Beginner browser JSON persistence (`localStorage`) and its limitations are explained.
- [x] Beginner browser persistence is not incorrectly described as a Local-First architecture.
- [x] Intermediate introduces Supabase PostgreSQL, Auth and RLS.
- [x] Supabase Free is identified as the reference database environment for book exercises.
- [x] Advanced includes GAIS, GitHub, VS Code/Localhost, Supabase and Web App Hosting.
- [x] GitHub is defined as the reviewed source history and PR boundary.
- [x] GAIS two-way sync conflict risk is addressed with a one-writer rule.
- [x] Supabase data model defines ownership and referential integrity.

### 4.2 Security, data and portability

- [x] RLS policies and required negative tests are specified for exposed application tables.
- [x] Privileged secrets are explicitly prohibited from client bundles and public repository files.
- [x] Date-only product concepts are separated from UTC audit timestamps.
- [x] Backup/restore is versioned, validated and non-destructive on invalid input.
- [x] Beginner-to-Supabase migration is specified.
- [x] Supabase Free backup and inactivity limitations are identified as learning considerations.
- [x] Public examples use synthetic data and exclude credentials or confidential information.

### 4.3 Hosting, workflow and UX boundaries

- [x] Hosting is provider-neutral and is not a mandatory architectural dependency.
- [x] The book's practical hosting walkthrough focuses on a compatible free-tier service.
- [x] Vercel is allowed only as an optional illustrative example, not a mandatory provider.
- [x] Deployment flow distinguishes Preview/Test from the live deployment.
- [x] Free-tier limitations and changing provider terms are acknowledged.
- [x] Automated tests and CI behavior are specified.
- [x] Phase 3.1 UX is not redesigned or silently modified.
- [x] Historical Local-First assumptions in the v0.1 product baseline are handled through formal versioning, not silent edits.
- [x] Technical assumptions and unresolved implementation decisions are documented.

## 5. Runtime and implementation verification — Phase 3.3

The following checks cannot be marked PASS based on architecture documents alone.

They must be executed and supported by implementation evidence.

| Area | Required evidence | Phase |
|---|---|---|
| Application scaffold | Actual GAIS export inspected; framework, runtime and dependencies recorded | 3.3 |
| Application build | Clean install and successful production build | 3.3 |
| Browser persistence | CRUD, reload, quota/error handling and JSON import/export tests | 3.3 |
| Supabase project | Learning project provisioned and configuration recorded without exposing secrets | 3.3 |
| Supabase schema | Applied migrations and schema inspection | 3.3 |
| Authentication | Sign-up/sign-in/sign-out and recovery verification | 3.3 |
| RLS | Positive and negative cross-user access tests | 3.3 |
| Secret protection | Repository scan and built client-bundle inspection | 3.3 |
| Migration | Beginner export/import with record and relationship verification | 3.3 |
| Responsive behavior | Tests on supported phone, tablet and desktop breakpoints | 3.3 |
| Accessibility | Keyboard, focus, labels, contrast and zoom checks | 3.3 |
| Free-tier hosting | Selected example provider confirmed compatible with the actual scaffold | 3.3 |
| Deployment | Preview/test deployment and live URL verification | 3.3 |
| Production safety | Environment separation and data isolation | 3.3 |
| Recovery | Backup restore and rollback/redeployment evidence | 3.3 |
| CI | Actual GitHub Actions or equivalent workflow results for required checks | 3.3 |

No runtime item is PASS until the corresponding test has been executed and its evidence is recorded.

### 5.1 Free-tier service verification

Before using a free-tier service in a practical exercise:

- Confirm its current terms and eligibility.
- Confirm the application framework and runtime are supported.
- Review the relevant build, storage, bandwidth and usage limits.
- Verify the deployment process with a real application build.
- Explain any inactivity or pausing behavior that may affect the exercise.
- Provide a practical backup/export procedure for important learning data.

Do not hardcode permanent provider quotas in the architecture baseline.

## 6. Open and deferred implementation decisions

| ID | Decision | Resolution | Status |
|---|---|---|---|
| ODEC-001 | Hosting provider for an individual deployment | Reader chooses a compatible provider; book uses a free-tier example | RESOLVED — Provider-neutral |
| ODEC-002 | Database reference for learning | Supabase Free | RESOLVED — Reference environment |
| ODEC-003 | Beginner browser store | Small versioned browser JSON workspace (`localStorage`) | ACCEPTED FOR DESIGN — Implementation validation in Phase 3.3 |
| ODEC-004 | Frontend build tool | Inspect GAIS scaffold; verify framework, build output and compatibility | DEFERRED — Phase 3.3 |
| ODEC-005 | Authentication method | Select Supabase email/password or magic link | DEFERRED — Before Auth implementation |
| ODEC-006 | Local Supabase stack | Optional Advanced practice; CLI migrations recommended | OPTIONAL — Not a Phase 3.2 blocker |
| ODEC-007 | Product Definition baseline transition | v0.2.0 approved by Product Owner; effective repository baseline after controlled merge | RESOLVED — Owner approval recorded |
| ODEC-008 | Exact hosting service used in practical screenshots | Choose a compatible free-tier example when preparing the lesson; do not make it a product requirement | DEFERRED — Practical lesson preparation |

The reader's or author's private hosting account, subscription, billing arrangement or infrastructure selection is not an architecture decision and is not required as a project record.

## 7. Phase 3.2 exit criteria

Phase 3.2 is complete when:

1. Product Change Record 001 and Product Definition v0.2.0 have received Product Owner approval.
2. The three-level architecture and technical design have been reviewed and accepted.
3. Browser and Supabase persistence boundaries are defined.
4. Authentication, ownership, RLS and secret-management requirements are specified.
5. Backup, restore and Beginner-to-Supabase migration are specified.
6. The hosting design is provider-neutral and the practical learning path focuses on free-tier services.
7. Supabase Free is established as the database reference for the book's hands-on exercises.
8. The five Phase 2 Core Specifications are verified unchanged by repository diff.
9. The separate Phase 3.1 UX acceptance status is accurately recorded and is not implied to be closed by Phase 3.2.
10. Runtime implementation and verification responsibilities are explicitly handed off to Phase 3.3.
11. The first Phase 3.3 implementation Task Contract can be written without inventing architecture decisions.

Runtime and deployment checks listed in Section 5 belong to Phase 3.3. They are not prerequisites for accepting the Phase 3.2 design baseline, provided their requirements and evidence responsibilities are explicitly defined.

The exact hosting service selected by an individual reader is not a Phase 3.2 exit criterion.

## 8. Final Architecture Acceptance Record

**Overall outcome: ACCEPTED — Phase 3.2 Architecture Design Baseline.**

**Product Owner decision date:** 2026-11-04  
**Product Definition:** v0.2.0 approved by the Product Owner.  
**Architecture acceptance:** Approved by the Product Owner on 2026-11-04.  
**Database learning reference:** Supabase Free.  
**Hosting approach:** Provider-neutral free-tier hosting.  
**Repository publication status:** PR #5 remains subject to controlled merge into `main`.

### Accepted baseline

- Product Definition v0.2.0 is approved by the Product Owner.
- The three-level Beginner, Intermediate and Advanced architecture is accepted as the Phase 3.2 design direction.
- Supabase Free is accepted as the reference database environment for the book's practical exercises.
- Hosting is provider-neutral. The practical guide focuses on compatible free-tier hosting.
- Vercel is an optional illustrative example only; it is not a mandatory provider or architectural standard.
- Phase 3.1 UX files remain unchanged. Their separate UX Review & Acceptance record is independent.
- The five Phase 2 Core Specifications remain unchanged in the PR #5 diff.
- Application Architecture, Data Model, Security and Development/Deployment designs are accepted as the Phase 3.2 design baseline.
- Private hosting accounts, subscriptions, billing arrangements and infrastructure choices are outside the project documentation scope.

### Deferred to Phase 3.3

- Inspect and verify the actual GAIS-exported application scaffold.
- Confirm the exact framework and build configuration.
- Provision the Supabase Free learning project.
- Select and implement the Supabase Auth method.
- Implement browser and Supabase persistence adapters.
- Apply and test database migrations and RLS policies.
- Verify secret protection, import/export, responsive behavior and accessibility.
- Select a compatible free-tier hosting example for the practical walkthrough.
- Configure and verify Preview/Test and live deployments.
- Produce runtime, CI and deployment evidence.

These deferred items do not invalidate the Phase 3.2 design acceptance.

They must be resolved in the relevant Phase 3.3 Task Contracts before implementation or release activities that depend on them.

**Next action:** Publish the accepted Phase 3.2 baseline through the controlled PR #5 merge, then prepare and approve the first Phase 3.3 implementation Task Contract.

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
