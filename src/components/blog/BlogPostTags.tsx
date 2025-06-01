
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostTagsProps {
  post: BlogPost;
}

const BlogPostTags = ({ post }: BlogPostTagsProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full">
          <h3 className="text-gray-700 font-medium mb-2">Štítky:</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              to={`/blog?category=${encodeURIComponent(post.category)}`} 
              className="bg-poda-blue text-white px-3 py-1 rounded-full text-sm hover:bg-poda-blue-dark transition-colors"
            >
              {post.category}
            </Link>
            {post.tags?.map((tag, index) => (
              <Link 
                key={index} 
                to={`/blog?tag=${encodeURIComponent(tag)}`} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-poda-blue hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostTags;
