# BVC Phase 3.2 — Architecture Review & Acceptance

**Document ID:** BVC-TM-AR-001\
**Phase:** 3.2 — Application Architecture & Technical Design\
**Version:** 0.1.0\
**Status:** Draft — Owner Review Required\
**Date:** 2026-11-04

## 1. Purpose

Record whether the Phase 3.2 architecture is coherent, implementable, secure enough for the defined learning scope, and consistent with the Owner-approved three-level direction.

This record does not claim that implementation, cloud provisioning, deployment or runtime tests have occurred.

## 2. Phase 3.2 scope

Phase 3.2 defines:
- three-level architecture and tool responsibilities;
- application structure, routing and persistence boundaries;
- logical and PostgreSQL data models;
- date/time semantics;
- authentication and RLS design;
- secrets and environment management;
- backup/import/export and Beginner-to-Supabase migration;
- source-control, CI and deployment workflow;
- testing and operational acceptance.

Phase 3.2 does not implement the app, create cloud resources or reopen Phase 3.1 UI/UX.

## 3. Review gates

| Gate | Acceptance question | Evidence required | Status |
|---|---|---|---|
| G1 — Product change control | Is the Local-First v0.1 conflict resolved through a controlled revision? | Approved BVC-TM-PCR-001 and Product Definition v0.2.0 | OPEN |
| G2 — Phase boundary | Is Phase 3.1 UI/UX preserved without redesign? | Explicit Owner decision and source references | PASS — Owner direction |
| G3 — Three-level architecture | Are Beginner, Intermediate and Advanced flows distinct and coherent? | Architecture document and diagrams | DRAFT |
| G4 — Persistence model | Is the same domain model supported by browser and Supabase adapters? | Data Model document | DRAFT |
| G5 — Database/RLS | Are tables, ownership, constraints, grants and RLS policies specified? | Data Model and Security document | DRAFT |
| G6 — Secrets/environments | Are client-safe keys separated from privileged secrets? | Security document and environment matrix | DRAFT |
| G7 — Backup/migration | Is export/import versioned and safe? | Data Model and migration procedure | DRAFT |
| G8 — Dev workflow | Are GAIS, GitHub and VS Code responsibilities clear? | Development workflow | DRAFT |
| G9 — Hosting/deployment | Is Preview vs Production behavior defined and plan eligibility stated? | Deployment document and selected provider decision | OPEN |
| G10 — Testing | Are unit, integration, RLS, E2E, responsive and deployment checks defined? | Test matrix | DRAFT |
| G11 — Baseline integrity | Are the five Phase 2 Core Specifications unchanged? | Later repository diff review | NOT VERIFIED |
| G12 — Human acceptance | Has the Owner accepted the architecture package? | Signed/recorded acceptance | OPEN |

## 4. Architecture acceptance criteria

- [ ] One product/domain model is used across all three levels.
- [ ] Beginner does not require Localhost, VS Code, SQL, Supabase or external DB.
- [ ] Beginner no-database browser JSON persistence (`localStorage`) and its limitations are explained; no Local-First architecture or Localhost setup is required.
- [ ] Intermediate introduces Supabase PostgreSQL, Auth and RLS.
- [ ] Advanced includes GAIS, GitHub, VS Code/Localhost, Supabase and Hosting.
- [ ] GitHub is the reviewed source history and PR boundary.
- [ ] GAIS two-way sync conflict risk is addressed with a one-writer rule.
- [ ] Supabase data model includes ownership and referential integrity.
- [ ] RLS is enabled and tested on all exposed application tables.
- [ ] No privileged key is included in client bundles or public repository.
- [ ] Date-only product concepts are separated from UTC audit timestamps.
- [ ] Backup/restore is versioned, validated and non-destructive on invalid input.
- [ ] Deployment flow distinguishes Preview from Production.
- [ ] Vercel Hobby limitations and non-commercial restriction are disclosed if selected.
- [ ] Automated tests and GitHub Actions storage-conscious behavior are specified.
- [ ] Phase 3.1 UX is not redesigned or silently modified.
- [ ] Product Definition v0.1 Local-First conflict is resolved through formal versioning.
- [ ] Human Owner approval is recorded before Phase 3.3 implementation begins.

## 5. Open decisions

| ID | Decision | Recommended default | Status |
|---|---|---|---|
| ODEC-001 | Final hosting provider | Vercel Hobby for personal/non-commercial practice | Owner confirmation pending |
| ODEC-002 | Supabase tier for learning | Free tier, with documented inactivity and backup limits | Owner confirmation pending |
| ODEC-003 | Beginner browser store | browser JSON storage | Proposed |
| ODEC-004 | Frontend build tool | React + TypeScript; verify GAIS scaffold, prefer Vercel-compatible SPA build | Proposed |
| ODEC-005 | Auth method | Supabase email/password or magic link; choose one in Phase 3.3 | Deferred |
| ODEC-006 | Local Supabase stack | Optional advanced practice; CLI migrations recommended | Proposed |

## 6. Exit criteria

Phase 3.2 is complete only when:
1. All review gates are either PASS or explicitly accepted as deferred with rationale.
2. Product Change Record is accepted and Product Definition revision is published.
3. Architecture, Data Model, Security and Deployment documents are approved.
4. Technical choices and limitations are explicit.
5. The first Phase 3.3 implementation Task Contract can be written without inventing architecture decisions.

**Current overall outcome:** NOT YET ACCEPTED — architecture package prepared for Owner review. No implementation or deployment has been verified.
