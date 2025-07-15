'use client';

import { useEffect } from 'react';
import { initAnimations } from '../../../src/utils/animation';
import BlogPostHeader from '../../../src/components/blog/BlogPostHeader';
import BlogPostContent from '../../../src/components/blog/BlogPostContent';
import BlogPostSidebar from '../../../src/components/blog/BlogPostSidebar';
import BlogPostImage from '../../../src/components/blog/BlogPostImage';
import BlogPostPagination from '../../../src/components/blog/BlogPostPagination';
import BlogPostCTA from '../../../src/components/blog/BlogPostCTA';
import type { BlogPost } from '../../../src/data/blog/types';

interface BlogPostContentProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  relatedPosts: BlogPost[];
}

export default function BlogPostContentComponent({ 
  post, 
  prevPost, 
  nextPost, 
  relatedPosts 
}: BlogPostContentProps) {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen pt-24">
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
}