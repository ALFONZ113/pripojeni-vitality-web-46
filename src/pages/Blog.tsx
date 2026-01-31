import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogPosts, categories } from '../data/blog';
import BlogSearch from '../components/blog/BlogSearch';
import BlogCategories from '../components/blog/BlogCategories';
import BlogList from '../components/blog/BlogList';
import { initAnimations } from '../utils/animation';
import { Helmet } from 'react-helmet-async';
import { preloadCriticalResources } from '../utils/performance';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const location = searchParams.get('location');
    
    if (category) setSelectedCategory(category);
    if (tag) setSearchTerm(tag);
    if (location === 'poruba') setSearchTerm('Poruba');
  }, [searchParams]);
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    preloadCriticalResources();
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
        post.category.toLowerCase().includes(term) ||
        (post.content && post.content.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredPosts(filtered);
    
    const newParams = new URLSearchParams();
    if (selectedCategory !== 'all') newParams.set('category', selectedCategory);
    if (searchTerm.trim() !== '') newParams.set('search', searchTerm);
    setSearchParams(newParams, { replace: true });
    
  }, [searchTerm, selectedCategory, setSearchParams]);
  
  const handleSearch = (value: string) => setSearchTerm(value);
  const handleCategoryChange = (categoryId: string) => setSelectedCategory(categoryId);
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSearchParams({}, { replace: true });
  };
  
  const getAllTags = () => {
    const allTags = new Set<string>();
    blogPosts.forEach(post => {
      if (post.tags) post.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  };
  
  const getAllLocations = () => {
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová'];
    return locations.filter(location => 
      blogPosts.some(post => 
        post.title.includes(location) || (post.content && post.content.includes(location))
      )
    );
  };
  
  const allTags = getAllTags();
  const locations = getAllLocations();
  
  const generateMetaDescription = () => {
    const baseDescription = "Praktické rady a tipy pro výběr internetu, nastavení WiFi a využití TV služeb. Novinky z technologického světa a průvodce pro domácnosti";
    if (selectedCategory !== 'all') return `${baseDescription}. Kategorie: ${selectedCategory}`;
    if (searchTerm) return `${baseDescription}. Hledání: ${searchTerm}`;
    return `${baseDescription}. Aktuálně ${blogPosts.length} článků.`;
  };

  const showPorubaPost = () => setSearchTerm("Poruba");

  return (
    <div className="min-h-screen pt-24 bg-background">
      <Helmet>
        <title>Blog | Tipy pro internet, WiFi a TV | Průvodce pro domácnosti</title>
        <meta name="description" content="Praktické rady pro výběr internetu, nastavení WiFi a využití TV služeb. Novinky z technologického světa. Máte dotaz? Zavolejte 730 431 313!" />
        <link rel="canonical" href="https://www.popri.cz/blog" />
        <meta name="keywords" content={`blog PODA, technologické články, internet blog, TV služby, ${allTags.join(', ')}, ${locations.join(', ')}`} />
        
        <meta property="og:title" content="Blog PODA | Internetové služby a technologie" />
        <meta property="og:description" content={generateMetaDescription()} />
        <meta property="og:url" content="https://www.popri.cz/blog" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Popri.cz",
            "url": "https://www.popri.cz/blog",
            "description": generateMetaDescription(),
            "inLanguage": "cs-CZ",
            "publisher": {
              "@type": "Organization",
              "name": "PODA",
              "url": "https://www.popri.cz"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="section-padding-compact bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary/10 text-primary py-1.5 px-4 rounded-full text-responsive-xs font-medium mb-4 border border-primary/20 reveal-animation">
              Blog a novinky
            </span>
            <h1 className="text-responsive-hero font-heading font-bold text-foreground mb-responsive leading-tight reveal-animation delay-100">
              Články o <span className="text-gradient-gold">internetu</span> a technologiích
            </h1>
            <p className="text-muted-foreground text-responsive-base mb-responsive leading-relaxed reveal-animation delay-200">
              Přečtěte si nejnovější články o technologiích, tipy pro lepší využití vašeho internetu 
              a televize. Vše o službách PODA v {locations.join(', ')} a dalších městech.
            </p>
            
            <BlogSearch searchTerm={searchTerm} onSearch={handleSearch} />
            
            {/* Promo banner */}
            <div className="mt-6 glass p-4 rounded-xl inline-block border border-primary/20">
              <button 
                onClick={showPorubaPost} 
                className="flex items-center text-primary hover:text-primary/80 transition-colors font-semibold text-responsive-sm"
              >
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs mr-2">NOVÉ</span>
                Přečtěte si o novém připojení v Ostravě-Porubě
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 bg-card/50 backdrop-blur-sm sticky top-20 z-30 border-y border-border">
        <div className="container-custom">
          <BlogCategories 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
      </section>

      {/* Blog List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <BlogList posts={filteredPosts} onResetFilters={resetFilters} />
          
          {/* CTA Banner */}
          <div className="mt-responsive text-center">
            <div className="glass p-6 md:p-8 rounded-2xl border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-responsive-xl font-heading font-bold text-gradient-gold mb-4">
                  Hledáte rychlé internetové připojení?
                </h2>
                <p className="text-muted-foreground mb-responsive max-w-2xl mx-auto text-responsive-sm">
                  PODA poskytuje spolehlivé optické připojení v {locations.slice(0, 3).join(', ')} 
                  a dalších městech. Kontaktujte nás pro bezplatnou konzultaci.
                </p>
                <div className="flex gap-responsive-sm justify-center flex-wrap">
                  <a
                    href="tel:+420730431313"
                    className="btn-gold"
                  >
                    📞 730 431 313
                  </a>
                  <a
                    href="/kontakt"
                    className="btn-noir"
                  >
                    Kontaktní formulář
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
