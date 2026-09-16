/**
 * ENERIX Carbon - Validation Engine
 * Performs strict QA/QC checks, anomaly detection, temporal validation, and data completeness checks.
 */
import { CalculationEngineError } from './calculation-engine.js';

export class ValidationEngine {
  validateActivityData(activityRecord, requestedMethodology = null) {
    const issues = [];

    if (!activityRecord) {
      throw new CalculationEngineError('INVALID_INPUT', 'Activity record cannot be empty');
    }

    // 1. Quantity Validation
    if (activityRecord.quantity === undefined || activityRecord.quantity === null) {
      issues.push({ level: 'ERROR', code: 'MISSING_QUANTITY', message: 'Lượng hoạt động không thể để trống' });
    } else if (typeof activityRecord.quantity !== 'number' || isNaN(activityRecord.quantity)) {
      issues.push({ level: 'ERROR', code: 'INVALID_QUANTITY_TYPE', message: 'Lượng hoạt động phải thuộc định dạng số' });
    } else if (activityRecord.quantity < 0) {
      issues.push({ level: 'ERROR', code: 'NEGATIVE_QUANTITY', message: 'Lượng hoạt động không thể mang giá trị âm' });
    } else if (activityRecord.quantity === 0) {
      issues.push({ level: 'WARNING', code: 'ZERO_QUANTITY', message: 'Lượng hoạt động bằng 0' });
    }

    // 2. Unit Validation
    if (!activityRecord.unit || activityRecord.unit.trim() === '') {
      issues.push({ level: 'ERROR', code: 'MISSING_UNIT', message: 'Thiếu đơn vị đo lường cơ bản' });
    }

    // 3. Evidence Trace Validation
    if (!activityRecord.evidence_refs || activityRecord.evidence_refs.length === 0) {
      issues.push({ level: 'WARNING', code: 'MISSING_EVIDENCE', message: 'Chưa liên kết hồ sơ/chứng từ minh chứng pháp lý' });
    }

    // 4. Temporal Alignment Checks
    if (activityRecord.event_date && requestedMethodology) {
      if (requestedMethodology.valid_from && activityRecord.event_date < requestedMethodology.valid_from) {
        issues.push({
          level: 'ERROR',
          code: 'OUT_OF_TEMPORAL_BOUND',
          message: `Ngày hoạt động ${activityRecord.event_date} sớm hơn thời hạn có hiệu lực của phương pháp luận (${requestedMethodology.valid_from})`
        });
      }
      if (requestedMethodology.valid_to && activityRecord.event_date >= requestedMethodology.valid_to) {
        issues.push({
          level: 'ERROR',
          code: 'OUT_OF_TEMPORAL_BOUND',
          message: `Ngày hoạt động ${activityRecord.event_date} vượt quá thời hạn có hiệu lực của phương pháp luận (${requestedMethodology.valid_to})`
        });
      }
    }

    return {
      isValid: issues.filter(i => i.level === 'ERROR').length === 0,
      issues
    };
  }

  // Anomaly Detection based on statistical boundaries
  detectAnomalies(activityRecord, historicalAverage = null, standardDeviation = null) {
    const alerts = [];
    if (historicalAverage !== null && standardDeviation !== null) {
      const quantity = activityRecord.quantity;
      const upperLimit = historicalAverage + 3 * standardDeviation;
      const lowerLimit = Math.max(0, historicalAverage - 3 * standardDeviation);

      if (quantity > upperLimit || quantity < lowerLimit) {
        alerts.push({
          level: 'WARNING',
          code: 'OUTLIER_DETECTED',
          message: `Lượng hoạt động vượt quá khoảng biến thiên thống kê 3-Sigma (${lowerLimit.toFixed(2)} - ${upperLimit.toFixed(2)})`
        });
      }
    }
    return alerts;
  }
}

export const validationEngine = new ValidationEngine();
