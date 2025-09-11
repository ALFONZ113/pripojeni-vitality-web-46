
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOAudit from '../components/migration/SEOAudit';
import IndexingFixCenter from '../components/indexing/IndexingFixCenter';
import SiteAuditDashboard from '../components/indexing/SiteAuditDashboard';
import SEOFixDashboard from '../components/seo/SEOFixDashboard';
import { blogPosts } from '../data/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart3, Search, Globe, AlertTriangle, FileSearch, Settings } from 'lucide-react';

const IndexingDashboard = () => {
  const totalPosts = blogPosts.length;
  const recentPosts = blogPosts.filter(post => {
    const postDate = new Date(post.date.split('. ').reverse().join('-'));
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return postDate > weekAgo;
  }).length;

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <PageMetadata 
        title="Indexing Dashboard | SEO Optimalizácia | Popri.cz"
        description="Dashboard pre monitoring a optimalizáciu indexovania stránok v Google Search Console"
        currentPath="/indexing-dashboard"
      />
      
      <div className="container-custom section-padding">
        <Breadcrumb 
          items={[
            { title: 'Úvod', href: '/' },
            { title: 'Indexing Dashboard' }
          ]}
          className="mb-8"
        />
        
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-lg font-semibold text-red-800">Kritické problémy s indexáciou</h2>
              </div>
              <p className="text-red-700 text-sm">
                Len 42 z 137 stránok je indexovaných v Google (30,7%). Toto výrazne znižuje vašu organickú návštevnosť a pozície vo vyhľadávači.
              </p>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Google Search Console - Oprava indexácie
            </h1>
            <p className="text-gray-600 text-lg">
              Komplexný nástroj na identifikáciu a opravu problémov s indexáciou na základe GSC dát
            </p>
          </div>

          {/* Main Dashboard with Tabs */}
          <Tabs defaultValue="seo-fix" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="seo-fix" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                SEO Fix
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Prehľad
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex items-center gap-2">
                <FileSearch className="w-4 h-4" />
                Site Audit
              </TabsTrigger>
              <TabsTrigger value="fixes" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                GSC Opravy
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Články
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seo-fix" className="mt-6">
              <SEOFixDashboard />
            </TabsContent>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Celkovo článkov</p>
                        <p className="text-2xl font-bold text-gray-900">{totalPosts}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Nové tento týždeň</p>
                        <p className="text-2xl font-bold text-gray-900">{recentPosts}</p>
                      </div>
                      <Search className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sitemap URLs</p>
                        <p className="text-2xl font-bold text-gray-900">25</p>
                      </div>
                      <Globe className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SEO Audit Summary */}
              <div className="max-w-4xl mx-auto">
                <SEOAudit />
              </div>
            </TabsContent>

            <TabsContent value="audit" className="mt-6">
              <SiteAuditDashboard />
            </TabsContent>

            <TabsContent value="fixes" className="mt-6">
              <IndexingFixCenter />
            </TabsContent>

            <TabsContent value="articles" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Články na indexovanie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blogPosts.slice(0, 10).map(post => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {post.category} • {post.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">ID: {post.id}</Badge>
                          <a 
                            href={`https://search.google.com/search-console/inspect?resource_id=https://www.popri.cz/&id=https://www.popri.cz/blog/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Inspect URL
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default IndexingDashboard;
