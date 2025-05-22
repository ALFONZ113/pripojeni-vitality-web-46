
import { useState } from 'react';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostImageProps {
  post: BlogPost;
}

const BlogPostImage = ({ post }: BlogPostImageProps) => {
  const [imageError, setImageError] = useState(false);

  // Handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image: ${post.image}`);
    
    // Try with the full URL if it's a relative path
    if (!imageError && post.image.startsWith('/')) {
      const fullUrl = window.location.origin + post.image;
      console.log(`Trying with full URL: ${fullUrl}`);
      
      // Set with a timeout to prevent infinite rendering loops
      setTimeout(() => {
        const img = document.getElementById('blog-post-image') as HTMLImageElement;
        if (img) img.src = fullUrl;
      }, 100);
    } else {
      setImageError(true);
    }
  };

  return (
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
  );
};

export default BlogPostImage;
