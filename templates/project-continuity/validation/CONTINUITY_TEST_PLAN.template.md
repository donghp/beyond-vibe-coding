# Project Continuity Validation Plan — Template

1. **Cold-start:** a new AI session receives only repository and entry-point; no old chat history.
2. **Cross-model:** a different AI model reconstructs the same state and restrictions.
3. **Authority:** the AI distinguishes canonical main, approved contracts, open PRs and owner-reported claims.
4. **Stale state:** a newer commit is created; the AI detects and reconciles the old handoff.
5. **External systems:** the AI marks inaccessible/local/external state UNKNOWN instead of assuming.
6. **Interrupted work:** resume from a recorded checkpoint without duplicating or skipping work.
7. **Schema and manifests:** validate the chosen state format and resolve required source paths.

For each test record date, AI/model, source SHA, exact test input, result (PASS/PARTIAL/FAIL/NOT_RUN), evidence, deviations, evaluator and Human Owner acceptance.
