
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
    // Initialize scroll animations with reduced timeout
    let cleanupAnimation: (() => void) | undefined;
    
    try {
      console.log('Initializing animations');
      cleanupAnimation = initAnimations();
      
      // Remove artificial delay and load immediately
      setIsLoading(false);
      console.log('Page loaded successfully');
      
      return () => {
        if (cleanupAnimation) cleanupAnimation();
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

  // Optimalizovaná správa cache
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

  // Aktuální datum pro dynamickou aktualizaci metadat
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení</title>
        <meta name="description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace do 24 hodin." />
        <link rel="canonical" href="https://www.popri.cz/" />
        <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="google" content="notranslate"/>
        <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
        <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="keywords" content="popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA" />
        <meta name="revisit-after" content="7 days" />
        <meta property="og:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení" />
        <meta property="og:description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou." />
        <meta property="og:url" content="https://www.popri.cz/" />
        <meta property="og:site_name" content="Popri.cz" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popri.cz/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma" />
        <meta name="twitter:description" content="Hledáte spolehlivý PODA internet? Gigabitové připojení s TV zdarma." />
        <meta name="twitter:image" content="https://www.popri.cz/og-image.png" />
        <meta name="last-updated" content={currentDate} />
        
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Font preloading pro lepší výkon */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured data optimization */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Popri.cz – PODA Internet",
              "url": "https://www.popri.cz",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.popri.cz/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Popri.cz - PODA Internet",
              "url": "https://www.popri.cz",
              "logo": "https://www.popri.cz/poda-logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+420-739-065-142",
                "contactType": "customer service",
                "areaServed": "CZ",
                "availableLanguage": "Czech"
              },
              "sameAs": []
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Úvod",
                  "item": "https://www.popri.cz"
                }
              ]
            }
          `}
        </script>
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
