
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { sendContactFormEmail } from '../utils/emailService';
import FormSuccess from './contact-form/FormSuccess';
import FormError from './contact-form/FormError';
import FormFields from './contact-form/FormFields';
import SubmitButton from './contact-form/SubmitButton';

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ContactForm = ({ onSuccess, compact = false }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    currentProvider: '',
    currentPrice: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    submitted: false,
    success: false,
    error: null as string | null,
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      setFormState({
        submitted: true,
        success: false,
        error: 'Prosím vyplňte všechna povinná pole označená *',
        loading: false
      });
      
      toast({
        title: "Kontrola formuláře",
        description: "Prosím vyplňte všechna povinná pole označená *",
        variant: "destructive"
      });
      
      return;
    }
    
    setFormState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Send email notification
      const emailSent = await sendContactFormEmail(formData);
      
      if (emailSent) {
        setFormState({
          submitted: true,
          success: true,
          error: null,
          loading: false
        });
        
        toast({
          title: "Formulář odeslán",
          description: "Děkujeme za váš zájem. Budeme vás kontaktovat co nejdříve.",
          variant: "default"
        });
        
        // Execute success callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormState({
            submitted: false,
            success: false,
            error: null,
            loading: false
          });
          setFormData({
            name: '',
            address: '',
            city: '',
            zip: '',
            phone: '',
            email: '',
            currentProvider: '',
            currentPrice: '',
            message: ''
          });
        }, 1500);
      } else {
        throw new Error("Nepodařilo se odeslat email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState({
        submitted: true,
        success: false,
        error: 'Nastala chyba při odesílání formuláře. Zkuste to prosím později.',
        loading: false
      });
    }
  };

  // Compact styling for the modal version
  const formWrapperClass = compact 
    ? "bg-white rounded-lg p-4 border border-gray-100"
    : "bg-white rounded-xl shadow-lg p-8 border border-gray-100";

  return (
    <div className={formWrapperClass}>
      {formState.submitted && formState.success ? (
        <FormSuccess />
      ) : (
        <form onSubmit={handleSubmit}>
          {!compact && <h3 className="text-2xl font-bold text-poda-blue mb-6">Kontaktní formulář</h3>}
          
          <FormError error={formState.error} />
          
          <FormFields 
            formData={formData} 
            handleChange={handleChange} 
            isLoading={formState.loading} 
            compact={compact}
            setFormData={setFormData} 
          />
          
          <SubmitButton isLoading={formState.loading} />
        </form>
      )}
    </div>
  );
};

export default ContactForm;
