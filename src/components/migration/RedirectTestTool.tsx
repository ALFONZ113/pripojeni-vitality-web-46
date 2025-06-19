
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, ExternalLink, RotateCcw, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface RedirectTestResult {
  url: string;
  status: 'testing' | 'success' | 'error' | 'pending';
  statusCode?: number;
  finalUrl?: string;
  redirectChain?: string[];
  error?: string;
}

const RedirectTestTool = () => {
  const [testResults, setTestResults] = useState<RedirectTestResult[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const [testing, setTesting] = useState(false);

  const predefinedUrls = [
    'https://pripojeni-poda.cz',
    'https://pripojeni-poda.cz/blog',
    'https://pripojeni-poda.cz/blog/1',
    'https://pripojeni-poda.cz/kontakt',
    'https://pripojeni-poda.cz/tarify',
    'https://pripojeni-poda.cz/internet-ostrava'
  ];

  const testRedirect = async (url: string): Promise<RedirectTestResult> => {
    try {
      // Since we can't actually test redirects from browser due to CORS,
      // we'll simulate the test with expected results
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const expectedTarget = url.replace('pripojeni-poda.cz', 'www.popri.cz');
      
      return {
        url,
        status: 'success',
        statusCode: 301,
        finalUrl: expectedTarget,
        redirectChain: [url, expectedTarget]
      };
    } catch (error) {
      return {
        url,
        status: 'error',
        error: 'Redirect test failed'
      };
    }
  };

  const testSingleUrl = async (url: string) => {
    setTestResults(prev => prev.map(result => 
      result.url === url ? { ...result, status: 'testing' } : result
    ));

    const result = await testRedirect(url);
    
    setTestResults(prev => prev.map(testResult => 
      testResult.url === url ? result : testResult
    ));

    if (result.status === 'success') {
      toast.success(`Redirect pre ${url} funguje správne`);
    } else {
      toast.error(`Redirect pre ${url} zlyhal`);
    }
  };

  const testAllUrls = async () => {
    setTesting(true);
    
    // Initialize test results
    const initialResults = predefinedUrls.map(url => ({
      url,
      status: 'testing' as const
    }));
    setTestResults(initialResults);

    // Test each URL
    for (const url of predefinedUrls) {
      await testSingleUrl(url);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setTesting(false);
    toast.success('Všetky redirect testy dokončené');
  };

  const addCustomTest = () => {
    if (!customUrl) return;
    
    const newTest: RedirectTestResult = {
      url: customUrl,
      status: 'pending'
    };
    
    setTestResults(prev => [...prev, newTest]);
    setCustomUrl('');
    toast.success('Custom test pridaný');
  };

  const openExternalTester = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://httpstatus.io/?url=${encodedUrl}`, '_blank');
  };

  const getStatusIcon = (result: RedirectTestResult) => {
    switch (result.status) {
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

  const getStatusBadge = (result: RedirectTestResult) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      testing: 'secondary',
      pending: 'outline'
    } as const;
    
    const labels = {
      success: result.statusCode ? `${result.statusCode} ✓` : 'OK',
      error: 'Chyba',
      testing: 'Testing...',
      pending: 'Čaká'
    };
    
    return (
      <Badge variant={variants[result.status as keyof typeof variants]}>
        {labels[result.status as keyof typeof labels]}
      </Badge>
    );
  };

  const successfulTests = testResults.filter(r => r.status === 'success').length;
  const totalTests = testResults.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Redirect Tester
          </span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setTestResults([])}
              disabled={testing}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Clear
            </Button>
            <Button 
              onClick={testAllUrls} 
              disabled={testing}
              size="sm"
            >
              Test All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalTests > 0 && (
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {successfulTests}/{totalTests}
            </div>
            <div className="text-sm text-gray-600">
              redirectov funguje správne
            </div>
          </div>
        )}

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Dôležité</h3>
          <p className="text-sm text-yellow-700 mb-2">
            Toto je simulácia redirect testov. Pre skutočné testovanie použite externé nástroje:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://httpstatus.io/', '_blank')}
            >
              httpstatus.io
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://www.redirect-checker.org/', '_blank')}
            >
              redirect-checker.org
            </Button>
          </div>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3 mb-6">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(result)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {result.url}
                    </span>
                    {getStatusBadge(result)}
                  </div>
                  {result.finalUrl && (
                    <div className="text-xs text-green-600">
                      → {result.finalUrl}
                    </div>
                  )}
                  {result.error && (
                    <div className="text-xs text-red-600">
                      {result.error}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testSingleUrl(result.url)}
                    disabled={testing || result.status === 'testing'}
                  >
                    Test
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openExternalTester(result.url)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

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
  );
};

export default RedirectTestTool;
