export const generateCustomerEmailHTML = (formData: any): string => {
  const propertyType = formData.propertyType || 'byty';
  const isApartment = propertyType === 'byty';

  // Noir + Gold color palette
  const colors = {
    noir: '#0a0a0a',
    noirLight: '#1a1a1a',
    noirCard: '#141414',
    gold: '#d4a517',
    goldLight: '#e6c547',
    cream: '#f5f3ed',
    creamMuted: 'rgba(245, 243, 237, 0.6)',
    green: '#22c55e',
    border: 'rgba(245, 243, 237, 0.1)'
  };
  
  const tariffs = isApartment ? [
    {
      name: 'Internet + TV Basic',
      speed: '1000/1000 Mbps',
      technology: 'GPON optická technologie',
      price: '300 Kč',
      priceNote: 'měsíčně',
      tvChannels: 'Více než 85 TV programů',
      features: ['Symetrická rychlost', 'TV automaticky v ceně', 'PODA net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/1000 Mbps', 
      technology: 'GPON optická technologie',
      price: '440 Kč',
      priceNote: 'měsíčně',
      tvChannels: 'Více než 100 TV programů',
      features: ['Symetrická rychlost', 'Výběr 10 vlastních stanic', 'PODA net.TV pro 4 zařízení'],
      recommended: true
    }
  ] : [
    {
      name: 'Internet + TV Basic',
      speed: '1000/200 Mbps',
      technology: 'Bezdrátový internet',
      price: '300 Kč',
      priceNote: 'měsíčně',
      tvChannels: 'Více než 85 TV programů',
      features: ['Rychlost optického internetu', 'TV automaticky v ceně', 'PODA net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/200 Mbps',
      technology: 'Bezdrátový internet', 
      price: '440 Kč',
      priceNote: 'měsíčně',
      tvChannels: 'Více než 100 TV programů',
      features: ['Rychlost optického internetu', 'Výběr 10 vlastních stanic', 'PODA net.TV pro 4 zařízení'],
      recommended: true
    }
  ];

  const generateTariffCards = () => {
    return tariffs.map(tariff => `
      <div style="background: ${colors.noirCard}; border: 1px solid ${tariff.recommended ? colors.gold : colors.border}; border-radius: 16px; padding: 24px; margin-bottom: 16px; position: relative; ${tariff.recommended ? `box-shadow: 0 0 40px rgba(212, 165, 23, 0.15);` : ''}">
        ${tariff.recommended ? `
        <div style="position: absolute; top: -1px; right: 24px; background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%); color: ${colors.noir}; padding: 6px 16px; border-radius: 0 0 8px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
          ⭐ Doporučujeme
        </div>` : ''}
        
        <h3 style="font-family: 'Playfair Display', serif; color: ${colors.cream}; font-size: 22px; font-weight: 600; margin: ${tariff.recommended ? '20px 0 20px 0' : '0 0 20px 0'};">${tariff.name}</h3>
        
        <div style="margin-bottom: 20px; text-align: center; padding: 16px; background: ${colors.noir}; border-radius: 12px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: ${colors.gold}; margin-bottom: 4px;">${tariff.price}</div>
          <div style="color: ${colors.creamMuted}; font-size: 14px;">${tariff.priceNote}</div>
        </div>
        
        <div style="background: ${colors.noir}; padding: 16px; border-radius: 12px; margin-bottom: 20px; border-left: 3px solid ${colors.gold};">
          <div style="margin-bottom: 8px; font-weight: 600; color: ${colors.cream}; font-size: 15px;">🌐 Internet: ${tariff.speed}</div>
          <div style="margin-bottom: 8px; color: ${colors.creamMuted}; font-size: 13px;">${tariff.technology}</div>
          <div style="margin-bottom: 0; font-weight: 600; color: ${colors.cream}; font-size: 15px;">📺 Televize: ${tariff.tvChannels}</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          ${tariff.features.map(feature => `
          <div style="display: flex; align-items: center; margin-bottom: 10px; padding: 4px 0;">
            <div style="width: 8px; height: 8px; background: ${colors.gold}; border-radius: 50%; margin-right: 14px; flex-shrink: 0;"></div>
            <span style="color: ${colors.cream}; font-size: 14px; line-height: 1.4;">${feature}</span>
          </div>
          `).join('')}
        </div>
        
        ${tariff.recommended ? `
        <div style="text-align: center; margin-top: 24px;">
          <a href="tel:+420730431313" style="display: inline-block; background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%); color: ${colors.noir}; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 10px 30px rgba(212, 165, 23, 0.3);">
            Objednat teď →
          </a>
        </div>` : ''}
      </div>
    `).join('');
  };

  const benefits = [
    { icon: '⚡', title: 'Garantovaná rychlost', desc: 'bez omezení a zpomalení' },
    { icon: '📺', title: 'TV automaticky v ceně', desc: 'žádné extra poplatky' },
    { icon: '🚀', title: 'Rychlá instalace', desc: 'do 7 pracovních dnů' },
    { icon: '🛠️', title: 'Non-stop technická podpora', desc: '24/7 dostupnost' },
    { icon: '💰', title: 'Bez skrytých poplatků', desc: 'transparentní ceny' }
  ];

  return `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Děkujeme za váš zájem - Popri.cz</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: ${colors.cream}; margin: 0; padding: 0; background-color: ${colors.noir};">
      
      <!-- Header with Gold Gradient -->
      <div style="background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 50%, ${colors.gold} 100%); padding: 40px 24px; text-align: center;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: ${colors.noir}; margin: 0 0 8px 0;">
          Popri.cz
        </h1>
        <p style="color: ${colors.noir}; margin: 0; font-size: 16px; font-weight: 500; opacity: 0.8;">Váš partner pro PODA internet a TV</p>
      </div>

      <div style="max-width: 600px; margin: 0 auto; background: ${colors.noirLight};">
        <div style="padding: 32px 24px;">
          
          <!-- Greeting -->
          <div style="margin-bottom: 32px; text-align: center;">
            <h2 style="font-family: 'Playfair Display', serif; color: ${colors.cream}; margin: 0 0 16px 0; font-size: 28px; font-weight: 600;">
              Vážený/á ${formData.name},
            </h2>
            <p style="margin: 0; font-size: 16px; line-height: 1.7; color: ${colors.creamMuted};">
              děkujeme za váš zájem o naše PODA služby. 
              Připravili jsme pro vás profesionální přehled dostupných tarifů pro 
              <strong style="color: ${colors.gold};">${isApartment ? 'byty a bytové domy' : 'rodinné domy'}</strong>.
            </p>
          </div>

          <!-- Location info -->
          ${formData.address || formData.city ? `
          <div style="background: ${colors.noirCard}; padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; border-left: 4px solid ${colors.gold};">
            <div style="font-weight: 600; color: ${colors.gold}; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">📍 Vaše adresa</div>
            <div style="color: ${colors.cream}; font-size: 16px; margin-bottom: 8px;">${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</div>
            <div style="color: ${colors.creamMuted}; font-size: 14px;">
              Typ: ${isApartment ? '🏢 Byt/bytový dům - GPON' : '🏠 Rodinný dům - Bezdrátový internet'}
            </div>
          </div>
          ` : ''}
          
          <!-- Tariffs -->
          <div style="margin-bottom: 32px;">
            <h3 style="font-family: 'Playfair Display', serif; color: ${colors.cream}; font-size: 24px; margin-bottom: 24px; font-weight: 600; text-align: center;">
              ✨ Dostupné služby
            </h3>
            ${generateTariffCards()}
          </div>

          <!-- Benefits -->
          <div style="background: ${colors.noirCard}; padding: 28px; border-radius: 16px; margin-bottom: 32px; border: 1px solid ${colors.border};">
            <h3 style="font-family: 'Playfair Display', serif; color: ${colors.cream}; margin: 0 0 24px 0; font-size: 22px; font-weight: 600; text-align: center;">
              Proč si vybrat PODA služby?
            </h3>
            ${benefits.map(benefit => `
            <div style="display: flex; align-items: flex-start; margin-bottom: 16px; padding: 8px 0;">
              <div style="font-size: 20px; margin-right: 16px; flex-shrink: 0;">${benefit.icon}</div>
              <div>
                <strong style="color: ${colors.gold}; font-size: 15px;">${benefit.title}</strong>
                <span style="color: ${colors.creamMuted}; font-size: 14px;"> - ${benefit.desc}</span>
              </div>
            </div>
            `).join('')}
          </div>

          <!-- Next steps -->
          <div style="background: linear-gradient(135deg, ${colors.gold}15 0%, ${colors.goldLight}10 100%); border: 1px solid ${colors.gold}30; padding: 28px; border-radius: 16px; margin-bottom: 32px;">
            <h3 style="font-family: 'Playfair Display', serif; margin: 0 0 16px 0; color: ${colors.cream}; font-size: 22px; font-weight: 600; text-align: center;">
              🚀 Další kroky
            </h3>
            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; text-align: center; color: ${colors.creamMuted};">
              Náš obchodní zástupce vás bude kontaktovat do <strong style="color: ${colors.gold};">24 hodin</strong>
            </p>
            
            <div style="background: ${colors.noirCard}; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
              <div style="margin-bottom: 12px; display: flex; align-items: center;">
                <span style="color: ${colors.creamMuted}; font-size: 14px; width: 70px;">Telefon:</span>
                <a href="tel:${formData.phone}" style="color: ${colors.gold}; text-decoration: none; font-weight: 600;">${formData.phone}</a>
              </div>
              ${formData.email ? `
              <div style="display: flex; align-items: center;">
                <span style="color: ${colors.creamMuted}; font-size: 14px; width: 70px;">Email:</span>
                <a href="mailto:${formData.email}" style="color: ${colors.gold}; text-decoration: none;">${formData.email}</a>
              </div>
              ` : ''}
            </div>
            
            <div style="text-align: center;">
              <a href="tel:+420730431313" style="display: inline-block; background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%); color: ${colors.noir}; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 10px 30px rgba(212, 165, 23, 0.3);">
                📞 Zavolat: +420 730 431 313
              </a>
            </div>
          </div>

          <!-- Contact info -->
          <div style="background: ${colors.noirCard}; padding: 28px; border-radius: 16px; text-align: center; border: 1px solid ${colors.border};">
            <h3 style="font-family: 'Playfair Display', serif; color: ${colors.cream}; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
              Kontaktní údaje
            </h3>
            <div style="background: ${colors.noir}; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
              <h4 style="margin: 0 0 8px 0; color: ${colors.cream}; font-size: 16px; font-weight: 600;">Obchodní zástupce PODA</h4>
              <div style="margin-bottom: 8px;">
                <a href="tel:+420730431313" style="color: ${colors.gold}; text-decoration: none; font-weight: 600; font-size: 18px;">+420 730 431 313</a>
              </div>
              <div>
                <a href="mailto:terc@obchod.poda.cz" style="color: ${colors.gold}; text-decoration: none;">terc@obchod.poda.cz</a>
              </div>
            </div>
            <p style="margin: 0; color: ${colors.creamMuted}; font-size: 14px; line-height: 1.6;">
              Máte otázky? Neváhejte nás kontaktovat!<br>
              Těšíme se na spolupráci s vámi.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 28px 24px; color: ${colors.creamMuted}; font-size: 13px; background: ${colors.noir}; border-top: 1px solid ${colors.border};">
          <p style="margin: 0 0 8px 0;">Tento email byl automaticky vygenerován z webu</p>
          <p style="margin: 0;">
            <a href="https://www.popri.cz" style="color: ${colors.gold}; text-decoration: none; font-weight: 600; font-size: 16px;">
              Popri.cz
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
