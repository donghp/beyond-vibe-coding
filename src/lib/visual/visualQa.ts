/**
 * BVC Master Visual Engine Architecture - Quality Assurance Rules
 * Standard: BVC MVEA-001 — LIGHT VISUAL CANVAS RULE
 * Standard: BVC SVOE — SEMANTIC STATE VISUALIZATION & CODE DISAMBIGUATION
 * Provenance:
 *   Prompt-ID: #000003
 *   Prompt-Title: BVC SVOE — SEMANTIC STATE VISUALIZATION / CURRENT STATE DETECTION
 * Rules:
 *   - VISUAL-BACKGROUND-CHECK
 *   - NO-BROKEN-VISUAL-ASSET
 *   - STATE-DETECTION
 *   - STATE-ENTITY-SEPARATION
 *   - STATE-VALUE-DETECTION
 *   - STATE-vs-CODE-DISAMBIGUATION
 *   - IMPLEMENTED-vs-VERIFIED-DISTINCTION
 *   - LIGHT-CANVAS
 *   - NO-BROKEN-ASSET
 */

import { BVC_MVEA_001_RULE, BVC_TOKENS } from './tokens';
import type { VisualAST } from './visualAst';
import { classifyCodeBlock, isStateBlock, isCodeSnippet } from './diagramClassifier';
import { parseDiagram } from './diagramParser';

export type VisualQaRule = 
  | 'VISUAL-BACKGROUND-CHECK' 
  | 'NO-BROKEN-VISUAL-ASSET'
  | 'STATE-DETECTION'
  | 'STATE-ENTITY-SEPARATION'
  | 'STATE-VALUE-DETECTION'
  | 'STATE-vs-CODE-DISAMBIGUATION'
  | 'IMPLEMENTED-vs-VERIFIED-DISTINCTION'
  | 'LIGHT-CANVAS'
  | 'NO-BROKEN-ASSET';

export interface VisualQaReport {
  rule: VisualQaRule;
  status: 'PASS' | 'FAIL';
  violations: string[];
  metadata?: Record<string, unknown>;
}

// Minimum relative luminance for a valid light canvas (0 to 1 scale)
export const APPROVED_LIGHT_LUMINANCE_THRESHOLD = 0.85;

/**
 * Calculates perceived relative luminance from a hex color code.
 */
