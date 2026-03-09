import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Redirects trailing slash URLs to non-trailing slash versions.
 * Also strips query parameters from blog post URLs to prevent duplicate indexing.
 */
export const TrailingSlashRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect trailing slashes (except root "/")
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      const cleanPath = location.pathname.slice(0, -1);
      navigate(cleanPath + location.search + location.hash, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};
