# Content State Model — Beyond Vibe Coding

## Purpose

Document the canonical dual-state model used by the **Beyond Vibe Coding — Living Book** publication system.

The model operates across TWO independent dimensions:
1. `publicationStatus`
2. `contentStatus`

---

## Publication Status

Allowed values:
- `unpublished`
- `published`
- `archived`

### Definitions:
- **`unpublished`**: The chapter is not publicly published.
- **`published`**: The chapter is publicly readable and discoverable.
- **`archived`**: The chapter has been withdrawn from active publication.

---

## Content Status

Allowed values:
- `draft`
- `partial`
- `complete`
- `final`

### Definitions:
- **`draft`**: Working manuscript / early development state.
- **`partial`**: Substantial content exists but the manuscript is not fully complete.
- **`complete`**: The manuscript content is complete.
- **`final`**: Editorially approved final manuscript.

---

## Key Principle

`publicationStatus` and `contentStatus` are independent.

Never infer one directly from the other.

Valid example:
```yaml
publicationStatus: published
contentStatus: partial
```
This is the current intended state of Golden Chapter 05.

---

## Validation Rule

The following combination is prohibited:
```yaml
publicationStatus: published
contentStatus: draft
```
A published chapter must not have `contentStatus = draft`.

---

## Default Safety

New chapter files default to:
```yaml
publicationStatus: unpublished
contentStatus: draft
```
This prevents accidental publication.

---

## Content Lifecycle

```
draft → partial → complete → final
```
A chapter may remain at any stage as required by the editorial workflow.

---

## Publication Lifecycle

```
unpublished → published → archived
```
The publication lifecycle is independent from the content lifecycle.

---

## Current Book State

### Golden Chapter 05:
- **`publicationStatus`**: `published`
- **`contentStatus`**: `partial`
- **Reason**: It is intentionally public as the primary content-rendering benchmark, but it is not yet the final literary manuscript.

### Chapters 00–04:
- **`publicationStatus`**: `unpublished`
- **`contentStatus`**: `draft`

### Chapters 06–08:
- **`publicationStatus`**: `unpublished`
- **`contentStatus`**: `draft`

---

## Important Rules

1. The existence of a Markdown file does not mean the chapter is published.
2. A successful build does not mean the content is final.
3. A published chapter does not automatically mean the manuscript is final.
4. Do not add additional status fields unless explicitly approved by project governance.
