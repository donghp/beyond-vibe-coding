/**
 * BVC Master Visual Design System - Design Tokens
 * VERSION: "1.0"
 * 
 * Canonical Source: /docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md
 */

export const BVC_VISUAL_DESIGN_VERSION = "1.0";

export const BVC_TOKENS = {
  colors: {
    primary: {
      energyGreen: "#22C55E",
      skyBlue: "#0EA5E9",
      deepBlue: "#0B1D3A",
      white: "#FFFFFF",
      lightGray: "#F3F6F9",
    },
    secondary: {
      mintGreen: "#86E7AC",
      teal: "#14B8A6",
      azure: "#38BDF8",
      indigo: "#6366F1",
      slate: "#64748B",
      amber: "#F59E0B",
    },
    semantic: {
      structure: "#0B1D3A",
      flow: "#0EA5E9",
      verified: "#22C55E",
      warning: "#F59E0B",
      critical: "#DC2626",
    }
  },
  typography: {
    ui: "Inter",
    technical: "monospace",
  },
  // Spacing and other tokens are derived from the layout principles in the spec
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    none: '0',
    sm: '2px',
    base: '4px',
    lg: '8px',
  },
  getSemanticColor: (role: string | undefined): string => {
    switch (role) {
      case 'structure': return BVC_TOKENS.colors.semantic.structure;
      case 'active-flow': return BVC_TOKENS.colors.semantic.flow;
      case 'verified': return BVC_TOKENS.colors.semantic.verified;
      case 'warning': return BVC_TOKENS.colors.semantic.warning;
      case 'critical': return BVC_TOKENS.colors.semantic.critical;
      default: return BVC_TOKENS.colors.semantic.structure;
    }
  }
};
