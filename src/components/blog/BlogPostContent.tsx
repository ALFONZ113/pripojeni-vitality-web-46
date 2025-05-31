
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import { useState, useEffect } from 'react';
import { blogPosts } from '../../data/blog';
import BlogCTA from './BlogCTA';
import BlogPostMeta from './BlogPostMeta';
import BlogPostSocialActions from './BlogPostSocialActions';
import BlogPostNavigation from './BlogPostNavigation';
import BlogPostTags from './BlogPostTags';
import BlogPostGeoContent from './BlogPostGeoContent';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  
  // Extract location from post for geo-optimization
  const extractLocation = (text: string): string | null => {
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová'];
    return locations.find(loc => text.includes(loc)) || null;
  };
  
  const location = extractLocation(`${post.title} ${post.content}`);
  
  useEffect(() => {
    const currentIndex = blogPosts.findIndex(p => p.id === post.id);
    if (currentIndex > 0) {
      setPrevPost(blogPosts[currentIndex - 1]);
    } else {
      setPrevPost(null);
    }
    
    if (currentIndex < blogPosts.length - 1) {
      setNextPost(blogPosts[currentIndex + 1]);
    } else {
      setNextPost(null);
    }
  }, [post.id]);

  // Process content to add CTA elements
  const processContentWithCTA = (content: string): string => {
    // Insert CTA after first paragraph
    const paragraphs = content.split('</p>');
    if (paragraphs.length > 1) {
      paragraphs[0] += '</p><div class="inline-cta-placeholder"></div>';
      return paragraphs.join('</p>');
    }
    return content;
  };

  const processedContent = processContentWithCTA(post.content);

  return (
    <div className="lg:col-span-8" itemScope itemType="http://schema.org/BlogPosting">
      {/* Enhanced meta information */}
      <BlogPostMeta post={post} />
      
      <article className="prose prose-lg max-w-none prose-headings:text-poda-blue prose-img:rounded-lg prose-img:shadow-md prose-a:text-poda-blue hover:prose-a:text-poda-orange prose-blockquote:border-l-poda-blue prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
        {/* Display full content */}
        <div 
          itemProp="articleBody" 
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
        
        {/* Inline CTA after first section */}
        <BlogCTA location={location} variant="inline" />
        
        {/* Additional geo-optimized content */}
        {location && <BlogPostGeoContent location={location} />}
      </article>
      
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
        <BlogPostSocialActions 
          postId={post.id} 
          postTitle={post.title} 
          postExcerpt={post.excerpt} 
        />
        
        <Link 
          to="/kontakt" 
          className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Kontaktovat nás</span>
        </Link>
      </div>

      <BlogPostTags post={post} />
      
      {/* Footer CTA */}
      <BlogCTA location={location} variant="footer" />
      
      {/* Navigation between posts */}
      <BlogPostNavigation prevPost={prevPost} nextPost={nextPost} />
      
      {/* Floating CTA for mobile */}
      <BlogCTA variant="floating" />
    </div>
  );
};

export default BlogPostContent;
