import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { generateOptimizedDescription } from '../../utils/blogSeoOptimizer';

export const QuickFixGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Find posts that need optimization
  const problematicPosts = blogPosts.filter(post => 
    !post.excerpt || post.excerpt.length < 120
  );

  const handleCopyExcerpt = async (postId: number, excerpt: string) => {
    try {
      await navigator.clipboard.writeText(excerpt);
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFilename = (id: number): string => {
    if (id === 101) return 'panelak-otazky.ts';
    if (id >= 150) return 'technologie.ts';
    if (id >= 6 && id <= 10) return 'tipy.ts';
    if (id >= 11 && id <= 15) return 'sluzby.ts';
    if (id === 100) return 'karvina.ts';
    if (id >= 16 && id <= 20) return 'noviny.ts';
    if (id >= 21 && id <= 25) return 'recenzie.ts';
    if (id === 1 || id === 2) return 'ostrava.ts';
    if (id >= 102 && id <= 110) return 'polanka-60ghz.ts';
    return 'unknown.ts';
  };

  if (problematicPosts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Všechny články jsou optimalizované!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Všechny blog posty mají optimalizované meta popisy s délkou 120-160 znaků.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Rychlé opravy pro {problematicPosts.length} článků
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Postup opravy:</h3>
            <ol className="text-sm space-y-1">
              <li>1. Klikněte na "Kopírovat" u optimalizovaného popisu</li>
              <li>2. Otevřete příslušný soubor v <code>src/data/blog/</code></li>
              <li>3. Najděte článek podle ID a názvu</li>
              <li>4. Nahraďte řádek <code>excerpt: "..."</code> novým textem</li>
              <li>5. Uložte soubor</li>
            </ol>
          </div>

          <div className="space-y-4">
            {problematicPosts.map((post) => {
              const optimizedExcerpt = generateOptimizedDescription(post);
              const filename = getFilename(post.id);
              
              return (
                <div key={post.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">ID: {post.id}</Badge>
                        <Badge variant="secondary">{filename}</Badge>
                      </div>
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Současný popis: {post.excerpt ? `"${post.excerpt}" (${post.excerpt.length} znaků)` : 'CHYBÍ'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">
                        Optimalizovaný popis ({optimizedExcerpt.length} znaků):
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyExcerpt(post.id, optimizedExcerpt)}
                        className="h-6 px-2"
                      >
                        {copiedId === post.id ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm font-mono bg-white p-2 rounded border">
                      {optimizedExcerpt}
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
                    <strong>Kód pro zkopírování:</strong><br />
                    <code>excerpt: "{optimizedExcerpt}",</code>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};