export function getRelativeLuminance(hexColor: string): number {
  const cleanHex = hexColor.replace('#', '').trim();
  if (cleanHex.length !== 3 && cleanHex.length !== 6) {
    return 1.0; // Default fallback to light
  }

  const r = parseInt(cleanHex.length === 3 ? cleanHex[0] + cleanHex[0] : cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.length === 3 ? cleanHex[1] + cleanHex[1] : cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.length === 3 ? cleanHex[2] + cleanHex[2] : cleanHex.slice(4, 6), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * VISUAL-BACKGROUND-CHECK / LIGHT-CANVAS
 * FAIL if:
 * - background is black
 * - background is dark navy
 * - background luminance is below the approved light threshold
 * - dark outer frame is used as a decorative canvas
 * - technical visual relies on dark-card composition
 * 
 * PASS only when the primary visual canvas is white or approved pale/light tone.
 */
export function performVisualBackgroundCheck(input: {
  backgroundColor?: string;
  classNames?: string[];
  htmlOrSvgString?: string;
}): VisualQaReport {
  const violations: string[] = [];

  // Check explicit background color
  if (input.backgroundColor) {
    const bg = input.backgroundColor.trim().toLowerCase();
    
    // Check prohibited dark list
    const isProhibited = BVC_MVEA_001_RULE.prohibitedSurfaces.some(
      prohibited => bg === prohibited.toLowerCase() || bg.startsWith(prohibited.toLowerCase())
    );

    if (isProhibited) {
      violations.push(`Explicit background color '${input.backgroundColor}' is in the prohibited dark palette.`);
    }

    if (bg.startsWith('#') && (bg.length === 4 || bg.length === 7)) {
      const lum = getRelativeLuminance(bg);
      if (lum < APPROVED_LIGHT_LUMINANCE_THRESHOLD) {
        violations.push(`Background luminance ${lum.toFixed(3)} is below the required light threshold ${APPROVED_LIGHT_LUMINANCE_THRESHOLD}.`);
      }
    }
  }

  // Check prohibited class names
  if (input.classNames && input.classNames.length > 0) {
    const darkClasses = [
      'bg-black',
      'bg-slate-900',
      'bg-slate-950',
      'bg-slate-800',
      'bg-zinc-900',
      'bg-zinc-950',
      'bg-gray-900',
      'bg-gray-950',
      'bg-navy-900',
      'bg-navy-950',
      'bg-[#0b1d3a]',
      'bg-[#0B1D3A]',
      'bg-[#0f172a]',
      'bg-[#0a1128]',
    ];

    for (const cls of input.classNames) {
      if (darkClasses.some(darkCls => cls.includes(darkCls))) {
        violations.push(`Detected dark background utility class: '${cls}'.`);
      }
    }
  }

  // Check raw HTML/SVG content if supplied
  if (input.htmlOrSvgString) {
    const str = input.htmlOrSvgString;
    if (str.includes('fill="#000000"') || str.includes('fill="#000"') || str.includes('fill="black"')) {
      violations.push('SVG contains black background canvas or filled black container.');
    }
    const hasDarkRectBg = /<rect[^>]+(?:width=["']100%["']|height=["']100%["'])[^>]+fill=["'](#0B1D3A|#0b1d3a|#000|#000000|black|#0f172a|#0a1128)["']/i.test(str);
    if (hasDarkRectBg) {
      violations.push('SVG uses Deep Blue or dark tone as background canvas, violating BVC MVEA-001.');
    }
    if (str.includes('bg-slate-900') || str.includes('bg-navy-950') || str.includes('bg-black')) {
      violations.push('HTML structure contains dark card background.');
    }
  }

  return {
    rule: 'LIGHT-CANVAS',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      primaryBackground: BVC_MVEA_001_RULE.primaryBackground,
      approvedLightThreshold: APPROVED_LIGHT_LUMINANCE_THRESHOLD
    }
  };
}

/**
 * NO-BROKEN-VISUAL-ASSET / NO-BROKEN-ASSET
 */
export function performNoBrokenVisualAssetCheck(input: {
  assetPath?: string;
  existsOnDisk?: boolean;
  rawSvgContent?: string;
  altText?: string;
}): VisualQaReport {
  const violations: string[] = [];

  if (input.existsOnDisk === false) {
    violations.push(`Visual asset at '${input.assetPath}' failed to resolve on disk.`);
  }

  if (input.rawSvgContent) {
    const svg = input.rawSvgContent.trim();
    if (
      (svg.includes('fill="#ccc"') || svg.includes('fill="#cccccc"') || svg.includes('fill="#gray"')) &&
      !svg.includes('<text') &&
      !svg.includes('<path')
    ) {
      violations.push('Detected gray empty placeholder image box in SVG asset.');
    }

    if (svg.length < 150 && svg.includes('placeholder')) {
      violations.push('Detected placeholder marker in visual asset.');
    }
  }

  return {
    rule: 'NO-BROKEN-ASSET',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      assetPath: input.assetPath,
      resolved: input.existsOnDisk !== false
    }
  };
}

/**
 * STATE-DETECTION Check
 * Verifies that state expressions are classified as SEMANTIC_STATE and VG-STATE.
 */
export function performStateDetectionCheck(content: string): VisualQaReport {
  const violations: string[] = [];
  const classification = classifyCodeBlock(content);

  if (classification.diagramType !== 'VG-STATE') {
    violations.push(`Expected diagramType 'VG-STATE', got '${classification.diagramType}'.`);
  }
  if (classification.semanticClass !== 'SEMANTIC_STATE') {
    violations.push(`Expected semanticClass 'SEMANTIC_STATE', got '${classification.semanticClass}'.`);
  }

  return {
    rule: 'STATE-DETECTION',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      content,
      classifiedAs: classification
    }
  };
}

/**
 * STATE-ENTITY-SEPARATION Check
 * Verifies that the state expression is decomposed into distinct semantic entities
 * rather than treated as a single flat string.
 */
export function performStateEntitySeparationCheck(ast: VisualAST): VisualQaReport {
  const violations: string[] = [];

  if (!ast.state) {
    violations.push('AST is missing structured state entity.');
  } else {
    if (!ast.state.stateType || ast.state.stateType.trim().length === 0) {
      violations.push('State entity is missing stateType.');
    }
    if (!ast.state.primaryEntity || ast.state.primaryEntity.trim().length === 0) {
      violations.push('State entity is missing primaryEntity.');
    }
    if (!ast.state.stateValue || ast.state.stateValue.trim().length === 0) {
      violations.push('State entity is missing stateValue.');
    }
    if (ast.state.primaryEntity === ast.state.stateValue) {
      violations.push('primaryEntity and stateValue must be distinct entities.');
    }
  }

  return {
    rule: 'STATE-ENTITY-SEPARATION',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      state: ast.state
    }
  };
}

/**
 * STATE-VALUE-DETECTION Check
 * Verifies that the state value matches approved semantic states.
 */
