import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
 import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Search, FileText, Image as ImageIcon, Save } from "lucide-react";

const AIBlogTest = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [researchData, setResearchData] = useState<any>(null);
  const [blogContent, setBlogContent] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleResearch = async () => {
    if (!topic.trim()) {
      toast.error('Chyba', {
        description: "Zadajte tému výskumu",
      });
      return;
    }

    setIsResearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-research', {
        body: { 
          topic: topic.trim(),
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean)
        }
      });

      if (error) throw error;

      setResearchData(data);
      toast.success('Úspech', {
        description: "Výskum dokončený",
      });
    } catch (error: any) {
      console.error('Research error:', error);
      toast.error('Chyba výskumu', {
        description: error.message || "Nepodarilo sa vykonať výskum",
      });
    } finally {
      setIsResearching(false);
    }
  };

  const handleGenerateBlog = async () => {
    if (!researchData) {
      toast.error('Chyba', {
        description: "Najprv vykonajte výskum",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-blog', {
        body: {
          title: topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
          research_data: researchData,
          category: 'Technologie',
          tone: 'professional'
        }
      });

      if (error) throw error;

      setBlogContent(data);
      toast.success('Úspech', {
        description: "Článok vygenerovaný",
      });
    } catch (error: any) {
      console.error('Generate error:', error);
      toast.error('Chyba generovania', {
        description: error.message || "Nepodarilo sa vygenerovať článok",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!topic.trim()) {
      toast.error('Chyba', {
        description: "Zadajte tému pre obrázok",
      });
      return;
    }

    setIsGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-image', {
        body: {
          prompt: `Professional blog header image about: ${topic}`,
          slug: topic.toLowerCase().replace(/\s+/g, '-')
        }
      });

      if (error) throw error;

      setImageUrl(data.imageUrl || data.url);
      toast.success('Úspech', {
        description: "Obrázok vygenerovaný",
      });
    } catch (error: any) {
      console.error('Image generation error:', error);
      toast.error('Chyba generovania obrázka', {
        description: error.message || "Nepodarilo sa vygenerovať obrázok",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!blogContent) {
      toast.error('Chyba', {
        description: "Najprv vygenerujte článok",
      });
      return;
    }

    setIsSaving(true);
    try {
      const slug = topic.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();

      const { error } = await supabase
        .from('ai_blog_posts' as any)
        .insert({
          title: topic,
          slug: slug,
          content: blogContent.content || blogContent.generatedText,
          excerpt: blogContent.excerpt || blogContent.content?.substring(0, 200),
          meta_description: blogContent.meta_description || blogContent.excerpt,
          category: 'Technologie',
          tags: keywords.split(',').map(k => k.trim()).filter(Boolean),
          target_keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
          status: 'draft',
          research_data: researchData,
          header_image_url: imageUrl || null,
          ai_model: 'google/gemini-2.5-flash',
          generation_time_ms: blogContent.generation_time_ms || null
        });

      if (error) throw error;

      toast.success('Úspech', {
        description: "Článok uložený do databázy",
      });

      // Reset form
      setTopic("");
      setKeywords("");
      setResearchData(null);
      setBlogContent(null);
      setImageUrl("");
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('Chyba uloženia', {
        description: error.message || "Nepodarilo sa uložiť článok",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
     <AdminLayout title="AI Blog Test" description="Testovanie edge functions pre AI generovanie článkov">
       <div className="max-w-6xl space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>1. Zadajte tému a keywords</CardTitle>
            <CardDescription>Začnite vyplnením základných informácií</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Téma článku</Label>
              <Input
                id="topic"
                placeholder="napr: Optický internet v Ostrave"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (oddelené čiarkou)</Label>
              <Input
                id="keywords"
                placeholder="napr: optika, internet, ostrava, PODA"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Research Section */}
        <Card>
          <CardHeader>
            <CardTitle>2. Výskum (Perplexity AI)</CardTitle>
            <CardDescription>Zhromažďte dáta pre článok</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleResearch} disabled={isResearching}>
              {isResearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Prebieha výskum...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Spustiť výskum
                </>
              )}
            </Button>
            {researchData && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Výsledky výskumu:</p>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(researchData, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generate Blog Section */}
        <Card>
          <CardHeader>
            <CardTitle>3. Generovanie článku (Gemini AI)</CardTitle>
            <CardDescription>Vytvorte kompletný článok</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGenerateBlog} disabled={isGenerating || !researchData}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generujem článok...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generovať článok
                </>
              )}
            </Button>
            {blogContent && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Vygenerovaný obsah:</p>
                  <Textarea
                    value={blogContent.content || blogContent.generatedText || ''}
                    readOnly
                    className="min-h-[200px] font-mono text-xs"
                  />
                </div>
                {blogContent.excerpt && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Excerpt:</p>
                    <p className="text-sm">{blogContent.excerpt}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generate Image Section */}
        <Card>
          <CardHeader>
            <CardTitle>4. Generovanie obrázka (Optional)</CardTitle>
            <CardDescription>Vytvorte header image pre článok</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGenerateImage} disabled={isGeneratingImage}>
              {isGeneratingImage ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generujem obrázok...
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Generovať obrázok
                </>
              )}
            </Button>
            {imageUrl && (
              <div className="space-y-2">
                <img src={imageUrl} alt="Generated" className="w-full rounded-lg max-h-64 object-cover" />
                <p className="text-xs text-muted-foreground break-all">{imageUrl}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Section */}
        <Card>
          <CardHeader>
            <CardTitle>5. Uložiť do databázy</CardTitle>
            <CardDescription>Uložte vygenerovaný článok ako draft</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSaveToDatabase} disabled={isSaving || !blogContent}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ukladám...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Uložiť článok
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
     </AdminLayout>
  );
};

export default AIBlogTest;
