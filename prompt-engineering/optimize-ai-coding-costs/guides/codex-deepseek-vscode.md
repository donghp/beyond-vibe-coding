# Configure DeepSeek as a Codex Model Provider in VS Code

This guide describes the architecture and a safe setup workflow for using DeepSeek through the Codex IDE extension in Visual Studio Code.

> **Architecture terminology:** VS Code and the Codex extension run locally. DeepSeek model inference and API billing remain remote. Calling DeepSeek a "local adapter" means that the provider is configured in the local Codex client; it does not mean the model runs offline on the developer's computer.

## 1. Architecture

```text
Developer workstation
  Visual Studio Code
    Codex IDE extension
      Codex agent / tool orchestration
        Local workspace operations
        File inspection and edits
        Terminal / supported tools
              |
              | HTTPS Responses API
              v
DeepSeek API infrastructure
  Model inference
  Prompt/context cache
  Token usage reporting
  Billing
```

The provider configuration selects a model endpoint and wire protocol. It does not replace Codex's local IDE integration or imply that every Codex feature is guaranteed to behave identically across providers. Validate tool calls and workflow behavior with a small, non-destructive task.

## 2. Prerequisites

- Visual Studio Code.
- The official Codex IDE extension.
- Codex initialized at least once.
- A DeepSeek API account and API key.
- A project workspace that can be backed up or safely version-controlled.

Check the current official guide before installing or configuring:

- [DeepSeek: Integrate with Codex](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/)
- [DeepSeek API documentation](https://api-docs.deepseek.com/)

## 3. Recommended setup workflow

1. Open the official DeepSeek Codex integration guide.
2. Confirm the currently supported Codex version, setup script, model identifier, API endpoint, and authentication method.
3. Inspect any remote setup script before execution; verify that it comes from an official DeepSeek documentation link.
4. Back up the existing Codex configuration.
5. Run the documented setup procedure and select the desired DeepSeek model.
6. Provide the API key through the documented secure authentication flow. Do not paste it into a project file, prompt, Git commit, issue, screenshot, or public log.
7. Restart or reload the Codex client.
8. Verify the selected model and provider in the client.
9. Run a small read-only task first; then test a bounded file change in a disposable branch.
10. Verify file diffs, tool behavior, model usage and billing.

This document intentionally does not hard-code a setup script or a supposedly universal configuration snippet. Provider setup procedures and model aliases can change. The current official guide is the source of truth.

## 4. Configuration concepts

A Codex provider configuration typically needs to express:

- Model identifier.
- Provider identifier.
- Provider display name.
- API base URL.
- Wire protocol (for the documented integration, Responses API).
- Authentication method.
- Optional reasoning settings supported by the selected model and client version.

Use the exact values from the current official DeepSeek guide. Do not assume that a Chat Completions endpoint is interchangeable with a Responses API endpoint.

## 5. Verification checklist

| Check | Expected evidence |
|---|---|
| Codex extension is installed | VS Code extension details |
| Provider configuration is loaded | Redacted Codex configuration screenshot |
| DeepSeek model is selected | Model selector / client status |
| Authentication succeeds | Successful test request; never expose secret |
| Read-only tool workflow works | Agent reads an in-scope file |
| Bounded edit works | Git diff for an authorized test change |
| Verification works | Test/build result |
| Billing is attributable | Usage record associated with the intended API key |

## 6. Local versus remote: precise wording for public articles

Recommended:

> "I configured DeepSeek as a model provider in the locally installed Codex IDE extension for VS Code. The IDE, workspace and agent tool workflow run on my workstation, while DeepSeek performs model inference through its remote API."

Avoid:

> "I run DeepSeek locally/offline in VS Code."

That wording would incorrectly imply local model inference.

## 7. Security requirements

- Never commit API keys or authentication files.
- Redact account identifiers and payment details from evidence images.
- Use separate API keys for separate clients/projects where practical.
- Apply available provider spending limits and usage monitoring.
- Review setup scripts and configuration changes before applying them.
- Do not give an AI agent access to secrets or production systems unless explicitly required and controlled.
- Inspect generated diffs before accepting changes.

## 8. Troubleshooting

| Symptom | Check |
|---|---|
| Model not listed | Confirm model catalog and current model ID from official guide |
| Authentication failure | Check API key, account status and documented auth flow |
| Unsupported request / protocol error | Confirm endpoint and wire protocol |
| Tool calls fail | Test supported tool behavior; do not assume model-provider compatibility implies feature parity |
| Unexpected high cost | Inspect request-level usage, cache fields, model, price tier and repeated context |
| Cache hit rate falls | Compare exact prefix order and content; inspect cache behavior and request traces |

## 9. Evidence to retain

Capture a redacted snapshot of:
- VS Code with the Codex extension visible.
- Selected provider and model.
- Relevant non-secret configuration fields.
- A small successful test.
- Corresponding usage record.

See [Evidence Register](../evidence/EVIDENCE_REGISTER.yaml).
