import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { toast } from 'sonner';
import { PostTypeSelector } from '@/components/social/PostTypeSelector';
import { PlatformSelector } from '@/components/social/PlatformSelector';
import { StyleSelector, VisualStyle } from '@/components/social/StyleSelector';
import { GeneratedContent } from '@/components/social/GeneratedContent';
import { ContentCalendar } from '@/components/social/ContentCalendar';
import { SocialPostHistory } from '@/components/social/SocialPostHistory';
import { PostType, Platform } from '@/data/social/templates';

interface PlatformContent {
  text: string;
  hashtags: string;
  imagePrompt: string;
  imageUrl?: string;
}

interface GeneratedResult {
  facebook?: PlatformContent;
  instagram?: PlatformContent;
}

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

export default function SocialGenerator() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatingImageFor, setGeneratingImageFor] = useState<string | null>(null);

  // Form state
  const [postType, setPostType] = useState<PostType>('promo');
  const [platform, setPlatform] = useState<Platform>('both');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('luxury-gold');
  const [customTopic, setCustomTopic] = useState('');

  // Generated content
  const [result, setResult] = useState<GeneratedResult | null>(null);

  // History
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Fetch history error:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [userId]);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId, fetchHistory]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin-login-poda-2024');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast.error('Nemáte oprávnění k přístupu');
        navigate('/');
        return;
      }

      setUserId(user.id);
      setIsAdmin(true);
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/admin-login-poda-2024');
    } finally {
      setIsLoading(false);
    }
  };

  const savePost = async () => {
    if (!result || !userId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('social_posts').insert({
        user_id: userId,
        post_type: postType,
        platform,
        custom_topic: customTopic || null,
        facebook_text: result.facebook?.text || null,
        facebook_hashtags: result.facebook?.hashtags || null,
        facebook_image_prompt: result.facebook?.imagePrompt || null,
        facebook_image_url: result.facebook?.imageUrl || null,
        instagram_text: result.instagram?.text || null,
        instagram_hashtags: result.instagram?.hashtags || null,
        instagram_image_prompt: result.instagram?.imagePrompt || null,
        instagram_image_url: result.instagram?.imageUrl || null,
      });

      if (error) throw error;

      toast.success('Příspěvek uložen do historie!');
      fetchHistory();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('social-content-generator', {
        body: {
          type: postType,
          platform,
          visualStyle,
          customTopic: customTopic || null,
        },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Chyba při generování');
      }

      const newResult: GeneratedResult = {};
      if (data.facebook) {
        newResult.facebook = {
          ...data.facebook,
          imageUrl: data.facebook.imageUrl || undefined,
        };
      }
      if (data.instagram) {
        newResult.instagram = {
          ...data.instagram,
          imageUrl: data.instagram.imageUrl || undefined,
        };
      }

      setResult(newResult);
      toast.success('Obsah vygenerovaný!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Chyba při generování');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async (platformKey: 'facebook' | 'instagram') => {
    if (!result?.[platformKey]?.imagePrompt) return;

    setGeneratingImageFor(platformKey);

    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-image', {
        body: {
          prompt: result[platformKey]!.imagePrompt,
          slug: `social-${platformKey}-${Date.now()}`,
        },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Chyba při generování obrázku');
      }

      setResult(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [platformKey]: {
            ...prev[platformKey]!,
            imageUrl: data.image_url,
          },
        };
      });

      toast.success('Obrázok vygenerovaný!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Chyba pri generovaní obrázku');
    } finally {
      setGeneratingImageFor(null);
    }
  };

  const updateContent = (
    platformKey: 'facebook' | 'instagram',
    field: 'text' | 'hashtags' | 'imagePrompt',
    value: string
  ) => {
    setResult(prev => {
      if (!prev?.[platformKey]) return prev;
      return {
        ...prev,
        [platformKey]: {
          ...prev[platformKey]!,
          [field]: value,
        },
      };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Social Media Generator | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin-dashboard-poda-2024')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Social Media Generator</h1>
              <p className="text-muted-foreground">Generuj obsah pre Facebook a Instagram</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Input Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Nastavenie príspevku
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <PostTypeSelector value={postType} onChange={setPostType} />
                  <PlatformSelector value={platform} onChange={setPlatform} />
                  <StyleSelector value={visualStyle} onChange={setVisualStyle} />

                  {/* Custom Topic */}
                  <div className="space-y-2">
                    <Label htmlFor="customTopic">Vlastná téma (voliteľné)</Label>
                    <Input
                      id="customTopic"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="Napr. WiFi optimalizace v paneláku, rychlý internet pro gamery..."
                      className="bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Zadaj špecifickú tému pre personalizovaný obsah
                    </p>
                  </div>

                  <Button
                    onClick={generateContent}
                    disabled={isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generujem...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generovať obsah
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Content */}
              {result && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button
                      onClick={savePost}
                      disabled={isSaving}
                      variant="outline"
                      className="gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Ukládám...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Uložit do historie
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.facebook && (
                      <GeneratedContent
                        platform="facebook"
                        content={result.facebook}
                        onTextChange={(v) => updateContent('facebook', 'text', v)}
                        onHashtagsChange={(v) => updateContent('facebook', 'hashtags', v)}
                        onImagePromptChange={(v) => updateContent('facebook', 'imagePrompt', v)}
                        onGenerateImage={() => generateImage('facebook')}
                        isGeneratingImage={generatingImageFor === 'facebook'}
                      />
                    )}
                    {result.instagram && (
                      <GeneratedContent
                        platform="instagram"
                        content={result.instagram}
                        onTextChange={(v) => updateContent('instagram', 'text', v)}
                        onHashtagsChange={(v) => updateContent('instagram', 'hashtags', v)}
                        onImagePromptChange={(v) => updateContent('instagram', 'imagePrompt', v)}
                        onGenerateImage={() => generateImage('instagram')}
                        isGeneratingImage={generatingImageFor === 'instagram'}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ContentCalendar onSelectType={setPostType} />
              <SocialPostHistory 
                posts={posts} 
                isLoading={isLoadingHistory} 
                onRefresh={fetchHistory} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
