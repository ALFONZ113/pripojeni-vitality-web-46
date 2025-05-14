
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BaseMetaTags from "./components/seo/BaseMetaTags";

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
        <BaseMetaTags />
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
