/**
 * BVC Master Visual Design - Visual Utilities
 * VERSION: "1.0"
 */

export function decodeVisualText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x3C;/g, '<')
    .replace(/&#x3E;/g, '>')
    .replace(/&#x26;/g, '&')
    .replace(/&#x22;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x3c;/g, '<')
    .replace(/&#x3e;/g, '>')
    .replace(/&#60;/g, '<')
    .replace(/&#62;/g, '>');
}
