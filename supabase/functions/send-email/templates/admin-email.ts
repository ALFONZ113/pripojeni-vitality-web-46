export const generateAdminEmailHTML = (formData: any): string => {
  const isCallbackRequest = formData.name.includes("Žádost o zpětné volání");

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

  if (isCallbackRequest) {
    return `
      <!DOCTYPE html>
      <html lang="cs">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Žádost o zpětné volání - Popri.cz</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: ${colors.noir};">
        <div style="max-width: 600px; margin: 0 auto; background-color: ${colors.noirLight};">
          
          <!-- Header with Gold Gradient -->
          <div style="background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 50%, ${colors.gold} 100%); padding: 28px 24px; text-align: center;">
            <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; margin-bottom: 8px;">
              <span style="color: #D4A517;">popri</span><span style="color: #0A0A0A;">.cz</span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: ${colors.noir}; margin: 0;">Žádost o zpětné volání</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <!-- Phone Number Card -->
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
              <p style="color: ${colors.creamMuted}; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Telefonní číslo</p>
              <p style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: ${colors.gold}; margin: 0;">
                <a href="tel:${formData.phone}" style="color: ${colors.gold}; text-decoration: none;">${formData.phone}</a>
              </p>
            </div>

            <!-- Time Info -->
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="display: flex; align-items: center; justify-content: center;">
                <span style="color: ${colors.creamMuted}; font-size: 14px;">Čas žádosti:</span>
                <span style="color: ${colors.cream}; font-size: 14px; margin-left: 8px; font-weight: 500;">${new Date().toLocaleString('cs-CZ')}</span>
              </div>
            </div>

            <!-- Call Now Button -->
            <div style="text-align: center;">
              <a href="tel:${formData.phone}" style="display: inline-block; background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%); color: ${colors.noir}; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(212, 165, 23, 0.3);">
                Zavolat zákazníkovi
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: ${colors.noir}; padding: 24px; text-align: center; border-top: 1px solid ${colors.border};">
            <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0;">
              Automaticky vygenerováno z webu 
              <a href="https://www.popri.cz" style="color: ${colors.gold}; text-decoration: none;">Popri.cz</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html lang="cs">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nový kontakt - Popri.cz</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: ${colors.noir};">
        <div style="max-width: 600px; margin: 0 auto; background-color: ${colors.noirLight};">
          
          <!-- Header with Gold Gradient -->
          <div style="background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 50%, ${colors.gold} 100%); padding: 28px 24px; text-align: center;">
            <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; margin-bottom: 8px;">
              <span style="color: #D4A517;">popri</span><span style="color: #0A0A0A;">.cz</span>
            </div>
            <p style="font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: ${colors.noir}; margin: 0;">Nový kontakt z webu</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            
            <!-- Customer Info Card -->
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: ${colors.cream}; margin: 0 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid ${colors.border};">
                Kontaktní údaje
              </h2>
              
              <div style="margin-bottom: 16px;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Jméno</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0; font-weight: 500;">${formData.name}</p>
              </div>
              
              <div style="margin-bottom: 16px;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                <p style="color: ${colors.gold}; font-size: 16px; margin: 0;">
                  <a href="mailto:${formData.email}" style="color: ${colors.gold}; text-decoration: none;">${formData.email}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 0;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Telefon</p>
                <p style="color: ${colors.gold}; font-size: 18px; margin: 0; font-weight: 600;">
                  <a href="tel:${formData.phone}" style="color: ${colors.gold}; text-decoration: none;">${formData.phone}</a>
                </p>
              </div>
            </div>

            <!-- Property & Address Card -->
            ${formData.propertyType || formData.address || formData.city ? `
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: ${colors.cream}; margin: 0 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid ${colors.border};">
                Nemovitost
              </h2>
              
              ${formData.propertyType ? `
              <div style="margin-bottom: 16px;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Typ</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0; font-weight: 500;">${formData.propertyType === 'byty' ? 'Byt / bytovka' : 'Rodinný dům'}</p>
              </div>
              ` : ''}
              
              ${formData.address ? `
              <div style="margin-bottom: 16px;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Adresa</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0;">${formData.address}</p>
              </div>
              ` : ''}
              
              ${formData.city ? `
              <div style="margin-bottom: ${formData.zip ? '16px' : '0'};">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Město</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0;">${formData.city}</p>
              </div>
              ` : ''}
              
              ${formData.zip ? `
              <div style="margin-bottom: 0;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">PSČ</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0;">${formData.zip}</p>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <!-- Current Provider Card -->
            ${formData.currentProvider || formData.currentPrice ? `
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: ${colors.cream}; margin: 0 0 20px 0; padding-bottom: 16px; border-bottom: 1px solid ${colors.border};">
                Současné připojení
              </h2>
              
              ${formData.currentProvider ? `
              <div style="margin-bottom: ${formData.currentPrice ? '16px' : '0'};">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Poskytovatel</p>
                <p style="color: ${colors.cream}; font-size: 16px; margin: 0;">${formData.currentProvider}</p>
              </div>
              ` : ''}
              
              ${formData.currentPrice ? `
              <div style="margin-bottom: 0;">
                <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Aktuální cena</p>
                <p style="color: ${colors.gold}; font-size: 18px; margin: 0; font-weight: 600;">${formData.currentPrice}</p>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <!-- Message Card -->
            ${formData.message ? `
            <div style="background: ${colors.noirCard}; border: 1px solid ${colors.border}; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: ${colors.cream}; margin: 0 0 16px 0;">
                Zpráva
              </h2>
              <p style="color: ${colors.cream}; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-line;">${formData.message}</p>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="text-align: center;">
              <a href="tel:${formData.phone}" style="display: inline-block; background: linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%); color: ${colors.noir}; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(212, 165, 23, 0.3); margin-right: 12px;">
                Zavolat
              </a>
              <a href="mailto:${formData.email}" style="display: inline-block; background: ${colors.noirCard}; border: 1px solid ${colors.gold}; color: ${colors.gold}; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Napsat email
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: ${colors.noir}; padding: 24px; text-align: center; border-top: 1px solid ${colors.border};">
            <p style="color: ${colors.creamMuted}; font-size: 12px; margin: 0;">
              Automaticky vygenerováno z webu 
              <a href="https://www.popri.cz" style="color: ${colors.gold}; text-decoration: none;">Popri.cz</a>
              <br>
              <span style="color: ${colors.creamMuted};">${new Date().toLocaleString('cs-CZ')}</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};
