
import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Hero from '../Hero';
import TariffSection from '../TariffSection';

// Lazy-loaded components for better initial loading
const ChannelsSection = lazy(() => import('../ChannelsSection'));
const ContactSection = lazy(() => import('../ContactSection'));
const BlogPreview = lazy(() => import('../BlogPreview'));

const MainContent = () => {
  return (
    <div className="min-h-screen">
      {/* LCP (Largest Contentful Paint) optimized components rendered immediately */}
      <Hero />
      <TariffSection />
      
      {/* Non-critical components lazy loaded */}
      <Suspense fallback={<div className="h-20 flex items-center justify-center"><Loader2 className="w-6 h-6 text-poda-blue animate-spin" /></div>}>
        <ChannelsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 flex items-center justify-center"><Loader2 className="w-6 h-6 text-poda-blue animate-spin" /></div>}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 flex items-center justify-center"><Loader2 className="w-6 h-6 text-poda-blue animate-spin" /></div>}>
        <BlogPreview />
      </Suspense>
    </div>
  );
};

export default MainContent;
