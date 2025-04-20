
import { useEffect } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';

const Index = () => {
  useEffect(() => {
    // Kontrola, zda jsme na non-www doméně a přesměrování na www verzi
    const hostname = window.location.hostname;
    if (hostname === 'pripojeni-poda.cz') {
      window.location.href = 'https://www.pripojeni-poda.cz' + window.location.pathname;
      return;
    }
    
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
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
