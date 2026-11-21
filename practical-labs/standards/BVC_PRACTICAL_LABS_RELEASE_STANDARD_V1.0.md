# BVC Practical Labs — Release and Review Standard

**Document ID:** BVC-PL-REL-001  
**Version:** 1.0.0  
**Status:** Proposed common standard  
**Applies to:** Publishing and maintaining content in `practical-labs/`

## 1. Purpose

Provide a repeatable review process for publishing practical lessons without confusing editorial completeness with product implementation, technical verification or owner acceptance.

## 2. Readiness states

| State | Meaning |
|---|---|
| DRAFT | The material is being written; core review is incomplete |
| EVIDENCE REQUIRED | The lesson depends on real screenshots, source inspection or tests that are not yet available |
| READY FOR REVIEW | Content and available evidence have been assembled and checked; Human Owner review is pending |
| ACCEPTED | The Human Owner explicitly accepts the lesson/version |
| SUPERSEDED | A newer approved version replaces this version |
| WITHDRAWN | The lesson is no longer intended for use |

Do not use ACCEPTED merely because a pull request was merged. Repository merge and lesson acceptance are related but distinct decisions.

## 3. Review dimensions

Review each lesson for:
1. Learner outcome and beginner usability.
2. Accuracy of current UI instructions.
3. Source-of-truth alignment.
4. Prompt completeness and readiness.
5. Scope and authorization.
6. Verification criteria.
7. Evidence quality and privacy.
8. Relative links and navigation.
9. Accessibility and plain language.
10. Explicit limitations and unresolved dependencies.

## 4. Validation checklist

- [ ] Markdown headings and code fences are valid.
- [ ] Internal relative links resolve.
- [ ] Referenced screenshots exist on the target branch.
- [ ] YAML/JSON files parse.
- [ ] JSON Schema examples validate where tooling is available.
- [ ] Prompt IDs are unique in the relevant project.
- [ ] Lesson IDs and folder slugs match the curriculum.
- [ ] Previous/Next/Index navigation is correct.
- [ ] Product decisions and contracts are not silently altered.
- [ ] Every status claim is supported.
- [ ] No secrets or personal data are exposed.
- [ ] Diff remains inside the authorized directory.

## 5. Repository workflow

1. Create a dedicated branch from current `main`.
2. Limit all changes to `practical-labs/`.
3. Inspect the diff and run relevant content checks.
4. Submit a Pull Request with purpose, changed files, evidence status, validation and limitations.
5. Human Owner reviews the change.
6. Human Owner decides whether and when to merge.
7. Update lesson acceptance status only after explicit acceptance.

Automatic merge is not permitted by this standard.

## 6. Change management

Prefer additive, versioned changes. Preserve historical versions that explain prior decisions or accepted limitations. Do not silently overwrite canonical evidence or change product state from a lesson-editing PR.

When a lesson changes materially, update its version, change note, status register and affected navigation.
