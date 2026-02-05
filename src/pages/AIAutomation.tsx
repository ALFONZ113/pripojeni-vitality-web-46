import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Sparkles, TrendingUp, FileText, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
 import { AdminLayout } from '@/components/admin/AdminLayout';

const AIAutomation = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [generatedPost, setGeneratedPost] = useState<any>(null);

  const analyzTopics = async () => {
    setIsAnalyzing(true);
    setSuggestions([]);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-analyze-topics', {
        body: {}
      });

      if (error) throw error;

      if (data.success) {
        setSuggestions(data.suggestions || []);
        setAnalysis(data.analysis);
        toast.success('Analýza dokončena', {
          description: `Nalezeno ${data.suggestions?.length || 0} návrhů na články`,
        });
      }
    } catch (error: any) {
      console.error('Error analyzing topics:', error);
      toast.error('Chyba při analýze', {
        description: error.message,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAutoBlog = async () => {
    setIsGenerating(true);
    setGeneratedPost(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-auto-blog', {
        body: {}
      });

      if (error) throw error;

      if (data.success && data.post_created) {
        setGeneratedPost(data);
        toast.success('Článek vygenerován!', {
          description: `Vytvořen článek: ${data.topic}`,
        });
      } else {
        toast.info('Žádné nové téma', {
          description: "Nejsou k dispozici žádné nové návrhy na články",
        });
      }
    } catch (error: any) {
      console.error('Error generating auto blog:', error);
      toast.error('Chyba při generování', {
        description: error.message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
     <AdminLayout title="AI Automatizace Blogu" description="Automatické generování článků na základě GSC dat">
       <div className="max-w-6xl space-y-6">
        {/* Control Panel */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ovládací Panel</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={analyzTopics}
              disabled={isAnalyzing}
              size="lg"
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Analyzuji GSC data...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-6 h-6" />
                  <span>Analyzovat Témata</span>
                  <span className="text-xs text-muted-foreground">
                    Najde nejlepší témata z GSC
                  </span>
                </>
              )}
            </Button>

            <Button
              onClick={generateAutoBlog}
              disabled={isGenerating}
              size="lg"
              className="h-auto py-4 flex-col gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Generuji článek...</span>
                </>
              ) : (
                <>
                  <FileText className="w-6 h-6" />
                  <span>Vygenerovat Článek</span>
                  <span className="text-xs opacity-80">
                    Automaticky vytvoří celý článek
                  </span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Výsledky Analýzy</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {analysis.total_keywords_analyzed}
                </div>
                <div className="text-sm text-muted-foreground">Analyzovaných klíčových slov</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {analysis.existing_posts_count}
                </div>
                <div className="text-sm text-muted-foreground">Existujících článků</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {analysis.new_suggestions_count}
                </div>
                <div className="text-sm text-muted-foreground">Nových návrhů</div>
              </div>
            </div>
          </Card>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Návrhy na Články</h2>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Alert key={index} className="border-l-4 border-l-primary">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          Priorita {suggestion.priority}
                        </span>
                        <span className="px-2 py-1 bg-muted text-xs rounded">
                          {suggestion.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{suggestion.topic}</h3>
                      <AlertDescription className="mb-2">
                        {suggestion.reasoning}
                      </AlertDescription>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.keywords.map((keyword: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </Card>
        )}

        {/* Generated Post */}
        {generatedPost && (
          <Card className="p-6 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              ✅ Článek Úspěšně Vygenerován
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Název:</span> {generatedPost.topic}
              </div>
              <div>
                <span className="font-semibold">Kategorie:</span> {generatedPost.category}
              </div>
              <div>
                <span className="font-semibold">URL:</span>{' '}
                <a
                  href={generatedPost.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {generatedPost.post_url}
                </a>
              </div>
              <div>
                <span className="font-semibold">Zbývající návrhy:</span>{' '}
                {generatedPost.remaining_suggestions}
              </div>
            </div>
          </Card>
        )}

        {/* Info Box */}
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            <strong>Automatizace:</strong> Systém může běžet automaticky pomocí cron jobu.
            Každý den v 3:00 UTC se automaticky vygeneruje nový článek na základě GSC dat.
          </AlertDescription>
        </Alert>
      </div>
     </AdminLayout>
  );
};

export default AIAutomation;
