import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import LoadingState from './components/page/LoadingState';
import { LAZY_ROUTES, createLazyComponent } from './utils/codeSplitting';

// Create lazy components
const Index = createLazyComponent(LAZY_ROUTES.Home);
const Blog = createLazyComponent(LAZY_ROUTES.Blog);
const BlogPost = createLazyComponent(LAZY_ROUTES.BlogPost);
const Contact = createLazyComponent(LAZY_ROUTES.Contact);
const InternetTV = createLazyComponent(LAZY_ROUTES.InternetTV);
const IPTV = createLazyComponent(LAZY_ROUTES.IPTV);
const Tarify = createLazyComponent(LAZY_ROUTES.Tarify);
const TvPrograms = createLazyComponent(LAZY_ROUTES.TvPrograms);
const InternetOstrava = createLazyComponent(LAZY_ROUTES.InternetOstrava);
const InternetKarvina = createLazyComponent(LAZY_ROUTES.InternetKarvina);
const InternetBohumin = createLazyComponent(LAZY_ROUTES.InternetBohumin);
const InternetHavirov = createLazyComponent(LAZY_ROUTES.InternetHavirov);
const InternetPoruba = createLazyComponent(LAZY_ROUTES.InternetPoruba);
const OchranaSoukromi = createLazyComponent(LAZY_ROUTES.OchranaSoukromi);
const ObchodniPodminky = createLazyComponent(LAZY_ROUTES.ObchodniPodminky);
const Cookies = createLazyComponent(LAZY_ROUTES.Cookies);
const PromoAkce = createLazyComponent(LAZY_ROUTES.PromoAkce);
const Sitemap = createLazyComponent(LAZY_ROUTES.Sitemap);
const MigrationCenter = createLazyComponent(LAZY_ROUTES.MigrationCenter);
const IndexingDashboard = createLazyComponent(LAZY_ROUTES.IndexingDashboard);
const MigrationMonitor = createLazyComponent(LAZY_ROUTES.MigrationMonitor);

// 404 component - keep lightweight and not lazy
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-poda-blue mb-4">404</h1>
      <p className="text-gray-600 mb-4">Stránka nebola nájdená</p>
      <a href="/" className="text-poda-blue hover:underline">Späť na domovskú stránku</a>
    </div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/internet-tv" element={<InternetTV />} />
              <Route path="/iptv" element={<IPTV />} />
              <Route path="/tarify" element={<Tarify />} />
              <Route path="/programy" element={<TvPrograms />} />
              <Route path="/tv-programy" element={<TvPrograms />} />
              <Route path="/internet-ostrava" element={<InternetOstrava />} />
              <Route path="/internet-karvina" element={<InternetKarvina />} />
              <Route path="/internet-bohumin" element={<InternetBohumin />} />
              <Route path="/internet-havirov" element={<InternetHavirov />} />
              <Route path="/internet-poruba" element={<InternetPoruba />} />
              <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
              <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/promo-akce" element={<PromoAkce />} />
              <Route path="/promo-akcia" element={<PromoAkce />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/migration-center" element={<MigrationCenter />} />
              <Route path="/migration-monitor" element={<MigrationMonitor />} />
              <Route path="/indexing-dashboard" element={<IndexingDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
