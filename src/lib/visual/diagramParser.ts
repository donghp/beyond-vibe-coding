/**
 * BVC Master Visual Design - Diagram Parser
 * VERSION: "1.2"
 * 
 * Semantic parsing of source blocks into Visual AST.
 * Standard: BVC SVOE — SEMANTIC STATE VISUALIZATION & CODE DISAMBIGUATION
 * Provenance:
 *   Prompt-ID: #000004
 *   Prompt-Title: BVC MASTER VISUAL ENGINE — SVOE V1.1 FINAL / TEXT-ONLY PRESERVATION + CHAPTER 13 UPDATE
 */

import type { VisualAST, DiagramType, DiagramNode, DiagramEdge, StateEntity, NodeStatus } from './visualAst';
import { classifyDiagram } from './diagramClassifier';
import { getAllTerms } from '../terminology/authority';

export function resolveCanonicalSemanticId(term: string): string | undefined {
  const t = term.trim().toUpperCase();
  if (t.includes('AI CAPABILITY') || t === 'CAPABILITY') return 'AI_CAPABILITY';
  if (t.includes('PROJECT CONTINUITY') || t === 'CONTINUITY') return 'PROJECT_CONTINUITY';
  if (t.includes('SEMANTIC CONTRACT') || t.includes('EXECUTION CONTRACT')) return 'SEMANTIC_CONTRACT';
  if (t.includes('ENGINEERING METHOD')) return 'ENGINEERING_METHOD';
  if (t.includes('EXECUTOR ADAPTER') || t.includes('ADAPTER')) return 'EXECUTOR_ADAPTER';
  if (t.includes('AUTHORITY')) return 'AUTHORITY';
  if (t.includes('VERIFICATION')) return 'VERIFICATION';
  if (t.includes('EVIDENCE')) return 'EVIDENCE';
  if (t.includes('STATE COMPATIBILITY')) return 'STATE_COMPATIBILITY';
  if (t.includes('PROJECT STATE') || t.includes('CURRENT STATE')) return 'PROJECT_STATE';
  if (t.includes('CONTROLLED AUTONOMY')) return 'CONTROLLED_AUTONOMY';

  const terms = getAllTerms();
  const found = terms.find(g => 
    g.canonicalTerm.toUpperCase() === t || 
    g.aliases.some(a => a.toUpperCase() === t)
  );
  return found?.id ? found.id.toUpperCase().replace(/-/g, '_') : undefined;
}

export function parseDiagram(text: string): VisualAST {
  const type = classifyDiagram(text);
  let ast: VisualAST;

  switch (type) {
    case 'VG-COMPARISON':
      ast = parseComparison(text);
      break;
    case 'VG-STATE':
      ast = parseState(text);
      break;
    case 'VG-CHECKLIST':
      ast = parseChecklist(text);
      break;
    case 'VG-SPEC':
      ast = parseSpec(text);
      break;
    case 'VG-LADDER':
      ast = parseLadder(text);
      break;
    case 'VG-ARCH-TOPDOWN':
    case 'VG-ARCH-FANOUT':
    case 'VG-ARCHITECTURE':
      ast = parseArchitecture(text, type);
      break;
    case 'VG-FLOW':
      ast = parseFlow(text);
      break;
    case 'VG-RAG':
    case 'VG-PIPELINE':
    case 'VG-DATA-EXTRACTION':
    case 'VG-CHUNKING':
    case 'VG-RECURSIVE-CHUNKING':
    case 'VG-REORDERING':
    case 'VG-EVIDENCE':
      ast = parseTechnical(text, type);
      break;
    case 'CODE':
    case 'PLAIN_TEXT':
      ast = { type, nodes: [], edges: [], raw: text };
      break;
    default:
      ast = { type, nodes: [], edges: [], raw: text };
      break;
  }

  // Post-process: Resolve semantic terms for nodes
  const terms = getAllTerms();
  ast.nodes.forEach(node => {
    if (node.semanticTermId) return;
    const resolvedId = resolveCanonicalSemanticId(node.label);
    if (resolvedId) {
      node.semanticTermId = resolvedId;
      return;
    }
    const label = node.label.toLowerCase();
    const foundTerm = terms.find(t => 
      t.canonicalTerm.toLowerCase() === label ||
      t.aliases.some(a => a.toLowerCase() === label) ||
      t.id.toLowerCase() === label ||
      (label.includes('state') && t.id === 'project-state') ||
      (label.includes('verif') && t.id === 'verification')
    );
    if (foundTerm) {
      node.semanticTermId = foundTerm.id;
    }
  });

  return ast;
}

