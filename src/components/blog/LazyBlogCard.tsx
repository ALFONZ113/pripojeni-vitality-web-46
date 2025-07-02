import { memo } from 'react';
import useLazyLoading from '../../hooks/use-lazy-loading';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';

interface LazyBlogCardProps {
  post: BlogPost;
}

const LazyBlogCard = memo(({ post }: LazyBlogCardProps) => {
  const [ref, isVisible] = useLazyLoading({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  return (
    <div ref={ref} className="min-h-[400px]">
      {isVisible ? (
        <BlogCard post={post} />
      ) : (
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

LazyBlogCard.displayName = 'LazyBlogCard';

export default LazyBlogCard;