import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ExternalLink, Search, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { blogPosts } from '@/data/blog';
import { createSlug } from '@/utils/slugGenerator';

interface IndexingAction {
  id: string;
  title: string;
  description: string;
  url?: string;
  action: () => void;
  status: 'pending' | 'completed' | 'in-progress';
}

const IndexingHelper = () => {
  // Generate blog URLs dynamically using slugs
  const blogUrls = useMemo(() => {
    return blogPosts.slice(0, 10).map(post => {
      const slug = post.slug || createSlug(post.title);
      return `https://www.popri.cz/blog/${slug}`;
    });
  }, []);

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
      description: 'Manuálně požádat o indexování blog postů (slug-based URLs)',
      status: 'pending',
      action: () => {
        navigator.clipboard.writeText(blogUrls.join('\n'));
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
            <div key={action.id} className="flex items-center justify-between p-4 border border-border/30 rounded-lg bg-card">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  {getStatusBadge(action.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                {action.url && (
                  <a 
                    href={action.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 flex items-center"
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
        
        <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border/30">
          <h4 className="font-semibold text-foreground mb-2">Důležité poznámky:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Indexování může trvat 1-7 dní</li>
            <li>• Pravidelně kontrolujte GSC Coverage report</li>
            <li>• Požádejte o indexování nových článků hned po publikování</li>
            <li>• Monitorujte organic traffic v GSC Performance</li>
            <li>• Všechny blog URL jsou nyní slug-based (např. /blog/nazov-clanku)</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 bg-card rounded-lg border border-border/30">
          <h4 className="font-semibold text-foreground mb-2">Blog URL pro indexování:</h4>
          <div className="text-xs text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
            {blogUrls.map((url, i) => (
              <div key={i} className="truncate">{url}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexingHelper;
