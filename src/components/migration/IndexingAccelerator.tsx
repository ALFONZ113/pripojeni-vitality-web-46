
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ExternalLink, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { blogPosts } from '../../data/blog';

interface IndexingAction {
  id: string;
  title: string;
  description: string;
  urls: string[];
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
}

const IndexingAccelerator = () => {
  const [actions, setActions] = useState<IndexingAction[]>([
    {
      id: 'critical-pages',
      title: 'KRITICKÉ stránky (PRIORITA 1)',
      description: 'Hlavné landing pages - MUSIA byť indexované',
      urls: [
        'https://www.popri.cz/',
        'https://www.popri.cz/kontakt',
        'https://www.popri.cz/tarify',
        'https://www.popri.cz/internet-tv'
      ],
      completed: false,
      priority: 'high',
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} kritických URL skopírovaných. NAJSKÔR tieto!`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    },
    {
      id: 'geo-pages',
      title: 'Geo-lokálne stránky (PRIORITA 2)',
      description: 'Lokálne stránky pre SEO',
      urls: [
        'https://www.popri.cz/internet-ostrava',
        'https://www.popri.cz/internet-karvina',
        'https://www.popri.cz/internet-bohumin',
        'https://www.popri.cz/internet-havirov',
        'https://www.popri.cz/internet-poruba'
      ],
      completed: false,
      priority: 'medium',
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} geo URL skopírovaných.`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    },
    {
      id: 'blog-posts',
      title: 'Blog články (PRIORITA 3)',
      description: 'Všetky blog posty pre content marketing',
      urls: blogPosts.map(post => `https://www.popri.cz/blog/${post.id}`),
      completed: false,
      priority: 'low',
      action: function() {
        navigator.clipboard.writeText(this.urls.join('\n'));
        toast.success(`${this.urls.length} blog URL skopírovaných.`);
        setActions(prev => prev.map(a => a.id === this.id ? { ...a, completed: true } : a));
      }
    }
  ]);

  const openGSCInspection = () => {
    window.open('https://search.google.com/search-console/inspect?resource_id=sc-domain%3Apopri.cz', '_blank');
  };

  const openGSCSubmitSitemap = () => {
    window.open('https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Apopri.cz', '_blank');
  };

  const copyAllUrls = () => {
    const allUrls = actions.flatMap(action => action.urls);
    navigator.clipboard.writeText(allUrls.join('\n'));
    toast.success(`Všetkých ${allUrls.length} URL skopírovaných naraz!`);
  };

  const completedActions = actions.filter(a => a.completed).length;
  const totalActions = actions.length;
  const totalUrls = actions.reduce((sum, action) => sum + action.urls.length, 0);
  const highPriorityCompleted = actions.filter(a => a.priority === 'high' && a.completed).length;
  const highPriorityTotal = actions.filter(a => a.priority === 'high').length;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Zap className="w-4 h-4 text-orange-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-orange-50 border-orange-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            OPRAVIT INDEXOVÁNÍ - Zrychlené řešení
          </span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyAllUrls}
            >
              <Copy className="w-4 h-4 mr-1" />
              Všechny URL
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openGSCSubmitSitemap}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Submit Sitemap
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openGSCInspection}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              URL Inspection
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-6 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalUrls}</div>
            <div className="text-sm text-gray-600">Celkem URL</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedActions}</div>
            <div className="text-sm text-gray-600">Hotové skupiny</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{highPriorityCompleted}/{highPriorityTotal}</div>
            <div className="text-sm text-gray-600">Kritické hotové</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{totalActions - completedActions}</div>
            <div className="text-sm text-gray-600">Zbývá</div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            KRITICKÉ: Začněte s PRIORITA 1!
          </h3>
          <p className="text-sm text-red-700">
            Nejdříve indexujte kritické stránky (homepage, kontakt, tarify). Až potom pokračujte s ostatními.
          </p>
        </div>

        <div className="space-y-4">
          {actions.map((action) => (
            <div key={action.id} className={`border rounded-lg p-4 ${getPriorityColor(action.priority)}`}>
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
                      getPriorityIcon(action.priority)
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {action.title}
                    </h3>
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
                    variant={action.priority === 'high' ? 'default' : 'outline'}
                  >
                    {action.completed ? 'Hotovo ✓' : 'Copy URLs'}
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 bg-white p-2 rounded max-h-20 overflow-y-auto">
                {action.urls.slice(0, 3).map((url, idx) => (
                  <div key={idx}>{url}</div>
                ))}
                {action.urls.length > 3 && (
                  <div className="text-blue-600">... a dalších {action.urls.length - 3} URL</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">POSTUP PRE RÝCHLE RIEŠENIE:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. <strong>NAJSKÔR:</strong> Copy "KRITICKÉ stránky" URL a indexuj ich v GSC</li>
            <li>2. <strong>Submit sitemap:</strong> Klik na "Submit Sitemap" tlačidlo</li>
            <li>3. <strong>URL Inspection:</strong> Pre každú URL: Paste → Test Live URL → Request Indexing</li>
            <li>4. <strong>Potom:</strong> Pokračuj s geo stránkami a nakonec blog</li>
            <li>5. <strong>Kontrola:</strong> Za 24-48h skontroluj Index Coverage v GSC</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexingAccelerator;
