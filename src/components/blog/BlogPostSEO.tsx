
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../data/blog/types';
import { 
  generateBlogPostMeta, 
  generateGeoMeta, 
  generateLocalBusinessData,
  generateFaqSchema,
  generateReviewSchema
} from '../../utils/blogSeo';
import { generateCanonicalUrl, generateHreflangTags } from '../../utils/domainMigration';
import { getBlogPostUrl } from '../../utils/blogRouting';

interface BlogPostSEOProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogPostSEO = ({ post, prevPost, nextPost }: BlogPostSEOProps) => {
  const baseUrl = 'https://www.popri.cz'; // FIXED: Use static canonical domain
  const meta = generateBlogPostMeta(post, baseUrl);
  const geoMeta = generateGeoMeta();
  const localBusinessData = generateLocalBusinessData(baseUrl);
  
  // Generate migration-safe canonical URL (slug-first)
  const canonicalPath = getBlogPostUrl(post);
  const canonicalUrl = generateCanonicalUrl(canonicalPath);
  const hreflangTags = generateHreflangTags(canonicalPath);
  
  // Detect if current URL is ID-based (e.g., /blog/102)
  const isIdBasedUrl = typeof window !== 'undefined' && /^\/blog\/\d+/.test(window.location.pathname);
  
  // Extract location for geo-specific optimization
  const extractLocation = (text: string): string | null => {
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová'];
    return locations.find(loc => text.includes(loc)) || null;
  };
  
  const location = extractLocation(`${post.title} ${post.content}`);
  const locationGeoMeta = location ? generateGeoMeta(location) : geoMeta;

  // Generate structured data
  const faqSchema = generateFaqSchema(post.content);
  const { reviews, aggregateRating } = post.id === 13 
    ? generateReviewSchema(post.content, { "@type": "Organization", "name": "PODA", "url": baseUrl }) 
    : { reviews: [], aggregateRating: null };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Úvod", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.category, "item": `${baseUrl}/blog?category=${encodeURIComponent(post.category)}` },
      { "@type": "ListItem", "position": 4, "name": post.title, "item": canonicalUrl }
    ]
  };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced meta tags */}
      <meta name="author" content={post.author} />
      {isIdBasedUrl ? (
        <>
          <meta name="robots" content="noindex, follow" />
          <meta name="googlebot" content="noindex, follow" />
          <meta name="bingbot" content="noindex, follow" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
          <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
          <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />
        </>
      )}
      
      {/* Indexing optimization signals */}
      <meta name="indexnow-key" content="a1b2c3d4e5f6g7h8i9j0" />
      <meta name="google-site-verification" content="popri-cz-indexing" />
      <meta name="crawl-frequency" content="weekly" />
      <meta name="indexing-priority" content="high" />
      
      {/* Domain migration signals */}
      <meta name="migration-date" content="2025-06-16" />
      <meta name="original-domain" content="pripojeni-poda.cz" />
      <meta name="preferred-domain" content="www.popri.cz" />
      
      {/* Reading time and word count */}
      <meta name="twitter:label1" content="Čas čítania" />
      <meta name="twitter:data1" content={`${meta.readingTime} minút`} />
      <meta name="twitter:label2" content="Počet slov" />
      <meta name="twitter:data2" content={meta.wordCount.toLocaleString()} />
      
      {/* Geographic meta tags */}
      {Object.entries(locationGeoMeta).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="PODA Blog | Popri.cz" />
      <meta property="og:locale" content="cs_CZ" />
      
      {/* Article specific Open Graph */}
      <meta property="article:published_time" content={meta.structuredData.datePublished} />
      <meta property="article:modified_time" content={meta.structuredData.dateModified} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      {post.tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@poda_cz" />
      <meta name="twitter:creator" content="@poda_cz" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />
      {post.alt && <meta name="twitter:image:alt" content={post.alt} />}
      
      {/* Hreflang tags for domain migration */}
      {hreflangTags.map((tag, index) => (
        <link key={index} rel="alternate" href={tag.href} hrefLang={tag.hreflang} />
      ))}
      
      {/* Navigation links for SEO - FIXED: Use canonical URLs */}
      {prevPost && <link rel="prev" href={generateCanonicalUrl(getBlogPostUrl(prevPost))} />}
      {nextPost && <link rel="next" href={generateCanonicalUrl(getBlogPostUrl(nextPost))} />}
      
      {/* Preload critical blog post image for LCP optimization */}
      <link rel="preload" as="image" href={post.image} fetchPriority="high" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          ...meta.structuredData,
          mainEntityOfPage: canonicalUrl,
          url: canonicalUrl
        })}
      </script>
      
      {/* Local business structured data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>
      
      {/* Breadcrumb structured data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* FAQ structured data (dynamic) */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Aggregate Rating structured data */}
      {aggregateRating && (
         <script type="application/ld+json">
          {JSON.stringify(aggregateRating)}
        </script>
      )}

      {/* Individual Reviews structured data */}
      {reviews.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(reviews)}
        </script>
      )}
    </Helmet>
  );
};

export default BlogPostSEO;
