
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaPost } from './karvina';

// Combine all posts from different categories, but filter out any duplicate Karviná posts
const filteredTipyPosts = tipyPosts.filter(post => 
  !post.title.toLowerCase().includes('karvin') && 
  !post.content.toLowerCase().includes('karvin')
);

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  karvinaPost,
  ...sluzbyPosts,
  ...technologiePosts,
  ...filteredTipyPosts
];

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
export * from './karvina';
