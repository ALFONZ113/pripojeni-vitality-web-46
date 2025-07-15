import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./index.css";

// Import all the page components (Next.js content components)
import BlogContent from "../app/blog/BlogContent";
import BlogPostContent from "../app/blog/[id]/BlogPostContent";
import ContactContent from "../app/kontakt/ContactContent";
import TarifyContent from "../app/tarify/TarifyContent";
import InternetOstravaContent from "../app/internet-ostrava/InternetOstravaContent";

// Import blog data
import { blogPosts, categories } from "./data/blog/index";
import Index from "./pages/Index";

// Import other pages that weren't migrated yet
import IPTV from "./pages/IPTV";
import InternetBohumin from "./pages/InternetBohumin";
import InternetHavirov from "./pages/InternetHavirov";
import InternetKarvina from "./pages/InternetKarvina";
import InternetPoruba from "./pages/InternetPoruba";
import InternetTV from "./pages/InternetTV";
import TvPrograms from "./pages/TvPrograms";
import NotFound from "./pages/NotFound";
import Cookies from "./pages/Cookies";
import ObchodniPodminky from "./pages/ObchodniPodminky";
import OchranaSoukromi from "./pages/OchranaSoukromi";

// Blog wrapper components to pass props
function BlogWrapper() {
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags || [])));
  const locations = ["Ostrava", "Karviná", "Havířov", "Bohumín", "Poruba"];
  
  return (
    <BlogContent 
      blogPosts={blogPosts} 
      categories={categories} 
      allTags={allTags} 
      locations={locations} 
    />
  );
}

function BlogPostWrapper() {
  const { id } = useParams();
  const postId = parseInt(id || "1");
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];
  const currentIndex = blogPosts.findIndex(p => p.id === postId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts.filter(p => p.id !== postId && p.category === post.category).slice(0, 3);
  
  return (
    <BlogPostContent 
      post={post} 
      prevPost={prevPost} 
      nextPost={nextPost} 
      relatedPosts={relatedPosts} 
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogWrapper />} />
        <Route path="/blog/:id" element={<BlogPostWrapper />} />
        <Route path="/kontakt" element={<ContactContent />} />
        <Route path="/tarify" element={<TarifyContent />} />
        <Route path="/internet-ostrava" element={<InternetOstravaContent />} />
        
        {/* Other existing pages */}
        <Route path="/iptv" element={<IPTV />} />
        <Route path="/internet-bohumin" element={<InternetBohumin />} />
        <Route path="/internet-havirov" element={<InternetHavirov />} />
        <Route path="/internet-karvina" element={<InternetKarvina />} />
        <Route path="/internet-poruba" element={<InternetPoruba />} />
        <Route path="/internet-tv" element={<InternetTV />} />
        <Route path="/tv-programs" element={<TvPrograms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/obchodni-podminky" element={<ObchodniPodminky />} />
        <Route path="/ochrana-soukromi" element={<OchranaSoukromi />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
