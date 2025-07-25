
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/scroll-to-top';
import FloatingCallButton from './components/ui/floating-call-button';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Index'));
const InternetTV = lazy(() => import('./pages/InternetTV'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const InternetOstrava = lazy(() => import('./pages/InternetOstrava'));
const InternetKarvina = lazy(() => import('./pages/InternetKarvina'));
const InternetBohumin = lazy(() => import('./pages/InternetBohumin'));
const InternetHavirov = lazy(() => import('./pages/InternetHavirov'));
const InternetPoruba = lazy(() => import('./pages/InternetPoruba'));
const Tarify = lazy(() => import('./pages/Tarify'));
const Programy = lazy(() => import('./pages/TvPrograms'));
const IPTV = lazy(() => import('./pages/IPTV'));
const PromoAkcia = lazy(() => import('./pages/PromoAkcia'));
const PomocPrechodem = lazy(() => import('./pages/PomocPrechodem'));
const PrivacyPolicy = lazy(() => import('./pages/OchranaSoukromi'));
const TermsOfService = lazy(() => import('./pages/ObchodniPodminky'));
const CookiePolicy = lazy(() => import('./pages/Cookies'));
const MigrationMonitor = lazy(() => import('./pages/MigrationMonitor'));
const IndexingDashboard = lazy(() => import('./pages/IndexingDashboard'));
const MigrationCenter = lazy(() => import('./pages/MigrationCenter'));
const GigaInternet = lazy(() => import('./pages/GigaInternet'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-poda-blue"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/internet-tv" element={<InternetTV />} />
                  <Route path="/iptv" element={<IPTV />} />
                  <Route path="/kontakt" element={<Contact />} />
                  <Route path="/tarify" element={<Tarify />} />
                  <Route path="/programy" element={<Programy />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slugOrId" element={<BlogPost />} />
                  <Route path="/promo-akce" element={<PromoAkcia />} />
                  <Route path="/pomoc-s-prechodem" element={<PomocPrechodem />} />
                  
                  {/* Geographic pages */}
                  <Route path="/internet-ostrava" element={<InternetOstrava />} />
                  <Route path="/internet-karvina" element={<InternetKarvina />} />
                  <Route path="/internet-bohumin" element={<InternetBohumin />} />
                  <Route path="/internet-havirov" element={<InternetHavirov />} />
                  <Route path="/internet-poruba" element={<InternetPoruba />} />
                  
                  {/* Legal pages */}
                  <Route path="/ochrana-soukromi" element={<PrivacyPolicy />} />
                  <Route path="/obchodni-podminky" element={<TermsOfService />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  
                  {/* Migration and SEO tools */}
                  <Route path="/migration-monitor" element={<MigrationMonitor />} />
                  <Route path="/indexing-dashboard" element={<IndexingDashboard />} />
                  <Route path="/migration-center" element={<MigrationCenter />} />
                  <Route path="/giga-internet" element={<GigaInternet />} />
                  
                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <FloatingCallButton />
          </div>
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
