
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogPosts, categories } from '../data/blog';
import BlogSearch from '../components/blog/BlogSearch';
import BlogCategories from '../components/blog/BlogCategories';
import BlogList from '../components/blog/BlogList';
import { initAnimations } from '../utils/animation';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Načítame parametre z URL - kategória a tag
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    // Ak máme tag, nastavíme ho ako vyhľadávací výraz
    if (tag) {
      setSearchTerm(tag);
    }
  }, [searchParams]);
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    return () => cleanupAnimation();
  }, []);
  
  useEffect(() => {
    let filtered = blogPosts;
    
    // Filtrovanie podľa kategórie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filtrovanie podľa vyhľadávacieho výrazu alebo tagu
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredPosts(filtered);
    
    // Aktualizujeme URL parametre pre lepšiu SEO a zdieľanie
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') newParams.set('category', selectedCategory);
    if (searchTerm.trim() !== '') newParams.set('search', searchTerm);
    setSearchParams(newParams, { replace: true });
    
  }, [searchTerm, selectedCategory, setSearchParams]);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSearchParams({}, { replace: true });
  };
  
  // Získame všetky unikátne tagy pre meta tagy
  const getAllTags = () => {
    const allTags = new Set<string>();
    blogPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => allTags.add(tag));
      }
    });
    return Array.from(allTags);
  };
  
  const allTags = getAllTags();

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Blog o internetu a technologiích | PODA | Popri.cz</title>
        <meta name="description" content="Přečtěte si zajímavé články o technologiích, internetu a televizi. Tipy, návody a aktuality ze světa internetového připojení a PODA služeb." />
        <link rel="canonical" href="https://www.popri.cz/blog" />
        <meta name="keywords" content={`blog PODA, technologické články, internet blog, TV služby, internetové technologie, ${allTags.join(', ')}`} />
        <link rel="alternate" href="https://popri.cz/blog" hrefLang="cs" />
        
        {/* Přidáme strukturovaná data pro blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Popri.cz",
            "url": "https://www.popri.cz/blog",
            "description": "Blog o internetu, technologiích a PODA službách",
            "publisher": {
              "@type": "Organization",
              "name": "Popri.cz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.popri.cz/poda-logo.svg"
              }
            },
            "blogPosts": blogPosts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.date.split('. ').reverse().join('-'),
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "url": `https://www.popri.cz/blog/${post.id}`,
              "keywords": post.tags?.join(', ') || post.category
            }))
          })}
        </script>
        
        {/* Info pre vyhľadávače o všetkých kategóriách */}
        <meta name="article:tag" content={categories.map(cat => cat.name).join(', ')} />
        
        {/* Info pre vyhľadávače o všetkých tagoch */}
        {allTags.map((tag, index) => (
          <meta key={index} name="article:tag" content={tag} />
        ))}
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
