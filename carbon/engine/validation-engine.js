/**
 * ENERIX Carbon - Validation Engine
 * Performs QA/QC checks, anomaly detection, and data completeness checks
 */
export class ValidationEngine {
  validateActivityData(activityRecord) {
    const issues = [];

    if (!activityRecord.quantity || activityRecord.quantity <= 0) {
      issues.push({ level: 'ERROR', code: 'INVALID_QUANTITY', message: 'Lượng hoạt động phải lớn hơn 0' });
    }

    if (!activityRecord.unit) {
      issues.push({ level: 'ERROR', code: 'MISSING_UNIT', message: 'Thiếu đơn vị đo lường' });
    }

    if (!activityRecord.evidence_ref) {
      issues.push({ level: 'WARNING', code: 'MISSING_EVIDENCE', message: 'Chưa đính kèm chứng từ minh chứng' });
    }

    return {
      isValid: issues.filter(i => i.level === 'ERROR').length === 0,
      issues
    };
  }
}

export const validationEngine = new ValidationEngine();
