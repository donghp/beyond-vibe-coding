/**
 * ENERIX Carbon - Calculation Test Corpus Runner
 * Executes and verifies all canonical test cases specified in EC-TEST-001.
 */
import { calculationEngine, CalculationEngineError, UnitNormalizer } from './calculation-engine.js';
import { validationEngine } from './validation-engine.js';
import { provenanceEngine } from './provenance-engine.js';

class TestRunner {
  constructor() {
    this.totalTests = 0;
    this.passed = 0;
    this.failed = 0;
    this.testFailures = [];
  }

  runTest(testId, description, testFn) {
    this.totalTests++;
    try {
      testFn();
      this.passed++;
      console.log(`  \x1b[32m✓ [PASSED]\x1b[0m ${testId}: ${description}`);
    } catch (err) {
      this.failed++;
      this.testFailures.push({ testId, description, error: err });
      console.log(`  \x1b[31m✗ [FAILED]\x1b[0m ${testId}: ${description}`);
      console.log(`     \x1b[33mReason:\x1b[0m ${err.message || err}`);
      if (err instanceof CalculationEngineError) {
        console.log(`     \x1b[35mError Code:\x1b[0m ${err.code}`);
      }
    }
  }

  report() {
    console.log('\n======================================================');
    console.log('ENERIX CARBON - VERIFICATION SUMMARY');
    console.log('======================================================');
    console.log(`Total Verified:  ${this.totalTests}`);
    console.log(`Passed:          \x1b[32m${this.passed}\x1b[0m`);
    console.log(`Failed:          ${this.failed > 0 ? `\x1b[31m${this.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
    console.log('======================================================');

    if (this.failed > 0) {
      console.log('\nDetailed Failures:');
      this.testFailures.forEach(f => {
        console.log(`\n- \x1b[31m${f.testId}\x1b[0m: ${f.description}`);
        console.log(`  Error: ${f.error.message || f.error}`);
        if (f.error.code) {
          console.log(`  Code:  ${f.error.code}`);
        }
        if (f.error.stack) {
          console.log(`  Stack: ${f.error.stack.split('\n')[1]}`);
        }
      });
      process.exit(1);
    } else {
      console.log('\n\x1b[32m✓ All tests passed with 100% algebraic and structural integrity!\x1b[0m\n');
      process.exit(0);
    }
  }
}

const runner = new TestRunner();

console.log('Starting ENERIX Carbon Deterministic Calculation Verification System...\n');

// Standard synthetic fixtures labeled with TEST_ONLY_SYNTHETIC metadata
const DEFAULT_GWP_DATASET = {
  dataset_id: 'GWP-IPCC-AR5',
  metadata_status: 'TEST_ONLY_SYNTHETIC',
  gwp_values: {
    CO2: 1,
    CH4: 28,
    N2O: 265
  }
};

const DEFAULT_METH_M01 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-01',
  status: 'registered'
};

const DEFAULT_METH_M02 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-02',
  status: 'registered'
};

const DEFAULT_METH_M03 = {
  methodology_id: 'METH-BXD-13-2024',
  calculation_model_class: 'MODEL-03',
  status: 'registered'
};

const DEFAULT_METH_M04 = {
  methodology_id: 'METH-BNN-19-2024',
  calculation_model_class: 'MODEL-04',
  status: 'registered'
};

const DEFAULT_METH_M05 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-05',
  status: 'registered'
};

const DEFAULT_METH_M06 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-06',
  status: 'registered'
};

const DEFAULT_METH_M07 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-07',
  status: 'registered'
};

const DEFAULT_METH_M08 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-08',
  status: 'registered'
};

const DEFAULT_METH_M09 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-09',
  status: 'registered'
};

const DEFAULT_METH_M10 = {
  methodology_id: 'METH-BCT-38-2023',
  calculation_model_class: 'MODEL-10',
  status: 'registered'
};

