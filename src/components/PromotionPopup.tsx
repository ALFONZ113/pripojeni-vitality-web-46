
import { useState, useEffect } from 'react';
import { Check, Phone, Loader2, X } from 'lucide-react';
import { sendContactFormEmail } from '../utils/emailService';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePopupTriggers } from '@/hooks/use-popup-triggers';
import { 
  trackPopupImpression, 
  trackPopupConversion, 
  trackPopupClose, 
  getPopupVariant 
} from '@/utils/popupTracking';

const POPUP_STORAGE_KEY = 'poda_promotion_popup_session';
const RESET_FOR_TESTING = false; // Set to true only for testing

// Function to calculate promotion end date automatically
const getPromotionEndDate = () => {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();
  
  let targetDate: Date;
  
  if (currentDay <= 14) {
    // First half of month (1-14): show 15th of current month
    targetDate = new Date(currentYear, currentMonth, 15);
  } else {
    // Second half of month (15-end): show last day of current month
    // Get the first day of next month, then subtract one day to get last day of current month
    targetDate = new Date(currentYear, currentMonth + 1, 0);
  }
  
  // Format as DD.MM.YYYY
  const day = targetDate.getDate().toString().padStart(2, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const year = targetDate.getFullYear();
  
  return `${day}.${month}.${year}`;
};

const PromotionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [promotionEndDate] = useState(getPromotionEndDate());
  const [variant] = useState(() => getPopupVariant());
  
  // Use intelligent popup triggers hook
  const { shouldShow, triggerSource, isMobile } = usePopupTriggers({
    scrollThreshold: 50, // 50% scroll
    timeDelay: 60000, // 60 seconds
    enableExitIntent: true, // Desktop only
    enableEngagement: true // Track clicks on tariffs/TV
  });
  
  useEffect(() => {
    // Reset sessionStorage for testing (remove in production)
    if (RESET_FOR_TESTING) {
      sessionStorage.removeItem(POPUP_STORAGE_KEY);
      console.log('PromotionPopup: Testing mode - sessionStorage reset');
    }
  }, []);
  
  // Show popup when triggers are met
  useEffect(() => {
    const hasShownInSession = sessionStorage.getItem(POPUP_STORAGE_KEY) !== null;
    
    if (shouldShow && !hasShownInSession && !isOpen) {
      console.log('PromotionPopup: Showing popup via trigger:', triggerSource);
      setIsOpen(true);
      sessionStorage.setItem(POPUP_STORAGE_KEY, 'shown');
      
      // Track popup impression
      if (triggerSource) {
        trackPopupImpression(triggerSource, variant);
      }
    }
  }, [shouldShow, triggerSource, isOpen, variant]);
  
  // Add manual reset function for testing (only in development)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).resetPromotionPopup = () => {
        sessionStorage.removeItem(POPUP_STORAGE_KEY);
        setIsOpen(false);
        console.log('PromotionPopup: Manual reset - popup can be triggered again');
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).resetPromotionPopup;
      }
    };
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(POPUP_STORAGE_KEY, 'closed');
    
    // Track popup close
    trackPopupClose(triggerSource, variant);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 9) {
      toast({
        title: "Neplatné telefonní číslo",
        description: "Prosím zadejte platné telefonní číslo pro zpětné volání.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the existing email service to send the callback request
      const emailSent = await sendContactFormEmail({
        name: "Promo - Žádost o zpětné volání",
        email: "promo@popri.cz", // Dummy email as required by the function
        phone: phoneNumber,
        message: "Žádost o zpětné volání z promo popupu - První měsíc zdarma. Telefonní číslo: " + phoneNumber
      });
      
      if (emailSent) {
        setIsSuccess(true);
        setPhoneNumber('');
        
        // Track conversion
        if (triggerSource) {
          trackPopupConversion(triggerSource, variant, phoneNumber);
        }
        
        toast({
          title: "Děkujeme za Váš zájem",
          description: "Brzy Vás budeme kontaktovat ohledně nabídky prvního měsíce zdarma.",
          variant: "default"
        });
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => {
            setIsSuccess(false);
          }, 300);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting promo callback request:", error);
      toast({
        title: "Chyba při odeslání",
        description: "Nepodařilo se odeslat žádost o zpětné volání. Zkuste to prosím později.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        try { 
          sessionStorage.setItem(POPUP_STORAGE_KEY, 'closed');
          trackPopupClose(triggerSource, variant);
        } catch {}
      }
    }}>
      <DialogContent showClose={false} className="sm:max-w-lg rounded-2xl border border-border/30 bg-card backdrop-blur-xl shadow-glow overflow-hidden overflow-y-hidden overflow-x-hidden max-h-none">
        {/* Decorative gradient orbs - gold themed */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <DialogClose
          type="button"
          className="absolute right-4 top-4 z-50 pointer-events-auto rounded-full bg-secondary backdrop-blur-sm p-2 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-muted hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-foreground" />
          <span className="sr-only">Zavřít</span>
        </DialogClose>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold leading-tight">
            První měsíc ZDARMA!
          </DialogTitle>
          <div className="inline-block mt-2">
            <span className="text-sm font-bold text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg animate-pulse-slow">
              Len do {promotionEndDate}!
            </span>
          </div>
          <DialogDescription className="text-base text-muted-foreground mt-3 leading-relaxed">
            Potřebujete připojit internet a TV nebo změnit stávajícího poskytovatele?
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative z-10 bg-secondary/50 backdrop-blur-sm p-6 my-6 rounded-2xl border border-border/30 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl" />
          <p className="relative font-semibold text-center text-foreground text-lg leading-relaxed">
            Objednejte si PODA internet a TV a získejte{' '}
            <span className="text-gradient-gold font-extrabold text-xl">
              první měsíc ZDARMA
            </span>!
          </p>
          <div className="relative mt-3 pt-3 border-t border-border/30">
            <p className="font-semibold text-center text-foreground text-lg">
              +{' '}
              <span className="text-gradient-gold font-extrabold text-xl">
                Bezplatná instalace
              </span>
            </p>
          </div>
        </div>
        
        {isSuccess ? (
          <div className="relative z-10 flex items-center justify-center bg-primary/10 p-6 rounded-2xl border border-primary/30 shadow-lg">
            <div className="bg-primary rounded-full p-2 mr-3">
              <Check className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="text-foreground font-semibold text-lg">Děkujeme, brzy Vás budeme kontaktovat!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <div className="flex flex-col space-y-3">
              <label htmlFor="phoneNumber" className="text-sm font-semibold text-foreground">
                Zadejte své telefonní číslo a my se Vám ozveme
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Telefonní číslo"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 border-2 border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary backdrop-blur-sm rounded-xl shadow-sm transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gold"
                  className="h-12 px-6 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Odesílání...
                    </>
                  ) : (
                    'Zavolejte mi'
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-lg">
              Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA a nabídky prvního měsíce zdarma.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PromotionPopup;
