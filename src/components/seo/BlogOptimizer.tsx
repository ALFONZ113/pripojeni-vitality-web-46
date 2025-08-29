import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, Download, RefreshCw } from 'lucide-react';
import { 
  analyzeBlogPostDescriptions, 
  generateBlogFileUpdates, 
  getOptimizationStatus 
} from '../../utils/blogSeoOptimizer';
import { QuickFixGuide } from './QuickFixGuide';

export const BlogOptimizer: React.FC = () => {
  const [status, setStatus] = useState(getOptimizationStatus());
  const [updates, setUpdates] = useState<any[]>([]);
  const [showUpdates, setShowUpdates] = useState(false);

  const handleAnalyze = () => {
    const newStatus = getOptimizationStatus();
    const newUpdates = generateBlogFileUpdates();
    setStatus(newStatus);
    setUpdates(newUpdates);
    setShowUpdates(true);
  };

  const handleDownloadUpdates = () => {
    const data = {
      status,
      updates,
      instructions: [
        "1. Zkopírujte nové excerpty pro každý článek",
        "2. Najděte příslušný soubor v src/data/blog/",
        "3. Nahraďte stávající excerpt novým textem",
        "4. Uložte soubor a otestujte SEO dashboard",
        "5. Všechny popisy budou mít optimální délku 120-160 znaků"
      ]
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-seo-optimization.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Blog SEO Optimalizátor
          </CardTitle>
          <CardDescription>
            Automatická analýza a optimalizace meta popisů pro blog posty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {status.optimizedPosts}
              </div>
              <div className="text-sm text-muted-foreground">
                Optimalizované články
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {status.problematicPosts}
              </div>
              <div className="text-sm text-muted-foreground">
                Články k optimalizaci
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {status.totalPosts}
              </div>
              <div className="text-sm text-muted-foreground">
                Celkem článků
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAnalyze} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Analyzovat blog posty
            </Button>
            {showUpdates && updates.length > 0 && (
              <Button 
                onClick={handleDownloadUpdates} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Stáhnout optimalizace
              </Button>
            )}
          </div>

          {showUpdates && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Nalezené problémy:</h3>
              <div className="space-y-2">
                {status.issues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-2 bg-background rounded border">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{issue.title}</div>
                      <div className="text-xs text-muted-foreground">
                        ID: {issue.id} | Délka: {issue.currentLength} znaků
                      </div>
                    </div>
                    <Badge variant={
                      issue.issue === 'missing' ? 'destructive' : 
                      issue.issue === 'too-short' ? 'secondary' : 'outline'
                    }>
                      {issue.issue === 'missing' ? 'Chybí popis' :
                       issue.issue === 'too-short' ? 'Krátký popis' : 'Dlouhý popis'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showUpdates && updates.length > 0 && (
            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Optimalizované popisy připravené:
              </h3>
              <div className="space-y-3">
                {updates.slice(0, 3).map((update) => (
                  <div key={update.postId} className="p-3 bg-background rounded border">
                    <div className="font-medium text-sm mb-1">{update.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Soubor: {update.filename} | Nová délka: {update.newExcerpt.length} znaků
                    </div>
                    <div className="text-sm bg-gray-50 p-2 rounded font-mono">
                      {update.newExcerpt}
                    </div>
                  </div>
                ))}
                {updates.length > 3 && (
                  <div className="text-center text-sm text-muted-foreground">
                    ... a {updates.length - 3} dalších článků
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Fix Guide */}
      <QuickFixGuide />
    </div>
  );
};