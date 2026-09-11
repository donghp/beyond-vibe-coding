// Prompt-ID: #000014
// Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE

/**
 * BVC Master Visual Design - Remark Diagram Plugin
 * VERSION: "3.0"
 * 
 * Intercepts text code blocks and applies Code Block Disambiguation.
 * Standard: BVC SVOE V1.1 FINAL — TEXT-ONLY PRESERVATION & LOW-VALUE SUPPRESSION
 * Standard: BVC MVEA-001 — LIGHT VISUAL CANVAS RULE
 * Standard: SOURCE-PRESERVING ASCII ARCHITECTURE STANDARD
 * Provenance:
 *   Prompt-ID: #000014
 *   Prompt-Title: BVC MASTER VISUAL SYSTEM — SEMANTIC TEXT MICRO-VISUAL / LIGHT-FRAMED STRUCTURED TEXT / CHAPTER 13 PILOT UPGRADE
 */

import { classifyCodeBlock } from './diagramClassifier';

export function remarkBvcDiagram() {
  return (tree: any) => {
    function traverse(node: any) {
      if (node.type === 'code' && (node.lang === 'text' || node.lang === 'state' || !node.lang)) {
        const content = node.value || '';
        const trimmed = content.trim();
        if (trimmed.length === 0) return;
        
        // Apply Code Block Disambiguation & Low-Value Suppression
        // "Không phải mọi code block đều là code. Nhưng không phải mọi cấu trúc đều nên vẽ."
        const classification = classifyCodeBlock(content);
        
        if (classification.semanticClass === 'TEXTUAL_ARCHITECTURE') {
          // BVC Source-Preserving ASCII Architecture Standard:
          // Use whitespace-preserving pre element with light document canvas, zero flex/grid, zero whitespace collapse
          node.type = 'html';
          node.value = `<pre class="bvc-textual-architecture">${escapeHtml(content)}</pre>`;
          delete node.lang;
        } else if (classification.semanticClass === 'TEXTUAL_ENGINEERING_EXPRESSION' || classification.semanticClass === 'TEXT_ONLY') {
          // Render as clean PDF-like textual engineering expression
          const lines = content.split('\n');
          const linesHtml = lines.map((l: string) => {
            const trimmedLine = l.trim();
            if (trimmedLine === '↓' || trimmedLine === '→' || trimmedLine === '->' || trimmedLine === '=>') {
              return `<div class="bvc-textual-arrow text-[#0066CC] font-semibold">${escapeHtml(trimmedLine)}</div>`;
            }
            return `<div class="bvc-textual-line">${escapeHtml(l)}</div>`;
          }).join('');
          
          node.type = 'html';
          node.value = `<div class="bvc-textual-engineering-expression">${linesHtml}</div>`;
          delete node.lang;
        } else if (classification.semanticClass !== 'CODE_SNIPPET') {
          // True semantic visual candidates (e.g. SEMANTIC_CONTRAST)
          node.type = 'html';
          node.value = `<div class="bvc-visual-placeholder" data-type="text-diagram" data-id="" data-semantic-class="${classification.semanticClass}" data-diagram-type="${classification.diagramType}">${escapeHtml(content)}</div>`;
          delete node.lang;
        }
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    traverse(tree);
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


