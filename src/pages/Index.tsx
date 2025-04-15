
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
    
    // Force a refresh if page was loaded from cache
    const pageLoadTime = sessionStorage.getItem('index-page-load-time');
    const currentTime = new Date().getTime();
    sessionStorage.setItem('index-page-load-time', currentTime.toString());
    
    if (pageLoadTime) {
      const timeDiff = currentTime - parseInt(pageLoadTime);
      // If the page was loaded more than 5 minutes ago, refresh
      if (timeDiff > 5 * 60 * 1000) {
        window.location.reload(true);
      }
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
