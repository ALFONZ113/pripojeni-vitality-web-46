
import { toast } from "@/hooks/use-toast";

interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  currentProvider?: string;
  currentPrice?: string;
  message?: string;
}

export const sendContactFormEmail = async (formData: EmailFormData): Promise<boolean> => {
  try {
    console.log("Preparing to send email with formData:", JSON.stringify(formData));
    
    // Create email HTML content with improved formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nový kontakt z formuláře</h2>
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Jméno:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
          <p style="margin: 10px 0;"><strong>Telefon:</strong> ${formData.phone}</p>
          ${formData.address ? `<p style="margin: 10px 0;"><strong>Adresa:</strong> ${formData.address}</p>` : ''}
          ${formData.city ? `<p style="margin: 10px 0;"><strong>Město:</strong> ${formData.city}</p>` : ''}
          ${formData.zip ? `<p style="margin: 10px 0;"><strong>PSČ:</strong> ${formData.zip}</p>` : ''}
          ${formData.currentProvider ? `<p style="margin: 10px 0;"><strong>Současný poskytovatel:</strong> ${formData.currentProvider}</p>` : ''}
          ${formData.currentPrice ? `<p style="margin: 10px 0;"><strong>Aktuální cena:</strong> ${formData.currentPrice}</p>` : ''}
        </div>
        ${formData.message ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Zpráva od zákazníka:</h3>
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
        ` : ''}
        <div style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
          Odesláno z kontaktního formuláře na pripojeni-poda.cz
        </div>
      </div>
    `;

    // Send email using email.js service which doesn't have CORS restrictions
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: "service_0o7xr5v",
        template_id: "template_nzmvk3p",
        user_id: "KQQ0V61b9l9qcQv1t",
        template_params: {
          to_email: "junkert@seznam.cz",
          from_name: formData.name,
          reply_to: formData.email,
          subject: "Nový kontaktní formulář z pripojeni-poda.cz",
          message_html: htmlContent,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || '',
          city: formData.city || '',
          zip: formData.zip || '',
          currentProvider: formData.currentProvider || '',
          currentPrice: formData.currentPrice || '',
          message: formData.message || ''
        }
      })
    });

    if (!response.ok && response.status !== 200) {
      const errorText = await response.text();
      console.error("Email API error:", errorText);
      throw new Error(`Failed to send email: ${response.status}`);
    }
    
    console.log("Email sent successfully");
    
    toast({
      title: "Formulář odeslán",
      description: "Děkujeme za vyplnění formuláře. Brzy vás budeme kontaktovat.",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    
    toast({
      title: "Chyba při odesílání",
      description: "Nepodařilo se odeslat formulář. Zkuste to prosím později nebo nás kontaktujte telefonicky.",
      variant: "destructive"
    });
    
    return false;
  }
};
