
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
import { o2AlternativaPost } from './o2-alternativa';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  o2AlternativaPost, // Najnovší článok - O2 alternativa
  slowInternetFixPost,
  internetGuidePost,
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts,
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
export * from './o2-alternativa';
