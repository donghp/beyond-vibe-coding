# Data Model: GwpDataset

```yaml
entity: GwpDataset
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents Global Warming Potential (GWP) dataset values for non-CO2 greenhouse gases relative to CO2 over a 100-year time horizon.

## Schema Fields
- `dataset_id` (string): Dataset ID (e.g. `GWP-IPCC-AR5`, `GWP-IPCC-AR6`)
- `name` (string): Official name (e.g. `IPCC Fifth Assessment Report (AR5 - 100yr)`)
- `source` (string): Source institution (e.g. `IPCC`, `MONRE`)
- `effective_from` (string, ISO 8601): Effective start date
- `effective_to` (string, ISO 8601 | null): Effective end date
- `gwp_values` (object): Map of gas keys to GWP values:
  - `CO2`: 1
  - `CH4`: 28
  - `N2O`: 265
  - `SF6`: 23500
  - ...
