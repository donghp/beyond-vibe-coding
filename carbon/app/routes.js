/**
 * ENERIX Carbon - Canonical Public Routes
 * Central route dictionary and path-aware resolution.
 */
import { CarbonPath } from './path.js';

export function getPublicRoutes() {
  const base = CarbonPath.getBase();
  return {
    home: `${base}/`,
    platform: `${base}/platform/`,
    solutions: `${base}/solutions/`,
    industries: `${base}/industries/`,
    science: `${base}/science/`,
    resources: `${base}/resources/`,
    company: `${base}/company/`
  };
}

export const PUBLIC_ROUTES = new Proxy({}, {
  get(target, prop) {
    const routes = getPublicRoutes();
    return routes[prop] || `${CarbonPath.getBase()}/`;
  }
});

/**
 * Derives active public route name from window.location.pathname
 * Fallback to stateStore route if on root/home or in SPA mode.
 */
export function getActivePublicRoute() {
  if (typeof window === 'undefined') return 'overview';
  const pathname = window.location.pathname;
  if (pathname.includes('/carbon/platform') || pathname.endsWith('/platform') || pathname.endsWith('/platform/')) return 'platform';
  if (pathname.includes('/carbon/solutions') || pathname.endsWith('/solutions') || pathname.endsWith('/solutions/')) return 'solutions';
  if (pathname.includes('/carbon/industries') || pathname.endsWith('/industries') || pathname.endsWith('/industries/')) return 'industries';
  if (pathname.includes('/carbon/science') || pathname.endsWith('/science') || pathname.endsWith('/science/')) return 'science';
  if (pathname.includes('/carbon/resources') || pathname.endsWith('/resources') || pathname.endsWith('/resources/')) return 'resources';
  if (pathname.includes('/carbon/company') || pathname.endsWith('/company') || pathname.endsWith('/company/')) return 'company';
  
  if (window.stateStore && typeof window.stateStore.getRoute === 'function') {
    return window.stateStore.getRoute();
  }
  return 'overview';
}
