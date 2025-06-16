
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ui/scroll-to-top";
import LoadingState from "./components/page/LoadingState";

// Lazy load pages for better performance
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const InternetTV = lazy(() => import("./pages/InternetTV"));
const IPTV = lazy(() => import("./pages/IPTV"));
const Tarify = lazy(() => import("./pages/Tarify"));
const TvPrograms = lazy(() => import("./pages/TvPrograms"));
const InternetOstrava = lazy(() => import("./pages/InternetOstrava"));
const InternetKarvina = lazy(() => import("./pages/InternetKarvina"));
const InternetBohumin = lazy(() => import("./pages/InternetBohumin"));
const InternetHavirov = lazy(() => import("./pages/InternetHavirov"));
const InternetPoruba = lazy(() => import("./pages/InternetPoruba"));
const OchranaSoukromi = lazy(() => import("./pages/OchranaSoukromi"));
const ObchodniPodminky = lazy(() => import("./pages/ObchodniPodminky"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const MigrationMonitor = lazy(() => import("./pages/MigrationMonitor"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white">
              <Navbar />
              <main>
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
                    <Route path="/internet-ostrava" element={<InternetOstrava />} />
                    <Route path="/internet-karvina" element={<InternetKarvina />} />
                    <Route path="/internet-bohumin" element={<InternetBohumin />} />
                    <Route path="/internet-havirov" element={<InternetHavirov />} />
                    <Route path="/internet-poruba" element={<InternetPoruba />} />
                    <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
                    <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/sitemap.xml" element={<Sitemap />} />
                    <Route path="/migration-monitor" element={<MigrationMonitor />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ScrollToTop />
              <Toaster />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
