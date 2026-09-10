---
id: "07-verification"
title: "Kiểm chứng, đánh giá và tin cậy"
subtitle: "Tin tưởng là tốt, nhưng compile và verify là tối thượng."
shortTitle: "Kiểm chứng, đánh giá và tin cậy"
order: 7
description: "Why automatic linting, compiling, and runtime testing are mandatory counterparts to AI-generated code."
readingTime: "7 min"
topics: ["testing", "compilation", "linting", "validation"]
hero: "images/chapter-07-hero.webp"
published: "2026-09-09"
publicationStatus: "unpublished"
contentStatus: "draft"
updated: "2026-09-09"
version: "1.0.0"
---

## The Trust Trap

AI models can output incredibly convincing code. They write comments, add docstrings, and structure functions with clean-looking syntax. However, they can also introduce subtle type mismatches, missing imports, or deprecated API calls that fail silently at runtime.

Relying on human eyes to catch these is a mistake. We need automated verification.

> "Never trust a generated file that has not successfully compiled and passed strict lint checks."

## The Verification Loop

Every change session should run through a fast, automated feedback cycle:
1. **Lint Verification:** Check syntax and import rules instantly (`npm run lint`).
2. **Build Verification:** Compile the full application to guarantee type-safety and bundle integrity (`npm run build`).
3. **Smoke Testing:** Load the visual output to confirm that design tokens, responsive states, and event handlers render perfectly.

## Standardizing Assertions

Make compiling and linting a blocking requirement before deploying to any public staging or production site. This prevents broken packages from ever reaching readers.