function parseComparison(text: string): VisualAST {
  const trimmed = text.trim();
  const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let entityA = 'AI Capability';
  let entityB = 'Project Continuity';
  let relationSymbol = '≠';
  let relation: 'NOT_EQUAL' | 'VS' = 'NOT_EQUAL';

  if (lines.length === 3) {
    entityA = lines[0];
    relationSymbol = lines[1];
    entityB = lines[2];
    if (relationSymbol === '!=' || relationSymbol === '≠') {
      relation = 'NOT_EQUAL';
      relationSymbol = '≠';
    } else if (relationSymbol.toUpperCase().includes('VS')) {
      relation = 'VS';
    }
  } else if (trimmed.includes('≠')) {
    const parts = trimmed.split('≠');
    entityA = parts[0]?.trim() || entityA;
    entityB = parts[1]?.trim() || entityB;
    relation = 'NOT_EQUAL';
    relationSymbol = '≠';
  } else if (trimmed.includes('!=')) {
    const parts = trimmed.split('!=');
    entityA = parts[0]?.trim() || entityA;
    entityB = parts[1]?.trim() || entityB;
    relation = 'NOT_EQUAL';
    relationSymbol = '≠';
  } else if (trimmed.toUpperCase().includes(' VS ')) {
    const parts = trimmed.split(/\s+VS\s+/i);
    entityA = parts[0]?.trim() || entityA;
    entityB = parts[1]?.trim() || entityB;
    relation = 'VS';
    relationSymbol = 'VS';
  }

  const termA = resolveCanonicalSemanticId(entityA);
  const termB = resolveCanonicalSemanticId(entityB);

  const nodes: DiagramNode[] = [
    { id: 'entity-a', label: entityA, type: 'contrast-card', semanticTermId: termA },
    { id: 'relation', label: relationSymbol, type: 'relation-node' },
    { id: 'entity-b', label: entityB, type: 'contrast-card', semanticTermId: termB }
  ];

  const edges: DiagramEdge[] = [
    { from: 'entity-a', to: 'relation' },
    { from: 'relation', to: 'entity-b' }
  ];

  return {
    type: 'VG-COMPARISON',
    nodes,
    edges,
    raw: text,
    contrast: {
      entityA: { label: entityA, semanticTermId: termA },
      relation,
      relationSymbol,
      entityB: { label: entityB, semanticTermId: termB },
      notes: 'Thesis: Khác biệt bản chất giữa năng lực mô hình và tính liên tục của dự án'
    }
  };
}

