import { useEffect, useRef } from 'react';
import { submitBlogPostToIndexNow } from '../../utils/indexNowService';

interface IndexNowSubmitterProps {
  slug: string;
  postId?: number;
  priority?: 'high' | 'normal';
}

/**
 * Component that submits blog post to IndexNow for immediate indexing
 * Runs once on mount for priority articles
 */
const IndexNowSubmitter = ({ slug, postId, priority = 'normal' }: IndexNowSubmitterProps) => {
  const hasSubmitted = useRef(false);

  useEffect(() => {
    // Only submit once and only for high priority articles or specific post IDs
    const shouldSubmit = priority === 'high' || postId === 401; // 401 = PODA internet 2026
    
    if (shouldSubmit && !hasSubmitted.current) {
      hasSubmitted.current = true;
      
      // Check if we've already submitted recently (within 24 hours)
      const cacheKey = `indexnow_${slug}`;
      const lastSubmit = localStorage.getItem(cacheKey);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (lastSubmit && now - parseInt(lastSubmit) < twentyFourHours) {
        console.log(`⏭️ IndexNow: Skipping ${slug} (submitted recently)`);
        return;
      }
      
      // Submit to IndexNow
      submitBlogPostToIndexNow(slug)
        .then((success) => {
          if (success) {
            localStorage.setItem(cacheKey, now.toString());
            console.log(`✅ IndexNow: Successfully submitted ${slug}`);
          }
        })
        .catch((error) => {
          console.error(`❌ IndexNow: Failed to submit ${slug}`, error);
        });
    }
  }, [slug, postId, priority]);

  // This component doesn't render anything
  return null;
};

export default IndexNowSubmitter;
