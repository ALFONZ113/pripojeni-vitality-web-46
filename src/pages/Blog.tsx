import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blog';
import { initAnimations } from '../utils/animation';
import BlogCategories from '../components/blog/BlogCategories';
import BlogSearch from '../components/blog/BlogSearch';
import LazyBlogCard from '../components/blog/LazyBlogCard';
import type { BlogPost } from '../data/blog/types';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    
    // Get URL parameters
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [searchParams]);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      <Helmet>
        <title>Blog - Tipy a novinky o PODA internetu | Popri.cz</title>
        <meta name="description" content="Čítajte najnovšie články o PODA internetu, tipoch na optimalizáciu pripojenia a novinkách v oblasti telekomunikácií." />
        <link rel="canonical" href="https://www.popri.cz/blog" />
      </Helmet>

      {/* Hero Section - responzívny */}
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 sm:mb-6 reveal-animation">
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-poda-blue mb-4 sm:mb-6 leading-tight reveal-animation delay-100">
              Tipy a novinky o internetu
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed reveal-animation delay-200">
              Prečítajte si najnovšie články o PODA internetu, tipoch na optimalizáciu pripojenia 
              a novinkách v oblasti telekomunikácií
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section - responzívny */}
      <section className="bg-white py-6 sm:py-8 border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start lg:items-center px-4 sm:px-0">
            <div className="w-full lg:flex-1 reveal-animation">
              <BlogSearch 
                searchTerm={searchTerm} 
                onSearch={setSearchTerm}
              />
            </div>
            <div className="w-full lg:w-auto reveal-animation delay-100">
              <BlogCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - responzívny */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <>
              <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
                <p className="text-sm sm:text-base text-gray-600">
                  {selectedCategory !== 'all' && `Kategória: ${selectedCategory} • `}
                  Zobrazených {filteredPosts.length} článkov
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="reveal-animation"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <LazyBlogCard post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center p-8 sm:p-12 px-4 sm:px-0">
              <div className="max-w-md mx-auto">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  Žiadne články nenájdené
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                  Skúste zmeniť vyhľadávací výraz alebo kategóriu
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary text-sm sm:text-base"
                >
                  Zobraziť všetky články
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