function parseState(text: string): VisualAST {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];

  let stateType = 'Current State';
  let primaryEntity = '';
  let stateValue = '';
  let domain: string | undefined = undefined;

  let currentLineIndex = 0;

  // Check if first line is a state header (e.g. "Current State:", "Project State:", "State:", "Status:")
  const stateHeaderMatch = lines[0]?.match(/^(current\s+state|project\s+state|task\s+state|component\s+state|verification\s+state|implementation\s+state|deployment\s+state|migration\s+state|status\s+snapshot|state|status|trạng\s+thái)\s*[:]/i);
  if (stateHeaderMatch) {
    stateType = stateHeaderMatch[1].trim();
    // Normalize casing for display (e.g. "Current State", "Project State")
    stateType = stateType.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    currentLineIndex = 1;
  }

  // Look for assignment line "<ENTITY> = <VALUE>" or "<ENTITY> : <VALUE>"
  for (let i = currentLineIndex; i < lines.length; i++) {
    const line = lines[i];
    const eqIdx = line.indexOf('=');
    const colonIdx = line.indexOf(':');

    if (eqIdx !== -1) {
      primaryEntity = line.slice(0, eqIdx).trim();
      stateValue = line.slice(eqIdx + 1).trim();
      currentLineIndex = i + 1;
      break;
    } else if (colonIdx !== -1 && !stateHeaderMatch) {
      primaryEntity = line.slice(0, colonIdx).trim();
      stateValue = line.slice(colonIdx + 1).trim();
      currentLineIndex = i + 1;
      break;
    }
  }

  // Look for domain line if present (e.g. "DATABASE")
  if (currentLineIndex < lines.length) {
    const remaining = lines.slice(currentLineIndex).join(' ').trim();
    if (remaining) {
      domain = remaining;
    }
  }

  // If primaryEntity was not found with =, fallback
  if (!primaryEntity && lines.length > 0) {
    primaryEntity = lines[currentLineIndex] || lines[0];
    stateValue = 'UNKNOWN';
  }

  const normalizedStatus = mapStateStatus(stateValue);

  // Terminology matching via Glossary authority
  const terms = getAllTerms();
  let semanticTermId: string | undefined = undefined;

  const candidates = [primaryEntity, stateType, domain, stateValue].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const lower = candidate.toLowerCase();
    const foundTerm = terms.find(t =>
      t.canonicalTerm.toLowerCase() === lower ||
      t.aliases.some(a => a.toLowerCase() === lower) ||
      t.id.toLowerCase() === lower ||
      (lower.includes('state') && t.id === 'project-state') ||
      (lower.includes('verif') && t.id === 'verification')
    );
    if (foundTerm) {
      semanticTermId = foundTerm.id;
      break;
    }
  }

  const stateEntity: StateEntity = {
    stateType,
    primaryEntity,
    stateValue: stateValue.toUpperCase(),
    domain,
    semanticTermId
  };

  // Structured nodes for rendering
  nodes.push({
    id: 'state-header',
    label: stateType,
    type: 'state-card'
  });

  nodes.push({
    id: 'primary-entity',
    label: primaryEntity,
    type: 'rounded-rectangle',
    subLabel: domain,
    semanticTermId
  });

  nodes.push({
    id: 'state-value',
    label: stateValue.toUpperCase(),
    status: normalizedStatus,
    type: 'state-value',
    semanticTermId: stateValue.toUpperCase().includes('VERIF') ? 'verification' : undefined
  });

  if (domain) {
    nodes.push({
      id: 'domain-subject',
      label: domain,
      type: 'database'
    });
  }

  return {
    type: 'VG-STATE',
    nodes,
    edges,
    raw: text,
    state: stateEntity
  };
}

