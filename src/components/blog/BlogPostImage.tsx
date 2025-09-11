
import { useState } from 'react';
import type { BlogPost } from '../../data/blog/types';
import LazyBlogImage from './LazyBlogImage';

interface BlogPostImageProps {
  post: BlogPost;
}

const BlogPostImage = ({ post }: BlogPostImageProps) => {
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    console.warn(`Blog post image not available: ${post.image}`);
    setShowFallback(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {showFallback ? (
        <div className="w-full h-64 flex items-center justify-center bg-muted rounded-lg">
          <p className="text-muted-foreground">Obrázek není k dispozici</p>
        </div>
      ) : (
        <LazyBlogImage
          src={post.image} 
          alt={post.alt || post.title} 
          className="w-full h-auto rounded-lg shadow-lg"
          priority={true}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default BlogPostImage;
