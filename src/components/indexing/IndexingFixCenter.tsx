import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertTriangle, CheckCircle, Copy, ExternalLink, RefreshCcw, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { toast } from 'sonner';

interface IndexingIssue {
  type: 'crawled-not-indexed' | 'canonical-duplicate' | 'not-found' | 'redirect';
  url: string;
  priority: 'critical' | 'high' | 'medium';
  solution: string[];
  estimatedImpact: string;
}

const IndexingFixCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);

  // Simulované problémy na základe GSC screenshotov
  const indexingIssues: IndexingIssue[] = [
    {
      type: 'crawled-not-indexed',
      url: '/blog/internet-karvina/',
      priority: 'critical',
      solution: [
        'Použiť "Request Indexing" v GSC',
        'Zlepšiť E-A-T signály (expertnos, autoritu, dôveryhodnosť)',
        'Pridať interné odkazy z hlavných stránok',
        'Optimalizovať Core Web Vitals'
      ],
      estimatedImpact: 'Vysoký - kľúčová geo stránka'
    },
    {
      type: 'crawled-not-indexed',
      url: '/blog/102',
      priority: 'high',
      solution: [
        'Migrovať na SEO-friendly URL (/blog/nazov-clanku)',
        'Pridať strukturované dáta',
        'Zlepšiť meta description a title',
        'Pridať relevantné interné odkazy'
      ],
      estimatedImpact: 'Stredný - blog content'
    },
    {
      type: 'canonical-duplicate',
      url: '/blog/?tag=Služby',
      priority: 'high',
      solution: [
        'Nastaviť správne canonical URLs',
        'Implementovať proper pagination',
        'Pridať noindex pre duplicitné parametre',
        'Vyčistiť URL štruktúru'
      ],
      estimatedImpact: 'Vysoký - ovplyvňuje celú blog sekciu'
    },
    {
      type: 'canonical-duplicate',
      url: '/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025',
      priority: 'critical',
      solution: [
        'Skrátiť URL (max 60 znakov)',
        'Odstrániť duplicitné kľúčové slová z URL',
        'Nastaviť 301 redirect zo starého URL',
        'Optimalizovať pre featured snippets'
      ],
      estimatedImpact: 'Kritický - main keyword page'
    }
  ];

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'crawled-not-indexed': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'canonical-duplicate': return <Copy className="w-5 h-5 text-red-500" />;
      case 'not-found': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <RefreshCcw className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsFixed = (url: string) => {
    setFixedIssues([...fixedIssues, url]);
    toast.success(`Označené ako opravené: ${url}`);
  };

  const copyUrls = (urls: string[]) => {
    const urlList = urls.map(url => `https://www.popri.cz${url}`).join('\n');
    navigator.clipboard.writeText(urlList);
    toast.success(`Skopírované ${urls.length} URLs do schránky`);
  };

  const openGSC = (action: string, url?: string) => {
    const baseGSC = 'https://search.google.com/search-console';
    let gscUrl = baseGSC;
    
    switch (action) {
      case 'inspect':
        gscUrl = `${baseGSC}/inspect?resource_id=https://www.popri.cz/&id=https://www.popri.cz${url}`;
        break;
      case 'coverage':
        gscUrl = `${baseGSC}/coverage?resource_id=https://www.popri.cz/`;
        break;
      case 'sitemaps':
        gscUrl = `${baseGSC}/sitemaps?resource_id=https://www.popri.cz/`;
        break;
    }
    
    window.open(gscUrl, '_blank');
  };

  const criticalIssues = indexingIssues.filter(issue => issue.priority === 'critical');
  const highIssues = indexingIssues.filter(issue => issue.priority === 'high');
  const totalFixed = fixedIssues.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Prehľad a štatistiky */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 mb-1">Kritické problémy</p>
                <p className="text-2xl font-bold text-red-700">{criticalIssues.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 mb-1">Vysoké problémy</p>
                <p className="text-2xl font-bold text-orange-700">{highIssues.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 mb-1">Opravené</p>
                <p className="text-2xl font-bold text-green-700">{totalFixed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">Indexované/Celkom</p>
                <p className="text-2xl font-bold text-blue-700">42/137</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rýchle akcie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Okamžité akcie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => openGSC('coverage')}
              className="flex items-center gap-2"
              variant="outline"
            >
              <ExternalLink className="w-4 h-4" />
              Otvoriť GSC Coverage
            </Button>
            <Button 
              onClick={() => openGSC('sitemaps')}
              className="flex items-center gap-2"
              variant="outline"
            >
              <RefreshCcw className="w-4 h-4" />
              Znovu odoslať Sitemap
            </Button>
            <Button 
              onClick={() => copyUrls(indexingIssues.map(issue => issue.url))}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Copy className="w-4 h-4" />
              Kopírovať všetky URLs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Prehľad problémov</TabsTrigger>
          <TabsTrigger value="solutions">Riešenia krok za krokom</TabsTrigger>
          <TabsTrigger value="impact">Dopad na SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {indexingIssues.map((issue, index) => (
            <Card key={index} className={`border-l-4 ${
              issue.priority === 'critical' ? 'border-l-red-500' : 
              issue.priority === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getIssueIcon(issue.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{issue.url}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {issue.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                    {fixedIssues.includes(issue.url) ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Opravené
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => markAsFixed(issue.url)}
                        className="text-xs"
                      >
                        Označiť ako opravené
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Riešenie:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {issue.solution.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dopad:</span> {issue.estimatedImpact}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openGSC('inspect', issue.url)}
                    className="flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                    GSC Inspect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="solutions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Presný návod na opravu indexácie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">1. Okamžité akcie (dnes)</h3>
                <div className="space-y-3 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium">Request Indexing pre kritické stránky</p>
                      <p className="text-sm text-gray-600">V GSC → URL Inspection → Request Indexing pre každú kritickú stránku</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium">Znovu odoslať sitemap.xml</p>
                      <p className="text-sm text-gray-600">GSC → Sitemaps → Pridať/otestovať sitemap: https://www.popri.cz/sitemap.xml</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium">Opraviť duplicate content</p>
                      <p className="text-sm text-gray-600">Nastaviť canonical URLs a 301 redirecty pre duplicitné stránky</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">2. Technické opravy (tento týždeň)</h3>
                <div className="space-y-3 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium">Migrácia blog URLs</p>
                      <p className="text-sm text-gray-600">Zmeniť /blog/102 → /blog/nazov-clanku s 301 redirectmi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium">Strukturované dáta</p>
                      <p className="text-sm text-gray-600">Pridať JSON-LD schema pre Articles, LocalBusiness, FAQs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium">Interné odkazy</p>
                      <p className="text-sm text-gray-600">Pridať relevantné interné odkazy z hlavných stránok na neindexované</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">3. Dlhodobé zlepšenia (budúci mesiac)</h3>
                <div className="space-y-3 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium">Core Web Vitals</p>
                      <p className="text-sm text-gray-600">Zlepšiť LCP, FID, CLS pre lepšiu indexáciu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium">E-A-T signály</p>
                      <p className="text-sm text-gray-600">Pridať autor profily, recenzie, certifikáty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium">Content freshness</p>
                      <p className="text-sm text-gray-600">Pravidelne aktualizovať obsah a pridávať nové články</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ako zlá indexácia ovplyvňuje pozície vo vyhľadávači</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🚨 Kritický dopad na SEO</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Neindexované stránky sa nezobrazujú vo vyhľadávaní = 0 organická návštevnosť</li>
                  <li>• Ratio 42/137 indexovaných stránok = stráca sa 69% potenciálnej návštevnosti</li>
                  <li>• Duplicate content znižuje autoritu celej domény</li>
                  <li>• Špatné URL štruktúry znižujú CTR aj pre indexované stránky</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">📊 Očakávané zlepšenia po oprave</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• +200-300% nárast indexovaných stránok za 2-4 týždne</li>
                  <li>• +50-150% nárast organickej návštevnosti za 1-3 mesiace</li>
                  <li>• Lepšie rankovaná pre lokálne kľúčové slová (Ostrava, Karviná, etc.)</li>
                  <li>• Vyššia relevantnosť pre blog content v SERP</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Prioritné kľúčové slová na opravy</h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p><strong>Kritické:</strong> "internet Ostrava", "internet Karviná", "optické pripojenie"</p>
                  <p><strong>Vysoké:</strong> "IPTV", "60GHz technológia", "rýchly internet"</p>
                  <p><strong>Stredné:</strong> Long-tail kľúčové slová z blog contentu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndexingFixCenter;