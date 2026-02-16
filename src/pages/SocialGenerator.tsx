import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, Sparkles, Save, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { PostTypeSelector } from '@/components/social/PostTypeSelector';
import { PlatformSelector } from '@/components/social/PlatformSelector';
import { StyleSelector, VisualStyle } from '@/components/social/StyleSelector';
import { PersonToggle, IncludePerson } from '@/components/social/PersonToggle';
import { PersonUploader, PersonRenderStyle } from '@/components/social/PersonUploader';
import { GeneratedContent } from '@/components/social/GeneratedContent';
import { SocialPostHistory } from '@/components/social/SocialPostHistory';
import { StepProgress } from '@/components/social/StepProgress';
import { CTAToggle } from '@/components/social/CTAToggle';
import { TopicInput } from '@/components/social/TopicInput';
import { PostType, Platform, WizardStep, WIZARD_STEPS } from '@/data/social/templates';

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

interface FbAdFields {
  headline: string;
  description: string;
  cta: string;
}

interface SocialPost {
  id: string;
  post_type: string;
  platform: string;
  visual_style: string | null;
  include_person: string | null;
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
  person_render_style: string | null;
  custom_person_image_url: string | null;
  with_cta?: boolean;
  ad_headline?: string | null;
  ad_description?: string | null;
  ad_cta?: string | null;
}