export function performStateValueDetectionCheck(stateValue: string): VisualQaReport {
  const violations: string[] = [];
  const recognized = [
    'IMPLEMENTED',
    'NOT VERIFIED',
    'NOT_VERIFIED',
    'VERIFIED',
    'IN PROGRESS',
    'IN_PROGRESS',
    'BLOCKED',
    'COMPLETED',
    'FAILED',
    'PENDING',
    'UNKNOWN',
    'UNAVAILABLE'
  ];

  const upper = stateValue.trim().toUpperCase();
  if (!recognized.includes(upper)) {
    violations.push(`State value '${stateValue}' is not among recognized semantic states.`);
  }

  return {
    rule: 'STATE-VALUE-DETECTION',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      stateValue,
      normalized: upper
    }
  };
}

/**
 * STATE-vs-CODE-DISAMBIGUATION Check
 * Verifies that genuine code snippets vs state snapshots vs flows are distinguished.
 */
export function performCodeStateDisambiguationCheck(
  content: string, 
  expectedClass: 'CODE_SNIPPET' | 'SEMANTIC_STATE' | 'FLOW'
): VisualQaReport {
  const violations: string[] = [];
  const classification = classifyCodeBlock(content);

  if (classification.semanticClass !== expectedClass) {
    violations.push(`Expected classification '${expectedClass}', but got '${classification.semanticClass}'.`);
  }

  return {
    rule: 'STATE-vs-CODE-DISAMBIGUATION',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      expectedClass,
      actualClass: classification.semanticClass,
      diagramType: classification.diagramType
    }
  };
}

/**
 * IMPLEMENTED-vs-VERIFIED DISTINCTION Check
 * Verifies that IMPLEMENTED is distinct from VERIFIED and not automatically equated.
 */
export function performImplementedVsVerifiedDistinctionCheck(): VisualQaReport {
  const violations: string[] = [];

  const textImplemented = `DATABASE MIGRATION = IMPLEMENTED`;
  const textVerified = `DATABASE MIGRATION = VERIFIED`;
  const textNotVerified = `DATABASE MIGRATION = NOT VERIFIED`;

  const astImplemented = parseDiagram(textImplemented);
  const astVerified = parseDiagram(textVerified);
  const astNotVerified = parseDiagram(textNotVerified);

  if (astImplemented.state?.stateValue === astVerified.state?.stateValue) {
    violations.push('IMPLEMENTED and VERIFIED state values were conflated as equal.');
  }

  const statusImplemented = astImplemented.nodes.find(n => n.id === 'state-value')?.status;
  const statusVerified = astVerified.nodes.find(n => n.id === 'state-value')?.status;
  const statusNotVerified = astNotVerified.nodes.find(n => n.id === 'state-value')?.status;

  if (statusImplemented === statusVerified) {
    violations.push('IMPLEMENTED status and VERIFIED status must be distinct.');
  }

  if (statusNotVerified === statusVerified) {
    violations.push('NOT_VERIFIED status and VERIFIED status must be distinct.');
  }

  return {
    rule: 'IMPLEMENTED-vs-VERIFIED-DISTINCTION',
    status: violations.length === 0 ? 'PASS' : 'FAIL',
    violations,
    metadata: {
      statusImplemented,
      statusVerified,
      statusNotVerified
    }
  };
}

/**
 * Executes the complete acceptance suite from Section 12.
 */
export function runAllAcceptanceChecks(): Record<string, VisualQaReport> {
  // Example A:
  const exA = `Current State:\nDATABASE MIGRATION = IMPLEMENTED\nDATABASE`;
  const astA = parseDiagram(exA);

  // Example B:
  const exB = `DATABASE MIGRATION = NOT VERIFIED`;

  // Example C:
  const exC = `State:\nTASK = IN_PROGRESS`;

  // Example D:
  const exD = `Code:\n\ndef deploy():\nreturn release()`;

  // Example E:
  const exE = `CAPABILITY\n↓\nSTATE COMPATIBILITY\n↓\nVERIFICATION`;

  return {
    exampleA_detection: performStateDetectionCheck(exA),
    exampleA_separation: performStateEntitySeparationCheck(astA),
    exampleB_detection: performStateDetectionCheck(exB),
    exampleC_detection: performStateDetectionCheck(exC),
    exampleD_codeDisambiguation: performCodeStateDisambiguationCheck(exD, 'CODE_SNIPPET'),
    exampleE_flowDisambiguation: performCodeStateDisambiguationCheck(exE, 'FLOW'),
    implementedVsVerified: performImplementedVsVerifiedDistinctionCheck(),
    lightCanvas: performVisualBackgroundCheck({ backgroundColor: '#FFFFFF', classNames: ['bg-white'] })
  };
}

