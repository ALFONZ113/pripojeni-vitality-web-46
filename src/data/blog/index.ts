
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaBlogPosts } from './karvina';
import { novinyPosts } from './noviny';
import { recenziePosts } from './recenzie';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts,
  ...karvinaBlogPosts,
  ...novinyPosts,
  ...recenziePosts
];

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
export * from './karvina';
export * from './noviny';
export * from './recenzie';
