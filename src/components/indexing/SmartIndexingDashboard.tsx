
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search, 
  Globe, 
  FileText, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  Download,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { incrementalSitemapManager, type IndexingStatus } from '../../utils/incrementalSitemapManager';
import { toast } from '../ui/use-toast';

const SmartIndexingDashboard = () => {
  const [indexingData, setIndexingData] = useState<IndexingStatus[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    submitted: 0,
    indexed: 0,
    pending: 0,
    lastUpdate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState<IndexingStatus[]>([]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const currentStats = incrementalSitemapManager.getIndexingStats();
      const newUrls = incrementalSitemapManager.detectNewUrls();
      const existingStatus = incrementalSitemapManager.getIndexingStatus();
      const readyData = incrementalSitemapManager.getReadyToSubmit();
      
      setStats(currentStats);
      setIndexingData([...existingStatus, ...newUrls]);
      setReadyToSubmit(readyData.urls);
      
      if (newUrls.length > 0) {
        toast({
          title: "Nové URL-ky detekované",
          description: `Nájdených ${newUrls.length} nových stránok na indexovanie.`
        });
      }
    } catch (error) {
      console.error('Error refreshing indexing data:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať indexing dáta.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleGenerateIncrementalSitemap = () => {
    if (readyToSubmit.length === 0) {
      toast({
        title: "Žiadne nové URL-ky",
        description: "Momentálne nie sú k dispozícii žiadne nové stránky na indexovanie."
      });
      return;
    }

    const sitemapContent = incrementalSitemapManager.generateIncrementalSitemap(readyToSubmit);
    
    // Download sitemap
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `incremental-sitemap-${new Date().toISOString().split('T')[0]}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Sitemap vygenerovaný",
      description: `Incremental sitemap s ${readyToSubmit.length} URL-kami bol stiahnutý.`
    });
  };

  const handleSubmitToGSC = () => {
    if (readyToSubmit.length === 0) return;

    const urls = readyToSubmit.map(item => item.url);
    incrementalSitemapManager.markAsSubmitted(urls);
    
    // Open GSC submit sitemap page
    const gscUrl = 'https://search.google.com/search-console/sitemaps?resource_id=https://www.popri.cz/';
    window.open(gscUrl, '_blank');
    
    toast({
      title: "Označené ako odoslané",
      description: `${urls.length} URL-iek bolo označených ako odoslané do GSC.`
    });
    
    refreshData();
  };

  const handleBulkInspect = () => {
    const urls = readyToSubmit.slice(0, 5).map(item => item.url); // Limit to 5 for practical reasons
    const gscUrls = incrementalSitemapManager.generateGSCInspectUrls(urls);
    
    gscUrls.forEach((item, index) => {
      setTimeout(() => {
        window.open(item.gscUrl, '_blank');
      }, index * 1000); // Stagger opening to avoid popup blocking
    });

    toast({
      title: "URL Inspection otvorený",
      description: `Otvorených ${gscUrls.length} URL inspection tabov v GSC.`
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { variant: 'secondary' as const, text: 'Nové', icon: Clock },
      submitted: { variant: 'outline' as const, text: 'Odoslané', icon: CheckCircle },
      indexed: { variant: 'default' as const, text: 'Indexované', icon: Search },
      pending: { variant: 'destructive' as const, text: 'Čaká', icon: RefreshCw }
    };
    
    const config = variants[status as keyof typeof variants] || variants.new;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const progressPercentage = stats.total > 0 ? (stats.indexed / stats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Smart Indexing System
        </h2>
        <p className="text-gray-600">
          Inteligentná detekcia a správa indexovania stránok v Google Search Console
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Celkom stránok</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nové na indexovanie</p>
                <p className="text-2xl font-bold text-green-600">{stats.new}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Odoslané</p>
                <p className="text-2xl font-bold text-orange-600">{stats.submitted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Indexované</p>
                <p className="text-2xl font-bold text-blue-600">{stats.indexed}</p>
              </div>
              <Search className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Indexing Progress</span>
            <span className="text-lg font-semibold text-blue-600">
              {Math.round(progressPercentage)}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-sm text-gray-600">
            {stats.indexed} z {stats.total} stránok je indexovaných v Google
          </p>
        </CardContent>
      </Card>

      {/* Ready to Submit Alert */}
      {readyToSubmit.length > 0 && (
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            <strong>{readyToSubmit.length} nových stránok</strong> je pripravených na odoslanie do Google Search Console.
            <div className="flex gap-2 mt-2">
              <Button onClick={handleGenerateIncrementalSitemap} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Stiahnuť Sitemap
              </Button>
              <Button onClick={handleSubmitToGSC} size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Odoslať do GSC
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs for different views */}
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">Nové stránky ({stats.new})</TabsTrigger>
          <TabsTrigger value="submitted">Odoslané ({stats.submitted})</TabsTrigger>
          <TabsTrigger value="all">Všetky stránky</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Nové stránky na indexovanie</h3>
            <div className="flex gap-2">
              <Button onClick={refreshData} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Obnoviť
              </Button>
              {readyToSubmit.length > 0 && (
                <Button onClick={handleBulkInspect} size="sm" variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Bulk Inspect
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            {readyToSubmit.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.url}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const gscUrls = incrementalSitemapManager.generateGSCInspectUrls([item.url]);
                        window.open(gscUrls[0].gscUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {readyToSubmit.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Žiadne nové stránky na indexovanie</p>
                <p className="text-sm">Všetky stránky sú už odoslané alebo indexované</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="submitted" className="space-y-4">
          <h3 className="text-lg font-semibold">Odoslané stránky</h3>
          <div className="space-y-2">
            {indexingData.filter(item => item.status === 'submitted').map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.url}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        {item.lastSubmitted && (
                          <span className="text-xs text-gray-500">
                            Odoslané: {new Date(item.lastSubmitted).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <h3 className="text-lg font-semibold">Všetky stránky</h3>
          <div className="space-y-2">
            {indexingData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.url}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartIndexingDashboard;
