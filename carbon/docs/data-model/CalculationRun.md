# Data Model: CalculationRun

```yaml
entity: CalculationRun
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents an immutable, versioned snapshot of an executed calculation run, storing all input data, resolved rules, emission factor snapshots, GWP values, step-by-step arithmetic traces, and final results.

## Schema Fields
- `calculation_run_id` (string): Unique run ID (e.g. `RUN-2026-FAC001-Q1`)
- `facility_id` (string): Facility reference
- `reporting_period` (string): Target reporting year/quarter
- `engine_version` (string): Version of calculation engine
- `regulatory_rule_version` (string): Version of regulatory rule applied
- `methodology_version` (string): Version of methodology applied
- `factor_snapshot` (array): Copy of emission factor values used
- `gwp_snapshot` (object): Copy of GWP values used
- `inputs_snapshot` (array): Copy of activity data inputs used
- `trace_steps` (array): Step-by-step deterministic audit trace
- `total_co2e_tons` (number): Final calculated GHG emissions in metric tons CO2e
- `scope_1_co2e` (number): Scope 1 emissions
- `scope_2_co2e` (number): Scope 2 emissions
- `scope_3_co2e` (number): Scope 3 emissions
- `calculated_at` (string, ISO 8601): Execution timestamp
- `repository_commit` (string): Git commit hash of repository state
