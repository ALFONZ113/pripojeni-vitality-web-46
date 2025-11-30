/**
 * Universal Canonical Tag Component
 * Ensures every page has a proper canonical URL
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { 
  generateCanonicalUrlStrict, 
  getRobotsTag,
  shouldIndexPage 
} from '../../utils/canonicalUrlFixer';

interface UniversalCanonicalTagProps {
  /**
   * Override canonical URL (optional)
   * If not provided, will be auto-generated from current path
   */
  canonicalUrl?: string;
  
  /**
   * Override robots tag (optional)
   */
  robotsOverride?: string;
}

const UniversalCanonicalTag = ({ 
  canonicalUrl, 
  robotsOverride 
}: UniversalCanonicalTagProps) => {
  const location = useLocation();
  
  // Generate canonical URL
  const finalCanonicalUrl = canonicalUrl || generateCanonicalUrlStrict(location.pathname);
  
  // Generate robots tag
  const robotsTag = robotsOverride || getRobotsTag(location.pathname);
  
  // Log canonical URL for debugging (only in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[Canonical URL]:', finalCanonicalUrl);
      console.log('[Robots Tag]:', robotsTag);
      console.log('[Should Index]:', shouldIndexPage(location.pathname));
    }
  }, [finalCanonicalUrl, robotsTag, location.pathname]);
  
  return (
    <Helmet>
      <link rel="canonical" href={finalCanonicalUrl} />
      <meta name="robots" content={robotsTag} />
      <meta name="googlebot" content={robotsTag} />
      <meta name="bingbot" content={robotsTag} />
    </Helmet>
  );
};

export default UniversalCanonicalTag;
