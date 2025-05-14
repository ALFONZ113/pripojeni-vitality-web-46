
import { renderToString } from 'react-dom/server';
import NoScriptFallback from '../components/seo/NoScriptFallback';

/**
 * Utility to generate static HTML content for the noscript tag
 * Used during build time to inject content into index.html
 */
export const getNoScriptContent = (): string => {
  return renderToString(<NoScriptFallback />);
};
