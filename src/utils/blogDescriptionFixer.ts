import { blogPosts } from '../data/blog';
import { generateOptimizedDescription } from './blogSeoOptimizer';

/**
 * Identifies and provides fixes for blog posts with poor meta descriptions
 */
export const identifyProblematicPosts = () => {
  const problematicPosts = blogPosts.filter(post => 
    !post.excerpt || post.excerpt.length < 120
  );

  console.log(`Found ${problematicPosts.length} posts that need optimization:`);
  
  problematicPosts.forEach(post => {
    console.log(`\nID: ${post.id}`);
    console.log(`Title: ${post.title}`);
    console.log(`Current excerpt: "${post.excerpt || 'MISSING'}"`);
    console.log(`Current length: ${post.excerpt?.length || 0} characters`);
    
    const optimizedDescription = generateOptimizedDescription(post);
    console.log(`Optimized excerpt: "${optimizedDescription}"`);
    console.log(`New length: ${optimizedDescription.length} characters`);
    console.log('---');
  });

  return problematicPosts;
};

/**
 * Quick fixes for the most common problematic posts
 */
export const getQuickFixes = () => {
  const fixes = new Map();
  
  // Generate fixes for posts that need them
  const problematicPosts = blogPosts.filter(post => 
    !post.excerpt || post.excerpt.length < 120
  );

  problematicPosts.forEach(post => {
    const filename = getFilenameForPost(post.id);
    const optimizedExcerpt = generateOptimizedDescription(post);
    
    fixes.set(post.id, {
      filename,
      title: post.title,
      currentExcerpt: post.excerpt || '',
      newExcerpt: optimizedExcerpt,
      change: `excerpt: "${optimizedExcerpt}",`
    });
  });

  return fixes;
};

const getFilenameForPost = (id: number): string => {
  if (id === 101) return 'panelak-otazky.ts';
  if (id >= 150) return 'technologie.ts';
  if (id >= 6 && id <= 10) return 'tipy.ts';
  if (id >= 11 && id <= 15) return 'sluzby.ts';
  if (id === 100) return 'karvina.ts';
  if (id >= 16 && id <= 20) return 'noviny.ts';
  if (id >= 21 && id <= 25) return 'recenzie.ts';
  if (id === 1 || id === 2) return 'ostrava.ts';
  if (id >= 102) return 'polanka-60ghz.ts';
  return 'unknown.ts';
};

/**
 * Show summary of optimization needed
 */
export const showOptimizationSummary = () => {
  const total = blogPosts.length;
  const problematic = blogPosts.filter(post => 
    !post.excerpt || post.excerpt.length < 120
  ).length;
  const optimized = total - problematic;

  return {
    total,
    optimized,
    problematic,
    percentage: Math.round((optimized / total) * 100),
    status: problematic === 0 ? 'VŠECHNY ČLÁNKY JSOU OPTIMALIZOVANÉ! ✅' : 
            problematic <= 5 ? 'TÉMĚŘ HOTOVO - jen pár článků k dokončení 📝' :
            'POTŘEBUJE OPTIMALIZACI 🔧'
  };
};