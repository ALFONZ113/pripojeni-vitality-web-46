
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { initAnimations } from '../utils/animation';
import { findBlogPost } from '../utils/blogRouting';
import { createSlug } from '../utils/slugGenerator';
import { supabase } from '@/integrations/supabase/client';
import { findBlogPostBySlug } from '../utils/blogDataMerger';
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
    
    // Use new slug-based routing - check static posts first, then AI posts
    const loadPost = async () => {
      let foundPost: BlogPost | undefined;
      
      if (slugOrId) {
        // First try to find in static posts
        foundPost = findBlogPost(blogPosts, slugOrId);
        
        // If not found in static posts, try AI posts in database
        if (!foundPost) {
          const aiPost = await findBlogPostBySlug(blogPosts, slugOrId, supabase);
          if (aiPost) {
            foundPost = aiPost;
          }
        }
      }
      
      if (foundPost) {
        setPost(foundPost);
        
        // Generate clean canonical URL using slug
        const slug = foundPost.slug || createSlug(foundPost.title);
        const canonicalUrl = `https://www.popri.cz/blog/${slug}`;
        
        // Update meta tags for better SEO
        const linkElement = document.querySelector('link[rel="canonical"]');
        if (linkElement) {
          linkElement.setAttribute('href', canonicalUrl);
        } else {
          const newCanonical = document.createElement('link');
          newCanonical.rel = 'canonical';
          newCanonical.href = canonicalUrl;
          document.head.appendChild(newCanonical);
        }
        
        // Remove query parameters from URL if present (clean URL)
        const url = new URL(window.location.href);
        if (url.search) {
          window.history.replaceState({}, '', url.pathname);
        }
      } else {
        navigate('/blog', { replace: true });
      }
    };
    
    loadPost();
    
    return () => {
      cleanupAnimation();
    };
  }, [slugOrId, navigate]);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-poda-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Načítavanie článku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Enhanced SEO metadata */}
      <BlogPostSEO post={post} prevPost={prevPost} nextPost={nextPost} />
      
      {/* Blog header with title, author, date */}
      <BlogPostHeader post={post} />

      {/* Featured image */}
      <BlogPostImage post={post} />

      {/* Main content area - blog content and sidebar */}
      <section className="section-padding bg-white">
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