// ============================================================================
// MODEL-01: SIMPLE FACTOR MODEL TESTS
// ============================================================================

runner.runTest('TC-M01-001', 'Happy Path Simple Factor Model (100 MWh * 0.5 = 50.0 t CO2e)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ quantity: 100.0, unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-TEST-ELEC', gas: 'CO2e', value: 0.5, unit: 't CO2e/MWh', status: 'ACTIVE' }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 50.0) {
    throw new Error(`Expected total CO2e to be 50.0, got ${result.total_co2e}`);
  }
  if (result.provenance_trace.reproducibility_hash === undefined) {
    throw new Error('Provenance trace missing reproducibility hash');
  }
});

runner.runTest('TC-M01-002', 'Boundary Case Simple Factor Model (0 MWh)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-ZERO',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ quantity: 0.0, unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-TEST-ELEC', gas: 'CO2e', value: 0.5, unit: 't CO2e/MWh', status: 'ACTIVE' }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 0.0) {
    throw new Error(`Expected total CO2e to be 0.0, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M01-003', 'Invalid Input Case Simple Factor Model (Negative quantity)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-NEG',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ quantity: -50.0, unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-TEST-ELEC', gas: 'CO2e', value: 0.5, unit: 't CO2e/MWh', status: 'ACTIVE' }
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on negative quantity');
  } catch (err) {
    if (err.code !== 'INVALID_INPUT') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-02: FACTOR WITH CONVERSION MODEL TESTS
// ============================================================================

runner.runTest('TC-M02-001', 'Happy Path Factor with Conversion (1000L * 0.0008 t/L * 3.1 t CO2/t fuel = 2.48 t CO2)', () => {
  const request = {
    calculation_run_id: 'RUN-M02-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-02',
    activity_data: [{ quantity: 1000.0, unit: 'liters' }]
  };

  const context = {
    methodology: DEFAULT_METH_M02,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'NCV', value: 0.0008, unit: 't/liter' }
    ],
    emission_factors: [
      { factor_id: 'EF-TEST-DSL', gas: 'CO2e', value: 3.1, unit: 't CO2e/t fuel', status: 'ACTIVE' }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (Math.abs(result.total_co2e - 2.48) > 1e-9) {
    throw new Error(`Expected total CO2e to be 2.48, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M02-002', 'Boundary Case Factor with Conversion (NCV = 0.0)', () => {
  const request = {
    calculation_run_id: 'RUN-M02-ZERO',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-02',
    activity_data: [{ quantity: 1000.0, unit: 'liters' }]
  };

  const context = {
    methodology: DEFAULT_METH_M02,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'NCV', value: 0.0, unit: 't/liter' }
    ],
    emission_factors: [
      { factor_id: 'EF-TEST-DSL', gas: 'CO2e', value: 3.1, unit: 't CO2e/t fuel', status: 'ACTIVE' }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 0.0) {
    throw new Error(`Expected total CO2e to be 0.0, got ${result.total_co2e}`);
  }
});

// ============================================================================
// MODEL-03: MULTI-GAS COMBUSTION MODEL TESTS
// ============================================================================

