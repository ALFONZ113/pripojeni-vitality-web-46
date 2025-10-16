
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

const POPUP_DELAY_MS = 20000; // 20 seconds delay before showing popup
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
  
  useEffect(() => {
    // Reset sessionStorage for testing (remove in production)
    if (RESET_FOR_TESTING) {
      sessionStorage.removeItem(POPUP_STORAGE_KEY);
      if (RESET_FOR_TESTING) console.log('PromotionPopup: Testing mode - sessionStorage reset');
    }
    
    // Check if we've shown the popup in this session
    const hasShownInSession = () => {
      const hasShown = sessionStorage.getItem(POPUP_STORAGE_KEY) !== null;
      if (RESET_FOR_TESTING) console.log('PromotionPopup: Has shown in session:', hasShown);
      return hasShown;
    };

    const showPopup = () => {
      if (!hasShownInSession() && !isOpen) {
        if (RESET_FOR_TESTING) console.log('PromotionPopup: Showing popup');
        setIsOpen(true);
        // Save that we've shown the popup in this session
        sessionStorage.setItem(POPUP_STORAGE_KEY, 'shown');
      }
    };
    
    // Show popup after delay if not shown in this session
    if (!hasShownInSession()) {
      if (RESET_FOR_TESTING) console.log('PromotionPopup: Setting timer for', POPUP_DELAY_MS, 'ms');
      const timer = setTimeout(showPopup, POPUP_DELAY_MS);
      
      // Exit intent detection
      const handleMouseLeave = (e: MouseEvent) => {
        // Only trigger if mouse leaves from the top of the window (user wants to close tab/navigate away)
        if (e.clientY <= 0 && e.relatedTarget === null) {
          showPopup();
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (RESET_FOR_TESTING) console.log('PromotionPopup: Cleaning up');
        clearTimeout(timer);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else {
      if (RESET_FOR_TESTING) console.log('PromotionPopup: Already shown in this session');
    }
  }, []); // Run only once on mount
  
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
    // Save that we've interacted with the popup in this session
    sessionStorage.setItem(POPUP_STORAGE_KEY, 'closed');
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
        
        toast({
          title: "Děkujeme za Váš zájem",
          description: "Brzy Vás budeme kontaktovat ohledně nabídky prvního měsíce zdarma.",
          variant: "default"
        });
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          // Reset success state after popup closes
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
        try { sessionStorage.setItem(POPUP_STORAGE_KEY, 'closed'); } catch {}
      }
    }}>
      <DialogContent showClose={false} className="sm:max-w-lg rounded-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 backdrop-blur-xl shadow-2xl overflow-hidden overflow-y-hidden overflow-x-hidden max-h-none">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-poda-blue/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-poda-orange/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <DialogClose
          type="button"
          className="absolute right-4 top-4 z-50 pointer-events-auto rounded-full bg-white/80 backdrop-blur-sm p-2 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-poda-blue focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-gray-700" />
          <span className="sr-only">Zavřít</span>
        </DialogClose>
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-poda-blue to-poda-blue-light bg-clip-text text-transparent leading-tight">
            První měsíc ZDARMA!
          </DialogTitle>
          <div className="inline-block mt-2">
            <span className="text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full shadow-lg animate-pulse-slow">
              Len do {promotionEndDate}!
            </span>
          </div>
          <DialogDescription className="text-base text-gray-700 mt-3 leading-relaxed">
            Potřebujete připojit internet a TV nebo změnit stávajícího poskytovatele?
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative z-10 bg-gradient-to-br from-poda-blue/10 via-white/50 to-poda-orange/10 backdrop-blur-sm p-6 my-6 rounded-2xl border border-white/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/5 to-poda-orange/5 rounded-2xl" />
          <p className="relative font-semibold text-center text-poda-blue text-lg leading-relaxed">
            Objednejte si PODA internet a TV a získejte{' '}
            <span className="bg-gradient-to-r from-poda-orange to-poda-orange-light bg-clip-text text-transparent font-extrabold text-xl">
              první měsíc ZDARMA
            </span>!
          </p>
          <div className="relative mt-3 pt-3 border-t border-poda-blue/20">
            <p className="font-semibold text-center text-poda-blue text-lg">
              +{' '}
              <span className="bg-gradient-to-r from-poda-orange to-poda-orange-light bg-clip-text text-transparent font-extrabold text-xl">
                Bezplatná instalace
              </span>
            </p>
          </div>
        </div>
        
        {isSuccess ? (
          <div className="relative z-10 flex items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-lg">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <Check className="h-6 w-6 text-white" />
            </div>
            <p className="text-green-700 font-semibold text-lg">Děkujeme, brzy Vás budeme kontaktovat!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <div className="flex flex-col space-y-3">
              <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                Zadejte své telefonní číslo a my se Vám ozveme
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-poda-blue/60 h-5 w-5" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Telefonní číslo"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 border-2 border-poda-blue/20 focus:border-poda-blue bg-white/80 backdrop-blur-sm rounded-xl shadow-sm transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-6 bg-gradient-to-r from-poda-orange to-poda-orange-light hover:from-poda-orange/90 hover:to-poda-orange-light/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-lg">
              Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA a nabídky prvního měsíce zdarma.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PromotionPopup;
