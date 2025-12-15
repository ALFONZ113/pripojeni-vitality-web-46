import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import type { BlogPost } from '../../data/blog/types';
import InternalLinkSuggestions from '../seo/InternalLinkSuggestions';
import Breadcrumb from '../common/Breadcrumb';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(post.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                     'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'table', 'thead', 
                     'tbody', 'tr', 'th', 'td', 'div', 'span', 'section', 'article', 'figure', 'figcaption'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel', 'width', 'height'],
      ALLOW_DATA_ATTR: false,
    });
  }, [post.content]);

  return (
    <div className="lg:col-span-8">
      {/* Breadcrumb navigation */}
      <Breadcrumb 
        items={[
          { title: 'Úvod', href: '/' },
          { title: 'Blog', href: '/blog' },
          { title: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
          { title: post.title }
        ]}
        className="mb-6"
      />
      
      {/* Article content with enhanced internal linking */}
      <article className="prose prose-lg prose-invert max-w-none" itemScope itemType="https://schema.org/BlogPosting">
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          itemProp="articleBody"
        />
      </article>

      {/* Internal link suggestions */}
      <InternalLinkSuggestions currentPost={post} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-serif font-semibold mb-4 text-foreground">Štítky:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostContent;
