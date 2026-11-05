# BVC Project Continuity Template

**Template version:** 0.1.0\
**Status:** PILOT STARTER — not a frozen universal standard\
**Origin:** Extracted as a generic design from the BVCTM Reference Project package before BVCTM cold-start/cross-model validation is complete.

## Purpose

Use this folder as a starting point for a new, independent BVC project. Do not copy BVCTM-specific business rules, Prompt IDs, GAIS details, task names, decisions, or state into another domain without adaptation.

The template provides a common continuity interface while allowing each project's continuity structure, registers, schemas, and recovery steps to reflect its own domain.

## Files

- `00_BVC_PROJECT_CONTINUITY.template.md`: provider-independent entry point for any authorized AI executor.
- `PROJECT_CONTINUITY_PROFILE.template.yaml`: project-specific profile to be completed.
- `PROJECT_STATE.template.json`: starter record conforming structurally to BVC Project State Draft/Experimental v0.1.0; replace all sentinel values.
- `SOURCE_MANIFEST.template.csv`: source navigation template.
- `HANDOFF_LOG.template.md`: concise handoff format.
- `registers/REGISTER_DESIGN_GUIDE.md`: choose only registers needed by the domain.
- `evidence/EVIDENCE_INDEX.template.yaml`: evidence classification starter.
- `validation/CONTINUITY_TEST_PLAN.template.md`: cold-start and handoff tests.

## Adaptation rules

1. Identify project lifecycle, domain, owners, and authority before selecting files.
2. Read the BVC Global Continuity Protocol and relevant BVC Core Specifications.
3. Select the appropriate Project State specification/schema. BVC Project State v0.1.0 is Draft/Experimental; it is not automatically mandatory for every domain.
4. Define the project's canonical sources and precedence. Do not duplicate Product Definitions, decision registers, contracts, technical baselines, or evidence.
5. Add domain-specific registers only when needed (for example equipment, financial assumptions, manuscript chapters, prompts, or releases).
6. Register external systems and local workspaces without storing secrets.
7. Run a new-session cold-start test before calling the project continuity operational.
8. Record failed/partial tests and revise the project design.

## What not to do

- Do not create the same six files automatically for every project if they do not fit.
- Do not make a Project State file the source of authority for decisions owned elsewhere.
- Do not store conversation transcripts as the continuity system.
- Do not label a project state verified when local or external facts have not been checked.
- Do not publish this starter as BVC Continuity Standard v1.0 until the BVCTM Reference Project has passed the defined validation gates and BVC governance approves extraction.