runner.runTest('TC-M03-001', 'Happy Path Multi-Gas Combustion (CO2e = sum(Gas_i * GWP_i))', () => {
  const request = {
    calculation_run_id: 'RUN-M03-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-03',
    activity_data: [{ quantity: 10.0, unit: 't' }]
  };

  const context = {
    methodology: DEFAULT_METH_M03,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-CO2', gas: 'CO2', value: 2.1, unit: 't CO2/t', status: 'ACTIVE' },
      { factor_id: 'EF-CH4', gas: 'CH4', value: 0.0002, unit: 't CH4/t', status: 'ACTIVE' },
      { factor_id: 'EF-N2O', gas: 'N2O', value: 0.00003, unit: 't N2O/t', status: 'ACTIVE' }
    ]
  };

  const result = calculationEngine.execute(request, context);
  // Expected CO2: 10 * 2.1 * 1.0 = 21.0 t CO2e
  // Expected CH4: 10 * 0.0002 * 28 = 0.056 t CO2e
  // Expected N2O: 10 * 0.00003 * 265 = 0.0795 t CO2e
  // Total: 21.0 + 0.056 + 0.0795 = 21.1355 t CO2e
  const expected = 21.1355;
  if (Math.abs(result.total_co2e - expected) > 1e-9) {
    throw new Error(`Expected total CO2e to be ${expected}, got ${result.total_co2e}`);
  }

  // Ensure physical gas masses remain uncollapsed in results payload
  const co2 = result.gas_results.find(g => g.gas === 'CO2');
  const ch4 = result.gas_results.find(g => g.gas === 'CH4');
  if (!co2 || co2.mass !== 21.0 || !ch4 || ch4.mass !== 0.002) {
    throw new Error('Uncollapsed gas masses check failed');
  }
});

