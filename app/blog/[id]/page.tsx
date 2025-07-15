import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '../../../src/data/blog';
import BlogPostContent from './BlogPostContent';
import type { BlogPost } from '../../../src/data/blog/types';

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id);
  const post = blogPosts.find((p) => p.id === id);
  
  if (!post) {
    return {
      title: 'Článek nenalezen',
      description: 'Požadovaný článek nebyl nalezen.'
    };
  }

  return {
    title: `${post.title} | Blog PODA | Popri.cz`,
    description: post.excerpt,
    keywords: post.tags?.join(', ') || post.category,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.popri.cz/blog/${post.id}/`,
      type: 'article',
      publishedTime: post.date.split('. ').reverse().join('-'),
      authors: [post.author],
      tags: post.tags || [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.popri.cz/blog/${post.id}/`,
    }
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const post = blogPosts.find((p) => p.id === id);
  
  if (!post) {
    notFound();
  }

  // Find previous and next post for navigation
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  // Related posts (from same category, max 3)
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  // Generate structured data for the article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date.split('. ').reverse().join('-'),
    "dateModified": post.date.split('. ').reverse().join('-'),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "PODA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.popri.cz/poda-logo.svg"
      }
    },
    "url": `https://www.popri.cz/blog/${post.id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.popri.cz/blog/${post.id}`
    },
    "keywords": post.tags?.join(', ') || post.category,
    "about": {
      "@type": "Thing",
      "name": post.category
    },
    "inLanguage": "cs-CZ"
  };

  const breadcrumbStructuredData = {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.popri.cz/blog/${post.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <BlogPostContent 
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
        relatedPosts={relatedPosts}
      />
    </>
  );
}