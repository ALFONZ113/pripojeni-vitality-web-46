
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

const queryClient = new QueryClient();

// Cache busting function
const applyForcedRefresh = () => {
  // Check if on the production domain
  if (window.location.hostname === 'www.pripojeni-poda.cz' || window.location.hostname === 'pripojeni-poda.cz') {
    // Add version parameter to CSS links
    document.querySelectorAll('link[rel="stylesheet"]').forEach((element) => {
      const link = element as HTMLLinkElement;
      if (link.href && !link.href.includes('?v=')) {
        link.href = `${link.href}?v=${new Date().getTime()}`;
      }
    });

    // Add version parameter to script sources
    document.querySelectorAll('script').forEach((element) => {
      const script = element as HTMLScriptElement;
      if (script.src && !script.src.includes('?v=') && script.src.includes('pripojeni-poda.cz')) {
        const newSrc = `${script.src}?v=${new Date().getTime()}`;
        script.src = newSrc;
      }
    });

    // Add version parameter to image sources
    document.querySelectorAll('img').forEach((element) => {
      const img = element as HTMLImageElement;
      if (img.src && !img.src.includes('?v=')) {
        img.src = `${img.src}?v=${new Date().getTime()}`;
      }
    });

    // Clear browser cache for this page
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }
};

// ScrollToTop component to ensure page starts at the top
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Apply cache busting on every route change
    applyForcedRefresh();
  }, [location]);
  
  return null;
};

const App = () => {
  // Apply cache busting on initial load
  useEffect(() => {
    applyForcedRefresh();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
