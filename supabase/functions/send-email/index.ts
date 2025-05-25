
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

// Generate customer email HTML with modern design matching the website
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
      <div style="border: 2px solid ${tariff.recommended ? '#0F4C81' : '#e5e7eb'}; border-radius: 16px; padding: 32px; margin-bottom: 24px; background: ${tariff.recommended ? 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)' : 'white'}; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        ${tariff.recommended ? `
        <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); color: white; padding: 8px 20px; border-radius: 24px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(255,107,53,0.3);">
          DOPORUČUJEME
        </div>` : ''}
        <h3 style="color: #0F4C81; font-size: 24px; font-weight: 700; margin: ${tariff.recommended ? '16px 0 16px 0' : '0 0 16px 0'}; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;">${tariff.name}</h3>
        <div style="display: flex; align-items: baseline; margin-bottom: 20px;">
          <div style="font-size: 40px; font-weight: 700; color: #0F4C81; margin-right: 12px; font-family: 'SF Pro Display', sans-serif;">${tariff.price}</div>
          <div style="color: #6b7280; font-size: 14px; line-height: 1.4;">${tariff.priceNote}</div>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #0F4C81;">
          <div style="margin-bottom: 12px; font-weight: 600; color: #374151;"><span style="color: #0F4C81;">🌐</span> <strong>Internet:</strong> ${tariff.speed}</div>
          <div style="margin-bottom: 8px; color: #6b7280; font-size: 14px;">${tariff.technology}</div>
          <div style="margin-bottom: 0; font-weight: 600; color: #374151;"><span style="color: #FF6B35;">📺</span> <strong>Televízia:</strong> ${tariff.tvChannels}</div>
        </div>
        <div style="margin-bottom: 20px;">
          ${tariff.features.map(feature => `
          <div style="display: flex; align-items: center; margin-bottom: 8px; padding: 8px 0;">
            <div style="width: 20px; height: 20px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">✓</span>
            </div>
            <span style="color: #374151; font-weight: 500;">${feature}</span>
          </div>
          `).join('')}
        </div>
        ${tariff.recommended ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="tel:+420730431313" style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(255,107,53,0.3); transition: all 0.3s ease;">
            📞 Objednať teraz
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=SF+Pro+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8fafc;">
      
      <!-- Header with gradient -->
      <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); border-radius: 0 0 24px 24px; margin-bottom: 32px; box-shadow: 0 8px 32px rgba(15,76,129,0.15);">
        <h1 style="color: white; font-size: 36px; margin: 0 0 12px 0; font-family: 'SF Pro Display', sans-serif; font-weight: 700;">
          <span style="color: #FF6B35;">Po</span><span style="color: white;">pri.cz</span>
        </h1>
        <p style="color: #e6f3ff; margin: 0; font-size: 18px; font-weight: 500;">Váš partner pre <span style="color: #FF6B35; font-weight: 700;">PO</span><span style="color: white; font-weight: 700;">DA</span> internet a TV</p>
      </div>

      <div style="padding: 0 20px;">
        <!-- Personalized greeting -->
        <div style="background: white; padding: 32px; border-radius: 16px; margin-bottom: 32px; border-left: 4px solid #0F4C81; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h2 style="color: #0F4C81; margin: 0 0 16px 0; font-size: 24px; font-family: 'SF Pro Display', sans-serif; font-weight: 700;">Dobrý deň ${formData.name}! 👋</h2>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #6b7280;">
            Ďakujeme za váš zájem o naše <span style="color: #FF6B35; font-weight: 600;">PO</span><span style="color: #0F4C81; font-weight: 600;">DA</span> služby. 
            Pripravili sme pre vás prehľad dostupných tarifov pre <strong style="color: #0F4C81;">${isApartment ? 'byty a bytovky' : 'rodinné domy'}</strong>.
          </p>
        </div>

        <!-- Available services -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: #0F4C81; font-size: 28px; margin-bottom: 24px; font-family: 'SF Pro Display', sans-serif; font-weight: 700; text-align: center;">Dostupné služby na vašej adrese</h3>
          
          ${formData.address || formData.city ? `
          <div style="background: linear-gradient(135deg, #e6f3ff 0%, #f0f7ff 100%); padding: 20px; border-radius: 16px; margin-bottom: 32px; border: 2px solid #e6f3ff;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 20px; margin-right: 8px;">📍</span>
              <strong style="color: #0F4C81; font-size: 18px;">${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</strong>
            </div>
            <p style="margin: 8px 0 0 28px; color: #6b7280; font-size: 14px;">
              Typ nehnuteľnosti: <strong>${isApartment ? 'Byt/bytovka - GPON technológia' : 'Rodinný dom - Bezdrátový internet'}</strong>
            </p>
          </div>
          ` : ''}
          
          ${generateTariffCards()}
        </div>

        <!-- Key benefits -->
        <div style="background: white; padding: 32px; border-radius: 16px; margin-bottom: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h3 style="color: #0F4C81; margin: 0 0 24px 0; font-size: 24px; font-family: 'SF Pro Display', sans-serif; font-weight: 700; text-align: center;">
            Prečo si vybrať <span style="color: #FF6B35;">PO</span><span style="color: #0F4C81;">DA</span> služby?
          </h3>
          <div style="display: grid; gap: 16px;">
            <div style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                <span style="font-size: 20px;">🚀</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-weight: 600;">Garantovaná rýchlosť</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Bez obmedzení a spomalení</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                <span style="font-size: 20px;">📺</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-weight: 600;">TV automaticky v cene</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Žiadne extra poplatky</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                <span style="font-size: 20px;">⚡</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-weight: 600;">Rýchla inštalácia</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Do 7 pracovných dní</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                <span style="font-size: 20px;">🔧</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-weight: 600;">Non-stop technická podpora</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">24/7 dostupnosť</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 16px; background: #f8fafc; border-radius: 12px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                <span style="font-size: 20px;">💰</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-weight: 600;">Bez skrytých poplatkov</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Transparentné ceny</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Next steps -->
        <div style="background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); color: white; padding: 32px; border-radius: 16px; margin-bottom: 32px; box-shadow: 0 8px 32px rgba(15,76,129,0.2);">
          <h3 style="margin: 0 0 20px 0; color: white; font-size: 24px; font-family: 'SF Pro Display', sans-serif; font-weight: 700;">Ďalšie kroky 📋</h3>
          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">Milan Terč, váš obchodný zástupca, vás bude kontaktovať do <strong>24 hodín</strong> na:</p>
          <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; backdrop-filter: blur(10px);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 18px; margin-right: 12px;">📞</span>
              <a href="tel:${formData.phone}" style="color: white; text-decoration: none; font-weight: 600; font-size: 18px;">${formData.phone}</a>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="font-size: 18px; margin-right: 12px;">📧</span>
              <a href="mailto:${formData.email}" style="color: white; text-decoration: none; font-weight: 600; font-size: 18px;">${formData.email}</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 24px;">
            <a href="tel:+420730431313" style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #FF9E6B 100%); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 4px 16px rgba(255,107,53,0.4); transition: all 0.3s ease;">
              📞 Zavolať teraz: +420 730 431 313
            </a>
          </div>
        </div>

        <!-- Contact info -->
        <div style="background: white; padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h3 style="color: #0F4C81; margin: 0 0 20px 0; font-size: 24px; font-family: 'SF Pro Display', sans-serif; font-weight: 700;">Kontaktné údaje</h3>
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e6f3ff 100%); padding: 24px; border-radius: 12px; margin-bottom: 20px;">
            <div style="margin-bottom: 16px;">
              <h4 style="margin: 0 0 8px 0; color: #0F4C81; font-size: 20px; font-weight: 700;">Milan Terč</h4>
              <p style="margin: 0; color: #6b7280; font-weight: 500;">Obchodný zástupca PODA</p>
            </div>
            <div style="margin-bottom: 12px;">
              <a href="tel:+420730431313" style="color: #0F4C81; text-decoration: none; font-weight: 600; font-size: 16px;">📞 +420 730 431 313</a>
            </div>
            <div>
              <a href="mailto:terc@obchod.poda.cz" style="color: #0F4C81; text-decoration: none; font-weight: 600; font-size: 16px;">📧 terc@obchod.poda.cz</a>
            </div>
          </div>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
            Máte otázky? Neváhajte nás kontaktovať!<br>
            Tešíme sa na spoluprácu s vami. 🤝
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 32px 20px 20px; color: #9ca3af; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">Tento email bol automaticky vygenerovaný z webu</p>
        <p style="margin: 0;">
          <a href="https://www.popri.cz" style="color: #0F4C81; text-decoration: none; font-weight: 600;">
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
