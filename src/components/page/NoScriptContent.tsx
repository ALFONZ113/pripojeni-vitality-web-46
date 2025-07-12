
import React from 'react';

/**
 * AI-friendly noscript content component
 * This ensures AI bots can read page content even without JavaScript
 */
const NoScriptContent = () => {
  return (
    <noscript>
      <div className="noscript-fallback">
        <header>
          <img 
            src="/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png" 
            alt="PODA Logo" 
            width="150" 
            height="70"
          />
          <h1>Popri.cz - PODA Internet s TV Zdarma</h1>
          <p>Rychlý gigabitový internet pro Ostravsko</p>
        </header>

        <main>
          <section>
            <h2>Internetové tarify</h2>
            
            <div className="tariff-noscript">
              <h3>Internet + TV Basic (Byty)</h3>
              <p className="price">250 Kč/měsíc + 50 Kč za zařízení</p>
              <ul>
                <li>Internet 1000/1000 Mbps (symetrický GPON)</li>
                <li>85+ TV programů zdarma</li>
                <li>Bezplatná instalace</li>
              </ul>
            </div>

            <div className="tariff-noscript">
              <h3>Internet + TV Mých 10 (Byty)</h3>
              <p className="price">390 Kč/měsíc + 50 Kč za zařízení</p>
              <ul>
                <li>Internet 1000/1000 Mbps (symetrický GPON)</li>
                <li>100+ TV programů + výběr 10 vlastních</li>
                <li>Bezplatná instalace</li>
              </ul>
            </div>

            <div className="tariff-noscript">
              <h3>Internet + TV Basic (Domy)</h3>
              <p className="price">250 Kč/měsíc + 50 Kč za zařízení</p>
              <ul>
                <li>Internet 1000/200 Mbps (bezdrátový)</li>
                <li>85+ TV programů zdarma</li>
                <li>Bezplatná instalace</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Proč PODA od Popri.cz?</h2>
            <ul>
              <li><strong>Optická síť GPON:</strong> Maximální rychlost a stabilita</li>
              <li><strong>TV zdarma:</strong> Až 100+ programů bez dalších poplatků</li>
              <li><strong>Profesionální servis:</strong> Technická podpora 24/7</li>
              <li><strong>Výhodné ceny:</strong> Bez skrytých poplatků</li>
              <li><strong>Rychlá instalace:</strong> Obvykle do 7 dnů</li>
            </ul>
          </section>

          <section>
            <h2>Pokrytí lokalit</h2>
            <ul>
              <li>Ostrava - všechny městské části</li>
              <li>Karviná a okolní obce</li>
              <li>Bohumín</li>
              <li>Havířov</li>
              <li>Poruba</li>
              <li>Orlová</li>
            </ul>
          </section>

          <section>
            <h2>Kontakt</h2>
            <p><strong>Objednávky a dotazy:</strong></p>
            <p>Telefon: <a href="tel:+420730431313">+420 730 431 313</a></p>
            <p>Email: terc@obchod.poda.cz</p>
            <p>Adresa: Ostrava - Poruba, Porubská 944/5, 708 00</p>
            <p><em>Provozuje: Milan Terč, obchodní zástupce PODA a.s., IČO: 75546230</em></p>
          </section>
        </main>

        <footer>
          <p>© 2025 Popri.cz - Autorizovaný prodejce PODA internetu</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .noscript-fallback {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          .noscript-fallback header {
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
            margin-bottom: 30px;
            padding-bottom: 20px;
          }
          .noscript-fallback h1 {
            color: #1e40af;
            font-size: 2em;
            margin: 20px 0 10px 0;
          }
          .noscript-fallback h2 {
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
            margin-top: 30px;
          }
          .tariff-noscript {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            background: #f9fafb;
          }
          .tariff-noscript h3 {
            color: #1f2937;
            margin-top: 0;
          }
          .price {
            color: #e11d48;
            font-size: 1.3em;
            font-weight: bold;
            margin: 10px 0;
          }
          .noscript-fallback ul {
            margin: 15px 0;
            padding-left: 20px;
          }
          .noscript-fallback li {
            margin-bottom: 8px;
          }
          .noscript-fallback footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
          }
          .noscript-fallback a {
            color: #2563eb;
            text-decoration: none;
          }
          .noscript-fallback a:hover {
            text-decoration: underline;
          }
        `
      }} />
    </noscript>
  );
};

export default NoScriptContent;
