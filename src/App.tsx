import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Tarify from "./pages/Tarify";
import TvPrograms from "./pages/TvPrograms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import InternetTV from "./pages/InternetTV";
import IPTV from "./pages/IPTV";
import InternetOstrava from "./pages/InternetOstrava";
import InternetKarvina from "./pages/InternetKarvina";
import InternetBohumin from "./pages/InternetBohumin";
import InternetHavirov from "./pages/InternetHavirov";
import InternetPoruba from "./pages/InternetPoruba";
import Cookies from "./pages/Cookies";
import ObchodniPodminky from "./pages/ObchodniPodminky";
import OchranaSoukromi from "./pages/OchranaSoukromi";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import IndexingDashboard from "./pages/IndexingDashboard";
import MigrationCenter from "./pages/MigrationCenter";
import MigrationMonitor from "./pages/MigrationMonitor";
import SSRMonitor from "./pages/SSRMonitor";
import SEORecovery from "./pages/SEORecovery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/tarify" element={<Tarify />} />
              <Route path="/programy" element={<TvPrograms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/internet-tv" element={<InternetTV />} />
              <Route path="/iptv" element={<IPTV />} />
              <Route path="/internet-ostrava" element={<InternetOstrava />} />
              <Route path="/internet-karvina" element={<InternetKarvina />} />
              <Route path="/internet-bohumin" element={<InternetBohumin />} />
              <Route path="/internet-havirov" element={<InternetHavirov />} />
              <Route path="/internet-poruba" element={<InternetPoruba />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
              <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/indexing-dashboard" element={<IndexingDashboard />} />
              <Route path="/migration-center" element={<MigrationCenter />} />
              <Route path="/migration-monitor" element={<MigrationMonitor />} />
              <Route path="/ssr-monitor" element={<SSRMonitor />} />
              <Route path="/seo-recovery" element={<SEORecovery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
