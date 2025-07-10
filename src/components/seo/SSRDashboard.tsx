
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SSRMetrics } from '../../utils/ssrOptimization';

interface SSRDashboardProps {
  className?: string;
}

const SSRDashboard = ({ className }: SSRDashboardProps) => {
  const [metrics, setMetrics] = useState<SSRMetrics[]>([]);
  const [summary, setSummary] = useState({
    totalRenders: 0,
    avgRenderTime: 0,
    cacheHitRate: 0,
    botTraffic: 0
  });

  useEffect(() => {
    // Mock data pre development
    const mockMetrics: SSRMetrics[] = [
      { renderTime: 120, cacheHit: false, botDetected: true, timestamp: Date.now() - 3600000, path: '/blog/1' },
      { renderTime: 45, cacheHit: true, botDetected: true, timestamp: Date.now() - 3000000, path: '/' },
      { renderTime: 89, cacheHit: false, botDetected: true, timestamp: Date.now() - 2400000, path: '/blog/2' },
      { renderTime: 23, cacheHit: true, botDetected: false, timestamp: Date.now() - 1800000, path: '/kontakt' },
    ];
    
    setMetrics(mockMetrics);
    
    // Vypočítaj sumár
    const totalRenders = mockMetrics.length;
    const avgRenderTime = mockMetrics.reduce((acc, m) => acc + m.renderTime, 0) / totalRenders;
    const cacheHits = mockMetrics.filter(m => m.cacheHit).length;
    const botRequests = mockMetrics.filter(m => m.botDetected).length;
    
    setSummary({
      totalRenders,
      avgRenderTime: Math.round(avgRenderTime),
      cacheHitRate: Math.round((cacheHits / totalRenders) * 100),
      botTraffic: Math.round((botRequests / totalRenders) * 100)
    });
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Celkové renderovanie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalRenders}</div>
            <p className="text-xs text-muted-foreground">SSR požiadaviek</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Priemerný čas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgRenderTime}ms</div>
            <p className="text-xs text-muted-foreground">render time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.cacheHitRate}%</div>
            <p className="text-xs text-muted-foreground">úspešnosť cache</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bot Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.botTraffic}%</div>
            <p className="text-xs text-muted-foreground">SEO boti</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nedávne SSR požiadavky</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.slice(0, 10).map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{metric.path}</code>
                  {metric.botDetected && <Badge variant="secondary">Bot</Badge>}
                  {metric.cacheHit && <Badge variant="outline">Cache Hit</Badge>}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{metric.renderTime}ms</span>
                  <span>{new Date(metric.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SSRDashboard;
