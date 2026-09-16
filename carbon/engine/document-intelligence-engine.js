/**
 * ENERIX Carbon - Document Intelligence Engine
 * Governs the document classification, extraction candidate validation, confidence gating,
 * and human-in-the-loop verification pipeline.
 * Fully compliant with EC-UCM-001, EC-DOMAIN-MODEL-001, and G3 core.
 */

import { CalculationEngineError } from './calculation-engine.js';
import { ActivityData, Evidence, activityEvidenceEngine } from './activity-evidence-engine.js';
import { CONTROLLED_ISSUES } from './methodology-engine.js';

/**
 * Governed Document Entity
 */
export class Document {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Document input parameters cannot be null');
    }
    this.document_id = data.document_id || data.id || `DOC-${Math.floor(Math.random() * 1000000)}`;
    this.file_path = data.file_path || null;
    this.file_size = data.file_size || 0;
    this.mime_type = data.mime_type || 'application/pdf';
    this.sha256_hash = data.sha256_hash || null;
    this.uploaded_at = data.uploaded_at || new Date().toISOString();
    this.uploaded_by = data.uploaded_by || 'System';
    this.status = data.status || 'UPLOADED'; // 'UPLOADED', 'CLASSIFIED', 'EXTRACTED', 'VALIDATED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'
    this.metadata = data.metadata || {};
  }
}

/**
 * Document Classification Record
 */
export class DocumentClassification {
  constructor(data) {
    this.document_id = data.document_id;
    this.document_type = data.document_type || 'UNKNOWN'; // 'FUEL_INVOICE', 'UTILITY_BILL', 'METER_LOG', etc.
    this.confidence = data.confidence !== undefined ? data.confidence : 0.0;
    this.classified_by = data.classified_by || 'HEURISTICS';
    this.classified_at = data.classified_at || new Date().toISOString();
  }
}

/**
 * Extraction Candidate (Not calculation-authoritative)
 */
export class ExtractionCandidate {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Extraction candidate input parameters cannot be null');
    }
    this.candidate_id = data.candidate_id || data.id || `CAN-${Math.floor(Math.random() * 1000000)}`;
    this.document_id = data.document_id;
    this.extracted_fields = data.extracted_fields || {};
    this.field_confidences = data.field_confidences || {};
    this.overall_confidence = data.overall_confidence !== undefined ? data.overall_confidence : 0.0;
    this.extracted_at = data.extracted_at || new Date().toISOString();
    this.extracted_by = data.extracted_by || 'AI_OCR_EMULATOR';
    this.status = data.status || 'PENDING_VALIDATION'; // 'PENDING_VALIDATION', 'VALIDATED_OK', 'VALIDATION_FAILED', 'ACCEPTED', 'REJECTED'
    this.issues = data.issues || [];
  }
}

/**
 * Approved Extraction Handoff Snapshot
 */
export class ApprovedHandoff {
  constructor(data) {
    this.handoff_id = data.handoff_id || `HDF-${Math.floor(Math.random() * 1000000)}`;
    this.document_id = data.document_id;
    this.candidate_id = data.candidate_id;
    this.activity_data_record = data.activity_data_record || null;
    this.evidence_record = data.evidence_record || null;
    this.approved_by = data.approved_by;
    this.approved_at = data.approved_at || new Date().toISOString();
    this.status = data.status || 'COMPLETED';
  }
}

/**
 * Governed Document Intelligence Workflow Controller
 */
export class DocumentIntelligenceEngine {
  constructor() {
    this.confidenceThreshold = 0.80;
    this.keyFieldThreshold = 0.85;
    this.allowedClassifications = ['FUEL_INVOICE', 'UTILITY_BILL', 'METER_LOG', 'SCADA_EXPORT', 'LAB_TEST_RESULT'];
  }

