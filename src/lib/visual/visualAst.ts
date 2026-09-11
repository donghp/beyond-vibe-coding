/**
 * BVC Master Visual Design - Visual AST Types
 * VERSION: "1.2"
 * 
 * Canonical Source: /docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md
 * Prompt-ID: #000004
 * Prompt-Title: BVC MASTER VISUAL ENGINE — SVOE V1.1 FINAL / TEXT-ONLY PRESERVATION + CHAPTER 13 UPDATE
 */

export type DiagramType = 
  | 'CODE'
  | 'PLAIN_TEXT'
  | 'VG-FLOW' 
  | 'VG-LADDER' 
  | 'VG-DECISION' 
  | 'VG-STATE'
  | 'VG-COMPARISON'
  | 'VG-SPEC' 
  | 'VG-ARCHITECTURE' 
  | 'VG-ARCH-TOPDOWN'
  | 'VG-ARCH-FANOUT'
  | 'VG-ARCH-LAYERED'
  | 'VG-ARCH-PIPELINE'
  | 'VG-ARCH-TWO-TIER'
  | 'VG-ARCH-GRAPH'
  | 'VG-CHECKLIST'
  | 'VG-ASCII'
  | 'VG-PIPELINE'
  | 'VG-RAG'
  | 'VG-DATA-EXTRACTION'
  | 'VG-CHUNKING'
  | 'VG-RECURSIVE-CHUNKING'
  | 'VG-REORDERING'
  | 'VG-EVIDENCE'
  | 'VG-COMPONENT-MAP';

export type ComponentType =
  | 'rectangle'
  | 'rounded-rectangle'
  | 'ellipse'
  | 'cylinder'
  | 'pill'
  | 'diamond'
  | 'hexagon'
  | 'document'
  | 'stacked-documents'
  | 'funnel'
  | 'container'
  | 'bracket'
  | 'boundary'
  | 'database'
  | 'model'
  | 'llm'
  | 'user'
  | 'query'
  | 'search'
  | 'retriever'
  | 'vector-store'
  | 'embedding'
  | 'chunk'
  | 'metadata'
  | 'index'
  | 'evidence'
  | 'decision'
  | 'process-step'
  | 'annotation'
  | 'callout'
  | 'state-card'
  | 'state-value'
  | 'contrast-card'
  | 'relation-node';

export type NodeStatus =
  | 'PASS'
  | 'FAIL'
  | 'PENDING'
  | 'NONE'
  | 'VERIFIED'
  | 'NOT_VERIFIED'
  | 'REJECTED'
  | 'IMPLEMENTED'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'COMPLETED'
  | 'FAILED'
  | 'UNKNOWN'
  | 'UNAVAILABLE';

export interface StateEntity {
  stateType: string; // e.g. "Current State", "Project State", "Task State"
  primaryEntity: string; // e.g. "DATABASE MIGRATION"
  stateValue: string; // e.g. "IMPLEMENTED", "NOT VERIFIED", "VERIFIED"
  domain?: string; // e.g. "DATABASE"
  semanticTermId?: string; // resolved glossary term ID
  notes?: string;
}

export interface SemanticContrastEntity {
  entityA: {
    label: string;
    semanticTermId?: string;
    subtitle?: string;
  };
  relation: 'NOT_EQUAL' | 'VS' | 'EQUALS' | 'TRANSFORMS_TO';
  relationSymbol: string; // e.g. "≠", "VS", "=", "→"
  entityB: {
    label: string;
    semanticTermId?: string;
    subtitle?: string;
  };
  notes?: string;
}

export type CandidateDecision = 'TEXT_ONLY' | 'PROPOSED' | 'APPROVED' | 'REJECTED';
export type VisualValue = 'HIGH' | 'MEDIUM' | 'LOW';

export interface VisualCandidate {
  id: string;
  chapterId?: string;
  sourceSection?: string;
  rawContent: string;
  semanticClass: string;
  diagramType: DiagramType;
  recommendedGrammar: string;
  reason: string;
  confidence: number;
  visualValue: VisualValue;
  decision: CandidateDecision;
}

export interface DiagramNode {
  id: string;
  label: string;
  type?: ComponentType | string;
  subLabel?: string;
  level?: number;
  status?: NodeStatus;
  semanticTermId?: string;
  position?: { x: number; y: number };
  metadata?: Record<string, any>;
  icon?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  type?: 'solid' | 'dashed' | 'dotted' | 'arrow' | 'curved' | 'orthogonal' | 'bidirectional';
  direction?: 'forward' | 'backward' | 'both';
}

export interface VisualAST {
  type: DiagramType;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  raw: string;
  purpose?: string;
  semanticAnchor?: string;
  state?: StateEntity;
  contrast?: SemanticContrastEntity;
}
