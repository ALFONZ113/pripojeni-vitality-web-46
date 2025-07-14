
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ExternalLink, Search, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface IndexingAction {
  id: string;
  title: string;
  description: string;
  url?: string;
  action: () => void;
  status: 'pending' | 'completed' | 'in-progress';
}

const IndexingHelper = () => {
  const [actions, setActions] = useState<IndexingAction[]>([
    {
      id: 'gsc-property',
      title: 'Pridať property do GSC',
      description: 'Pridať www.popri.cz do Google Search Console',
      url: 'https://search.google.com/search-console',
      status: 'pending',
      action: () => {
        window.open('https://search.google.com/search-console', '_blank');
        updateActionStatus('gsc-property', 'completed');
      }
    },
    {
      id: 'change-address',
      title: 'Nastaviť Change of Address',
      description: 'Migrácia z pripojeni-poda.cz na www.popri.cz',
      status: 'pending',
      action: () => {
        toast.info('Otvorte GSC pre pripojeni-poda.cz > Settings > Change of Address');
        updateActionStatus('change-address', 'in-progress');
      }
    },
    {
      id: 'submit-sitemap',
      title: 'Odoslať sitemap',
      description: 'Pridať sitemap.xml do GSC',
      status: 'pending',
      action: () => {
        navigator.clipboard.writeText('https://www.popri.cz/sitemap.xml');
        toast.success('Sitemap URL skopírovaná do schránky');
        updateActionStatus('submit-sitemap', 'completed');
      }
    },
    {
      id: 'request-indexing',
      title: 'Požiadať o indexovanie',
      description: 'Manuálne požiadať o indexovanie blog postov',
      status: 'pending',
      action: () => {
        const urls = [
          'https://www.popri.cz/blog/1',
          'https://www.popri.cz/blog/2',
          'https://www.popri.cz/blog/3',
          'https://www.popri.cz/blog/4',
          'https://www.popri.cz/blog/5'
        ];
        navigator.clipboard.writeText(urls.join('\n'));
        toast.success('URL zoznam skopírovaný. Použite "Inspect URL" v GSC pre každú URL.');
        updateActionStatus('request-indexing', 'in-progress');
      }
    }
  ]);

  const updateActionStatus = (id: string, status: 'pending' | 'completed' | 'in-progress') => {
    setActions(prev => prev.map(action => 
      action.id === id ? { ...action, status } : action
    ));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      'in-progress': 'default',
      completed: 'default'
    } as const;
    
    const labels = {
      pending: 'Čaká',
      'in-progress': 'Prebieha',
      completed: 'Hotovo'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Indexovanie - Akčný plán
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  {getStatusBadge(action.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                {action.url && (
                  <a 
                    href={action.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {action.url} <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
              <Button
                onClick={action.action}
                variant={action.status === 'completed' ? 'secondary' : 'default'}
                size="sm"
                className="ml-4"
              >
                {action.status === 'completed' ? 'Hotovo' : 'Spustiť'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Dôležité poznámky:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Indexovanie môže trvať 1-7 dní</li>
            <li>• Pravidelne kontrolujte GSC Coverage report</li>
            <li>• Požiadajte o indexovanie nových článkov hneď po publikovaní</li>
            <li>• Monitorujte organic traffic v GSC Performance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexingHelper;
