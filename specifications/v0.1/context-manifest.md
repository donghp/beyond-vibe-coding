# BVC Context Manifest Specification

**Specification ID:** `BVC-CONTEXT-MANIFEST`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  
**Schema:** [context-manifest.schema.json](./context-manifest.schema.json)  
**Schema dialect:** JSON Schema Draft 2020-12

## 1. Purpose

A **Context Manifest** records which information sources were selected for a task, why they were selected, what authority they carry, how fresh they were considered, and what conflicts or limitations remain. It makes context selection reviewable and traceable instead of treating a prompt or conversation history as the project's source of truth.

A Context Manifest records context assembly. It does not itself fetch sources, prove that a source was read, authorize access, or guarantee that the source content is correct.

## 2. Design principles

1. **Task-linked:** every manifest references a specific Task Contract ID, version, revision, and task ID.
2. **Provenance first:** every selected source has a stable reference and source identity.
3. **Authority is explicit:** `CANONICAL`, `APPROVED`, `REFERENCE`, and `UNTRUSTED` retain the Task Contract meanings; authority is not inferred from recency or wording.
4. **Trust is separate from authority:** a source may be canonical but still require integrity verification; untrusted input must not override an approved source.
5. **Freshness is visible:** state whether a source is current, stale, unknown, or not time-sensitive.
6. **Conflicts are recorded:** material conflicts must be resolved or cause the manifest to be blocked according to policy.
7. **Minimum necessary context:** include only information relevant to the task and its verification; do not copy secrets or unnecessary personal data into the manifest.

## 3. Lifecycle

- `DRAFT`: being assembled or reviewed; not ready for execution.
- `READY`: required sources have been selected and no blocking conflict is unresolved under the declared policy.
- `BLOCKED`: required information is missing, materially stale, inaccessible, or in unresolved conflict.
- `SUPERSEDED`: replaced by a later revision.

A `READY` manifest is not an authorization. The Task Contract and project policy remain authoritative for permission to execute.

## 4. Source record

Each source records:

- `source_id`: unique identifier within the manifest;
- `reference`: repository path, approved document reference, issue/PR reference, URI, or project-defined identifier;
- `source_type`: broad source category;
- `purpose`: why the source is needed;
- `authority`: source authority classification;
- `required`: whether the task cannot safely proceed without it;
- `selection_status`: `INCLUDED` or `EXCLUDED`;
- `trust_level`: `TRUSTED`, `UNTRUSTED`, or `UNVERIFIED`;
- optional source revision and content digest; and
- `freshness`: status, observation time, and any age/expiry limit.

`content_digest`, when supplied, uses `sha256:<64 lowercase hexadecimal characters>`. A digest identifies bytes; it does not prove that the source is authoritative or benign.

## 5. Conflicts and readiness

A conflict identifies at least two source IDs, severity, resolution status, and (when resolved) its basis. Under `STOP_ON_MATERIAL_CONFLICT`, a material or critical unresolved conflict blocks a `READY` manifest. If a project chooses `RECORD_AND_CONTINUE`, the limitation and rationale must remain visible; this choice does not permit an untrusted source to override canonical policy.

A required source marked `EXCLUDED` blocks readiness. A required source with `STALE` or `UNKNOWN` freshness blocks readiness when the selection policy requires current sources.

## 6. Relationship to other Core Specifications

- Task Contract states which context is required before work begins.
- Context Manifest records the selected context actually assembled for a particular contract revision.
- Project State stores durable project facts and status, not a full copy of every context source.
- Change Record records what changed; it must not be used as a substitute for context provenance.
- Verification Evidence records what was checked and the evidence produced.

## 7. Security and privacy

A manifest SHOULD store references and digests rather than embedding the contents of secrets, credentials, private keys, customer data, or large source documents. Access control must be enforced by the source system and runtime. Marking a source `TRUSTED` is an assertion by the manifest producer, not cryptographic proof.

## 8. Validation and limitations

Run `python scripts/validate_core_specifications.py` from the repository root. Structural validation checks the JSON Schema. Semantic checks enforce unique source IDs, task/project linkage, required-source inclusion, freshness policy, and conflict handling in the worked bundle.

This draft does not define a universal retrieval algorithm, token-budget strategy, source ranking model, or permission broker. Projects must define those policies locally.
