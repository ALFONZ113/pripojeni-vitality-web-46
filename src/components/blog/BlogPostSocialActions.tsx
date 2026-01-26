import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '../ui/button';

interface BlogPostSocialActionsProps {
  postTitle: string;
  postExcerpt?: string;
  postUrl?: string;
}

const BlogPostSocialActions = ({ postTitle, postExcerpt, postUrl }: BlogPostSocialActionsProps) => {
  const [copied, setCopied] = useState(false);
  const url = postUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(postTitle);

  // Facebook share - automaticky načíta og:image z URL
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      'facebook-share',
      'width=600,height=400'
    );
  };

  // Twitter/X share
  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      'twitter-share',
      'width=600,height=400'
    );
  };

  // LinkedIn share
  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      'linkedin-share',
      'width=600,height=400'
    );
  };

  // Kopírovanie URL
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('URL zkopírována do schránky');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Nepodařilo se zkopírovat URL');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Sdílet:</span>
      
      <Button variant="outline" size="sm" onClick={shareToFacebook} className="gap-1">
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareToTwitter} className="gap-1">
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareToLinkedIn} className="gap-1">
        <Linkedin className="h-4 w-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={copyUrl} className="gap-1">
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? 'Zkopírováno' : 'Kopírovat URL'}</span>
      </Button>
    </div>
  );
};

export default BlogPostSocialActions;
