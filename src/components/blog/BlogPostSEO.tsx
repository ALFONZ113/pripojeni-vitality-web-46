
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../data/blog/types';
import { 
  formatDateForSchema, 
  generateMetaKeywords 
} from '../../utils/blogMetadata';
import { 
  createEnhancedArticleSchema, 
  createBreadcrumbSchema, 
  createFAQSchema,
  extractFAQsFromContent,
  calculateReadingTime
} from '../../utils/structuredData';

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
  
  // Extract FAQs from content and calculate reading time
  const faqs = extractFAQsFromContent(post.content);
  const readingTime = calculateReadingTime(post.content);
  
  // Generate enhanced structured data
  const articleSchema = createEnhancedArticleSchema(
    post, 
    baseUrl, 
    canonicalUrl, 
    faqs.length > 0 ? faqs : undefined,
    readingTime
  );
  
  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Úvod", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.category, url: `${baseUrl}/blog?category=${encodeURIComponent(post.category)}` },
    { name: post.title, url: canonicalUrl }
  ]);
  
  // Create FAQ schema if FAQs exist
  const faqSchema = faqs.length > 0 ? createFAQSchema(faqs) : null;
  
  // Generate keywords - use all tags if available
  const metaKeywords = generateMetaKeywords(post.category, post.tags);

  // Add tag info to URL for better indexing
  const addTagToUrl = () => {
    if (post.tags && post.tags.length > 0) {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('tag')) {
        // Add primary tag to URL
        url.searchParams.set('tag', post.tags[0]);
        window.history.replaceState({}, '', url.toString());
      }
    }
  };
  
  // Execute once on mount
  if (typeof window !== 'undefined') {
    setTimeout(addTagToUrl, 100);
  }

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
      <meta property="article:reading_time" content={readingTime.replace('PT', '').replace('M', '')} />
      {post.tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt || post.title} />
      <meta name="twitter:image" content={postImage} />
      {post.alt && <meta name="twitter:image:alt" content={post.alt} />}
      
      {/* Enhanced SEO metadata */}
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={post.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="reading-time" content={readingTime.replace('PT', '').replace('M', '')} />
      
      {/* Blog navigation links for enhanced SEO */}
      {prevPost && <link rel="prev" href={`https://www.popri.cz/blog/${prevPost.id}`} />}
      {nextPost && <link rel="next" href={`https://www.popri.cz/blog/${nextPost.id}`} />}
      
      {/* Enhanced Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      {/* Breadcrumb structured data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* FAQ structured data if available */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default BlogPostSEO;
