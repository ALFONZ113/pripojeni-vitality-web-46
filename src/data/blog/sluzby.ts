
import { BlogPost } from './types';

export const sluzbyPosts: BlogPost[] = [
  {
    id: 2,
    title: "PODA televize: Kompletní průvodce funkcemi a možnostmi",
    excerpt: "Objevte všechny funkce PODA televize - od základního ovládání až po pokročilé možnosti nahrávání a streamování. Praktický návod pro maximální využití vaší televize.",
    content: `
      <div class="prose-content">
        <h2>Úvod do PODA televize</h2>
        <p>PODA televize představuje moderní způsob sledování televizního obsahu s pokročilými funkcemi, které výrazně zlepšují zážitek ze sledování. V tomto článku se dozvíte, jak využít všechny možnosti vaší PODA televize.</p>

        <h2>Základní ovládání PODA televize</h2>
        <h3>Dálkové ovládání</h3>
        <p>PODA televize je vybavena intuitivním dálkovým ovládáním s ergonomickým designem. Hlavní tlačítka zahrnují:</p>
        <ul>
          <li><strong>Power:</strong> Zapnutí/vypnutí televize</li>
          <li><strong>Home:</strong> Návrat na hlavní obrazovku</li>
          <li><strong>Navigační křížek:</strong> Pohyb v menu</li>
          <li><strong>OK:</strong> Potvrzení výběru</li>
          <li><strong>Back:</strong> Návrat zpět</li>
          <li><strong>Volume +/-:</strong> Ovládání hlasitosti</li>
        </ul>

        <h3>Hlavní menu</h3>
        <p>Po zapnutí se zobrazí přehledné hlavní menu s následujícími sekcemi:</p>
        <div class="bg-blue-50 p-4 rounded-lg my-6">
          <ul>
            <li>📺 <strong>Živé vysílání:</strong> Aktuální televizní programy</li>
            <li>🎬 <strong>Video knihovna:</strong> Filmy a seriály na vyžádání</li>
            <li>📅 <strong>TV program:</strong> Elektronický programový průvodce</li>
            <li>⚙️ <strong>Nastavení:</strong> Konfigurace televize</li>
            <li>📊 <strong>Statistiky:</strong> Přehled sledovaného obsahu</li>
          </ul>
        </div>

        <h2>Pokročilé funkce</h2>
        <h3>Nahrávání pořadů</h3>
        <p>PODA televize umožňuje nahrávání oblíbených pořadů pomocí cloudového úložiště:</p>
        <ol>
          <li>Vyberte pořad v TV programu</li>
          <li>Stiskněte tlačítko "REC" na dálkovém ovládání</li>
          <li>Potvrzení nahrávání se zobrazí na obrazovce</li>
          <li>Nahrávky najdete v sekci "Moje nahrávky"</li>
        </ol>

        <h3>Funkce TimeShift</h3>
        <p>TimeShift umožňuje pozastavit živé vysílání a pokračovat ve sledování později:</p>
        <ul>
          <li>Stiskněte tlačítko "Pause" během sledování</li>
          <li>Pořad se pozastaví a začne se ukládat</li>
          <li>Můžete se vrátit až o 2 hodiny zpět</li>
          <li>Použijte tlačítka "Rewind" a "Forward" pro navigaci</li>
        </ul>

        <h2>Videobook - Půjčovna filmů</h2>
        <h3>Jak půjčit film</h3>
        <p>Videobook nabízí širokou škálu filmů a seriálů k půjčení:</p>
        <ol>
          <li>Vstupte do sekce "Video knihovna"</li>
          <li>Procházejte kategorie nebo použijte vyhledávání</li>
          <li>Vyberte film a stiskněte "OK"</li>
          <li>Zvolte kvalitu (HD/4K) a potvrďte půjčení</li>
          <li>Film se začne stahovat a můžete začít sledovat</li>
        </ol>

        <h3>Ceny půjčení</h3>
        <table class="w-full border-collapse border border-gray-300 my-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2">Typ obsahu</th>
              <th class="border border-gray-300 p-2">HD kvalita</th>
              <th class="border border-gray-300 p-2">4K kvalita</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Novinky</td>
              <td class="border border-gray-300 p-2">89 Kč</td>
              <td class="border border-gray-300 p-2">119 Kč</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Katalogové filmy</td>
              <td class="border border-gray-300 p-2">49 Kč</td>
              <td class="border border-gray-300 p-2">69 Kč</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Seriály (epizoda)</td>
              <td class="border border-gray-300 p-2">29 Kč</td>
              <td class="border border-gray-300 p-2">39 Kč</td>
            </tr>
          </tbody>
        </table>

        <h2>Nastavení a konfigurace</h2>
        <h3>Obrazové nastavení</h3>
        <ul>
          <li><strong>Jas a kontrast:</strong> Přizpůsobení podle prostředí</li>
          <li><strong>Režim obrazu:</strong> Cinema, Sport, Vivid</li>
          <li><strong>Rozlišení:</strong> Automatické nebo manuální nastavení</li>
        </ul>

        <h3>Zvukové nastavení</h3>
        <ul>
          <li><strong>Ekvalizér:</strong> Přizpůsobení zvuku podle preference</li>
          <li><strong>Surround sound:</strong> Prostorový zvuk pro domácí kino</li>
          <li><strong>Noční režim:</strong> Snížení dynamiky pro večerní sledování</li>
        </ul>

        <h2>Mobilní aplikace PODA TV</h2>
        <h3>Funkce mobilní aplikace</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
          <ul class="text-green-700 space-y-1">
            <li>✓ Sledování živého vysílání na mobilu</li>
            <li>✓ Přístup k nahrávkám odkudkoliv</li>
            <li>✓ Plánování nahrávek na dálku</li>
            <li>✓ Synchronizace s televizí</li>
            <li>✓ Offline sledování stažených filmů</li>
          </ul>
        </div>

        <h3>Instalace a přihlášení</h3>
        <ol>
          <li>Stáhněte aplikaci "PODA TV" z App Store nebo Google Play</li>
          <li>Přihlaste se pomocí údajů od PODA</li>
          <li>Aplikace se automaticky synchronizuje s vaší televizí</li>
        </ol>

        <h2>Řešení běžných problémů</h2>
        <h3>Problémy s připojením</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <h4 class="text-yellow-800 font-semibold mb-2">Pokud televize nejde:</h4>
          <ol class="text-yellow-700 space-y-1">
            <li>1. Zkontrolujte připojení internetového kabelu</li>
            <li>2. Restartujte set-top box vypnutím a zapnutím</li>
            <li>3. Zkontrolujte stav internetového připojení</li>
            <li>4. Kontaktujte podporu na 730 431 313</li>
          </ol>
        </div>

        <h3>Problémy s kvalitou obrazu</h3>
        <ul>
          <li><strong>Rozmazaný obraz:</strong> Zkontrolujte HDMI kabel a nastavení rozlišení</li>
          <li><strong>Sekání videa:</strong> Nedostatečná rychlost internetu</li>
          <li><strong>Chybí zvuk:</strong> Zkontrolujte audio výstup v nastavení</li>
        </ul>

        <h2>Tipy pro lepší zážitek</h2>
        <ol class="space-y-2">
          <li><strong>Plánujte nahrávky:</strong> Nastavte oblíbené pořady pro automatické nahrávání</li>
          <li><strong>Využívejte vyhledávání:</strong> Rychle najděte konkrétní obsah</li>
          <li><strong>Vytvořte profily:</strong> Různé profily pro různé členy rodiny</li>
          <li><strong>Správa úložiště:</strong> Pravidelně mažte staré nahrávky</li>
          <li><strong>Optimalizujte internet:</strong> Pro 4K obsah doporučujeme 25+ Mbit/s</li>
        </ol>

        <h2>Závěr</h2>
        <p>PODA televize nabízí komplexní televizní zážitek s moderními funkcemi. Osvojení těchto funkcí vám umožní maximálně využít potenciál vaší televize a užít si sledování podle vašich představ.</p>
      </div>
    `,
    date: "30. 5. 2025",
    author: "Ing. Pavel Procházka",
    category: "Služby", 
    image: "/lovable-uploads/4fc5ce47-bd2b-4c44-8e84-4bf330cbf57c.png",
    alt: "PODA televize set-top box s dálkovým ovládáním na moderním stolku",
    tags: ["PODA televize", "návod", "nahrávání", "videobook", "streaming", "set-top box"]
  }
];
