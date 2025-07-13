
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import { Breadcrumb } from '../components/ui/breadcrumb';
import SEOAudit from '../components/migration/SEOAudit';
import { blogPosts } from '../data/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BarChart3, Search, Globe } from 'lucide-react';

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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              SEO Indexing Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Nástroje a akcie pre zlepšenie indexovania stránok v Google Search Console
            </p>
          </div>

          {/* Stats cards */}
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

          {/* SEO Audit */}
          <div className="mt-8">
            <SEOAudit />
          </div>

          {/* Recent blog posts that need indexing */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Články na indexovanie</CardTitle>
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
