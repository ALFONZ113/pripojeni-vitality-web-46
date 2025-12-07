import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import { getBlogPostUrl } from '../../utils/blogRouting';
import LazyBlogImage from './LazyBlogImage';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = memo(({ post }: BlogCardProps) => {
  const isPorubaPost = post.id === 100 || (post.title && post.title.includes('Poruba'));
  
  return (
    <div className={`card-luxury group reveal-animation ${isPorubaPost ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <LazyBlogImage 
          src={post.image} 
          alt={post.alt || post.title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isPorubaPost && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
            Nový
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            {post.category}
          </span>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <Link 
            to={getBlogPostUrl(post)} 
            className="text-primary hover:text-primary/80 font-medium flex items-center transition-colors group/link"
          >
            Číst více 
            <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;
