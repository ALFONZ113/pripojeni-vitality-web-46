import React, { memo, useCallback, useMemo } from 'react';
import BlogCard from '../blog/BlogCard';
import LazyBlogCard from '../blog/LazyBlogCard';
import type { BlogPost } from '../../data/blog/types';

// Optimized Blog Card with memoization
export const OptimizedBlogCard = memo(BlogCard);
OptimizedBlogCard.displayName = 'OptimizedBlogCard';

// Optimized Lazy Blog Card
export const OptimizedLazyBlogCard = memo(LazyBlogCard);
OptimizedLazyBlogCard.displayName = 'OptimizedLazyBlogCard';

// Optimized Blog List with virtualization for large lists
interface OptimizedBlogListProps {
  posts: BlogPost[];
  lazy?: boolean;
  virtualizeThreshold?: number;
}

export const OptimizedBlogList = memo(({ 
  posts, 
  lazy = true, 
  virtualizeThreshold = 12 
}: OptimizedBlogListProps) => {
  // Memoize blog post rendering
  const renderBlogPost = useCallback((post: BlogPost, index: number) => {
    const Component = lazy ? OptimizedLazyBlogCard : OptimizedBlogCard;
    return <Component key={post.id} post={post} />;
  }, [lazy]);

  // Memoize posts to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => posts, [posts]);

  // Use virtualization for large lists
  if (memoizedPosts.length > virtualizeThreshold) {
    const chunkSize = 6;
    const chunks = useMemo(() => {
      const result = [];
      for (let i = 0; i < memoizedPosts.length; i += chunkSize) {
        result.push(memoizedPosts.slice(i, i + chunkSize));
      }
      return result;
    }, [memoizedPosts]);

    return (
      <div className="space-y-8">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chunk.map(renderBlogPost)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {memoizedPosts.map(renderBlogPost)}
    </div>
  );
});

OptimizedBlogList.displayName = 'OptimizedBlogList';

// Optimized Blog Categories with memoization
interface OptimizedBlogCategoriesProps {
  categories: Array<{ id: string; name: string }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const OptimizedBlogCategories = memo(({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: OptimizedBlogCategoriesProps) => {
  // Memoize category buttons
  const categoryButtons = useMemo(() => {
    return categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.id)}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${selectedCategory === category.id
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }
        `}
      >
        {category.name}
      </button>
    ));
  }, [categories, selectedCategory, onCategoryChange]);

  return (
    <div className="flex flex-wrap gap-2">
      {categoryButtons}
    </div>
  );
});

OptimizedBlogCategories.displayName = 'OptimizedBlogCategories';