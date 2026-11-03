# Project 01 — BVC Task Management

**Program:** BEYOND VIBE CODING — Build & Learn  
**Learning level:** Beginner-friendly, with deeper Developer and Engineering Leadership extensions  
**Product:** BVC Task Management — A Simple Daily Work Manager  
**Status:** Product Definition v0.1.0 frozen; Phase 3.1 UX design in review; application implementation not started

> **Build something useful. Use it every day. Learn by doing.**

## 1. What you will build

BVC Task Management is a simple personal work-management application for people who want to capture tasks, decide what matters, organize work, and follow through every day.

The same application is designed to support different everyday contexts, including:

- Personal and independent work.
- Sales team leads.
- Marketing managers.
- Executives and business owners.
- Shop owners.
- Restaurant owners.
- Project managers.

It is one application with editable Role Starter Kits, not seven separate products. It is not intended to replace specialist CRM, POS, inventory, accounting, HR, restaurant, or enterprise project-management systems.

## 2. Who can learn from this project

| Audience | What to practice |
|---|---|
| Beginner / Vibe Coder | Describe a real need, guide AI step by step, build a small feature, and check the result. |
| Independent Builder | Adapt the application to personal routines and daily work. |
| Developer | Understand the UI, data model, application structure, validation, and tests. |
| Tech Lead / Engineering Manager | Break work into bounded tasks and review changes and evidence. |
| CTO / Architect | Evaluate architecture, security, data ownership, and design trade-offs. |
| AI Engineer | Apply the BVC Engineering Task Contract and the five Core Specifications to AI-assisted code changes. |

## 3. Product baseline

The authoritative product scope is documented in:

- [BVC Task Management Product Definition v0.1.0](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)

This is the frozen MVP product baseline. UX and architecture documents must remain consistent with it. A change to product scope requires a reviewed revision; it must not be introduced silently through implementation.

## 4. Project documentation

### Product

- [Product Definition v0.1.0](product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)

### Design

- [UX & Product Design v0.1.0 — index](design/ux/v0.1/README.md)
- [User Journey & Navigation](design/ux/v0.1/BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md)
- [Responsive Wireframes](design/ux/v0.1/BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md)
- [Responsive UI Specification](design/ux/v0.1/BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md)
- [UI Design System](design/ux/v0.1/BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md)
- [Interaction Specification](design/ux/v0.1/BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md)
- [Accessibility & Usability](design/ux/v0.1/BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md)
- [UX Acceptance Criteria](design/ux/v0.1/BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md)
- [Phase 3.1 UX Review & Acceptance Record](design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md)

### Application, starter kits, and examples

These areas will be added when their artifacts are ready and reviewed. They are not represented as implemented yet.

```text
application/       # Planned: responsive web application and project-specific tests
starter-kits/      # Planned: editable role-based sample configurations
examples/          # Planned: synthetic example data and walkthroughs
```

## 5. MVP experience at a glance

The initial product uses a small set of everyday areas:

- **My Day:** what needs attention today, overdue work, and upcoming tasks.
- **My Tasks:** all tasks, with search, filters, sorting, and list/Kanban views.
- **Projects:** optional groups for related work.
- **More:** templates, settings, backup, restore, and help; wider screens may expose some entries directly.

The interface is planned as one responsive web application for iPhone, Android, tablets, laptops, and desktop browsers.

## 6. Important data limitation

The MVP is local-first and single-user. Each browser/device has its own local workspace. Data does not automatically synchronize between an iPhone, tablet, laptop, or PC. A user can move a workspace through an explicit backup and restore process.

Cloud synchronization, accounts, shared workspaces, and multi-user collaboration are future scope, not MVP capabilities.

## 7. Relationship to BVC engineering specifications

Everyday Business Tasks in this application are separate from Engineering Tasks assigned to AI to modify project files.

The five frozen BVC Core Specifications remain in `/specifications/v0.1/`:

1. Task Contract.
2. Context Manifest.
3. Project State.
4. Change Record.
5. Verification Evidence.

They govern suitable engineering work. They do not define or replace the application's Business Task data model.

## 8. Planned learning progression

1. Start the project and understand the user need.
2. Create and manage a task.
3. Organize tasks into projects/work areas.
4. Use a Role Starter Kit.
5. Build and improve responsive screens.
6. Learn to give AI bounded engineering tasks.
7. Inspect actual changes and verify the result.
8. Extend the application within the approved product scope.

The step-by-step lessons will live under the repository-level `/practical-labs/` directory and link back to this project. They will not duplicate the application source code.

## 9. Current status and next step

**Current status:** Product baseline v0.1.0 is frozen. Phase 3.1 UX documents are Draft and awaiting Product Owner review. No application code has been implemented.

**Next:** Review and accept the UX design package. Then define application architecture, local data storage, data model, backup/restore, security, and test strategy in Phase 3.2.
