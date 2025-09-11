import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  ExternalLink,
  Download,
  RefreshCw,
  Globe,
  TrendingUp,
  Wrench,
  FileX,
  Copy
} from 'lucide-react';
import { useSiteAudit } from '../../hooks/use-site-audit';
import { exportFixReport } from '../../utils/automaticFixes';

const SiteAuditDashboard = () => {
  const { 
    auditReport, 
    isLoading, 
    isFixing, 
    error, 
    runAudit, 
    fixAllIssues, 
    fixSpecificIssue, 
    lastFixResult,
    clearError 
  } = useSiteAudit();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredPages = auditReport?.pages.filter(page => {
    const matchesSearch = page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || page.indexingStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'indexed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <RotateCcw className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'redirect': return <ExternalLink className="w-4 h-4 text-blue-600" />;
      case 'duplicate': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return <Globe className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      indexed: 'default',
      pending: 'secondary', 
      error: 'destructive',
      redirect: 'outline',
      duplicate: 'secondary',
      'not-indexed': 'secondary'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const exportReport = () => {
    if (!auditReport) return;
    
    const dataStr = JSON.stringify(auditReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-audit-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (!auditReport && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Site Audit Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Zatiaľ nebol spustený žiadny audit stránky.
          </p>
          <Button onClick={runAudit} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Spustiť prvý audit
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Audit Dashboard</h2>
          <p className="text-gray-600">
            Kompletná analýza indexácie a SEO problémov
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport} disabled={!auditReport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={runAudit} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Audituje...' : 'Nový audit'}
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Spúšťam audit stránky...</h3>
              <p className="text-gray-600 mb-4">
                Analyzujem všetky stránky, kontrolujem redirecty, canonical značky a sitemap.
              </p>
              <Progress value={45} className="w-64 mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {auditReport && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Celkovo stránok</p>
                    <p className="text-2xl font-bold">{auditReport.totalPages}</p>
                  </div>
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Indexované</p>
                    <p className="text-2xl font-bold text-green-600">{auditReport.indexedPages}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Problémy</p>
                    <p className="text-2xl font-bold text-red-600">{auditReport.criticalIssues}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Opraviteľné</p>
                    <p className="text-2xl font-bold text-orange-600">{auditReport.fixableIssues}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter a vyhľadávanie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Vyhľadaj URL alebo title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Všetky stavy</option>
                  <option value="indexed">Indexované</option>
                  <option value="pending">Čakajúce</option>
                  <option value="not-indexed">Nie indexované</option>
                  <option value="error">Chyby</option>
                  <option value="redirect">Redirecty</option>
                  <option value="duplicate">Duplikáty</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Pages Table */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Všetky ({filteredPages.length})</TabsTrigger>
              <TabsTrigger value="issues">Problémy ({filteredPages.filter(p => p.issues.length > 0).length})</TabsTrigger>
              <TabsTrigger value="recommendations">Odporúčania ({filteredPages.filter(p => p.recommendations.length > 0).length})</TabsTrigger>
              <TabsTrigger value="pending">Čakajúce ({filteredPages.filter(p => p.indexingStatus === 'pending').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredPages.map((page, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(page.indexingStatus)}
                          <h4 className="font-medium text-gray-900 truncate">
                            {page.title || page.url}
                          </h4>
                          {getStatusBadge(page.indexingStatus)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{page.url}</p>
                        {page.metaDescription && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {page.metaDescription}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        HTTP {page.statusCode}
                      </div>
                    </div>

                    {page.issues.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-red-600 mb-1">Problémy:</p>
                        <ul className="text-xs text-red-600 space-y-1">
                          {page.issues.map((issue, i) => (
                            <li key={i}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {page.recommendations.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-orange-600 mb-1">Odporúčania:</p>
                        <ul className="text-xs text-orange-600 space-y-1">
                          {page.recommendations.map((rec, i) => (
                            <li key={i}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex gap-4">
                        <span>Canonical: {page.hasCanonical ? '✓' : '✗'}</span>
                        <span>Sitemap: {page.isInSitemap ? '✓' : '✗'}</span>
                        <span>Robots: {page.robotsMeta}</span>
                      </div>
                      <span>Skenované: {new Date(page.lastCrawled).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="issues">
              {filteredPages.filter(p => p.issues.length > 0).map((page, index) => (
                <Card key={index} className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <h4 className="font-medium text-red-900">{page.url}</h4>
                      {getStatusBadge(page.indexingStatus)}
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      {page.issues.map((issue, i) => (
                        <li key={i}>• {issue}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations">
              {filteredPages.filter(p => p.recommendations.length > 0).map((page, index) => (
                <Card key={index} className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <h4 className="font-medium text-orange-900">{page.url}</h4>
                      {getStatusBadge(page.indexingStatus)}
                    </div>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {page.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending">
              {filteredPages.filter(p => p.indexingStatus === 'pending').map((page, index) => (
                <Card key={index} className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCcw className="w-4 h-4 text-yellow-600" />
                      <h4 className="font-medium text-yellow-900">{page.url}</h4>
                      {getStatusBadge(page.indexingStatus)}
                    </div>
                    <p className="text-sm text-yellow-700">
                      Stránka čaká na indexáciu Googlebotom. Môžete požiadať o indexáciu cez GSC.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default SiteAuditDashboard;