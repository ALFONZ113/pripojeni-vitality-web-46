
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts
];

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
