
import { Bookmark } from 'lucide-react';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface BlogListProps {
  posts: BlogPost[];
  onResetFilters: () => void;
}

const BlogList = ({ posts, onResetFilters }: BlogListProps) => {
  const [searchParams] = useSearchParams();
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(posts);
  
  // Watch for URL parameter changes - e.g., when someone clicks on a tag
  useEffect(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    
    if (tag) {
      // Filter posts by tag
      const filteredByTag = posts.filter(post => 
        post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      setDisplayedPosts(filteredByTag);
    } else if (category) {
      // Filter posts by category
      const filteredByCategory = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
      setDisplayedPosts(filteredByCategory);
    } else {
      setDisplayedPosts(posts);
    }
  }, [searchParams, posts]);
  
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
