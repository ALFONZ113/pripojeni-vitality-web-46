
import React, { Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Hero from '../Hero';
import MobileHero from '../MobileHero';
import TariffSection from '../TariffSection';
import MobileTariffSection from '../MobileTariffSection';
import LoadingIndicator from '../common/LoadingIndicator';

// Lazy-loaded components
const ChannelsSection = React.lazy(() => import('../ChannelsSection'));
const MobileChannelsSection = React.lazy(() => import('../MobileChannelsSection'));
const ContactSection = React.lazy(() => import('../ContactSection'));
const BlogPreview = React.lazy(() => import('../BlogPreview'));
const MobileBlogPreview = React.lazy(() => import('../MobileBlogPreview'));

const HomePageContent = () => {
  const { isMobile, isReady } = useIsMobile();
  
  if (!isReady) {
    return <LoadingIndicator size="small" />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero section - conditionally render mobile or desktop version */}
      {isMobile ? <MobileHero /> : <Hero />}
      
      {/* Tariff section - conditionally render mobile or desktop version */}
      {isMobile ? <MobileTariffSection /> : <TariffSection />}
      
      {/* Channels section - conditionally render mobile or desktop version */}
      <Suspense fallback={<LoadingIndicator size="small" />}>
        {isMobile ? <MobileChannelsSection /> : <ChannelsSection />}
      </Suspense>
      
      {/* Contact section */}
      <Suspense fallback={<LoadingIndicator size="small" />}>
        <ContactSection />
      </Suspense>
      
      {/* Blog preview - conditionally render mobile or desktop version */}
      <Suspense fallback={<LoadingIndicator size="small" />}>
        {isMobile ? <MobileBlogPreview /> : <BlogPreview />}
      </Suspense>
    </div>
  );
};

export default HomePageContent;
