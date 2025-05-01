
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
    
    // Cache management - selective approach
    const refreshLocalCache = () => {
      // Only update cache if it's older than 24 hours or doesn't exist
      const lastCacheUpdate = localStorage.getItem('lastCacheUpdate');
      const now = Date.now();
      const cacheAge = lastCacheUpdate ? now - parseInt(lastCacheUpdate, 10) : Infinity;
      
      // If cache is recent, skip the refresh
      if (cacheAge < 24 * 60 * 60 * 1000) {
        console.log('Cache is recent, skipping refresh');
        return;
      }
      
      console.log('Cache refresh performed at: ' + new Date().toISOString());
      
      // Only clear relevant caches, not all caches
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            if (name.includes('popri-resources')) {
              caches.delete(name);
            }
          });
        });
      }
      
      // Update cache version meta tag and localStorage timestamp
      const metaCache = document.querySelector('meta[name="cache-version"]');
      const versionTimestamp = now.toString();
      if (metaCache) {
        metaCache.setAttribute('content', versionTimestamp);
      }
      localStorage.setItem('lastCacheUpdate', versionTimestamp);
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
        <title>PODA Internet Připojení | Rychlá Instalace a TV Zdarma | Popri.cz</title>
        <meta name="description" content="Potřebujete připojit PODA internet? ✓ Zařídíme rychlou instalaci ✓ Garantovaná rychlost až 1000 Mbps ✓ 100+ TV programů zdarma ✓ Non-stop podpora ✓ Bez závazků" />
        <link rel="canonical" href="https://www.popri.cz/" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="alternate" href="https://popri.cz/" hrefLang="cs" />
        <meta name="keywords" content="PODA internet, připojení PODA, rychlá instalace internetu, internet s TV zdarma, optický internet PODA, gigabitový internet, PODA TV, internetové připojení Ostrava" />
        <link rel="icon" href="/poda-favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/poda-favicon-32x32.png" sizes="32x32" type="image/png"/>
        <link rel="icon" href="/poda-favicon-16x16.png" sizes="16x16" type="image/png"/>
        <link rel="icon" href="/poda-favicon-48x48.png" sizes="48x48" type="image/png"/>
        <link rel="icon" href="/poda-favicon-96x96.png" sizes="96x96" type="image/png"/>
        <link rel="icon" href="/poda-favicon-192x192.png" sizes="192x192" type="image/png"/>
        <link rel="icon" href="/poda-favicon-512x512.png" sizes="512x512" type="image/png"/>
        <link rel="apple-touch-icon" href="/poda-apple-touch-icon.png"/>
        <meta name="google" content="notranslate"/>
        <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
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
