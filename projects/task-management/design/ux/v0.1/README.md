# BVC Task Management — UX & Product Design v0.1.0

**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.1 — UX & Product Design  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** [BVC Task Management Product Definition v0.1.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md) — BVC-TM-PD-001

---

## 1. Purpose

This folder contains the UX design baseline for BVC Task Management. It translates the frozen Product Definition v0.1.0 into user journeys, navigation rules, responsive wireframes, visual design guidance, interaction behavior, accessibility expectations, and UX acceptance criteria.

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

The [Product Definition v0.1.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md) remains authoritative for product scope. This UX package must stay within these boundaries:

- One responsive browser-based application.
- Local-first, single-user MVP.
- No login, accounts, shared workspace, cloud database, or automatic cross-device synchronization.
- Primary navigation: My Day, My Tasks, Projects, More on compact screens; Templates and Settings & Backup may be exposed directly on wider screens.
- Role Starter Kits are editable starting configurations, not user roles, permissions, or separate application editions.
- Business Tasks are distinct from BVC Engineering Tasks and the five frozen Core Specifications.
- No CRM, POS, inventory, accounting, ERP, or specialist business operations functionality.
- No AI chatbot or AI API integration inside the MVP application.

When a UX decision appears to conflict with the Product Definition, stop and resolve the conflict through a reviewed Product Definition change. Do not silently reinterpret the parent baseline.

## 5. Important local-data disclosure

Responsive layout across phones, tablets, laptops, and PCs does not mean that data synchronizes between devices. The same application can display on every supported device, but each browser/device has its own local workspace in v0.1. Users move data between devices through explicit backup and restore.

This must be explained before the user begins adding important work and remain accessible from More → Settings & Backup.

## 6. Review order

Review in this order:

1. User Journey & Navigation — confirm the experience makes sense to non-technical users.
2. UX Wireframes — confirm the screen hierarchy and device layouts.
3. Responsive UI Specification — confirm the application adapts instead of shrinking a desktop layout.
4. UI Design System — confirm the visual tone is calm, clear, and practical.
5. Interaction Specification — confirm ordinary actions are predictable and reversible where appropriate.
6. Accessibility & Usability — confirm the experience is usable with touch, keyboard, text enlargement, and assistive technology.
7. UX Acceptance Criteria — confirm that the design can be tested objectively.
8. UX Design Review & Acceptance Record — record decisions, evidence, unresolved issues, and the final human review outcome.

## 7. Phase 3.1 exit gate

Phase 3.1 can be accepted when:

- All seven detailed UX design documents have been reviewed.
- Product Definition v0.1.0 remains unchanged or any required product change has been separately approved.
- Phone, tablet, and desktop wireframes describe the same product and information architecture.
- Main user journeys and important error/empty states are covered.
- Responsive and accessibility expectations are testable.
- UX acceptance criteria trace back to the Product Definition and are measurable.
- Open decisions are resolved or explicitly deferred from implementation.
- The review record contains a human decision and supporting evidence.

**Status:** This package is a design proposal for review. It is not a claim that the UI has been implemented or tested on real devices.
