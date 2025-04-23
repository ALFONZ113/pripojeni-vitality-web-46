
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log request headers and body for debugging
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    
    const requestBody = await req.text();
    console.log("Request body:", requestBody);
    
    let requestData;
    try {
      requestData = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
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
    
    const { formData } = requestData as EmailRequest;

    console.log("Processing email with data:", formData);

    const htmlContent = `
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

    console.log("Sending email to:", "junkert@seznam.cz");
    console.log("RESEND_API_KEY present:", !!Deno.env.get("RESEND_API_KEY"));

    const emailResponse = await resend.emails.send({
      from: "Poda.cz <noreply@pripojeni-poda.cz>",
      to: ["junkert@seznam.cz"],
      subject: "Nový kontakt z připojeni-poda.cz",
      html: htmlContent,
      reply_to: formData.email
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email úspěšně odeslán" 
      }), 
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );

  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: "Chyba při odesílání emailu", 
        details: error.message 
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
