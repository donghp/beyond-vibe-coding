# BVC Task Management — UX & Product Design v0.1.0

**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.1 — UX & Product Design  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (UX authoring baseline dated 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (Product Owner approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN

---

## 1. Purpose

This folder contains the Phase 3.1 UX design package originally authored against Product Definition v0.1.0. Product Definition v0.2.0 is now the current product authority. This compatibility revision aligns product references and level-specific storage/access behavior without silently changing the historical design origin or closing formal UX acceptance.

These documents explain **how the agreed product should feel and behave**. They do not authorize new product features, change the MVP boundary, select the final application technology, or replace the Product Definition.

## 2. Design principle

> **Make the next useful action obvious. Keep everyday work simple. Reveal complexity only when it is needed.**

BVC Task Management is an everyday work tool, not a technical control dashboard. Its primary users may be sales leads, marketing managers, executives, shop owners, restaurant owners, project managers, or individuals managing personal work. They should not need to understand software development to use it.

## 3. Deliverables

The package contains seven detailed UX design documents, this index, a review-and-acceptance record, and two visual assets.

| # | File | Purpose | Status |
|---|---|---|---|
| 1 | [User Journey & Navigation](BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md) | First-use, daily-use, task, project, starter-kit, and backup/restore journeys; navigation map | Draft |
| 2 | [UX Wireframes](BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md) | Structural screen layouts for phone, tablet, and desktop | Draft |
| 3 | [Responsive UI Specification](BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md) | Layout rules, breakpoints, adaptive navigation, and device behavior | Draft |
| 4 | [UI Design System](BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md) | Proposed visual language, color roles, typography, spacing, components, and states | Draft |
| 5 | [Interaction Specification](BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md) | Behavior of task capture, editing, completion, projects, templates, and backup | Draft |
| 6 | [Accessibility & Usability](BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md) | Touch, keyboard, focus, contrast, forms, screen readers, and usability tests | Draft |
| 7 | [UX Acceptance Criteria](BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md) | Reviewable and testable UX acceptance criteria and scenarios | Draft |
| 8 | [UX Design Review & Acceptance Record](PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md) | Product Owner review gates, open decisions, and exit criteria | Open |

### Visual assets

- [Responsive My Day Wireframe — PNG](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.png)
- [Responsive My Day Wireframe — SVG source](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg)

The PNG is a visual review aid. The SVG is the editable source for this conceptual structural wireframe. Neither is a screenshot of an implemented application.

## 4. Relationship to the Product Definition

The [Product Definition v0.2.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md) is the current product authority. Product Definition v0.1.0 remains the historical baseline against which this UX package was originally authored.

This UX package must stay within these boundaries:

- One responsive product progressing through Beginner, Intermediate and Advanced learning levels.
- **Beginner:** no external database or sign-in; a small versioned workspace may use browser `localStorage`; no automatic cross-device sync; JSON export/restore provides manual portability.
- **Intermediate/Advanced:** Supabase PostgreSQL and Supabase Auth provide each user's personal workspace; RLS protects user-owned records.
- No team accounts, invitations, shared task workspaces or role-based team collaboration.
- Primary navigation remains My Day, My Tasks, Projects, More on compact screens; Templates and Settings & Backup may be exposed directly on wider screens.
- Role Starter Kits are editable starting configurations, not user roles, permissions, or separate application editions.
- Business Tasks are distinct from BVC Engineering Tasks and the five Phase 2 Core Specifications.
- No CRM, POS, inventory, accounting, ERP, or specialist business operations functionality.
- No AI chatbot or AI API integration inside the MVP application.

When a UX behavior conflicts with Product Definition v0.2.0, record the conflict in the canonical Product/UX Decision Register and obtain a Product Owner decision. Do not silently change product scope.

## 5. Important data-storage disclosure by learning level

Responsive layout and data persistence are separate concerns. Storage/access disclosure must match the selected learning level:

- **Beginner:** data is stored in the current browser profile using `localStorage`; it does not automatically sync to other devices and may be lost when browser data is cleared. JSON export/restore is the explicit portability mechanism.
- **Intermediate:** data is saved to the user's Supabase PostgreSQL workspace through Supabase Auth; RLS restricts access to that user's records.
- **Advanced:** the same authenticated personal workspace is managed through source control, migrations, CI and controlled deployment. This does not introduce team sharing.

The disclosure must be presented before important data entry and remain accessible from More → Settings & Backup.

## 6. Canonical decisions

Open product, interaction, visual and architecture choices are consolidated in the [Phase 3 Product/UX Decision Register](../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md). Existing document-specific IDs remain as aliases for traceability. No proposed default becomes approved by appearing in a design document.

## 7. Review order

Review in this order:

1. User Journey & Navigation — confirm the experience makes sense to non-technical users.
2. UX Wireframes — confirm the screen hierarchy and device layouts.
3. Responsive UI Specification — confirm the application adapts instead of shrinking a desktop layout.
4. UI Design System — confirm the visual tone is calm, clear, and practical.
5. Interaction Specification — confirm ordinary actions are predictable and reversible where appropriate.
6. Accessibility & Usability — confirm the experience is usable with touch, keyboard, text enlargement, and assistive technology.
7. UX Acceptance Criteria — confirm that the design can be tested objectively.
8. UX Design Review & Acceptance Record — record decisions, evidence, unresolved issues, and the final human review outcome.

## 8. Phase 3.1 exit gate

Phase 3.1 can be accepted when:

- All seven detailed UX design documents have been reviewed.
- Product Definition v0.2.0 is treated as current authority; v0.1.0 remains historical authoring context.
- Current FR/AC traceability is correct for v0.2.0; the Phase 2 Core Specifications remain unchanged.
- Phone, tablet, and desktop wireframes describe the same product and information architecture.
- Main user journeys and important error/empty states are covered.
- Responsive and accessibility expectations are testable.
- UX acceptance criteria trace back to the Product Definition and are measurable.
- Open decisions are resolved or explicitly deferred from implementation.
- The review record contains a human decision and supporting evidence.

**Status:** This package is a design proposal for review. It is not a claim that the UI has been implemented or tested on real devices.
