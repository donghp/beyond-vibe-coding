# Architecture Decision Record: 0001-repository-native-architecture

```yaml
id: ADR-0001
title: Repository-Native Zero-Backend Architecture for ENERIX Carbon Demo
status: ACCEPTED
date: 2026-09-16
```

## Context
ENERIX Carbon requires a regulatory-aware Carbon & GHG engineering platform demo hosted on GitHub Pages (`https://donghp.github.io/beyond-vibe-coding/carbon/`).

## Decision
Adopt a repository-native data architecture:
- Markdown for human-readable legal & standard knowledge sources
- YAML for governance manifests and registries
- JSON for runtime structured master data
- Vanilla JS for deterministic engines and router
- Zero backend API requirement for demo deployment
