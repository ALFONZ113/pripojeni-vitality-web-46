
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize scroll animations
    let cleanupAnimation: (() => void) | undefined;
    
    try {
      console.log('Initializing animations');
      cleanupAnimation = initAnimations();
      
      // Simulate page loading or fetch critical data
      const timer = setTimeout(() => {
        setIsLoading(false);
        console.log('Page loaded successfully');
      }, 500);
      
      return () => {
        if (cleanupAnimation) cleanupAnimation();
        clearTimeout(timer);
      };
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      setIsLoading(false);
      return () => {
        if (cleanupAnimation) cleanupAnimation();
      };
    }
  }, []);

  // Optimized cache management function
  useEffect(() => {
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
    
    // Only clear relevant caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('popri-resources')) {
            caches.delete(name);
          }
        });
      });
    }
    
    // Update cache version
    localStorage.setItem('lastCacheUpdate', now.toString());
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-poda-blue animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">Chyba při načítání</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Obnovit stránku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>PODA Internet Připojení | Rychlá Instalace a TV Zdarma | Popri.cz</title>
        <meta name="description" content="Potřebujete připojit PODA internet? ✓ Zařídíme rychlou instalaci ✓ Garantovaná rychlost až 1000 Mbps ✓ 100+ TV programů zdarma ✓ Non-stop podpora ✓ Bez závazků" />
        <link rel="canonical" href="https://www.popri.cz/" />
        <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
        <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap-popri.xml" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="alternate" href="https://popri.cz/" hrefLang="cs" />
        <meta name="keywords" content="PODA internet, připojení PODA, rychlá instalace internetu, internet s TV zdarma, optický internet PODA, gigabitový internet, PODA TV, internetové připojení Ostrava" />
        
        {/* Updated favicon links */}
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
        <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
        <meta name="robots" content="index, follow" />
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
