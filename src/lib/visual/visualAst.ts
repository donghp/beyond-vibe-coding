/**
 * BVC Master Visual Design - Visual AST Types
 * VERSION: "1.0"
 * 
 * Canonical Source: /docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md
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
  | 'VG-CHECKLIST'
  | 'VG-ASCII';

export interface DiagramNode {
  id: string;
  label: string;
  level?: number; // For ladders
  subLabel?: string;
  type?: string; // e.g., 'primary', 'secondary', 'state'
  status?: 'PASS' | 'FAIL' | 'PENDING' | 'NONE'; // For checklists
  semanticTermId?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  type?: 'solid' | 'dashed' | 'dotted';
}

export interface VisualAST {
  type: DiagramType;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  raw: string;
}
