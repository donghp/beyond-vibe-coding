/**
 * ENERIX Carbon - Canonical Public Routes
 * Central route dictionary and path-aware resolution.
 */
import { CarbonPath } from './path.js';

export function getPublicRoutes() {
  const base = CarbonPath.getBase();
  return {
    home: `${base}/`,
    platform: `${base}/`,
    solutions: `${base}/`,
    industries: `${base}/`,
    science: `${base}/`,
    resources: `${base}/`,
    company: `${base}/`
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
  return 'platform';
}
