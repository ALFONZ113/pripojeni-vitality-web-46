/**
 * Blog slug migration utilities for converting existing posts to slug-based URLs
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';

/**
 * Migrate existing blog post to include slug
 */
export const migrateBlogPostToSlug = (post: BlogPost): BlogPost => {
  if (post.slug) {
    return post; // Already has slug
  }
  
  return {
    ...post,
    slug: createSlug(post.title)
  };
};

/**
 * Batch migrate all blog posts to include slugs
 */
export const migrateAllPostsToSlugs = (posts: BlogPost[]): BlogPost[] => {
  return posts.map(migrateBlogPostToSlug);
};

/**
 * Generate migration report showing which posts need slugs
 */
export interface MigrationReport {
  totalPosts: number;
  postsWithSlugs: number;
  postsNeedingSlugs: number;
  migrationActions: Array<{
    id: number;
    title: string;
    currentSlug?: string;
    proposedSlug: string;
  }>;
}

export const generateMigrationReport = (posts: BlogPost[]): MigrationReport => {
  const postsWithSlugs = posts.filter(post => post.slug);
  const postsNeedingSlugs = posts.filter(post => !post.slug);
  
  const migrationActions = postsNeedingSlugs.map(post => ({
    id: post.id,
    title: post.title,
    currentSlug: post.slug,
    proposedSlug: createSlug(post.title)
  }));
  
  return {
    totalPosts: posts.length,
    postsWithSlugs: postsWithSlugs.length,
    postsNeedingSlugs: postsNeedingSlugs.length,
    migrationActions
  };
};

/**
 * Check for slug conflicts
 */
export const checkSlugConflicts = (posts: BlogPost[]): Array<{slug: string; posts: BlogPost[]}> => {
  const slugGroups = new Map<string, BlogPost[]>();
  
  posts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    if (!slugGroups.has(slug)) {
      slugGroups.set(slug, []);
    }
    slugGroups.get(slug)!.push(post);
  });
  
  return Array.from(slugGroups.entries())
    .filter(([_, posts]) => posts.length > 1)
    .map(([slug, posts]) => ({ slug, posts }));
};

/**
 * Resolve slug conflicts by adding suffixes
 */
export const resolveSlugConflicts = (posts: BlogPost[]): BlogPost[] => {
  const conflicts = checkSlugConflicts(posts);
  if (conflicts.length === 0) {
    return posts;
  }
  
  const resolvedPosts = [...posts];
  
  conflicts.forEach(({ slug, posts: conflictingPosts }) => {
    conflictingPosts.forEach((post, index) => {
      if (index > 0) {
        // Add suffix to conflicting posts
        const postIndex = resolvedPosts.findIndex(p => p.id === post.id);
        if (postIndex !== -1) {
          resolvedPosts[postIndex] = {
            ...resolvedPosts[postIndex],
            slug: `${slug}-${index + 1}`
          };
        }
      }
    });
  });
  
  return resolvedPosts;
};