
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingState from "./components/page/LoadingState";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const InternetTV = lazy(() => import("./pages/InternetTV"));
const IPTV = lazy(() => import("./pages/IPTV"));
const Tarify = lazy(() => import("./pages/Tarify"));
const TvPrograms = lazy(() => import("./pages/TvPrograms"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const InternetOstrava = lazy(() => import("./pages/InternetOstrava"));
const InternetKarvina = lazy(() => import("./pages/InternetKarvina"));
const InternetBohumin = lazy(() => import("./pages/InternetBohumin"));
const InternetHavirov = lazy(() => import("./pages/InternetHavirov"));
const InternetPoruba = lazy(() => import("./pages/InternetPoruba"));
const OchranaSoukromi = lazy(() => import("./pages/OchranaSoukromi"));
const ObchodniPodminky = lazy(() => import("./pages/ObchodniPodminky"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<LoadingState />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/internet-tv" element={<InternetTV />} />
                    <Route path="/iptv" element={<IPTV />} />
                    <Route path="/tarify" element={<Tarify />} />
                    <Route path="/programy" element={<TvPrograms />} />
                    <Route path="/kontakt" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    
                    {/* Geo-specific pages */}
                    <Route path="/internet-ostrava" element={<InternetOstrava />} />
                    <Route path="/internet-karvina" element={<InternetKarvina />} />
                    <Route path="/internet-bohumin" element={<InternetBohumin />} />
                    <Route path="/internet-havirov" element={<InternetHavirov />} />
                    <Route path="/internet-poruba" element={<InternetPoruba />} />
                    
                    {/* Legal pages */}
                    <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
                    <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* Dynamic sitemap route */}
                    <Route path="/sitemap.xml" element={<Sitemap />} />
                    
                    {/* Legacy redirects */}
                    <Route path="/internet-pripojenie-karvina" element={<Navigate to="/internet-karvina" replace />} />
                    <Route path="/internet-pripojenie-ostrava" element={<Navigate to="/internet-ostrava" replace />} />
                    <Route path="/internet-pripojenie-bohumin" element={<Navigate to="/internet-bohumin" replace />} />
                    <Route path="/internet-pripojenie-havirov" element={<Navigate to="/internet-havirov" replace />} />
                    <Route path="/internet-pripojenie-poruba" element={<Navigate to="/internet-poruba" replace />} />
                    
                    {/* Slug-based blog redirects to ID-based URLs */}
                    <Route path="/blog/*" element={<Navigate to="/blog" replace />} />
                    
                    {/* 404 page */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
