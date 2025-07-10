
import { Helmet } from 'react-helmet-async';
import SSRDashboard from '../components/seo/SSRDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SSRMonitor = () => {
  const ssrStatus = {
    isActive: true,
    botDetection: true,
    cacheEnabled: true,
    lastDeployment: new Date().toISOString()
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <Helmet>
        <title>SSR Monitor | PODA Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SSR Monitoring</h1>
          <p className="text-gray-600">Hybrid Server-Side Rendering metriky a výkonnosť</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                SSR Systém Status
                <div className="flex space-x-2">
                  <Badge variant={ssrStatus.isActive ? "default" : "destructive"}>
                    {ssrStatus.isActive ? "Aktívny" : "Neaktívny"}
                  </Badge>
                  <Badge variant={ssrStatus.botDetection ? "default" : "secondary"}>
                    Bot Detection: {ssrStatus.botDetection ? "ON" : "OFF"}
                  </Badge>
                  <Badge variant={ssrStatus.cacheEnabled ? "default" : "secondary"}>
                    Cache: {ssrStatus.cacheEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Posledné nasadenie:</span>
                  <p className="text-gray-600">{new Date(ssrStatus.lastDeployment).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-medium">Edge Functions:</span>
                  <p className="text-gray-600">Netlify Edge Runtime</p>
                </div>
                <div>
                  <span className="font-medium">Cache Strategy:</span>
                  <p className="text-gray-600">Multi-layer CDN + Edge</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SSRDashboard />

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>SSR Konfigurácia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Bot Detection Patterns:</h4>
                  <code className="text-xs bg-gray-100 p-2 block rounded">
                    googlebot, bingbot, seznambot, slurp, duckduckbot, facebookexternalhit
                  </code>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cache Headers:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Statické stránky: 24h cache</li>
                    <li>Blog posty: 1h cache</li>
                    <li>Dynamický obsah: 30min cache</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Pre-rendered Pages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['/', '/blog', '/kontakt', '/tarify', '/internet-ostrava'].map(page => (
                      <Badge key={page} variant="outline">{page}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SSRMonitor;
