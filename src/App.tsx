
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
