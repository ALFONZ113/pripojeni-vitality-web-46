
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { initAnimations } from '../utils/animation';
import { findBlogPost } from '../utils/blogRouting';
import { createSlug } from '../utils/slugGenerator';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import BlogPostImage from '../components/blog/BlogPostImage';
import BlogPostPagination from '../components/blog/BlogPostPagination';
import BlogPostCTA from '../components/blog/BlogPostCTA';
import BlogPostSEO from '../components/blog/BlogPostSEO';
import type { BlogPost } from '../data/blog/types';

const BlogPostPage = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();
  
  // Related posts (from same category, max 3)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) 
    : [];
  
  // Find previous and next post for navigation
  const currentIndex = post ? blogPosts.findIndex(p => p.id === post.id) : -1;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    
    // Use new slug-based routing
    let foundPost: BlogPost | undefined;
    
    if (slugOrId) {
      foundPost = findBlogPost(blogPosts, slugOrId);
    }
    
    if (foundPost) {
      setPost(foundPost);
      
      // Canonical tag is already handled by BlogPostSEO component via Helmet
      // Remove manual DOM manipulation to avoid duplicates
      
      // Remove query parameters from URL if present (clean URL)
      const url = new URL(window.location.href);
      if (url.search) {
        window.history.replaceState({}, '', url.pathname);
      }
    } else {
      navigate('/blog', { replace: true });
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [slugOrId, navigate]);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Načítavání článku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Enhanced SEO metadata */}
      <BlogPostSEO post={post} prevPost={prevPost} nextPost={nextPost} />
      
      {/* Blog header with title, author, date */}
      <BlogPostHeader post={post} />

      {/* Featured image */}
      <BlogPostImage post={post} />

      {/* Main content area - blog content and sidebar */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <BlogPostContent post={post} />
            <BlogPostSidebar relatedPosts={relatedPosts} />
          </div>
        </div>
      </section>
      
      {/* Navigation between articles */}
      <BlogPostPagination prevPost={prevPost} nextPost={nextPost} />

      {/* Call to action section */}
      <BlogPostCTA />
    </div>
  );
};

export default BlogPostPage;
