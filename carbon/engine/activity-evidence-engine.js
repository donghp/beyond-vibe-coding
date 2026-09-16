/**
 * ENERIX Carbon - Activity Data and Evidence Workflow Engine
 * Implements the governed QA/QC and verification flow for observed activity data and audit evidence.
 * Fully compliant with EC-UCM-001, EC-DOMAIN-MODEL-001, and EC-TEMP-001.
 */

import { CalculationEngineError } from './calculation-engine.js';
import { CONTROLLED_ISSUES } from './methodology-engine.js';

/**
 * Observed Activity Data Model
 */
export class ActivityData {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Activity data parameters cannot be null');
    }
    this.activity_data_id = data.activity_data_id || data.id || `ACT-${Math.floor(Math.random() * 1000000)}`;
    this.facility_id = data.facility_id;
    this.calculation_plan_id = data.calculation_plan_id || null;
    this.plan_step_id = data.plan_step_id || null;
    this.activity_type = data.activity_type || data.activity_name;
    this.process_type = data.process_type || null;
    this.source_category = data.source_category || null;
    this.source_type = data.source_type || data.data_origin || 'MANUAL';
    this.quantity = data.quantity !== undefined ? data.quantity : (data.value !== undefined ? data.value : null);
    this.unit = data.unit;
    
    // Temporal coverage attributes
    this.activity_period = data.activity_period || {
      start: data.period_start || null,
      end: data.period_end || null
    };
    this.event_date = data.event_date || null;
    this.reporting_period = data.reporting_period || null;
    
    // Quality & metadata
    this.measurement_context = data.measurement_context || {};
    this.data_quality_state = data.data_quality_state || {
      data_completeness: data.data_completeness || 'UNVERIFIED',
      validity: data.validity || 'UNVERIFIED',
      source_quality: data.source_quality || 'UNVERIFIED',
      measurement_quality: data.measurement_quality || 'UNVERIFIED'
    };
    
    this.validation_state = data.validation_state || 'UNVERIFIED';
    this.approval_state = data.approval_state || 'DRAFT';
    this.provenance = data.provenance || null;
    this.evidence_refs = data.evidence_refs || data.evidence_ids || [];
    this.version = data.version || '1.0.0';
    this.supersedes_id = data.supersedes_id || null;
  }
}

/**
 * Audit Evidence Model
 */
export class Evidence {
  constructor(data) {
    if (!data) {
      throw new CalculationEngineError('INVALID_INPUT', 'Evidence parameters cannot be null');
    }
    this.evidence_id = data.evidence_id || data.id || `EVI-${Math.floor(Math.random() * 1000000)}`;
    this.evidence_type = data.evidence_type || null;
    this.title = data.title || null;
    this.source_ref = data.source_ref || data.file_path || null;
    this.source_doc_id = data.source_doc_id || null;
    
    // Coverage
    this.coverage_period = data.coverage_period || {
      start: data.period_start || null,
      end: data.period_end || null
    };
    
    this.facility_id = data.facility_id;
    this.process_id = data.process_id || null;
    this.activity_data_id = data.activity_data_id || null;
    
    this.provenance = data.provenance || null;
    this.evidence_state = data.evidence_state || 'EVIDENCE_REQUIRED';
    this.validation_state = data.validation_state || 'UNVERIFIED';
    this.approval_state = data.approval_state || 'DRAFT';
    this.version = data.version || '1.0.0';
    this.supersedes_id = data.supersedes_id || null;
  }
}

/**
 * Governed Activity Data and Evidence Workflow Controller
 */
export class ActivityEvidenceEngine {
  constructor() {
    this.controlledIssues = { ...CONTROLLED_ISSUES };
  }

