
/**
 * This is a non-JSX version of the renderToString utility
 * specifically created for use in vite.config.ts to avoid JSX processing issues
 */

import { renderToString } from 'react-dom/server';
import NoScriptFallback from '../components/seo/NoScriptFallback';

/**
 * Utility to generate static HTML content for the noscript tag
 * Used during build time to inject content into index.html
 */
export function getNoScriptContent(): string {
  try {
    // We import and use the JSX component but within a regular TypeScript file
    return renderToString(NoScriptFallback({}));
  } catch (error) {
    console.error('Error rendering NoScriptFallback:', error);
    return '<div>JavaScript is required to view this site properly.</div>';
  }
}
