
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
    
    // Force cache refresh for ALL images and resources on the main page
    const refreshImages = () => {
      const timestamp = new Date().getTime();
      
      // Refresh all images
      document.querySelectorAll('img').forEach((img: HTMLImageElement) => {
        if (img.src && !img.src.includes('?v=')) {
          img.src = `${img.src}?v=${timestamp}`;
        }
      });
      
      // Refresh all stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach((link: HTMLLinkElement) => {
        if (link.href && !link.href.includes('?v=')) {
          link.href = `${link.href}?v=${timestamp}`;
        }
      });
      
      // Refresh all scripts
      document.querySelectorAll('script').forEach((script: HTMLScriptElement) => {
        if (script.src && !script.src.includes('?v=')) {
          const newScript = document.createElement('script');
          newScript.src = `${script.src}?v=${timestamp}`;
          script.parentNode?.replaceChild(newScript, script);
        }
      });
      
      // Set a meta tag for cache version
      const metaCache = document.createElement('meta');
      metaCache.setAttribute('name', 'cache-version');
      metaCache.setAttribute('content', timestamp.toString());
      document.head.appendChild(metaCache);
      
      // Notify console for debugging
      console.log('Cache refresh performed at: ' + new Date().toISOString());
    };
    
    // Run on load and every 5 minutes
    refreshImages();
    const refreshInterval = setInterval(refreshImages, 5 * 60 * 1000);
    
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
