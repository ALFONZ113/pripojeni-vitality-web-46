
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
    
    // Client-side only cache busting (no URL modifications)
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
      
      // Set a meta tag for cache version
      const metaCache = document.querySelector('meta[name="cache-version"]');
      if (metaCache) {
        metaCache.setAttribute('content', new Date().getTime().toString());
      } else {
        const newMetaCache = document.createElement('meta');
        newMetaCache.setAttribute('name', 'cache-version');
        newMetaCache.setAttribute('content', new Date().getTime().toString());
        document.head.appendChild(newMetaCache);
      }
    };
    
    // Run on load and every 5 minutes
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
