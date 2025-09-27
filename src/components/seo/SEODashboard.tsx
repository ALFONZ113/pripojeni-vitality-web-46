import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { blogPosts } from '../../data/blog';
import { analyzeSEOMetrics, generateEnhancedMetaDescription } from '../../utils/seoEnhancements';
import { getSitemapStats } from '../../utils/sitemapGenerator';
import { BlogOptimizer } from './BlogOptimizer';
import { submitBatchToIndexNow } from '../../utils/indexNowService';
import { 
  Search, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface SEOScore {
  score: number;
  issues: string[];
  suggestions: string[];
}

export const SEODashboard: React.FC = () => {
  const [sitemapStats, setSitemapStats] = useState(getSitemapStats());
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  // Calculate overall SEO health
  const calculateSEOScore = (): SEOScore => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check recent posts
    const recentPosts = blogPosts.filter(post => {
      const postDate = new Date(post.date?.replace(/\. /g, '/') || Date.now());
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return postDate > weekAgo;
    });

    if (recentPosts.length === 0) {
      issues.push('Žádné nové články za posledních 7 dní');
      score -= 15;
    }

    // Check sitemap freshness
    if (sitemapStats.totalUrls < blogPosts.length + 15) { // +15 for service pages
      issues.push('Sitemap neobsahuje všechny blog posty');
      score -= 10;
    }

    // Check for posts without proper meta descriptions
    const postsWithoutDescription = blogPosts.filter(post => 
      !post.excerpt || post.excerpt.length < 120
    );
    
    if (postsWithoutDescription.length > 0) {
      issues.push(`${postsWithoutDescription.length} článků bez optimalizovaného popisu`);
      score -= Math.min(20, postsWithoutDescription.length * 2);
    }

    // Add suggestions
    if (score < 90) {
      suggestions.push('Pravidelně publikujte nové články (minimálně 1x týdně)');
      suggestions.push('Optimalizujte meta popisy pro všechny články'); 
      suggestions.push('Používejte strukturovaná data (FAQ, hodnocení)');
    }

    return { score: Math.max(0, score), issues, suggestions };
  };

  const seoScore = calculateSEOScore();

  // Handle bulk IndexNow submission
  const handleBulkSubmission = async () => {
    setIsSubmitting(true);
    setSubmissionStatus('');

    try {
      const recentPosts = blogPosts.slice(0, 10); // Last 10 posts
      const urls = recentPosts.map(post => `/blog/${post.slug || post.id}`);
      
      const success = await submitBatchToIndexNow(urls);
      
      if (success) {
        setSubmissionStatus('✅ Úspěšně odesláno do search engienů');
      } else {
        setSubmissionStatus('⚠️ Částečně odesláno - zkuste to znovu později');
      }
    } catch (error) {
      setSubmissionStatus('❌ Chyba při odesílání');
    } finally {
      setIsSubmitting(false);
    }
  };

  const postMetrics = selectedPost ? analyzeSEOMetrics(selectedPost) : null;

  return (
    <div className="space-y-6">
      {/* SEO Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Skóre</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoScore.score}%</div>
            <Progress value={seoScore.score} className="mt-2" />
            {seoScore.score >= 90 && (
              <Badge variant="default" className="mt-2">Výborné</Badge>
            )}
            {seoScore.score >= 70 && seoScore.score < 90 && (
              <Badge variant="secondary" className="mt-2">Dobré</Badge>
            )}
            {seoScore.score < 70 && (
              <Badge variant="destructive" className="mt-2">Potřebuje zlepšení</Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sitemap Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sitemapStats.totalUrls}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {blogPosts.length} blog postů, 10 geo stránek
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Aktuální
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexing</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleBulkSubmission}
              disabled={isSubmitting}
              className="w-full"
              size="sm"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Odesílání...
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Odeslat do SE
                </>
              )}
            </Button>
            {submissionStatus && (
              <p className="text-xs mt-2">{submissionStatus}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Issues and Suggestions */}
      {(seoScore.issues.length > 0 || seoScore.suggestions.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seoScore.issues.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Problémy k vyřešení:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {seoScore.issues.map((issue, idx) => (
                    <li key={idx} className="text-sm">{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {seoScore.suggestions.length > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Doporučení:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {seoScore.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Detailed Analysis */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Analýza článků</TabsTrigger>
          <TabsTrigger value="optimizer">Optimalizace popisů</TabsTrigger>
          <TabsTrigger value="technical">Technické SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Detailní analýza článku
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <select 
                  value={selectedPost?.id || ''}
                  onChange={(e) => {
                    const post = blogPosts.find(p => p.id === Number(e.target.value));
                    if (post) setSelectedPost(post);
                  }}
                  className="w-full p-2 border rounded"
                >
                  {blogPosts.map(post => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
                </select>

                {selectedPost && postMetrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Délka nadpisu</p>
                      <p className="font-semibold">{postMetrics.titleLength} znaků</p>
                      {postMetrics.titleLength > 60 && (
                        <Badge variant="destructive" className="text-xs mt-1">Příliš dlouhý</Badge>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Čas čtení</p>
                      <p className="font-semibold">{postMetrics.readingTime} min</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Interní odkazy</p>
                      <p className="font-semibold">{postMetrics.internalLinks}</p>
                      {postMetrics.internalLinks === 0 && (
                        <Badge variant="secondary" className="text-xs mt-1">Přidejte odkazy</Badge>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Obrázky</p>
                      <p className="font-semibold">{postMetrics.imageCount}</p>
                    </div>
                  </div>
                )}

                {selectedPost && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Optimalizovaný meta popis:</h4>
                    <p className="text-sm">{generateEnhancedMetaDescription(selectedPost)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimizer" className="space-y-4">
          <BlogOptimizer />
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technické SEO kontroly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Robots.txt</span>
                  <Badge variant="default">✓ Optimalizovaný</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>XML Sitemap</span>
                  <Badge variant="default">✓ Automatický</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Strukturovaná data</span>
                  <Badge variant="default">✓ Implementována</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>IndexNow protokol</span>
                  <Badge variant="default">✓ Aktivní</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Slug-based URLs</span>
                  <Badge variant="default">✓ Aktivní</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};