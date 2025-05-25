
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
  emailType?: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    zip?: string;
    propertyType?: string;
    currentProvider?: string;
    currentPrice?: string;
    message?: string;
  };
}

// Generate customer email HTML
const generateCustomerEmailHTML = (formData: any): string => {
  const propertyType = formData.propertyType || 'byty';
  const isApartment = propertyType === 'byty';
  
  const tariffs = isApartment ? [
    {
      name: 'Internet + TV Basic',
      speed: '1000/1000 Mbps',
      technology: 'GPON optická technologie',
      price: '250 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      tvChannels: 'Více než 85 TV programů',
      features: ['Symetrická rychlost', 'TV automaticky v ceně', 'PODA net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/1000 Mbps', 
      technology: 'GPON optická technologie',
      price: '390 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      tvChannels: 'Více než 100 TV programů',
      features: ['Symetrická rychlost', 'Výběr 10 vlastních stanic', 'PODA net.TV pro 4 zařízení'],
      recommended: true
    }
  ] : [
    {
      name: 'Internet + TV Basic',
      speed: '500/200 Mbps',
      technology: 'Bezdrátový internet',
      price: '250 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      tvChannels: 'Více než 85 TV programů',
      features: ['Rychlost optického internetu', 'TV automaticky v ceně', 'PODA net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '500/200 Mbps',
      technology: 'Bezdrátový internet', 
      price: '390 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      tvChannels: 'Více než 100 TV programů',
      features: ['Rychlost optického internetu', 'Výběr 10 vlastních stanic', 'PODA net.TV pro 4 zařízení'],
      recommended: true
    }
  ];

  const generateTariffCards = () => {
    return tariffs.map(tariff => `
      <div style="border: 2px solid ${tariff.recommended ? '#0066cc' : '#e5e7eb'}; border-radius: 12px; padding: 24px; margin-bottom: 20px; background: ${tariff.recommended ? '#f0f7ff' : 'white'}; position: relative;">
        ${tariff.recommended ? '<div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #0066cc; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">DOPORUČUJEME</div>' : ''}
        <h3 style="color: #0066cc; font-size: 20px; font-weight: bold; margin: 0 0 12px 0;">${tariff.name}</h3>
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="font-size: 32px; font-weight: bold; color: #0066cc; margin-right: 8px;">${tariff.price}</div>
          <div style="color: #666; font-size: 14px;">${tariff.priceNote}</div>
        </div>
        <div style="color: #666; margin-bottom: 16px;">
          <div style="margin-bottom: 8px;"><strong>Internet:</strong> ${tariff.speed} (${tariff.technology})</div>
          <div style="margin-bottom: 8px;"><strong>Televízia:</strong> ${tariff.tvChannels}</div>
        </div>
        <div style="margin-bottom: 16px;">
          ${tariff.features.map(feature => `<div style="display: flex; align-items: center; margin-bottom: 6px;"><span style="color: #ff8800; margin-right: 8px;">✓</span>${feature}</div>`).join('')}
        </div>
      </div>
    `).join('');
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Děkujeme za váš zájem - Popri.cz</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; padding: 30px 0; background: linear-gradient(135deg, #0066cc 0%, #004499 100%); border-radius: 12px; margin-bottom: 30px;">
        <h1 style="color: white; font-size: 28px; margin: 0 0 10px 0;">Popri.cz</h1>
        <p style="color: #e6f3ff; margin: 0; font-size: 16px;">Váš partner pre PODA internet a TV</p>
      </div>

      <!-- Personalized greeting -->
      <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #0066cc;">
        <h2 style="color: #0066cc; margin: 0 0 12px 0;">Dobrý deň ${formData.name}!</h2>
        <p style="margin: 0; font-size: 16px;">Ďakujeme za váš zájem o naše PODA služby. Pripravili sme pre vás prehľad dostupných tarifov pre <strong>${isApartment ? 'byty' : 'rodinné domy'}</strong>.</p>
      </div>

      <!-- Available services -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #0066cc; font-size: 22px; margin-bottom: 20px;">Dostupné služby na vašej adrese</h3>
        <p style="background: #e6f3ff; padding: 16px; border-radius: 8px; margin-bottom: 20px; color: #0066cc;">
          <strong>📍 ${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</strong><br>
          Typ nehnuteľnosti: ${isApartment ? 'Byt/bytovka - GPON technológia' : 'Rodinný dom - Bezdrátový internet'}
        </p>
        
        ${generateTariffCards()}
      </div>

      <!-- Key benefits -->
      <div style="background: #f0f7ff; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #0066cc; margin: 0 0 16px 0;">Prečo si vybrať PODA služby?</h3>
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center;"><span style="color: #ff8800; margin-right: 8px; font-size: 18px;">🚀</span>Garantovaná rýchlosť bez obmedzení</div>
          <div style="display: flex; align-items: center;"><span style="color: #ff8800; margin-right: 8px; font-size: 18px;">📺</span>TV programy automaticky v cene</div>
          <div style="display: flex; align-items: center;"><span style="color: #ff8800; margin-right: 8px; font-size: 18px;">⚡</span>Rýchla inštalácia do 7 dní</div>
          <div style="display: flex; align-items: center;"><span style="color: #ff8800; margin-right: 8px; font-size: 18px;">🔧</span>Non-stop technická podpora</div>
          <div style="display: flex; align-items: center;"><span style="color: #ff8800; margin-right: 8px; font-size: 18px;">💰</span>Bez skrytých poplatkov</div>
        </div>
      </div>

      <!-- Next steps -->
      <div style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 16px 0; color: white;">Ďalšie kroky</h3>
        <p style="margin: 0 0 16px 0;">Milan Terč, váš obchodný zástupca, vás bude kontaktovať do 24 hodín na:</p>
        <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px;">
          <div style="margin-bottom: 8px;">📞 <strong>${formData.phone}</strong></div>
          <div>📧 <strong>${formData.email}</strong></div>
        </div>
      </div>

      <!-- Contact info -->
      <div style="background: #f8fafc; padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="color: #0066cc; margin: 0 0 16px 0;">Kontaktné údaje</h3>
        <div style="margin-bottom: 12px;">
          <strong>Milan Terč</strong><br>
          Obchodný zástupca PODA
        </div>
        <div style="margin-bottom: 8px;">📞 <a href="tel:+420730431313" style="color: #0066cc; text-decoration: none;">+420 730 431 313</a></div>
        <div style="margin-bottom: 16px;">📧 <a href="mailto:terc@obchod.poda.cz" style="color: #0066cc; text-decoration: none;">terc@obchod.poda.cz</a></div>
        <p style="margin: 0; color: #666; font-size: 14px;">Máte otázky? Neváhajte nás kontaktovať!</p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px 0; color: #666; font-size: 14px;">
        <p style="margin: 0;">Tento email bol automaticky vygenerovaný z webu <a href="https://www.popri.cz" style="color: #0066cc;">Popri.cz</a></p>
      </div>
    </body>
    </html>
  `;
};

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
    
    const { to, subject, formData, emailType = "admin" } = requestData as EmailRequest;

    console.log("📧 Preparing email with data:", { to, subject, formData, emailType });
    
    let htmlContent: string;
    let replyTo: string | undefined;

    if (emailType === "customer") {
      // Customer email with beautiful design
      htmlContent = generateCustomerEmailHTML(formData);
      replyTo = "terc@obchod.poda.cz";
    } else {
      // Admin email (original logic)
      const isCallbackRequest = formData.name.includes("Žádost o zpětné volání");

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
              ${formData.propertyType ? `<p style="margin: 10px 0;"><strong>Typ nehnuteľnosti:</strong> ${formData.propertyType === 'byty' ? 'Byt/bytovka' : 'Rodinný dom'}</p>` : ''}
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
      replyTo = formData.email;
    }

    console.log("📨 Sending email with Resend API");
    console.log("📧 To:", to);
    console.log("📝 Subject:", subject);
    console.log("🔑 RESEND_API_KEY present:", !!resendApiKey);
    console.log("📮 Email type:", emailType);
    
    try {
      const emailResponse = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: replyTo
      });

      console.log("✅ Email sent successfully:", emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `${emailType === "customer" ? "Customer" : "Admin"} email úspěšně odeslán`,
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
