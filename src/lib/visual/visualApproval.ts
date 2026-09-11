// Prompt-ID: #000014
// Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE

/**
 * BVC Master Visual Design - Visual Approval Gate & Budget Manager
 * VERSION: "3.0"
 * 
 * Enforces:
 * - Author Approval Gate (No unapproved visual rendered)
 * - Chapter 13 Strict 7-Visual Lock (V13-01 to V13-07)
 * - Low-Value Visual Suppression (TEXT_ONLY preservation)
 * - TEXTUAL_ENGINEERING_EXPRESSION PDF-like text presentation
 * 
 * Canonical Source: /docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md
 * Provenance:
 *   Prompt-ID: #000014
 *   Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE
 */

import type { VisualCandidate, DiagramType } from './visualAst';
import { classifyCodeBlock, isLowValueOrTextOnly, isCodeSnippet, isTextualEngineeringExpression } from './diagramClassifier';
import { CHAPTER_13_VISUAL_POLICY, isChapter13VisualApproved } from './chapter13Whitelist';

export const MAX_VISUALS_PER_CHAPTER = 7;

/**
 * Explicit registry of chapter visual candidates and author decisions.
 */
export const CHAPTER_VISUAL_REGISTRY: Record<string, VisualCandidate[]> = {
  '13': [
    {
      id: 'V13-01',
      chapterId: '13',
      sourceSection: 'Tôi đã từng nghĩ model mạnh hơn sẽ giải quyết mọi thứ',
      rawContent: 'AI Capability\n≠\nProject Continuity',
      semanticClass: 'SEMANTIC_CONTRAST',
      diagramType: 'VG-COMPARISON',
      recommendedGrammar: 'VG-COMPARISON',
      reason: 'Foundational philosophical thesis of Chapter 13: Capability vs Continuity',
      confidence: 0.98,
      visualValue: 'HIGH',
      decision: 'APPROVED'
    },
    {
      id: 'V13-02',
      chapterId: '13',
      sourceSection: 'Engineering Method: Trọng tâm thực sự của project',
      rawContent: 'Project\n↓\nEngineering Method\n↓\nSemantic Contract\n↓\nExecutor Adapter\n↓\nAI Executor',
      semanticClass: 'TEXTUAL_ENGINEERING_EXPRESSION',
      diagramType: 'PLAIN_TEXT',
      recommendedGrammar: 'TEXT_ONLY',
      reason: 'Illustrative engineering text sequence: preserved as text per Prompt #000009 & #000010',
      confidence: 0.96,
      visualValue: 'LOW',
      decision: 'TEXT_ONLY'
    },
    {
      id: 'V13-03',
      chapterId: '13',
      sourceSection: 'State Compatibility trở thành cực kỳ quan trọng',
      rawContent: 'Capability\n↓\nState Compatibility\n↓\nVerification',
      semanticClass: 'TEXTUAL_ENGINEERING_EXPRESSION',
      diagramType: 'PLAIN_TEXT',
      recommendedGrammar: 'TEXT_ONLY',
      reason: 'Sequential evaluation thought: preserved as text per Prompt #000009 & #000010',
      confidence: 0.93,
      visualValue: 'LOW',
      decision: 'TEXT_ONLY'
    },
    {
      id: 'V13-04',
      chapterId: '13',
      sourceSection: 'Executor Adapter: Lớp cách ly giữa Method và Model',
      rawContent: 'ENGINEERING METHOD\n        │\n        ↓\nSEMANTIC CONTRACT\n        │\n┌───────┼───────┐\n↓       ↓       ↓\nGemini Adapter  DeepSeek Adapter  Executor C\n↓       ↓       ↓\nGemini  DeepSeek  Executor C',
      semanticClass: 'TEXTUAL_ENGINEERING_EXPRESSION',
      diagramType: 'PLAIN_TEXT',
      recommendedGrammar: 'TEXT_ONLY',
      reason: 'Textual adapter illustration: preserved as text per Prompt #000009 & #000010',
      confidence: 0.97,
      visualValue: 'LOW',
      decision: 'TEXT_ONLY'
    },
    {
      id: 'V13-05',
      chapterId: '13',
      sourceSection: 'Quyền hạn thuộc về ai?',
      rawContent: 'DISCOVERY\n↓\nPROPOSAL\n↓\nAUTHORIZED EXECUTION\n↓\nVERIFICATION\n↓\nSTATE UPDATE',
      semanticClass: 'TEXTUAL_ENGINEERING_EXPRESSION',
      diagramType: 'PLAIN_TEXT',
      recommendedGrammar: 'TEXT_ONLY',
      reason: '5-stage lifecycle sequence: preserved as text per Prompt #000009 & #000010',
      confidence: 0.94,
      visualValue: 'LOW',
      decision: 'TEXT_ONLY'
    }
  ]
};

