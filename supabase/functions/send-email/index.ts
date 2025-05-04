
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY exists:", !!resendApiKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

interface EmailRequest {
  to: string;
  subject: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    zip?: string;
    currentProvider?: string;
    currentPrice?: string;
    message?: string;
  };
}

serve(async (req) => {
  console.log("🔄 Request received for send-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("👍 Handling OPTIONS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log request headers
    console.log("📝 Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Parse request body and log it
    const requestBody = await req.text();
    console.log("📦 Request body:", requestBody);
    
    let requestData;
    try {
      requestData = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("❌ Error parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: "Invalid JSON in request body" 
        }), 
        { 
          status: 400, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    }
    
    const { to, subject, formData } = requestData as EmailRequest;

    console.log("📧 Preparing email with data:", { to, subject, formData });
    
    // Check if this is a callback request
    const isCallbackRequest = formData.name.includes("Žádost o zpětné volání");

    // Construct HTML content for the email
    let htmlContent;
    
    if (isCallbackRequest) {
      // Simplified content for callback requests
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 10px;">📞 Žádost o zpětné volání</h2>
          <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin: 10px 0; font-size: 18px;"><strong>Telefonní číslo:</strong> ${formData.phone}</p>
            <p style="margin: 10px 0;"><strong>Čas žádosti:</strong> ${new Date().toLocaleString('cs-CZ')}</p>
          </div>
          <p style="color: #666; font-style: italic;">Tato žádost byla automaticky vygenerována z formuláře na webu popri.cz</p>
        </div>
      `;
    } else {
      // Standard contact form content
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nový kontakt z pripojeni-poda.cz</h2>
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
        </div>
      `;
    }

    console.log("📨 Sending email with Resend API");
    console.log("📧 To:", to);
    console.log("📝 Subject:", subject);
    console.log("🔑 RESEND_API_KEY present:", !!resendApiKey);
    
    // Use onboarding@resend.dev as the default sender (always verified)
    try {
      const emailResponse = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>", // Always use the default Resend domain
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: isCallbackRequest ? undefined : formData.email
      });

      console.log("✅ Email sent successfully:", emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email úspěšně odeslán",
          response: emailResponse
        }), 
        { 
          status: 200, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    } catch (emailError: any) {
      console.error("❌ Resend API error:", emailError);
      throw new Error(`Email sending failed: ${emailError.message}`);
    }

  } catch (error: any) {
    console.error("❌ Email sending error:", error);
    console.error("Stack trace:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: "Chyba při odesílání emailu", 
        details: error.message,
        stack: error.stack
      }), 
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
