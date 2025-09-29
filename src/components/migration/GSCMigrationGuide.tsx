
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, ExternalLink, Copy, Search, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface GSCStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: () => void;
  url?: string;
  instructions: string[];
}

const GSCMigrationGuide = () => {
  const [steps, setSteps] = useState<GSCStep[]>([
    {
      id: 'verify-new-domain',
      title: 'Verifikovať www.popri.cz v GSC',
      description: 'Pridať a verifikovať novú doménu v Google Search Console',
      completed: false,
      url: 'https://search.google.com/search-console',
      instructions: [
        'Ísť do Google Search Console',
        'Kliknúť na "Add property"',
        'Vybrať "Domain" a zadať "popri.cz"',
        'Verifikovať cez DNS TXT záznam',
        'Počkať na potvrdenie verifikácie'
      ]
    },
    {
      id: 'change-of-address',
      title: 'Nastaviť Change of Address',
      description: 'V GSC pre pripojeni-poda.cz nastaviť presmerovanie',
      completed: false,
      instructions: [
        'Otvoriť GSC property pre pripojeni-poda.cz',
        'Ísť do Settings (ozubené koliesko)',
        'Vybrať "Change of address"',
        'Zadať novú doménu: www.popri.cz',
        'Potvrdiť zmenu'
      ]
    },
    {
      id: 'submit-sitemap',
      title: 'Odoslať sitemap do GSC',
      description: 'Pridať sitemap.xml pre novú doménu',
      completed: false,
      action: () => {
        navigator.clipboard.writeText('https://www.popri.cz/sitemap.xml');
        toast.success('Sitemap URL zkopírována do schránky');
      },
      instructions: [
        'V GSC pro www.popri.cz jít do "Sitemaps"',
        'Zadat URL: https://www.popri.cz/sitemap.xml',
        'Kliknout "Submit"',
        'Zkontrolovat úspěšné zpracování'
      ]
    },
    {
      id: 'request-indexing',
      title: 'Požiadať o indexovanie',
      description: 'Manuálne požiadať o indexovanie kľúčových stránok',
      completed: false,
      action: () => {
        const urls = [
          'https://www.popri.cz/',
          'https://www.popri.cz/blog',
          'https://www.popri.cz/blog/1',
          'https://www.popri.cz/blog/2',
          'https://www.popri.cz/blog/3',
          'https://www.popri.cz/kontakt',
          'https://www.popri.cz/tarify'
        ];
        navigator.clipboard.writeText(urls.join('\n'));
        toast.success('URL seznam zkopírován. Použijte "URL Inspection" v GSC pro každou URL.');
      },
      instructions: [
        'V GSC pre www.popri.cz použiť "URL Inspection"',
        'Zadať URL a kliknúť "Test Live URL"',
        'Kliknúť "Request Indexing"',
        'Opakovať pre všetky dôležité stránky'
      ]
    },
    {
      id: 'monitor-progress',
      title: 'Monitorovať progress',
      description: 'Sledovať indexovanie a performance',
      completed: false,
      instructions: [
        'Denné kontrolovanie "Index Coverage" reportu',
        'Sledovanie "Performance" dát',
        'Monitoring 404 chýb',
        'Sledovanie pozícií kľúčových slov'
      ]
    }
  ]);

  const toggleStepCompletion = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  const openGSC = () => {
    window.open('https://search.google.com/search-console', '_blank');
  };

  const copyVerificationTag = () => {
    const tag = '<meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />';
    navigator.clipboard.writeText(tag);
    toast.success('Google verification tag zkopírován');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            GSC Migration Guide
          </span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyVerificationTag}
            >
              <Copy className="w-4 h-4 mr-1" />
              Ověřovací tag
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openGSC}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Otevřít GSC
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {progress}%
          </div>
          <div className="text-gray-600">
            {completedSteps} z {totalSteps} kroků hotových
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      step.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() => toggleStepCompletion(step.id)}
                  >
                    {step.completed && <CheckCircle className="w-4 h-4" />}
                    {!step.completed && <span className="text-xs">{index + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {step.completed && (
                    <Badge variant="default">Hotovo</Badge>
                  )}
                  {step.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={step.action}
                    >
                      Kopírovat
                    </Button>
                  )}
                  {step.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(step.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="ml-9">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Inštrukcie:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  {step.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex">
                      <span className="text-blue-500 mr-2">{idx + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Dôležité poznámky:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Change of Address proces môže trvať 1-2 týždne</li>
            <li>• Redirecty musia fungovať 100% pred spustením</li>
            <li>• Sledujte Index Coverage report denne</li>
            <li>• Zachovajte redirecty minimálne 6 mesiacov</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GSCMigrationGuide;
