
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Index from "./pages/Index";
import InternetTV from "./pages/InternetTV";
import TvPrograms from "./pages/TvPrograms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import OchranaSoukromi from "./pages/OchranaSoukromi";
import ObchodniPodminky from "./pages/ObchodniPodminky";
import Cookies from "./pages/Cookies";
import Tarify from "./pages/Tarify";
import IPTV from "./pages/IPTV";

// Geo-specific pages
import InternetOstrava from "./pages/InternetOstrava";
import InternetHavirov from "./pages/InternetHavirov";
import InternetKarvina from "./pages/InternetKarvina";
import InternetBohumin from "./pages/InternetBohumin";
import InternetPoruba from "./pages/InternetPoruba";

// Create a centralized query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: import.meta.env.PROD, // Only in production
    },
  },
});

// ScrollToTop component with improved behavior
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Only scroll to top on path changes (not on hash or search changes)
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // If there's a hash, scroll to that element
      const elementToScroll = document.querySelector(location.hash);
      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, location.hash]);
  
  return null;
};

const App = () => {
  useEffect(() => {
    // Add console message to check if app is loading correctly
    console.log('App component mounted at:', new Date().toISOString());
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/internet-tv" element={<InternetTV />} />
                <Route path="/programy" element={<TvPrograms />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
                <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/tarify" element={<Tarify />} />
                <Route path="/iptv" element={<IPTV />} />
                
                {/* Geo-specific pages - FIXED: Added missing /internet-poruba */}
                <Route path="/internet-ostrava" element={<InternetOstrava />} />
                <Route path="/internet-havirov" element={<InternetHavirov />} />
                <Route path="/internet-karvina" element={<InternetKarvina />} />
                <Route path="/internet-bohumin" element={<InternetBohumin />} />
                <Route path="/internet-poruba" element={<InternetPoruba />} />
                
                {/* Blog post redirects for slug-based URLs */}
                <Route path="/blog/opticke-pripojenie-poda-budurnost-internetu" element={<Navigate to="/blog/1" replace />} />
                <Route path="/blog/gpon-technologie-moravskoslezsky-region" element={<Navigate to="/blog/2" replace />} />
                <Route path="/blog/fiber-to-home-ftth-budurnost-opticka" element={<Navigate to="/blog/3" replace />} />
                <Route path="/blog/7-klucovych-vyhod-optickeho-internetu-poda" element={<Navigate to="/blog/4" replace />} />
                <Route path="/blog/router-mercusys-nastavenie-wifi-siete" element={<Navigate to="/blog/5" replace />} />
                <Route path="/blog/optimalizacia-wifi-12-tipov-lepsi-signal" element={<Navigate to="/blog/6" replace />} />
                <Route path="/blog/online-bezpernost-kompletny-sprievodca" element={<Navigate to="/blog/7" replace />} />
                <Route path="/blog/domaca-siet-navod-nastavenie-optimalizacia" element={<Navigate to="/blog/8" replace />} />
                <Route path="/blog/streaming-gaming-optimalizacia-internetu" element={<Navigate to="/blog/9" replace />} />
                <Route path="/blog/rychly-internet-karvina-poda-revolucia" element={<Navigate to="/blog/10" replace />} />
                <Route path="/blog/testovanie-rychlosti-internetu-sprievodca" element={<Navigate to="/blog/11" replace />} />
                <Route path="/blog/internet-poda-ostrava-poruba-gigabitove" element={<Navigate to="/blog/100" replace />} />
                <Route path="/blog/60-ghz-technologia-revolucia-bezdrôtovom" element={<Navigate to="/blog/12" replace />} />
                
                {/* Legacy URL redirects */}
                <Route path="/stary-clanek" element={<Navigate to="/blog/novy-clanek" replace />} />
                <Route path="/akce" element={<Navigate to="/tarify" replace />} />
                <Route path="/sluzby" element={<Navigate to="/internet-tv" replace />} />
                
                {/* 404 catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
