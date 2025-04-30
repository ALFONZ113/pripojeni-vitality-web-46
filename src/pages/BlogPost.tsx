
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { initAnimations } from '../utils/animation';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import { Skeleton } from '../components/ui/skeleton';

// Default fallback image from Unsplash for when images fail to load
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
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
      setImageSrc(foundPost.image);
      setImageError(false);
      setImageLoading(true);
    } else {
      navigate('/blog');
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [id, navigate]);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container-custom">
          <Skeleton className="h-8 w-40 mb-8" />
          <Skeleton className="h-12 w-full max-w-4xl mb-6" />
          <Skeleton className="h-6 w-full max-w-3xl mb-12" />
          <Skeleton className="w-full h-[40vh] mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-11/12 mb-4" />
              <Skeleton className="h-6 w-10/12 mb-8" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full mb-6" />
              ))}
            </div>
            <div className="lg:col-span-4">
              <Skeleton className="h-8 w-40 mb-6" />
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full mb-4" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleImageError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    
    // If we haven't tried the full URL yet and this is a relative path
    if (!imageError && imageSrc.startsWith('/')) {
      const fullUrl = window.location.origin + imageSrc;
      console.log(`Trying with full URL: ${fullUrl}`);
      setImageSrc(fullUrl);
    } else {
      // If we've already tried with the full URL or this isn't a relative path, use fallback
      console.error(`Failed to load image even with full URL`);
      setImageSrc(FALLBACK_IMAGE);
      setImageError(true);
    }
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="min-h-screen pt-24">
      <BlogPostHeader post={post} />

      <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Obrázek není k dispozici</p>
            <img 
              src={FALLBACK_IMAGE}
              alt="Náhradní obrázek" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        ) : (
          <img 
            id="blog-post-image"
            src={imageSrc} 
            alt={post.alt || post.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
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
