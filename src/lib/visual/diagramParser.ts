/**
 * BVC Master Visual Design - Diagram Parser
 * VERSION: "1.0"
 * 
 * Semantic parsing of source blocks into Visual AST.
 */

import type { VisualAST, DiagramType, DiagramNode, DiagramEdge } from './visualAst';
import { classifyDiagram } from './diagramClassifier';
import { getAllTerms } from '../terminology/authority';

export function parseDiagram(text: string): VisualAST {
  const type = classifyDiagram(text);
  let ast: VisualAST;

  switch (type) {
    case 'VG-CHECKLIST':
      ast = parseChecklist(text);
      break;
    case 'VG-SPEC':
      ast = parseSpec(text);
      break;
    case 'VG-LADDER':
      ast = parseLadder(text);
      break;
    case 'VG-ARCHITECTURE':
      ast = parseArchitecture(text);
      break;
    case 'VG-FLOW':
      ast = parseFlow(text);
      break;
    case 'CODE':
    case 'PLAIN_TEXT':
      ast = { type, nodes: [], edges: [], raw: text };
      break;
    default:
      // Fallback for VG-ASCII, VG-STATE, VG-COMPARISON, VG-DECISION
      ast = { type, nodes: [], edges: [], raw: text };
      break;
  }

  // Post-process: Resolve semantic terms for nodes
  const terms = getAllTerms();
  ast.nodes.forEach(node => {
    const label = node.label.toLowerCase();
    const foundTerm = terms.find(t => 
      t.canonicalTerm.toLowerCase() === label ||
      t.aliases.some(a => a.toLowerCase() === label) ||
      t.id.toLowerCase() === label
    );
    if (foundTerm) {
      node.semanticTermId = foundTerm.id;
    }
  });

  return ast;
}

function parseChecklist(text: string): VisualAST {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const nodes: DiagramNode[] = [];
  
  for (const line of lines) {
    const match = line.match(/^(.+?)\s+(PASS|FAIL|NONE|PENDING|=>.*)$/i);
    if (match) {
      const label = match[1].trim();
      const status = match[2].toUpperCase();
      nodes.push({
        id: `item-${nodes.length}`,
        label: label,
        status: status.startsWith('=>') ? 'NONE' : status as any,
        subLabel: status.startsWith('=>') ? status : undefined
      });
    } else {
      nodes.push({ id: `item-${nodes.length}`, label: line.trim(), status: 'NONE' });
    }
  }

  return { type: 'VG-CHECKLIST', nodes, edges: [], raw: text };
}

function parseSpec(text: string): VisualAST {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const nodes: DiagramNode[] = [];
  
  for (const line of lines) {
    const match = line.match(/^(\s*)([a-z0-9_\-]+):\s*(.*)$/i);
    if (match) {
      const indent = match[1].length;
      nodes.push({
        id: `spec-${nodes.length}`,
        label: match[2],
        subLabel: match[3] || undefined,
        level: indent
      });
    } else {
      nodes.push({
        id: `spec-${nodes.length}`,
        label: line.trim(),
        level: 0
      });
    }
  }

  return { type: 'VG-SPEC', nodes, edges: [], raw: text };
}

function parseArchitecture(text: string): VisualAST {
  const lines = text.split('\n');
  const nodes: DiagramNode[] = [];
  const labelsFound = new Set();

  for (const line of lines) {
    // Extract words that aren't box drawing chars or arrows
    const words = line.split(/[┌│─┼└├┐┘↙↘\s\-\|]+/).filter(w => w.length > 1);
    for (const word of words) {
      if (!labelsFound.has(word)) {
        nodes.push({ id: word, label: word });
        labelsFound.add(word);
      }
    }
  }

  return { type: 'VG-ARCHITECTURE', nodes, edges: [], raw: text };
}

function parseFlow(text: string): VisualAST {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  let lastNodeId: string | null = null;

  for (const line of lines) {
    if (/^(↓|->|=>|→|│|─|\||\+)$/.test(line)) continue;
    const id = `node-${nodes.length}`;
    nodes.push({ id, label: line });
    if (lastNodeId) {
      edges.push({ from: lastNodeId, to: id });
    }
    lastNodeId = id;
  }
  return { type: 'VG-FLOW', nodes, edges, raw: text };
}

function parseLadder(text: string): VisualAST {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const nodes: DiagramNode[] = [];
  for (const line of lines) {
    const match = line.match(/^(M\d+|LEVEL\s*\d+|RUN-\d+)\s*[:\-\s]\s*(.*)$/i);
    if (match) {
      nodes.push({
        id: match[1],
        label: match[2],
        level: parseInt(match[1].replace(/\D/g, '')) || 0
      });
    } else if (!/^(↓|->|=>|→)$/.test(line)) {
      nodes.push({ id: `step-${nodes.length}`, label: line });
    }
  }
  return { type: 'VG-LADDER', nodes, edges: [], raw: text };
}
