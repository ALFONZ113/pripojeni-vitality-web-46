
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

const PromotionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogClose 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" 
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Zavřít</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-2xl text-poda-blue font-bold">
            První měsíc ZDARMA!
          </DialogTitle>
          <div className="text-sm text-red-600 font-semibold mt-1">
            Len do 15.10.2025!
          </div>
          <DialogDescription className="text-base text-gray-700">
            Potřebujete připojit internet a TV nebo změnit stávajícího poskytovatele?
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gradient-to-r from-poda-blue/10 to-poda-orange/10 p-4 my-4 rounded-lg">
          <p className="font-medium text-center text-poda-blue">
            Objednejte si PODA internet a TV a získejte <span className="text-poda-orange font-bold">první měsíc ZDARMA</span>!
          </p>
          <p className="font-medium text-center text-poda-blue mt-2">
            + <span className="text-poda-orange font-bold">Bezplatná instalace</span>
          </p>
        </div>
        
        {isSuccess ? (
          <div className="flex items-center justify-center bg-green-50 p-6 rounded-lg">
            <Check className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
            <p className="text-green-700 font-medium">Děkujeme, brzy Vás budeme kontaktovat!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Zadejte své telefonní číslo a my se Vám ozveme
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Telefonní číslo"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-poda-orange hover:bg-poda-orange/90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Odesílání...
                    </>
                  ) : (
                    'Zavolejte mi'
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA a nabídky prvního měsíce zdarma.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PromotionPopup;
