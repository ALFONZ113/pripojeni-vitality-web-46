
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../data/blog/types';
import { formatDateForSchema, createBlogPostStructuredData, generateMetaKeywords } from '../../utils/blogMetadata';

interface BlogPostSEOProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogPostSEO = ({ post, prevPost, nextPost }: BlogPostSEOProps) => {
  // Create URLs and metadata for SEO
  const canonicalUrl = `https://www.popri.cz/blog/${post.id}`;
  const alternateUrl = `https://popri.cz/blog/${post.id}`;
  const postDate = formatDateForSchema(post.date);
  const baseUrl = window.location.origin;
  const postImage = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  // Generate structured data
  const structuredData = createBlogPostStructuredData(post, baseUrl, canonicalUrl);
  
  // Generate keywords - use all tags if available
  const metaKeywords = post.tags && post.tags.length > 0 
    ? post.tags.join(', ') + ', ' + post.category + ', PODA'
    : generateMetaKeywords(post.category, post.tags);

  return (
    <Helmet>
      <title>{post.title} | Blog Popri.cz</title>
      <meta name="description" content={post.excerpt || post.title} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={alternateUrl} hrefLang="cs" />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={`${post.title} | Blog Popri.cz`} />
      <meta property="og:description" content={post.excerpt || post.title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={postImage} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={postDate} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      {post.tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt || post.title} />
      <meta name="twitter:image" content={postImage} />
      
      {/* Enhanced SEO metadata */}
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={post.author} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      
      {/* Blog navigation links for enhanced SEO */}
      {prevPost && <link rel="prev" href={`https://www.popri.cz/blog/${prevPost.id}`} />}
      {nextPost && <link rel="next" href={`https://www.popri.cz/blog/${nextPost.id}`} />}
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
