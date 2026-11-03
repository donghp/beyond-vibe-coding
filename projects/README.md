# Practical Projects — Build & Learn

**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides

This directory contains independent practical projects that help readers use AI to build useful things for everyday life and work.

> **Start simple. Build something useful. Keep learning.**

## How projects are organized

Each project has its own folder and owns its product definition, design, application source, project-specific tests, examples, and reusable starter kits.

Practical Labs live separately in the repository-level `/practical-labs/` directory. Labs teach readers how to build or extend a project; they do not duplicate the project's source code.

## Learning levels

| Level | Intended audience | Learning focus |
|---|---|---|
| **Beginner** | People starting with AI-assisted building, including non-programmers | Build a small useful tool, follow clear instructions, and learn the basic workflow. |
| **Intermediate** | Readers comfortable with the first project and basic software concepts | Build richer applications with structured data, workflows, validation, and tests. |
| **Advanced** | Experienced developers, technical leads, architects, and AI engineers | Build integrated systems and apply stronger architecture, security, governance, and verification practices. |

A level describes the intended learning entry point. It does not claim that every feature inside a project is equally easy or that technical depth is restricted to one audience.

## Project catalog

| Project | Level | What you build | Status |
|---|---|---|---|
| [01 — BVC Task Management](task-management/README.md) | Beginner-friendly | A simple daily work manager that can be adapted to personal and professional roles. | Product baseline frozen; UX design in review; application not started |

Additional projects will be added when their learning outcomes, product scope, and practical value are defined. Do not create empty project folders merely to reserve names.

## Standard project structure

A project may use the following structure as its needs justify it:

```text
project-name/
├── README.md
├── product/
│   ├── product-definition.md
│   ├── user-stories.md
│   └── acceptance-criteria.md
├── design/
│   ├── user-experience/
│   ├── architecture/
│   └── data-model/
├── application/
│   ├── app/
│   └── tests/
├── starter-kits/
└── examples/
```

The structure is a reusable convention, not a requirement to create every directory for every project. Keep project-specific materials inside the project. Put resources in the repository root only when they are genuinely shared across multiple projects.

## Relationship to Practical Labs

- `/projects/` owns the products and their project-specific artifacts.
- `/practical-labs/` owns step-by-step learning activities.
- `/templates/` owns reusable templates shared across projects.
- `/validators/` owns reusable validation tools.
- `/tests/` at repository root tests shared BVC tools and framework utilities; each project owns its application tests under that project.

Do not copy an entire application into every Lab. A Lab should reference the relevant project files and describe the learning task, expected result, and verification steps.

## Engineering and safety boundaries

Projects that use BVC Engineering Task Contracts must preserve the distinction between:

- A **Business Task** inside an application, which represents a person's everyday work.
- An **Engineering Task**, which authorizes a bounded change to project artifacts by a human or AI executor.

The five frozen BVC Core Specifications remain in `/specifications/v0.1/`. Individual projects must not silently redefine or replace them.

Public examples must use synthetic data and must not expose secrets, personal information, customer data, or proprietary source material.
