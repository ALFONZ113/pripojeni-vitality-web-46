import React, { memo, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';
import { Bookmark } from 'lucide-react';

interface VirtualizedBlogListProps {
  posts: BlogPost[];
  onResetFilters: () => void;
  height?: number;
  itemHeight?: number;
}

interface ItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    posts: BlogPost[];
    itemsPerRow: number;
  };
}

const VirtualizedBlogItem = memo(({ index, style, data }: ItemProps) => {
  const { posts, itemsPerRow } = data;
  const startIndex = index * itemsPerRow;
  const endIndex = Math.min(startIndex + itemsPerRow, posts.length);
  const rowPosts = posts.slice(startIndex, endIndex);

  return (
    <div style={style} className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rowPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
});

VirtualizedBlogItem.displayName = 'VirtualizedBlogItem';

const VirtualizedBlogList = memo(({ 
  posts, 
  onResetFilters, 
  height = 600, 
  itemHeight = 400 
}: VirtualizedBlogListProps) => {
  
  // Určíme počet položiek na riadok na základe veľkosti obrazovky
  const itemsPerRow = useMemo(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1024) return 3; // lg breakpoint
      if (width >= 768) return 2;  // md breakpoint
      return 1;
    }
    return 3; // default
  }, []);

  // Počet riadkov potrebných pre virtualizáciu
  const rowCount = useMemo(() => {
    return Math.ceil(posts.length / itemsPerRow);
  }, [posts.length, itemsPerRow]);

  // Memoizované data pre virtualizáciu
  const itemData = useMemo(() => ({
    posts,
    itemsPerRow
  }), [posts, itemsPerRow]);

  // Callback pre reset
  const handleResetFilters = useCallback(() => {
    onResetFilters();
  }, [onResetFilters]);

  // Pre malý počet postov nepoužívame virtualizáciu
  if (posts.length <= 12) {
    if (posts.length === 0) {
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

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <List
        height={height}
        itemCount={rowCount}
        itemSize={itemHeight}
        itemData={itemData}
        width="100%"
      >
        {VirtualizedBlogItem}
      </List>
    </div>
  );
});

VirtualizedBlogList.displayName = 'VirtualizedBlogList';

export default VirtualizedBlogList;