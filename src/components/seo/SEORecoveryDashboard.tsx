import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ExternalLink, Copy, Search, Target } from 'lucide-react';
import { toast } from 'sonner';
import PODAKeywordAccelerator from './PODAKeywordAccelerator';

interface SEOTask {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress';
  priority: 'critical' | 'high' | 'medium';
  action?: () => void;
  link?: string;
}

interface KeywordData {
  keyword: string;
  currentPosition: number | null;
  previousPosition: number | null;
  trend: 'up' | 'down' | 'stable' | 'new';
  searchVolume: string;
}

const SEORecoveryDashboard = () => {
  const [tasks, setTasks] = useState<SEOTask[]>([
    {
      id: 'sitemap-updated',
      title: 'Sitemap.xml aktualizovaný',
      description: 'Opravené dátumy a pridané všetky stránky',
      status: 'completed',
      priority: 'critical'
    },
    {
      id: 'homepage-optimized',
      title: 'Homepage optimalizovaná pre "PODA pripojení"',
      description: 'Title, H1, meta description a obsah optimalizovaný',
      status: 'completed',
      priority: 'critical'
    },
    {
      id: 'bot-detector-fixed',
      title: 'Bot detector opravený',
      description: 'Google crawlery môžu správne pristupovať k obsahu',
      status: 'completed',
      priority: 'critical'
    },
    {
      id: 'submit-gsc',
      title: 'Submitnúť sitemap do GSC',
      description: 'Odoslať aktualizovaný sitemap do Google Search Console',
      status: 'pending',
      priority: 'critical',
      link: 'https://search.google.com/search-console',
      action: function() {
        navigator.clipboard.writeText('https://www.popri.cz/sitemap.xml');
        toast.success('Sitemap URL skopírovaná! Submitnite do GSC.');
      }
    },
    {
      id: 'request-indexing',
      title: 'Požiadať o reindexáciu',
      description: 'URL Inspection pre kľúčové stránky',
      status: 'pending',
      priority: 'high',
      link: 'https://search.google.com/search-console/inspect',
      action: function() {
        const urls = [
          'https://www.popri.cz/',
          'https://www.popri.cz/tarify',
          'https://www.popri.cz/kontakt',
          'https://www.popri.cz/internet-ostrava'
        ];
        navigator.clipboard.writeText(urls.join('\n'));
        toast.success('Kľúčové URLs skopírované! Použite URL Inspection v GSC.');
      }
    },
    {
      id: 'monitor-rankings',
      title: 'Nastaviť rank monitoring',
      description: 'Sledovať pozície pre "PODA pripojení" kľúčové slová',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  const [keywords] = useState<KeywordData[]>([
    {
      keyword: 'PODA pripojení',
      currentPosition: null,
      previousPosition: 3,
      trend: 'down',
      searchVolume: '1.2K/mesiac'
    },
    {
      keyword: 'PODA internet',
      currentPosition: null,
      previousPosition: 4,
      trend: 'down',
      searchVolume: '800/mesiac'
    },
    {
      keyword: 'PODA',
      currentPosition: null,
      previousPosition: 5,
      trend: 'down',
      searchVolume: '2.1K/mesiac'
    },
    {
      keyword: 'gigabitový internet Ostrava',
      currentPosition: 12,
      previousPosition: 15,
      trend: 'up',
      searchVolume: '400/mesiac'
    }
  ]);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          SEO Recovery Dashboard - PODA pripojení
        </h1>
        <p className="text-gray-600">
          Obnovenie pozícií pre kľúčové slová "PODA pripojení"
        </p>
      </div>

      {/* PODA Keyword Accelerator */}
      <PODAKeywordAccelerator />

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{progress}%</div>
            <div className="text-sm text-gray-600">Hotovo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks}</div>
            <div className="text-sm text-gray-600">Úlohy dokončené</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{totalTasks - completedTasks}</div>
            <div className="text-sm text-gray-600">Zostáva</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Kľúčové slová down</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Akčný plán na obnovenie pozícií
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-6" />
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`border rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      {getStatusIcon(task.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      task.priority === 'critical' ? 'destructive' :
                      task.priority === 'high' ? 'secondary' : 'outline'
                    }>
                      {task.priority}
                    </Badge>
                    {task.action && (
                      <Button size="sm" onClick={task.action}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    )}
                    {task.link && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(task.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keyword Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Sledovanie pozícií kľúčových slov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{keyword.keyword}</div>
                  <div className="text-sm text-gray-600">{keyword.searchVolume}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Predtým</div>
                  <div className="font-bold">
                    {keyword.previousPosition ? `#${keyword.previousPosition}` : 'N/A'}
                  </div>
                </div>
                <div className="mx-4">
                  {getTrendIcon(keyword.trend)}
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Teraz</div>
                  <div className="font-bold text-red-600">
                    {keyword.currentPosition ? `#${keyword.currentPosition}` : 'Nie v TOP 20'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Nasledujúce kroky (KRITICKÉ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-800 mb-2">🚨 URGENTNÉ - Urobte TERAZ:</h3>
            <ol className="list-decimal list-inside space-y-2 text-red-700">
              <li><strong>Google Search Console:</strong> Submitnite nový sitemap</li>
              <li><strong>URL Inspection:</strong> Požiadajte o reindexáciu homepage</li>
              <li><strong>Core Web Vitals:</strong> Skontrolujte rýchlosť stránky</li>
              <li><strong>Monitor 48h:</strong> Sledujte zmeny v GSC</li>
            </ol>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Technické SEO</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✅ Sitemap opravený</li>
                <li>✅ Bot detector optimalizovaný</li>
                <li>⏳ GSC submission</li>
                <li>⏳ Monitoring nastavený</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Obsah optimalizovaný</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ Title tags pre "PODA pripojení"</li>
                <li>✅ H1 optimalizovaný</li>
                <li>✅ Meta descriptions</li>
                <li>✅ Keyword density zvýšená</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEORecoveryDashboard;
