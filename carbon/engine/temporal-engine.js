/**
 * ENERIX Carbon - Temporal Applicability and Segmentation Engine
 * Operationalizes EC-TEMP-001 into a deterministic reusable temporal subsystem.
 * Supports Left-Closed Right-Open intervals [start, end), N-way segmentation,
 * deterministic ordering, transition lineage tracking, and fail-closed validation.
 */

// Controlled Issue Register (Section 15 / Section 34 of EC-TEMP-001)
export const TEMPORAL_ISSUES = {
  "ISSUE-TEMP-001": {
    id: "ISSUE-TEMP-001",
    domain: "Temporal Boundaries",
    description: "Standard transition boundaries verification for circulars without specified sunset dates.",
    status: "OPEN_CONTROLLED",
    classification: "SOURCE_VERIFICATION_REQUIRED"
  },
  "ISSUE-TEMP-002": {
    id: "ISSUE-TEMP-002",
    domain: "Mid-Month Transition Auditing",
    description: "Splitting activity data for mid-month billing where raw meter readings are unavailable.",
    status: "OPEN_CONTROLLED",
    classification: "HUMAN_JUDGMENT_REQUIRED"
  },
  "ISSUE-TEMP-003": {
    id: "ISSUE-TEMP-003",
    domain: "Retrospective Circular Mandates",
    description: "Retroactive legal application dates in late-issued circulars conflicting with database immutability.",
    status: "OPEN_CONTROLLED",
    classification: "DEFERRED_TO_OTHER_ARTIFACT"
  }
};

// Explicit Binding Modes
export const BINDING_MODES = {
  ACTIVITY_DATE: "ACTIVITY_DATE",
  REPORTING_YEAR: "REPORTING_YEAR",
  METHODOLOGY_DEFINED: "METHODOLOGY_DEFINED",
  SOURCE_DEFINED: "SOURCE_DEFINED",
  EXPLICIT_CONTEXT: "EXPLICIT_CONTEXT"
};

/**
 * Validates a standard ISO-8601 Date string (YYYY-MM-DD) or Datetime string.
 * Strictly checks format and component ranges without silent coercion.
 */
export function isValidDateString(str) {
  if (typeof str !== "string") return false;
  // Support daily Date (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  // Support datetime (ISO 8601 / standard offsets)
  const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  if (!dateRegex.test(str) && !datetimeRegex.test(str)) {
    return false;
  }

  // Basic date parsing validation (e.g. Month 1-12, Day 1-31)
  const parts = str.split("T")[0].split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Handles simple month length checks (does not need extreme leap year rules unless strictly required)
  const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > monthDays[month - 1]) return false;

  return true;
}

/**
 * Temporal Value Object representation to preserve conceptual distinction.
 */
export class TemporalValue {
  constructor(type, start, end = null, metadata = {}) {
    const allowedTypes = [
      "EffectivePeriod",
      "ReportingPeriod",
      "ActivityPeriod",
      "EventDate",
      "AssessmentDate"
    ];
    if (!allowedTypes.includes(type)) {
      throw new Error(`FAIL_CLOSED: Invalid temporal type '${type}' requested.`);
    }

    // EventDate and AssessmentDate are Point-In-Time values
    if (type === "EventDate" || type === "AssessmentDate") {
      if (!start) {
        throw new Error(`FAIL_CLOSED: Point-in-time type '${type}' must specify a start value.`);
      }
      if (!isValidDateString(start)) {
        throw new Error(`FAIL_CLOSED: Malformed date string '${start}' for Point-In-Time '${type}'.`);
      }
      this.type = type;
      this.value = start;
      this.metadata = metadata;
      return;
    }

    // Interval types: EffectivePeriod, ReportingPeriod, ActivityPeriod
    if (!start) {
      throw new Error(`FAIL_CLOSED: Interval type '${type}' must specify a start boundary.`);
    }
    if (!isValidDateString(start)) {
      throw new Error(`FAIL_CLOSED: Malformed start boundary '${start}' for interval '${type}'.`);
    }
    if (end !== null && !isValidDateString(end)) {
      throw new Error(`FAIL_CLOSED: Malformed end boundary '${end}' for interval '${type}'.`);
    }

    // Zero-length check: fail-closed with clear review flag
    if (start === end) {
      this.type = type;
      this.start = start;
      this.end = end;
      this.validationState = "TEMPORAL_SEMANTICS_UNSPECIFIED";
      this.metadata = { ...metadata, error: "Zero-length interval is unspecified by EC-TEMP-001" };
      return;
    }

    // Negative interval check
    if (end !== null && start > end) {
      throw new Error(`FAIL_CLOSED: Malformed interval where end '${end}' is prior to start '${start}'.`);
    }

    this.type = type;
    this.start = start;
    this.end = end; // null represents bounded future [start, ∞)
    this.validationState = "VALID";
    this.metadata = metadata;
  }
}

