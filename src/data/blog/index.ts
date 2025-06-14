import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaPost } from './karvina';
import { novinyPosts } from './noviny';
import { recenziePosts } from './recenzie';
import { ostravaPost } from './ostrava';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts,
  karvinaPost,
  ...novinyPosts,
  ...recenziePosts,
  ostravaPost, // Pridanie nového článku
];

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
export * from './karvina';
export * from './noviny';
export * from './recenzie';
export * from './ostrava'; // Export nového článku
