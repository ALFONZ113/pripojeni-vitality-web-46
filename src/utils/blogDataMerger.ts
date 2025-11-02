/**
 * Utility for merging AI-generated blog posts from database with static blog posts
 */

import { BlogPost } from '../data/blog/types';

interface AIBlogPost {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  category: string;
  tags: string[] | null;
  header_image_url: string | null;
  header_image_alt: string | null;
  status: string;
  word_count: number | null;
  views_count: number | null;
}

/**
 * Transform AI blog post from database to BlogPost format
 */
export const transformAIPostToBlogPost = (aiPost: AIBlogPost, index: number): BlogPost => {
  // Generate a high ID to avoid conflicts with static posts (start from 10000)
  const generatedId = 10000 + index;
  
  // Format date from ISO string to DD. MM. YYYY format
  const formatDate = (isoDate: string | null): string => {
    if (!isoDate) return new Date().toLocaleDateString('cs-CZ');
    const date = new Date(isoDate);
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '. ');
  };

  // Use header image or fallback to verified existing image
  const defaultImage = '/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png';
  
  return {
    id: generatedId,
    title: aiPost.title,
    excerpt: aiPost.excerpt || aiPost.meta_description || aiPost.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    content: aiPost.content,
    image: aiPost.header_image_url || defaultImage,
    alt: aiPost.header_image_alt || aiPost.title,
    author: 'Tím PODA',
    date: formatDate(aiPost.published_at || aiPost.created_at),
    category: aiPost.category,
    tags: aiPost.tags || [],
    slug: aiPost.slug
  };
};

/**
 * Merge AI posts from database with static posts
 */
export const mergeBlogPosts = (staticPosts: BlogPost[], aiPosts: AIBlogPost[]): BlogPost[] => {
  // Transform AI posts
  const transformedAIPosts = aiPosts.map((aiPost, index) => 
    transformAIPostToBlogPost(aiPost, index)
  );

  // Merge and sort by date (newest first)
  const allPosts = [...staticPosts, ...transformedAIPosts];
  
  return allPosts.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Parse date from DD. MM. YYYY format
 */
const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split(/[.\s]+/).filter(p => p);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date();
};

/**
 * Find blog post by slug - checks both static and AI posts
 */
export const findBlogPostBySlug = async (
  staticPosts: BlogPost[], 
  slug: string,
  supabase: any
): Promise<BlogPost | null> => {
  // First check static posts
  const staticPost = staticPosts.find(post => post.slug === slug);
  if (staticPost) return staticPost;

  // Then check AI posts in database
  const { data: aiPost, error } = await supabase
    .from('ai_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !aiPost) return null;

  return transformAIPostToBlogPost(aiPost, 0);
};
