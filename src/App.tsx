
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/scroll-to-top';
import FloatingCallButton from './components/ui/floating-call-button';
import ScrollProgressBar from './components/ui/scroll-progress-bar';
import { NoIndexMeta } from './components/seo/NoIndexMeta';

// Direct import for Home to eliminate loading delay
import Home from './pages/Index';

// Lazy load other components for better performance
const InternetTV = lazy(() => import('./pages/InternetTV'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CityTemplate = lazy(() => import('./pages/CityTemplate'));
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
const SEODashboard = lazy(() => import('./pages/SEODashboard'));
const MigrationCenter = lazy(() => import('./pages/MigrationCenter'));
const GigaInternet = lazy(() => import('./pages/GigaInternet'));
const CanonicalDiagnostic = lazy(() => import('./pages/CanonicalDiagnostic'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AIBlogTest = lazy(() => import('./pages/AIBlogTest'));
const AIBlogManager = lazy(() => import('./pages/AIBlogManager'));
const AIAutomation = lazy(() => import('./pages/AIAutomation'));
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
          <div className="min-h-screen bg-background flex flex-col">
            <ScrollProgressBar />
            <ScrollToTop />
            <NoIndexMeta />
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={
                <div className="min-h-[200px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary opacity-50"></div>
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
                  
                  {/* Geographic pages - Dynamic route for all cities */}
                  <Route path="/internet-ostrava" element={<CityTemplate />} />
                  <Route path="/internet-poruba" element={<CityTemplate />} />
                  <Route path="/internet-karvina" element={<CityTemplate />} />
                  <Route path="/internet-havirov" element={<CityTemplate />} />
                  <Route path="/internet-bohumin" element={<CityTemplate />} />
                  <Route path="/internet-frydek-mistek" element={<CityTemplate />} />
                  <Route path="/internet-orlova" element={<CityTemplate />} />
                  <Route path="/internet-brno" element={<CityTemplate />} />
                  <Route path="/internet-svitavy" element={<CityTemplate />} />
                  <Route path="/internet-policka" element={<CityTemplate />} />
                  <Route path="/internet-vysoke-myto" element={<CityTemplate />} />
                  <Route path="/internet-tyniste-nad-orlici" element={<CityTemplate />} />
                  
                  {/* Legal pages */}
                  <Route path="/ochrana-soukromi" element={<PrivacyPolicy />} />
                  <Route path="/obchodni-podminky" element={<TermsOfService />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  
                  {/* Migration and SEO tools */}
                  <Route path="/migration-monitor" element={<MigrationMonitor />} />
                  <Route path="/indexing-dashboard" element={<IndexingDashboard />} />
                  <Route path="/seo-dashboard" element={<SEODashboard />} />
                  <Route path="/migration-center" element={<MigrationCenter />} />
                  <Route path="/giga-internet" element={<GigaInternet />} />
                  <Route path="/canonical-diagnostic" element={<CanonicalDiagnostic />} />
                  
                  {/* Admin panel - hidden routes */}
                  <Route path="/admin-login-poda-2024" element={<AdminLogin />} />
                  <Route path="/admin-dashboard-poda-2024" element={<AdminDashboard />} />
                  <Route path="/admin/ai-blog-test" element={<AIBlogTest />} />
                  <Route path="/admin/ai-blog-manager" element={<AIBlogManager />} />
                  <Route path="/admin/ai-automation" element={<AIAutomation />} />
                  
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
