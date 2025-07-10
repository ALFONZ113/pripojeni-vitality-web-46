
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaPost } from './karvina';
import { novinyPosts } from './noviny';
import { recenziePosts } from './recenzie';
import { ostravaPost } from './ostrava';
import { internetGuidePost } from './internet-guide';
import { slowInternetFixPost } from './slow-internet-fix';
import { podaPokrytie2025Post } from './poda-pokrytie-2025';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  podaPokrytie2025Post, // Najnovší článok - 7. 1. 2025
  slowInternetFixPost,
  internetGuidePost,
  ...sluzbyPosts, // Obsahuje ID 2 a ID 101 (Poruba článok)
  ...technologiePosts,
  ...tipyPosts, // Blog o Porube má teraz jedinečné ID 100
  karvinaPost,
  ...novinyPosts,
  ...recenziePosts,
  ostravaPost,
];

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
export * from './slow-internet-fix';
export * from './poda-pokrytie-2025';
