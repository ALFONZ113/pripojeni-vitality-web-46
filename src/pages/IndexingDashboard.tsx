
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOAudit from '../components/migration/SEOAudit';
import SmartIndexingDashboard from '../components/indexing/SmartIndexingDashboard';
import SubmissionTracker from '../components/indexing/SubmissionTracker';
import { blogPosts } from '../data/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart3, Search, Globe, Zap } from 'lucide-react';

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
        title="Smart Indexing Dashboard | SEO Optimalizácia | Popri.cz"
        description="Inteligentný dashboard pre monitoring a optimalizáciu indexovania stránok v Google Search Console"
        currentPath="/indexing-dashboard"
      />
      
      <div className="container-custom section-padding">
        <Breadcrumb 
          items={[
            { title: 'Úvod', href: '/' },
            { title: 'Smart Indexing Dashboard' }
          ]}
          className="mb-8"
        />
        
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              Smart Indexing Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Inteligentný systém pre automatickú detekciu, správu a optimalizáciu indexovania stránok
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          {/* Main Dashboard with Tabs */}
          <Tabs defaultValue="smart-indexing" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="smart-indexing">Smart Indexing</TabsTrigger>
              <TabsTrigger value="submission-tracker">Submission Tracker</TabsTrigger>
              <TabsTrigger value="seo-audit">SEO Audit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="smart-indexing" className="mt-6">
              <SmartIndexingDashboard />
            </TabsContent>
            
            <TabsContent value="submission-tracker" className="mt-6">
              <SubmissionTracker />
            </TabsContent>
            
            <TabsContent value="seo-audit" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <SEOAudit />
              </div>
            </TabsContent>
          </Tabs>

          {/* Recent blog posts section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Posledné články na indexovanie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {blogPosts.slice(0, 5).map(post => (
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
        </div>
      </div>
    </div>
  );
};

export default IndexingDashboard;
