/**
 * ENERIX Carbon - Hardened Data Provider
 * Repository-native data loader and governed engine registry.
 * Provides universal loading (Node.js & Browser) and clean lookup helpers.
 * Fully compliant with G1-G4 governing baselines.
 */

import {
  regulatoryEngine,
  TAXONOMY_REGISTRY,
  GOVERNED_RULES,
  CONTROLLED_ISSUES
} from '../engine/regulatory-engine.js';
import {
  resolveTemporalBinding,
  TemporalValue,
  TEMPORAL_ISSUES,
  BINDING_MODES,
  isValidDateString
} from '../engine/temporal-engine.js';
import {
  methodologySelectionEngine,
  GOVERNED_METHODOLOGIES
} from '../engine/methodology-engine.js';
import {
  calculationPlanEngine,
  CalculationPlan
} from '../engine/plan-engine.js';
import {
  activityEvidenceEngine,
  ActivityData,
  Evidence
} from '../engine/activity-evidence-engine.js';
import {
  calculationEngine,
  CalculationEngineError
} from '../engine/calculation-engine.js';
import {
  documentIntelligenceEngine,
  Document,
  ExtractionCandidate
} from '../engine/document-intelligence-engine.js';
import {
  provenanceEngine,
  ProvenanceRecord
} from '../engine/provenance-engine.js';
import {
  qaqcEngine,
  QAQC_SEVERITY,
  QAQC_CATEGORIES,
  QAQC_READINESS_STATUS,
  DataHealthSnapshot
} from '../engine/qa-qc-engine.js';
import {
  reportReadinessEngine,
  REPORT_READINESS_STATES,
  REPORTING_FRAMEWORKS,
  SIGN_OFF_ROLES,
  SignOffRecord,
  AuditPackage
} from '../engine/report-readiness-engine.js';

export const DATA_SOURCE_CLASSIFICATION = Object.freeze({
  AUTHORITATIVE: 'AUTHORITATIVE',
  SYNTHETIC_TEST_DATA: 'SYNTHETIC_TEST_DATA',
  DEMO_FIXTURE: 'DEMO_FIXTURE',
  DERIVED_VIEW_DATA: 'DERIVED_VIEW_DATA',
  UNKNOWN: 'UNKNOWN'
});

export const PROVIDER_STATUS = Object.freeze({
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  AVAILABLE: 'AVAILABLE'
});

export const CATALOG_CLASSIFICATIONS = Object.freeze({
  'data/sectors.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/activities.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/emission-sources.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/emission-factors.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/gwp-datasets.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/methodologies.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'data/calculation-models.json': DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
  'demo-data/facilities.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE,
  'demo-data/scenarios.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE,
  'demo-data/activities.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE,
  'demo-data/demo-activities.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE,
  'demo-data/demo-documents.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE,
  'demo-data/reports.json': DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE
});

export class DataProvider {
  constructor() {
    this.sectors = [];
    this.activities = [];
    this.emissionSources = [];
    this.emissionFactors = [];
    this.gwpDatasets = [];
    this.methodologies = [];
    this.calculationModels = [];
    this.facilities = [];
    this.scenarios = [];
    this.demoActivities = [];
    this.knowledgeManifest = null;
    this.reports = [];
    this.isLoaded = false;
    this.status = PROVIDER_STATUS.LOADING;
    this.lastError = null;
    this.historicalSnapshots = new Map();

    // Governed Engine Registry
    this.engines = Object.freeze({
      regulatory: regulatoryEngine,
      temporal: {
        resolveTemporalBinding,
        TemporalValue,
        TEMPORAL_ISSUES,
        BINDING_MODES,
        isValidDateString
      },
      methodology: methodologySelectionEngine,
      plan: calculationPlanEngine,
      activityEvidence: activityEvidenceEngine,
      calculation: calculationEngine,
      documentIntelligence: documentIntelligenceEngine,
      provenance: provenanceEngine,
      qaqc: qaqcEngine,
      readiness: reportReadinessEngine
    });
  }

  /**
   * Universal JSON loader supporting both Node.js filesystem and browser fetch.
   */
  async loadJsonResource(relativePath, isYaml = false) {
    // 1. Node.js environment detection
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      try {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const fullPath = path.resolve(process.cwd(), 'carbon', relativePath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (isYaml) {
            // Very simple YAML parser for our structured manifests
            const yaml = await import('js-yaml');
            return yaml.load(content);
          }
          return JSON.parse(content);
        }
      } catch (err) {
        // Fallback to fetch if available
      }
    }

