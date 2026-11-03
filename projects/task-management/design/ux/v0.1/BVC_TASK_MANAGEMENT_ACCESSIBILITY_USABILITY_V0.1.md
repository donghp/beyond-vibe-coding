# BVC Task Management — Accessibility & Usability v0.1.0

**Document ID:** BVC-TM-UX-006  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (UX authoring baseline dated 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (Product Owner approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN

---

## 1. Purpose

Make BVC Task Management usable by people with different devices, input methods, vision, motor abilities, reading preferences, and levels of technical experience.

This document defines design and test expectations. It is not a claim of WCAG conformance or accessibility certification. Conformance must be assessed against the implemented application.

## Storage and data transparency by learning level

Accessibility includes making data location and account behavior understandable to non-technical users:

- **Beginner:** explain that data is stored in the current browser profile, does not automatically sync to other devices, and may be lost if browser data is cleared; make JSON export/restore discoverable.
- **Intermediate/Advanced:** explain that the user signs in and accesses their own Supabase-backed workspace; explain that RLS protects user records and that this is not team sharing.
- Use text labels and accessible status feedback. Do not rely on color, icons, or a generic "saved" message to communicate cloud backup or synchronization.
- Keep this disclosure available from Settings & Backup and ensure assistive technologies can read it in logical order.

## 2. Working accessibility target

Use WCAG 2.2 Level AA as the working design and review target where applicable. The Product Definition already requires readable contrast, keyboard operation, visible focus, enlarged text, and alternatives to drag-only actions. A formal conformance claim must wait until the implementation is tested and audited.

## 3. Touch and pointer targets

- Aim for primary touch targets of approximately 44 × 44 CSS px or larger where practical, as required by the Product Definition's design direction.
- Maintain sufficient spacing between adjacent controls.
- Do not place destructive actions immediately next to common completion/save controls without separation.
- Do not rely on hover to reveal essential actions.
- Do not require swipe or long-press to perform essential functions.
- Provide visible text labels or accessible names for icon buttons.

## 4. Keyboard access

All essential navigation and task operations must be usable with a keyboard:

- Navigate all destinations.
- Add, edit, save, and cancel a task.
- Change task status and priority.
- Set or clear due dates.
- Search and filter tasks.
- Open and close task detail.
- Preview and apply a starter kit.
- Export and restore a backup.
- Operate dialogs and sheets.

Requirements:

- Logical tab order.
- Clearly visible focus indicator.
- No keyboard trap.
- Focus moves into a modal when opened and returns to the trigger when closed.
- Escape behavior must not silently discard unsaved information.
- Every drag-and-drop operation has an alternative status control.

## 5. Screen readers and semantic structure

- Use semantic headings in a logical hierarchy.
- Use buttons for actions and links for navigation.
- Associate labels with form fields.
- Announce validation errors in text and associate them with the relevant field.
- Announce meaningful changes such as task saved, task completed, and restore result using an appropriate live status region.
- Ensure checkbox state and selected navigation state are programmatically available.
- Give icon-only controls accessible names.
- Hide purely decorative icons from assistive technology where appropriate.
- Task title and status must be understandable without visual color cues.

## 6. Contrast and color meaning

- Candidate design tokens must be checked for text and component contrast during implementation.
- Do not use red/green or any color pair as the sole indicator of status.
- Show text labels for status and priority.
- Ensure selected navigation uses more than a color change (e.g. shape, weight, background, or indicator).
- Error, warning, success, and informational states include text or an accessible label.

## 7. Text, zoom, and reflow

- Support browser zoom and text enlargement without hiding essential actions.
- Test at 200% zoom and compact viewport widths.
- Avoid fixed-height containers that clip wrapped task names or descriptions.
- Use readable line lengths and body text sizes.
- Do not encode important instructions in images only.
- Allow users to understand an unfamiliar abbreviation through clear labels or helper text.

## 8. Forms and validation

- Mark required fields clearly; in v0.1 the task title is the only required field when creating a basic task.
- Use persistent labels rather than relying only on placeholder text.
- Explain validation errors in plain language.
- Move focus to the first invalid field when appropriate.
- Preserve user input after validation or storage errors.
- Do not rely on color alone to identify an invalid field.
- Ensure date pickers and dropdowns work with touch, mouse, and keyboard.

## 9. Motion and sensory comfort

- Respect reduced-motion preferences.
- Avoid flashing, unnecessary movement, or animated transitions that slow common tasks.
- Motion must not communicate information that is unavailable in text.
- Use sound only if separately justified; sound is not required for core interactions.

## 10. Plain language and beginner usability

Prefer language that a person outside IT understands:

| Prefer | Avoid in primary UI |
|---|---|
| Add task | Create work item entity |
| Due date | Temporal constraint |
| Priority | Execution rank |
| Project | Work package identifier |
| Save backup | Serialize workspace |
| Restore backup | Import persistence snapshot |
| Stored on this device | Browser origin storage |

Technical detail belongs in developer documentation, not the everyday user's main interface.

## 11. Usability testing plan

Conduct a small formative usability test before MVP release. The proposed test participants should include people who do not work in software development, with a mix of everyday work roles where possible. This is a design validation activity, not a statistical claim about the market.

### Test tasks

1. Open the app and understand where the user's data will be stored.
2. Add a task using only its title.
3. Set a due date and priority.
4. Mark a task as today's focus.
5. Mark a task Done.
6. Find a task using search or filters.
7. Choose and preview a relevant starter kit.
8. Find the backup and restore controls.

### Observe

- Can the participant identify the next action without explanation?
- Does the participant confuse a task with a project?
- Does the participant understand that local data does not automatically sync?
- Do they notice the result of saving/completing a task?
- Do they recover from a mistake without losing data?
- Can they use the phone layout with one hand where practical?

### Proposed formative success signal

As an initial qualitative target, most participants should complete the first-task and mark-done tasks without moderator help after the brief local-data notice. Record confusion points and revise the UX rather than teaching participants to work around a poor interface.

Do not claim usability has passed until actual participant sessions have occurred and findings are recorded.

## 12. Accessibility test checklist

- [ ] All essential flows operate with keyboard only.
- [ ] Focus is visible and not obscured.
- [ ] Screen-reader labels describe task actions and current states.
- [ ] Forms have persistent labels and text errors.
- [ ] Status and priority do not rely on color alone.
- [ ] Touch targets are comfortable and spaced.
- [ ] No essential action requires drag, hover, swipe, or long-press.
- [ ] 200% zoom does not hide core actions.
- [ ] Content reflows at narrow widths without essential horizontal scrolling.
- [ ] Reduced-motion setting is respected.
- [ ] Contrast of text, controls, and focus indicators is measured against the selected accessibility target.

## 13. References

- W3C, Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C, WCAG 2.2 Success Criterion 2.5.8 — Target Size (Minimum): https://www.w3.org/TR/WCAG22/#target-size-minimum
- W3C, WCAG 2.2 Success Criterion 2.5.7 — Dragging Movements: https://www.w3.org/TR/WCAG22/#dragging-movements

These references guide design and evaluation. Their presence does not establish that an unimplemented product conforms.
