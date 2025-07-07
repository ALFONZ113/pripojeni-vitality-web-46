
import { useState } from 'react';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostImageProps {
  post: BlogPost;
}

const BlogPostImage = ({ post }: BlogPostImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image: ${post.image}`);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // If image failed to load, don't render anything to prevent flickering
  if (imageError) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {isLoading && (
        <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse" />
      )}
      <img 
        src={post.image} 
        alt={post.alt || post.title} 
        className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0 absolute' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        width="800"
        height="450"
      />
    </div>
  );
};

export default BlogPostImage;
