'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogSearch from '../../src/components/blog/BlogSearch';
import BlogCategories from '../../src/components/blog/BlogCategories';
import BlogList from '../../src/components/blog/BlogList';
import { initAnimations } from '../../src/utils/animation';
import { preloadCriticalResources } from '../../src/utils/performance-optimization';
import type { BlogPost, BlogCategory } from '../../src/data/blog/types';

interface BlogContentProps {
  blogPosts: BlogPost[];
  categories: BlogCategory[];
  allTags: string[];
  locations: string[];
}

export default function BlogContent({ blogPosts, categories, allTags, locations }: BlogContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Debug logging
  console.log('[Blog] Initial blogPosts count:', blogPosts.length);
  console.log('[Blog] Current filteredPosts count:', filteredPosts.length);
  console.log('[Blog] Search term:', searchTerm);
  console.log('[Blog] Selected category:', selectedCategory);
  
  // Zvýraznění pro Porubu - přidání parametru pro automatické hledání Poruby
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const location = searchParams.get('location');
    
    console.log('[Blog] URL params - category:', category, 'tag:', tag, 'location:', location);
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (tag) {
      setSearchTerm(tag);
    }
    
    // Automatické vyhledávání lokality
    if (location === 'poruba') {
      setSearchTerm('Poruba');
    }
  }, [searchParams]);
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    preloadCriticalResources();
    return () => cleanupAnimation();
  }, []);
  
  useEffect(() => {
    let filtered = blogPosts;
    
    console.log('[Blog] Starting filtering with', blogPosts.length, 'posts');
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
      console.log('[Blog] After category filter:', filtered.length, 'posts');
    }
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term) ||
        (post.content && post.content.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
      console.log('[Blog] After search filter:', filtered.length, 'posts');
    }
    
    console.log('[Blog] Final filtered posts:', filtered.length);
    setFilteredPosts(filtered);
    
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchTerm.trim() !== '') params.set('search', searchTerm);
    router.push(`/blog?${params.toString()}`, { scroll: false });
    
  }, [searchTerm, selectedCategory, router]);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    router.push('/blog', { scroll: false });
  };

  // Tlačítko pro rychlý přístup k blogu o Porubě
  const showPorubaPost = () => {
    setSearchTerm("Poruba");
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Blog a novinky
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation delay-100">
              Články o internetu a technologiích
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed reveal-animation delay-200">
              Přečtěte si nejnovější články o technologiích, tipy pro lepší využití vašeho internetu 
              a televize. Vše o službách PODA v {locations.join(', ')} a dalších městech.
            </p>
            
            <BlogSearch searchTerm={searchTerm} onSearch={handleSearch} />
            
            {/* Promo banner pro článek o Porubě */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100 inline-block">
              <button 
                onClick={showPorubaPost} 
                className="flex items-center text-poda-blue hover:text-poda-orange transition-colors font-semibold"
              >
                <span className="bg-poda-blue text-white rounded-full px-2 py-1 text-xs mr-2">NOVÉ</span>
                Přečtěte si o novém připojení v Ostravě-Porubě
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-4 pb-4 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <BlogCategories 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <BlogList posts={filteredPosts} onResetFilters={resetFilters} />
          
          {/* Enhanced CTA for blog page */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-poda-blue to-poda-orange text-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Hledáte rychlé internetové připojení?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                PODA poskytuje spolehlivé optické připojení v {locations.slice(0, 3).join(', ')} 
                a dalších městech. Kontaktujte nás pro bezplatnou konzultaci.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="tel:+420730431313"
                  className="bg-white text-poda-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  📞 730 431 313
                </a>
                <a
                  href="/kontakt"
                  className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Kontaktní formulář
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}