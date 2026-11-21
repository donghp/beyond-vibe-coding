# BVC Practical Labs — Evidence and Screenshot Standard

**Document ID:** BVC-PL-EV-001  
**Version:** 1.0.0  
**Status:** Proposed common standard  
**Applies to:** Evidence and visual assets in `practical-labs/`

## 1. Purpose

Define how Practical Labs collect, describe, store and publish evidence so readers can distinguish an observed interface from a tested behavior or an unverified statement.

## 2. Evidence hierarchy

Use evidence appropriate to the claim:

| Evidence type | Suitable for | Not sufficient for |
|---|---|---|
| Authentic screenshot | Showing what was visible in a specific session | Proving hidden persistence, security or backend behavior |
| Source file | Showing the actual implementation text | Proving the runtime behavior works |
| Build output | Showing a build command completed | Proving every feature works |
| Automated test result | Supporting the behaviors covered by that test | Proving untested paths or user acceptance |
| Manual test record | Supporting the exact scenario performed | Proving unrelated scenarios |
| Owner confirmation | Recording an explicit owner decision or observation | Replacing technical evidence when technical proof is required |
| Production telemetry | Supporting observed behavior in the measured environment | Generalizing beyond its scope and collection period |

## 3. Evidence labels

- **OBSERVED** — directly visible in an authentic screenshot or inspected artifact.
- **VERIFIED** — a test or check was actually run and its result recorded.
- **OWNER-CONFIRMED** — the Human Owner explicitly confirmed the fact or decision.
- **UNKNOWN** — unavailable from current evidence.
- **NOT VERIFIED** — not tested or not independently established.
- **INFERENCE** — a reasoned interpretation, not direct observation.
- **PLANNED** — intended work that has not been completed.

Do not collapse these states into a single "done" label.

## 4. Screenshot rules

1. Capture real screenshots from the actual tool session.
2. Capture meaningful checkpoints, not every click.
3. Keep enough interface context for the reader to recognize the screen.
4. Use clear, descriptive filenames and numbered captions.
5. Inspect for credentials, account details, customer data and confidential content.
6. Preserve owner-supplied originals.
7. If a derivative is required, create a separate redacted or annotated file.
8. Never generate a mock interface and describe it as a real screenshot.
9. Do not embed a missing or placeholder image as if it were available.
10. Verify the image path in GitHub before marking the lesson Ready for Review.

## 5. Naming and placement

Recommended pattern:

```text
assets/screenshots/<phase>/<lesson-id>-<sequence>-<meaningful-name>.<ext>
```

Use lowercase kebab-case for new names where compatible with the project's existing naming convention. Keep legacy filenames stable unless a separately reviewed rename is necessary.

## 6. Figure caption pattern

```markdown
![Short factual description of the visible screen](relative/path/to/image.png)

*Figure A1-01. The actual screen observed at this checkpoint. The image shows [specific visible evidence]. It does not prove [relevant limitation].*
```

Captions should describe visible facts. Do not infer hidden state from a screenshot.

## 7. Evidence register fields

For each important evidence item, record:
- Evidence ID.
- Related lesson or task.
- Description.
- Evidence type.
- Source/owner.
- Capture or test date, if known.
- File path or stable reference.
- Status.
- Claim supported.
- Limitation.
- Privacy review status.

## 8. Publication gate

A lesson is not ready for evidence-based publication until:
- All embedded local paths resolve.
- Screenshots are authentic and readable.
- Secrets and private information are absent or safely redacted.
- Captions are accurate.
- Evidence labels match the strength of the claim.
- Missing verification is stated explicitly.

A screenshot is an exhibit, not a substitute for the underlying source data or test.
