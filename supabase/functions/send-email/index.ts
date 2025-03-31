
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://supabase.com/docs/guides/functions/deno-runtime

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface EmailRequest {
  to: string;
  subject: string;
  resendApiKey: string;
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

serve(async (req: Request) => {
  console.log("[SEND-EMAIL] Function invoked:", new Date().toISOString());
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("[SEND-EMAIL] Handling OPTIONS preflight request");
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("[SEND-EMAIL] Processing POST request");
    
    // Parse request body
    const requestData = await req.json();
    console.log("[SEND-EMAIL] Request data received:", JSON.stringify(requestData, null, 2));
    
    const { to, subject, resendApiKey, formData } = requestData as EmailRequest;

    // Validate required fields
    if (!to || !subject || !formData || !resendApiKey) {
      console.error("[SEND-EMAIL] Missing required fields:", { 
        to: !!to, 
        subject: !!subject, 
        formData: !!formData, 
        resendApiKey: !!resendApiKey 
      });
      
      return new Response(
        JSON.stringify({ 
          error: true,
          message: "Chybí povinné údaje" 
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

    console.log("[SEND-EMAIL] Preparing to call Resend API");
    
    // Send the email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: formData.email
      })
    });

    const responseData = await response.json();
    console.log("[SEND-EMAIL] Resend API response:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error("[SEND-EMAIL] Resend API error:", JSON.stringify(responseData));
      return new Response(
        JSON.stringify({ 
          error: true,
          message: "Chyba při odesílání emailu", 
          details: responseData 
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

    console.log("[SEND-EMAIL] Email sent successfully");
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email úspěšně odeslán", 
        data: responseData 
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
    console.error("[SEND-EMAIL] Server error:", error);
    return new Response(
      JSON.stringify({ 
        error: true,
        message: "Server error", 
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
