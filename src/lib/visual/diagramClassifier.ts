// Prompt-ID: #000014
// Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE

/**
 * BVC Master Visual Design - Diagram Classifier & Code Block Disambiguation
 * VERSION: "3.0"
 * 
 * Deterministic classification of source blocks into semantic visual categories.
 * Standard: BVC SVOE — SEMANTIC STATE VISUALIZATION & CODE DISAMBIGUATION
 * Standard: BVC MVEA-001 — LIGHT VISUAL CANVAS RULE
 * Standard: SOURCE-PRESERVING ASCII ARCHITECTURE STANDARD
 * Provenance:
 *   Prompt-ID: #000014
 *   Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE
 */

import type { DiagramType } from './visualAst';

export type CodeBlockSemanticClass = 
  | 'CODE_SNIPPET'
  | 'TEXTUAL_ARCHITECTURE'
  | 'TEXTUAL_ENGINEERING_EXPRESSION'
  | 'SEMANTIC_STATE'
  | 'SEMANTIC_CONTRAST'
  | 'FLOW'
  | 'ARCHITECTURE'
  | 'CONFIGURATION'
  | 'SPECIFICATION'
  | 'DATA_STRUCTURE'
  | 'TEXT_ONLY';

export interface CodeBlockClassification {
  semanticClass: CodeBlockSemanticClass;
  diagramType: DiagramType;
}

