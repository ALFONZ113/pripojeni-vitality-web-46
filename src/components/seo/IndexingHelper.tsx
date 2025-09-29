
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
      title: 'Přidat property do GSC',
      description: 'Přidat www.popri.cz do Google Search Console',
      url: 'https://search.google.com/search-console',
      status: 'pending',
      action: () => {
        window.open('https://search.google.com/search-console', '_blank');
        updateActionStatus('gsc-property', 'completed');
      }
    },
    {
      id: 'change-address',
      title: 'Nastavit Change of Address',
      description: 'Migrace z pripojeni-poda.cz na www.popri.cz',
      status: 'pending',
      action: () => {
        toast.info('Otevřete GSC pro pripojeni-poda.cz > Settings > Change of Address');
        updateActionStatus('change-address', 'in-progress');
      }
    },
    {
      id: 'submit-sitemap',
      title: 'Odeslat sitemap',
      description: 'Přidat sitemap.xml do GSC',
      status: 'pending',
      action: () => {
        navigator.clipboard.writeText('https://www.popri.cz/sitemap.xml');
        toast.success('Sitemap URL zkopírována do schránky');
        updateActionStatus('submit-sitemap', 'completed');
      }
    },
    {
      id: 'request-indexing',
      title: 'Požádat o indexování',
      description: 'Manuálně požádat o indexování blog postů',
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
        toast.success('URL seznam zkopírován. Použijte "Inspect URL" v GSC pro každou URL.');
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
      pending: 'Čeká',
      'in-progress': 'Probíhá',
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
          Indexování - Akční plán
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
                {action.status === 'completed' ? 'Hotovo' : 'Spustit'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Důležité poznámky:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Indexování může trvat 1-7 dní</li>
            <li>• Pravidelně kontrolujte GSC Coverage report</li>
            <li>• Požádejte o indexování nových článků hned po publikování</li>
            <li>• Monitorujte organic traffic v GSC Performance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexingHelper;
