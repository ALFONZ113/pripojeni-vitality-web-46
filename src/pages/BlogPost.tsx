
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { initAnimations } from '../utils/animation';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import { toast } from 'sonner';

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

  // Improved image error handler with better fallback
  const handleImageError = () => {
    console.error(`Failed to load image: ${post.image}`);
    setImageError(true);
    
    // Show fallback notification to user
    toast.error('Nepodařilo se načíst obrázek', {
      description: 'Používáme náhradní obrázek',
      duration: 3000
    });
  };

  const getPlaceholderImage = () => {
    // Return placeholder based on category
    switch (post.category) {
      case 'Technologie':
        return '/placeholder.svg';
      case 'Služby':
        return '/placeholder.svg';
      default:
        return '/placeholder.svg';
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <BlogPostHeader post={post} />

      <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img 
              src={getPlaceholderImage()}
              alt="Náhradní obrázek" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-700 bg-white/70 px-4 py-2 rounded-lg">
                {post.alt || 'Obrázek není k dispozici'}
              </p>
            </div>
          </div>
        ) : (
          <img 
            id="blog-post-image"
            src={post.image.startsWith('http') ? post.image : `/placeholder.svg`} 
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
