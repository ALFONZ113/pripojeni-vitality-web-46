
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Právní stránky
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiesPolicy from "./pages/CookiesPolicy";

// Nové stránky pro mestá
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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Navbar />
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
              
              {/* Právní stránky */}
              <Route path="/ochrana-soukromi" element={<PrivacyPolicy />} />
              <Route path="/obchodni-podminky" element={<TermsConditions />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              
              {/* Nové stránky pre mestá */}
              <Route path="/internet-ostrava" element={<InternetOstrava />} />
              <Route path="/internet-karvina" element={<InternetKarvina />} />
              <Route path="/internet-havirov" element={<InternetHavirov />} />
              <Route path="/internet-bohumin" element={<InternetBohumin />} />
              
              {/* Přesměrování pro případné staré nebo nesprávné URL adresy */}
              <Route path="/internet" element={<Navigate to="/" replace />} />
              <Route path="/tv" element={<Navigate to="/" replace />} />
              <Route path="/internet-tv/*" element={<Navigate to="/" replace />} />
              
              {/* Catch-all - pokud uživatel zadá neexistující URL adresu */}
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
