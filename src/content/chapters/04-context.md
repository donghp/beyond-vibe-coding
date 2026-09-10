---
id: "04-context"
title: "AI không chỉ cần context. AI cần đúng context."
subtitle: "Nghệ thuật chọn lọc và cấu trúc context chính xác để loại bỏ ảo giác."
shortTitle: "AI không chỉ cần context. AI cần đúng context."
order: 4
description: "Mastering the art of context engineering to minimize hallucinations and maximize code precision."
readingTime: "8 min"
topics: ["context engineering", "prompt design", "token limit", "precision"]
hero: "images/chapter-04-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
updated: "2026-09-10"
version: "1.0.0"
---

## Context is King

The quality of the AI's output is directly proportional to the quality and relevance of the context provided. Feeding an AI too much irrelevant information is just as dangerous as feeding it too little; it leads to model confusion, diluted instructions, and code hallucinations.

> "A precise developer manages context like a scarce resource."

## Context Pruning Techniques

To achieve optimal outputs, practice active context pruning:
- **Modular Imports:** Keep imports clean and files focused on single responsibilities.
- **Strict Directory Layouts:** Keep file systems easy to traverse so AI tools find relevant types instantly.
- **Incremental Reads:** Always read existing file contents before generating edits. Do not assume.

## Structural Verification

Verify file structures against the workspace trees before executing complex commands to prevent path typos or importing modules that do not exist.
