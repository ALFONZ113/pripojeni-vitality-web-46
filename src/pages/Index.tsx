
import { useEffect } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simple client-side cache busting without URL modification
    const refreshLocalCache = () => {
      console.log('Cache refresh performed at: ' + new Date().toISOString());
      
      // Force browser to refresh local resources without modifying URLs
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      // Add a cache-version meta tag
      const metaCache = document.querySelector('meta[name="cache-version"]');
      if (metaCache) {
        metaCache.setAttribute('content', Date.now().toString());
      } else {
        const newMetaCache = document.createElement('meta');
        newMetaCache.setAttribute('name', 'cache-version');
        newMetaCache.setAttribute('content', Date.now().toString());
        document.head.appendChild(newMetaCache);
      }
      
      // Add no-cache headers
      document.querySelectorAll('link, script, img').forEach(el => {
        const url = el.getAttribute('src') || el.getAttribute('href');
        if (url && !url.includes('?') && !url.includes('http')) {
          // Only add to relative URLs and avoid duplicating parameters
          el.setAttribute(el.hasAttribute('src') ? 'src' : 'href', url);
        }
      });
    };
    
    // Run on load and every 5 minutes (avoid modifying URLs)
    refreshLocalCache();
    const refreshInterval = setInterval(refreshLocalCache, 5 * 60 * 1000);
    
    return () => {
      cleanupAnimation();
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <TariffSection />
      <ChannelsSection />
      <ContactSection />
      <BlogPreview />
    </div>
  );
};

export default Index;
