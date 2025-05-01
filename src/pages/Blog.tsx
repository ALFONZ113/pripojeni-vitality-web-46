
import { useEffect, useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import BlogSearch from '../components/blog/BlogSearch';
import BlogCategories from '../components/blog/BlogCategories';
import BlogList from '../components/blog/BlogList';
import { initAnimations } from '../utils/animation';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    return () => cleanupAnimation();
  }, []);
  
  useEffect(() => {
    let filtered = blogPosts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Blog o internetu a technologiích | PODA | Popri.cz</title>
        <meta name="description" content="Přečtěte si zajímavé články o technologiích, internetu a televizi. Tipy, návody a aktuality ze světa internetového připojení a PODA služeb." />
        <link rel="canonical" href="https://www.popri.cz/blog" />
        <meta name="keywords" content="blog PODA, technologické články, internet blog, TV služby, internetové technologie" />
        <link rel="alternate" href="https://popri.cz/blog" hrefLang="cs" />
      </Helmet>
      
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Blog a novinky
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation delay-100">
              Zajímavé články a informace
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed reveal-animation delay-200">
              Přečtěte si nejnovější články o technologiích, tipech pro lepší využití vašeho internetu 
              a televize, a mnoho dalšího.
            </p>
            
            <BlogSearch searchTerm={searchTerm} onSearch={handleSearch} />
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
        </div>
      </section>
    </div>
  );
};

export default Blog;
