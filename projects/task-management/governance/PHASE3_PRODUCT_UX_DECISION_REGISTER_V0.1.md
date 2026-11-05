# BVC Task Management — Phase 3 Product / UX Decision Register

**Document ID:** BVC-TM-DR-001  
**Version:** 0.1.0  
**Status:** Canonical decision register — Product Owner decisions required  
**Product baseline:** BVC-TM-PD-001 v0.2.0  
**Architecture baseline:** Phase 3.2 Architecture Design Baseline, Product Owner accepted 2026-11-04  
**UX status:** Phase 3.1 formal UX Acceptance remains OPEN  
**Prepared:** 2026-11-04

---

## 1. Purpose and authority

This register consolidates Product, UX, interaction, visual-design, data-model and security decisions that are distributed across the Phase 3.1 and Phase 3.2 documents.

It is the canonical index for decision status and source-ID aliases. It does not silently replace the source documents, alter Product Definition v0.2.0, or convert proposed defaults into approved decisions.

**Decision authority:** only an explicit Product Owner decision recorded in the project governance record can change an item from OPEN to APPROVED. An item may be marked DEFERRED only when the Owner explicitly agrees that it is outside the current implementation scope. A proposal written in a design document is not an approval.

The UX documents remain versioned as the original v0.1.0 design package. They were authored against Product Definition v0.1.0 and are being checked for compatibility with current Product Definition v0.2.0. Their formal acceptance remains OPEN.

## 2. Status definitions

| Status | Meaning |
|---|---|
| **ACCEPTED FOR DESIGN** | The Product Owner accepted the design direction. This is not implementation or runtime verification. |
| **OPEN** | No explicit Product Owner decision is recorded. A proposed default is only a recommendation. |
| **DEFERRED** | The Product Owner explicitly moved the decision outside the current task/level. It must not be implemented in that scope. |
| **BLOCKED** | The dependent implementation task must not proceed until the decision is resolved or formally deferred. |
| **VERIFICATION REQUIRED** | The design is accepted, but runtime/test evidence is not yet available. |
| **RESOLVED** | The controlling record contains a completed decision for the applicable scope; retain its source record as evidence. |
| **OPTIONAL** | The capability is not a current phase blocker and is introduced only when a later task explicitly needs it. |

## 3. Canonical decision register

### 3.1 Product behavior and interaction

| Canonical ID | Decision | Existing source aliases | Proposed default (not approved) | Current status | Implementation dependency |
|---|---|---|---|---|---|
| DR-001 | Upcoming horizon in My Day | DEC-UX-001; UJ-OPEN-01 | Next seven calendar days | OPEN | Resolve before implementing Upcoming date filtering |
| DR-002 | Today's Focus lifetime/reset | DEC-UX-002; UJ-OPEN-02; INT-OPEN-01 | Focus marker scoped to the current local calendar date | OPEN | Resolve before implementing Focus persistence/reset |
| DR-003 | Project removal behavior | DEC-UX-003; UJ-OPEN-03; INT-OPEN-02 | Preserve tasks and detach them to No project; never cascade-delete | OPEN | Resolve before implementing project deletion |
| DR-004 | Reapplying a Starter Kit | DEC-UX-004; UJ-OPEN-04; INT-OPEN-03 | Skip recognized/already-applied items and report added/skipped items | OPEN | Resolve before implementing repeat-application/merge logic |
| DR-005 | Timing and exact copy of first-use storage disclosure | DEC-UX-005; UJ-OPEN-05; UX-002 | Explain the active learning level before important data entry | OPEN | Resolve placement/copy before first Beginner onboarding task |
| DR-006 | Restore conflict and replacement semantics | INT-OPEN-04 | Validate first; preview the effect; require explicit confirmation before replacing the current workspace; preserve existing data on failure | OPEN | Resolve before implementing Beginner restore |
| DR-007 | Task deletion interaction | INT-OPEN-05; UX-019 | Confirmation dialog or a reliable, accessible undo mechanism; no silent deletion | OPEN | Resolve before implementing delete interaction |

### 3.2 Visual system and usability

| Canonical ID | Decision | Existing source aliases | Proposed default (not approved) | Current status | Implementation dependency |
|---|---|---|---|---|---|
| DR-008 | Initial visual theme | DEC-UX-006; DS-OPEN-02 | Calm light theme for the initial implementation; defer dark theme unless justified | OPEN | Resolve before freezing theme tokens |
| DR-009 | Primary color/hue | DEC-UX-007; DS-OPEN-01 | Retain the restrained proposed blue only after Owner review and rendered contrast check | OPEN | Resolve before visual-token freeze |
| DR-010 | Minimum browser support matrix | DEC-UX-008 | Confirm supported browser/version matrix against target readers and practical test availability | OPEN | Resolve before final browser/device acceptance |
| DR-011 | Font packaging | DS-OPEN-03 | System-first font stack; bundle a font only when justified and licensing/package handling is clear | OPEN | Resolve before bundling font assets |
| DR-012 | Icon family | DS-OPEN-04 | One consistent line-icon family with accessible names | OPEN | Resolve before final icon implementation |
| DR-013 | Final contrast audit | DS-OPEN-05 | Measure real foreground/background/state combinations after rendered UI exists | VERIFICATION REQUIRED | Requires implementation screenshots and measured contrast evidence; not a design-only approval |

### 3.3 Data model, migration and security

