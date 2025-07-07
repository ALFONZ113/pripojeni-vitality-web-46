

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

// Combine all posts from different categories - ordered by date (newest first)
export const blogPosts: BlogPost[] = [
  podaPokrytie2025Post, // 7. 7. 2025 - TOP článok
  changeProviderPost, // 5. 7. 2025
  ostravaPost, // 3. 7. 2025
  slowInternetFixPost, // 1. 7. 2025
  karvinaPost, // 28. 6. 2025
  ...recenziePosts, // 25. 6. 2025
  ...novinyPosts, // 22. 6. a 20. 6. 2025
  internetGuidePost, // Existing date
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts.filter(post => post.id !== 100), // Vyhnúť sa duplikátu
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

