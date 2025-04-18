
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Index from "./pages/Index";
import InternetTV from "./pages/InternetTV";
import TvPrograms from "./pages/TvPrograms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogPost60GHz from "./pages/BlogPost60GHz";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Legal pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiesPolicy from "./pages/CookiesPolicy";

// City pages
import InternetOstrava from "./pages/cities/InternetOstrava";
import InternetKarvina from "./pages/cities/InternetKarvina";
import InternetHavirov from "./pages/cities/InternetHavirov";
import InternetBohumin from "./pages/cities/InternetBohumin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

// Create a RouteTracker component to log and handle route changes
const RouteTracker = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    console.log("Current route:", location.pathname);
    // Force scroll to top on route change
    window.scrollTo(0, 0);
    
    // Check for saved edit state
    const editStateJson = sessionStorage.getItem('editState');
    if (editStateJson) {
      try {
        const editState = JSON.parse(editStateJson);
        console.log('Detected edit state:', editState);
        
        // If the edit state is for a different path, clear it
        if (editState.path !== location.pathname) {
          console.log('Edit state path mismatch, clearing...');
          sessionStorage.removeItem('editState');
        }
        
        // If the edit state is older than 5 minutes, clear it
        const timeNow = Date.now();
        if (timeNow - editState.timestamp > 5 * 60 * 1000) {
          console.log('Edit state expired, clearing...');
          sessionStorage.removeItem('editState');
        }
      } catch (e) {
        console.error('Error parsing edit state', e);
        sessionStorage.removeItem('editState');
      }
    }
    
    // Add cache busting parameter to the URL
    const url = new URL(window.location.href);
    url.searchParams.set('cache_bust', Date.now().toString());
    window.history.replaceState({}, '', url.toString());
    
    // Ensure edit mode flag is properly set
    if (window.__LOVABLE_EDIT_MODE) {
      document.body.setAttribute('data-edit-mode', 'true');
    }
  }, [location]);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Navbar />
          <RouteTracker />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/internet-tv" element={<InternetTV />} />
              <Route path="/programy" element={<TvPrograms />} />
              <Route path="/blog" element={<Blog />} />
              {/* Important: Specific routes must come before dynamic routes */}
              <Route path="/blog/60ghz-internet" element={<BlogPost60GHz />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/kontakt" element={<Contact />} />
              
              {/* Legal pages */}
              <Route path="/ochrana-soukromi" element={<PrivacyPolicy />} />
              <Route path="/obchodni-podminky" element={<TermsConditions />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              
              {/* City pages */}
              <Route path="/internet-ostrava" element={<InternetOstrava />} />
              <Route path="/internet-karvina" element={<InternetKarvina />} />
              <Route path="/internet-havirov" element={<InternetHavirov />} />
              <Route path="/internet-bohumin" element={<InternetBohumin />} />
              
              {/* Redirects for old or incorrect URLs */}
              <Route path="/internet" element={<Navigate to="/" replace />} />
              <Route path="/tv" element={<Navigate to="/" replace />} />
              <Route path="/internet-tv/*" element={<Navigate to="/" replace />} />
              
              {/* Catch-all for non-existent URLs */}
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
