
/**
 * Prerendering utility for generating static HTML files
 * This helps AI bots and search engines see content without JavaScript
 */

export interface PageContent {
  url: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
}

/**
 * Generate static content for key pages
 */
export const generateStaticContent = (): PageContent[] => {
  return [
    {
      url: '/',
      title: 'PODA Internet Ostrava 2025 ✅ Recenze + Ceny | Popri.cz',
      description: 'Nejlepší PODA internet v Ostravě 2025. Porovnání cen, recenze zákazníků a pokrytí Poruba, Vítkovice. Ušetřete až 600 Kč měsíčně!',
      content: `
        <h1>PODA Internet od Popri.cz - Rychlý Internet s TV Zdarma</h1>
        
        <h2>Internetové tarify pro byty:</h2>
        <div class="tariff">
          <h3>Internet + TV Basic</h3>
          <p class="price">250 Kč měsíčně + 50 Kč za zařízení</p>
          <ul>
            <li>Internet 1000/1000 Mbps - Symetrická rychlost pomocí GPON technologie</li>
            <li>Více než 85 TV programů automaticky v ceně</li>
            <li>Bezplatná instalace a aktivace</li>
          </ul>
        </div>
        
        <div class="tariff">
          <h3>Internet + TV Mých 10</h3>
          <p class="price">390 Kč měsíčně + 50 Kč za zařízení</p>
          <ul>
            <li>Internet 1000/1000 Mbps - Symetrická rychlost pomocí GPON technologie</li>
            <li>Více než 100 TV programů s možností výběru 10 vlastních stanic</li>
            <li>Bezplatná instalace a aktivace</li>
          </ul>
        </div>

        <h2>Internetové tarify pro domy:</h2>
        <div class="tariff">
          <h3>Internet + TV Basic</h3>
          <p class="price">250 Kč měsíčně + 50 Kč za zařízení</p>
          <ul>
            <li>Internet 1000/200 Mbps - Bezdrátový internet s rychlostí optického</li>
            <li>Více než 85 TV programů automaticky v ceně</li>
            <li>Bezplatná instalace a aktivace</li>
          </ul>
        </div>

        <h2>Proč zvolit PODA internet od Popri.cz?</h2>
        <ul>
          <li><strong>Rychlý optický internet:</strong> PODA připojení s garantovanou rychlostí až 1000/1000 Mbps</li>
          <li><strong>Chytrá televize:</strong> Více než 100 TV programů, sledování na všech zařízeních</li>
          <li><strong>Moderní technologie:</strong> Optická síť GPON zajišťuje maximální stabilitu</li>
          <li><strong>Profesionální podpora:</strong> Technická podpora 24/7</li>
          <li><strong>Výhodné ceny:</strong> Konkurenceschopné ceny bez skrytých poplatků</li>
        </ul>

        <h2>Pokrytí</h2>
        <p>PODA internet je dostupný v těchto lokalitách:</p>
        <ul>
          <li>Ostrava - všechny městské části</li>
          <li>Karviná a okolí</li>
          <li>Bohumín</li>
          <li>Havířov</li>
          <li>Poruba</li>
        </ul>

        <h2>Kontakt</h2>
        <p><strong>Telefon:</strong> +420 730 431 313</p>
        <p><strong>Email:</strong> terc@obchod.poda.cz</p>
        <p><strong>Adresa:</strong> Ostrava - Poruba, Porubská 944/5, 708 00</p>
        <p>Provozováno obchodním zástupcem společnosti PODA, Milan Terč, IČO: 75546230</p>
      `,
      keywords: ['PODA internet', 'optický internet Ostrava', 'gigabitové připojení', 'TV zdarma', 'GPON technologie']
    },
    {
      url: '/blog',
      title: 'PODA Blog - Tipy a návody pro internet a TV | Popri.cz',
      description: 'Užitečné články o PODA internetu, optických sítích, TV službách a technických tipech. Aktuální informace o pokrytí a cenách.',
      content: `
        <h1>PODA Blog - Tipy a Návody</h1>
        <p>Najděte užitečné informace o PODA internetu, optických sítích a TV službách.</p>
        
        <h2>Nejnovější články:</h2>
        <ul>
          <li>Jak vybrat nejlepší internetového providera v Ostravě</li>
          <li>PODA pokrytí 2025 - Nové lokality</li>
          <li>Rychlost internetu - Co znamenají Mbps hodnoty</li>
          <li>Optická vs. metalická síť - Rozdíly a výhody</li>
          <li>Jak zrychlit pomalý internet - Praktické tipy</li>
        </ul>
      `,
      keywords: ['PODA blog', 'internetové tipy', 'optické sítě', 'rychlost internetu', 'technické návody']
    }
  ];
};

/**
 * Generate prerendered HTML for a page
 */
export const generatePrerenderHTML = (pageContent: PageContent): string => {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageContent.title}</title>
  <meta name="description" content="${pageContent.description}">
  <meta name="keywords" content="${pageContent.keywords.join(', ')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.popri.cz${pageContent.url}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${pageContent.title}">
  <meta property="og:description" content="${pageContent.description}">
  <meta property="og:url" content="https://www.popri.cz${pageContent.url}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Popri.cz - PODA Internet",
    "url": "https://www.popri.cz${pageContent.url}",
    "description": "${pageContent.description}",
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "logo": "https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png"
    }
  }
  </script>
  
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .tariff { border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .price { color: #e11d48; font-size: 1.2em; font-weight: bold; }
    h1 { color: #1e40af; }
    h2 { color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
    ul { line-height: 1.6; }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>
  ${pageContent.content}
  
  <!-- AI Bot Detection Script -->
  <script>
    // Detect AI bots and provide enhanced content
    const userAgent = navigator.userAgent.toLowerCase();
    const isBot = /bot|crawler|spider|crawling|facebookexternalhit|twitterbot|whatsapp/.test(userAgent);
    
    if (isBot) {
      console.log('AI Bot detected, serving enhanced content');
    }
    
    // Redirect to main app for human users
    if (!isBot && '${pageContent.url}' === '/') {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  </script>
  
  <noscript>
    <p><strong>Pozor:</strong> Táto stránka vyžaduje JavaScript pre plnú funkcionalitu. Pre najlepší zážitok povoľte JavaScript vo vašom prehliadači.</p>
  </noscript>
</body>
</html>`;
};
