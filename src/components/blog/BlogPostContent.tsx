
import { Link } from 'react-router-dom';
import { Share2, Bookmark, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import type { BlogPost } from '../../data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
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

  const formattedDate = post.date.split('. ').reverse().join('-');

  return (
    <div className="lg:col-span-8" itemScope itemType="http://schema.org/BlogPosting">
      {/* Hidden schema.org metadata */}
      <meta itemProp="datePublished" content={formattedDate} />
      <meta itemProp="author" content={post.author} />
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="description" content={post.excerpt || ''} />
      {post.image && <meta itemProp="image" content={post.image} />}
      <link itemProp="mainEntityOfPage" href={`https://www.popri.cz/blog/${post.id}`} />
      <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
        <meta itemProp="name" content="Popri.cz" />
        <div itemProp="logo" itemScope itemType="http://schema.org/ImageObject">
          <meta itemProp="url" content="https://www.popri.cz/poda-logo.svg" />
        </div>
      </div>
      
      <article className="prose prose-lg max-w-none">
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

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-gray-600">Štítky:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-poda-blue hover:text-white transition-colors">
                {post.category}
              </Link>
              {post.tags?.map((tag, index) => (
                <Link key={index} to={`/blog?tag=${encodeURIComponent(tag)}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-poda-blue hover:text-white transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-gray-600">
            Publikováno: <time dateTime={formattedDate}>{post.date}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
