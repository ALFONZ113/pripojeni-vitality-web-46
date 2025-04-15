
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

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

const queryClient = new QueryClient();

const App = () => {
  // Efekt pro správnou normalizaci URL
  useEffect(() => {
    // Získáme aktuální URL
    const currentUrl = window.location.href;
    
    // Kontrola, zda URL obsahuje neplatný formát 'wwwpripojeni-poda.cz' (bez tečky)
    if (currentUrl.includes("wwwpripojeni-poda.cz") && !currentUrl.includes("www.pripojeni-poda.cz")) {
      // Přesměrujeme na správnou URL s 'www.'
      window.location.href = currentUrl.replace("wwwpripojeni-poda.cz", "www.pripojeni-poda.cz");
    }
    
    // Kontrola, zda URL neobsahuje 'www.' a obsahuje 'pripojeni-poda.cz'
    if (!currentUrl.includes("www.") && currentUrl.includes("pripojeni-poda.cz")) {
      // Přesměrujeme na správnou URL s 'www.'
      window.location.href = currentUrl.replace("pripojeni-poda.cz", "www.pripojeni-poda.cz");
    }
    
    // Kontrola, zda URL končí lomítkem
    if (!currentUrl.endsWith("/") && !currentUrl.includes("#") && !currentUrl.includes("?")) {
      // Přesměrujeme na URL s lomítkem na konci
      window.location.href = currentUrl + "/";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Zajistíme, že internet-tv se zobrazí jen když uživatel klikne přímo na tento odkaz */}
              <Route path="/internet-tv" element={<InternetTV />} />
              <Route path="/programy" element={<TvPrograms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/60ghz-internet" element={<BlogPost60GHz />} />
              <Route path="/kontakt" element={<Contact />} />
              
              {/* Přesměrování pro případné staré nebo nesprávné URL adresy */}
              <Route path="/internet" element={<Navigate to="/" replace />} />
              <Route path="/tv" element={<Navigate to="/" replace />} />
              <Route path="/internet-tv/*" element={<Navigate to="/" replace />} />
              
              {/* Přesměrování pro neplatné URL formáty */}
              <Route path="/wwwpripojeni-poda.cz/*" element={<Navigate to="/" replace />} />
              <Route path="/https:/*" element={<Navigate to="/" replace />} />
              
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
