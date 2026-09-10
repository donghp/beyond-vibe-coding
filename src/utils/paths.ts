/**
 * Beyond Vibe Coding — Canonical Path & Base Resolution Utilities
 *
 * Provides safe path joining for Astro BASE_URL across GAIS Preview and GitHub Pages production.
 */

export function joinBase(relativePath: string = ''): string {
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Ensure base starts and ends with '/'
  let cleanBase = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl;
  if (!cleanBase.endsWith('/')) {
    cleanBase += '/';
  }

  // Handle empty or root path
  if (!relativePath || relativePath === '/') {
    return cleanBase;
  }

  // Handle anchors like "#chapters"
  if (relativePath.startsWith('#')) {
    return cleanBase + relativePath;
  }

  // Remove leading slashes
  let cleanRelative = relativePath.trim().replace(/^\/+/, '');

  // Strip duplicate base name if passed in relativePath
  const baseName = cleanBase.replace(/^\/+|\/+$/g, '');
  if (baseName && cleanRelative.startsWith(baseName + '/')) {
    cleanRelative = cleanRelative.slice(baseName.length + 1);
  } else if (baseName && cleanRelative === baseName) {
    return cleanBase;
  }

  return cleanBase + cleanRelative;
}
