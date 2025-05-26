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

// Generate customer email HTML with clean, professional design matching the website
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
      <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px; background: white; ${tariff.recommended ? 'border-color: #0F4C81; border-width: 2px;' : ''}">
        ${tariff.recommended ? `
        <div style="background: #0F4C81; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; display: inline-block;">
          Doporučujeme
        </div>` : ''}
        <h3 style="color: #0F4C81; font-size: 20px; font-weight: 600; margin: ${tariff.recommended ? '0 0 16px 0' : '0 0 16px 0'}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">${tariff.name}</h3>
        
        <div style="margin-bottom: 20px;">
          <div style="font-size: 32px; font-weight: 700; color: #0F4C81; margin-bottom: 4px; font-family: 'Inter', sans-serif;">${tariff.price}</div>
          <div style="color: #6b7280; font-size: 14px;">${tariff.priceNote}</div>
        </div>
        
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <div style="margin-bottom: 8px; font-weight: 500; color: #374151;"><strong>Internet:</strong> ${tariff.speed}</div>
          <div style="margin-bottom: 8px; color: #6b7280; font-size: 14px;">${tariff.technology}</div>
          <div style="margin-bottom: 0; font-weight: 500; color: #374151;"><strong>Televízia:</strong> ${tariff.tvChannels}</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          ${tariff.features.map(feature => `
          <div style="display: flex; align-items: center; margin-bottom: 6px; padding: 4px 0;">
            <div style="width: 16px; height: 16px; background: #0F4C81; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">
              <span style="color: white; font-size: 10px; font-weight: bold;">✓</span>
            </div>
            <span style="color: #374151; font-size: 14px;">${feature}</span>
          </div>
          `).join('')}
        </div>
        
        ${tariff.recommended ? `
        <div style="text-align: center; margin-top: 20px;">
          <a href="tel:+420730431313" style="display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Objednať teraz
          </a>
        </div>` : ''}
      </div>
    `).join('');
  };

  return `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Děkujeme za váš zájem - Popri.cz</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f9fafb;">
      
      <!-- Header -->
      <div style="text-align: center; padding: 32px 20px; background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); margin-bottom: 24px;">
        <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: 700;">
          <span style="color: #FF6B35;">Po</span><span style="color: white;">pri.cz</span>
        </h1>
        <p style="color: #e6f3ff; margin: 0; font-size: 16px; font-weight: 400;">Váš partner pre <span style="color: #FF6B35; font-weight: 600;">PO</span><span style="color: white; font-weight: 600;">DA</span> internet a TV</p>
      </div>

      <div style="padding: 0 20px;">
        <!-- Greeting -->
        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h2 style="color: #0F4C81; margin: 0 0 12px 0; font-size: 20px; font-weight: 600;">Dobrý deň ${formData.name}!</h2>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #6b7280;">
            Ďakujeme za váš zájem o naše <span style="color: #FF6B35; font-weight: 600;">PO</span><span style="color: #0F4C81; font-weight: 600;">DA</span> služby. 
            Pripravili sme pre vás prehľad dostupných tarifov pre <strong style="color: #0F4C81;">${isApartment ? 'byty a bytovky' : 'rodinné domy'}</strong>.
          </p>
        </div>

        <!-- Location info -->
        ${formData.address || formData.city ? `
        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #0F4C81;">
          <div style="font-weight: 600; color: #0F4C81; margin-bottom: 4px;">Vaša adresa:</div>
          <div style="color: #374151;">${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</div>
          <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">
            Typ nehnuteľnosti: ${isApartment ? 'Byt/bytovka - GPON technológia' : 'Rodinný dom - Bezdrátový internet'}
          </div>
        </div>
        ` : ''}
        
        <!-- Tariffs -->
        <div style="margin-bottom: 24px;">
          <h3 style="color: #0F4C81; font-size: 22px; margin-bottom: 20px; font-weight: 600; text-align: center;">Dostupné služby</h3>
          ${generateTariffCards()}
        </div>

        <!-- Benefits -->
        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
          <h3 style="color: #0F4C81; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">
            Prečo si vybrať <span style="color: #FF6B35;">PO</span><span style="color: #0F4C81;">DA</span> služby?
          </h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
              <div>
                <strong style="color: #0F4C81;">Garantovaná rýchlosť</strong> - bez obmedzení a spomalení
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
              <div>
                <strong style="color: #0F4C81;">TV automaticky v cene</strong> - žiadne extra poplatky
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
              <div>
                <strong style="color: #0F4C81;">Rýchla inštalácia</strong> - do 7 pracovných dní
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
              <div>
                <strong style="color: #0F4C81;">Non-stop technická podpora</strong> - 24/7 dostupnosť
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px;">
              <div style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
              <div>
                <strong style="color: #0F4C81;">Bez skrytých poplatkov</strong> - transparentné ceny
              </div>
            </div>
          </div>
        </div>

        <!-- Next steps -->
        <div style="background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; color: white; font-size: 20px; font-weight: 600;">Ďalšie kroky</h3>
          <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">Milan Terč, váš obchodný zástupca, vás bude kontaktovať do <strong>24 hodín</strong> na:</p>
          <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="margin-bottom: 8px;">
              <strong>Telefón:</strong> <a href="tel:${formData.phone}" style="color: white; text-decoration: none;">${formData.phone}</a>
            </div>
            <div>
              <strong>Email:</strong> <a href="mailto:${formData.email}" style="color: white; text-decoration: none;">${formData.email}</a>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="tel:+420730431313" style="display: inline-block; background: #FF6B35; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Zavolať teraz: +420 730 431 313
            </a>
          </div>
        </div>

        <!-- Contact info -->
        <div style="background: white; padding: 24px; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb;">
          <h3 style="color: #0F4C81; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Kontaktné údaje</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
            <div style="margin-bottom: 12px;">
              <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-size: 16px; font-weight: 600;">Milan Terč</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Obchodný zástupca PODA</p>
            </div>
            <div style="margin-bottom: 8px;">
              <a href="tel:+420730431313" style="color: #0F4C81; text-decoration: none; font-weight: 500;">+420 730 431 313</a>
            </div>
            <div>
              <a href="mailto:terc@obchod.poda.cz" style="color: #0F4C81; text-decoration: none; font-weight: 500;">terc@obchod.poda.cz</a>
            </div>
          </div>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
            Máte otázky? Neváhajte nás kontaktovať!<br>
            Tešíme sa na spoluprácu s vami.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 20px 16px; color: #9ca3af; font-size: 13px;">
        <p style="margin: 0 0 4px 0;">Tento email bol automaticky vygenerovaný z webu</p>
        <p style="margin: 0;">
          <a href="https://www.popri.cz" style="color: #0F4C81; text-decoration: none; font-weight: 500;">
            <span style="color: #FF6B35;">Po</span><span style="color: #0F4C81;">pri.cz</span>
          </a>
        </p>
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
      // Customer email with beautiful design matching the website
      htmlContent = generateCustomerEmailHTML(formData);
      replyTo = "terc@obchod.poda.cz";
    } else {
      // Admin email (original logic)
      const isCallbackRequest = formData.name.includes("Žádost o zpětné volání");

      if (isCallbackRequest) {
        // Simplified content for callback requests
        htmlContent = `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0F4C81; border-bottom: 1px solid #eee; padding-bottom: 10px;">📞 Žádost o zpětné volání</h2>
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
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0F4C81; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nový kontakt z pripojeni-poda.cz</h2>
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
        from: "Popri.cz <onboarding@resend.dev>",
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