/**
 * Returns all approved visuals for a given chapter.
 */
export function getApprovedVisualsForChapter(chapterId: string): VisualCandidate[] {
  const candidates = CHAPTER_VISUAL_REGISTRY[chapterId] || [];
  return candidates.filter(c => c.decision === 'APPROVED').slice(0, MAX_VISUALS_PER_CHAPTER);
}

/**
 * Normalizes text content for semantic comparison matching.
 */
function normalizeContent(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
    .toUpperCase();
}

/**
 * Matches a source text block against approved candidates for a chapter.
 */
export function matchApprovedCandidate(chapterId: string, content: string): VisualCandidate | undefined {
  const approvedList = getApprovedVisualsForChapter(chapterId);
  const normalized = normalizeContent(content);

  for (const candidate of approvedList) {
    const candidateNorm = normalizeContent(candidate.rawContent);

    // Exact or strong substring match
    if (normalized === candidateNorm) {
      return candidate;
    }

    // Specific matchers for key approved structures
    if (candidate.id === 'V13-01' && normalized.includes('AI CAPABILITY') && (normalized.includes('≠') || normalized.includes('!=')) && normalized.includes('PROJECT CONTINUITY')) {
      return candidate;
    }
  }

  return undefined;
}

export interface BlockVisualEvaluation {
  shouldRender: boolean;
  candidate?: VisualCandidate;
  diagramType: DiagramType;
  reason: string;
}

/**
 * Evaluates whether a markdown code block should be rendered as a visual or preserved as text.
 */
export function evaluateBlockForVisualization(chapterId: string, content: string): BlockVisualEvaluation {
  const trimmed = content.trim();

  // Chapter 13 Strict Lock Mode
  if (chapterId === '13' || chapterId === '13-tu-duy-paecs') {
    // Check if it strictly matches V13-01
    const matched = matchApprovedCandidate('13', trimmed);
    if (matched && matched.id === 'V13-01' && isChapter13VisualApproved('V13-01')) {
      return {
        shouldRender: true,
        candidate: matched,
        diagramType: matched.diagramType,
        reason: 'Approved Whitelist Visual V13-01 in Chapter 13'
      };
    }

    // All other code/diagram blocks in Chapter 13 MUST remain text
    return {
      shouldRender: false,
      diagramType: isCodeSnippet(trimmed) ? 'CODE' : 'PLAIN_TEXT',
      reason: 'Chapter 13 Strict Visual Whitelist: unapproved candidate preserved as text'
    };
  }

  // 1. Code snippets must stay text
  if (isCodeSnippet(trimmed)) {
    return {
      shouldRender: false,
      diagramType: 'CODE',
      reason: 'Genuine code snippet: preserved as text'
    };
  }

  // 2. Textual engineering expressions must stay pure text (PDF-like presentation)
  if (isTextualEngineeringExpression(trimmed) || isLowValueOrTextOnly(trimmed)) {
    return {
      shouldRender: false,
      diagramType: 'PLAIN_TEXT',
      reason: 'Textual engineering expression: preserved as text'
    };
  }

  // 3. Check for approved candidate in chapter registry
  const matchedCandidate = matchApprovedCandidate(chapterId, trimmed);
  if (matchedCandidate && matchedCandidate.decision === 'APPROVED') {
    return {
      shouldRender: true,
      candidate: matchedCandidate,
      diagramType: matchedCandidate.diagramType,
      reason: `Approved candidate ${matchedCandidate.id} in Chapter ${chapterId}`
    };
  }

  // 4. Default: If not in registered chapter, fallback to classification
  const classification = classifyCodeBlock(trimmed);
  if (classification.semanticClass !== 'TEXT_ONLY' && classification.semanticClass !== 'TEXTUAL_ENGINEERING_EXPRESSION' && classification.semanticClass !== 'CODE_SNIPPET') {
    return {
      shouldRender: true,
      diagramType: classification.diagramType,
      reason: `General visual: ${classification.semanticClass}`
    };
  }

  // 5. Suppress unapproved visual candidates to protect reading flow
  return {
    shouldRender: false,
    diagramType: 'PLAIN_TEXT',
    reason: 'Unapproved candidate: preserved as text'
  };
}

