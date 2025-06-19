
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const InternetTV = lazy(() => import('./pages/InternetTV'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const InternetOstrava = lazy(() => import('./pages/geo/InternetOstrava'));
const InternetKarvina = lazy(() => import('./pages/geo/InternetKarvina'));
const InternetBohumin = lazy(() => import('./pages/geo/InternetBohumin'));
const InternetHavirov = lazy(() => import('./pages/geo/InternetHavirov'));
const InternetPoruba = lazy(() => import('./pages/geo/InternetPoruba'));
const Tarify = lazy(() => import('./pages/Tarify'));
const Programy = lazy(() => import('./pages/Programy'));
const IPTV = lazy(() => import('./pages/IPTV'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const MigrationMonitor = lazy(() => import('./pages/MigrationMonitor'));
const IndexingDashboard = lazy(() => import('./pages/IndexingDashboard'));
const MigrationCenter = lazy(() => import('./pages/MigrationCenter'));

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
                  <Route path="/blog/:id" element={<BlogPost />} />
                  
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
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
