
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import ProgressiveImage from '../ui/progressive-image';
import LoadingSkeleton from '../ui/loading-skeleton';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { EnhancedButton } from '../ui/enhanced-button';

interface EnhancedBlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const EnhancedBlogCard: React.FC<EnhancedBlogCardProps> = ({ post, featured = false }) => {
  const [cardRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  if (!isVisible) {
    return (
      <div ref={cardRef} className={`${featured ? 'h-96' : 'h-80'}`}>
        <LoadingSkeleton variant="card" className="h-full" />
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
        <ProgressiveImage
          src={post.image}
          alt={post.alt || post.title}
          className="w-full h-full"
          priority={featured}
        />
        
        <div className="absolute top-4 left-4">
          <span className="bg-poda-blue text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-2" />
          <span>{post.author}</span>
        </div>
        
        <h3 className={`font-bold text-poda-blue group-hover:text-poda-orange transition-colors mb-3 ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          <Link to={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link to={`/blog/${post.id}`}>
            <EnhancedButton variant="ghost" size="sm" className="group/btn p-0 h-auto">
              Číst více
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </EnhancedButton>
          </Link>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-poda-blue hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBlogCard;