  /**
   * Evaluates an ActivityData record against a CalculationPlan and supporting evidence list.
   * Performs rigorous check of quality, unit compatibility, temporal boundaries, and evidence.
   */
  validate(activityData, plan, evidenceList = [], options = {}) {
    const issues = [];
    const validation_results = {
      identity_valid: false,
      facility_matched: false,
      plan_linked: false,
      unit_compatibility: 'UNIT_UNKNOWN',
      quantity_valid: false,
      temporal_valid: false,
      provenance_complete: false,
      evidence_satisfied: false,
      evidence_validation_state: 'UNVERIFIED',
      evidence_approval_state: 'DRAFT',
      readiness: 'NOT_READY'
    };

    // Instantiate models to standardize structures
    const ad = activityData instanceof ActivityData ? activityData : new ActivityData(activityData);

    // 1. Identity validation
    if (!ad.activity_data_id) {
      issues.push({ level: 'ERROR', code: 'MISSING_IDENTITY', message: 'Thiếu định danh dữ liệu hoạt động' });
    } else {
      validation_results.identity_valid = true;
    }

    // 2. Quantity presence and validity (cannot default to 0)
    if (ad.quantity === undefined || ad.quantity === null) {
      issues.push({ level: 'ERROR', code: 'MISSING_QUANTITY', message: 'Lượng hoạt động không thể để trống' });
    } else if (typeof ad.quantity !== 'number' || isNaN(ad.quantity)) {
      issues.push({ level: 'ERROR', code: 'INVALID_QUANTITY_TYPE', message: 'Lượng hoạt động phải thuộc định dạng số' });
    } else if (ad.quantity < 0) {
      issues.push({ level: 'ERROR', code: 'NEGATIVE_QUANTITY', message: 'Lượng hoạt động không thể mang giá trị âm' });
    } else {
      validation_results.quantity_valid = true;
    }

    // Unit validation (cannot default to a standard unit)
    if (!ad.unit || ad.unit.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_UNIT', message: 'Thiếu đơn vị đo lường cơ bản' });
    }

    // Activity type validation (cannot default or infer type)
    if (!ad.activity_type || ad.activity_type.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_ACTIVITY_TYPE', message: 'Thiếu loại hoạt động phân loại' });
    }

    // Dates validation (cannot default to current date)
    const start = ad.activity_period ? ad.activity_period.start : null;
    const end = ad.activity_period ? ad.activity_period.end : null;
    if (!start || !end) {
      issues.push({ level: 'ERROR', code: 'MISSING_PERIOD', message: 'Thiếu khoảng thời gian hoạt động' });
    }

    // 3. Provenance checks
    if (!ad.provenance || !ad.provenance.source_ref || !ad.provenance.created_by) {
      issues.push({ level: 'ERROR', code: 'MISSING_PROVENANCE', message: 'Thiếu thông tin nguồn gốc dữ liệu (provenance)' });
    } else {
      validation_results.provenance_complete = true;
    }

    // 4. Plan Linkage checks
    if (!ad.calculation_plan_id) {
      issues.push({ level: 'ERROR', code: 'MISSING_PLAN_LINK', message: 'Dữ liệu hoạt động mồ côi (orphan) do thiếu liên kết CalculationPlan' });
    } else if (plan) {
      const planId = plan.plan_id || plan.id;
      if (ad.calculation_plan_id !== planId) {
        issues.push({ level: 'ERROR', code: 'PLAN_ID_MISMATCH', message: 'Mã kế hoạch tính toán liên kết không khớp' });
      } else {
        validation_results.plan_linked = true;
      }

      // Check facility match
      const planFacilityId = plan.facility_context ? (plan.facility_context.id || plan.facility_context.facility_id) : null;
      if (ad.facility_id && ad.facility_id === planFacilityId) {
        validation_results.facility_matched = true;
      } else {
        issues.push({ level: 'ERROR', code: 'FACILITY_MISMATCH', message: 'Mã cơ sở dữ liệu hoạt động không khớp với Kế hoạch tính toán' });
      }

      // Check expected unit compatibility vs plan step specifications
      let matchedStep = null;
      if (plan.steps && plan.steps.length > 0) {
        matchedStep = plan.steps.find(step => step.activity_type === ad.activity_type);
      }

      if (matchedStep && matchedStep.expected_unit) {
        if (ad.unit === matchedStep.expected_unit) {
          validation_results.unit_compatibility = 'UNIT_COMPATIBLE';
        } else {
          validation_results.unit_compatibility = 'UNIT_INCOMPATIBLE';
          issues.push({ level: 'ERROR', code: 'UNIT_INCOMPATIBLE', message: `Đơn vị đo lường ${ad.unit} không tương thích với yêu cầu ${matchedStep.expected_unit}` });
        }
      } else {
        validation_results.unit_compatibility = 'UNIT_UNKNOWN';
      }

      // Check temporal matching vs plan reporting_period
      if (plan.temporal_segment && plan.temporal_segment.reporting_period) {
        const repStart = plan.temporal_segment.reporting_period.start;
        const repEnd = plan.temporal_segment.reporting_period.end;

        if (start && end) {
          if (start >= repStart && end <= repEnd) {
            validation_results.temporal_valid = true;
          } else {
            issues.push({ level: 'ERROR', code: 'TEMPORAL_MISMATCH', message: 'Thời gian hoạt động nằm ngoài phạm vi kỳ báo cáo của kế hoạch' });
          }

          // Check if activity period crosses temporal transition boundaries (such as a circular effective date)
          const boundaryDate = '2026-09-25';
          if ((start < boundaryDate && end > boundaryDate)) {
            issues.push({
              level: 'WARNING',
              code: 'SEGMENTABLE',
              message: 'Dữ liệu hoạt động chồng lấn ranh giới hiệu lực quy chuẩn. Cần phân đoạn thời gian.',
              issue_id: 'ISSUE-TEMP-002'
            });
          }
        }
      }
    }

    // 5. Evidence Association and Sufficiency Checks
    // Filter and resolve evidence substantiation relationships
    const directlySubstantiated = evidenceList.filter(e => 
      ad.evidence_refs.includes(e.evidence_id || e.id) || e.activity_data_id === ad.activity_data_id
    );

    // Administrative-only relationship (facility matches but no direct substantiation reference)
    const administrativeEvidence = evidenceList.filter(e => 
      e.facility_id === ad.facility_id && 
      !ad.evidence_refs.includes(e.evidence_id || e.id) && 
      e.activity_data_id !== ad.activity_data_id
    );

    if (ad.evidence_refs.length === 0 && directlySubstantiated.length === 0) {
      issues.push({ level: 'ERROR', code: 'MISSING_EVIDENCE', message: 'Thiếu hồ sơ minh chứng hỗ trợ' });
    } else {
      let allApproved = true;
      let hasApproved = false;

      for (const ev of directlySubstantiated) {
        if (ev.approval_state === 'APPROVED' || ev.evidence_state === 'EVIDENCE_APPROVED') {
          hasApproved = true;
        } else {
          allApproved = false;
        }
      }

      if (directlySubstantiated.length > 0) {
        validation_results.evidence_satisfied = true;
        if (allApproved) {
          validation_results.evidence_approval_state = 'APPROVED';
          validation_results.evidence_validation_state = 'VERIFIED';
        } else {
          validation_results.evidence_approval_state = 'PENDING';
          issues.push({ level: 'ERROR', code: 'EVIDENCE_NOT_APPROVED', message: 'Hồ sơ minh chứng tồn tại nhưng chưa được phê duyệt' });
        }
      } else {
        issues.push({ level: 'ERROR', code: 'EVIDENCE_MISMATCH', message: 'Hồ sơ minh chứng được liên kết không khớp với các bằng chứng thực tế' });
      }
    }

    // 6. Approval and Quality gating to CALCULATION_READY
    let readiness = 'NOT_READY';
    if (ad.approval_state === 'REJECTED') {
      readiness = 'BLOCKED';
      issues.push({ level: 'ERROR', code: 'RECORD_REJECTED', message: 'Dữ liệu hoạt động bị bác bỏ (REJECTED)' });
    } else if (ad.approval_state === 'SUPERSEDED') {
      readiness = 'BLOCKED';
      issues.push({ level: 'ERROR', code: 'RECORD_SUPERSEDED', message: 'Dữ liệu hoạt động đã bị thay thế (SUPERSEDED)' });
    } else {
      const hasErrors = issues.some(i => i.level === 'ERROR');
      if (hasErrors) {
        readiness = 'BLOCKED';
      } else if (ad.approval_state === 'APPROVED' && validation_results.evidence_approval_state === 'APPROVED') {
        readiness = 'CALCULATION_READY';
      } else {
        readiness = 'REQUIRES_REVIEW';
      }
    }

    validation_results.readiness = readiness;

    return {
      isValid: issues.filter(i => i.level === 'ERROR').length === 0,
      readiness,
      validation_results,
      issues,
      directlySubstantiated: directlySubstantiated.map(e => e.evidence_id || e.id),
      administrativeEvidence: administrativeEvidence.map(e => e.evidence_id || e.id)
    };
  }