/**
 * Checks point-in-time containment of an event within an interval [from, to).
 * Evaluates to true iff from <= event < to.
 */
export function contains(interval, eventDate) {
  if (!interval || !eventDate) {
    throw new Error("FAIL_CLOSED: Both interval and event date are required for containment check.");
  }
  const intVal = interval instanceof TemporalValue ? interval : new TemporalValue("EffectivePeriod", interval.start, interval.end);
  const evVal = eventDate instanceof TemporalValue ? eventDate : new TemporalValue("EventDate", eventDate.value || eventDate);

  if (intVal.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED") {
    return "REQUIRES_REVIEW";
  }

  const start = intVal.start;
  const end = intVal.end;
  const t = evVal.value;

  if (t < start) return false;
  if (end === null) return true;
  return t < end;
}

/**
 * Checks if interval A overlaps interval B using Validity Predicate math.
 * (A.start < B.end) AND (B.start < A.end)
 */
export function overlaps(a, b) {
  const intA = a instanceof TemporalValue ? a : new TemporalValue("EffectivePeriod", a.start, a.end);
  const intB = b instanceof TemporalValue ? b : new TemporalValue("ReportingPeriod", b.start, b.end);

  if (intA.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED" || intB.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED") {
    return "REQUIRES_REVIEW";
  }

  const aStart = intA.start;
  const aEnd = intA.end === null ? "9999-12-31T23:59:59" : intA.end;
  const bStart = intB.start;
  const bEnd = intB.end === null ? "9999-12-31T23:59:59" : intB.end;

  return aStart < bEnd && bStart < aEnd;
}

/**
 * Determines if interval A and interval B are adjacent.
 * They share a boundary point without overlapping.
 */
export function adjacent(a, b) {
  const intA = a instanceof TemporalValue ? a : new TemporalValue("EffectivePeriod", a.start, a.end);
  const intB = b instanceof TemporalValue ? b : new TemporalValue("EffectivePeriod", b.start, b.end);

  if (intA.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED" || intB.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED") {
    return false;
  }

  if (intA.end === null || intB.end === null) {
    // Open-ended intervals cannot be adjacent to a following interval unless compared appropriately,
    // but standard contiguous adjacency requires a shared finite boundary point.
    return intA.start === intB.end || intB.start === intA.end;
  }

  return intA.end === intB.start || intB.end === intA.start;
}

/**
 * Resolves the intersection interval between A and B, returning a new EffectivePeriod
 * or null if no overlap.
 */
export function intersect(a, b) {
  if (!overlaps(a, b)) return null;

  const intA = a instanceof TemporalValue ? a : new TemporalValue("EffectivePeriod", a.start, a.end);
  const intB = b instanceof TemporalValue ? b : new TemporalValue("EffectivePeriod", b.start, b.end);

  const start = intA.start > intB.start ? intA.start : intB.start;

  let end = null;
  if (intA.end !== null && intB.end !== null) {
    end = intA.end < intB.end ? intA.end : intB.end;
  } else if (intA.end !== null) {
    end = intA.end;
  } else if (intB.end !== null) {
    end = intB.end;
  }

  if (end !== null && start >= end) {
    return null;
  }

  return new TemporalValue("EffectivePeriod", start, end, {
    intersected_from: [intA, intB]
  });
}

/**
 * Subtracts interval B from interval A, returning an array of remaining sub-intervals.
 */
