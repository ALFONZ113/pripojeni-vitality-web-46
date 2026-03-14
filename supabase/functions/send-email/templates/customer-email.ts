export const generateCustomerEmailHTML = (formData: any): string => {
  const propertyType = formData.propertyType || 'byty';
  const isApartment = propertyType === 'byty';

  const tariffs = isApartment ? [
    {
      name: 'Internet + TV Basic',
      speed: '1000/1000 Mbps',
      technology: 'GPON optická technologie',
      price: '300',
      tvChannels: '85+ TV programů',
      features: ['Symetrická rychlost', 'TV v ceně', 'net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/1000 Mbps',
      technology: 'GPON optická technologie',
      price: '440',
      tvChannels: '100+ TV programů',
      features: ['Symetrická rychlost', '10 vlastních stanic', 'net.TV pro 4 zařízení'],
      recommended: true
    }
  ] : [
    {
      name: 'Internet + TV Basic',
      speed: '1000/200 Mbps',
      technology: 'Bezdrátový internet',
      price: '300',
      tvChannels: '85+ TV programů',
      features: ['Rychlost optického internetu', 'TV v ceně', 'net.TV pro 4 zařízení']
    },
    {
      name: 'Internet + TV Mých 10',
      speed: '1000/200 Mbps',
      technology: 'Bezdrátový internet',
      price: '440',
      tvChannels: '100+ TV programů',
      features: ['Rychlost optického internetu', '10 vlastních stanic', 'net.TV pro 4 zařízení'],
      recommended: true
    }
  ];

  const generateTariffCard = (tariff: any) => `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:16px;">
      <tr>
        <td style="background:#141414;border:1px solid ${tariff.recommended ? '#d4a517' : 'rgba(245,243,237,0.08)'};border-radius:16px;padding:0;${tariff.recommended ? 'box-shadow:0 0 30px rgba(212,165,23,0.12);' : ''}">
          ${tariff.recommended ? `
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:0 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:linear-gradient(135deg,#d4a517,#e6c547);color:#0a0a0a;padding:6px 20px;border-radius:0 0 10px 10px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;text-align:center;">
                      DOPORUČUJEME
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>` : ''}
          
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:${tariff.recommended ? '16px 24px 24px' : '24px'};">
            <tr>
              <td>
                <!-- Tariff Name -->
                <p style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;font-size:20px;font-weight:600;margin:0 0 16px 0;">${tariff.name}</p>
                
                <!-- Price Box -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:16px;">
                  <tr>
                    <td style="background:#0a0a0a;border-radius:12px;padding:16px;text-align:center;">
                      <span style="font-family:'Playfair Display',Georgia,serif;font-size:34px;font-weight:700;color:#d4a517;">${tariff.price} Kč</span>
                      <br>
                      <span style="font-family:'Inter',Arial,sans-serif;color:rgba(245,243,237,0.5);font-size:13px;">měsíčně</span>
                    </td>
                  </tr>
                </table>
                
                <!-- Speed & TV Info -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:16px;">
                  <tr>
                    <td style="background:#0a0a0a;padding:14px 16px;border-radius:12px;border-left:3px solid #d4a517;">
                      <p style="margin:0 0 4px 0;font-family:'Inter',Arial,sans-serif;font-weight:600;color:#f5f3ed;font-size:14px;">Internet: ${tariff.speed}</p>
                      <p style="margin:0 0 8px 0;font-family:'Inter',Arial,sans-serif;color:rgba(245,243,237,0.5);font-size:12px;">${tariff.technology}</p>
                      <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-weight:600;color:#f5f3ed;font-size:14px;">TV: ${tariff.tvChannels}</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Features -->
                ${tariff.features.map((f: string) => `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:8px;">
                  <tr>
                    <td width="24" valign="top" style="padding-top:6px;">
                      <div style="width:6px;height:6px;background:#d4a517;border-radius:50%;"></div>
                    </td>
                    <td style="font-family:'Inter',Arial,sans-serif;color:#f5f3ed;font-size:13px;line-height:1.5;">${f}</td>
                  </tr>
                </table>`).join('')}
                
                ${tariff.recommended ? `
                <!-- CTA Button -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:20px;">
                  <tr>
                    <td align="center">
                      <a href="tel:+420730431313" style="display:inline-block;background:linear-gradient(135deg,#d4a517,#e6c547);color:#0a0a0a;padding:14px 32px;border-radius:12px;text-decoration:none;font-family:'Inter',Arial,sans-serif;font-weight:700;font-size:14px;">
                        Objednat teď
                      </a>
                    </td>
                  </tr>
                </table>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  const benefits = [
    { title: 'Garantovaná rychlost', desc: 'bez omezení a zpomalení' },
    { title: 'TV automaticky v ceně', desc: 'žádné extra poplatky' },
    { title: 'Rychlá instalace', desc: 'do 7 pracovních dnů' },
    { title: 'Non-stop podpora', desc: '24/7 dostupnost' },
    { title: 'Bez skrytých poplatků', desc: 'transparentní ceny' }
  ];

  return `<!DOCTYPE html>
<html lang="cs" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>Děkujeme za váš zájem - Popri.cz</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    * { box-sizing: border-box; }
    body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    a { color: #d4a517; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .header-padding { padding: 32px 20px !important; }
      .logo-text { font-size: 30px !important; }
      .greeting-text { font-size: 24px !important; }
      .section-title { font-size: 20px !important; }
      .price-text { font-size: 30px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#f5f3ed;">
  
  <!-- Preheader (hidden) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    Děkujeme za váš zájem o PODA služby. Připravili jsme přehled tarifů.
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;">
    <tr>
      <td align="center" style="padding:0;">
        
        <!-- Email container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="max-width:600px;width:100%;margin:0 auto;">
          
          <!-- ========== HEADER ========== -->
          <tr>
            <td class="header-padding" style="background:linear-gradient(145deg,#d4a517 0%,#c99a15 40%,#e6c547 100%);padding:36px 24px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p class="logo-text" style="font-family:'Playfair Display',Georgia,serif;font-size:34px;font-weight:700;margin:0;line-height:1.2;">
                      <span style="color:#0a0a0a;">popri</span><span style="color:#ffffff;">.cz</span>
                    </p>
                    <p style="font-family:'Inter',Arial,sans-serif;color:rgba(10,10,10,0.7);margin:6px 0 0 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;">
                      Autorizovaný partner PODA
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ========== BODY ========== -->
          <tr>
            <td style="background:#1a1a1a;">
              
              <!-- Greeting -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:32px 28px 24px;">
                    <h1 class="greeting-text" style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;margin:0 0 16px 0;font-size:26px;font-weight:600;text-align:center;line-height:1.3;">
                      Vážený/á ${formData.name},
                    </h1>
                    <p style="font-family:'Inter',Arial,sans-serif;margin:0;font-size:15px;line-height:1.7;color:rgba(245,243,237,0.65);text-align:center;">
                      děkujeme za váš zájem o naše služby. Připravili jsme přehled tarifů pro
                      <strong style="color:#d4a517;">${isApartment ? 'byty a bytové domy' : 'rodinné domy'}</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              ${formData.address || formData.city ? `
              <!-- Address -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="background:#141414;padding:16px 20px;border-radius:12px;border-left:3px solid #d4a517;">
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:700;color:#d4a517;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px 0;">Vaše adresa</p>
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#f5f3ed;margin:0 0 4px 0;">${formData.address ? formData.address + ', ' : ''}${formData.city || ''}</p>
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:rgba(245,243,237,0.5);margin:0;">${isApartment ? 'Byt / bytový dům — GPON' : 'Rodinný dům — Bezdrátový internet'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>` : ''}

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 28px;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,165,23,0.3),transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- Section Title: Tariffs -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 20px;text-align:center;">
                    <h2 class="section-title" style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;font-size:22px;font-weight:600;margin:0;">Dostupné služby</h2>
                  </td>
                </tr>
              </table>

              <!-- Tariff Cards -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 28px;">
                    ${tariffs.map(t => generateTariffCard(t)).join('')}
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 28px;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,165,23,0.3),transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#141414;border-radius:16px;border:1px solid rgba(245,243,237,0.06);">
                      <tr>
                        <td style="padding:24px;">
                          <h3 class="section-title" style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;font-size:20px;font-weight:600;margin:0 0 20px 0;text-align:center;">
                            Proč PODA služby?
                          </h3>
                          ${benefits.map(b => `
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:12px;">
                            <tr>
                              <td width="22" valign="top" style="padding-top:5px;">
                                <div style="width:8px;height:8px;background:linear-gradient(135deg,#d4a517,#e6c547);border-radius:50%;"></div>
                              </td>
                              <td style="font-family:'Inter',Arial,sans-serif;">
                                <span style="color:#d4a517;font-size:14px;font-weight:600;">${b.title}</span>
                                <span style="color:rgba(245,243,237,0.5);font-size:13px;"> — ${b.desc}</span>
                              </td>
                            </tr>
                          </table>`).join('')}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#141414;border-radius:16px;border:1px solid rgba(212,165,23,0.15);">
                      <tr>
                        <td style="padding:24px;">
                          <h3 class="section-title" style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;font-size:20px;font-weight:600;margin:0 0 12px 0;text-align:center;">
                            Další kroky
                          </h3>
                          <p style="font-family:'Inter',Arial,sans-serif;margin:0 0 20px 0;font-size:15px;line-height:1.6;text-align:center;color:rgba(245,243,237,0.65);">
                            Náš obchodní zástupce vás bude kontaktovat do&nbsp;<strong style="color:#d4a517;">24&nbsp;hodin</strong>.
                          </p>
                          
                          <!-- Contact details - stacked for mobile -->
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;border-radius:12px;margin-bottom:20px;">
                            <tr>
                              <td style="padding:16px 20px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="padding-bottom:${formData.email ? '12px' : '0'};">
                                      <p style="font-family:'Inter',Arial,sans-serif;color:rgba(245,243,237,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">Telefon</p>
                                      <a href="tel:${formData.phone}" style="font-family:'Inter',Arial,sans-serif;color:#d4a517;text-decoration:none;font-weight:600;font-size:16px;">${formData.phone}</a>
                                    </td>
                                  </tr>
                                  ${formData.email ? `
                                  <tr>
                                    <td style="border-top:1px solid rgba(245,243,237,0.06);padding-top:12px;">
                                      <p style="font-family:'Inter',Arial,sans-serif;color:rgba(245,243,237,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;">Email</p>
                                      <a href="mailto:${formData.email}" style="font-family:'Inter',Arial,sans-serif;color:#d4a517;text-decoration:none;font-size:14px;word-break:break-all;">${formData.email}</a>
                                    </td>
                                  </tr>` : ''}
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- CTA -->
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td align="center">
                                <a href="tel:+420730431313" style="display:inline-block;background:linear-gradient(135deg,#d4a517,#e6c547);color:#0a0a0a;padding:14px 36px;border-radius:12px;text-decoration:none;font-family:'Inter',Arial,sans-serif;font-weight:700;font-size:15px;">
                                  Zavolat: +420 730 431 313
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Contact Card -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td class="content-padding" style="padding:0 28px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#141414;border-radius:16px;border:1px solid rgba(245,243,237,0.06);">
                      <tr>
                        <td style="padding:24px;text-align:center;">
                          <h3 style="font-family:'Playfair Display',Georgia,serif;color:#f5f3ed;font-size:18px;font-weight:600;margin:0 0 16px 0;">
                            Obchodní zástupce PODA
                          </h3>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;border-radius:12px;margin-bottom:12px;">
                            <tr>
                              <td style="padding:16px;text-align:center;">
                                <a href="tel:+420730431313" style="font-family:'Inter',Arial,sans-serif;color:#d4a517;text-decoration:none;font-weight:600;font-size:18px;display:block;margin-bottom:6px;">+420 730 431 313</a>
                                <a href="mailto:terc@obchod.poda.cz" style="font-family:'Inter',Arial,sans-serif;color:#d4a517;text-decoration:none;font-size:13px;">terc@obchod.poda.cz</a>
                              </td>
                            </tr>
                          </table>
                          <p style="font-family:'Inter',Arial,sans-serif;margin:0;color:rgba(245,243,237,0.45);font-size:13px;line-height:1.5;">
                            Neváhejte nás kontaktovat!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ========== FOOTER ========== -->
          <tr>
            <td style="background:#0a0a0a;padding:24px 28px;text-align:center;border-top:1px solid rgba(245,243,237,0.06);">
              <p style="font-family:'Inter',Arial,sans-serif;margin:0 0 6px 0;color:rgba(245,243,237,0.35);font-size:12px;">Automaticky vygenerováno z webu</p>
              <a href="https://www.popri.cz" style="font-family:'Playfair Display',Georgia,serif;color:#d4a517;text-decoration:none;font-weight:600;font-size:15px;">Popri.cz</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
};
