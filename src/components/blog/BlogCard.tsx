
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blogPosts';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const [imageSrc, setImageSrc] = useState(post.image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Pre-cache image on component mount
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = post.image;
    
    // Track successful loads
    preloadImage.onload = () => {
      setImageLoaded(true);
      console.log(`Successfully pre-cached image: ${post.image}`);
    };
    
    // Try with full URL if relative path fails
    preloadImage.onerror = () => {
      if (!imageLoaded && errorCount === 0) {
        console.warn(`Pre-cache failed for: ${post.image}, trying with full URL`);
        const fullUrl = window.location.origin + post.image;
        preloadImage.src = fullUrl;
        setImageSrc(fullUrl);
        setErrorCount(1);
      }
    };
  }, [post.image]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    console.warn(`Image load error for: ${target.src}, attempt: ${errorCount + 1}`);
    
    // First attempt - try with full URL
    if (errorCount === 0) {
      const fullUrl = window.location.origin + post.image;
      console.log(`Trying with full URL: ${fullUrl}`);
      setImageSrc(fullUrl);
      setErrorCount(1);
      
    // Second attempt - try with cache-busting parameter
    } else if (errorCount === 1) {
      const cachedUrl = `${window.location.origin}${post.image}?t=${new Date().getTime()}`;
      console.log(`Trying with cache-busting: ${cachedUrl}`);
      setImageSrc(cachedUrl);
      setErrorCount(2);
      
    // Final fallback - use placeholder
    } else {
      console.error('Failed to load image after multiple attempts');
      target.onerror = null;
      target.src = '/placeholder.svg';
      setErrorCount(3);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group reveal-animation">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={post.alt || post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="640"
          height="360"
          onError={handleImageError}
          onLoad={() => {
            console.log(`BlogCard image loaded: ${post.title}`);
            setImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <span className="bg-blue-50 text-poda-blue px-2 py-1 rounded">
            {post.category}
          </span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-poda-blue mb-3 group-hover:text-poda-orange transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <Link 
            to={`/blog/${post.id}`} 
            className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
          >
            Číst více <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
