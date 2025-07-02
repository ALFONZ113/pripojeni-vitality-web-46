
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaPost } from './karvina';
import { novinyPosts } from './noviny';
import { recenziePosts } from './recenzie';
import { ostravaPost } from './ostrava';
import { internetGuidePost } from './internet-guide';
import { missingPosts } from './missing-posts';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  internetGuidePost, // ID 18
  ostravaPost, // ID 16
  ...missingPosts, // ID 1, 9, 15
  ...sluzbyPosts, // ID 2, 100
  ...technologiePosts, // ID 3, 4, 5, 14, 17
  ...tipyPosts, // ID 6, 7, 8
  karvinaPost, // ID 10
  ...novinyPosts, // ID 11, 12
  ...recenziePosts, // ID 13
].sort((a, b) => {
  // Sort by ID for consistent ordering
  return a.id - b.id;
});

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
export * from './karvina';
export * from './noviny';
export * from './recenzie';
export * from './ostrava';
export * from './internet-guide';
export * from './missing-posts';
