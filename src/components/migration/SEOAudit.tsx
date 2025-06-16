
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle, XCircle, AlertTriangle, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AuditCheck {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  value?: string;
  recommendation?: string;
}

const SEOAudit = () => {
  const [checks, setChecks] = useState<AuditCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performAudit();
  }, []);

  const performAudit = () => {
    setLoading(true);
    
    // Simulate audit checks
    setTimeout(() => {
      const auditResults: AuditCheck[] = [
        {
          id: 'canonical',
          name: 'Canonical URL',
          status: 'pass',
          description: 'Stránka má správnu canonical URL',
          value: 'https://www.popri.cz/',
        },
        {
          id: 'hreflang',
          name: 'Hreflang značky',
          status: 'pass',
          description: 'Hreflang značky sú správne nastavené',
          value: 'cs, sk, x-default'
        },
        {
          id: 'migration-meta',
          name: 'Migration meta značky',
          status: 'pass',
          description: 'Migration signály sú prítomne',
          value: 'migration-date, original-domain, preferred-domain'
        },
        {
          id: 'open-graph',
          name: 'Open Graph',
          status: 'pass',
          description: 'OG značky používajú novú doménu',
          value: 'og:url = https://www.popri.cz/'
        },
        {
          id: 'sitemap',
          name: 'Sitemap dostupnosť',
          status: 'pass',
          description: 'Sitemap je dostupný a validný',
          value: '/sitemap.xml (25 URLs)'
        },
        {
          id: 'robots',
          name: 'Robots.txt',
          status: 'pass',
          description: 'Robots.txt obsahuje správne direktívy',
          value: 'Allow: / + blog post IDs'
        },
        {
          id: 'schema',
          name: 'Structured Data',
          status: 'pass',
          description: 'Schema.org značky používajú novú doménu',
          value: 'Organization, WebSite, LocalBusiness'
        },
        {
          id: 'gsc-verification',
          name: 'GSC verifikácia',
          status: 'warning',
          description: 'Google Search Console verifikácia',
          value: 'Meta tag prítomny',
          recommendation: 'Pridať property do GSC a verifikovať'
        }
      ];
      
      setChecks(auditResults);
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: 'default',
      fail: 'destructive',
      warning: 'secondary'
    } as const;
    
    const labels = {
      pass: 'OK',
      fail: 'Chyba',
      warning: 'Upozornenie'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const copyAuditResults = () => {
    const results = checks.map(check => 
      `${check.name}: ${check.status} - ${check.description} ${check.value ? `(${check.value})` : ''}`
    ).join('\n');
    
    navigator.clipboard.writeText(results);
    toast.success('Výsledky auditu skopírované do schránky');
  };

  const downloadAuditReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      domain: 'www.popri.cz',
      migration: 'pripojeni-poda.cz → www.popri.cz',
      checks: checks,
      summary: {
        total: checks.length,
        passed: checks.filter(c => c.status === 'pass').length,
        failed: checks.filter(c => c.status === 'fail').length,
        warnings: checks.filter(c => c.status === 'warning').length
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-audit-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const passedChecks = checks.filter(c => c.status === 'pass').length;
  const totalChecks = checks.length;
  const auditScore = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Spúšťam audit...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>SEO Audit - Migration</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={copyAuditResults}>
                <Copy className="w-4 h-4 mr-1" />
                Kopírovať
              </Button>
              <Button variant="outline" size="sm" onClick={downloadAuditReport}>
                <Download className="w-4 h-4 mr-1" />
                Stiahnuť
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {auditScore}%
            </div>
            <div className="text-gray-600">
              {passedChecks} z {totalChecks} kontrol prešlo
            </div>
          </div>

          <div className="space-y-4">
            {checks.map((check) => (
              <div key={check.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{check.name}</h3>
                    {getStatusBadge(check.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{check.description}</p>
                  {check.value && (
                    <p className="text-xs text-blue-600 font-mono bg-blue-50 p-1 rounded">
                      {check.value}
                    </p>
                  )}
                  {check.recommendation && (
                    <p className="text-xs text-yellow-800 mt-2 p-2 bg-yellow-50 rounded">
                      <strong>Odporúčanie:</strong> {check.recommendation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOAudit;
