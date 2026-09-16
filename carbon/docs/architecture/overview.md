# ENERIX Carbon Architecture Overview

```yaml
version: 1.0.0
status: BASELINE
as_of: 2026-09-16
```

## System Topology

ENERIX Carbon operates in **Repository-Native / Zero-Backend** mode.
All regulatory knowledge, structured data, engine rules, and UI renderers are packaged directly in the repository.

```text
Browser Client
      ↓
HTML Shell (/carbon/index.html)
      ↓
Single-Page App (/carbon/app/app.js)
      ↓
State Store & Data Provider (/carbon/app/state-store.js)
      ↓
Deterministic Engine Stack (/carbon/engine/*)
      ├── Calculation Engine
      ├── Regulatory Engine
      ├── Validation Engine
      └── Provenance Engine
      ↓
Repository Data Layer (/carbon/data/* & /carbon/knowledge/*)
```
