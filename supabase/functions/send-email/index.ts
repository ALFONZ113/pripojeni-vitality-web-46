
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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, resendApiKey, formData } = await req.json() as EmailRequest;

    if (!to || !subject || !formData || !resendApiKey) {
      return new Response(
        JSON.stringify({ message: "Chybí povinné údaje" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create email HTML content
    const htmlContent = `
      <h2>Nový kontakt z formuláře</h2>
      <p><strong>Jméno:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      ${formData.address ? `<p><strong>Adresa:</strong> ${formData.address}</p>` : ''}
      ${formData.city ? `<p><strong>Město:</strong> ${formData.city}</p>` : ''}
      ${formData.zip ? `<p><strong>PSČ:</strong> ${formData.zip}</p>` : ''}
      ${formData.currentProvider ? `<p><strong>Současný poskytovatel:</strong> ${formData.currentProvider}</p>` : ''}
      ${formData.currentPrice ? `<p><strong>Aktuální cena:</strong> ${formData.currentPrice}</p>` : ''}
      ${formData.message ? `<p><strong>Zpráva:</strong> ${formData.message}</p>` : ''}
    `;

    // Send the email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Update this if you've verified your domain
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: formData.email
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", responseData);
      return new Response(
        JSON.stringify({ message: "Chyba při odesílání emailu", error: responseData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Email úspěšně odeslán", data: responseData }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
