import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PostTypeSelector } from '@/components/social/PostTypeSelector';
import { PlatformSelector } from '@/components/social/PlatformSelector';
import { GeneratedContent } from '@/components/social/GeneratedContent';
import { ContentCalendar } from '@/components/social/ContentCalendar';
import { PostType, Platform, platformSpecs } from '@/data/social/templates';

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

export default function SocialGenerator() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingImageFor, setGeneratingImageFor] = useState<string | null>(null);

  // Form state
  const [postType, setPostType] = useState<PostType>('promo');
  const [platform, setPlatform] = useState<Platform>('both');
  const [customTopic, setCustomTopic] = useState('');

  // Generated content
  const [result, setResult] = useState<GeneratedResult | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

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

      setIsAdmin(true);
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/admin-login-poda-2024');
    } finally {
      setIsLoading(false);
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
          customTopic: customTopic || null,
        },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Chyba při generování');
      }

      const newResult: GeneratedResult = {};
      if (data.facebook) {
        newResult.facebook = data.facebook;
      }
      if (data.instagram) {
        newResult.instagram = data.instagram;
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
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ContentCalendar onSelectType={setPostType} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
