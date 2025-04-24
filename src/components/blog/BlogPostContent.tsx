
import { Link } from 'react-router-dom';
import { Share2, Bookmark, MessageSquare } from 'lucide-react';
import type { BlogPost } from '../../data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Odkaz zkopírován do schránky'))
        .catch((error) => console.log('Error copying link', error));
    }
  };

  const savePost = () => {
    // This could be implemented with localStorage or a more sophisticated 
    // bookmarking system in the future
    alert('Funkce uložení článku bude dostupná brzy');
  };

  return (
    <div className="lg:col-span-8">
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button 
            onClick={sharePost}
            className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors"
            aria-label="Sdílet článek"
          >
            <Share2 className="h-5 w-5 mr-2" />
            <span>Sdílet</span>
          </button>
          <button 
            onClick={savePost}
            className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors"
            aria-label="Uložit článek"
          >
            <Bookmark className="h-5 w-5 mr-2" />
            <span>Uložit</span>
          </button>
        </div>
        
        <Link 
          to="/kontakt" 
          className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium"
          aria-label="Kontaktovat nás ohledně článku"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Kontaktovat nás</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostContent;
