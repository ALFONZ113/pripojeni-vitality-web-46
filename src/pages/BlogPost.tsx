
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { initAnimations } from '../utils/animation';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import BlogPostImage from '../components/blog/BlogPostImage';
import BlogPostPagination from '../components/blog/BlogPostPagination';
import BlogPostCTA from '../components/blog/BlogPostCTA';
import BlogPostSEO from '../components/blog/BlogPostSEO';
import type { BlogPost } from '../data/blog/types';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
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
    
    // Support both old numeric IDs and new slug-based URLs
    let foundPost: BlogPost | undefined;
    
    if (id) {
      // Try to find by ID first (backwards compatibility)
      foundPost = blogPosts.find(p => p.id === Number(id));
      
      // If not found by ID, try to extract ID from slug
      if (!foundPost) {
        const match = id.match(/-(\d+)$/);
        if (match) {
          const extractedId = parseInt(match[1], 10);
          foundPost = blogPosts.find(p => p.id === extractedId);
        }
      }
    }
    
    if (foundPost) {
      setPost(foundPost);
      
      // Log the view for analytics
      console.log(`Blog post viewed: ${foundPost.title} (ID: ${foundPost.id})`);

      // Update URL parameters for better SEO
      const url = new URL(window.location.href);
      if (!url.searchParams.has('category') && foundPost.category) {
        url.searchParams.set('category', foundPost.category);
        window.history.replaceState({}, '', url.toString());
      }
      
      if (foundPost.tags && foundPost.tags.length > 0 && !url.searchParams.has('tag')) {
        url.searchParams.set('tag', foundPost.tags[0]);
        window.history.replaceState({}, '', url.toString());
      }
    } else {
      navigate('/blog', { replace: true });
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [id, navigate]);
  
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