| Canonical ID | Decision | Existing source aliases | Proposed default (not approved) | Current status | Implementation dependency |
|---|---|---|---|---|---|
| DR-014 | Beginner browser persistence | DATA-001; ODEC-003 | Small versioned JSON workspace in browser `localStorage`; no external database/Auth/Localhost | ACCEPTED FOR DESIGN; runtime verification required | Do not treat acceptance as proof of persistence behavior; verify in Phase 3.3 |
| DR-015 | Starter Kit definition packaging | DATA-002 | Static, version-controlled application assets | OPEN | Resolve before choosing the implementation source/format |
| DR-016 | Beginner-to-Supabase import semantics | DATA-003 | Preview and merge by default; replacement only after explicit confirmation | OPEN | Resolve before Intermediate migration/import implementation |
| DR-017 | Timezone source and editing | DATA-004 | Detect browser IANA timezone on first use and allow user correction | OPEN | Resolve before date-boundary and Supabase timezone implementation |
| DR-018 | Advanced local Supabase stack | DATA-005 | Supabase CLI and migrations are taught; a local database stack remains optional | OPEN | Resolve before writing Advanced local-environment instructions |
| DR-019 | Supabase Auth method and recovery flow | Security & Environment Design §3 | Choose one supported method (email/password or magic link) and document its recovery flow | OPEN | Must be resolved before the first Intermediate Auth implementation task |
### 3.4 Phase 3.2 architecture decision crosswalk (ODEC)

The following ODEC identifiers remain authoritative aliases in the Phase 3.2 Architecture Review & Acceptance record. This crosswalk makes their current state visible beside the canonical DR register; it does not turn technical deferrals into new Product Owner approvals.

| Source ID | Architecture decision | Current status | Canonical relationship / next control |
|---|---|---|---|
| ODEC-001 | Hosting provider for an individual deployment | RESOLVED — provider-neutral; book may use a compatible free-tier example | No mandatory vendor; reader selects a compatible provider |
| ODEC-002 | Database reference for learning | RESOLVED — Supabase Free is the reference database environment for the book's practical exercises | Product learning direction; confirm live terms/quotas before publishing instructions |
| ODEC-003 | Beginner browser store | ACCEPTED FOR DESIGN — runtime validation remains required | Canonical DR-014 |
| ODEC-004 | Frontend build tool | DEFERRED — inspect the actual GAIS-generated scaffold before selecting build configuration | No framework/build tool is frozen before scaffold inspection |
| ODEC-005 | Authentication method | DEFERRED until the Product Owner decides the method and recovery flow | Canonical DR-019; resolve before first Intermediate Auth implementation task |
| ODEC-006 | Local Supabase stack | OPTIONAL for the Phase 3.2 architecture baseline; this does not settle whether a local stack belongs in the Advanced curriculum | DR-018 remains OPEN until the Advanced local-environment lesson scope is decided; Supabase CLI/migrations remain the recommended workflow |
| ODEC-007 | Product Definition baseline transition | RESOLVED — v0.2.0 is current on main through merged PR #5 (ff59827d07eef982e0a23a11279e47c7817c457c) | v0.1.0 remains historical |
| ODEC-008 | Exact hosting service used in practical screenshots | DEFERRED — choose a compatible free-tier example when preparing the practical lesson | Provider-neutral; not a Product Owner product/architecture mandate |


## 4. Product-level rules already established by v0.2.0

The following are not open design decisions and must not be reopened through a UX default:

1. One BVC Task Management product progresses through Beginner, Intermediate and Advanced.
2. Beginner requires no external database, sign-in, VS Code or Localhost. Its small browser workspace may use `localStorage`; it is not a Local-First architecture and does not automatically sync across devices.
3. Intermediate uses Supabase PostgreSQL, Supabase Auth and RLS for a user's personal workspace.
4. Advanced adds GitHub, VS Code/Localhost, migrations, CI/testing and compatible Web App Hosting.
5. Role Starter Kits are editable starting configurations, not identity roles or permissions.
6. The product does not include team workspaces, invitations or shared task collaboration.
7. Hosting remains provider-neutral. Supabase Free is the reference database environment for practical exercises; Vercel is optional, not mandatory.
8. Business Tasks remain distinct from BVC Engineering Tasks and the five Phase 2 Core Specifications.

## 5. Acceptance and verification boundaries

- Product Definition v0.2.0 is the current product baseline on `main`, published through merged PR #5.
- Phase 3.2 Architecture Design Baseline is Product Owner Accepted. This does not mean the app, database, RLS policies, Auth flow, backup/restore or deployment have been implemented or tested.
- Phase 3.1 UX Acceptance remains OPEN. This register does not close it.
- A decision marked ACCEPTED FOR DESIGN is not a runtime PASS.
- An OPEN decision may be excluded from an implementation task only when that exclusion is explicit and does not undermine the task's acceptance criteria.
- Every implementation task must reference the relevant canonical IDs and preserve evidence for its verification result.

## 6. Decision record template

When the Product Owner makes a decision, record:

| Field | Required value |
|---|---|
| Canonical ID | DR-xxx |
| Decision | Exact approved behavior |
| Decision owner | Product Owner |
| Decision date | YYYY-MM-DD |
| Status | APPROVED or DEFERRED |
| Rationale | Why this decision was selected |
| Scope | Learning level / feature / release |
| Source aliases | Existing UX/Data/Security IDs |
| Follow-up | Documents and tasks requiring update |

Do not fill this section by inference. Until an explicit Owner decision is recorded, keep the corresponding canonical item OPEN.

---

**BVC Task Management — Product/UX Decision Register v0.1.0**  
*One canonical place for decisions; no proposal becomes policy without Owner approval.*
