
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
  
  // Debug logging
  console.log('[BlogList] Received posts count:', posts.length);
  console.log('[BlogList] DisplayedPosts count:', displayedPosts.length);
  
  // Watch for URL parameter changes - e.g., when someone clicks on a tag
  useEffect(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    
    console.log('[BlogList] URL params - tag:', tag, 'category:', category);
    
    if (tag) {
      // Filter posts by tag
      const filteredByTag = posts.filter(post => 
        post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      console.log('[BlogList] Filtered by tag:', filteredByTag.length);
      setDisplayedPosts(filteredByTag);
    } else if (category) {
      // Filter posts by category
      const filteredByCategory = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
      console.log('[BlogList] Filtered by category:', filteredByCategory.length);
      setDisplayedPosts(filteredByCategory);
    } else {
      console.log('[BlogList] No filters, showing all posts');
      setDisplayedPosts(posts);
    }
  }, [searchParams, posts]);
  
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
          onClick={onResetFilters}
          className="mt-4 text-poda-blue hover:text-poda-orange font-medium"
        >
          Zobrazit všechny články
        </button>
      </div>
    );
  }

  // Normálne zoradenie podľa dátumu a obsahu, bez špecifického ID sortovania
  const sortedPosts = [...displayedPosts].sort((a, b) => {
    // Pokiaľ je v názve "Poruba", dáme na začiatok
    if (a.title.includes('Poruba') && !b.title.includes('Poruba')) return -1;
    if (!a.title.includes('Poruba') && b.title.includes('Poruba')) return 1;
    
    // Pre ostatné posty zachováme pôvodné poradie
    return 0;
  });

  console.log('[BlogList] Final sorted posts count:', sortedPosts.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
