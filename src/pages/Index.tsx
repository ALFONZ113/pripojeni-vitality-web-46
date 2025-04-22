
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import ChannelsSection from '../components/ChannelsSection';
import ContactSection from '../components/ContactSection';
import BlogPreview from '../components/BlogPreview';
import { initAnimations } from '../utils/animation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Show notification after a delay
    const timer = setTimeout(() => {
      setShowInfoDialog(true);
      
      // Show a toast notification about PODA service
      toast({
        title: "PODA připojení",
        description: "Autorizovaný obchodní zástupce vám zajistí nejlepší cenu",
        duration: 5000,
      });
    }, 3000);
    
    // Simplified cache busting approach
    const refreshLocalCache = () => {
      console.log('Cache refresh performed at: ' + new Date().toISOString());
      
      // Force browser to refresh local resources without modifying URLs
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      // Add a cache-version meta tag
      const metaCache = document.querySelector('meta[name="cache-version"]');
      if (metaCache) {
        metaCache.setAttribute('content', Date.now().toString());
      }
    };
    
    // Run cache refresh once on load
    refreshLocalCache();
    
    return () => {
      cleanupAnimation();
      clearTimeout(timer);
    };
  }, [toast]);

  return (
    <div className="min-h-screen">
      <Hero />
      <TariffSection />
      <ChannelsSection />
      <ContactSection />
      <BlogPreview />
      
      {/* Info Dialog for mobile */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>PODA připojení</DialogTitle>
          <DialogDescription>
            <p className="mb-4">Jako autorizovaný obchodní zástupce PODA vám nabízím nejrychlejší připojení za nejlepší cenu na trhu.</p>
            <p>Vyzkoušejte spolehlivý internet a získejte chytrou TV zdarma!</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