    // 2. Browser fetch environment
    if (typeof fetch === 'function') {
      try {
        const res = await fetch(`./${relativePath}`);
        if (res.ok) {
          if (isYaml) {
             const yaml = await import('js-yaml');
             return yaml.load(await res.text());
          }
          return await res.json();
        }
      } catch (_) {}

      try {
        const res = await fetch(`/carbon/${relativePath}`);
        if (res.ok) {
          if (isYaml) {
             const yaml = await import('js-yaml');
             return yaml.load(await res.text());
          }
          return await res.json();
        }
      } catch (_) {}
    }

    return null;
  }

  /**
   * Loads all repository catalogs, facilities, and scenarios.
   */
  async loadAll() {
    try {
      const [
        sectorsData,
        activitiesData,
        sourcesData,
        factorsData,
        gwpData,
        methodologiesData,
        modelsData,
        facilitiesData,
        scenariosData,
        demoActsData,
        reportsData,
        knowledgeManifestData
      ] = await Promise.all([
        this.loadJsonResource('data/sectors.json'),
        this.loadJsonResource('data/activities.json'),
        this.loadJsonResource('data/emission-sources.json'),
        this.loadJsonResource('data/emission-factors.json'),
        this.loadJsonResource('data/gwp-datasets.json'),
        this.loadJsonResource('data/methodologies.json'),
        this.loadJsonResource('data/calculation-models.json'),
        this.loadJsonResource('demo-data/facilities.json'),
        this.loadJsonResource('demo-data/scenarios.json'),
        this.loadJsonResource('demo-data/activities.json'),
        this.loadJsonResource('demo-data/reports.json'),
        this.loadJsonResource('knowledge-manifest.yaml', true)
      ]);

      this.sectors = sectorsData?.sectors || [];
      this.activities = activitiesData?.activities || [];
      this.emissionSources = sourcesData?.emission_source_categories || [];
      this.emissionFactors = factorsData?.emission_factors || [];
      this.gwpDatasets = gwpData?.gwp_datasets || [];
      this.methodologies = methodologiesData?.methodologies || [];
      this.calculationModels = modelsData?.calculation_models || [];
      this.facilities = facilitiesData?.facilities || [];
      this.scenarios = scenariosData?.scenarios || [];
      this.demoActivities = demoActsData?.activity_records || [];
      this.reports = reportsData?.inventory_reports || [];
      this.knowledgeManifest = knowledgeManifestData?.documents || [];

      this.isLoaded = true;
      if (this.sectors.length === 0 && this.facilities.length === 0) {
        this.status = PROVIDER_STATUS.EMPTY;
      } else {
        this.status = PROVIDER_STATUS.AVAILABLE;
      }
      return true;
    } catch (err) {
      console.warn('ENERIX Carbon DataProvider loaded with fallback state:', err);
      this.status = PROVIDER_STATUS.ERROR;
      this.lastError = {
        source_engine: 'DataProvider',
        operation: 'loadAll',
        error_code: 'DATA_PROVIDER_LOAD_FAILED',
        message: err.message,
        timestamp: new Date().toISOString(),
        is_retryable: true
      };
      this.isLoaded = true;
      return false;
    }
  }

  // Provider Lifecycle & Health State
  getStatus() { return this.status; }
  isAvailable() { return this.status === PROVIDER_STATUS.AVAILABLE; }
  isLoading() { return this.status === PROVIDER_STATUS.LOADING; }
  isEmpty() { return this.status === PROVIDER_STATUS.EMPTY; }
  isError() { return this.status === PROVIDER_STATUS.ERROR; }
  getLastError() { return this.lastError; }

  // Data Source Classification & Catalog Governance
  getDataSourceClassification(resourcePath) {
    if (!resourcePath) return DATA_SOURCE_CLASSIFICATION.UNKNOWN;
    const cleanPath = resourcePath.replace(/^\.?\//, '');
    return CATALOG_CLASSIFICATIONS[cleanPath] || CATALOG_CLASSIFICATIONS[resourcePath] || DATA_SOURCE_CLASSIFICATION.UNKNOWN;
  }

  getDataCatalogManifest() {
    return Object.entries(CATALOG_CLASSIFICATIONS).map(([resource, classification]) => ({
      resource,
      classification,
      is_authoritative: classification === DATA_SOURCE_CLASSIFICATION.AUTHORITATIVE,
      is_fixture: classification === DATA_SOURCE_CLASSIFICATION.DEMO_FIXTURE
    }));
  }

  // Multi-Facility Context Isolation
  getFacilityContext(facilityId) {
    const facility = this.getFacility(facilityId);
    if (!facility) return null;
    const sector = this.getSector(facility.sector_id);
    return Object.freeze({
      facility_id: facility.facility_id,
      facility_name: facility.facility_name,
      legal_name: facility.legal_name,
      tax_id: facility.tax_id,
      sector_id: facility.sector_id,
      sector_name: sector ? sector.name_vi : null,
      province: facility.province,
      regulatory_status: facility.regulatory_status,
      legal_basis: facility.legal_basis,
      threshold_status: facility.threshold_status
    });
  }

  getTaxonomyRegistry() {
    return TAXONOMY_REGISTRY;
  }

  getTaxonomyMapping(sectorId) {
    return TAXONOMY_REGISTRY[sectorId] || null;
  }

  getGovernedRules() {
    return GOVERNED_RULES;
  }

  getControlledIssues() {
    return Object.freeze({
      ...CONTROLLED_ISSUES,
      ...TEMPORAL_ISSUES
    });
  }

  // Historical Snapshot Addressability
  storeHistoricalCalculationSnapshot(snapshot) {
    if (!snapshot || !snapshot.snapshot_id) return false;
    const facilityId = snapshot.facility_id || 'UNKNOWN';
    if (!this.historicalSnapshots.has(facilityId)) {
      this.historicalSnapshots.set(facilityId, []);
    }
    this.historicalSnapshots.get(facilityId).push(Object.freeze({ ...snapshot }));
    return true;
  }

  getHistoricalCalculationSnapshots(facilityId) {
    return this.historicalSnapshots.get(facilityId) || [];
  }

  getHistoricalCalculationSnapshot(snapshotId) {
    for (const [, list] of this.historicalSnapshots.entries()) {
      const match = list.find(s => s.snapshot_id === snapshotId);
      if (match) return match;
    }
    return null;
  }

  // Catalog Getters
  getSectors() { return this.sectors; }
  getActivities() { return this.activities; }
  getEmissionSources() { return this.emissionSources; }
  getEmissionFactors() { return this.emissionFactors; }
  getGwpDatasets() { return this.gwpDatasets; }
  getMethodologies() { return this.methodologies; }
  getCalculationModels() { return this.calculationModels; }
  getFacilities() { return this.facilities; }
  getScenarios() { return this.scenarios; }
  getDemoActivities(facilityId = null) {
    if (!facilityId) return this.demoActivities;
    return this.demoActivities.filter(a => a.facility_id === facilityId);
  }

  getReports() { return this.reports; }
  getReport(reportId) { return this.reports.find(r => r.report_id === reportId) || null; }
  getKnowledgeItems() { return this.knowledgeManifest; }
  getKnowledgeItem(id) { return this.knowledgeManifest.find(item => item.document_id === id) || null; }

  // Entity Lookups
  getFacility(facilityId) {
    return this.facilities.find(f => f.facility_id === facilityId) || null;
  }

  getSector(sectorId) {
    return this.sectors.find(s => s.sector_id === sectorId) || null;
  }

  getActivity(activityId) {
    return this.activities.find(a => a.activity_id === activityId) || null;
  }

  getEmissionFactor(factorId) {
    return this.emissionFactors.find(ef => ef.factor_id === factorId) || null;
  }

  getGwpDataset(datasetId) {
    return this.gwpDatasets.find(g => g.dataset_id === datasetId) || null;
  }

  getMethodology(methodologyId) {
    return this.methodologies.find(m => m.methodology_id === methodologyId) || null;
  }

  getCalculationModel(modelId) {
    return this.calculationModels.find(cm => cm.model_id === modelId) || null;
  }

  getScenario(scenarioId) {
    return this.scenarios.find(s => s.scenario_id === scenarioId) || null;
  }

  // Engine Accessor
  getEngines() {
    return this.engines;
  }
}

export const dataProvider = new DataProvider();
