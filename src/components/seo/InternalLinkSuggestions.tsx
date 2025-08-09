
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import type { BlogPost } from '../../data/blog/types';
import { getBlogPostUrl } from '../../utils/blogRouting';

interface InternalLinkSuggestionsProps {
  currentPost: BlogPost;
  maxSuggestions?: number;
}

const InternalLinkSuggestions = ({ currentPost, maxSuggestions = 3 }: InternalLinkSuggestionsProps) => {
  // Find related posts based on tags and category
  const getRelatedPosts = (): BlogPost[] => {
    const related = blogPosts.filter(post => {
      if (post.id === currentPost.id) return false;
      
      // Check if posts share tags
      const sharedTags = currentPost.tags?.filter(tag => 
        post.tags?.includes(tag)
      ) || [];
      
      // Check if same category
      const sameCategory = post.category === currentPost.category;
      
      return sharedTags.length > 0 || sameCategory;
    });
    
    // Sort by relevance (shared tags count)
    return related.sort((a, b) => {
      const aSharedTags = currentPost.tags?.filter(tag => a.tags?.includes(tag))?.length || 0;
      const bSharedTags = currentPost.tags?.filter(tag => b.tags?.includes(tag))?.length || 0;
      return bSharedTags - aSharedTags;
    }).slice(0, maxSuggestions);
  };
  
  const relatedPosts = getRelatedPosts();
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <div className="bg-blue-50 p-6 rounded-lg mt-8">
      <h3 className="text-lg font-semibold text-poda-blue mb-4">
        Súvisiace články
      </h3>
      <div className="space-y-3">
        {relatedPosts.map(post => (
          <Link
            key={post.id}
            to={getBlogPostUrl(post)}
            className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-poda-blue transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {post.category} • {post.date}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-poda-blue ml-2 flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinkSuggestions;
