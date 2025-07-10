
import { useState } from 'react';
import type { BlogPost } from '../../data/blog/types';
import OptimizedImage from '../ui/optimized-image';

interface BlogPostImageProps {
  post: BlogPost;
}

const BlogPostImage = ({ post }: BlogPostImageProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${post.image}`);
    setImageError(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {imageError ? (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Obrázok nie je k dispozícii</p>
        </div>
      ) : (
        <OptimizedImage
          src={post.image}
          alt={post.alt || post.title}
          className="w-full h-auto rounded-lg shadow-lg"
          onError={handleImageError}
          priority={true}
          enableWebP={true}
          responsive={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      )}
    </div>
  );
};

export default BlogPostImage;
