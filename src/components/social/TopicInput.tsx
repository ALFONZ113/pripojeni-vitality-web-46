import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PostType } from '@/data/social/templates';

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
  postType: PostType;
}

export function TopicInput({ value, onChange, postType }: TopicInputProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);

  const suggestTopic = async () => {
    setIsSuggesting(true);
    try {
      const { data, error } = await supabase.functions.invoke('social-content-generator', {
        body: {
          action: 'suggest-topic',
          type: postType,
        },
      });

      if (error) throw error;
      if (data?.topic) {
        onChange(data.topic);
        toast.success('Téma navrženo!');
      }
    } catch (error) {
      console.error('Topic suggestion error:', error);
      toast.error('Nepodařilo se navrhnout téma');
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="customTopic">Téma příspěvku</Label>
      <div className="flex gap-2">
        <Input
          id="customTopic"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Napr. WiFi optimalizace v paneláku, rychlý internet pro gamery..."
          className="bg-muted/50 flex-1"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={suggestTopic}
          disabled={isSuggesting}
          className="whitespace-nowrap shrink-0"
        >
          {isSuggesting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-1" />
              AI návrh
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Zadej vlastní téma nebo nech AI navrhnout originální téma
      </p>
    </div>
  );
}