  /**
   * Evaluates document features to classify document category
   */
  classify(doc) {
    if (!(doc instanceof Document)) {
      doc = new Document(doc);
    }
    
    // Heuristic Classification mapping mimicking document intelligence patterns
    let docType = 'UNKNOWN';
    let confidence = 0.0;

    const lowerPath = (doc.file_path || '').toLowerCase();
    if (lowerPath.includes('invoice') || lowerPath.includes('bill_fuel')) {
      docType = 'FUEL_INVOICE';
      confidence = 0.95;
    } else if (lowerPath.includes('utility') || lowerPath.includes('electricity')) {
      docType = 'UTILITY_BILL';
      confidence = 0.90;
    } else if (lowerPath.includes('meter')) {
      docType = 'METER_LOG';
      confidence = 0.88;
    } else if (lowerPath.includes('scada')) {
      docType = 'SCADA_EXPORT';
      confidence = 0.92;
    } else if (lowerPath.includes('lab')) {
      docType = 'LAB_TEST_RESULT';
      confidence = 0.85;
    } else if (doc.metadata && doc.metadata.suggested_type) {
      docType = doc.metadata.suggested_type;
      confidence = doc.metadata.suggested_confidence || 0.50;
    }

    doc.status = 'CLASSIFIED';

    return new DocumentClassification({
      document_id: doc.document_id,
      document_type: docType,
      confidence,
      classified_by: 'HEURISTICS_ENGINE'
    });
  }

  /**
   * Extracts raw candidate field structures (Not calculation-authoritative)
   */
  extract(doc, classification) {
    if (doc.status === 'APPROVED' || doc.status === 'REJECTED') {
      throw new CalculationEngineError('INVALID_STATE', 'Cannot extract fields from an already finalized document');
    }

    const fields = JSON.parse(JSON.stringify(doc.metadata.extracted_fields || {}));
    const fieldConfidences = JSON.parse(JSON.stringify(doc.metadata.field_confidences || {}));

    // Standardize overall extraction confidence computation
    let sum = 0;
    const keys = Object.keys(fieldConfidences);
    if (keys.length > 0) {
      keys.forEach(k => { sum += fieldConfidences[k]; });
    }
    const overallConfidence = keys.length > 0 ? sum / keys.length : 0.0;

    doc.status = 'EXTRACTED';

    return new ExtractionCandidate({
      candidate_id: `CAN-${doc.document_id}`,
      document_id: doc.document_id,
      extracted_fields: fields,
      field_confidences: fieldConfidences,
      overall_confidence: overallConfidence,
      extracted_by: 'AI_OCR_EMULATOR',
      extracted_at: doc.uploaded_at
    });
  }

