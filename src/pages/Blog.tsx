import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogPosts, categories } from '../data/blog';
import BlogSearch from '../components/blog/BlogSearch';
import BlogCategories from '../components/blog/BlogCategories';
import OptimizedBlogList from '../components/blog/OptimizedBlogList';
import { initAnimations } from '../utils/optimized-animation';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const location = searchParams.get('location');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (tag) {
      setSearchTerm(tag);
    }
    
    if (location === 'poruba') {
      setSearchTerm('Poruba');
    }
  }, [searchParams]);
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    return () => cleanupAnimation();
  }, []);
  
  useEffect(() => {
    // Update URL parameters based on current filters
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
  
  const getAllTags = () => {
    const allTags = new Set<string>();
    blogPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => allTags.add(tag));
      }
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
    const baseDescription = "Blog o internetových službách PODA - články o technologiích, tipy pro lepší využití internetu a televize";
    if (selectedCategory !== 'all') {
      return `${baseDescription}. Kategorie: ${selectedCategory}`;
    }
    if (searchTerm) {
      return `${baseDescription}. Hledání: ${searchTerm}`;
    }
    return `${baseDescription}. Aktuálně ${blogPosts.length} článků.`;
  };

  const showPorubaPost = () => {
    setSearchTerm("Poruba");
  };

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>Blog o internetu a technologiích | PODA | Popri.cz</title>
        <meta name="description" content={generateMetaDescription()} />
        <link rel="canonical" href="https://www.popri.cz/blog" />
        <meta name="keywords" content={`blog PODA, technologické články, internet blog, TV služby, internetové technologie, ${allTags.join(', ')}, ${locations.join(', ')}`} />
        <link rel="alternate" href="https://popri.cz/blog" hrefLang="cs" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Blog PODA | Internetové služby a technologie" />
        <meta property="og:description" content={generateMetaDescription()} />
        <meta property="og:url" content="https://www.popri.cz/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popri.cz/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png" />
        
        {/* Geographic meta tags */}
        <meta name="geo.region" content="CZ" />
        <meta name="geo.placename" content="Česká republika" />
        <meta name="ICBM" content="49.8175, 18.2624" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog PODA | Internetové služby" />
        <meta name="twitter:description" content={generateMetaDescription()} />
        
        {/* Enhanced structured data for blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Popri.cz",
            "url": "https://www.popri.cz/blog",
            "description": generateMetaDescription(),
            "inLanguage": "cs-CZ",
            "about": {
              "@type": "Thing",
              "name": "Internet a telekomunikační služby"
            },
            "publisher": {
              "@type": "Organization",
              "name": "PODA",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.popri.cz/poda-logo.svg"
              },
              "url": "https://www.popri.cz",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+420730431313",
                "contactType": "customer service",
                "areaServed": locations
              }
            },
            "blogPost": blogPosts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.date.split('. ').reverse().join('-'),
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "url": `https://www.popri.cz/blog/${post.id}`,
              "keywords": post.tags?.join(', ') || post.category,
              "about": {
                "@type": "Thing",
                "name": post.category
              }
            }))
          })}
        </script>
        
        {/* Breadcrumb structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Úvod",
                "item": "https://www.popri.cz"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.popri.cz/blog"
              }
            ]
          })}
        </script>
        
        {/* Categories meta */}
        {categories.map((cat, index) => (
          <meta key={index} name="article:section" content={cat.name} />
        ))}
        
        {/* Tags meta */}
        {allTags.map((tag, index) => (
          <meta key={index} name="article:tag" content={tag} />
        ))}
        
        {/* Location meta for geo SEO */}
        {locations.map((location, index) => (
          <meta key={index} name="geo.placename" content={`${location}, Česká republika`} />
        ))}
      </Helmet>
      
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
          <OptimizedBlogList 
            posts={blogPosts} 
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            onResetFilters={resetFilters} 
          />
          
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
};

export default Blog;
