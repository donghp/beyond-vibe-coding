/**
 * BVC Master Visual Design - Diagram Classifier
 * VERSION: "1.0"
 * 
 * Deterministic classification of source blocks.
 */

import type { DiagramType } from './visualAst';

export function classifyDiagram(content: string): DiagramType {
  const lines = content.trim().split('\n');
  const firstLine = lines[0].trim();

  // 1. Explicit VG-SPEC (Technical key-value blocks)
  // Look for keys like engineering_method, system_spec, or a series of key: value pairs
  if (firstLine.includes('engineering_method:') || 
      firstLine.includes('system_spec:') ||
      (lines.length > 2 && lines.every(l => l.includes(':') && !l.includes('->')))) {
    return 'VG-SPEC';
  }

  // 2. VG-ARCHITECTURE (Hierarchical ASCII structures)
  if (content.includes('┌') || content.includes('─') || content.includes('│') || content.includes('┐')) {
    return 'VG-ARCHITECTURE';
  }

  // 3. VG-LADDER (Level-based progression)
  if (content.toUpperCase().includes('LEVEL') || lines.some(l => /^\d+\.\s/.test(l))) {
    // Check if it's more like a ladder than a list
    if (lines.length >= 3 && lines.some(l => l.toUpperCase().includes('LEVEL'))) {
      return 'VG-LADDER';
    }
  }

  // 4. VG-CHECKLIST (Status lists)
  if (content.includes('[PASS]') || content.includes('[FAIL]') || content.includes('[ ]')) {
    return 'VG-CHECKLIST';
  }

  // 5. VG-FLOW (Directional arrows)
  if (content.includes('->') || content.includes('=>') || content.includes('↓')) {
    return 'VG-FLOW';
  }

  // 6. VG-DECISION
  if (content.toUpperCase().includes('IF') && content.toUpperCase().includes('THEN')) {
    return 'VG-DECISION';
  }

  // Default to ASCII if it looks like a diagram but doesn't match specific types
  if (lines.length > 1 && (content.includes('|') || content.includes('+') || content.includes('-'))) {
    return 'VG-ASCII';
  }

  return 'PLAIN_TEXT';
}
