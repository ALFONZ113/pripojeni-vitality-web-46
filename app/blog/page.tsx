import { Metadata } from 'next';
import { blogPosts, categories } from '../../src/data/blog';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog o internetu a technologiích | PODA | Popri.cz',
  description: 'Blog o internetových službách PODA - články o technologiích, tipy pro lepší využití internetu a televize',
  openGraph: {
    title: 'Blog PODA | Internetové služby a technologie',
    description: 'Blog o internetových službách PODA - články o technologiích, tipy pro lepší využití internetu a televize',
    url: 'https://www.popri.cz/blog/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.popri.cz/blog/',
  }
};

// Get all unique tags and locations for SEO
const getAllTags = () => {
  const allTags = new Set<string>();
  blogPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  return Array.from(allTags);
};

const getAllLocations = () => {
  const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová'];
  return locations.filter(location => 
    blogPosts.some(post => 
      post.title.includes(location) || (post.content && post.content.includes(location))
    )
  );
};

export default function BlogPage() {
  const allTags = getAllTags();
  const locations = getAllLocations();
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Popri.cz",
    "url": "https://www.popri.cz/blog",
    "description": "Blog o internetových službách PODA - články o technologiích, tipy pro lepší využití internetu a televize",
    "inLanguage": "cs-CZ",
    "about": {
      "@type": "Thing",
      "name": "Internet a telekomunikační služby"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PODA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.popri.cz/poda-logo.svg"
      },
      "url": "https://www.popri.cz",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+420730431313",
        "contactType": "customer service",
        "areaServed": locations
      }
    },
    "blogPost": blogPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date.split('. ').reverse().join('-'),
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://www.popri.cz/blog/${post.id}`,
      "keywords": post.tags?.join(', ') || post.category,
      "about": {
        "@type": "Thing",
        "name": post.category
      }
    }))
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Úvod",
        "item": "https://www.popri.cz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.popri.cz/blog"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <BlogContent 
        blogPosts={blogPosts} 
        categories={categories}
        allTags={allTags}
        locations={locations}
      />
    </>
  );
}