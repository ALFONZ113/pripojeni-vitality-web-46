
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ExternalLink, Zap, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface KeywordStrategy {
  id: string;
  keyword: string;
  currentPosition: number | null;
  targetPosition: number;
  difficulty: 'easy' | 'medium' | 'hard';
  searchVolume: string;
  actions: string[];
  urls: string[];
  completed: boolean;
}

const PODAKeywordAccelerator = () => {
  const [strategies, setStrategies] = useState<KeywordStrategy[]>([
    {
      id: 'poda-pripojeni',
      keyword: 'PODA pripojení',
      currentPosition: null,
      targetPosition: 3,
      difficulty: 'medium',
      searchVolume: '1,200/mes',
      actions: [
        'Optimalizovať homepage title',
        'Pridať FAQ sekciu s "PODA pripojení"',
        'Vytvoriť dedikovanú stránku /poda-pripojeni',
        'Interné linkovanie z všetkých stránok'
      ],
      urls: [
        'https://www.popri.cz/',
        'https://www.popri.cz/tarify',
        'https://www.popri.cz/kontakt'
      ],
      completed: false
    },
    {
      id: 'poda-internet',
      keyword: 'PODA internet',
      currentPosition: null,
      targetPosition: 4,
      difficulty: 'medium',
      searchVolume: '800/mes',
      actions: [
        'Optimalizovať /internet-tv stránku',
        'Pridať "PODA internet" do H2 tagov',
        'Vytvoriť blog post o "PODA internet"',
        'Pridať testimonials s kľúčovým slovom'
      ],
      urls: [
        'https://www.popri.cz/internet-tv',
        'https://www.popri.cz/tarify'
      ],
      completed: false
    },
    {
      id: 'poda',
      keyword: 'PODA',
      currentPosition: null,
      targetPosition: 5,
      difficulty: 'hard',
      searchVolume: '2,100/mes',
      actions: [
        'Zvýšiť brand mentions',
        'Optimalizovať všetky meta titles',
        'Vytvoriť "Čo je PODA?" stránku',
        'Social media kampane'
      ],
      urls: [
        'https://www.popri.cz/',
        'https://www.popri.cz/blog'
      ],
      completed: false
    }
  ]);

  const toggleCompleted = (id: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === id ? { ...strategy, completed: !strategy.completed } : strategy
    ));
  };

  const copyUrls = (urls: string[]) => {
    navigator.clipboard.writeText(urls.join('\n'));
    toast.success(`${urls.length} URLs skopírovaných pre indexáciu!`);
  };

  const copyAllKeywords = () => {
    const keywords = strategies.map(s => s.keyword).join('\n');
    navigator.clipboard.writeText(keywords);
    toast.success('Všetky kľúčové slová skopírované!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedStrategies = strategies.filter(s => s.completed).length;
  const totalStrategies = strategies.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            PODA Keyword Recovery Strategy
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={copyAllKeywords}>
              <Copy className="w-4 h-4 mr-1" />
              Copy Keywords
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              GSC
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalStrategies}</div>
            <div className="text-sm text-gray-600">Kľúčové slová</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedStrategies}</div>
            <div className="text-sm text-gray-600">Optimalizované</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{totalStrategies - completedStrategies}</div>
            <div className="text-sm text-gray-600">Zostáva</div>
          </div>
        </div>

        <div className="space-y-6">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      strategy.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() => toggleCompleted(strategy.id)}
                  >
                    {strategy.completed && '✓'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{strategy.keyword}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{strategy.searchVolume}</span>
                      <Badge className={getDifficultyColor(strategy.difficulty)}>
                        {strategy.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Cieľová pozícia</div>
                  <div className="text-2xl font-bold text-blue-600">#{strategy.targetPosition}</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Akčný plán:</h4>
                <ul className="space-y-1">
                  {strategy.actions.map((action, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <strong>{strategy.urls.length}</strong> stránok na optimalizáciu
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyUrls(strategy.urls)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy URLs
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://search.google.com/search-console/inspect', '_blank')}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Index Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            KRITICKÝ plán na nasledujúcich 7 dní:
          </h4>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li><strong>Deň 1-2:</strong> Submit sitemap + URL inspection pre všetky URLs</li>
            <li><strong>Deň 3-4:</strong> Vytvoriť dedikovanú /poda-pripojeni stránku</li>
            <li><strong>Deň 5-6:</strong> Optimalizovať interné linkovanie</li>
            <li><strong>Deň 7:</strong> Monitor GSC a sledovať pozície</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default PODAKeywordAccelerator;
