/**
 * Canonical URL Diagnostic Tool
 * Helps identify pages without proper canonical tags
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';
import { generateCanonicalUrlStrict, shouldIndexPage, getRobotsTag } from '@/utils/canonicalUrlFixer';

interface DiagnosticResult {
  url: string;
  hasCanonical: boolean;
  canonicalValue: string | null;
  isCorrect: boolean;
  shouldIndex: boolean;
  robotsTag: string;
  issues: string[];
}

const CanonicalDiagnostic = () => {
  const [testUrl, setTestUrl] = useState('');
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const commonPages = [
    '/',
    '/tarify',
    '/iptv',
    '/blog',
    '/kontakt',
    '/internet-ostrava',
    '/internet-karvina',
    '/internet-havirov',
    '/internet-bohumin',
    '/internet-poruba',
    '/ochrana-soukromi',
    '/obchodni-podminky',
    '/cookies'
  ];

  const checkUrl = async (url: string): Promise<DiagnosticResult> => {
    const fullUrl = url.startsWith('http') ? url : `https://www.popri.cz${url}`;
    
    try {
      const response = await fetch(fullUrl);
      const html = await response.text();
      
      // Parse HTML to find canonical tag
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const canonicalTag = doc.querySelector('link[rel="canonical"]');
      
      const canonicalValue = canonicalTag?.getAttribute('href') || null;
      const expectedCanonical = generateCanonicalUrlStrict(new URL(fullUrl).pathname);
      
      const issues: string[] = [];
      
      if (!canonicalTag) {
        issues.push('Chýba canonical tag');
      } else if (canonicalValue !== expectedCanonical) {
        issues.push(`Nesprávna canonical URL: očakávané "${expectedCanonical}", nájdené "${canonicalValue}"`);
      }
      
      // Check robots tag
      const robotsTag = doc.querySelector('meta[name="robots"]')?.getAttribute('content');
      if (!robotsTag) {
        issues.push('Chýba robots meta tag');
      }
      
      return {
        url: fullUrl,
        hasCanonical: !!canonicalTag,
        canonicalValue,
        isCorrect: canonicalValue === expectedCanonical,
        shouldIndex: shouldIndexPage(new URL(fullUrl).pathname),
        robotsTag: robotsTag || 'N/A',
        issues
      };
    } catch (error) {
      return {
        url: fullUrl,
        hasCanonical: false,
        canonicalValue: null,
        isCorrect: false,
        shouldIndex: false,
        robotsTag: 'Error',
        issues: [`Chyba načítania: ${error instanceof Error ? error.message : 'Unknown'}`]
      };
    }
  };

  const checkAllPages = async () => {
    setIsChecking(true);
    setResults([]);
    
    const allResults: DiagnosticResult[] = [];
    
    for (const page of commonPages) {
      const result = await checkUrl(page);
      allResults.push(result);
      setResults([...allResults]); // Update UI progressively
    }
    
    setIsChecking(false);
  };

  const checkSingleUrl = async () => {
    if (!testUrl) return;
    
    setIsChecking(true);
    const result = await checkUrl(testUrl);
    setResults([result]);
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diagnostika Canonical URL
          </h1>
          <p className="text-lg text-gray-600">
            Nástroj na identifikáciu stránok bez správneho canonical tagu
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Kontrola konkrétnej URL</CardTitle>
              <CardDescription>
                Zadajte cestu alebo plnú URL pre kontrolu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="/tarify alebo https://www.popri.cz/tarify"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkSingleUrl()}
                />
                <Button 
                  onClick={checkSingleUrl}
                  disabled={isChecking || !testUrl}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Skontrolovať
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontrola všetkých hlavných stránok</CardTitle>
              <CardDescription>
                Automatická kontrola {commonPages.length} najdôležitejších stránok
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={checkAllPages}
                disabled={isChecking}
                variant="secondary"
              >
                {isChecking ? 'Kontrolujem...' : 'Spustiť kompletnú diagnostiku'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Výsledky ({results.length})
            </h2>
            
            {results.map((result, index) => (
              <Card key={index} className={result.issues.length > 0 ? 'border-red-300' : 'border-green-300'}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {result.issues.length === 0 ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {result.url}
                        </code>
                      </div>
                      
                      <div className="ml-7 space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">Canonical: </span>
                          {result.hasCanonical ? (
                            <code className="text-xs bg-green-50 px-2 py-1 rounded text-green-800">
                              {result.canonicalValue}
                            </code>
                          ) : (
                            <span className="text-red-600">Chýba</span>
                          )}
                        </div>
                        
                        <div>
                          <span className="font-semibold">Robots: </span>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {result.robotsTag}
                          </code>
                        </div>
                        
                        <div>
                          <span className="font-semibold">Má byť indexované: </span>
                          <span className={result.shouldIndex ? 'text-green-600' : 'text-orange-600'}>
                            {result.shouldIndex ? 'Áno' : 'Nie'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {result.issues.length > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <AlertDescription>
                        <strong className="text-red-900">Problémy:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-red-800">
                          {result.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isChecking && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanonicalDiagnostic;
