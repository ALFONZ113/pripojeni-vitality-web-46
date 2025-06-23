
import { Bookmark } from 'lucide-react';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface OptimizedBlogListProps {
  posts: BlogPost[];
  onResetFilters: () => void;
}

const POSTS_PER_PAGE = 9;

const OptimizedBlogList = ({ posts, onResetFilters }: OptimizedBlogListProps) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Memoize filtered posts to avoid recalculation
  const displayedPosts = useMemo(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    
    let filtered = posts;
    
    if (tag) {
      filtered = posts.filter(post => 
        post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    } else if (category) {
      filtered = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort with Poruba first
    return filtered.sort((a, b) => {
      if (a.id === 100) return -1;
      if (b.id === 100) return 1;
      if (a.title.includes('Poruba') && !b.title.includes('Poruba')) return -1;
      if (!a.title.includes('Poruba') && b.title.includes('Poruba')) return 1;
      return 0;
    });
  }, [posts, searchParams]);

  // Memoize visible posts for current page
  const visiblePosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return displayedPosts.slice(startIndex, endIndex);
  }, [displayedPosts, currentPage]);

  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);
  
  if (displayedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Žádné články nenalezeny</h3>
        <p className="text-gray-500">
          Zkuste změnit vyhledávací kritéria nebo vybrat jinou kategorii.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 text-poda-blue hover:text-poda-orange font-medium"
        >
          Zobrazit všechny články
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Předchozí
          </button>
          
          <span className="px-4 py-2 text-gray-600">
            {currentPage} z {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Další
          </button>
        </div>
      )}
    </div>
  );
};

export default OptimizedBlogList;
