/**
 * Beyond Vibe Coding — Canonical Path & Base Resolution Utilities
 *
 * Provides safe path joining for Astro BASE_URL across GAIS Preview and GitHub Pages production.
 */

export function joinBase(relativePath: string = ''): string {
  // Use import.meta.env.BASE_URL which Astro provides correctly based on config
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure baseUrl ends with a slash and starts with a slash
  let cleanBase = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl;
  if (!cleanBase.endsWith('/')) {
    cleanBase += '/';
  }
  
  // Handle empty or root requests
  if (!relativePath || relativePath === '/' || relativePath === '') {
    return cleanBase;
  }

  // If it's already an absolute URL or data URI, return as is
  if (relativePath.startsWith('http') || relativePath.startsWith('data:')) {
    return relativePath;
  }
  
  // Handle anchors
  if (relativePath.startsWith('#')) {
    return cleanBase + relativePath;
  }
  
  // Strip leading slash from relativePath to avoid double slashes when joining
  const cleanRelative = relativePath.trim().replace(/^\/+/, '');
  
  return cleanBase + cleanRelative;
}
