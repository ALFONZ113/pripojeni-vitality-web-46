
import { useState } from 'react';
import { Check, Phone, Loader2 } from 'lucide-react';
import { sendContactFormEmail } from '../utils/emailService';
import { toast } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PromoFormProps {
  onSuccess?: () => void;
  buttonText?: string;
  successMessage?: string;
}

const PromoForm = ({ 
  onSuccess, 
  buttonText = "Zavolejte mi",
  successMessage = "Děkujeme, brzy Vás budeme kontaktovat!"
}: PromoFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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
        message: "Žádost o zpětné volání z promo formuláře - První měsíc zdarma. Telefonní číslo: " + phoneNumber
      });
      
      if (emailSent) {
        setIsSuccess(true);
        setPhoneNumber('');
        
        toast({
          title: "Děkujeme za Váš zájem",
          description: "Brzy Vás budeme kontaktovat ohledně nabídky prvního měsíce zdarma.",
          variant: "default"
        });
        
        if (onSuccess) {
          onSuccess();
        }
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
  
  if (isSuccess) {
    return (
      <div className="flex items-center justify-center bg-green-50 p-4 sm:p-6 rounded-lg">
        <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
        <p className="text-green-700 font-medium text-sm sm:text-base text-center leading-relaxed">{successMessage}</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="flex flex-col space-y-2 sm:space-y-3">
        <label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium text-gray-700 text-center sm:text-left px-2 sm:px-0">
          Zadejte své telefonní číslo a my se Vám ozveme
        </label>
        
        {/* Mobilný layout - stĺpce, desktop layout - riadok */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-grow">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Telefonní číslo"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-9 sm:pl-10 h-11 sm:h-12 text-base"
              disabled={isSubmitting}
              style={{
                fontSize: '16px', // Prevents zoom on iOS
                WebkitAppearance: 'none',
                WebkitBorderRadius: '0'
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-poda-orange hover:bg-poda-orange/90 text-white h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base font-medium whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span className="hidden sm:inline">Odesílání...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <span className="text-center">{buttonText}</span>
            )}
          </Button>
        </div>
        
        <div className="bg-gradient-to-r from-poda-blue to-poda-orange text-white p-2 sm:p-3 rounded-lg text-center">
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            Objednajte si rýchle pripojenie a získajte prvý mesiac zdarma!
          </p>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 text-center leading-relaxed px-2 sm:px-0">
        Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA a nabídky prvního měsíce zdarma.
      </p>
    </form>
  );
};

export default PromoForm;
