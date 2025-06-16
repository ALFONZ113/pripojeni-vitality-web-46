
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface MigrationStep {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'in-progress' | 'error';
  description: string;
  action?: string;
  url?: string;
}

const MigrationDashboard = () => {
  const [steps, setSteps] = useState<MigrationStep[]>([
    {
      id: 'sitemap',
      title: 'Sitemap aktualizovaný',
      status: 'completed',
      description: 'Sitemap.xml obsahuje všetky blog posty (1-13)',
      action: 'Odoslať do GSC'
    },
    {
      id: 'robots',
      title: 'Robots.txt optimalizovaný',
      status: 'completed',
      description: 'Robots.txt obsahuje všetky blog post ID',
    },
    {
      id: 'gsc-property',
      title: 'GSC property pre www.popri.cz',
      status: 'pending',
      description: 'Pridať novú property do Google Search Console',
      url: 'https://search.google.com/search-console'
    },
    {
      id: 'change-address',
      title: 'Change of Address v GSC',
      status: 'pending',
      description: 'Nastaviť presmerovanie z pripojeni-poda.cz',
      url: 'https://search.google.com/search-console'
    },
    {
      id: 'submit-sitemap',
      title: 'Odoslať sitemap do GSC',
      status: 'pending',
      description: 'Odoslať https://www.popri.cz/sitemap.xml',
      action: 'Po vytvorení GSC property'
    }
  ]);

  const [indexStats, setIndexStats] = useState({
    oldDomain: 80,
    newDomain: 16,
    target: 25 // očakávaný počet po aktualizácii
  });

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      'in-progress': 'outline',
      error: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status === 'completed' ? 'Hotovo' : 
         status === 'pending' ? 'Čaká' :
         status === 'in-progress' ? 'Prebieha' : 'Chyba'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Migration Dashboard
        </h2>
        <p className="text-gray-600">
          Sledovanie migrácie z pripojeni-poda.cz na www.popri.cz
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Celkový pokrok</span>
            <span className="text-2xl font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {completedSteps}
              </div>
              <div className="text-sm text-gray-600">Hotovo</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {totalSteps - completedSteps}
              </div>
              <div className="text-sm text-gray-600">Zostáva</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {totalSteps}
              </div>
              <div className="text-sm text-gray-600">Celkom</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indexing Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Indexovanie stránok</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">
                {indexStats.oldDomain}
              </div>
              <div className="text-sm text-gray-600">pripojeni-poda.cz</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {indexStats.newDomain}
              </div>
              <div className="text-sm text-gray-600">www.popri.cz (aktuálne)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {indexStats.target}
              </div>
              <div className="text-sm text-gray-600">Cieľ po aktualizácii</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Poznámka:</strong> Po odoslaní aktualizovaného sitemap do GSC by sa počet indexovaných stránok mal zvýšiť z 16 na ~25.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Migration Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Migračné kroky</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  {step.action && (
                    <p className="text-xs text-blue-600 font-medium">
                      Akcia: {step.action}
                    </p>
                  )}
                </div>
                {step.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(step.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Najbližšie kroky</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Prihlásiť sa do Google Search Console</li>
            <li>Pridať property pre "www.popri.cz" (Domain property)</li>
            <li>V pripojeni-poda.cz property použiť "Change of Address" tool</li>
            <li>Odoslať sitemap: https://www.popri.cz/sitemap.xml</li>
            <li>Sledovať indexovanie nových stránok (môže trvať 2-7 dní)</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationDashboard;
