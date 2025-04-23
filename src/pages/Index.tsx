
import { useEffect } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simplified cache busting approach
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
      }
    };
    
    // Run cache refresh once on load
    refreshLocalCache();
    
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Helmet>
      <Hero />
      <TariffSection />
      <ChannelsSection />
      <ContactSection />
      <BlogPreview />
    </div>
  );
};

export default Index;
