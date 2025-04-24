
import { BlogPost, Category, categories } from './types';
import { technologyPosts } from './technology-posts';
import { tipsPosts } from './tips-posts';
import { servicesPosts } from './services-posts';

// Combine all blog posts
export const blogPosts: BlogPost[] = [
  ...servicesPosts,
  ...technologyPosts, 
  ...tipsPosts
];

// Export everything for easy import elsewhere
export { categories, Category, BlogPost };
