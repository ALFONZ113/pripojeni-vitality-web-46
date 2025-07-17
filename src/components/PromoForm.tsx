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
      <div className="flex items-center justify-center bg-green-50 p-6 rounded-lg">
        <Check className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
        <p className="text-green-700 font-medium">{successMessage}</p>
      </div>
    );
  }
  
  return (
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
              buttonText
            )}
          </Button>
        </div>
        <p className="text-sm font-semibold text-poda-blue">
          Objednajte si rýchle připojeni a získejte prvý mesiac zdarma!
        </p>
      </div>
      <p className="text-xs text-gray-500">
        Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA a nabídky prvního měsíce zdarma.
      </p>
    </form>
  );
};

export default PromoForm;