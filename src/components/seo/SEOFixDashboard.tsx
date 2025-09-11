import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  CheckCircle, 
  Search, 
  ExternalLink, 
  Download,
  RefreshCw,
  Zap,
  FileText,
  Link,
  MapPin
} from 'lucide-react';
import { runSEOAudit, fixAllSEOIssues, generate301Redirects, type SEOAuditReport, type SEOIssue } from '../../utils/seoAuditFixer';
import { generateSitemap } from '../../utils/sitemapGenerator';

const SEOFixDashboard = () => {
  const [auditReport, setAuditReport] = useState<SEOAuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<SEOIssue | null>(null);
  const [fixResults, setFixResults] = useState<any>(null);

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const report = await runSEOAudit();
      setAuditReport(report);
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fixAllIssues = async () => {
    setIsFixing(true);
    try {
      const results = await fixAllSEOIssues();
      setFixResults(results);
      // Re-run audit after fixes
      await runAudit();
    } catch (error) {
      console.error('Fix failed:', error);
    } finally {
      setIsFixing(false);
    }
  };

  const exportSitemap = () => {
    const sitemap = generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const export301Redirects = () => {
    const redirects = generate301Redirects();
    const content = Object.entries(redirects)
      .map(([from, to]) => `Redirect 301 ${from} ${to}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '301-redirects.htaccess';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    runAudit();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadge = (severity: string): "destructive" | "default" | "secondary" | "outline" => {
    const colors: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'default', 
      low: 'secondary'
    };
    return colors[severity] || 'secondary';
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-poda-blue" />
          <span className="ml-2 text-lg">Spúšťam SEO audit...</span>
        </div>
      </div>
    );
  }

  if (!auditReport) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Zatiaľ nebol spustený žiadny SEO audit.
            </p>
            <Button onClick={runAudit} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Spustiť prvý audit
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Celkové problémy</p>
                <p className="text-2xl font-bold text-red-600">{auditReport.totalIssues}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kritické</p>
                <p className="text-2xl font-bold text-red-700">{auditReport.criticalIssues}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vysoká priorita</p>
                <p className="text-2xl font-bold text-orange-600">{auditReport.highPriorityIssues}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SEO skóre</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.max(0, 100 - auditReport.totalIssues * 2)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={runAudit} disabled={isLoading} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Audituje...' : 'Nový audit'}
        </Button>
        
        <Button onClick={fixAllIssues} disabled={isFixing} className="gap-2">
          <Zap className={`w-4 h-4 ${isFixing ? 'animate-pulse' : ''}`} />
          {isFixing ? 'Opravuje...' : 'Opraviť všetko'}
        </Button>

        <Button onClick={exportSitemap} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Sitemap
        </Button>

        <Button onClick={export301Redirects} variant="outline" className="gap-2">
          <Link className="w-4 h-4" />
          Export 301 Redirects
        </Button>
      </div>

      {/* Fix Results */}
      {fixResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Výsledky opráv
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{fixResults.fixed}</p>
                <p className="text-sm text-gray-600">Opravené</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{fixResults.failed}</p>
                <p className="text-sm text-gray-600">Zlyhalo</p>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {fixResults.results.map((result: any, index: number) => (
                <div key={index} className={`p-3 rounded-lg text-sm ${
                  result.status === 'fixed' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <div className="font-medium">{result.url}</div>
                  <div>{result.message}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Issues */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="titles">Titulky ({auditReport.summary.titles.problematic})</TabsTrigger>
          <TabsTrigger value="descriptions">Popisy ({auditReport.summary.descriptions.problematic})</TabsTrigger>
          <TabsTrigger value="redirects">Redirects ({auditReport.summary.redirects.needed})</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Súhrn problémov</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{auditReport.summary.titles.problematic}</p>
                  <p className="text-sm text-gray-600">Problémy s titulkami</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{auditReport.summary.descriptions.problematic}</p>
                  <p className="text-sm text-gray-600">Problémy s popismi</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Link className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{auditReport.summary.redirects.needed}</p>
                  <p className="text-sm text-gray-600">Potrebné redirecty</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{auditReport.summary.sitemap.validUrls}</p>
                  <p className="text-sm text-gray-600">Platné URL v sitemap</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Všetky problémy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {auditReport.issues.map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityBadge(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline">{issue.type}</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="font-medium text-sm">{issue.url}</p>
                    <p className="text-sm text-gray-600">{issue.issue}</p>
                    <p className="text-sm text-green-600 mt-1">{issue.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="titles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Problémy s titulkami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditReport.issues.filter(i => i.type === 'title').map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getSeverityBadge(issue.severity)}>
                        {issue.severity}
                      </Badge>
                      <span className="text-sm font-medium">{issue.url}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Aktuálne: </span>
                        <span className="text-gray-600">{issue.currentValue || 'Chýba'}</span>
                      </div>
                      <div>
                        <span className="font-medium">Navrhované: </span>
                        <span className="text-green-600">{issue.suggestedValue}</span>
                      </div>
                      <div>
                        <span className="font-medium">Problém: </span>
                        <span>{issue.issue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Problémy s meta popismi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditReport.issues.filter(i => i.type === 'description').map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getSeverityBadge(issue.severity)}>
                        {issue.severity}
                      </Badge>
                      <span className="text-sm font-medium">{issue.url}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Aktuálne ({issue.currentValue?.length || 0} znakov): </span>
                        <span className="text-gray-600">{issue.currentValue || 'Chýba'}</span>
                      </div>
                      <div>
                        <span className="font-medium">Navrhované ({issue.suggestedValue?.length || 0} znakov): </span>
                        <span className="text-green-600">{issue.suggestedValue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redirects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Potrebné 301 redirecty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditReport.issues.filter(i => i.type === 'redirect').map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Z:</span> {issue.currentValue}</div>
                      <div><span className="font-medium">Na:</span> {issue.suggestedValue}</div>
                      <div className="text-gray-600">{issue.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap analýza</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{auditReport.summary.sitemap.totalUrls}</p>
                  <p className="text-sm text-gray-600">Celkovo URL</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{auditReport.summary.sitemap.validUrls}</p>
                  <p className="text-sm text-gray-600">Platné URL</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{auditReport.summary.sitemap.invalidUrls}</p>
                  <p className="text-sm text-gray-600">Neplatné URL</p>
                </div>
              </div>
              
              {auditReport.issues.filter(i => i.type === 'sitemap').map((issue, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="text-sm space-y-1">
                    <div><span className="font-medium">Problém:</span> {issue.issue}</div>
                    <div><span className="font-medium">Riešenie:</span> {issue.recommendation}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOFixDashboard;