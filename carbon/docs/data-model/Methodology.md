# Data Model: Methodology

```yaml
entity: Methodology
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents an approved technical MRV calculation method or reporting standard.

## Schema Fields
- `methodology_id` (string): Unique ID (e.g. `METH-BCT-38-2023`)
- `title` (string): Methodology title
- `authority` (string): Issuing ministry or standard organization
- `legal_basis` (string): Regulatory document reference
- `version` (string): Version code
- `applicability_scope` (string): Industry sectors and activity scope
- `calculation_model_class` (enum): `MODEL-01` | `MODEL-02` | `MODEL-03` | `MODEL-04` | `MODEL-05` | `MODEL-06` | `MODEL-07`
- `required_inputs` (array): Input fields required for calculation
- `uncertainty_rules` (object): QA/QC & uncertainty assessment rules