runner.runTest('TC-M03-003', 'Invalid Input Case Multi-Gas Combustion (Missing CH4 EF)', () => {
  const request = {
    calculation_run_id: 'RUN-M03-MISSING-EF',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-03',
    activity_data: [{ quantity: 10.0, unit: 't' }]
  };

  const context = {
    methodology: DEFAULT_METH_M03,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-CO2', gas: 'CO2', value: 2.1, unit: 't CO2/t', status: 'ACTIVE' },
      { factor_id: 'EF-N2O', gas: 'N2O', value: 0.00003, unit: 't N2O/t', status: 'ACTIVE' }
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on missing emission factor');
  } catch (err) {
    if (err.code !== 'MISSING_EMISSION_FACTOR') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-04: PARAMETERIZED MODEL TESTS
// ============================================================================

runner.runTest('TC-M04-001', 'Happy Path Parameterized Model (cc=0.75, of=0.98, quantity=50t)', () => {
  const request = {
    calculation_run_id: 'RUN-M04-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-04',
    activity_data: [{ quantity: 50.0, unit: 't' }]
  };

  const context = {
    methodology: DEFAULT_METH_M04,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'CARBON_CONTENT', value: 0.75 },
      { parameter_key: 'OXIDATION_FRACTION', value: 0.98 }
    ],
    emission_factors: []
  };

  const result = calculationEngine.execute(request, context);
  const expectedEf = 0.75 * 0.98 * (44 / 12);
  const expected = 50.0 * expectedEf;
  if (Math.abs(result.total_co2e - expected) > 1e-9) {
    throw new Error(`Expected total CO2e to be ${expected}, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M04-003', 'Invalid Input Parameterized Model (Carbon content > 1.0)', () => {
  const request = {
    calculation_run_id: 'RUN-M04-INVALID',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-04',
    activity_data: [{ quantity: 50.0, unit: 't' }]
  };

  const context = {
    methodology: DEFAULT_METH_M04,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'CARBON_CONTENT', value: 1.5 },
      { parameter_key: 'OXIDATION_FRACTION', value: 0.98 }
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on out of bounds CC');
  } catch (err) {
    if (err.code !== 'MODEL_CONSTRAINT_VIOLATION') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-05: COMPOSITE MODEL TESTS
// ============================================================================

runner.runTest('TC-M05-001', 'Happy Path Composite Model (Process A=10t, Process B=15.5t)', () => {
  const request = {
    calculation_run_id: 'RUN-M05-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-05',
    child_requests: [
      {
        calculation_run_id: 'RUN-CHILD-A',
        facility_id: 'FAC-VN-001',
        reporting_period: '2026',
        calculation_model_ref: 'MODEL-01',
        activity_data: [{ quantity: 20.0, unit: 'MWh' }]
      },
      {
        calculation_run_id: 'RUN-CHILD-B',
        facility_id: 'FAC-VN-001',
        reporting_period: '2026',
        calculation_model_ref: 'MODEL-01',
        activity_data: [{ quantity: 31.0, unit: 'MWh' }]
      }
    ]
  };

  const context = {
    methodology: DEFAULT_METH_M05,
    gwp_dataset: DEFAULT_GWP_DATASET,
    child_contexts: [
      {
        methodology: DEFAULT_METH_M01,
        gwp_dataset: DEFAULT_GWP_DATASET,
        emission_factors: [{ factor_id: 'EF-A', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
      },
      {
        methodology: DEFAULT_METH_M01,
        gwp_dataset: DEFAULT_GWP_DATASET,
        emission_factors: [{ factor_id: 'EF-B', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
      }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 25.5) {
    throw new Error(`Expected composite CO2e to be 25.5, got ${result.total_co2e}`);
  }
  if (!result.snapshot.child_runs || result.snapshot.child_runs.length !== 2) {
    throw new Error('Child run lineage was flattened or missing in snapshot');
  }
});

runner.runTest('TC-M05-003', 'Invalid Composite Model (Temporal discrepancy)', () => {
  const request = {
    calculation_run_id: 'RUN-M05-ERR',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-05',
    child_requests: [
      {
        calculation_run_id: 'RUN-CHILD-A',
        facility_id: 'FAC-VN-001',
        reporting_period: '2024', // Discrepancy
        calculation_model_ref: 'MODEL-01',
        activity_data: [{ quantity: 20.0, unit: 'MWh' }]
      }
    ]
  };

  const context = {
    methodology: DEFAULT_METH_M05,
    gwp_dataset: DEFAULT_GWP_DATASET,
    child_contexts: [
      {
        methodology: DEFAULT_METH_M01,
        gwp_dataset: DEFAULT_GWP_DATASET,
        emission_factors: [{ factor_id: 'EF-A', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
      }
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on composite temporal discrepancy');
  } catch (err) {
    if (err.code !== 'INCOMPATIBLE_METHODOLOGY') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-06: DYNAMIC STATE-TRANSITION MODEL TESTS
// ============================================================================

runner.runTest('TC-M06-001', 'Happy Path Dynamic Model (Stock decay: S0=100, k=0.1, steps=2 => 19.0 emissions)', () => {
  const request = {
    calculation_run_id: 'RUN-M06-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-06',
    time_steps: 2
  };

  const context = {
    methodology: DEFAULT_METH_M06,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'INITIAL_STOCK', value: 100.0 },
      { parameter_key: 'DECAY_RATE', value: 0.1 }
    ]
  };

  const result = calculationEngine.execute(request, context);
  // Year 1: 100 * 0.1 = 10 emissions, stock becomes 90.
  // Year 2: 90 * 0.1 = 9 emissions, stock becomes 81.
  // Total: 19.0 CH4 emissions
  if (result.total_co2e !== 19.0) {
    throw new Error(`Expected dynamic total emissions to be 19.0, got ${result.total_co2e}`);
  }
  if (!result.snapshot.dynamic_steps || result.snapshot.dynamic_steps.length !== 2) {
    throw new Error('Chronological step snapshots missing or malformed');
  }
});

// ============================================================================
// MODEL-07: PROJECT REDUCTION MODEL TESTS
// ============================================================================

runner.runTest('TC-M07-001', 'Happy Path Project Reduction (Baseline=150, Project=90 => Reduction=60)', () => {
  const request = {
    calculation_run_id: 'RUN-M07-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-07',
    baseline_request: {
      calculation_run_id: 'RUN-BASELINE',
      facility_id: 'FAC-VN-001',
      reporting_period: '2026',
      calculation_model_ref: 'MODEL-01',
      activity_data: [{ quantity: 300.0, unit: 'MWh' }]
    },
    project_request: {
      calculation_run_id: 'RUN-PROJECT',
      facility_id: 'FAC-VN-001',
      reporting_period: '2026',
      calculation_model_ref: 'MODEL-01',
      activity_data: [{ quantity: 180.0, unit: 'MWh' }]
    }
  };

  const context = {
    methodology: DEFAULT_METH_M07,
    gwp_dataset: DEFAULT_GWP_DATASET,
    baseline_context: {
      methodology: DEFAULT_METH_M01,
      gwp_dataset: DEFAULT_GWP_DATASET,
      emission_factors: [{ factor_id: 'EF-BL', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
    },
    project_context: {
      methodology: DEFAULT_METH_M01,
      gwp_dataset: DEFAULT_GWP_DATASET,
      emission_factors: [{ factor_id: 'EF-PR', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
    }
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 60.0) {
    throw new Error(`Expected project reduction to be 60.0, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M07-003', 'Invalid Project Reduction Case (Project emissions exceed baseline)', () => {
  const request = {
    calculation_run_id: 'RUN-M07-ERR',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-07',
    baseline_request: {
      calculation_run_id: 'RUN-BASELINE',
      facility_id: 'FAC-VN-001',
      reporting_period: '2026',
      calculation_model_ref: 'MODEL-01',
      activity_data: [{ quantity: 100.0, unit: 'MWh' }]
    },
    project_request: {
      calculation_run_id: 'RUN-PROJECT',
      facility_id: 'FAC-VN-001',
      reporting_period: '2026',
      calculation_model_ref: 'MODEL-01',
      activity_data: [{ quantity: 200.0, unit: 'MWh' }] // Exceeds baseline
    }
  };

  const context = {
    methodology: DEFAULT_METH_M07,
    gwp_dataset: DEFAULT_GWP_DATASET,
    baseline_context: {
      methodology: DEFAULT_METH_M01,
      gwp_dataset: DEFAULT_GWP_DATASET,
      emission_factors: [{ factor_id: 'EF-BL', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
    },
    project_context: {
      methodology: DEFAULT_METH_M01,
      gwp_dataset: DEFAULT_GWP_DATASET,
      emission_factors: [{ factor_id: 'EF-PR', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
    }
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on negative reduction boundaries');
  } catch (err) {
    if (err.code !== 'MODEL_CONSTRAINT_VIOLATION') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-08: MASS BALANCE MODEL TESTS
// ============================================================================

runner.runTest('TC-M08-001', 'Happy Path Mass Balance with allocation reconciliation', () => {
  const request = {
    calculation_run_id: 'RUN-M08-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-08',
    allocation_ratios: [0.6, 0.4] // Sums to exactly 1.0
  };

  const context = {
    methodology: DEFAULT_METH_M08,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'MASS_INPUT', value: 100.0 },
      { parameter_key: 'MASS_OUTPUT', value: 40.0 },
      { parameter_key: 'CARBON_FRACTION_INPUT', value: 0.5 },
      { parameter_key: 'CARBON_FRACTION_OUTPUT', value: 0.1 }
    ]
  };

  const result = calculationEngine.execute(request, context);
  // Carbon In: 100 * 0.5 = 50. Carbon Out: 40 * 0.1 = 4. Released: 46. CO2: 46 * 44/12 = 168.6666... t CO2
  const expected = 46 * (44 / 12);
  if (Math.abs(result.total_co2e - expected) > 0.001) {
    throw new Error(`Expected mass balance CO2 emissions to be ${expected}, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M08-ERR', 'Allocation Incomplete/Over Allocation Check', () => {
  const request = {
    calculation_run_id: 'RUN-M08-RECON-FAIL',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-08',
    allocation_ratios: [0.7, 0.4] // Sums to 1.1 (invalid exceed limit)
  };

  const context = {
    methodology: DEFAULT_METH_M08,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'MASS_INPUT', value: 100.0 },
      { parameter_key: 'MASS_OUTPUT', value: 40.0 },
      { parameter_key: 'CARBON_FRACTION_INPUT', value: 0.5 },
      { parameter_key: 'CARBON_FRACTION_OUTPUT', value: 0.1 }
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on allocation sum reconciliation drift');
  } catch (err) {
    if (err.code !== 'RECONCILIATION_FAILED') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-09: INTENSITY MODEL TESTS
// ============================================================================

runner.runTest('TC-M09-001', 'Happy Path Intensity Model (5000t / 2500 products = 2.0 ratio)', () => {
  const request = {
    calculation_run_id: 'RUN-M09-HAPPY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-09'
  };

  const context = {
    methodology: DEFAULT_METH_M09,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'ABSOLUTE_EMISSIONS', value: 5000.0 },
      { parameter_key: 'PRODUCTION_OUTPUT', value: 2500.0 }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 2.0) {
    throw new Error(`Expected intensity ratio to be 2.0, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M09-003', 'Invalid Case Intensity Model (Division by zero)', () => {
  const request = {
    calculation_run_id: 'RUN-M09-ZERO-DIV',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-09'
  };

  const context = {
    methodology: DEFAULT_METH_M09,
    gwp_dataset: DEFAULT_GWP_DATASET,
    parameters: [
      { parameter_key: 'ABSOLUTE_EMISSIONS', value: 5000.0 },
      { parameter_key: 'PRODUCTION_OUTPUT', value: 0.0 } // Zero
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on zero division');
  } catch (err) {
    if (err.code !== 'MODEL_CONSTRAINT_VIOLATION') {
      throw err;
    }
  }
});

// ============================================================================
// MODEL-10: MULTI-FACILITY AGGREGATION MODEL TESTS
// ============================================================================

runner.runTest('TC-M10-001', 'Happy Path Multi-Facility Aggregation (A=100, B=250 => Aggregated=350)', () => {
  const request = {
    calculation_run_id: 'RUN-M10-HAPPY',
    facility_id: 'FAC-VN-CORP',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-10'
  };

  const context = {
    methodology: DEFAULT_METH_M10,
    gwp_dataset: DEFAULT_GWP_DATASET,
    approved_runs: [
      { calculation_run_id: 'RUN-FAC-A', total_co2e: 100.0 },
      { calculation_run_id: 'RUN-FAC-B', total_co2e: 250.0 }
    ]
  };

  const result = calculationEngine.execute(request, context);
  if (result.total_co2e !== 350.0) {
    throw new Error(`Expected aggregated total to be 350.0, got ${result.total_co2e}`);
  }
});

runner.runTest('TC-M10-DUP', 'Invalid Aggregation Case (Duplicate Child Run IDs)', () => {
  const request = {
    calculation_run_id: 'RUN-M10-DUP',
    facility_id: 'FAC-VN-CORP',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-10'
  };

  const context = {
    methodology: DEFAULT_METH_M10,
    gwp_dataset: DEFAULT_GWP_DATASET,
    approved_runs: [
      { calculation_run_id: 'RUN-FAC-A', total_co2e: 100.0 },
      { calculation_run_id: 'RUN-FAC-A', total_co2e: 100.0 } // Duplicate Run ID
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on duplicate child runs in aggregation');
  } catch (err) {
    if (err.code !== 'RECONCILIATION_FAILED') {
      throw err;
    }
  }
});

// ============================================================================
// SYSTEM VALIDATION TESTS
// ============================================================================

runner.runTest('TC-VAL-001', 'Validation System (Missing mandatory activity quantity)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-MISSING-QTY',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [{ factor_id: 'EF-A', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'ACTIVE' }]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on missing quantity');
  } catch (err) {
    if (err.code !== 'INVALID_INPUT') {
      throw err;
    }
  }
});

runner.runTest('TC-VAL-002', 'Validation Engine (Standalone Validation of Activity Record)', () => {
  const record = {
    quantity: -250,
    unit: 'liters'
  };
  const result = validationEngine.validateActivityData(record);
  if (result.isValid === true) {
    throw new Error('ValidationEngine approved negative quantity');
  }
  const hasNegativeIssue = result.issues.some(i => i.code === 'NEGATIVE_QUANTITY');
  if (!hasNegativeIssue) {
    throw new Error('ValidationEngine missed negative quantity issue');
  }
});

runner.runTest('TC-VAL-003', 'Unit Normalizer Verification (12.5 kt -> 12500 t standard conversion)', () => {
  const norm = UnitNormalizer.normalize(12.5, 'kt', 't');
  if (norm.value !== 12500) {
    throw new Error(`Unit conversion failed, expected 12500, got ${norm.value}`);
  }
});

runner.runTest('TC-VAL-004', 'Unit Normalizer Exception (Unsupported unit conversions)', () => {
  try {
    UnitNormalizer.normalize(100.0, 'liters', 'MWh');
    throw new Error('Did not throw on unsupported conversion units');
  } catch (err) {
    if (err.code !== 'INVALID_UNIT') {
      throw err;
    }
  }
});

// ============================================================================
// PROVENANCE & SNAPSHOT VALIDATION
// ============================================================================

runner.runTest('TC-PROV-001', 'Provenance Block Exception (Draft factor status)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-PROV',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ quantity: 100.0, unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-DRAFT', gas: 'CO2e', value: 0.5, unit: 't/MWh', status: 'DRAFT' } // DRAFT!
    ]
  };

  try {
    calculationEngine.execute(request, context);
    throw new Error('Did not fail on draft coefficient provenance');
  } catch (err) {
    if (err.code !== 'PROVENANCE_INCOMPLETE') {
      throw err;
    }
  }
});

runner.runTest('TC-SNAP-001', 'CalculationSnapshot Integrity & Tamper Verification', () => {
  const runData = {
    calculation_run_id: 'RUN-SNAP-001',
    facilityId: 'FAC-VN-HANOI',
    period: '2026',
    resultCO2e: 450.0,
    gasResults: [{ gas: 'CO2', mass: 450.0 }]
  };

  const snapshot = provenanceEngine.createRunSnapshot(runData);
  if (!snapshot.audit_hash) {
    throw new Error('Provenance record missing audit hash');
  }

  // Verification passes with untampered snapshot
  const checkPass = provenanceEngine.verifySnapshotIntegrity(snapshot);
  if (checkPass.tamperDetected === true) {
    throw new Error('Integrity check returned false positive tamper alert');
  }

  // Tamper snapshot data artificially
  snapshot.outputs.result_co2e_tons = 9999.0;
  const checkFail = provenanceEngine.verifySnapshotIntegrity(snapshot);
  if (checkFail.tamperDetected === false) {
    throw new Error('Provenance system failed to detect altered snapshot output values');
  }
});

runner.runTest('TC-IDEM-001', 'Idempotency Assertion (Consistently exact execution across repetitive runs)', () => {
  const request = {
    calculation_run_id: 'RUN-M01-IDEM',
    facility_id: 'FAC-VN-001',
    reporting_period: '2026',
    calculation_model_ref: 'MODEL-01',
    activity_data: [{ quantity: 50.0, unit: 'MWh' }]
  };

  const context = {
    methodology: DEFAULT_METH_M01,
    gwp_dataset: DEFAULT_GWP_DATASET,
    emission_factors: [
      { factor_id: 'EF-TEST-ELEC', gas: 'CO2e', value: 0.5, unit: 't CO2e/MWh', status: 'ACTIVE' }
    ]
  };

  const firstResult = calculationEngine.execute(request, context);
  for (let i = 0; i < 50; i++) {
    const iterResult = calculationEngine.execute(request, context);
    if (iterResult.total_co2e !== firstResult.total_co2e) {
      throw new Error(`Repetitive run ${i} yielded differing total CO2e output value!`);
    }
    if (iterResult.provenance_trace.reproducibility_hash !== firstResult.provenance_trace.reproducibility_hash) {
      throw new Error(`Repetitive run ${i} produced differing cryptographic hash tracing outputs!`);
    }
  }
});

// Run report
runner.report();
