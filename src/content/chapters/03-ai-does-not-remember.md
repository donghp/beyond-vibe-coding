---
id: "03-ai-does-not-remember"
title: "AI không nhớ project của bạn"
subtitle: "Bản chất stateless và ảo tưởng về một trí tuệ nhân tạo có ký ức xuyên suốt."
shortTitle: "AI không nhớ project của bạn"
order: 3
description: "Why thinking of AI as a persistent assistant is an architectural mistake, and how to design around statelessness."
readingTime: "6 min"
topics: ["context windows", "statelessness", "memory", "documentation"]
hero: "images/chapter-03-hero.webp"
published: "2026-09-10"
publicationStatus: "published"
contentStatus: "complete"
updated: "2026-09-10"
version: "1.0.0"
---

## The Illusion of Memory

An AI model operates inside a discrete context window. When that window resets, or when a new session starts, the model has absolutely no memory of previous decisions, refactoring steps, or spoken agreements.

This statelessness is often masked by chat interfaces, but in development, it is a critical variable we must manage.

> "If a design decision is not written in the codebase or project files, it does not exist to the AI."

## Designing for Short Contexts

To work effectively with stateless agents, we must build systems that carry their own context. This is achieved by:
- Creating small, modular, self-documenting files
- Writing explicit project rules in standard places (like `.env.example`, `tsconfig.json`)
- Keeping code clean and free of dead structures that clutter the context window

## Explicit Documentation over Verbal Agreements

Never tell an AI to "remember this for later" in a chat conversation. Instead, write down the instruction directly in the project configuration or custom markdown instructions.
