
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
import { changeProviderPost } from './change-provider-guide';
import { podaPokrytie2025Post } from './poda-pokrytie-2025';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  podaPokrytie2025Post, // Najnovší článok - 7. 1. 2025
  changeProviderPost, // 1. 6. 2025
  slowInternetFixPost,
  internetGuidePost,
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts.filter(post => post.id !== 100), // Vyhnúť sa duplikátu
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
export * from './change-provider-guide';
export * from './poda-pokrytie-2025';