  /**
   * Validates Candidate structures against strict fail-closed gates
   */
  validateCandidate(candidate, plan = null) {
    const issues = [];
    const fields = candidate.extracted_fields;

    // 1. Core Structural validations (Fail-Closed)
    if (!fields.facility_id || fields.facility_id.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_FACILITY_ID', message: 'Thiếu định danh cơ sở hoạt động' });
    }
    if (fields.quantity === undefined || fields.quantity === null) {
      issues.push({ level: 'ERROR', code: 'MISSING_QUANTITY', message: 'Lượng hoạt động không thể để trống và không thể quy đổi về 0 mặc định' });
    } else if (typeof fields.quantity !== 'number' || isNaN(fields.quantity)) {
      issues.push({ level: 'ERROR', code: 'INVALID_QUANTITY_TYPE', message: 'Lượng hoạt động phải mang định dạng số' });
    } else if (fields.quantity < 0) {
      issues.push({ level: 'ERROR', code: 'NEGATIVE_QUANTITY', message: 'Lượng hoạt động không thể mang giá trị âm' });
    }
    if (!fields.unit || fields.unit.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_UNIT', message: 'Thiếu đơn vị đo lường của dữ liệu' });
    }
    if (!fields.activity_type || fields.activity_type.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_ACTIVITY_TYPE', message: 'Thiếu loại hoạt động' });
    }
    if (!fields.period_start || !fields.period_end) {
      issues.push({ level: 'ERROR', code: 'MISSING_DATES', message: 'Thiếu thời hạn thời gian ghi nhận (period_start / period_end)' });
    }

    // 2. Plan matching verification
    if (plan) {
      const planId = plan.plan_id || plan.id;
      if (fields.calculation_plan_id && fields.calculation_plan_id !== planId) {
        issues.push({ level: 'ERROR', code: 'PLAN_MISMATCH', message: 'Kế hoạch tính toán không khớp' });
      }
      
      const planFacilityId = plan.facility_context ? (plan.facility_context.id || plan.facility_context.facility_id) : null;
      if (fields.facility_id && fields.facility_id !== planFacilityId) {
        issues.push({ level: 'ERROR', code: 'FACILITY_MISMATCH', message: 'Cơ sở của ứng viên trích xuất không khớp với Kế hoạch tính toán' });
      }

      // Check unit compatibility
      let matchedStep = null;
      if (plan.steps && plan.steps.length > 0) {
        matchedStep = plan.steps.find(step => step.activity_type === fields.activity_type);
      }
      if (matchedStep && matchedStep.expected_unit && fields.unit && fields.unit !== matchedStep.expected_unit) {
        issues.push({ level: 'ERROR', code: 'UNIT_INCOMPATIBLE', message: `Đơn vị trích xuất ${fields.unit} không khớp với đơn vị yêu cầu ${matchedStep.expected_unit}` });
      }
    }

    // Update status based on validation checks
    const hasErrors = issues.some(i => i.level === 'ERROR');
    candidate.status = hasErrors ? 'VALIDATION_FAILED' : 'VALIDATED_OK';
    candidate.issues = issues;

    return issues;
  }

  /**
   * Assesses extraction confidences to decide if human in the loop review is mandatory
   */
  evaluateConfidence(candidate) {
    const fields = ['facility_id', 'quantity', 'unit', 'period_start', 'period_end'];
    let requiresReview = false;

    if (candidate.overall_confidence < this.confidenceThreshold) {
      requiresReview = true;
    }

    for (const f of fields) {
      const conf = candidate.field_confidences[f] !== undefined ? candidate.field_confidences[f] : 0.0;
      if (conf < this.keyFieldThreshold) {
        requiresReview = true;
      }
    }

    if (candidate.status === 'VALIDATION_FAILED') {
      requiresReview = true;
    }

    return {
      requiresReview,
      overall_confidence: candidate.overall_confidence,
      reason: requiresReview ? 'CONFIDENCE_BELOW_THRESHOLD_OR_VALIDATION_FAILED' : 'AUTOMATED_PASS_ELIGIBLE'
    };
  }

  /**
   * Processes human-in-the-loop audit inputs
   */
  humanReview(candidate, outcome, reviewer, adjustments = {}) {
    if (outcome === 'REJECT') {
      candidate.status = 'REJECTED';
      return candidate;
    }

    // Apply adjustments
    const updatedFields = { ...candidate.extracted_fields, ...adjustments };
    const updatedConfidences = { ...candidate.field_confidences };
    
    // Set confidences of adjusted fields to 1.0 (human validated)
    Object.keys(adjustments).forEach(k => {
      updatedConfidences[k] = 1.0;
    });

    candidate.extracted_fields = updatedFields;
    candidate.field_confidences = updatedConfidences;

    let sum = 0;
    const keys = Object.keys(updatedConfidences);
    if (keys.length > 0) {
      keys.forEach(k => { sum += updatedConfidences[k]; });
    }
    candidate.overall_confidence = keys.length > 0 ? sum / keys.length : 1.0;

    // Run validation again on corrected values
    this.validateCandidate(candidate);

    if (candidate.status === 'VALIDATED_OK' && (outcome === 'APPROVE' || outcome === 'MODIFY_AND_APPROVE')) {
      candidate.status = 'ACCEPTED';
    } else {
      candidate.status = 'REJECTED';
    }

    return candidate;
  }

