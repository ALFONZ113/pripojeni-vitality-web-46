
import { Link } from 'react-router-dom';
import { Share2, Bookmark, MessageSquare } from 'lucide-react';
import type { BlogPost } from '../../data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(err => {
        console.error('Sdílení selhalo:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('URL zkopírována do schránky');
        })
        .catch(err => {
          console.error('Kopírování do schránky selhalo:', err);
        });
    }
  };

  return (
    <div className="lg:col-span-8">
      <article className="prose prose-lg max-w-none" itemScope itemType="http://schema.org/BlogPosting">
        <meta itemProp="datePublished" content={post.date.split('. ').reverse().join('-')} />
        <meta itemProp="author" content={post.author} />
        <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
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
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Kontaktovat nás</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostContent;
