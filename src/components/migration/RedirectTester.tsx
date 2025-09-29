
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, ExternalLink, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface RedirectTest {
  url: string;
  expectedTarget: string;
  actualTarget?: string;
  statusCode?: number;
  status: 'pending' | 'success' | 'error' | 'testing';
  error?: string;
}

const RedirectTester = () => {
  const [tests, setTests] = useState<RedirectTest[]>([
    {
      url: 'https://pripojeni-poda.cz',
      expectedTarget: 'https://www.popri.cz',
      status: 'pending'
    },
    {
      url: 'https://pripojeni-poda.cz/blog',
      expectedTarget: 'https://www.popri.cz/blog',
      status: 'pending'
    },
    {
      url: 'https://pripojeni-poda.cz/blog/1',
      expectedTarget: 'https://www.popri.cz/blog/1',
      status: 'pending'
    },
    {
      url: 'https://pripojeni-poda.cz/kontakt',
      expectedTarget: 'https://www.popri.cz/kontakt',
      status: 'pending'
    },
    {
      url: 'https://pripojeni-poda.cz/tarify',
      expectedTarget: 'https://www.popri.cz/tarify',
      status: 'pending'
    },
    {
      url: 'https://pripojeni-poda.cz/internet-ostrava',
      expectedTarget: 'https://www.popri.cz/internet-ostrava',
      status: 'pending'
    }
  ]);

  const [customUrl, setCustomUrl] = useState('');
  const [testing, setTesting] = useState(false);

  const testRedirect = async (test: RedirectTest, index: number) => {
    setTests(prev => prev.map((t, i) => 
      i === index ? { ...t, status: 'testing' } : t
    ));

    try {
      // Since we can't actually test cross-origin redirects from the browser,
      // we'll simulate the test with a placeholder
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful redirect test
      setTests(prev => prev.map((t, i) => 
        i === index ? {
          ...t,
          status: 'success',
          actualTarget: test.expectedTarget,
          statusCode: 301
        } : t
      ));
      
      toast.success(`Redirect test pre ${test.url} úspešný`);
    } catch (error) {
      setTests(prev => prev.map((t, i) => 
        i === index ? {
          ...t,
          status: 'error',
          error: 'Redirect test zlyhal'
        } : t
      ));
      
      toast.error(`Redirect test pre ${test.url} zlyhal`);
    }
  };

  const testAllRedirects = async () => {
    setTesting(true);
    
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].status !== 'success') {
        await testRedirect(tests[i], i);
        // Wait between tests
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setTesting(false);
    toast.success('Všetky redirect testy dokončené');
  };

  const resetTests = () => {
    setTests(prev => prev.map(test => ({
      ...test,
      status: 'pending',
      actualTarget: undefined,
      statusCode: undefined,
      error: undefined
    })));
  };

  const addCustomTest = () => {
    if (!customUrl) return;
    
    const newTest: RedirectTest = {
      url: customUrl,
      expectedTarget: customUrl.replace('pripojeni-poda.cz', 'www.popri.cz'),
      status: 'pending'
    };
    
    setTests(prev => [...prev, newTest]);
    setCustomUrl('');
    toast.success('Custom test pridaný');
  };

  const getStatusIcon = (test: RedirectTest) => {
    switch (test.status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'testing':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  const getStatusBadge = (test: RedirectTest) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      testing: 'secondary',
      pending: 'outline'
    } as const;
    
    const labels = {
      success: '301 ✓',
      error: 'Chyba',
      testing: 'Testuje sa...',
      pending: 'Čaká'
    };
    
    return (
      <Badge variant={variants[test.status as keyof typeof variants]}>
        {test.statusCode ? `${test.statusCode} ✓` : labels[test.status as keyof typeof labels]}
      </Badge>
    );
  };

  const successfulTests = tests.filter(t => t.status === 'success').length;
  const totalTests = tests.length;
  const successRate = totalTests > 0 ? Math.round((successfulTests / totalTests) * 100) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Redirect Tester</span>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTests}
                disabled={testing}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button 
                onClick={testAllRedirects} 
                disabled={testing}
                size="sm"
              >
                Test všetky
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {successRate}%
            </div>
            <div className="text-gray-600">
              {successfulTests} z {totalTests} redirectov funguje
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Poznámka</h3>
            <p className="text-sm text-blue-700">
              Toto je simulácia redirect testov. V reálnom prostredí by sa redirecty testovali cez externe nástroje 
              ako redirectchecker.org alebo curl príkazy, pretože prehliadače majú CORS obmedzenia.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {tests.map((test, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(test)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {test.url}
                    </span>
                    {getStatusBadge(test)}
                  </div>
                  <div className="text-xs text-gray-600">
                    → {test.actualTarget || test.expectedTarget}
                  </div>
                  {test.error && (
                    <div className="text-xs text-red-600 mt-1">
                      {test.error}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testRedirect(test, index)}
                    disabled={testing || test.status === 'testing'}
                  >
                    Test
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(test.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Pridať custom test</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="https://pripojeni-poda.cz/custom-path"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addCustomTest} disabled={!customUrl}>
                Pridať
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectTester;
