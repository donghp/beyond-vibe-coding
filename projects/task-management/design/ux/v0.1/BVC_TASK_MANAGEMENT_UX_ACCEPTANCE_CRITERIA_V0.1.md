# BVC Task Management — UX Acceptance Criteria v0.1.0

**Document ID:** BVC-TM-UX-007  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (UX authoring baseline dated 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (Product Owner approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN

---

## 1. Purpose

Define testable design acceptance criteria for Phase 3.1. These criteria establish what the UX design package must specify and what the later implemented MVP must demonstrate. They add testable UX-level detail to current Product Definition v0.2.0 FR-001–FR-025 and AC-001–AC-036. The original v0.1.0 numbering is not used as the current traceability authority.

## 2. Acceptance result terminology

- **PASS:** objective evidence shows the criterion is met.
- **FAIL:** evidence shows the criterion is not met.
- **NOT TESTED:** no evidence has been collected.
- **NOT APPLICABLE:** the criterion does not apply to the tested layout or capability, with a written reason.

A mockup alone can satisfy a design-documentation criterion, but it cannot prove that an implemented UI works on a real device.

Canonical open decisions and source aliases are maintained in the [Product/UX Decision Register](../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md). A proposed default is not approved unless that register records an explicit Product Owner decision.

## 3. UX acceptance criteria

### A. First-use and navigation

| ID | Criterion | Evidence |
|---|---|---|
| UX-001 | The first-use flow offers a blank workspace or a previewable starter kit. | Journey and wireframe review |
| UX-002 | Before important data entry, the app explains the selected learning level's actual persistence and access behavior: Beginner browser-profile storage/no automatic sync; Intermediate/Advanced signed-in personal Supabase workspace. | Level-specific onboarding copy and usability test |
| UX-003 | My Day is the landing destination after initial setup. | Navigation specification / implementation test |
| UX-004 | Compact navigation contains My Day, My Tasks, Projects, and More. | Phone wireframe and responsive test |
| UX-005 | Templates and Settings & Backup are reachable from More on compact screens. | Navigation test |
| UX-006 | Wider layouts may expose Templates and Settings & Backup directly without duplicate destinations. | Responsive wireframe review |

### B. My Day

The My Day layout must preserve the order established by current Product Definition v0.2.0, Section 7.2:

**Overdue → Due Today → Today's Focus → Upcoming → Add task.**

| ID | Criterion | Evidence |
|---|---|---|
| UX-007 | My Day identifies the current date/day clearly. | Screen review |
| UX-008 | Overdue tasks appear first, before Due Today, Today's Focus, and Upcoming, when present. | Date-rule test and phone/tablet/desktop wireframe review |
| UX-009 | Due Today appears after Overdue and before Today's Focus. User-selected Focus tasks due today remain in Due Today and carry a visible Focus marker. | Screen review and date-rule test |
| UX-010 | A task that is both overdue and Focus appears once in Overdue with a Focus marker. A task that is due today and Focus appears once in Due Today with a Focus marker. | Date-rule test |
| UX-011 | Today's Focus appears after Due Today and before Upcoming. A focused task that is neither overdue nor due today appears once in Today's Focus, including when it has a future due date. Upcoming does not repeat a task already displayed in an earlier section. | Screen review and date-rule test |
| UX-012 | Empty sections are not shown as large empty cards. | Empty-state test |
| UX-013 | Add task is easy to find without obscuring content or navigation. | Phone/tablet/desktop test |

### C. Task capture and editing

| ID | Criterion | Evidence |
|---|---|---|
| UX-014 | A user can create a task by entering only a title. | Task creation test |
| UX-015 | Optional task fields do not block quick capture. | Interaction test |
| UX-016 | Validation errors explain what to fix and preserve entered text. | Error-state test |
| UX-017 | Task detail can be opened and closed without losing the previous list/search/filter context. | Navigation state test |
| UX-018 | Completion and status change are available without drag-and-drop. | Keyboard/touch test |
| UX-019 | Delete is clearly destructive and requires confirmation or reliable undo. | Interaction test |

### D. Projects and templates

| ID | Criterion | Evidence |
|---|---|---|
| UX-020 | A task can exist without a project. | Product behavior test |
| UX-021 | Project detail clearly identifies the project and its tasks. | Wireframe and usability test |
| UX-022 | A starter kit can be previewed before application. | Interaction test |
| UX-023 | Applying a starter kit does not silently replace user-created tasks or projects. | Data integrity test |
| UX-024 | Reapplying a starter kit does not create uncontrolled duplicates. | Repeat-application test |

### E. Backup and local-data transparency

| ID | Criterion | Evidence |
|---|---|---|
| UX-025 | Settings & Backup clearly explains where data is stored for the selected learning level. | Level-specific UI review |
| UX-026 | Beginner is not presented as automatically syncing across devices; Intermediate/Advanced accurately explain the signed-in Supabase personal workspace without implying team sharing or backup. | Copy review and user test |
| UX-027 | Restore validates a backup before changing the current workspace. | Restore test |
| UX-028 | Restore replacing the current workspace requires explicit confirmation. | Restore interaction test |
| UX-029 | Invalid restore leaves the existing workspace unchanged. | Recovery test |

### F. Responsive behavior

| ID | Criterion | Evidence |
|---|---|---|
| UX-030 | Core phone screens are usable at 320, 360, and 390 CSS px. | Responsive test capture |
| UX-031 | Tablet layouts are usable in portrait and landscape at representative 768–1024 CSS px widths. | Device/browser test capture |
| UX-032 | Laptop/desktop layouts are usable at approximately 1280, 1440, and 1920 CSS px. | Browser test capture |
| UX-033 | Ordinary task lists and forms do not require essential horizontal page scrolling. | Responsive test |
| UX-034 | The layout reflows when browser width or orientation changes. | Resize/rotation test |
| UX-035 | Opening the on-screen keyboard does not hide the focused field or the only available Save action. | Mobile form test |
| UX-036 | Unsaved task input is preserved during responsive reflow/orientation change. | State preservation test |

### G. Accessibility and usability

| ID | Criterion | Evidence |
|---|---|---|
| UX-037 | All essential navigation and task actions are keyboard operable. | Keyboard-only test |
| UX-038 | Keyboard focus is visible and logical. | Keyboard review |
| UX-039 | Controls have labels and validation errors are available as text. | Accessibility tree / screen-reader test |
| UX-040 | Status and priority remain understandable without color alone. | Visual and screen-reader review |
| UX-041 | Primary touch targets aim for approximately 44 × 44 CSS px where practical. | Component measurement |
| UX-042 | Essential actions are not available only through hover, swipe, long-press, or drag. | Interaction audit |
| UX-043 | 200% browser zoom does not hide essential actions. | Zoom test |
| UX-044 | Reduced-motion preference is respected where motion is used. | Browser preference test |

## 4. Design package acceptance

Phase 3.1 design documents are accepted when:

- [ ] User journeys cover first use, quick capture, daily follow-through, search/edit, projects, starter kits, and backup/restore.
- [ ] Navigation is consistent with the Product Definition.
- [ ] My Day is specified for compact, medium, and expanded layouts using the same section order: Overdue, Due Today, Today's Focus, Upcoming.
- [ ] My Day wireframes show consistent task placement and do not duplicate a task across sections. A Focus task due today stays in Due Today with a Focus marker; a future-due Focus task stays in Today's Focus and is not repeated in Upcoming.
- [ ] My Tasks, Projects, Templates, Task Detail, and Settings & Backup have structural wireframes.
- [ ] Responsive rules define phone, tablet, laptop, and desktop behavior.
- [ ] Visual tokens and component guidance are internally consistent.
- [ ] Interactions define save, validation, status, delete, starter-kit application, export, and restore behavior.
- [ ] Accessibility and usability expectations are testable.
- [ ] Every open decision is either resolved by the Product Owner or explicitly deferred from implementation.
- [ ] Documents remain within current Product Definition v0.2.0; Product Definition v0.1.0 is retained only as historical authoring context.
- [ ] FR/AC traceability is rebuilt against v0.2.0 and no old numeric mapping is reused where meanings changed.
- [ ] The five Phase 2 Core Specifications and their schemas remain unchanged.

## 5. Traceability to Product Definition ACs

| UX criteria | Current Product Definition v0.2.0 mapping | Notes |
|---|---|---|
| UX-001 | FR-001, FR-015; AC-001, AC-010 | First-use workspace/Starter Kit choice; application must protect existing data |
| UX-002 | FR-017, FR-019, FR-024; AC-011, AC-016, AC-025, AC-026 | Level-specific persistence/access disclosure; authenticated workspace isolation applies to Intermediate/Advanced |
| UX-003–UX-006 | FR-001, FR-025; AC-001, AC-017–AC-021 | Navigation destinations and responsive exposure; UX navigation criteria add detail beyond product ACs |
| UX-007–UX-013 | FR-010; AC-006 | My Day order, placement, uniqueness and empty states |
| UX-014–UX-019 | FR-002–FR-006, FR-025; AC-002–AC-004 | Task capture, task actions, status/priority/due-date behavior and feedback |
| UX-020–UX-024 | FR-007–FR-008, FR-015–FR-016; AC-005, AC-010 | Projects, unassigned tasks, Starter Kit application and data protection |
| UX-025–UX-029 | FR-017–FR-018, FR-024; AC-011–AC-016 | Beginner browser persistence, export/restore and honest level-specific disclosure |
| UX-030–UX-036 | FR-025; AC-017–AC-021 | Responsive/reflow requirements; UX tests add specific viewport conditions |
| UX-037–UX-044 | FR-025; AC-022–AC-024 | Accessibility/usability details are additive UX criteria; product ACs do not claim WCAG certification |

Product Definition v0.2.0 FR-019–FR-023 and AC-027–AC-036 additionally cover Supabase/RLS, migration, Advanced engineering/deployment, synthetic data, tests, Preview/Production and CI/release evidence. The UX package does not verify those engineering controls.

## 6. Verification approach for later implementation

The implementation stage should turn each applicable criterion into one or more test cases. Use:

- Manual responsive checks on real iOS and Android browsers plus desktop browsers.
- Automated component and interaction tests where suitable.
- Keyboard-only and screen-reader checks.
- Date-boundary tests using local dates.
- Data integrity tests for starter-kit merge and backup/restore.
- Usability sessions with non-technical participants.

Do not mark a criterion PASS merely because a design mockup exists. Preserve test output, screenshots, and known limitations as evidence.

## 7. Release gate relationship

These are Phase 3.1 UX criteria. Current Product Definition v0.2.0 AC-001–AC-036 remain the overarching product acceptance baseline. The UX criteria are additional design/usability criteria and do not replace product or security acceptance. A UX design acceptance does not mean that the application is implemented or release-ready.
