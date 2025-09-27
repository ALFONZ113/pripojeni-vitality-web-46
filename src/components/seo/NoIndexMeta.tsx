import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to set noindex meta tag for parameterized URLs
 */
export const NoIndexMeta: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if URL has query parameters that should not be indexed
    const shouldNoIndex = 
      location.search.includes('tag=') ||
      location.search.includes('category=') ||
      location.search.includes('search=') ||
      location.search.includes('?utm_') ||
      location.search.includes('&utm_');

    // Find or create robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    
    if (shouldNoIndex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, follow';
    } else {
      if (robotsMeta) {
        robotsMeta.content = 'index, follow';
      }
    }
  }, [location.search]);

  return null;
};