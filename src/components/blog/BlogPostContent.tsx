
import { Link } from 'react-router-dom';
import { Share2, Bookmark, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { BlogPost } from '../../data/blog/types';
import { useState, useEffect } from 'react';
import { blogPosts } from '../../data/blog';
import BlogCTA from './BlogCTA';
import BlogPostMeta from './BlogPostMeta';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  
  // Extract location from post for geo-optimization
  const extractLocation = (text: string): string | null => {
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová'];
    return locations.find(loc => text.includes(loc)) || null;
  };
  
  const location = extractLocation(`${post.title} ${post.content}`);
  
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
    
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    setIsSaved(savedPosts.some((savedPost: number) => savedPost === post.id));
  }, [post.id]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: 'URL zkopírována do schránky',
          duration: 2000
        });
      }
    } catch (err) {
      console.error('Sdílení selhalo:', err);
      toast({
        variant: "destructive",
        description: 'Sdílení selhalo',
        duration: 2000
      });
    }
  };
  
  const handleSave = () => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    const isAlreadySaved = savedPosts.some((savedPost: number) => savedPost === post.id);
    
    if (isAlreadySaved) {
      const updatedSavedPosts = savedPosts.filter((savedPost: number) => savedPost !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
      toast({
        description: 'Článek byl odebrán z uložených',
        duration: 2000
      });
      setIsSaved(false);
    } else {
      savedPosts.push(post.id);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      toast({
        description: 'Článek byl uložen',
        duration: 2000
      });
      setIsSaved(true);
    }
  };

  // Process content to add CTA elements
  const processContentWithCTA = (content: string): string => {
    // Insert CTA after first paragraph
    const paragraphs = content.split('</p>');
    if (paragraphs.length > 1) {
      paragraphs[0] += '</p><div class="inline-cta-placeholder"></div>';
      return paragraphs.join('</p>');
    }
    return content;
  };

  const processedContent = processContentWithCTA(post.content);

  return (
    <div className="lg:col-span-8" itemScope itemType="http://schema.org/BlogPosting">
      {/* Enhanced meta information */}
      <BlogPostMeta post={post} />
      
      <article className="prose prose-lg max-w-none prose-headings:text-poda-blue prose-img:rounded-lg prose-img:shadow-md prose-a:text-poda-blue hover:prose-a:text-poda-orange prose-blockquote:border-l-poda-blue prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
        {/* Display full content */}
        <div 
          itemProp="articleBody" 
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
        
        {/* Inline CTA after first section */}
        <BlogCTA location={location} variant="inline" />
        
        {/* Additional geo-optimized content */}
        {location && (
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-8 border-l-4 border-poda-blue">
            <h4 className="text-lg font-semibold text-poda-blue mb-2">
              Služby PODA v {location}
            </h4>
            <p className="text-gray-700 mb-4">
              Hľadáte spoľahlivé internetové pripojenie v {location}? PODA poskytuje rýchly optický internet 
              s garantovanými rýchlosťami a bezplatnou inštaláciou. 
              <BlogCTA variant="inline" compact location={location} />
            </p>
          </div>
        )}
      </article>
      
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button 
            className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors"
            onClick={handleShare}
            aria-label="Sdílet článek"
          >
            <Share2 className="h-5 w-5 mr-2" />
            <span>Sdílet</span>
          </button>
          <button 
            className={`inline-flex items-center transition-colors ${isSaved ? 'text-poda-blue' : 'text-gray-500 hover:text-poda-blue'}`}
            onClick={handleSave}
            aria-label="Uložit článek"
          >
            <Bookmark className={`h-5 w-5 mr-2 ${isSaved ? 'fill-poda-blue' : ''}`} />
            <span>{isSaved ? 'Uloženo' : 'Uložit'}</span>
          </button>
        </div>
        
        <Link 
          to="/kontakt" 
          className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Kontaktovat nás</span>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="text-gray-700 font-medium mb-2">Štítky:</h3>
            <div className="flex flex-wrap gap-2">
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="bg-poda-blue text-white px-3 py-1 rounded-full text-sm hover:bg-poda-blue-dark transition-colors">
                {post.category}
              </Link>
              {post.tags?.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/blog?tag=${encodeURIComponent(tag)}`} 
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-poda-blue hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <BlogCTA location={location} variant="footer" />
      
      {/* Navigation between posts */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
        {prevPost ? (
          <Link 
            to={`/blog/${prevPost.id}`} 
            className="flex items-center text-poda-blue hover:text-poda-orange transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            <div>
              <span className="block text-sm text-gray-500">Předchozí článek</span>
              <span className="font-medium">{prevPost.title}</span>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextPost ? (
          <Link 
            to={`/blog/${nextPost.id}`} 
            className="flex items-center text-poda-blue hover:text-poda-orange transition-colors group sm:ml-auto text-right"
          >
            <div>
              <span className="block text-sm text-gray-500">Následující článek</span>
              <span className="font-medium">{nextPost.title}</span>
            </div>
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      
      {/* Floating CTA for mobile */}
      <BlogCTA variant="floating" />
    </div>
  );
};

export default BlogPostContent;
