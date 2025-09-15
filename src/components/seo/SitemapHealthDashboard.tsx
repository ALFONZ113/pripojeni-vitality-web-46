import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Download, 
  RefreshCw,
  Image as ImageIcon,
  Globe,
  FileText,
  ExternalLink
} from 'lucide-react';
import { auditSitemap, generateSitemapOptimizationReport } from '../../utils/sitemapAuditor';
import { generateSitemap } from '../../utils/sitemapGenerator';

const SitemapHealthDashboard: React.FC = () => {
  const [auditReport, setAuditReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAuditTime, setLastAuditTime] = useState<string | null>(null);

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const report = await auditSitemap();
      setAuditReport(report);
      setLastAuditTime(new Date().toLocaleString('sk-SK'));
    } catch (error) {
      console.error('Sitemap audit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportOptimizationReport = async () => {
    try {
      const report = await generateSitemapOptimizationReport();
      const blob = new Blob([report], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap-audit-report.md';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  const exportCurrentSitemap = () => {
    try {
      const sitemap = generateSitemap();
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export sitemap:', error);
    }
  };

  const openGSC = () => {
    window.open('https://search.google.com/search-console/sitemaps?resource_id=https://www.popri.cz/', '_blank');
  };

  useEffect(() => {
    runAudit();
  }, []);

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'error': 
        return <Badge variant="destructive">Chyba</Badge>;
      case 'warning': 
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Varovanie</Badge>;
      case 'info': 
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Info</Badge>;
      default: 
        return <Badge variant="outline">OK</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Analyzujem sitemap...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sitemap Health Dashboard</h2>
          <p className="text-muted-foreground">
            Kompletný audit a optimalizácia sitemap pre Google Search Console
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAudit} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Znovu auditovať
          </Button>
          <Button onClick={openGSC} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Google Search Console
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      {auditReport && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {auditReport.isValid ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auditReport.isValid ? 'Validný' : 'Nevalidný'}
              </div>
              <p className="text-xs text-muted-foreground">
                {auditReport.summary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                URLs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditReport.totalUrls}</div>
              <p className="text-xs text-muted-foreground">
                Celkový počet URLs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Problémy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditReport.issuesCount}</div>
              <p className="text-xs text-muted-foreground">
                Chyby a varovania
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auditReport.issues.filter((issue: any) => 
                  issue.message.includes('image') && issue.type === 'info'
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                URLs s image tagmi
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">Problémy</TabsTrigger>
          <TabsTrigger value="recommendations">Odporúčania</TabsTrigger>
          <TabsTrigger value="actions">Akcie</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          {auditReport?.issues.length > 0 ? (
            <div className="space-y-3">
              {auditReport.issues.map((issue: any, index: number) => (
                <Alert key={index} className={
                  issue.type === 'error' ? 'border-destructive' :
                  issue.type === 'warning' ? 'border-yellow-500' :
                  'border-blue-500'
                }>
                  <div className="flex items-start gap-2">
                    {getStatusIcon(issue.type)}
                    <div className="flex-1">
                      <AlertTitle className="flex items-center gap-2">
                        {issue.message}
                        {getStatusBadge(issue.type)}
                      </AlertTitle>
                      {issue.url && (
                        <AlertDescription className="mt-1">
                          <strong>URL:</strong> {issue.url}
                        </AlertDescription>
                      )}
                      {issue.details && (
                        <AlertDescription className="mt-1">
                          <strong>Detaily:</strong> {issue.details}
                        </AlertDescription>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Žiadne problémy</AlertTitle>
              <AlertDescription>
                Sitemap je v perfektnom stave pre Google Search Console.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {auditReport?.recommendations.length > 0 ? (
            <div className="space-y-3">
              {auditReport.recommendations.map((recommendation: string, index: number) => (
                <Alert key={index}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Odporúčanie #{index + 1}</AlertTitle>
                  <AlertDescription>{recommendation}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Bez odporúčaní</AlertTitle>
              <AlertDescription>
                Sitemap je optimalizovaný a nepotrebuje ďalšie úpravy.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Znovu odoslať do GSC
                </CardTitle>
                <CardDescription>
                  Odošlite aktualizovaný sitemap do Google Search Console
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={openGSC} className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Otvoriť GSC Sitemaps
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  URL na odoslanie: https://www.popri.cz/sitemap.xml
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Ping vyhľadávače
                </CardTitle>
                <CardDescription>
                  Upozornite vyhľadávače na aktualizáciu sitemap
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => {
                    const pingUrl = `http://www.google.com/ping?sitemap=${encodeURIComponent('https://www.popri.cz/sitemap.xml')}`;
                    window.open(pingUrl, '_blank');
                  }}
                  className="w-full"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Ping Google
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Automaticky upozorní Google na zmeny
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Audit Report
                </CardTitle>
                <CardDescription>
                  Stiahnite kompletný audit report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={exportOptimizationReport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Stiahnuť Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Sitemap.xml
                </CardTitle>
                <CardDescription>
                  Stiahnite aktuálny sitemap súbor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={exportCurrentSitemap} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Stiahnuť Sitemap
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  View Live
                </CardTitle>
                <CardDescription>
                  Zobraziť aktuálny sitemap online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.open('https://www.popri.cz/sitemap.xml', '_blank')}
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Zobraziť Live
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      {lastAuditTime && (
        <div className="text-xs text-muted-foreground text-center">
          Posledný audit: {lastAuditTime}
        </div>
      )}
    </div>
  );
};

export default SitemapHealthDashboard;