# Data Model: RegulatoryRule

```yaml
entity: RegulatoryRule
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Defines an executable regulatory condition, applicability criteria, or compliance obligation derived from legal documents.

## Schema Fields
- `rule_id` (string): Unique rule ID (e.g. `RULE-42-2026-ENERGY-MANDATORY`)
- `document_id` (string): Parent regulatory document reference
- `sector_id` (string): Sector taxonomy ID
- `applicability_conditions` (object): Thresholds and sector/facility criteria
- `effective_from` (string, ISO 8601): Rule start date
- `effective_to` (string, ISO 8601 | null): Rule end date
- `reporting_period` (string): Applicable reporting year/cycle
- `obligation_type` (enum): `MANDATORY_INVENTORY` | `MITIGATION_PLAN` | `REPORTING_ONLY` | `TRANSITIONAL`
- `competent_ministry` (string): Target ministry (e.g. `Bộ Công Thương`)
- `methodology_ref` (string): Default MRV methodology ID
