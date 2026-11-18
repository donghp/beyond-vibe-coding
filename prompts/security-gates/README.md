# BVC Security Gates — Prompt & Verification Pack

This folder contains copy-ready resources that operationalize [BVC-SEC-STD-001](../../standards/SECURITY_ARCHITECTURE_GATES.md).

| File | Purpose | When to use |
|---|---|---|
| [00_security_architecture_design_prompt.md](00_security_architecture_design_prompt.md) | Security-by-Prompt-Design architecture prompt | Before generating security-sensitive client or backend code |
| [01_threat_modeling_prompt.md](01_threat_modeling_prompt.md) | Detailed threat-model analysis prompt | When a feature/system needs a standalone threat model |
| [02_server_gate_implementation.md](02_server_gate_implementation.md) | Server-side enforcement implementation prompt | After threat model review and explicit implementation authorization |
| [tamper_test_checklist.md](tamper_test_checklist.md) | Authorized client-tampering and server-enforcement checklist | During verification in an owned/authorized test environment |

## Required sequence

1. **Analyze first:** Run Prompt 00 or Prompt 01. Do not authorize implementation in the analysis prompt.
2. **Review and approve:** Human owner reviews trust boundaries, risks, requirements, and acceptance evidence.
3. **Implement within contract:** Run Prompt 02 only with an approved scope and implementation authorization.
4. **Verify independently:** Execute the tamper checklist with synthetic accounts/data in an authorized environment.
5. **Record honestly:** Mark unrun checks as NOT_RUN; AI completion claims are not acceptance evidence.

## Public/private boundary

Use generic patterns and synthetic data only. Do not add private production credentials, customer data, internal network diagrams, device configurations, live telemetry, or incident records to this public repository.
