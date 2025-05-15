
import { renderToString } from 'react-dom/server';
import NoScriptFallback from '../components/seo/NoScriptFallback';

/**
 * Utility to generate static HTML content for the noscript tag
 * Used during build time to inject content into index.html
 */
export const getNoScriptContent = (): string => {
  try {
    return renderToString(<NoScriptFallback />);
  } catch (error) {
    console.error('Error rendering NoScriptFallback:', error);
    return '<div>JavaScript is required to view this site properly.</div>';
  }
};