  /**
   * Conflict detection across candidate datasets
   */
  checkConflicts(activityDataList) {
    const conflicts = [];
    for (let i = 0; i < activityDataList.length; i++) {
      for (let j = i + 1; j < activityDataList.length; j++) {
        const ad1 = activityDataList[i];
        const ad2 = activityDataList[j];

        if (ad1.facility_id === ad2.facility_id && ad1.activity_type === ad2.activity_type) {
          const start1 = ad1.activity_period.start;
          const end1 = ad1.activity_period.end;
          const start2 = ad2.activity_period.start;
          const end2 = ad2.activity_period.end;

          const overlaps = (start1 < end2 && end1 > start2);
          if (overlaps) {
            if (ad1.quantity !== ad2.quantity || ad1.unit !== ad2.unit) {
              conflicts.push({
                code: 'CONFLICT_DETECTED',
                message: `Xung đột đo lường trùng lặp ranh giới thời gian: ${start1} - ${end1}`,
                records: [ad1.activity_data_id, ad2.activity_data_id],
                issue_id: 'ISSUE-RRM-001'
              });
            }
          }
        }
      }
    }
    return conflicts;
  }

  /**
   * Duplicate detection based on deterministic dimensions
   */
  checkDuplicates(activityDataList) {
    const duplicates = [];
    for (let i = 0; i < activityDataList.length; i++) {
      for (let j = i + 1; j < activityDataList.length; j++) {
        const ad1 = activityDataList[i];
        const ad2 = activityDataList[j];

        if (
          ad1.facility_id === ad2.facility_id &&
          ad1.activity_type === ad2.activity_type &&
          ad1.activity_period.start === ad2.activity_period.start &&
          ad1.activity_period.end === ad2.activity_period.end &&
          ad1.quantity === ad2.quantity &&
          ad1.unit === ad2.unit &&
          ad1.source_type === ad2.source_type
        ) {
          duplicates.push({
            code: 'DUPLICATE_RECORD',
            message: `Trùng lặp dữ liệu hoạt động hoàn toàn: ${ad1.activity_data_id} và ${ad2.activity_data_id}`,
            records: [ad1.activity_data_id, ad2.activity_data_id]
          });
        }
      }
    }
    return duplicates;
  }

  /**
   * Versioning and revision controls (Immutability support)
   */
  createNewVersion(oldRecord, updates) {
    const orig = oldRecord instanceof ActivityData ? oldRecord : new ActivityData(oldRecord);
    if (orig.approval_state === 'APPROVED') {
      // Create a superseded version and return the next major increment version
      const supersededRecord = new ActivityData({
        ...orig,
        approval_state: 'SUPERSEDED'
      });

      const parts = orig.version.split('.');
      const major = parseInt(parts[0], 10);
      const newVersionStr = `${major + 1}.0.0`;

      const newRecord = new ActivityData({
        ...orig,
        ...updates,
        version: newVersionStr,
        supersedes_id: orig.activity_data_id,
        approval_state: 'DRAFT',
        validation_state: 'UNVERIFIED'
      });

      return {
        superseded: supersededRecord,
        nextVersion: newRecord
      };
    } else {
      // In-place revision is permitted since it was not yet approved
      return {
        superseded: null,
        nextVersion: new ActivityData({
          ...orig,
          ...updates
        })
      };
    }
  }
}

export const activityEvidenceEngine = new ActivityEvidenceEngine();
