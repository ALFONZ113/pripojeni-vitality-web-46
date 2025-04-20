
import { useEffect } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';

const Index = () => {
  useEffect(() => {
    // Kontrola, zda jsme na non-www doméně a přesměrování na www verzi s cache-busting parametrem
    const hostname = window.location.hostname;
    if (hostname === 'pripojeni-poda.cz') {
      const timestamp = new Date().getTime();
      window.location.href = `https://www.pripojeni-poda.cz${window.location.pathname}?cb=${timestamp}`;
      return;
    }
    
    // Přidáno pro vynucení obnovení cache i pro www verzi, pokud ještě nejsme v režimu s cache-busting
    if (hostname === 'www.pripojeni-poda.cz' && !window.location.search.includes('cb=')) {
      const timestamp = new Date().getTime();
      window.location.href = `${window.location.pathname}?cb=${timestamp}`;
      return;
    }
    
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Force reload CSS to bust cache
    const reloadStyles = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      if (links.length > 0) {
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href) {
            const newHref = href.includes('?') 
              ? `${href}&t=${new Date().getTime()}` 
              : `${href}?t=${new Date().getTime()}`;
            link.setAttribute('href', newHref);
          }
        });
      }
    };
    
    // Spustit obnovení stylů při načtení stránky
    reloadStyles();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    return () => {
      cleanupAnimation();
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
