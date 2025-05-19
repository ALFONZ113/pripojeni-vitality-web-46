
import { Bookmark } from 'lucide-react';
import BlogCard from './BlogCard';
import type { BlogPost } from '../../data/blog/types';

interface BlogListProps {
  posts: BlogPost[];
  onResetFilters: () => void;
}

const BlogList = ({ posts, onResetFilters }: BlogListProps) => {
  if (posts.length === 0) {
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
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