function mapStateStatus(val: string): NodeStatus {
  const u = val.toUpperCase().replace(/\s+/g, '_');
  if (u.includes('NOT_VERIF') || u.includes('NOT_VERIFIED')) return 'NOT_VERIFIED';
  if (u.includes('VERIFIED')) return 'VERIFIED';
  if (u.includes('IMPLEMENTED')) return 'IMPLEMENTED';
  if (u.includes('IN_PROGRESS') || u.includes('PROGRESS')) return 'IN_PROGRESS';
  if (u.includes('BLOCKED')) return 'BLOCKED';
  if (u.includes('COMPLETED')) return 'COMPLETED';
  if (u.includes('FAILED') || u.includes('FAIL')) return 'FAILED';
  if (u.includes('PENDING')) return 'PENDING';
  if (u.includes('UNAVAILABLE')) return 'UNAVAILABLE';
  return 'UNKNOWN';
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

function parseArchitecture(text: string, type: DiagramType = 'VG-ARCHITECTURE'): VisualAST {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];

  if (type === 'VG-ARCH-TOPDOWN') {
    const stepLines = lines.filter(l => l !== '↓' && l !== '->' && l !== '→' && l !== '│' && l !== '|');
    stepLines.forEach((label, idx) => {
      const id = `arch-step-${idx}`;
      nodes.push({
        id,
        label,
        level: idx,
        type: 'process-step',
        semanticTermId: resolveCanonicalSemanticId(label)
      });
      if (idx > 0) {
        edges.push({ from: `arch-step-${idx - 1}`, to: id, direction: 'forward' });
      }
    });
    return { type: 'VG-ARCH-TOPDOWN', nodes, edges, raw: text };
  }

  if (type === 'VG-ARCH-FANOUT') {
    const rootLabel = 'ENGINEERING METHOD';
    const contractLabel = 'SEMANTIC CONTRACT';
    const adapters = ['Gemini Adapter', 'DeepSeek Adapter', 'Executor C'];
    const executors = ['Gemini', 'DeepSeek', 'Executor C'];

    nodes.push({ id: 'method', label: rootLabel, level: 0, semanticTermId: 'ENGINEERING_METHOD' });
    nodes.push({ id: 'contract', label: contractLabel, level: 1, semanticTermId: 'SEMANTIC_CONTRACT' });
    edges.push({ from: 'method', to: 'contract' });

    adapters.forEach((adapterName, i) => {
      const aId = `adapter-${i}`;
      const eId = `executor-${i}`;
      nodes.push({ id: aId, label: adapterName, level: 2, subLabel: 'Adapter Layer', semanticTermId: 'EXECUTOR_ADAPTER' });
      nodes.push({ id: eId, label: executors[i], level: 3, subLabel: 'AI Model' });
      edges.push({ from: 'contract', to: aId });
      edges.push({ from: aId, to: eId });
    });

    return { type: 'VG-ARCH-FANOUT', nodes, edges, raw: text };
  }
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

function parseTechnical(text: string, type: DiagramType): VisualAST {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  let lastNodeId: string | null = null;

  for (const line of lines) {
    // Check for directive-like properties at the top
    if (line.includes(':') && !line.includes('->')) {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key === 'purpose') continue; // Handled outside
      if (key === 'semanticAnchor') continue;
    }

    // Handle arrows
    if (/^(↓|->|=>|→|│|─|\||\+)$/.test(line)) continue;

    // Parse node with optional status/type
    // Example: "Vector Store [STATUS: PASS]" or "Gemini (llm)"
    const nodeMatch = line.match(/^(.+?)(?:\s+\[(.+?)\])?(?:\s+\((.+?)\))?$/);
    if (nodeMatch) {
      const label = nodeMatch[1].trim();
      const statusRaw = nodeMatch[2]?.toUpperCase();
      const typeRaw = nodeMatch[3]?.toLowerCase();
      
      const id = label.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const node: DiagramNode = {
        id,
        label,
        type: typeRaw || inferComponentType(label, type),
        status: statusRaw as any
      };
      
      nodes.push(node);
      
      if (lastNodeId) {
        edges.push({ from: lastNodeId, to: id, type: 'arrow' });
      }
      lastNodeId = id;
    }
  }

  return { type, nodes, edges, raw: text };
}

function inferComponentType(label: string, grammar: DiagramType): string {
  const l = label.toLowerCase();
  if (l.includes('db') || l.includes('database')) return 'database';
  if (l.includes('vector') || l.includes('vdb')) return 'vector-store';
  if (l.includes('doc') || l.includes('pdf') || l.includes('file')) return 'document';
  if (l.includes('model') || l.includes('gemini') || l.includes('gpt')) return 'model';
  if (l.includes('user') || l.includes('human')) return 'user';
  if (l.includes('query') || l.includes('prompt')) return 'query';
  if (l.includes('search') || l.includes('retriever')) return 'retriever';
  if (l.includes('chunk')) return 'chunk';
  if (l.includes('meta')) return 'metadata';
  if (l.includes('index')) return 'index';
  if (l.includes('evidence')) return 'evidence';
  if (l.includes('decision')) return 'decision';
  
  if (grammar === 'VG-CHUNKING') return 'chunk';
  if (grammar === 'VG-DATA-EXTRACTION' && (l.includes('text') || l.includes('meta'))) return 'chunk';
  
  return 'rounded-rectangle';
}
