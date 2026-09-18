/**
 * ENERIX Carbon - Public Product Homepage Proxy / Canonical Page
 */

import { renderPublicOverviewPage } from './public-overview.js';

export function renderOverviewPage(options = {}) {
  return renderPublicOverviewPage(options);
}

renderOverviewPage.attachEvents = function(container) {
  if (typeof renderPublicOverviewPage.attachEvents === 'function') {
    renderPublicOverviewPage.attachEvents(container);
  }
};
