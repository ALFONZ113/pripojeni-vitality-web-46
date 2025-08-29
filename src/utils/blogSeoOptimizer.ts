import { BlogPost } from '../data/blog/types';
import { blogPosts } from '../data/blog';

/**
 * Analyzes blog posts and identifies those with missing or suboptimal meta descriptions
 */
export const analyzeBlogPostDescriptions = () => {
  const postsWithoutOptimizedDescription = blogPosts.filter(post => 
    !post.excerpt || post.excerpt.length < 120 || post.excerpt.length > 160
  );

  const postsWithShortDescriptions = blogPosts.filter(post => 
    post.excerpt && post.excerpt.length < 120
  );

  const postsWithLongDescriptions = blogPosts.filter(post => 
    post.excerpt && post.excerpt.length > 160
  );

  const postsWithoutDescriptions = blogPosts.filter(post => !post.excerpt);

  return {
    total: blogPosts.length,
    problematic: postsWithoutOptimizedDescription.length,
    short: postsWithShortDescriptions,
    long: postsWithLongDescriptions,
    missing: postsWithoutDescriptions,
    details: postsWithoutOptimizedDescription.map(post => ({
      id: post.id,
      title: post.title,
      currentLength: post.excerpt?.length || 0,
      issue: !post.excerpt ? 'missing' : post.excerpt.length < 120 ? 'too-short' : 'too-long'
    }))
  };
};

/**
 * Generates an optimized meta description for a blog post
 */
export const generateOptimizedDescription = (post: BlogPost): string => {
  const { title, content, category, tags } = post;
  
  // Extract clean text from HTML content
  const cleanContent = content.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Extract key locations/services for PODA
  const locationKeywords = ['Ostrava', 'Karviná', 'Havířov', 'Bohumín', 'Poruba', 'Moravskoslezský'];
  const serviceKeywords = ['internet', 'optické připojení', 'FTTH', 'Wi-Fi', 'TV', 'IPTV', 'PODA'];
  
  const foundLocations = locationKeywords.filter(keyword => 
    title.toLowerCase().includes(keyword.toLowerCase()) || 
    cleanContent.toLowerCase().includes(keyword.toLowerCase())
  );
  
  const foundServices = serviceKeywords.filter(keyword => 
    title.toLowerCase().includes(keyword.toLowerCase()) || 
    cleanContent.toLowerCase().includes(keyword.toLowerCase())
  );

  // Create compelling meta description
  let description = '';
  
  // Start with action words based on category
  if (category === 'Tipy') {
    description = 'Zjistěte ';
  } else if (category === 'Technologie') {
    description = 'Objevte ';
  } else if (category === 'Služby') {
    description = 'Získejte ';
  } else {
    description = 'Přečtěte si ';
  }

  // Add main topic from first sentence
  const firstSentence = cleanContent.split('.')[0];
  if (firstSentence && firstSentence.length > 20 && firstSentence.length < 80) {
    description += firstSentence.toLowerCase();
  } else {
    // Extract key terms from title
    const titleWords = title.split(' ').slice(0, 8).join(' ').toLowerCase();
    description += titleWords;
  }

  // Add location context if found
  if (foundLocations.length > 0) {
    const primaryLocation = foundLocations[0];
    if (!description.toLowerCase().includes(primaryLocation.toLowerCase())) {
      description += ` v ${primaryLocation}`;
    }
  }

  // Add service context if found
  if (foundServices.length > 0 && !description.toLowerCase().includes('internet')) {
    const primaryService = foundServices[0];
    if (!description.toLowerCase().includes(primaryService.toLowerCase())) {
      description += `. ${primaryService.charAt(0).toUpperCase() + primaryService.slice(1)}`;
    }
  }

  // Add compelling ending with CTA
  if (description.length < 100) {
    description += '. Praktické rady, tipy a řešení pro moderní domácnosti od PODA.';
  } else {
    description += ' od PODA.';
  }

  // Ensure proper length (120-160 characters)
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  } else if (description.length < 120) {
    // Add more context
    const extraContext = ' Expert PODA radí, jak na to nejlépe.';
    if (description.length + extraContext.length <= 160) {
      description += extraContext;
    }
  }

  return description;
};

/**
 * Generates file updates for blog posts with optimized descriptions  
 */
export const generateBlogFileUpdates = () => {
  const analysis = analyzeBlogPostDescriptions();
  const updates: Array<{
    postId: number;
    title: string;
    currentExcerpt: string;
    newExcerpt: string;
    filename: string;
  }> = [];

  // Process problematic posts
  analysis.details.forEach(detail => {
    const post = blogPosts.find(p => p.id === detail.id);
    if (!post) return;

    const newExcerpt = generateOptimizedDescription(post);
    
    // Determine which file the post belongs to
    let filename = '';
    if (post.id === 101) filename = 'panelak-otazky.ts';
    else if (post.id >= 150) filename = 'technologie.ts';
    else if (post.id >= 6 && post.id <= 10) filename = 'tipy.ts';
    else if (post.id >= 11 && post.id <= 15) filename = 'sluzby.ts';
    else if (post.id === 100) filename = 'karvina.ts';
    else if (post.id >= 16 && post.id <= 20) filename = 'noviny.ts';
    else if (post.id >= 21 && post.id <= 25) filename = 'recenzie.ts';
    else if (post.id === 1 || post.id === 2) filename = 'ostrava.ts';
    else filename = 'unknown';
    
    updates.push({
      postId: post.id,
      title: post.title,
      currentExcerpt: post.excerpt || '',
      newExcerpt,
      filename
    });
  });

  return updates;
};

/**
 * Quick check to see current status
 */
export const getOptimizationStatus = () => {
  const analysis = analyzeBlogPostDescriptions();
  
  return {
    totalPosts: analysis.total,
    optimizedPosts: analysis.total - analysis.problematic,
    problematicPosts: analysis.problematic,
    issues: analysis.details,
    summary: `${analysis.total - analysis.problematic}/${analysis.total} článků má optimalizované popisy`
  };
};