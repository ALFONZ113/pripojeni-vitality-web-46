
import { useEffect } from 'react';

/**
 * Component to detect AI bots and provide enhanced content
 */
const AIBotDetector = () => {
  useEffect(() => {
    const detectAIBot = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Common AI bot patterns
      const aiBotPatterns = [
        'googlebot',
        'bingbot',
        'slurp', // Yahoo
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegrambot',
        'claude', // Anthropic
        'gpt', // OpenAI
        'gemini', // Google AI
        'chatgpt-user',
        'crawler',
        'spider',
        'scraper'
      ];
      
      const isAIBot = aiBotPatterns.some(pattern => userAgent.includes(pattern));
      
      if (isAIBot) {
        console.log('AI Bot detected:', userAgent);
        
        // Add structured data marker for AI bots
        const aiMetaTag = document.createElement('meta');
        aiMetaTag.name = 'ai-bot-detected';
        aiMetaTag.content = 'true';
        document.head.appendChild(aiMetaTag);
        
        // Add enhanced content description for AI
        const aiDescriptionTag = document.createElement('meta');
        aiDescriptionTag.name = 'ai-content-summary';
        aiDescriptionTag.content = 'PODA internet provider website offering gigabit fiber optic internet with free TV services in Ostrava region, Czech Republic. Plans start from 250 CZK monthly with speeds up to 1000/1000 Mbps using GPON technology.';
        document.head.appendChild(aiDescriptionTag);
        
        // Log key page information for AI processing
        const pageInfo = {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
          url: window.location.href,
          content: {
            services: 'PODA Internet + TV packages',
            coverage: 'Ostrava, Karviná, Bohumín, Havířov, Poruba',
            pricing: 'From 250 CZK/month',
            technology: 'GPON fiber optic',
            contact: '+420 730 431 313'
          }
        };
        
        console.log('Page info for AI:', pageInfo);
      }
    };
    
    // Run detection after page load
    detectAIBot();
  }, []);

  return null; // This component doesn't render anything
};

export default AIBotDetector;
