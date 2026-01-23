import { Zap, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CreditUsageInfoProps {
  platform: 'facebook' | 'instagram' | 'both';
}

export function CreditUsageInfo({ platform }: CreditUsageInfoProps) {
  // Calculate estimated requests based on platform
  const textRequests = platform === 'both' ? 2 : 1;
  const sceneRequests = platform === 'both' ? 2 : 1;
  const totalRequests = textRequests + sceneRequests;
  
  return (
    <Alert className="border-warning/50 bg-warning/10">
      <Zap className="h-4 w-4 text-warning" />
      <AlertTitle className="text-warning">
        Spotreba AI kreditov
      </AlertTitle>
      <AlertDescription className="text-sm space-y-2">
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Generovanie textu:</span>
            <span className="font-medium">{textRequests} {textRequests === 1 ? 'požiadavka' : 'požiadavky'}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Generovanie scény:</span>
            <span className="font-medium">{sceneRequests} {sceneRequests === 1 ? 'požiadavka' : 'požiadavky'}</span>
          </div>
          <div className="flex justify-between font-medium text-foreground border-t border-border pt-1 mt-1">
            <span>Celkom na príspevok:</span>
            <span className="text-warning">{totalRequests} AI požiadavky</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          💡 Tip: Generuj len pre jednu platformu naraz, aby si ušetril kredity.
        </p>
        
        <a 
          href="https://lovable.dev/settings" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          Skontrolovať využitie kreditov
        </a>
      </AlertDescription>
    </Alert>
  );
}
