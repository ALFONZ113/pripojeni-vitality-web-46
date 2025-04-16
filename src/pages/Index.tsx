
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';

const Index = () => {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  
  useEffect(() => {
    // Inicializace scroll animací
    const cleanupAnimation = initAnimations();
    
    // Scroll na začátek při mount komponentu
    window.scrollTo(0, 0);
    
    // Vynucené obnovení, pokud stránka byla načtena z cache
    const pageLoadTime = sessionStorage.getItem('index-page-load-time');
    const currentTime = new Date().getTime();
    sessionStorage.setItem('index-page-load-time', currentTime.toString());
    
    if (pageLoadTime) {
      const timeDiff = currentTime - parseInt(pageLoadTime);
      // Pokud stránka byla načtena před více než 5 minutami, obnovit
      if (timeDiff > 5 * 60 * 1000) {
        window.location.reload();
      }
    }
    
    // Kontrola reálného načtení zdrojů a nastavení stavu
    const checkIfFullyLoaded = () => {
      // Ověření, že všechny obrázky jsou načteny
      const allImages = document.querySelectorAll('img');
      const imagesLoaded = Array.from(allImages).every(img => img.complete);
      
      if (imagesLoaded) {
        setIsFullyLoaded(true);
        document.body.classList.add('loaded');
      } else {
        setTimeout(checkIfFullyLoaded, 100);
      }
    };
    
    // Spustit kontrolu po krátké prodlevě
    setTimeout(checkIfFullyLoaded, 200);
    
    // Naplánovat vynucené obnovení po 30 minutách
    const refreshTimeout = setTimeout(() => {
      window.location.reload();
    }, 30 * 60 * 1000);
    
    return () => {
      cleanupAnimation();
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isFullyLoaded ? 'content-loaded' : 'content-loading'}`}>
      <Hero />
      <TariffSection />
      <ChannelsSection />
      <ContactSection />
      <BlogPreview />
    </div>
  );
};

export default Index;