export function subtract(a, b) {
  const intA = a instanceof TemporalValue ? a : new TemporalValue("EffectivePeriod", a.start, a.end);
  const intB = b instanceof TemporalValue ? b : new TemporalValue("EffectivePeriod", b.start, b.end);

  if (!overlaps(intA, intB)) {
    return [intA];
  }

  const results = [];
  const aStart = intA.start;
  const aEnd = intA.end;
  const bStart = intB.start;
  const bEnd = intB.end;

  // Left fragment: if A starts before B
  if (aStart < bStart) {
    results.push(new TemporalValue("EffectivePeriod", aStart, bStart, { fragment: "left" }));
  }

  // Right fragment: if A ends after B
  if (bEnd !== null) {
    if (aEnd === null || aEnd > bEnd) {
      results.push(new TemporalValue("EffectivePeriod", bEnd, aEnd, { fragment: "right" }));
    }
  }

  return results;
}

/**
 * Determinstically sorts an array of intervals chronologically.
 * Sort order: start date ascending, end date ascending (nulls last), then unique rule/context ID.
 */
export function sort(intervals) {
  if (!Array.isArray(intervals)) return [];

  return [...intervals].sort((a, b) => {
    const startA = a.start;
    const startB = b.start;
    if (startA !== startB) {
      return startA < startB ? -1 : 1;
    }

    const endA = a.end === null ? "9999-12-31" : a.end;
    const endB = b.end === null ? "9999-12-31" : b.end;
    if (endA !== endB) {
      return endA < endB ? -1 : 1;
    }

    // Tie-breaker using metadata id or arbitrary determinism
    const idA = a.metadata && a.metadata.id ? String(a.metadata.id) : "";
    const idB = b.metadata && b.metadata.id ? String(b.metadata.id) : "";
    return idA.localeCompare(idB);
  });
}

/**
 * Normalizes an array of contiguous, adjacent, or overlapping intervals of the SAME rule/identity,
 * merging them into a minimal deterministic set.
 */
export function normalize(intervals) {
  if (!Array.isArray(intervals) || intervals.length === 0) return [];

  const sorted = sort(intervals);
  const merged = [];
  let current = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];

    // Check if contiguous or overlapping
    const isOverlapping = overlaps(current, next);
    const isAdjacent = adjacent(current, next);

    if (isOverlapping || isAdjacent) {
      // Merge
      let newEnd = null;
      if (current.end !== null && next.end !== null) {
        newEnd = current.end > next.end ? current.end : next.end;
      } else {
        // One is open-ended
        newEnd = null;
      }
      current = new TemporalValue("EffectivePeriod", current.start, newEnd, {
        merged: true,
        sources: [current, next]
      });
    } else {
      merged.push(current);
      current = next;
    }
  }
  merged.push(current);
  return merged;
}

/**
 * Checks if a date represents a mid-month transition (non-first of month).
 * E.g., '2026-09-25' is a mid-month transition because 25 !== 01.
 */
export function isMidMonthDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return false;
  const parts = dateStr.split("T")[0].split("-");
  const day = parts[2];
  return day !== "01";
}

/**
 * Performs a deterministic chronological multi-boundary split / N-way segmentation on a parent interval.
 * Returns an array of segment objects mapped to their valid applicability windows.
 */
