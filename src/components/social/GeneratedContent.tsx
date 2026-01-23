import { useState } from 'react';
import { Facebook, Instagram, Copy, Check, Download, ImageIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { platformSpecs } from '@/data/social/templates';

interface PlatformContent {
  text: string;
  hashtags: string;
  imagePrompt: string;
  imageUrl?: string;
}

interface GeneratedContentProps {
  platform: 'facebook' | 'instagram';
  content: PlatformContent;
  onTextChange: (text: string) => void;
  onHashtagsChange: (hashtags: string) => void;
  onImagePromptChange: (prompt: string) => void;
  onGenerateImage: () => void;
  isGeneratingImage: boolean;
}

export function GeneratedContent({
  platform,
  content,
  onTextChange,
  onHashtagsChange,
  onImagePromptChange,
  onGenerateImage,
  isGeneratingImage,
}: GeneratedContentProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const spec = platformSpecs[platform];
  const Icon = platform === 'facebook' ? Facebook : Instagram;
  const accentColor = platform === 'facebook' ? '#1877F2' : '#E4405F';

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Skopírované do schránky!');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Nepodarilo sa skopírovať');
    }
  };

  const downloadImage = async () => {
    if (!content.imageUrl) return;
    
    try {
      const response = await fetch(content.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `popri-${platform}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Obrázok stiahnutý!');
    } catch {
      toast.error('Nepodarilo sa stiahnuť obrázok');
    }
  };

  return (
    <Card className="border-2" style={{ borderColor: `${accentColor}30` }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
          {spec.name}
          <Badge variant="outline" className="ml-auto text-xs">
            {spec.dimensions}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Post Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">📝 Text príspevku</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.text, 'text')}
              className="h-8 px-2"
            >
              {copiedField === 'text' ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-1 text-xs">Kopírovať</span>
            </Button>
          </div>
          <Textarea
            value={content.text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[150px] resize-none bg-muted/50"
            placeholder="Vygenerovaný text..."
          />
          <p className="text-xs text-muted-foreground text-right">
            {content.text.length} / {spec.maxTextLength} znakov
          </p>
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">#️⃣ Hashtagy</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.hashtags, 'hashtags')}
              className="h-8 px-2"
            >
              {copiedField === 'hashtags' ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-1 text-xs">Kopírovať</span>
            </Button>
          </div>
          <Textarea
            value={content.hashtags}
            onChange={(e) => onHashtagsChange(e.target.value)}
            className="min-h-[60px] resize-none bg-muted/50 text-sm"
            placeholder="#internet #ostrava..."
          />
        </div>

        {/* Image Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">🖼️ Prompt pre obrázok (EN)</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(content.imagePrompt, 'prompt')}
              className="h-8 px-2"
            >
              {copiedField === 'prompt' ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-1 text-xs">Kopírovať</span>
            </Button>
          </div>
          <Textarea
            value={content.imagePrompt}
            onChange={(e) => onImagePromptChange(e.target.value)}
            className="min-h-[100px] resize-none bg-muted/50 text-sm font-mono"
            placeholder="Image generation prompt..."
          />
        </div>

        {/* Image Generation */}
        <div className="space-y-3 pt-2 border-t border-border">
          {!content.imageUrl ? (
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={onGenerateImage}
                disabled={isGeneratingImage || !content.imagePrompt}
                className="w-full"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generujem obrázok...
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Vygenerovať obrázok ({spec.dimensions})
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                ⚡ Generovanie obrázka = +1 AI požiadavka
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={content.imageUrl}
                  alt="Vygenerovaný obrázok"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={downloadImage}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Stiahnuť
                </Button>
                <Button
                  variant="outline"
                  onClick={onGenerateImage}
                  disabled={isGeneratingImage}
                  className="flex-1"
                >
                  {isGeneratingImage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Nový obrázok
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
