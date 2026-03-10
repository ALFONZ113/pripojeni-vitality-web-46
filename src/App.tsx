
import { Suspense, lazy, ComponentType } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Retry wrapper for lazy imports - handles stale chunk errors after rebuilds
function lazyWithRetry(factory: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(() =>
    factory().catch((err) => {
      console.warn('Chunk load failed, retrying...', err);
      // Force reload on stale chunk
      const url = new URL(window.location.href);
      if (!url.searchParams.has('retry')) {
        url.searchParams.set('retry', '1');
        window.location.href = url.toString();
      }
      throw err;
    })
  );
}
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/scroll-to-top';
import FloatingCallButton from './components/ui/floating-call-button';

import { TrailingSlashRedirect } from './components/seo/TrailingSlashRedirect';

// Direct import for Home to eliminate loading delay
import Home from './pages/Index';

// Lazy load other components for better performance
const InternetTV = lazyWithRetry(() => import('./pages/InternetTV'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const BlogPost = lazyWithRetry(() => import('./pages/BlogPost'));
const CityTemplate = lazyWithRetry(() => import('./pages/CityTemplate'));
const Tarify = lazyWithRetry(() => import('./pages/Tarify'));
const Programy = lazyWithRetry(() => import('./pages/TvPrograms'));
const IPTV = lazyWithRetry(() => import('./pages/IPTV'));
const PromoAkcia = lazyWithRetry(() => import('./pages/PromoAkcia'));
const PomocPrechodem = lazyWithRetry(() => import('./pages/PomocPrechodem'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/OchranaSoukromi'));
const TermsOfService = lazyWithRetry(() => import('./pages/ObchodniPodminky'));
const CookiePolicy = lazyWithRetry(() => import('./pages/Cookies'));
const MigrationMonitor = lazyWithRetry(() => import('./pages/MigrationMonitor'));
const IndexingDashboard = lazyWithRetry(() => import('./pages/IndexingDashboard'));
const SEODashboard = lazyWithRetry(() => import('./pages/SEODashboard'));
const MigrationCenter = lazyWithRetry(() => import('./pages/MigrationCenter'));
const GigaInternet = lazyWithRetry(() => import('./pages/GigaInternet'));
const CanonicalDiagnostic = lazyWithRetry(() => import('./pages/CanonicalDiagnostic'));
const AdminLogin = lazyWithRetry(() => import('./pages/AdminLogin'));
const AdminDashboardPage = lazyWithRetry(() => import('./pages/AdminDashboard'));
const AIBlogTestPage = lazyWithRetry(() => import('./pages/AIBlogTest'));
const AIBlogManagerPage = lazyWithRetry(() => import('./pages/AIBlogManager'));
const AIAutomationPage = lazyWithRetry(() => import('./pages/AIAutomation'));
const SocialGeneratorPage = lazyWithRetry(() => import('./pages/SocialGenerator'));
const SocialExportPage = lazyWithRetry(() => import('./pages/SocialExport'));
const ONas = lazyWithRetry(() => import('./pages/ONas'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

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
            
            <ScrollToTop />
            <TrailingSlashRedirect />
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
                   {/* New unified admin routes */}
                   <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                   <Route path="/admin/ai-blog-test" element={<AIBlogTestPage />} />
                   <Route path="/admin/ai-blog-manager" element={<AIBlogManagerPage />} />
                   <Route path="/admin/ai-automation" element={<AIAutomationPage />} />
                   <Route path="/admin/social-generator" element={<SocialGeneratorPage />} />
                   <Route path="/admin/social-export" element={<SocialExportPage />} />
                   {/* Legacy route redirects for backwards compatibility */}
                   <Route path="/admin-dashboard-poda-2024" element={<AdminDashboardPage />} />
                  
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