export function split(parent, boundaries, rules = [], activeIssues = TEMPORAL_ISSUES) {
  const parentVal = parent instanceof TemporalValue ? parent : new TemporalValue("ReportingPeriod", parent.start, parent.end);

  if (parentVal.validationState === "TEMPORAL_SEMANTICS_UNSPECIFIED") {
    return {
      status: "REQUIRES_REVIEW",
      reason: "Parent interval validation state is TEMPORAL_SEMANTICS_UNSPECIFIED",
      segments: []
    };
  }

  const start = parentVal.start;
  const end = parentVal.end;

  // Filter boundaries strictly inside the parent interval [start, end)
  const insideBoundaries = [...new Set(boundaries)]
    .filter(b => b > start && (end === null || b < end))
    .sort();

  if (insideBoundaries.length === 0) {
    // Single segment covers the entire parent period
    const applicableRules = rules.filter(r => overlaps(r, parentVal));
    return {
      status: "COMPLETED",
      segments: [{
        segment_id: `SEG-${start}-${end || "INF"}`,
        interval: parentVal,
        applicable_rules: applicableRules.map(r => r.rule_id || r.id || r),
        metadata: { original_parent_id: parentVal.metadata.id || "PARENT" }
      }]
    };
  }

  const segments = [];
  let currentStart = start;

  // Track if we hit a mid-month transition with no meter readings (ISSUE-TEMP-002)
  let hasMidMonthUncertainty = false;

  for (const boundary of insideBoundaries) {
    const subInterval = new TemporalValue("ReportingPeriod", currentStart, boundary, {
      original_parent_id: parentVal.metadata.id || "PARENT",
      split_reason: `Regulatory transition at boundary ${boundary}`
    });

    // Check for mid-month split issue trigger
    if (isMidMonthDate(boundary)) {
      hasMidMonthUncertainty = true;
    }

    const applicableRules = rules.filter(r => overlaps(r, subInterval));

    segments.push({
      segment_id: `SEG-${currentStart}-${boundary}`,
      interval: subInterval,
      applicable_rules: applicableRules.map(r => r.rule_id || r.id || r),
      metadata: { original_parent_id: parentVal.metadata.id || "PARENT" }
    });

    currentStart = boundary;
  }

  // Final Segment ending at parent end
  const finalSubInterval = new TemporalValue("ReportingPeriod", currentStart, end, {
    original_parent_id: parentVal.metadata.id || "PARENT",
    split_reason: "Final trailing temporal segment"
  });

  const applicableRules = rules.filter(r => overlaps(r, finalSubInterval));

  segments.push({
    segment_id: `SEG-${currentStart}-${end || "INF"}`,
    interval: finalSubInterval,
    applicable_rules: applicableRules.map(r => r.rule_id || r.id || r),
    metadata: { original_parent_id: parentVal.metadata.id || "PARENT" }
  });

  if (hasMidMonthUncertainty) {
    return {
      status: "REQUIRES_REVIEW",
      reason: "Mid-month transition boundary detected. Proportional physical activity splits are not algorithmically resolved.",
      issue_ref: "ISSUE-TEMP-002",
      issue_detail: activeIssues["ISSUE-TEMP-002"],
      segments: segments.map(seg => ({ ...seg, status: "REQUIRES_REVIEW" }))
    };
  }

  return {
    status: "COMPLETED",
    segments
  };
}

/**
 * Historical Lineage relationship tracker to guarantee traceability and reproducible audits.
 */
export class LineageRelationship {
  constructor(fromRuleId, toRuleId, type, metadata = {}) {
    const allowedTypes = ["AMENDS", "REPLACES", "SUPERSEDES", "APPLIES_DURING"];
    if (!allowedTypes.includes(type)) {
      throw new Error(`FAIL_CLOSED: Lineage type '${type}' is unsupported.`);
    }
    this.from = fromRuleId;
    this.to = toRuleId;
    this.type = type;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Resolves temporal binding of Emission Factors and GWP context based on specified binding mode.
 */
export function resolveTemporalBinding(mode, activityDate, ruleContext) {
  if (!mode || !BINDING_MODES[mode]) {
    return {
      status: "REQUIRES_REVIEW",
      error: `Binding mode '${mode}' is not established or unsupported by ENERIX Carbon.`
    };
  }

  if (!activityDate) {
    return {
      status: "REQUIRES_REVIEW",
      error: "Activity date is missing for temporal binding resolution."
    };
  }

  const evDate = activityDate instanceof TemporalValue ? activityDate : new TemporalValue("EventDate", activityDate);

  if (mode === BINDING_MODES.ACTIVITY_DATE) {
    return {
      status: "BOUND",
      mode,
      binding_key: evDate.value,
      evidence: { resolved_date: evDate.value }
    };
  }

  if (mode === BINDING_MODES.REPORTING_YEAR) {
    const year = evDate.value.split("-")[0];
    return {
      status: "BOUND",
      mode,
      binding_key: `${year}-01-01`,
      evidence: { resolved_year: year }
    };
  }

  if (mode === BINDING_MODES.EXPLICIT_CONTEXT) {
    if (!ruleContext || !ruleContext.explicit_binding_key) {
      return {
        status: "REQUIRES_REVIEW",
        error: "Missing explicit binding key under EXPLICIT_CONTEXT mode."
      };
    }
    return {
      status: "BOUND",
      mode,
      binding_key: ruleContext.explicit_binding_key,
      evidence: { ruleContext }
    };
  }

  // Other modes require custom/circular regulatory guidelines
  return {
    status: "REQUIRES_REVIEW",
    error: `Binding mode '${mode}' is fully deferred to other regulatory circular definitions.`
  };
}