const RECOGNIZED_STATE_VALUES = [
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

/**
 * Disambiguates whether a block represents real programming code.
 */
export function isCodeSnippet(content: string): boolean {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return false;

  // Explicit "Code:" label indicator
  if (/^code\s*[:]/i.test(lines[0])) {
    return true;
  }

  // Strong programming language patterns
  const codePatterns = [
    /^def\s+[a-zA-Z_0-9]+(\(.*\))?:?/i,
    /^return\s+/i,
    /^function\s+[a-zA-Z_0-9]+/i,
    /^const\s+[a-zA-Z_0-9]+\s*=/i,
    /^let\s+[a-zA-Z_0-9]+\s*=/i,
    /^var\s+[a-zA-Z_0-9]+\s*=/i,
    /^import\s+.*from/i,
    /^export\s+(default\s+)?(function|const|class|let)/i,
    /^class\s+[a-zA-Z_0-9]+/i,
    /^public\s+(static\s+)?(void|[a-zA-Z_0-9]+)/i,
    /^console\.log\(/i,
    /^if\s*\(.+\)\s*\{/i
  ];

  for (const line of lines) {
    if (codePatterns.some(pattern => pattern.test(line))) {
      return true;
    }
  }

  return false;
}

/**
 * Detects whether content represents TEXTUAL_ARCHITECTURE (ASCII architecture trees,
 * box-drawing branchings, fanouts) that must preserve raw text geometry.
 * 
 * Prompt-ID: #000012
 * Rule: TEXTUAL_ARCHITECTURE -> <pre class="bvc-textual-architecture"> with white-space: pre
 */
export function isTextualArchitecture(content: string): boolean {
  const trimmed = content.trim();
  if (!trimmed) return false;

  // 1. Check for tree connectors or box-drawing branchings
  if (content.includes('├──') || content.includes('└──') || content.includes('┌──') || content.includes('───┼───') || content.includes('┬') || content.includes('┴') || content.includes('├') || content.includes('┤')) {
    return true;
  }

  // 2. Multi-column 2D branchings (e.g. AI EXECUTOR, ENGINEERING METHOD / SEMANTIC CONTRACT / EXECUTOR ADAPTER)
  const upper = content.toUpperCase();
  if (upper.includes('AI EXECUTOR') && (content.includes('│') || content.includes('|') || content.includes('┌') || content.includes('↓'))) {
    return true;
  }
  if (upper.includes('ONE ENGINEERING SYSTEM') && (content.includes('│') || content.includes('├──') || content.includes('└──'))) {
    return true;
  }
  if (upper.includes('ENGINEERING METHOD') && upper.includes('SEMANTIC CONTRACT') && (content.includes('│') || content.includes('┌') || content.includes('┼') || upper.includes('ADAPTER'))) {
    return true;
  }

  // 3. Multi-line vertical pipe/box connectors with horizontal branches
  if (content.includes('│') && (content.includes('┌') || content.includes('├') || content.includes('┼') || content.includes('└──') || content.includes('├──'))) {
    return true;
  }

  return false;
}

/**
 * Detects whether a block represents semantic contrast (VG-COMPARISON).
 * e.g.
 * AI Capability
 * ≠
 * Project Continuity
 */
export function isSemanticContrast(content: string): boolean {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return false;

  // 3-line format: Entity A, Relation (≠, !=, VS), Entity B
  if (lines.length === 3) {
    const rel = lines[1].trim();
    if (rel === '≠' || rel === '!=' || rel.toUpperCase() === 'NOT EQUAL' || rel.toUpperCase() === 'VS' || rel === '<>' || rel.toUpperCase() === 'VS.') {
      return true;
    }
  }

  // Single line format or multi-line containing ≠
  if (content.includes('≠')) {
    return true;
  }

  if (trimmed.toUpperCase().includes(' VS ') || trimmed.toUpperCase().includes(' VS. ') || trimmed.toUpperCase().includes('CONTRAST:')) {
    return true;
  }

  if (content.includes('!=') && !isCodeSnippet(content)) {
    return true;
  }

  return false;
}

/**
 * Detects whether a block represents a textual engineering expression that must remain
 * in clean document/text flow (PDF-like presentation, no cards, no SVG, no dark blocks).
 * 
 * Prompt-ID: #000009
 * Rule: TEXTUAL_ENGINEERING_EXPRESSION -> TEXT ONLY
 */
export function isTextualEngineeringExpression(content: string): boolean {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return true;

  const upper = trimmed.toUpperCase();

  // 1. Explicit RUN sequences (RUN-010, RUN-011, RUN-012, Gemini, DeepSeek, Checkpoint, Handoff, Unavailable)
  if (upper.includes('RUN-') || upper.includes('GEMINI') || upper.includes('DEEPSEEK') || upper.includes('EXECUTOR C') || upper.includes('EXECUTOR D')) {
    if (upper.includes('CHECKPOINT') || upper.includes('HANDOFF') || upper.includes('UNAVAILABLE') || upper.includes('PROJECT VẪN TIẾP TỤC') || lines.some(l => l.startsWith('RUN-'))) {
      return true;
    }
  }

  // 2. Multi-AI architectural alignment and flow expressions
  // e.g. "Project ↓ Engineering Method ↓ Semantic Contract ↓ Executor Adapter ↓ AI Executor"
  if (upper.includes('ENGINEERING METHOD') && (upper.includes('SEMANTIC CONTRACT') || upper.includes('EXECUTION CONTRACT') || upper.includes('EXECUTOR ADAPTER') || upper.includes('AI EXECUTOR') || upper.includes('ONE PROJECT'))) {
    return true;
  }

  // 3. Delegation slogans / Principles
  // e.g. "ONE METHOD ↓ MULTIPLE EXECUTORS ↓ ONE PROJECT"
  // "Different Executors ↓ Same Project Semantics ↓ Same Governance ↓ Same State Model ↓ Same Verification"
  // "Prompt ↓ Interface"
  if (upper.includes('ONE METHOD') || upper.includes('MULTIPLE EXECUTORS') || upper.includes('DIFFERENT EXECUTORS') || upper.includes('SAME PROJECT SEMANTICS') || upper.includes('SAME GOVERNANCE') || upper.includes('SAME STATE MODEL') || upper.includes('SAME VERIFICATION')) {
    return true;
  }

  if (upper.includes('PROMPT') && upper.includes('INTERFACE') && lines.length <= 4) {
    return true;
  }

  // 4. Eligibility and Routing chains
  // e.g. "Cheapest AI ↓ Use it"
  // "Data Sensitivity ↓ Security Boundary ↓ Governance ↓ Capability ↓ State Compatibility ↓ Verification"
  // "Capability ↓ Quality / Risk ↓ Availability / Quota ↓ Effective Cost"
  if (upper.includes('CHEAPEST AI') || upper.includes('DATA SENSITIVITY') || upper.includes('SECURITY BOUNDARY') || upper.includes('EFFECTIVE COST') || upper.includes('STATE COMPATIBILITY')) {
    return true;
  }

  // 5. Method Compatibility Check and Method Lock
  // e.g. "METHOD COMPATIBILITY CHECK ↓ FAIL ↓ EXECUTION BLOCKED"
  // "engineering_method:\n id: ENERIX-EM\n version: '1.2'..."
  if (upper.includes('METHOD COMPATIBILITY CHECK') || upper.includes('EXECUTION BLOCKED') || upper.includes('ENGINEERING_METHOD:')) {
    return true;
  }

  // 6. Executor role action mappings
  // e.g. "Executor A → Analyze \n Executor B → Implement \n Executor C → Review \n Executor D → Verify"
  // "AI A → Proposal A \n AI B → Proposal B \n AI C → Proposal C"
  // "AI A → Risk A \n AI B → Risk B \n AI C → Risk C"
  const isMappingList = lines.every(l => 
    l.startsWith('Executor') || 
    l.startsWith('AI ') ||
    l.startsWith('→') || 
    l.includes('→') || 
    l.includes('->')
  );
  if (isMappingList && lines.length >= 1 && lines.length <= 10) {
    return true;
  }

  // 7. Multi-truth alignment
  // e.g. "ONE PROJECT STATE \n ONE KNOWLEDGE BASE \n ONE METHOD \n ONE GOVERNANCE"
  if (upper.includes('ONE PROJECT STATE') || upper.includes('ONE KNOWLEDGE BASE')) {
    return true;
  }

  // 8. Lifecycle & Discovery chains
  // e.g. "DISCOVERY ↓ PROPOSAL ↓ AUTHORIZED EXECUTION ↓ VERIFICATION ↓ STATE UPDATE"
  if (upper.includes('DISCOVERY') && upper.includes('PROPOSAL') && (upper.includes('AUTHORIZED EXECUTION') || upper.includes('STATE UPDATE'))) {
    return true;
  }

  // 9. Operational permissions / Command boundaries
  // e.g. "Process Engine \n Allowed: \n - inspect files \n - modify implementation \n - run tests \n Not Allowed: \n - change architecture"
  if (upper.includes('PROCESS ENGINE') || upper.includes('ALLOWED:') || upper.includes('NOT ALLOWED:') || lines.some(l => l.includes('- inspect files') || l.includes('- change architecture') || l.includes('- modify implementation'))) {
    return true;
  }

  // 10. State snapshot text (when written as text listings)
  if (upper.includes('CURRENT STATE:') && (upper.includes('DATABASE MIGRATION') || upper.includes('IMPLEMENTED') || upper.includes('NOT VERIFIED'))) {
    return true;
  }

  // 11. Generic short vertical arrow sequences (length <= 10) with text lines and single arrows
  const arrowCount = lines.filter(l => l === '↓' || l === '→' || l === '->' || l === '=>').length;
  if (arrowCount >= 1 && lines.length <= 12 && !content.includes('┌') && !content.includes('┼') && !content.includes('≠')) {
    return true;
  }

  return false;
}

/**
 * Detects whether content is low-value or must be preserved as TEXT_ONLY.
 * Rule: WHEN IN DOUBT, PRESERVE TEXT.
 */
export function isLowValueOrTextOnly(content: string): boolean {
  if (isTextualArchitecture(content)) {
    return false;
  }

  if (isTextualEngineeringExpression(content)) {
    return true;
  }

  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return true;

  // Simple metadata (ID, Version, Commit, Hash, Status, Path, Filename)
  const metadataKeys = ['ID:', 'VERSION:', 'COMMIT:', 'HASH:', 'STATUS:', 'PATH:', 'FILENAME:', 'SHA256:'];
  const metadataCount = lines.filter(l => metadataKeys.some(k => l.toUpperCase().startsWith(k))).length;
  if (metadataCount >= 2 && metadataCount >= lines.length - 2) {
    return true;
  }

  return false;
}

/**
 * Detects whether content represents high-value system architecture.
 */
export function isArchitectureBlock(content: string): { isArch: boolean; layout: DiagramType } {
  // Box-drawing architecture with explicit connection symbols
  if ((content.includes('┌') && content.includes('┐')) || (content.includes('┌') && content.includes('┼'))) {
    return { isArch: true, layout: 'VG-ARCH-FANOUT' };
  }

  if (content.includes('┌') || content.includes('─') || content.includes('│') || content.includes('┐')) {
    return { isArch: true, layout: 'VG-ARCHITECTURE' };
  }

  return { isArch: false, layout: 'PLAIN_TEXT' };
}

/**
 * Detects whether a block represents a semantic state snapshot (VG-STATE).
 */
export function isStateBlock(content: string): boolean {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return false;

  // Header signal: "State:", "Status:", "Trạng thái:"
  const stateHeaderRegex = /^(project\s+state|task\s+state|component\s+state|verification\s+state|trạng\s+thái)\s*[:]/i;
  
  if (stateHeaderRegex.test(lines[0])) {
    return true;
  }

  return false;
}

/**
 * Classifies a Markdown block or code block into its high-level semantic class and DiagramType.
 */
export function classifyCodeBlock(content: string): CodeBlockClassification {
  const trimmed = content.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    return { semanticClass: 'TEXT_ONLY', diagramType: 'PLAIN_TEXT' };
  }

  // 1. Check for genuine code snippet first
  if (isCodeSnippet(trimmed)) {
    return { semanticClass: 'CODE_SNIPPET', diagramType: 'CODE' };
  }

  // 2. Semantic contrast: "AI Capability ≠ Project Continuity" (High value contrast visual)
  if (isSemanticContrast(trimmed)) {
    return { semanticClass: 'SEMANTIC_CONTRAST', diagramType: 'VG-COMPARISON' };
  }

  // 3. Textual Architecture: 2D ASCII trees, box-drawings, fanouts (Must preserve exact text geometry)
  if (isTextualArchitecture(trimmed)) {
    return { semanticClass: 'TEXTUAL_ARCHITECTURE', diagramType: 'PLAIN_TEXT' };
  }

  // 4. Textual engineering expressions (Must remain pure text, PDF-like, white canvas)
  if (isTextualEngineeringExpression(trimmed)) {
    return { semanticClass: 'TEXTUAL_ENGINEERING_EXPRESSION', diagramType: 'PLAIN_TEXT' };
  }

  // 5. Low-value or spec blocks that MUST default to TEXT_ONLY
  if (isLowValueOrTextOnly(trimmed)) {
    return { semanticClass: 'TEXT_ONLY', diagramType: 'PLAIN_TEXT' };
  }

  // 6. Semantic state
  if (isStateBlock(trimmed)) {
    return { semanticClass: 'SEMANTIC_STATE', diagramType: 'VG-STATE' };
  }

  // 7. Architecture: Top-down, Fan-out, Box-drawing
  const arch = isArchitectureBlock(trimmed);
  if (arch.isArch) {
    return { semanticClass: 'ARCHITECTURE', diagramType: arch.layout };
  }

  // 8. Progression / Ladder
  if (content.toUpperCase().includes('LEVEL') && lines.length >= 3) {
    return { semanticClass: 'FLOW', diagramType: 'VG-LADDER' };
  }

  // 9. Data structure / Checklist
  if (content.includes('[PASS]') || content.includes('[FAIL]') || content.includes('[ ]')) {
    return { semanticClass: 'DATA_STRUCTURE', diagramType: 'VG-CHECKLIST' };
  }

  // 10. Technical illustrations (RAG, Chunking, Evidence, etc.)
  if (content.toUpperCase().includes('RETRIEVER') || 
      (content.toUpperCase().includes('VECTOR STORE') && content.toUpperCase().includes('EMBEDDING'))) {
    return { semanticClass: 'DATA_STRUCTURE', diagramType: 'VG-RAG' };
  }

  if (content.toUpperCase().includes('CHUNKING') || 
      (content.toUpperCase().includes('TEXT') && content.toUpperCase().includes('CHUNK'))) {
    const dType = content.toUpperCase().includes('RECURSIVE') ? 'VG-RECURSIVE-CHUNKING' : 'VG-CHUNKING';
    return { semanticClass: 'DATA_STRUCTURE', diagramType: dType };
  }

  if (content.toUpperCase().includes('EVIDENCE') && content.toUpperCase().includes('AUTHORITY')) {
    return { semanticClass: 'DATA_STRUCTURE', diagramType: 'VG-EVIDENCE' };
  }

  // Default: When in doubt, preserve text!
  return { semanticClass: 'TEXT_ONLY', diagramType: 'PLAIN_TEXT' };
}

/**
 * Main classification entrypoint used by parser and renderers.
 */
export function classifyDiagram(content: string): DiagramType {
  const result = classifyCodeBlock(content);
  return result.diagramType;
}



