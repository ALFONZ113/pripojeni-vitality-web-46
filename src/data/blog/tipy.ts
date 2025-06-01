import { BlogPost } from './types';

export const tipyPosts: BlogPost[] = [
  {
    id: 6,
    title: "Jak vybrat správný internetový tarif pro vaši domácnost",
    excerpt: "Praktický průvodce výběrem internetového tarifu podle počtu uživatelů, typu využití a rozpočtu. Zjistěte, jaká rychlost internetu skutečně potřebujete.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Proč je výběr správného tarifu důležitý</h2>
        <p>Výběr internetového tarifu může značně ovlivnit vaši spokojenost s připojením a také váš rozpočet. Správně zvolený tarif zajistí plynulé fungování všech online aktivit bez zbytečného přeplácení.</p>

        <h2>Analýza potřeb domácnosti</h2>
        <h3>Počet uživatelů a zařízení</h3>
        <ul>
          <li><strong>1-2 osoby:</strong> základní tarify 50-100 Mbit/s</li>
          <li><strong>3-4 osoby:</strong> střední tarify 100-300 Mbit/s</li>
          <li><strong>5+ osoby:</strong> vysokorychlostní tarify 300+ Mbit/s</li>
        </ul>

        <h3>Typ využití internetu</h3>
        <div class="bg-blue-50 p-4 rounded-lg my-6">
          <ul>
            <li>📱 <strong>Základní použití:</strong> e-mail, prohlížení webu, sociální sítě</li>
            <li>📺 <strong>Streaming:</strong> Netflix, YouTube, online televize</li>
            <li>🎮 <strong>Gaming:</strong> online hry, stahování her</li>
            <li>💼 <strong>Home office:</strong> videokonference, cloud služby</li>
          </ul>
        </div>

        <h2>Doporučené rychlosti podle aktivit</h2>
        <table class="w-full border-collapse border border-gray-300 my-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2">Aktivita</th>
              <th class="border border-gray-300 p-2">Doporučená rychlost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">HD streaming (1 zařízení)</td>
              <td class="border border-gray-300 p-2">5-10 Mbit/s</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">4K streaming (1 zařízení)</td>
              <td class="border border-gray-300 p-2">25-35 Mbit/s</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Videokonference HD</td>
              <td class="border border-gray-300 p-2">3-5 Mbit/s</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Online gaming</td>
              <td class="border border-gray-300 p-2">3-6 Mbit/s (nízká latence)</td>
            </tr>
          </tbody>
        </table>

        <h2>Cenové kategorie a doporučení</h2>
        <h3>Ekonomická varianta</h3>
        <p>Pro základní potřeby 1-2 osob postačí tarif do 100 Mbit/s. Vhodné pro prohlížení webu, e-mail a občasné sledování videí.</p>

        <h3>Standardní varianta</h3>
        <p>Tarify 100-300 Mbit/s jsou ideální pro většinu domácností. Umožňují současné využívání více zařízení bez omezení.</p>

        <h3>Prémiová varianta</h3>
        <p>Rychlosti nad 300 Mbit/s jsou vhodné pro náročné uživatele, velkí domácnosti nebo profesionální využití.</p>

        <h2>Na co si dát pozor při výběru</h2>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <h3 class="text-yellow-800 font-semibold mb-2">Důležité faktory:</h3>
          <ul class="text-yellow-700 space-y-1">
            <li>✓ Skutečná rychlost vs. reklamovaná rychlost</li>
            <li>✓ Stabilita připojení a výpadky</li>
            <li>✓ Kvalita zákaznické podpory</li>
            <li>✓ Možnost upgradu/downgradu tarifu</li>
            <li>✓ Podmínky smlouvy a výpovědní lhůty</li>
          </ul>
        </div>

        <h2>Praktické tipy pro výběr</h2>
        <ol class="space-y-2">
          <li><strong>Otestujte současnou rychlost</strong> - použijte speedtest pro zjištění aktuálních potřeb</li>
          <li><strong>Zvažte budoucí potřeby</strong> - počítejte s růstem počtu zařízení</li>
          <li><strong>Porovnejte poskytovatele</strong> - nejen cenu, ale i kvalitu služeb</li>
          <li><strong>Přečtěte si recenze</strong> - zkušenosti ostatních zákazníků</li>
          <li><strong>Vyjednejte podmínky</strong> - zeptejte se na slevy a výhody</li>
        </ol>

        <h2>Závěr</h2>
        <p>Správný výběr internetového tarifu vyžaduje pečlivé zvážení vašich potřeb, rozpočtu a dostupných možností. Investujte čas do analýzy a porovnání - kvalitní internetové připojení je základem pro pohodlný digitální život.</p>
      </div>
    `,
    date: "28. 5. 2025",
    author: "Tomáš Svoboda",
    category: "Tipy a rady",
    image: "/lovable-uploads/56ebeef3-04d0-42a6-ac4f-f47224a075fb.png",
    alt: "Rychloměr internetu ukazující různé rychlosti připojení",
    tags: ["internetové tarify", "rychlost internetu", "výběr poskytovatele", "domácí internet", "streaming", "online gaming"]
  },
  {
    id: 7,
    title: "Optimalizace Wi-Fi signálu v domácnosti: Praktické tipy",
    excerpt: "Naučte se, jak zlepšit pokrytí Wi-Fi signálu ve vašem domě nebo bytě. Praktické rady pro umístění routeru a odstranění rušivých vlivů.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Proč je silný Wi-Fi signál důležitý</h2>
        <p>Kvalitní Wi-Fi pokrytí je dnes nezbytnost pro každou domácnost. Slabý signál může způsobovat pomalé načítání stránek, přerušované videohovory a frustraci při používání internetu.</p>

        <h2>Optimální umístění Wi-Fi routeru</h2>
        <h3>Základní pravidla umístění</h3>
        <ul>
          <li><strong>Centrální poloha:</strong> Umístěte router doprostřed domácnosti</li>
          <li><strong>Vyvýšené místo:</strong> Ideálně 1-2 metry nad zemí</li>
          <li><strong>Otevřený prostor:</strong> Vyhněte se uzavřeným skříním a koutům</li>
          <li><strong>Vertikální antény:</strong> Nastavte antény kolmo k zemi</li>
        </ul>

        <h3>Co se vyhnout</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-4 my-6">
          <ul class="text-red-700 space-y-1">
            <li>❌ Umístění v suterénu nebo na půdě</li>
            <li>❌ Blízkost mikrovlnné trouby a Bluetooth zařízení</li>
            <li>❌ Za velkými kovovými předměty</li>
            <li>❌ V uzavřených skříních nebo za knihovnami</li>
          </ul>
        </div>

        <h2>Identifikace a odstranění rušivých vlivů</h2>
        <h3>Běžné zdroje interference</h3>
        <ul>
          <li><strong>Mikrovlnné trouby:</strong> Ruší 2.4 GHz pásmo</li>
          <li><strong>Bluetooth zařízení:</strong> Reproduktory, myši, klávesnice</li>
          <li><strong>Baby monitory:</strong> Často používají stejné frekvence</li>
          <li><strong>Sousední Wi-Fi sítě:</strong> Překrývající se kanály</li>
        </ul>

        <h3>Řešení problémů s interferencí</h3>
        <div class="bg-green-50 p-4 rounded-lg my-6">
          <ul class="space-y-2">
            <li>✅ <strong>Změna kanálu:</strong> Použijte kanály 1, 6 nebo 11 na 2.4 GHz</li>
            <li>✅ <strong>5 GHz pásmo:</strong> Méně přeplněné, vyšší rychlosti</li>
            <li>✅ <strong>Dual-band router:</strong> Současné využití obou pásem</li>
            <li>✅ <strong>Wi-Fi analyzer:</strong> Aplikace pro analýzu sítí v okolí</li>
          </ul>
        </div>

        <h2>Fyzické překážky a jejich vliv</h2>
        <table class="w-full border-collapse border border-gray-300 my-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2">Materiál</th>
              <th class="border border-gray-300 p-2">Útlum signálu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Dřevo, sádrokarton</td>
              <td class="border border-gray-300 p-2">Mírný</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Sklo, voda</td>
              <td class="border border-gray-300 p-2">Střední</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Cihlová zeď</td>
              <td class="border border-gray-300 p-2">Vysoký</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Kov, beton</td>
              <td class="border border-gray-300 p-2">Velmi vysoký</td>
            </tr>
          </tbody>
        </table>

        <h2>Rozšíření Wi-Fi pokrytí</h2>
        <h3>Wi-Fi repeatery a extendery</h3>
        <p>Vhodné pro menší rozšíření pokrytí, ale mohou snížit rychlost o 50%. Umístěte je na hranici pokrytí původního signálu.</p>

        <h3>Mesh systémy</h3>
        <p>Moderní řešení pro velkí domy. Více jednotek komunikuje mezi sebou a vytváří jednotnou síť s plynulým přechodem.</p>

        <h3>Powerline adaptéry</h3>
        <p>Využívají elektrickou instalaci pro přenos dat. Ideální pro překonání tlustých zdí nebo velkých vzdáleností.</p>

        <h2>Pokročilé nastavení routeru</h2>
        <h3>QoS (Quality of Service)</h3>
        <p>Prioritizuje důležitý provoz jako videokonference nebo streaming nad méně kritické aplikace.</p>

        <h3>Pásmo 5 GHz vs 2.4 GHz</h3>
        <ul>
          <li><strong>2.4 GHz:</strong> Větší dosah, menší rychlost, více rušení</li>
          <li><strong>5 GHz:</strong> Vyšší rychlost, kratší dosah, méně rušení</li>
        </ul>

        <h2>Testování a měření kvality signálu</h2>
        <h3>Užitečné aplikace</h3>
        <ul>
          <li><strong>WiFi Analyzer (Android):</strong> Analýza okolních sítí</li>
          <li><strong>NetSpot (Windows, Mac):</strong> Mapa pokrytí Wi-Fi</li>
          <li><strong>Speedtest:</strong> Měření rychlosti připojení</li>
        </ul>

        <h3>Interpretace výsledků</h3>
        <div class="bg-blue-50 p-4 rounded-lg my-6">
          <ul>
            <li><strong>-30 až -50 dBm:</strong> Výborný signál</li>
            <li><strong>-50 až -60 dBm:</strong> Dobrý signál</li>
            <li><strong>-60 až -70 dBm:</strong> Uspokojivý signál</li>
            <li><strong>-70 dBm a více:</strong> Slabý signál, nutná optimalizace</li>
          </ul>
        </div>

        <h2>Údržba a aktualizace</h2>
        <h3>Pravidelná údržba</h3>
        <ul>
          <li>Restartujte router alespoň jednou za měsíc</li>
          <li>Čistěte router od prachu</li>
          <li>Kontrolujte teplotu - přehřátí snižuje výkon</li>
        </ul>

        <h3>Aktualizace firmware</h3>
        <p>Pravidelně aktualizujte firmware routeru pro lepší výkon a bezpečnost. Většina moderních routerů podporuje automatické aktualizace.</p>

        <h2>Závěr</h2>
        <p>Optimalizace Wi-Fi signálu vyžaduje kombinaci správného umístění, vhodného nastavení a případně dodatečného hardware. S těmito tipy dosáhnete stabilního a rychlého připojení v celé domácnosti.</p>
      </div>
    `,
    date: "25. 5. 2025",
    author: "Jana Nováková",
    category: "Tipy a rady", 
    image: "/lovable-uploads/6f778a97-79bd-4698-b3f2-2a373893184b.png",
    alt: "Wi-Fi router s anténami v moderní domácnosti s diagramem signálu",
    tags: ["Wi-Fi optimalizace", "router", "domácí síť", "bezdrátové připojení", "síťové pokrytí"]
  },
  {
    id: 8,
    title: "Bezpečnost domácí sítě: Ochrana před kyberútoky",
    excerpt: "Komplexní průvodce zabezpečením vaší domácí sítě. Naučte se nastavit silná hesla, firewall a další bezpečnostní opatření.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Proč je zabezpečení sítě důležité</h2>
        <p>V dnešní době, kdy je většina našich zařízení připojená k internetu, je zabezpečení domácí sítě kriticky důležité. Nezabezpečená síť může být vstupní branou pro hackery k vašim osobním datům.</p>

        <h2>Základní zabezpečení Wi-Fi sítě</h2>
        <h3>Silné heslo k Wi-Fi</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
          <h4 class="text-green-800 font-semibold mb-2">Kritéria silného hesla:</h4>
          <ul class="text-green-700 space-y-1">
            <li>✓ Minimálně 12 znaků</li>
            <li>✓ Kombinace velkých a malých písmen</li>
            <li>✓ Čísla a speciální znaky</li>
            <li>✓ Neobsahuje osobní informace</li>
            <li>✓ Jedinečné pro každou síť</li>
          </ul>
        </div>

        <h3>Šifrovací protokoly</h3>
        <ul>
          <li><strong>WPA3:</strong> Nejnovější a nejbezpečnější standard</li>
          <li><strong>WPA2:</strong> Stále bezpečný, široce podporovaný</li>
          <li><strong>WEP:</strong> Zastaralý, nebezpečný - nepoužívat!</li>
        </ul>

        <h2>Změna výchozích nastavení routeru</h2>
        <h3>Přístupové údaje k administraci</h3>
        <p>První krok je změna výchozího uživatelského jména a hesla pro přístup k nastavení routeru. Výchozí údaje jako "admin/admin" jsou veřejně známé.</p>

        <h3>Název sítě (SSID)</h3>
        <ul>
          <li>Změňte výchozí název sítě</li>
          <li>Nepoužívájte model routeru v názvu</li>
          <li>Vyhněte se osobním informacím</li>
          <li>Zvažte skrytí SSID pro dodatečnou bezpečnost</li>
        </ul>

        <h2>Pokročilé bezpečnostní funkce</h2>
        <h3>Firewall</h3>
        <p>Aktivujte vestavěný firewall routeru a nakonfigurujte jej pro blokování podezřelého provozu. Většina moderních routerů má firewall zapnutý ve výchozím nastavení.</p>

        <h3>Filtrování MAC adres</h3>
        <p>Umožňuje připojení pouze zařízením s povolenými MAC adresami. Vhodné pro sítě s malým počtem stálých zařízení.</p>

        <h3>Časové omezení přístupu</h3>
        <p>Nastavte časová okna, kdy je Wi-Fi aktivní. Například vypnutí internetu v nočních hodinách pro dětská zařízení.</p>

        <h2>Aktualizace a údržba</h2>
        <h3>Firmware routeru</h3>
        <div class="bg-blue-50 p-4 rounded-lg my-6">
          <h4 class="font-semibold mb-2">Pravidelné aktualizace firmware:</h4>
          <ul class="space-y-1">
            <li>• Kontrolujte aktualizace alespoň měsíčně</li>
            <li>• Aktivujte automatické aktualizace pokud je to možné</li>
            <li>• Sledujte bezpečnostní bulletiny výrobce</li>
            <li>• Nepřerušujte proces aktualizace</li>
          </ul>
        </div>

        <h3>Monitoring síťového provozu</h3>
        <p>Pravidelně kontrolujte připojená zařízení v administraci routeru. Neznámá zařízení mohou signalizovat narušení bezpečnosti.</p>

        <h2>Zabezpečení jednotlivých zařízení</h2>
        <h3>Antivirus a antimalware</h3>
        <ul>
          <li>Nainstalujte kvalitní antivirus na všechna počítače</li>
          <li>Pravidelně aktualizujte antivir databáze</li>
          <li>Prováděj te pravidelné skenování systému</li>
        </ul>

        <h3>Operační systémy a aplikace</h3>
        <ul>
          <li>Aktivujte automatické aktualizace OS</li>
          <li>Instalujte pouze aplikace z důvěryhodných zdrojů</li>
          <li>Pravidelně revidujte nainstalované programy</li>
        </ul>

        <h2>Ochrana před phishingem a sociálním inženýrstvím</h2>
        <h3>Rozpoznání podezřelých e-mailů</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <h4 class="text-yellow-800 font-semibold mb-2">Varovné signály:</h4>
          <ul class="text-yellow-700 space-y-1">
            <li>⚠️ Naléhavé výzvy k okamžité akci</li>
            <li>⚠️ Požadavky na hesla nebo osobní údaje</li>
            <li>⚠️ Podezřelé odkazy a přílohy</li>
            <li>⚠️ Špatná gramatika a pravopis</li>
            <li>⚠️ Neznámí odesílatelé</li>
          </ul>
        </div>

        <h3>Bezpečné bankovnictví a nákupy</h3>
        <ul>
          <li>Používejte pouze HTTPS stránky pro citlivé operace</li>
          <li>Ověřujte SSL certifikáty</li>
          <li>Neprovádějte finanční transakce na veřejných Wi-Fi</li>
          <li>Používejte dvoufaktorové ověření kde je dostupné</li>
        </ul>

        <h2>Zálohy a obnova dat</h2>
        <h3>Strategie zálohování</h3>
        <p>Implementujte pravidlo 3-2-1: 3 kopie dat, 2 různá média, 1 kopie mimo dosah (cloud nebo fyzicky jinde).</p>

        <h3>Cloud vs. lokální zálohy</h3>
        <ul>
          <li><strong>Cloud:</strong> Automatické, dostupné odkudkoliv, ale závislé na internetu</li>
          <li><strong>Lokální:</strong> Rychlé, pod vaší kontrolou, ale náchylné na fyzické poškození</li>
        </ul>

        <h2>Bezpečnost IoT zařízení</h2>
        <h3>Smart home zařízení</h3>
        <ul>
          <li>Změňte výchozí hesla všech zařízení</li>
          <li>Pravidelně aktualizuj te firmware</li>
          <li>Zvažte separátní síť pro IoT zařízení</li>
          <li>Vypněte nepotřebné funkce a služby</li>
        </ul>

        <h2>Incident response plán</h2>
        <h3>Kroky při podezření na narušení</h3>
        <ol class="space-y-2">
          <li><strong>Odpojte</strong> podezřelá zařízení od sítě</li>
          <li><strong>Změňte</strong> všechna hesla</li>
          <li><strong>Proveďte</strong> úplné skenování antivir</li>
          <li><strong>Zkontrolujte</strong> všechny účty a transakce</li>
          <li><strong>Kontaktujte</strong> poskytovatele služeb pokud je to nutné</li>
        </ol>

        <h2>Závěr</h2>
        <p>Bezpečnost domácí sítě vyžaduje vícevrstvý přístup a pravidelnou údržbu. Investice času do správného nastavení bezpečnostních opatření vám může ušetřit hodně problémů v budoucnosti.</p>
      </div>
    `,
    date: "22. 5. 2025",
    author: "Ing. Pavel Procházka",
    category: "Tipy a rady",
    image: "/lovable-uploads/2e16f35c-9b53-448d-a734-63863af4ed46.png",
    alt: "Bezpečnostní štít nad domácí sítí s připojenými zařízeními",
    tags: ["kybernetická bezpečnost", "domácí síť", "Wi-Fi zabezpečení", "firewall", "antivirus", "ochrana dat"]
  }
];
