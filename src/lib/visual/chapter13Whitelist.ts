// Prompt-ID: #000010
// Prompt-Title: BVC CHAPTER 13 — STRICT 7-VISUAL LOCK / APPROVED VISUAL WHITELIST / TEXT-ONLY EVERYTHING ELSE

/**
 * BVC Chapter 13 Visual Governance - Strict Whitelist Configuration
 * VERSION: "1.0"
 * STATUS: AUTHOR-LOCKED
 * 
 * Enforces:
 * - EXACTLY 7 Approved Visuals for Chapter 13 (V13-01 to V13-07)
 * - Strict Whitelist Mode (unapprovedVisualBehavior: render: false)
 * - Zero auto-generated diagrams or unapproved SVGs
 * - Zero dark code blocks (all non-approved content is TEXT ONLY)
 */

export interface ChapterVisualPolicy {
  chapter: number;
  mode: 'STRICT_WHITELIST' | 'STANDARD_SVOE';
  maxRenderedVisuals: number;
  allowedVisualIds: string[];
  autoVisualization: {
    enabled: boolean;
  };
  autoCandidateRendering: {
    enabled: boolean;
  };
  unapprovedVisualBehavior: {
    render: boolean;
  };
  unknownVisualBehavior: {
    render: boolean;
  };
}

export const CHAPTER_13_VISUAL_POLICY: ChapterVisualPolicy = {
  chapter: 13,
  mode: 'STRICT_WHITELIST',
  maxRenderedVisuals: 7,
  allowedVisualIds: [
    'V13-01',
    'V13-02',
    'V13-03',
    'V13-04',
    'V13-05',
    'V13-06',
    'V13-07'
  ],
  autoVisualization: {
    enabled: false
  },
  autoCandidateRendering: {
    enabled: false
  },
  unapprovedVisualBehavior: {
    render: false
  },
  unknownVisualBehavior: {
    render: false
  }
};

export interface ApprovedVisualSpec {
  id: string;
  figId: string;
  figType: string;
  title: string;
  purpose: string;
  sourceAsset?: string;
  caption: string;
  status: 'APPROVED';
}

export const CHAPTER_13_APPROVED_VISUALS: Record<string, ApprovedVisualSpec> = {
  'V13-01': {
    id: 'V13-01',
    figId: '13.1',
    figType: 'COMPARISON',
    title: 'AI Capability ≠ Project Continuity',
    purpose: 'Show that AI capability and project continuity are two independent concepts and must not be conflated.',
    caption: 'AI Capability và Project Continuity là hai trục độc lập trong kiến trúc engineering.',
    status: 'APPROVED'
  },
  'V13-02': {
    id: 'V13-02',
    figId: '13.2',
    figType: 'ARCHITECTURE',
    title: 'One Method. Multiple Executors. One Project',
    purpose: 'Demonstrate shared engineering method with multiple executors while preserving one continuous project state.',
    sourceAsset: 'v13-02.svg',
    caption: 'Một Method duy nhất điều phối nhiều Executor khác nhau mà không làm mất tính liên tục của Project.',
    status: 'APPROVED'
  },
  'V13-03': {
    id: 'V13-03',
    figId: '13.3',
    figType: 'GATE',
    title: 'Executor Eligibility Gate',
    purpose: 'Eligibility must be checked before execution.',
    sourceAsset: 'v13-03.svg',
    caption: 'Kiểm tra điều kiện hợp lệ của Executor trước khi cho phép nhận quyền thực thi.',
    status: 'APPROVED'
  },
  'V13-04': {
    id: 'V13-04',
    figId: '13.4',
    figType: 'ARCHITECTURE',
    title: 'Engineering Method and Executor Adapter',
    purpose: 'Demonstrate stable engineering method with provider/runtime-specific adapter.',
    sourceAsset: 'v13-05.svg',
    caption: 'Engineering Method giữ vai trò ổn định, Executor Adapter xử lý đặc thù của từng provider.',
    status: 'APPROVED'
  },
  'V13-05': {
    id: 'V13-05',
    figId: '13.5',
    figType: 'GOVERNANCE',
    title: 'Multiple Proposals, One Authorized Change',
    purpose: 'Multiple AI systems may propose changes, but only one authorized change enters the canonical execution path.',
    sourceAsset: 'v13-07.svg',
    caption: 'Nhiều AI có thể tự do đề xuất thay đổi, nhưng chỉ một thay đổi được xác thực qua Single-Writer Gate.',
    status: 'APPROVED'
  },
  'V13-06': {
    id: 'V13-06',
    figId: '13.6',
    figType: 'GATE',
    title: 'Controlled Continuation Gate',
    purpose: 'Continuation only occurs when required conditions pass.',
    sourceAsset: 'v13-11.svg',
    caption: 'Quá trình tiếp tục thực thi chỉ diễn ra khi tất cả các điều kiện an toàn và tính toàn vẹn được thỏa mãn.',
    status: 'APPROVED'
  },
  'V13-07': {
    id: 'V13-07',
    figId: '13.7',
    figType: 'CONTINUITY',
    title: 'Handoff Primitive',
    purpose: 'State synchronization makes executor substitution and continuation possible.',
    sourceAsset: 'v13-12.svg',
    caption: 'Đồng bộ hóa trạng thái thông qua Handoff Primitive cho phép thay thế Executor mà không mất mát ngữ cảnh.',
    status: 'APPROVED'
  }
};

/**
 * Checks if a visual ID is in the Chapter 13 whitelist.
 */
export function isChapter13VisualApproved(visualId: string): boolean {
  return CHAPTER_13_VISUAL_POLICY.allowedVisualIds.includes(visualId);
}

/**
 * Matches an SVG source file from Chapter 13 markdown to its approved visual specification.
 */
export function matchChapter13SvgToVisual(svgSrc: string): ApprovedVisualSpec | undefined {
  const normalized = svgSrc.toLowerCase();
  
  if (normalized.includes('v13-02')) return CHAPTER_13_APPROVED_VISUALS['V13-02'];
  if (normalized.includes('v13-03')) return CHAPTER_13_APPROVED_VISUALS['V13-03'];
  if (normalized.includes('v13-05')) return CHAPTER_13_APPROVED_VISUALS['V13-04'];
  if (normalized.includes('v13-07')) return CHAPTER_13_APPROVED_VISUALS['V13-05'];
  if (normalized.includes('v13-11')) return CHAPTER_13_APPROVED_VISUALS['V13-06'];
  if (normalized.includes('v13-12')) return CHAPTER_13_APPROVED_VISUALS['V13-07'];
  
  // Unapproved visuals (such as v13-09, v13-08, etc.) return undefined -> text only
  return undefined;
}

