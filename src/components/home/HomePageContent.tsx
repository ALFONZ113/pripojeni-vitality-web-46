
import React, { Suspense } from 'react';
import Hero from '../Hero';
import TariffSection from '../TariffSection';
import LoadingIndicator from '../common/LoadingIndicator';

// Lazy-loaded components
const ChannelsSection = React.lazy(() => import('../ChannelsSection'));
const ContactSection = React.lazy(() => import('../ContactSection'));
const BlogPreview = React.lazy(() => import('../BlogPreview'));

const HomePageContent = () => {
  return (
    <div className="min-h-screen">
      {/* LCP (Largest Contentful Paint) optimized components rendered immediately */}
      <Hero />
      <TariffSection />
      
      {/* Non-critical components lazy loaded */}
      <Suspense fallback={<LoadingIndicator size="small" />}>
        <ChannelsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingIndicator size="small" />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<LoadingIndicator size="small" />}>
        <BlogPreview />
      </Suspense>
    </div>
  );
};

export default HomePageContent;
