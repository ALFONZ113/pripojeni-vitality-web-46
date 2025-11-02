
import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Bookmark } from 'lucide-react';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';
import { useSearchParams } from 'react-router-dom';

interface BlogListProps {
  posts: BlogPost[];
  onResetFilters: () => void;
}

const BlogList = memo(({ posts, onResetFilters }: BlogListProps) => {
  const [searchParams] = useSearchParams();
  
  // Memoizované filtrovanie postov
  const displayedPosts = useMemo(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    
    if (tag) {
      return posts.filter(post => 
        post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    } else if (category) {
      return posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    return posts;
  }, [searchParams, posts]);

  // Memoizovaný callback pre reset
  const handleResetFilters = useCallback(() => {
    onResetFilters();
  }, [onResetFilters]);
  
  if (displayedPosts.length === 0) {
    console.log('[BlogList] No posts to display - showing empty state');
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Žádné články nenalezeny</h3>
        <p className="text-gray-500">
          Zkuste změnit vyhledávací kritéria nebo vybrat jinou kategorii.
        </p>
        <button
          onClick={handleResetFilters}
          className="mt-4 text-poda-blue hover:text-poda-orange font-medium"
        >
          Zobrazit všechny články
        </button>
      </div>
    );
  }

  // Memoizované sortevaie postov
  const sortedPosts = useMemo(() => {
    return [...displayedPosts].sort((a, b) => {
      if (a.id === 100) return -1;
      if (b.id === 100) return 1;
      
      // Pokud je v názvu "Poruba", dáme na začátek
      if (a.title.includes('Poruba') && !b.title.includes('Poruba')) return -1;
      if (!a.title.includes('Poruba') && b.title.includes('Poruba')) return 1;
      
      // Pro ostatní posty zachováme původní pořadí
      return 0;
    });
  }, [displayedPosts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
});

BlogList.displayName = 'BlogList';

export default BlogList;
