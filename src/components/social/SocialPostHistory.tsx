import { useState } from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { 
  History, 
  Facebook, 
  Instagram, 
  Check, 
  X, 
  Trash2, 
  Eye,
  CheckCircle,
  Clock,
  Loader2,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SocialPost {
  id: string;
  post_type: string;
  platform: string;
  custom_topic: string | null;
  facebook_text: string | null;
  facebook_hashtags: string | null;
  facebook_image_prompt: string | null;
  facebook_image_url: string | null;
  instagram_text: string | null;
  instagram_hashtags: string | null;
  instagram_image_prompt: string | null;
  instagram_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

interface SocialPostHistoryProps {
  posts: SocialPost[];
  isLoading: boolean;
  onRefresh: () => void;
}

const postTypeLabels: Record<string, string> = {
  promo: 'Promo',
  tip: 'Tip',
  blog: 'Blog',
  testimonial: 'Reference',
  news: 'Novinka',
  custom: 'Vlastní',
};

export function SocialPostHistory({ posts, isLoading, onRefresh }: SocialPostHistoryProps) {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const togglePublished = async (post: SocialPost) => {
    setIsUpdating(post.id);
    try {
      const { error } = await supabase
        .from('social_posts')
        .update({
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null,
        })
        .eq('id', post.id);

      if (error) throw error;

      toast.success(post.is_published ? 'Označeno jako nepublikované' : 'Označeno jako publikované');
      onRefresh();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Chyba při aktualizaci');
    } finally {
      setIsUpdating(null);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast.success('Příspěvek smazán');
      onRefresh();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Chyba při mazání');
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" />
            Historie příspěvků
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" />
            Historie příspěvků
            {posts.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {posts.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Zatím žádné příspěvky
            </p>
          ) : (
            <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {postTypeLabels[post.post_type] || post.post_type}
                        </Badge>
                        {(post.platform === 'facebook' || post.platform === 'both') && (
                          <Facebook className="h-4 w-4 text-[#1877F2]" />
                        )}
                        {(post.platform === 'instagram' || post.platform === 'both') && (
                          <Instagram className="h-4 w-4 text-[#E4405F]" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {post.is_published ? (
                          <Badge className="bg-green-500/20 text-green-500 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Publikováno
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Nepublikováno
                          </Badge>
                        )}
                      </div>
                    </div>

                    {post.custom_topic && (
                      <p className="text-sm text-foreground line-clamp-2 mb-2">
                        {post.custom_topic}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(post.created_at), 'd. MMMM yyyy, HH:mm', { locale: cs })}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 sm:h-7 sm:w-7"
                          onClick={() => setSelectedPost(post)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 sm:h-7 sm:w-7"
                          onClick={() => togglePublished(post)}
                          disabled={isUpdating === post.id}
                        >
                          {isUpdating === post.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : post.is_published ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 sm:h-7 sm:w-7 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Smazat příspěvek?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tato akce je nevratná. Příspěvek bude trvale smazán.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Zrušit</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deletePost(post.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Smazat
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Detail příspěvku
              {selectedPost?.is_published && (
                <Badge className="bg-green-500/20 text-green-500">
                  Publikováno
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge>{postTypeLabels[selectedPost.post_type] || selectedPost.post_type}</Badge>
                {(selectedPost.platform === 'facebook' || selectedPost.platform === 'both') && (
                  <Badge variant="outline" className="gap-1">
                    <Facebook className="h-3 w-3 text-[#1877F2]" />
                    Facebook
                  </Badge>
                )}
                {(selectedPost.platform === 'instagram' || selectedPost.platform === 'both') && (
                  <Badge variant="outline" className="gap-1">
                    <Instagram className="h-3 w-3 text-[#E4405F]" />
                    Instagram
                  </Badge>
                )}
              </div>

              {selectedPost.custom_topic && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Téma</h4>
                  <p className="text-sm">{selectedPost.custom_topic}</p>
                </div>
              )}

              {selectedPost.facebook_text && (
                <div className="p-4 rounded-lg bg-muted/50 border border-[#1877F2]/30">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-[#1877F2]" />
                    Facebook text
                  </h4>
                  <p className="text-sm whitespace-pre-wrap">{selectedPost.facebook_text}</p>
                  {selectedPost.facebook_hashtags && (
                    <p className="text-sm text-primary mt-2">{selectedPost.facebook_hashtags}</p>
                  )}
                  {selectedPost.facebook_image_url && (
                    <img 
                      src={selectedPost.facebook_image_url} 
                      alt="Facebook obrázek"
                      className="mt-3 rounded-lg max-w-full"
                    />
                  )}
                  {selectedPost.facebook_image_prompt && (
                    <div className="mt-3 p-3 rounded bg-background border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          🖼️ Image Prompt
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedPost.facebook_image_prompt!);
                            toast.success('Prompt skopírovaný!');
                          }}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Kopírovať
                        </Button>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {selectedPost.facebook_image_prompt}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedPost.instagram_text && (
                <div className="p-4 rounded-lg bg-muted/50 border border-[#E4405F]/30">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-[#E4405F]" />
                    Instagram text
                  </h4>
                  <p className="text-sm whitespace-pre-wrap">{selectedPost.instagram_text}</p>
                  {selectedPost.instagram_hashtags && (
                    <p className="text-sm text-primary mt-2">{selectedPost.instagram_hashtags}</p>
                  )}
                  {selectedPost.instagram_image_url && (
                    <img 
                      src={selectedPost.instagram_image_url} 
                      alt="Instagram obrázek"
                      className="mt-3 rounded-lg max-w-full"
                    />
                  )}
                  {selectedPost.instagram_image_prompt && (
                    <div className="mt-3 p-3 rounded bg-background border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          🖼️ Image Prompt
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedPost.instagram_image_prompt!);
                            toast.success('Prompt skopírovaný!');
                          }}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Kopírovať
                        </Button>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {selectedPost.instagram_image_prompt}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Vytvořeno: {format(new Date(selectedPost.created_at), 'd. MMMM yyyy, HH:mm', { locale: cs })}
                {selectedPost.published_at && (
                  <span className="ml-4">
                    Publikováno: {format(new Date(selectedPost.published_at), 'd. MMMM yyyy, HH:mm', { locale: cs })}
                  </span>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
