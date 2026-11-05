# BVC Phase 3.1 — UX Design Review & Acceptance Record

**Program:** BEYOND VIBE CODING — Build & Learn  
**Project:** BVC Task Management — A Simple Daily Work Manager  
**Phase:** 3.1 — UX & Product Design  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (UX authoring baseline dated 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (Product Owner approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN
**Prepared:** 2026-11-03

---

## 1. Purpose

Use this record to complete the still-open Phase 3.1 UX review and acceptance gate. The UX package was originally authored against Product Definition v0.1.0; Product Definition v0.2.0 is now the current product authority, and this record evaluates compatibility without claiming that the design was originally created for v0.2.0. Phase 3.2 Architecture Design Baseline has already been accepted; formal UX acceptance remains OPEN and must be resolved for the dependent Phase 3.3 implementation/release scope. This is a review checklist, not a claim that the UX has been tested on real devices.

## 2. What Phase 3.1 is supposed to deliver

Phase 3.1 answers: **How should the product look, how should a person use it, and how should the same experience adapt to different screens?**

It must define:

- What a first-time user sees and does.
- How the user moves between My Day, My Tasks, Projects, and More.
- What each important screen contains.
- How the layout changes between phone, tablet, laptop, and desktop.
- How buttons, forms, task rows, sheets, dialogs, filters, and feedback behave.
- How the interface remains understandable with touch, keyboard, text enlargement, and assistive technology.
- How the design will be tested objectively.

Phase 3.1 does **not** build the application or choose its final database/framework. Those belong to Phase 3.2 and Phase 3.3, respectively.

## 3. Required files

The following must exist under `projects/task-management/design/ux/v0.1/`:

- [ ] `README.md`
- [ ] `BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md`
- [ ] `BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md`
- [ ] `assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.png`
- [ ] `assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg`
- [ ] `PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md` (this review record)

## 4. Review gates

| Gate | Review question | Evidence | Decision |
|---|---|---|---|
| G1 — User journey | Can a non-technical person understand first use, add a task, complete it, find it, and back up data? | Journey review / usability notes | OPEN |
| G2 — Navigation | Does navigation match current Product Definition v0.2.0 §7.1 on compact, medium, and expanded layouts? | Navigation map and wireframes | OPEN |
| G3 — Screen layouts | Are My Day, My Tasks, Projects, Task Detail, Templates, and Settings & Backup sufficiently described? | Wireframes | OPEN |
| G4 — Responsive behavior | Does one application adapt without merely shrinking desktop UI? | Responsive specification and viewport matrix | OPEN |
| G5 — Visual system | Are visual tokens consistent, readable, restrained, and accessible? | Design system and contrast review | OPEN |
| G6 — Interactions | Are save, validation, completion, deletion, project removal, kit application, export, and restore predictable? | Interaction specification | OPEN |
| G7 — Accessibility | Are touch, keyboard, focus, labels, screen readers, text zoom, and reduced motion covered? | Accessibility document | OPEN |
| G8 — Testability | Can each UX criterion be verified with concrete evidence? | UX acceptance criteria | OPEN |
| G9 — Baseline integrity | Is Product Definition v0.2.0 the current product authority while v0.1.0 remains historical authoring context, and are the five Core Specifications unchanged? | Baseline and PR diff review | OPEN |
| G10 — Level-specific data transparency | Do Beginner, Intermediate and Advanced wireframes disclose their actual storage, identity, backup and synchronization behavior? | UX copy review against v0.2.0 FR-017–FR-024 / AC-011–AC-026 | OPEN |
| G11 — Requirement traceability | Have UX criteria and wireframe FR/AC references been remapped to the current v0.2.0 identifiers without reusing changed v0.1 meanings? | Traceability matrix review | OPEN |

## 5. Decisions requiring Product Owner review

| ID | Question | Proposed default | Status |
|---|---|---|---|
| DEC-UX-001 | How far ahead does My Day show Upcoming? | Next 7 calendar days | OPEN |
| DEC-UX-002 | Does Today's Focus reset daily? | Marker scoped to current local date | OPEN |
| DEC-UX-003 | What happens to tasks when a project is removed? | Preserve tasks; detach to No project | OPEN |
| DEC-UX-004 | What happens when a starter kit is applied twice? | Skip recognized items; show summary | OPEN |
| DEC-UX-005 | When does local storage disclosure appear? | Before first meaningful data entry | OPEN |
| DEC-UX-006 | What visual theme ships first? | Calm light theme; dark theme deferred | OPEN |
| DEC-UX-007 | Is the proposed blue primary palette acceptable? | Review candidate tokens and contrast in rendered UI | OPEN |
| DEC-UX-008 | What is the minimum browser support matrix? | Confirm in Phase 3.2 test plan based on real target users | OPEN |

These are not approved product changes until the Product Owner records a decision. The consolidated register, including INT-OPEN, DS-OPEN, DATA and Auth aliases, is maintained in the [Phase 3 Product/UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md).

## 6. Phase 3.1 acceptance checklist

- [ ] All required files are present on the Phase 3.1 branch.
- [ ] All relative Markdown links resolve.
- [ ] User journeys cover first use, daily work, task capture, task completion, search/filter, project, starter kit, backup, and restore.
- [ ] Navigation is consistent across phone, tablet, and desktop.
- [ ] Wireframes show the same product and information architecture across devices.
- [ ] Responsive test widths match the Product Definition starting ranges.
- [ ] Visual design tokens have been reviewed; measured contrast applies to actual pairings.
- [ ] Important interactions have success, error, empty, and confirmation behaviors.
- [ ] Accessibility expectations are testable; no unsupported conformance claim is made.
- [ ] Open decisions are resolved or explicitly deferred from implementation.
- [ ] Product Definition v0.2.0 is the current authority; v0.1.0 is retained as historical authoring context.
- [ ] Current FR/AC traceability maps to v0.2.0 identifiers and no superseded numbering is used as current authority.
- [ ] Beginner/Intermediate/Advanced storage and identity disclosures are distinct and accurate.
- [ ] Five Phase 2 Core Specifications and their schemas are unchanged.
- [ ] Human review decision is recorded.

## 7. What PASS means at this phase

A Phase 3.1 PASS means the **design package** is complete, coherent, within product scope, and sufficiently testable to guide architecture and implementation.

It does not mean:

- The application has been implemented.
- The design has been tested on real iPhone or Android hardware.
- WCAG conformance has been certified.
- The app has been performance-tested.
- Data storage, backup, or restore works in a running application.

Those require the implementation and evidence produced in later phases.

## 8. Handoff to Phase 3.3 — Implementation & Verification

Phase 3.2 Application Architecture & Technical Design has been accepted as a design baseline. The next work is Phase 3.3, not another Phase 3.2 review. The UX acceptance record remains an independent OPEN gate; implementation must not treat an unresolved UX decision as approved merely because a wireframe shows an example.

Before a dependent implementation task begins:

1. Resolve or explicitly defer the relevant Product/UX Decision Register items.
2. Confirm the task uses the current v0.2.0 product requirements and remapped UX traceability.
3. Inspect the actual blank GAIS application's generated scaffold; do not assume a framework or build system.
4. Approve a bounded Phase 3.3 Task Contract with exact scope, acceptance and verification evidence.
5. Keep runtime, persistence, responsive, accessibility and security claims open until tested and evidenced.

---

**Review outcome:** OPEN — awaiting Product Owner decisions and review evidence.

**Repository location:** `projects/task-management/design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md`.
