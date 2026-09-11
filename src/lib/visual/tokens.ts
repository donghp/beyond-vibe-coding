/**
 * BVC Master Visual Design System - Design Tokens
 * VERSION: "2.0"
 * 
 * Canonical Source: /docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md
 * Rule: BVC MVEA-001 — LIGHT VISUAL CANVAS RULE
 */

export const BVC_VISUAL_DESIGN_VERSION = "2.0";

/**
 * BVC MVEA-001 — LIGHT VISUAL CANVAS RULE
 * All BVC technical illustrations, diagrams, architectures, process diagrams,
 * flow diagrams, component maps, evidence visuals, pipeline visuals,
 * reordering visuals, chunking visuals, RAG visuals, and visual callouts
 * MUST use a LIGHT CANVAS.
 * 
 * BLACK OR DARK BACKGROUNDS ARE PROHIBITED.
 */
export const BVC_MVEA_001_RULE = {
  id: "BVC-MVEA-001",
  name: "LIGHT VISUAL CANVAS RULE",
  primaryBackground: "#FFFFFF",
  allowedSecondarySurfaces: [
    "#F0F7FF", // Soft Blue
    "#EAF6FF", // Pale Sky
    "#F3F6F9", // Light Gray
    "#E8F8F0", // Light Mint
    "#F0FDF4", // Energy Green Pale
    "#F8FAFC", // Soft Slate
  ],
  deepBluePolicy: "Deep Blue (#0B1D3A) may be used ONLY for typography, connector strokes, outlines, labels, and semantic emphasis. Deep Blue MUST NOT be used as diagram canvas, outer visual background, large card background, code-block background, or full-width visual panel background.",
  prohibitedSurfaces: [
    "#000000",
    "#000",
    "black",
    "#0B1D3A",
    "#0F1C3F",
    "#0A1128",
    "#081321",
    "#0f172a",
    "#1e293b",
    "#121214",
  ]
} as const;

export const BVC_TOKENS = {
  colors: {
    primary: {
      canvas: "#FFFFFF",
      white: "#FFFFFF",
      softBlue: "#F0F7FF",
      paleSky: "#EAF6FF",
      lightGray: "#F3F6F9",
      deepBlue: "#0B1D3A",
      skyBlue: "#0EA5E9",
      energyGreen: "#22C55E",
    },
    secondary: {
      mint: "#86E7AC",
      mintGreen: "#86E7AC",
      teal: "#14B8A6",
      azure: "#38BDF8",
      slate: "#64748B",
      slateLight: "#94A3B8",
      slateBorder: "#E2E8F0",
      slateSubtle: "#F1F5F9",
      amber: "#F59E0B",
      amberSoft: "#FFFBEB",
      greenSoft: "#F0FDF4",
      skySoft: "#F0F9FF",
      redSoft: "#FEF2F2",
    },
    semantic: {
      structure: "#0B1D3A", // Typography, nodes & outlines
      flow: "#0EA5E9",      // Active flows & Sky Blue accents
      verified: "#22C55E",  // Verification & Energy Green
      warning: "#F59E0B",   // Warning & Attention
      critical: "#DC2626",  // Critical & Errors
    }
  },
  typography: {
    ui: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    technical: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    tracking: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.08em",
      wider: "0.15em",
      widest: "0.25em",
      ultra: "0.3em"
    },
    sizes: {
      micro: "9px",
      badge: "10px",
      label: "11px",
      caption: "12px",
      body: "13px",
      headingSm: "15px",
      headingMd: "18px",
      headingLg: "22px"
    }
  },
  spacing: {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    none: '0px',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    pill: '9999px',
  },
  borders: {
    subtle: '1px solid #E2E8F0',
    soft: '1px solid #F1F5F9',
    skySoft: '1px solid #BAE6FD',
    emeraldSoft: '1px solid #A7F3D0',
    amberSoft: '1px solid #FDE68A',
    accent: '2px solid #0EA5E9',
  },
  shadows: {
    soft: '0 1px 3px rgba(0, 0, 0, 0.02)',
    card: '0 4px 12px -2px rgba(11, 29, 58, 0.04)',
    hover: '0 8px 24px -4px rgba(14, 165, 233, 0.08)',
    badge: '0 1px 2px rgba(11, 29, 58, 0.03)'
  },
  connectors: {
    strokeWidth: 1.5,
    thinStrokeWidth: 1.25,
    color: '#64748B',
    activeColor: '#0EA5E9',
    verifiedColor: '#22C55E',
  },
  pills: {
    CANONICAL: {
      bg: '#F0FDF4',
      text: '#22C55E',
      border: '#DCFCE7',
      label: 'CANONICAL'
    },
    VERIFIED: {
      bg: '#F0FDF4',
      text: '#22C55E',
      border: '#DCFCE7',
      label: 'VERIFIED'
    },
    GOVERNANCE: {
      bg: '#F0F7FF',
      text: '#0EA5E9',
      border: '#E0F2FE',
      label: 'GOVERNANCE'
    },
    STRUCTURE: {
      bg: '#F3F6F9',
      text: '#0B1D3A',
      border: '#E2E8F0',
      label: 'STRUCTURE'
    },
    BOUNDARY: {
      bg: '#F8FAFC',
      text: '#64748B',
      border: '#E2E8F0',
      label: 'BOUNDARY'
    },
    EVIDENCE: {
      bg: '#F0FDF4',
      text: '#16A34A',
      border: '#DCFCE7',
      label: 'EVIDENCE'
    },
    PASS: {
      bg: '#F0FDF4',
      text: '#22C55E',
      border: '#DCFCE7',
      label: 'PASS'
    },
    BLOCKED: {
      bg: '#FEF2F2',
      text: '#DC2626',
      border: '#FEE2E2',
      label: 'BLOCKED'
    },
    ELIGIBLE: {
      bg: '#F0F7FF',
      text: '#0284C7',
      border: '#BAE6FD',
      label: 'ELIGIBLE'
    },
  },
  getSemanticColor: (role: string | undefined): string => {
    switch (role) {
      case 'structure': return BVC_TOKENS.colors.semantic.structure;
      case 'active-flow': return BVC_TOKENS.colors.semantic.flow;
      case 'flow': return BVC_TOKENS.colors.semantic.flow;
      case 'verified': return BVC_TOKENS.colors.semantic.verified;
      case 'warning': return BVC_TOKENS.colors.semantic.warning;
      case 'critical': return BVC_TOKENS.colors.semantic.critical;
      default: return BVC_TOKENS.colors.semantic.structure;
    }
  }
};
