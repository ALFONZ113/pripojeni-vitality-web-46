import { useState } from 'react';
import { Facebook, Instagram, Copy, Check, Download, ImageIcon, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { platformSpecs, FB_AD_CTA_OPTIONS } from '@/data/social/templates';

interface PlatformContent {
  text: string;
  hashtags: string;
  imagePrompt: string;
  imageUrl?: string;
}

interface FbAdFields {
  headline: string;
  description: string;
  cta: string;
}

interface GeneratedContentProps {
  platform: 'facebook' | 'instagram';
  content: PlatformContent;
  onTextChange: (text: string) => void;
  onHashtagsChange: (hashtags: string) => void;
  onImagePromptChange: (prompt: string) => void;
  onGenerateImage: () => void;
  isGeneratingImage: boolean;
  onRegenerate?: (field: 'text' | 'hashtags' | 'imagePrompt') => void;
  isRegenerating?: string | null;
  showFbAdFields?: boolean;
  fbAdFields?: FbAdFields;
  onFbAdFieldChange?: (field: keyof FbAdFields, value: string) => void;
}

function CharCounter({ current, max, label }: { current: number; max: number; label?: string }) {
  const ratio = current / max;
  const color = ratio <= 0.8 ? 'text-green-500' : ratio <= 1 ? 'text-yellow-500' : 'text-red-500';
  return (
    <p className={`text-xs text-right ${color}`}>
      {label && <span className="text-muted-foreground mr-1">{label}</span>}
      {current} / {max} znaků
    </p>
  );
}

export function GeneratedContent({
  platform,
  content,
  onTextChange,
  onHashtagsChange,
  onImagePromptChange,
  onGenerateImage,
  isGeneratingImage,
  onRegenerate,
  isRegenerating,
  showFbAdFields,
  fbAdFields,
  onFbAdFieldChange,
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
      toast.error('Nepodarilo se skopírovať');
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
      toast.success('Obrázek stažen!');
    } catch {
      toast.error('Nepodařilo se stáhnout obrázek');
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
            <label className="text-sm font-medium text-foreground">📝 Text příspěvku</label>
            <div className="flex gap-1">
              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRegenerate('text')}
                  disabled={isRegenerating === 'text'}
                  className="h-8 px-2"
                >
                  {isRegenerating === 'text' ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(content.text, 'text')}
                className="h-8 px-2"
              >
                {copiedField === 'text' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          <Textarea
            value={content.text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[120px] resize-none bg-muted/50"
            placeholder="Vygenerovaný text..."
          />
          <CharCounter current={content.text.length} max={spec.maxTextLength} />
        </div>

        {/* FB Ad Fields */}
        {showFbAdFields && fbAdFields && onFbAdFieldChange && (
          <div className="space-y-3 p-3 rounded-lg border border-[#1877F2]/30 bg-[#1877F2]/5">
            <p className="text-xs font-medium text-[#1877F2]">📢 Facebook Ads pole</p>
            <div className="space-y-2">
              <div>
                <Label className="text-xs">Headline (max 40 znaků)</Label>
                <Input
                  value={fbAdFields.headline}
                  onChange={(e) => onFbAdFieldChange('headline', e.target.value)}
                  maxLength={40}
                  className="bg-muted/50 h-8 text-sm"
                  placeholder="Gigabit internet od 300 Kč"
                />
                <CharCounter current={fbAdFields.headline.length} max={40} />
              </div>
              <div>
                <Label className="text-xs">Popis odkazu (max 30 znaků)</Label>
                <Input
                  value={fbAdFields.description}
                  onChange={(e) => onFbAdFieldChange('description', e.target.value)}
                  maxLength={30}
                  className="bg-muted/50 h-8 text-sm"
                  placeholder="Aktivace zdarma"
                />
                <CharCounter current={fbAdFields.description.length} max={30} />
              </div>
              <div>
                <Label className="text-xs">CTA tlačítko</Label>
                <Select value={fbAdFields.cta} onValueChange={(v) => onFbAdFieldChange('cta', v)}>
                  <SelectTrigger className="h-8 text-sm bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FB_AD_CTA_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Hashtags */}
        {spec.hashtagLimit > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">#️⃣ Hashtagy</label>
              <div className="flex gap-1">
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRegenerate('hashtags')}
                    disabled={isRegenerating === 'hashtags'}
                    className="h-8 px-2"
                  >
                    {isRegenerating === 'hashtags' ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3 w-3" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(content.hashtags, 'hashtags')}
                  className="h-8 px-2"
                >
                  {copiedField === 'hashtags' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            <Textarea
              value={content.hashtags}
              onChange={(e) => onHashtagsChange(e.target.value)}
              className="min-h-[60px] resize-none bg-muted/50 text-sm"
              placeholder="#internet #ostrava..."
            />
          </div>
        )}

        {/* Image Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">🖼️ Prompt pro obrázek (EN)</label>
            <div className="flex gap-1">
              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRegenerate('imagePrompt')}
                  disabled={isRegenerating === 'imagePrompt'}
                  className="h-8 px-2"
                >
                  {isRegenerating === 'imagePrompt' ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(content.imagePrompt, 'prompt')}
                className="h-8 px-2"
              >
                {copiedField === 'prompt' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          <Textarea
            value={content.imagePrompt}
            onChange={(e) => onImagePromptChange(e.target.value)}
            className="min-h-[80px] resize-none bg-muted/50 text-sm font-mono"
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
                    Generuji obrázek...
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Vygenerovat obrázek ({spec.dimensions})
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                ⚡ Generování obrázku = +1 AI požadavek
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={content.imageUrl}
                  alt="Vygenerovaný obrázek"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadImage} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Stáhnout
                </Button>
                <Button variant="outline" onClick={onGenerateImage} disabled={isGeneratingImage} className="flex-1">
                  {isGeneratingImage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Nový obrázek
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
