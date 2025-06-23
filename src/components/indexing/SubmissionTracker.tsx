
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  History, 
  ExternalLink, 
  CheckCircle, 
  Clock,
  Download,
  Share
} from 'lucide-react';
import { incrementalSitemapManager } from '../../utils/incrementalSitemapManager';
import { toast } from '../ui/use-toast';

interface SubmissionHistoryEntry {
  urls: string[];
  submittedAt: string;
  count: number;
}

const SubmissionTracker = () => {
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSubmissionHistory = () => {
    setIsLoading(true);
    try {
      const history = incrementalSitemapManager.getSubmissionHistory();
      setSubmissionHistory(history);
    } catch (error) {
      console.error('Error loading submission history:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať históriu odoslaní.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissionHistory();
  }, []);

  const handleExportHistory = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalSubmissions: submissionHistory.length,
      totalUrls: submissionHistory.reduce((sum, entry) => sum + entry.count, 0),
      submissions: submissionHistory
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submission-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "História exportovaná",
      description: "História odoslaní bola úspešne exportovaná."
    });
  };

  const handleCopyUrls = (urls: string[]) => {
    const urlsText = urls.join('\n');
    navigator.clipboard.writeText(urlsText).then(() => {
      toast({
        title: "URL-ky skopírované",
        description: `${urls.length} URL-iek bolo skopírovaných do schránky.`
      });
    }).catch(() => {
      toast({
        title: "Chyba",
        description: "Nepodarilo sa skopírovať URL-ky.",
        variant: "destructive"
      });
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('sk-SK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSubmittedUrls = submissionHistory.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Submission Tracker
          </h3>
          <p className="text-gray-600">
            História odoslaní do Google Search Console
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSubmissionHistory} variant="outline" size="sm" disabled={isLoading}>
            <History className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Obnoviť
          </Button>
          {submissionHistory.length > 0 && (
            <Button onClick={handleExportHistory} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Celkom odoslaní</p>
                <p className="text-2xl font-bold text-blue-600">{submissionHistory.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Celkom URL-iek</p>
                <p className="text-2xl font-bold text-green-600">{totalSubmittedUrls}</p>
              </div>
              <ExternalLink className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Posledné odoslanie</p>
                <p className="text-sm font-semibold text-gray-900">
                  {submissionHistory.length > 0 
                    ? formatDate(submissionHistory[0].submittedAt).split(' ')[0]
                    : 'Žiadne'
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            História odoslaní
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submissionHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Žiadne odoslania zatiaľ</p>
              <p className="text-sm">História sa zobrazí po prvom odoslaní do GSC</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissionHistory.map((entry, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {entry.count} URL{entry.count !== 1 ? 's' : ''}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {formatDate(entry.submittedAt)}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleCopyUrls(entry.urls)}
                      variant="ghost"
                      size="sm"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Kopírovať URL-ky
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    {entry.urls.slice(0, 3).map((url, urlIndex) => (
                      <div key={urlIndex} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded">
                        {url}
                      </div>
                    ))}
                    {entry.urls.length > 3 && (
                      <div className="text-sm text-gray-500 px-3 py-1">
                        ... a ďalších {entry.urls.length - 3} URL-iek
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Tip:</strong> Po odoslaní sitemap do Google Search Console môže trvať 2-7 dní, 
          kým sa nové stránky začnú indexovať. Pravidelne kontrolujte GSC Coverage report 
          pre aktualizácie stavu indexovania.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SubmissionTracker;
