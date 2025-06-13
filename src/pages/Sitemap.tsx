
import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Redirect to static sitemap.xml file
    window.location.replace('/sitemap.xml');
  }, []);

  // Return null as this component only redirects
  return null;
};

export default Sitemap;
