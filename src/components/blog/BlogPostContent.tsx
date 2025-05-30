
import { useState, useEffect } from 'react';
import type { BlogPost } from '../../data/blog/types';
import { blogPosts } from '../../data/blog';
import BlogFAQ from './BlogFAQ';
import QuickAnswerBox from './QuickAnswerBox';
import BlogPostActions from './BlogPostActions';
import BlogPostNavigation from './BlogPostNavigation';
import BlogPostTags from './BlogPostTags';
import BlogPostMetadata from './BlogPostMetadata';
import ReadingProgressCTA from './ReadingProgressCTA';
import { extractFAQsFromContent } from '../../utils/structuredData';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  
  // Extract FAQs from post content
  const faqs = extractFAQsFromContent(post.content);
  
  // Find previous and next post
  useEffect(() => {
    const currentIndex = blogPosts.findIndex(p => p.id === post.id);
    if (currentIndex > 0) {
      setPrevPost(blogPosts[currentIndex - 1]);
    } else {
      setPrevPost(null);
    }
    
    if (currentIndex < blogPosts.length - 1) {
      setNextPost(blogPosts[currentIndex + 1]);
    } else {
      setNextPost(null);
    }
  }, [post.id]);

  return (
    <div className="lg:col-span-8" itemScope itemType="http://schema.org/BlogPosting">
      <BlogPostMetadata 
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        date={post.date}
        image={post.image}
      />
      
      {/* Enhanced Quick Answer Boxes with contextual CTAs */}
      {post.category === 'Služby' && (
        <QuickAnswerBox
          type="info"
          title="Rýchla odpoveď"
          content="PODA poskytuje optické pripojenie až 1 Gb/s s TV zadarmo. Inštalácia je bezplatná a služby sú dostupné vo väčšine miest ČR."
          showContactCTA={true}
          category={post.category}
        />
      )}

      {post.category === 'Technologie' && (
        <QuickAnswerBox
          type="tip"
          title="Technický tip"
          content="Pre optimálny výkon domácej siete odporúčame používať najnovšie Wi-Fi 6 routery a pravidelne aktualizovať firmware."
          showContactCTA={true}
          category={post.category}
        />
      )}
      
      <article className="prose prose-lg max-w-none prose-headings:text-poda-blue prose-img:rounded-lg prose-img:shadow-md prose-a:text-poda-blue hover:prose-a:text-poda-orange prose-blockquote:border-l-poda-blue prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
        <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      {/* FAQ Section with enhanced contact opportunities */}
      {faqs.length > 0 && (
        <BlogFAQ 
          faqs={faqs} 
          title="Často kladené otázky k tomuto tématu" 
        />
      )}
      
      {/* Enhanced call to action box */}
      <QuickAnswerBox
        type="success"
        title="Potrebujete pomoc s pripojením?"
        content="Náš obchodný zástupca Milan Terč vám rád poradí a pomôže s výberom najvhodnejšieho tarifu. Kontaktujte nás bez záväzkov!"
        showContactCTA={true}
        category={post.category}
      />
      
      <BlogPostActions 
        postId={post.id}
        postTitle={post.title}
        postExcerpt={post.excerpt}
      />

      <BlogPostTags 
        category={post.category}
        tags={post.tags}
        date={post.date}
      />
      
      <BlogPostNavigation 
        prevPost={prevPost}
        nextPost={nextPost}
      />

      {/* Reading progress CTA */}
      <ReadingProgressCTA 
        postTitle={post.title}
        category={post.category}
      />
    </div>
  );
};

export default BlogPostContent;