export default function SocialGenerator() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatingImageFor, setGeneratingImageFor] = useState<string | null>(null);
  const [regeneratingField, setRegeneratingField] = useState<string | null>(null);

  // Wizard state
  const [currentStep, setCurrentStep] = useState<WizardStep>('type');
  const [completedSteps, setCompletedSteps] = useState<WizardStep[]>([]);

  // Form state
  const [postType, setPostType] = useState<PostType>('promo');
  const [platform, setPlatform] = useState<Platform>('both');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('luxury-gold');
  const [includePerson, setIncludePerson] = useState<IncludePerson>('with-person');
  const [customPersonImage, setCustomPersonImage] = useState<string | null>(null);
  const [personRenderStyle, setPersonRenderStyle] = useState<PersonRenderStyle>('realistic');
  const [customTopic, setCustomTopic] = useState('');
  const [withCTA, setWithCTA] = useState(true);
  const [fbAdFields, setFbAdFields] = useState<FbAdFields>({
    headline: '',
    description: '',
    cta: 'Více informací',
  });

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
      setPosts((data || []) as SocialPost[]);
    } catch (error) {
      console.error('Fetch history error:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (userId) fetchHistory();
  }, [userId, fetchHistory]);

  // Wizard navigation
  const completeStep = (step: WizardStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const goToNextStep = () => {
    completeStep(currentStep);
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);
    if (currentIndex < WIZARD_STEPS.length - 1) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = WIZARD_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1]);
    }
  };

  const handleStepClick = (step: WizardStep) => {
    setCurrentStep(step);
  };

  const handleUseAsTemplate = (post: SocialPost) => {
    setPostType(post.post_type as PostType);
    setPlatform(post.platform as Platform);
    if (post.visual_style) setVisualStyle(post.visual_style as VisualStyle);
    if (post.include_person) setIncludePerson(post.include_person as IncludePerson);
    if (post.custom_topic) setCustomTopic(post.custom_topic);
    setCurrentStep('type');
    setCompletedSteps([]);
    toast.success('Šablona načtena! Upravte a vygenerujte nový příspěvek.');
  };

  const savePost = async () => {
    if (!result || !userId) return;
    setIsSaving(true);
    try {
      const insertData = {
        user_id: userId,
        post_type: postType,
        platform,
        visual_style: visualStyle,
        include_person: includePerson,
        custom_topic: customTopic || null,
        facebook_text: result.facebook?.text || null,
        facebook_hashtags: result.facebook?.hashtags || null,
        facebook_image_prompt: result.facebook?.imagePrompt || null,
        facebook_image_url: result.facebook?.imageUrl || null,
        instagram_text: result.instagram?.text || null,
        instagram_hashtags: result.instagram?.hashtags || null,
        instagram_image_prompt: result.instagram?.imagePrompt || null,
        instagram_image_url: result.instagram?.imageUrl || null,
        person_render_style: includePerson === 'custom-person' ? personRenderStyle : null,
        custom_person_image_url: includePerson === 'custom-person' ? customPersonImage : null,
        with_cta: withCTA,
        ad_headline: postType === 'fb-ad' ? (fbAdFields.headline || null) : null,
        ad_description: postType === 'fb-ad' ? (fbAdFields.description || null) : null,
        ad_cta: postType === 'fb-ad' ? (fbAdFields.cta || null) : null,
      };

      const { error } = await supabase.from('social_posts').insert([insertData]);
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
          platform: platform === 'fb-ad' ? 'facebook' : platform,
          visualStyle,
          includePerson,
          customTopic: customTopic || null,
          customPersonImage: includePerson === 'custom-person' ? customPersonImage : null,
          personRenderStyle: includePerson === 'custom-person' ? personRenderStyle : null,
          withCTA,
        },
      });
      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Chyba při generování');

      const newResult: GeneratedResult = {};
      if (data.facebook) {
        newResult.facebook = { ...data.facebook, imageUrl: data.facebook.imageUrl || undefined };
      }
      if (data.instagram) {
        newResult.instagram = { ...data.instagram, imageUrl: data.instagram.imageUrl || undefined };
      }
      setResult(newResult);
      completeStep('content');
      toast.success('Obsah vygenerován!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Chyba při generování');
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateField = async (platformKey: 'facebook' | 'instagram', field: 'text' | 'hashtags' | 'imagePrompt') => {
    if (!result?.[platformKey]) return;
    setRegeneratingField(field);
    try {
      const { data, error } = await supabase.functions.invoke('social-content-generator', {
        body: {
          type: postType,
          platform: platformKey,
          visualStyle,
          includePerson,
          customTopic: customTopic || null,
          withCTA,
          regenerateOnly: field,
        },
      });
      if (error) throw error;
      if (data?.[platformKey]) {
        setResult(prev => {
          if (!prev) return prev;
          const updated = { ...prev[platformKey]! };
          if (field === 'text') updated.text = data[platformKey].text;
          if (field === 'hashtags') updated.hashtags = data[platformKey].hashtags;
          if (field === 'imagePrompt') updated.imagePrompt = data[platformKey].imagePrompt;
          return { ...prev, [platformKey]: updated };
        });
        toast.success('Část regenerována!');
      }
    } catch (error) {
      console.error('Regenerate error:', error);
      toast.error('Nepodařilo se regenerovat');
    } finally {
      setRegeneratingField(null);
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
          referenceImage: includePerson === 'custom-person' ? customPersonImage : null,
          renderStyle: includePerson === 'custom-person' ? personRenderStyle : null,
        },
      });
      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Chyba při generování obrázku');
      setResult(prev => {
        if (!prev) return prev;
        return { ...prev, [platformKey]: { ...prev[platformKey]!, imageUrl: data.image_url } };
      });
      toast.success('Obrázek vygenerován!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Chyba při generování obrázku');
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
      return { ...prev, [platformKey]: { ...prev[platformKey]!, [field]: value } };
    });
  };

  const currentStepIndex = WIZARD_STEPS.indexOf(currentStep);
  const isLastStepBeforeGenerate = currentStep === 'topic';
  const isFbAdType = postType === 'fb-ad';

  return (
    <>
      <Helmet>
        <title>Social Media Generator | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout title="Social Media Generator" description="Generuj obsah pro Facebook a Instagram">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="generator" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generátor
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              Historie
              {posts.length > 0 && (
                <span className="ml-1 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {posts.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            {/* Step Progress */}
            <StepProgress
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />

            {/* Wizard Steps */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Nastavení příspěvku
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Post Type */}
                {currentStep === 'type' && (
                  <PostTypeSelector value={postType} onChange={setPostType} />
                )}

                {/* Step 2: Platform */}
                {currentStep === 'platform' && (
                  <PlatformSelector
                    value={platform}
                    onChange={setPlatform}
                    showFbAd={isFbAdType}
                  />
                )}

                {/* Step 3: Style */}
                {currentStep === 'style' && (
                  <div className="space-y-4">
                    <StyleSelector value={visualStyle} onChange={setVisualStyle} />
                    <CTAToggle value={withCTA} onChange={setWithCTA} />
                  </div>
                )}

                {/* Step 4: Person */}
                {currentStep === 'person' && (
                  <div className="space-y-4">
                    <PersonToggle value={includePerson} onChange={setIncludePerson} />
                    {includePerson === 'custom-person' && (
                      <PersonUploader
                        image={customPersonImage}
                        onImageChange={setCustomPersonImage}
                        renderStyle={personRenderStyle}
                        onRenderStyleChange={setPersonRenderStyle}
                      />
                    )}
                  </div>
                )}

                {/* Step 5: Topic */}
                {currentStep === 'topic' && (
                  <div className="space-y-4">
                    <TopicInput
                      value={customTopic}
                      onChange={setCustomTopic}
                      postType={postType}
                    />
                    {isFbAdType && (
                      <div className="space-y-3 p-4 rounded-lg border border-[#1877F2]/30 bg-[#1877F2]/5">
                        <p className="text-sm font-medium text-[#1877F2]">📢 Facebook Ads pole</p>
                        <div className="grid gap-3">
                          <div>
                            <label className="text-xs font-medium">Headline (max 40 znaků)</label>
                            <input
                              value={fbAdFields.headline}
                              onChange={(e) => setFbAdFields(p => ({ ...p, headline: e.target.value }))}
                              maxLength={40}
                              className="mt-1 w-full h-8 px-2 text-sm rounded border border-input bg-muted/50"
                              placeholder="Gigabit internet od 300 Kč"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium">Popis odkazu (max 30 znaků)</label>
                            <input
                              value={fbAdFields.description}
                              onChange={(e) => setFbAdFields(p => ({ ...p, description: e.target.value }))}
                              maxLength={30}
                              className="mt-1 w-full h-8 px-2 text-sm rounded border border-input bg-muted/50"
                              placeholder="Aktivace zdarma"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Content (Generated) */}
                {currentStep === 'content' && (
                  <div className="space-y-4">
                    {!result ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Klikněte na tlačítko pro generování obsahu</p>
                        <Button onClick={generateContent} disabled={isGenerating} size="lg">
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Generuji...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-5 w-5 mr-2" />
                              Generovat obsah
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          <Button onClick={generateContent} disabled={isGenerating} variant="outline" size="sm">
                            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1" />}
                            Regenerovat vše
                          </Button>
                          <Button onClick={savePost} disabled={isSaving} variant="outline" size="sm">
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                            Uložit
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
                              onRegenerate={(field) => regenerateField('facebook', field)}
                              isRegenerating={regeneratingField}
                              showFbAdFields={isFbAdType}
                              fbAdFields={fbAdFields}
                              onFbAdFieldChange={(field, value) => setFbAdFields(p => ({ ...p, [field]: value }))}
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
                              onRegenerate={(field) => regenerateField('instagram', field)}
                              isRegenerating={regeneratingField}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={goToPrevStep}
                    disabled={currentStepIndex === 0}
                    className="gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Zpět
                  </Button>

                  {isLastStepBeforeGenerate ? (
                    <Button onClick={() => { goToNextStep(); }} className="gap-1">
                      <Sparkles className="h-4 w-4" />
                      Pokračovat ke generování
                    </Button>
                  ) : currentStep !== 'content' ? (
                    <Button onClick={goToNextStep} className="gap-1">
                      Další
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <SocialPostHistory
              posts={posts}
              isLoading={isLoadingHistory}
              onRefresh={fetchHistory}
              onUseAsTemplate={handleUseAsTemplate}
            />
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </>
  );
}
