
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { initAnimations } from '../utils/animation';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) 
    : [];
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    
    const foundPost = blogPosts.find(p => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
      setImageError(false); // Reset error state when post changes
      
      // Log the view for analytics (could be expanded)
      console.log(`Blog post viewed: ${foundPost.title} (ID: ${foundPost.id})`);
    } else {
      navigate('/blog');
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [id, navigate]);
  
  if (!post) {
    return null;
  }

  const handleImageError = () => {
    console.error(`Failed to load image: ${post.image}`);
    
    // Try with the full URL if it's a relative path
    if (!imageError && post.image.startsWith('/')) {
      const fullUrl = window.location.origin + post.image;
      console.log(`Trying with full URL: ${fullUrl}`);
      
      // We set this with a timeout to prevent infinite rendering loops
      setTimeout(() => {
        const img = document.getElementById('blog-post-image') as HTMLImageElement;
        if (img) img.src = fullUrl;
      }, 100);
    } else {
      setImageError(true);
    }
  };

  // SEO enhancements
  const canonicalUrl = `https://www.popri.cz/blog/${post.id}`;
  const alternateUrl = `https://popri.cz/blog/${post.id}`;
  const postDate = post.date.split('. ').reverse().join('-');
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image.startsWith('http') ? post.image : `https://www.popri.cz${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.popri.cz/poda-logo.svg"
      }
    },
    "datePublished": postDate,
    "dateModified": postDate
  };

  return (
    <div className="min-h-screen pt-24">
      <Helmet>
        <title>{post.title} | Popri.cz</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" href={alternateUrl} hrefLang="cs" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={canonicalUrl} />
        {post.image && <meta property="og:image" content={post.image.startsWith('http') ? post.image : `https://www.popri.cz${post.image}`} />}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={postDate} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="keywords" content={`${post.category}, ${post.title.toLowerCase()}, PODA, připojení k internetu, Popri.cz`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <BlogPostHeader post={post} />

      <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Obrázek není k dispozici</p>
          </div>
        ) : (
          <img 
            id="blog-post-image"
            src={post.image} 
            alt={post.alt || post.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <BlogPostContent post={post} />
            <BlogPostSidebar relatedPosts={relatedPosts} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
            Zaujala vás naše nabídka?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Nezávazně se informujte o možnostech připojení ve vaší lokalitě. Milan Terč vám rád poskytne veškeré informace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link
              to="/kontakt"
              className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Kontaktovat Milana Terče
            </Link>
            <Link
              to="/internet-tv"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Zobrazit nabídku tarifů
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
