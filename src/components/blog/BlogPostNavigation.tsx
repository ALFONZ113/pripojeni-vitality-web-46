
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogPostNavigation = ({ prevPost, nextPost }: BlogPostNavigationProps) => {
  return (
    <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
      {prevPost ? (
        <Link 
          to={`/blog/${prevPost.id}`} 
          className="flex items-center text-poda-blue hover:text-poda-orange transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <div>
            <span className="block text-sm text-gray-500">Předchozí článek</span>
            <span className="font-medium">{prevPost.title}</span>
          </div>
        </Link>
      ) : (
        <div></div>
      )}
      
      {nextPost ? (
        <Link 
          to={`/blog/${nextPost.id}`} 
          className="flex items-center text-poda-blue hover:text-poda-orange transition-colors group sm:ml-auto text-right"
        >
          <div>
            <span className="block text-sm text-gray-500">Následující článek</span>
            <span className="font-medium">{nextPost.title}</span>
          </div>
          <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BlogPostNavigation;
