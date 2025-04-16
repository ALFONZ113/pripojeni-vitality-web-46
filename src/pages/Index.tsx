
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
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title for SEO
    document.title = "PODA internet a TV | Připojení-PODA.cz | Rychlý a levný internet v Ostravě";
    
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Rychlý a levný internet PODA v Ostravě, Karviné, Havířově a Bohumíně. Gigabitové optické připojení GPON s bohatou nabídkou TV programů za výhodné ceny.'
      );
    }
    
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
