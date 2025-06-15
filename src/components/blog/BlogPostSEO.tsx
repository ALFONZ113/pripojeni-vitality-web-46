
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../../data/blog/types';
import { 
  generateBlogPostMeta, 
  generateGeoMeta, 
  generateLocalBusinessData,
  generateFaqSchema,
  generateReviewSchema
} from '../../utils/blogSeo';

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
      { "@type": "ListItem", "position": 4, "name": post.title, "item": meta.canonicalUrl }
    ]
  };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href={meta.canonicalUrl} />
      
      {/* Enhanced meta tags */}
      <meta name="author" content={post.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      
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
      <meta property="og:url" content={meta.canonicalUrl} />
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
      
      {/* Navigation links for SEO - FIXED: Use canonical URLs */}
      {prevPost && <link rel="prev" href={`${baseUrl}/blog/${prevPost.id}`} />}
      {nextPost && <link rel="next" href={`${baseUrl}/blog/${nextPost.id}`} />}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Language alternatives */}
      <link rel="alternate" href={meta.canonicalUrl} hrefLang="cs" />
      <link rel="alternate" href={meta.canonicalUrl} hrefLang="sk" />
      
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(meta.structuredData)}
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
