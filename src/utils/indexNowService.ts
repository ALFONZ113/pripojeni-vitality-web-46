/**
 * IndexNow protocol implementation for instant search engine notification
 * This service notifies search engines immediately when content is updated
 */

export interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for immediate indexing
 */
export const submitToIndexNow = async (urls: string[]): Promise<boolean> => {
  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ];

  const submission: IndexNowSubmission = {
    host: 'www.popri.cz',
    key: 'a1b2c3d4e5f6g7h8i9j0', // Generate unique key for site
    keyLocation: 'https://www.popri.cz/a1b2c3d4e5f6g7h8i9j0.txt',
    urlList: urls
  };

  let success = false;

  for (const endpoint of indexNowEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PODA-IndexNow/1.0'
        },
        body: JSON.stringify(submission)
      });

      if (response.ok || response.status === 202) {
        console.log(`✅ IndexNow submission successful to ${endpoint}`);
        success = true;
      } else {
        console.warn(`⚠️ IndexNow submission failed to ${endpoint}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ IndexNow error for ${endpoint}:`, error);
    }
  }

  return success;
};

/**
 * Submit blog post URL for immediate indexing
 */
export const submitBlogPostToIndexNow = async (postSlug: string): Promise<boolean> => {
  const url = `https://www.popri.cz/blog/${postSlug}`;
  return submitToIndexNow([url]);
};

/**
 * Submit multiple URLs in batch
 */
export const submitBatchToIndexNow = async (paths: string[]): Promise<boolean> => {
  const urls = paths.map(path => `https://www.popri.cz${path}`);
  return submitToIndexNow(urls);
};

/**
 * Generate IndexNow key file content
 */
export const generateIndexNowKey = (): string => {
  return 'a1b2c3d4e5f6g7h8i9j0';
};