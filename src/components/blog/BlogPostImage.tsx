
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
    <div className="w-full max-w-4xl mx-auto my-8">
      {imageError ? (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Obrázek není k dispozici</p>
        </div>
      ) : (
        <img 
          id="blog-post-image"
          src={post.image} 
          alt={post.alt || post.title} 
          className="w-full h-auto rounded-lg shadow-lg"
          onError={handleImageError}
          width="800"
          height="450"
        />
      )}
    </div>
  );
};

export default BlogPostImage;
