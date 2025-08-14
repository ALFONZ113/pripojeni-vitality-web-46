export const generateCustomerEmailHTML = (formData: any): string => {
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
      speed: '1000/200 Mbps',
      technology: 'Bezdrátový internet',
      price: '250 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      tvChannels: 'Více než 85 TV programů',
      features: ['Rychlost optického internetu', 'TV automaticky v ceně', 'PODA net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/200 Mbps',
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
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; ${tariff.recommended ? 'border-color: #0F4C81; border-width: 2px; position: relative;' : ''}">
        ${tariff.recommended ? `
        <div style="position: absolute; top: -1px; right: 20px; background: #0F4C81; color: white; padding: 4px 12px; border-radius: 0 0 4px 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
          Doporučujeme
        </div>` : ''}
        
        <h3 style="color: #0F4C81; font-size: 20px; font-weight: 600; margin: ${tariff.recommended ? '16px 0 16px 0' : '0 0 16px 0'}; font-family: 'Inter', sans-serif;">${tariff.name}</h3>
        
        <div style="margin-bottom: 16px;">
          <div style="font-size: 28px; font-weight: 700; color: #0F4C81; margin-bottom: 4px; font-family: 'Inter', sans-serif;">${tariff.price}</div>
          <div style="color: #6b7280; font-size: 14px;">${tariff.priceNote}</div>
        </div>
        
        <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-bottom: 16px; border-left: 3px solid #0F4C81;">
          <div style="margin-bottom: 8px; font-weight: 600; color: #0F4C81; font-size: 15px;">Internet: ${tariff.speed}</div>
          <div style="margin-bottom: 8px; color: #6b7280; font-size: 13px;">${tariff.technology}</div>
          <div style="margin-bottom: 0; font-weight: 600; color: #0F4C81; font-size: 15px;">Televízia: ${tariff.tvChannels}</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          ${tariff.features.map(feature => `
          <div style="display: flex; align-items: center; margin-bottom: 8px; padding: 2px 0;">
            <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></div>
            <span style="color: #374151; font-size: 14px; line-height: 1.4;">${feature}</span>
          </div>
          `).join('')}
        </div>
        
        ${tariff.recommended ? `
        <div style="text-align: center; margin-top: 20px;">
          <a href="tel:+420730431313" style="display: inline-block; background: #FF6B35; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; transition: background-color 0.2s;">
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f9fafb;">
      
      <!-- Header -->
      <div style="text-align: center; padding: 32px 20px; background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); margin-bottom: 0;">
        <h1 style="color: white; font-size: 32px; margin: 0 0 8px 0; font-weight: 700; font-family: 'Inter', sans-serif;">
          <span style="color: #FF6B35;">Po</span><span style="color: white;">pri.cz</span>
        </h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px; font-weight: 500;">Váš partner pre PODA internet a TV</p>
      </div>

      <div style="padding: 24px 20px; background: white;">
        <!-- Greeting -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #0F4C81; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Vážený/á ${formData.name},</h2>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
            ďakujeme za váš zájem o naše PODA služby. 
            Pripravili sme pre vás profesionálny prehľad dostupných tarifov pre <strong style="color: #0F4C81;">${isApartment ? 'byty a bytovky' : 'rodinné domy'}</strong>.
          </p>
        </div>

        <!-- Location info -->
        ${formData.address || formData.city ? `
        <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin-bottom: 32px; border-left: 4px solid #0F4C81;">
          <div style="font-weight: 600; color: #0F4C81; margin-bottom: 8px; font-size: 16px;">Vaša adresa:</div>
          <div style="color: #374151; font-size: 15px; margin-bottom: 8px;">${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</div>
          <div style="color: #6b7280; font-size: 14px;">
            Typ nehnuteľnosti: ${isApartment ? 'Byt/bytovka - GPON technológia' : 'Rodinný dom - Bezdrátový internet'}
          </div>
        </div>
        ` : ''}
        
        <!-- Tariffs -->
        <div style="margin-bottom: 32px;">
          <h3 style="color: #0F4C81; font-size: 22px; margin-bottom: 24px; font-weight: 600; text-align: center;">Dostupné služby</h3>
          ${generateTariffCards()}
        </div>

        <!-- Benefits -->
        <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 32px; border: 1px solid #e5e7eb;">
          <h3 style="color: #0F4C81; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">
            Prečo si vybrať PODA služby?
          </h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 16px; flex-shrink: 0;"></div>
              <div style="color: #374151; font-size: 15px; line-height: 1.4;">
                <strong style="color: #0F4C81;">Garantovaná rýchlosť</strong> - bez obmedzení a spomalení
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 16px; flex-shrink: 0;"></div>
              <div style="color: #374151; font-size: 15px; line-height: 1.4;">
                <strong style="color: #0F4C81;">TV automaticky v cene</strong> - žiadne extra poplatky
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 16px; flex-shrink: 0;"></div>
              <div style="color: #374151; font-size: 15px; line-height: 1.4;">
                <strong style="color: #0F4C81;">Rýchla inštalácia</strong> - do 7 pracovných dní
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 16px; flex-shrink: 0;"></div>
              <div style="color: #374151; font-size: 15px; line-height: 1.4;">
                <strong style="color: #0F4C81;">Non-stop technická podpora</strong> - 24/7 dostupnosť
              </div>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px 0;">
              <div style="width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; margin-right: 16px; flex-shrink: 0;"></div>
              <div style="color: #374151; font-size: 15px; line-height: 1.4;">
                <strong style="color: #0F4C81;">Bez skrytých poplatkov</strong> - transparentné ceny
              </div>
            </div>
          </div>
        </div>

        <!-- Next steps -->
        <div style="background: linear-gradient(135deg, #0F4C81 0%, #3A7CA5 100%); color: white; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: white; font-size: 20px; font-weight: 600;">Ďalšie kroky</h3>
          <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5;">Náš obchodný zástupca vás bude kontaktovať do <strong>24 hodín</strong> na:</p>
          <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 6px; margin-bottom: 20px;">
            <div style="margin-bottom: 8px;">
              <strong>Telefón:</strong> <a href="tel:${formData.phone}" style="color: white; text-decoration: none;">${formData.phone}</a>
            </div>
            <div>
              <strong>Email:</strong> <a href="mailto:${formData.email}" style="color: white; text-decoration: none;">${formData.email}</a>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="tel:+420730431313" style="display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Zavolať teraz: +420 730 431 313
            </a>
          </div>
        </div>

        <!-- Contact info -->
        <div style="background: #f8fafc; padding: 24px; border-radius: 8px; text-align: center;">
          <h3 style="color: #0F4C81; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Kontaktné údaje</h3>
          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
            <div style="margin-bottom: 12px;">
              <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-size: 16px; font-weight: 600;">Obchodní zástupce</h4>
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
      <div style="text-align: center; padding: 24px 20px 16px; color: #9ca3af; font-size: 13px; background: #f3f4f6; border-top: 1px solid #e5e7eb;">
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
