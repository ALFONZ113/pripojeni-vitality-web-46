
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ExternalLink, Zap, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { blogPosts } from '../../data/blog';

interface IndexingAction {
  id: string;
  title: string;
  description: string;
  urls: string[];
  completed: boolean;
  action: () => void;
}

const IndexingAccelerator = () => {
  const [actions, setActions] = useState<IndexingAction[]>([
    {
      id: 'main-pages',
      title: 'Hlavné stránky',
      description: 'Indexovať kľúčové landing pages',
      urls: [
        'https://www.popri.cz/',
        'https://www.popri.cz/kontakt',
        'https://www.popri.cz/tarify',
        'https://www.popri.cz/internet-tv'
      ],
      completed: false,
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} URL skopírovaných. Použite URL Inspection v GSC.`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    },
    {
      id: 'blog-posts',
      title: 'Blog články',
      description: 'Indexovať všetky blog posty',
      urls: blogPosts.map(post => `https://www.popri.cz/blog/${post.id}`),
      completed: false,
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} blog URL skopírovaných. Použite URL Inspection v GSC.`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    },
    {
      id: 'local-pages',
      title: 'Lokálne stránky',
      description: 'Indexovať geo-specific stránky',
      urls: [
        'https://www.popri.cz/internet-ostrava',
        'https://www.popri.cz/internet-karvina',
        'https://www.popri.cz/internet-bohumin',
        'https://www.popri.cz/internet-havirov',
        'https://www.popri.cz/internet-poruba'
      ],
      completed: false,
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} lokálnych URL skopírovaných. Použite URL Inspection v GSC.`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    }
  ]);

  const openGSCInspection = () => {
    window.open('https://search.google.com/search-console/inspect?resource_id=sc-domain%3Apopri.cz', '_blank');
  };

  const generateSitemapUrls = () => {
    const allUrls = actions.flatMap(action => action.urls);
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
    
    navigator.clipboard.writeText(sitemapContent);
    toast.success('Sitemap XML skopírovaný do schránky');
  };

  const completedActions = actions.filter(a => a.completed).length;
  const totalActions = actions.length;
  const totalUrls = actions.reduce((sum, action) => sum + action.urls.length, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Indexing Accelerator
          </span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateSitemapUrls}
            >
              <Copy className="w-4 h-4 mr-1" />
              Sitemap XML
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openGSCInspection}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Open GSC
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalUrls}</div>
            <div className="text-sm text-gray-600">Celkom URL</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedActions}</div>
            <div className="text-sm text-gray-600">Hotové skupiny</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{totalActions - completedActions}</div>
            <div className="text-sm text-gray-600">Zostáva</div>
          </div>
        </div>

        <div className="space-y-4">
          {actions.map((action) => (
            <div key={action.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    action.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {action.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{action.urls.length}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={action.completed ? 'default' : 'secondary'}>
                    {action.urls.length} URL
                  </Badge>
                  <Button
                    onClick={action.action.bind(action)}
                    disabled={action.completed}
                    size="sm"
                  >
                    {action.completed ? 'Hotovo' : 'Copy URLs'}
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                {action.urls.slice(0, 3).map((url, idx) => (
                  <div key={idx}>{url}</div>
                ))}
                {action.urls.length > 3 && (
                  <div className="text-blue-600">... a ďalších {action.urls.length - 3} URL</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Postup:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Kliknite "Copy URLs" pre skupinu URL</li>
            <li>2. Otvorte Google Search Console</li>
            <li>3. Použite "URL Inspection" tool</li>
            <li>4. Pre každú URL: Paste → Test Live URL → Request Indexing</li>
            <li>5. Opakujte pre všetky skupiny</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexingAccelerator;
