/**
 * BVC Master Visual Design System - Design Tokens
 * 
 * Based on the ENERIX-inspired visual language:
 * Deep Blue, Sky Blue, Energy Green, White, Light Gray.
 */

export const BVC_TOKENS = {
  colors: {
    brand: {
      deepBlue: '#0B1D3A', // primary text / structural anchor
      skyBlue: '#0EA5E9',  // technical flow / active structure
      energyGreen: '#22C55E', // success / verification / trusted
      white: '#FFFFFF',
      lightGray: '#F3F6F9',
    },
    semantic: {
      authority: '#0B1D3A',
      active: '#0EA5E9',
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      slate: '#64748B',
    },
    surface: {
      canvas: '#FFFFFF',
      subtle: '#F8FAFC',
      border: '#E2E8F0',
      divider: '#F1F5F9',
    }
  },
  typography: {
    family: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    size: {
      tiny: '10px',
      xs: '11px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '18px',
    },
    weight: {
      normal: '400',
      medium: '500',
      bold: '600',
      black: '900',
    }
  },
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
    full: '9999px',
  },
  stroke: {
    thin: '1px',
    medium: '1.5px',
    thick: '2px',
  }
};
