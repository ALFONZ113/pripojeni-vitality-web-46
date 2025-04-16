
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
    
    return () => {
      cleanupAnimation();
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
