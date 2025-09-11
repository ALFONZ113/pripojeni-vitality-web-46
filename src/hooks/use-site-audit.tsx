import { useState, useCallback, useEffect } from 'react';
import { runSiteAudit, type SiteAuditReport, type PageAnalysis } from '../utils/siteAudit';
import { 
  fixAllSiteIssues, 
  fixDuplicateContent, 
  fixRedirectsInSitemap, 
  fixParameterizedUrls,
  type BatchFixResult 
} from '../utils/automaticFixes';

interface UseSiteAuditReturn {
  auditReport: SiteAuditReport | null;
  isLoading: boolean;
  isFixing: boolean;
  error: string | null;
  runAudit: () => Promise<void>;
  fixAllIssues: () => Promise<void>;
  fixSpecificIssue: (type: 'duplicates' | 'redirects' | 'parameters') => Promise<void>;
  lastFixResult: BatchFixResult | null;
  clearError: () => void;
}

export const useSiteAudit = (): UseSiteAuditReturn => {
  const [auditReport, setAuditReport] = useState<SiteAuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [lastFixResult, setLastFixResult] = useState<BatchFixResult | null>(null);

  // Načítaj posledný audit z localStorage pri mount
  useEffect(() => {
    const savedAudit = localStorage.getItem('site-audit-report');
    if (savedAudit) {
      try {
        const report = JSON.parse(savedAudit);
        // Kontrola že dáta nie sú príliš staré (max 24 hodín)
        const reportDate = new Date(report.lastAuditDate);
        const now = new Date();
        const hoursDiff = (now.getTime() - reportDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setAuditReport(report);
        }
      } catch (err) {
        console.error('Chyba pri načítaní uloženého auditu:', err);
      }
    }
  }, []);

  const runAudit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Spúšťam site audit...');
      const report = await runSiteAudit();
      
      setAuditReport(report);
      
      // Ulož do localStorage
      localStorage.setItem('site-audit-report', JSON.stringify(report));
      
      console.log('✅ Audit dokončený:', {
        totalPages: report.totalPages,
        issues: report.criticalIssues,
        recommendations: report.fixableIssues
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Neznáma chyba pri audite';
      setError(errorMessage);
      console.error('❌ Chyba pri audite:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fixAllIssues = useCallback(async () => {
    if (!auditReport) {
      setError('Najprv spustite audit');
      return;
    }

    setIsFixing(true);
    setError(null);

    try {
      console.log('🔧 Spúšťam automatické opravy všetkých problémov...');
      
      const fixResult = await fixAllSiteIssues(auditReport.pages);
      setLastFixResult(fixResult);
      
      // Po opravách spusti nový audit aby sa aktualizovali výsledky
      await runAudit();
      
      console.log('✅ Automatické opravy dokončené:', fixResult);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Chyba pri automatických opravách';
      setError(errorMessage);
      console.error('❌ Chyba pri opravách:', err);
    } finally {
      setIsFixing(false);
    }
  }, [auditReport, runAudit]);

  const fixSpecificIssue = useCallback(async (type: 'duplicates' | 'redirects' | 'parameters') => {
    if (!auditReport) {
      setError('Najprv spustite audit');
      return;
    }

    setIsFixing(true);
    setError(null);

    try {
      let fixResult;
      
      switch (type) {
        case 'duplicates':
          console.log('🔧 Opravujem duplikátny obsah...');
          const duplicateResults = await fixDuplicateContent(auditReport.pages);
          fixResult = {
            totalProcessed: duplicateResults.length,
            successfulFixes: duplicateResults.filter(r => r.success).length,
            failedFixes: duplicateResults.filter(r => !r.success).length,
            results: duplicateResults,
            updatedSitemap: false,
            updatedRedirects: false
          };
          break;
          
        case 'redirects':
          console.log('🔧 Opravujem redirecty v sitemap...');
          const redirectResult = await fixRedirectsInSitemap(auditReport.pages);
          fixResult = {
            totalProcessed: 1,
            successfulFixes: redirectResult.success ? 1 : 0,
            failedFixes: redirectResult.success ? 0 : 1,
            results: [redirectResult],
            updatedSitemap: true,
            updatedRedirects: false
          };
          break;
          
        case 'parameters':
          console.log('🔧 Opravujem parametrizované URL...');
          const paramResult = await fixParameterizedUrls(auditReport.pages);
          fixResult = {
            totalProcessed: 1,
            successfulFixes: paramResult.success ? 1 : 0,
            failedFixes: paramResult.success ? 0 : 1,
            results: [paramResult],
            updatedSitemap: true,
            updatedRedirects: false
          };
          break;
      }
      
      setLastFixResult(fixResult);
      
      // Po opravách spusti nový audit
      await runAudit();
      
      console.log(`✅ Oprava ${type} dokončená:`, fixResult);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Chyba pri oprave ${type}`;
      setError(errorMessage);
      console.error(`❌ Chyba pri oprave ${type}:`, err);
    } finally {
      setIsFixing(false);
    }
  }, [auditReport, runAudit]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    auditReport,
    isLoading,
    isFixing,
    error,
    runAudit,
    fixAllIssues,
    fixSpecificIssue,
    lastFixResult,
    clearError
  };
};