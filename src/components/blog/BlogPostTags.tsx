
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
            <span className="bg-poda-blue text-white px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            {post.tags?.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostTags;
