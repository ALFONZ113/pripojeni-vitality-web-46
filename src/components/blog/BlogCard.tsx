
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import OptimizedImage from '../ui/optimized-image';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Zvýraznenie pre blog o Porubě
  const isPorubaPost = post.id === 100 || (post.title && post.title.includes('Poruba'));
  const cardClasses = `bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group reveal-animation ${isPorubaPost ? 'ring-2 ring-poda-blue' : ''}`;

  return (
    <div className={cardClasses}>
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={post.image}
          alt={post.alt || post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          enableWebP={true}
          responsive={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Zvýraznenie pre blog o Porube */}
        {isPorubaPost && (
          <div className="absolute top-2 right-2 bg-poda-blue text-white px-2 py-1 rounded text-xs font-semibold">
            Nový
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <span className="bg-blue-50 text-poda-blue px-2 py-1 rounded">
            {post.category}
          </span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-poda-blue mb-3 group-hover:text-poda-orange transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <Link 
            to={`/blog/${post.id}`} 
            className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
          >
            Číst více <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
