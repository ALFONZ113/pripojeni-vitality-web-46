
import { Link } from 'react-router-dom';
import { Share2, Bookmark, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';

interface BlogPostActionsProps {
  postId: number;
  postTitle: string;
  postExcerpt?: string;
}

const BlogPostActions = ({ postId, postTitle, postExcerpt }: BlogPostActionsProps) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    setIsSaved(savedPosts.some((savedPost: number) => savedPost === postId));
  }, [postId]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: postTitle,
          text: postExcerpt,
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
    const isAlreadySaved = savedPosts.some((savedPost: number) => savedPost === postId);
    
    if (isAlreadySaved) {
      const updatedSavedPosts = savedPosts.filter((savedPost: number) => savedPost !== postId);
      localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
      toast({
        description: 'Článek byl odebrán z uložených',
        duration: 2000
      });
      setIsSaved(false);
    } else {
      savedPosts.push(postId);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      toast({
        description: 'Článek byl uložen',
        duration: 2000
      });
      setIsSaved(true);
    }
  };

  return (
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
  );
};

export default BlogPostActions;