  /**
   * Safe execution handoff creating compliant ActivityData & Evidence records.
   * ExtractionCandidate is NOT calculation-authoritative; only the approved handoff results are.
   */
  handoff(candidate, doc, reviewer) {
    if (candidate.status !== 'ACCEPTED') {
      throw new CalculationEngineError('UNAUTHORIZED_ACTION', 'Cannot execute handoff for non-accepted extraction candidate');
    }

    const fields = candidate.extracted_fields;

    // Construct Evidence representation
    const evidence = new Evidence({
      evidence_id: `EVI-AUTO-${Math.floor(Math.random() * 1000000)}`,
      evidence_type: doc.metadata.suggested_type || 'FUEL_INVOICE',
      title: doc.metadata.title || 'Auto-Extracted Evidence Document',
      source_ref: doc.file_path,
      coverage_period: {
        start: fields.period_start,
        end: fields.period_end
      },
      facility_id: fields.facility_id,
      approval_state: 'APPROVED',
      evidence_state: 'EVIDENCE_APPROVED'
    });

    // Construct ActivityData representation
    const activityData = new ActivityData({
      activity_data_id: `ACT-AUTO-${Math.floor(Math.random() * 1000000)}`,
      facility_id: fields.facility_id,
      calculation_plan_id: fields.calculation_plan_id || null,
      activity_type: fields.activity_type,
      quantity: fields.quantity,
      unit: fields.unit,
      activity_period: {
        start: fields.period_start,
        end: fields.period_end
      },
      source_type: doc.metadata.source_type || 'DOCUMENT',
      provenance: {
        source_ref: doc.document_id,
        created_by: `DocIntelHandoff-${reviewer}`
      },
      evidence_refs: [evidence.evidence_id],
      approval_state: 'APPROVED'
    });

    doc.status = 'APPROVED';

    return new ApprovedHandoff({
      document_id: doc.document_id,
      candidate_id: candidate.candidate_id,
      activity_data_record: activityData,
      evidence_record: evidence,
      approved_by: reviewer
    });
  }

  /**
   * Deduplicates documents using cryptographically robust file hashes
   */
  detectDuplicates(docList) {
    const duplicates = [];
    for (let i = 0; i < docList.length; i++) {
      for (let j = i + 1; j < docList.length; j++) {
        const d1 = docList[i];
        const d2 = docList[j];
        if (d1.sha256_hash && d1.sha256_hash === d2.sha256_hash) {
          duplicates.push({
            code: 'DUPLICATE_DOCUMENT',
            message: `Trùng lặp tệp tin tài liệu dựa trên mã băm SHA256: ${d1.document_id} và ${d2.document_id}`,
            documents: [d1.document_id, d2.document_id]
          });
        }
      }
    }
    return duplicates;
  }

  /**
   * Detects potential conflicts across multiple extraction candidates
   */
  detectConflicts(candidateList) {
    const conflicts = [];
    for (let i = 0; i < candidateList.length; i++) {
      for (let j = i + 1; j < candidateList.length; j++) {
        const c1 = candidateList[i];
        const c2 = candidateList[j];

        const f1 = c1.extracted_fields;
        const f2 = c2.extracted_fields;

        if (f1.facility_id === f2.facility_id && f1.activity_type === f2.activity_type) {
          const overlaps = (f1.period_start < f2.period_end && f1.period_end > f2.period_start);
          if (overlaps) {
            if (f1.quantity !== f2.quantity || f1.unit !== f2.unit) {
              conflicts.push({
                code: 'CANDIDATE_CONFLICT',
                message: `Xung đột ranh giới dữ liệu trích xuất từ tài liệu khác nhau covering cùng chu kỳ.`,
                candidates: [c1.candidate_id, c2.candidate_id],
                issue_id: 'ISSUE-RRM-001'
              });
            }
          }
        }
      }
    }
    return conflicts;
  }
}

export const documentIntelligenceEngine = new DocumentIntelligenceEngine();
