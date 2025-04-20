
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
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import OchranaSoukromi from "./pages/OchranaSoukromi";
import ObchodniPodminky from "./pages/ObchodniPodminky";
import Cookies from "./pages/Cookies";
import Tarify from "./pages/Tarify";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  useEffect(() => {
    // Kontrola, zda jsme na non-www doméně a přesměrování na www verzi
    const hostname = window.location.hostname;
    if (hostname === 'pripojeni-poda.cz') {
      // Přidáme cache-busting parametr pro zajištění aktuální verze
      const timestamp = new Date().getTime();
      window.location.href = `https://www.pripojeni-poda.cz${window.location.pathname}${window.location.search ? window.location.search + '&' : '?'}cb=${timestamp}${window.location.hash}`;
    }
    
    // Přidáno pro vynucení obnovení cache i pro www verzi, pokud ještě nejsme v režimu s cache-busting
    if (hostname === 'www.pripojeni-poda.cz' && !window.location.search.includes('cb=')) {
      const timestamp = new Date().getTime();
      window.location.href = `${window.location.pathname}${window.location.search ? window.location.search + '&' : '?'}cb=${timestamp}${window.location.hash}`;
    }
    
    // Vynucení obnovení cache pro statické soubory
    const forceRefresh = () => {
      console.log('Forcing cache refresh for static resources...');
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const scripts = document.querySelectorAll('script[src]');
      const timestamp = new Date().getTime();
      
      links.forEach(link => {
        const htmlLink = link as HTMLLinkElement;
        const url = new URL(htmlLink.href);
        url.searchParams.set('v', timestamp.toString());
        htmlLink.href = url.toString();
      });
      
      scripts.forEach(script => {
        const htmlScript = script as HTMLScriptElement;
        if (htmlScript.src && !htmlScript.src.includes('googleapis.com') && !htmlScript.src.includes('googletagmanager.com')) {
          const url = new URL(htmlScript.src);
          url.searchParams.set('v', timestamp.toString());
          const newScript = document.createElement('script');
          newScript.src = url.toString();
          newScript.type = htmlScript.type;
          script.parentNode?.replaceChild(newScript, script);
        }
      });
    };
    
    // Spustíme funkci pro obnovení cache po načtení stránky
    if (document.readyState === 'complete') {
      forceRefresh();
    } else {
      window.addEventListener('load', forceRefresh);
      return () => window.removeEventListener('load', forceRefresh);
    }
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
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

export default App;
