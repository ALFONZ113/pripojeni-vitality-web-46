import { BlogPost } from './types';

export const technologiePosts: BlogPost[] = [
  {
    id: 3,
    title: "Jak vybrat správný router pro váš domov: Kompletní průvodce 2025",
    excerpt: "Vše, co potřebujete vědět o výběru routeru pro domácí použití. Porovnání funkcí, výkonu a cen nejlepších modelů na trhu.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Proč je správný router klíčový?</h2>
        <p>Router je srdcem vaší domácí sítě. Správný výběr routeru může dramaticky zlepšit rychlost internetu, pokrytí Wi-Fi a celkový zážitek z používání internetových služeb.</p>

        <h2>Klíčové vlastnosti moderních routerů</h2>
        <h3>Wi-Fi 6 technologie</h3>
        <p>Nejnovější standard Wi-Fi 6 (802.11ax) nabízí:</p>
        <ul>
          <li>Až 40% vyšší rychlosti než Wi-Fi 5</li>
          <li>Lepší výkon v hustě obydlených oblastech</li>
          <li>Nižší spotřebu energie pro připojená zařízení</li>
          <li>Podporu více zařízení současně</li>
        </ul>

        <h3>Dual-band vs. Tri-band</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <h4>Porovnání pásem:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>2.4 GHz pásmo:</strong> Větší dosah, pomalejší rychlosti</li>
            <li><strong>5 GHz pásmo:</strong> Vyšší rychlosti, kratší dosah</li>
            <li><strong>6 GHz pásmo:</strong> (Wi-Fi 6E) Nejrychlejší, nejkratší dosah</li>
          </ul>
        </div>

        <h2>Doporučené modely pro různé potřeby</h2>
        <h3>Pro malé byty (do 60 m²)</h3>
        <ul>
          <li>TP-Link Archer AX23 - nejlepší poměr cena/výkon</li>
          <li>ASUS AX1800 - spolehlivý a jednoduchý na nastavení</li>
        </ul>

        <h3>Pro rodinné domy (60-150 m²)</h3>
        <ul>
          <li>Netgear Nighthawk AX12 - výkon pro náročné uživatele</li>
          <li>ASUS AX6000 - pokročilé funkce a skvělé pokrytí</li>
        </ul>

        <h2>Tipy pro optimální nastavení</h2>
        <ol>
          <li>Umístěte router do středu domova</li>
          <li>Vyhněte se překážkám jako jsou zdi a kovové předměty</li>
          <li>Pravidelně aktualizujte firmware</li>
          <li>Používejte silná hesla pro Wi-Fi síť</li>
        </ol>

        <p class="text-center mt-8 font-medium">Správný router je investice do budoucnosti vaší domácí sítě.</p>
      </div>
    `,
    date: "20. 5. 2025",
    author: "Tomáš Novák",
    category: "Technologie",
    image: "/lovable-uploads/77099393-c42f-4da8-8d98-a7a65e08a093.png",
    alt: "Moderní Wi-Fi router s futuristickým dizajnem a technologickými prvkami",
    tags: ["Router", "Wi-Fi", "Domácí síť", "Wi-Fi 6", "Technologie"]
  },
  {
    id: 4,
    title: "Mesh systémy vs. klasické routery: Co je lepší pro váš domov?",
    excerpt: "Podrobné porovnání mesh systémů a tradičních routerů. Zjistěte, která technologie je ideální pro vaši domácnost.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Mesh revoluce v domácích sítích</h2>
        <p>Mesh systémy představují nový přístup k domácímu Wi-Fi. Na rozdíl od tradičních routerů využívají více uzlů pro vytvoření jednotné sítě s bezproblémovým pokrytím.</p>

        <h2>Co je to mesh systém?</h2>
        <p>Mesh síť se skládá z hlavního routeru a několika satelitních uzlů, které společně vytváří jednu velkou Wi-Fi síť. Když se pohybujete po domě, vaše zařízení se automaticky připojí k nejsilnějšímu signálu.</p>

        <h2>Výhody mesh systémů</h2>
        <ul>
          <li><strong>Bezšvové pokrytí:</strong> Žádné mrtvé zóny v domě</li>
          <li><strong>Snadné rozšíření:</strong> Přidání nových uzlů podle potřeby</li>
          <li><strong>Inteligentní směrování:</strong> Automatická optimalizace signálu</li>
          <li><strong>Jednoduché nastavení:</strong> Mobilní aplikace pro správu</li>
        </ul>

        <h2>Nevýhody mesh systémů</h2>
        <ul>
          <li><strong>Vyšší cena:</strong> Obvykle dražší než jeden výkonný router</li>
          <li><strong>Složitější troubleshooting:</strong> Více komponent = více možných problémů</li>
          <li><strong>Spotřeba energie:</strong> Více zařízení = vyšší náklady na elektřinu</li>
        </ul>

        <h2>Kdy zvolit mesh systém?</h2>
        <div class="bg-green-50 p-6 rounded-lg my-8">
          <h3>Mesh systém je ideální pro:</h3>
          <ul class="space-y-2 mt-4">
            <li>✓ Domy s více patry</li>
            <li>✓ Velké byty nebo domy (nad 100 m²)</li>
            <li>✓ Domy s tlustými zdmi nebo neobvyklým půdorysem</li>
            <li>✓ Rodiny s mnoha připojenými zařízeními</li>
          </ul>
        </div>

        <h2>Kdy stačí klasický router?</h2>
        <div class="bg-orange-50 p-6 rounded-lg my-8">
          <h3>Klasický router je vhodný pro:</h3>
          <ul class="space-y-2 mt-4">
            <li>✓ Malé až střední byty (do 80 m²)</li>
            <li>✓ Jednopatrové domy s otevřeným půdorysem</li>
            <li>✓ Rozpočtově omezené domácnosti</li>
            <li>✓ Uživatele, kteří preferují jednoduché řešení</li>
          </ul>
        </div>

        <h2>Doporučené mesh systémy 2024</h2>
        <ul>
          <li><strong>ASUS ZenWiFi AX6600:</strong> Nejlepší celkový výkon</li>
          <li><strong>Netgear Orbi AX4200:</strong> Skvělý poměr cena/výkon</li>
          <li><strong>TP-Link Deco X60:</strong> Nejlepší pro začátečníky</li>
        </ul>

        <h2>Závěr</h2>
        <p>Volba mezi mesh systémem a klasickým routerem závisí na velikosti vašeho domova, rozpočtu a technických požadavcích. Pro většinu domácností je mesh systém investice, která se vyplatí lepším pokrytím a spokojeností s Wi-Fi.</p>

        <p class="text-center mt-8 font-medium">Nezávisle na výběru nezapomeňte na kvalitní internetové připojení od PODA.</p>
      </div>
    `,
    date: "18. 5. 2025",
    author: "Jana Svobodová",
    category: "Technologie",
    image: "/lovable-uploads/2e16f35c-9b53-448d-a734-63863af4ed46.png",
    alt: "Mesh Wi-Fi systém rozmístěný v moderním domě",
    tags: ["Mesh", "Wi-Fi", "Router", "Domácí síť", "Pokrytí"]
  },
  {
    id: 5,
    title: "Zabezpečení domácí Wi-Fi sítě: Kompletní průvodce bezpečností",
    excerpt: "Jak ochránit svou domácí Wi-Fi síť před hackery a neoprávněným přístupem. Praktické tipy pro maximální bezpečnost.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Proč je bezpečnost Wi-Fi tak důležitá?</h2>
        <p>Nezabezpečená Wi-Fi síť je vstupní branou pro hackery do vašeho domova. Mohou získat přístup k osobním datům, sledovat vaši online aktivitu nebo využít vaše připojení k nezákonným aktivitám.</p>

        <h2>Základní bezpečnostní opatření</h2>
        <h3>1. Silné heslo pro Wi-Fi</h3>
        <ul>
          <li>Minimálně 12 znaků</li>
          <li>Kombinace velkých a malých písmen, čísel a symbolů</li>
          <li>Vyhněte se slovníkovým slovům</li>
          <li>Pravidelná změna hesla (alespoň jednou ročně)</li>
        </ul>

        <h3>2. WPA3 šifrování</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <h4>Porovnání bezpečnostních protokolů:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>WEP:</strong> ❌ Zastaralé, snadno hacknutelné</li>
            <li><strong>WPA/WPA2:</strong> ⚠️ Dobré, ale má známé zranitelnosti</li>
            <li><strong>WPA3:</strong> ✅ Nejbezpečnější současný standard</li>
          </ul>
        </div>

        <h3>3. Skrytí názvu sítě (SSID)</h3>
        <p>Ačkoli není foolproof řešením, skrytí SSID ztěžuje útočníkům identifikaci vaší sítě.</p>

        <h2>Pokročilé bezpečnostní funkce</h2>
        <h3>Hostovská síť</h3>
        <ul>
          <li>Oddělená síť pro návštěvy</li>
          <li>Omezený přístup k domácím zařízením</li>
          <li>Možnost časového omezení</li>
        </ul>

        <h3>MAC adresní filtrování</h3>
        <ul>
          <li>Povolení pouze známých zařízení</li>
          <li>Vyšší úroveň kontroly přístupu</li>
          <li>Vhodné pro velmi citlivá prostředí</li>
        </ul>

        <h2>Pravidelná údržba bezpečnosti</h2>
        <ol>
          <li><strong>Aktualizace firmware routeru</strong> - měsíčně</li>
          <li><strong>Kontrola připojených zařízení</strong> - týdně</li>
          <li><strong>Změna hesel</strong> - ročně nebo po bezpečnostním incidentu</li>
          <li><strong>Monitoring síťového provozu</strong> - kontinuálně</li>
        </ol>

        <h2>Varovné signály narušení</h2>
        <div class="bg-red-50 p-6 rounded-lg my-8">
          <h3>Pozornost na tyto symptomy:</h3>
          <ul class="space-y-2 mt-4">
            <li>🚨 Nezvykle pomalý internet</li>
            <li>🚨 Neznámá zařízení v síti</li>
            <li>🚨 Neočekávané změny v nastavení routeru</li>
            <li>🚨 Vysoké využití dat bez vysvětlení</li>
          </ul>
        </div>

        <h2>Doporučené nástroje pro monitoring</h2>
        <ul>
          <li><strong>Fing:</strong> Mobilní aplikace pro skenování sítě</li>
          <li><strong>Wireshark:</strong> Pokročilá analýza síťového provozu</li>
          <li><strong>RouterScan:</strong> Kontrola bezpečnostních zranitelností</li>
        </ul>

        <h2>Závěr</h2>
        <p>Bezpečnost domácí Wi-Fi není jednorázová záležitost, ale kontinuální proces. Správně nakonfigurovaná a pravidelně udržovaná síť vás ochrání před většinou bezpečnostních hrozeb.</p>

        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Bezpečnost začíná silným internetovým připojením. PODA poskytuje nejen rychlost, ale také stabilitu potřebnou pro moderní bezpečnostní řešení."</p>
        </blockquote>

        <p class="text-center mt-8 font-medium">Investujte do bezpečnosti své domácí sítě - stojí to za to.</p>
      </div>
    `,
    date: "15. 5. 2025",
    author: "Petr Krejčí",
    category: "Technologie", 
    image: "/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png",
    alt: "Zabezpečená domácí Wi-Fi síť s ikonami zabezpečení",
    tags: ["Bezpečnost", "Wi-Fi", "Kybernetická bezpečnost", "Router", "Ochrana dat"]
  },
  {
    id: 101,
    title: "Prechod od O2 k PODA po akvizícii Nej.cz a Netboxu: Príležitosť pre lepšie služby v Moravskoslezskom regióne",
    excerpt: "Analýza dopadu akvizície Nej.cz a Netboxu spoločnosťou O2 na zákazníkov v Moravskoslezskom regióne a výhody prechodu k regionálnemu poskytovateľovi PODA s garantovanými cenami a optickým pripojením.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Veľké zmeny na telekomunikačnom trhu ČR</h2>
        <p>V telekomunikačnom sektore Českej republiky došlo k významným zmenám, ktoré výrazne ovplyvnia zákazníkov v Moravskoslezskom regióne. Spoločnosť O2 dokončila akvizíciu poskytovateľa internetu Nej.cz, pričom zákaznícka základňa prešla pod O2, zatiaľ čo infraštruktúru prevzal CETIN. Zároveň sa Netbox, ktorý poskytuje internetové pripojenie viac ako 40 tisícom zákazníkov predovšetkým v Brne a Jihlave, stal súčasťou O2.</p>

        <h2>Geografický dopad akvizíciami</h2>
        <h3>Ovplyvnené oblasti v Moravskoslezskom regióne</h3>
        <ul>
          <li><strong>Ostrava a okolie:</strong> Tisíce zákazníkov Nej.cz v procese migrácie</li>
          <li><strong>Karviná:</strong> Zmeny v možnostiach výberu poskytovateľov</li>
          <li><strong>Havířov:</strong> Konsolidácia trhu a cenové zmeny</li>
          <li><strong>Frýdek-Místek:</strong> Nové príležitosti pre alternatívnych poskytovateľov</li>
        </ul>

        <h2>Analýza zmien po akvizíciách</h2>
        <h3>Čo sa mení pre zákazníkov Nej.cz</h3>
        <p><strong>Postupné zmeny v službách:</strong></p>
        <ul>
          <li><strong>Migrácia na O2 tarify:</strong> Postupný prechod na drahšie balíčky</li>
          <li><strong>Zmeny v zákazníckom servise:</strong> Centralizácia na call centrá</li>
          <li><strong>Nové zmluvné podmienky:</strong> Možné zavádzanie závazkov</li>
          <li><strong>Zdražovanie:</strong> Harmonizácia s O2 cenníkom</li>
        </ul>

        <h3>Dopad na zákazníkov Netboxu</h3>
        <p><strong>Riziká pre používateľov:</strong></p>
        <ul>
          <li><strong>Strata lokálneho charakteru:</strong> Koniec personalizovaných služieb</li>
          <li><strong>Technické zmeny:</strong> Možné problémy počas migrácie</li>
          <li><strong>Cenové úpravy:</strong> Pravdepodobné zvýšenie cien</li>
          <li><strong>Služby:</strong> Možné obmedzenia v technickej podpore</li>
        </ul>

        <h2>Prípadová štúdia: Zákazník v procese migrácie</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Bol som spokojný zákazník Nej.cz v Ostrave-Vítkovice s internetom za 299 Kč/mesiac. Po prechode pod O2 mi prišiel list o zvýšení ceny na 599 Kč a nutnosti podpísania nových zmluvných podmienok s 24-mesačným závazkom. Po konzultácii s PODA som zistil, že môžem mať optický internet 1000 Mbps za 250 Kč bez závazkov. Rozhodnutie bolo jednoduché."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Tomáš Svoboda, Ostrava-Vítkovice</strong><br>
            Bývalý zákazník Nej.cz, teraz PODA
          </footer>
        </blockquote>

        <h3>Porovnanie služieb pred a po zmene:</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-red-50 p-6 rounded-lg">
            <h4>Nej.cz → O2 (po akvizícii)</h4>
            <ul class="space-y-1">
              <li>🔴 Zvýšenie ceny z 299 na 599 Kč</li>
              <li>🔴 Zavedenie 24-mesačného závazku</li>
              <li>🔴 Rýchlosť 100/20 Mbps (asymetrické)</li>
              <li>🔴 Call centrum namiesto lokálnej podpory</li>
              <li>🔴 Komplikované podmienky ukončenia</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h4>PODA (regionálna alternatíva)</h4>
            <ul class="space-y-1">
              <li>✅ Stabilná cena 250 Kč/mesiac</li>
              <li>✅ Bez závazkov, ukončenie kedykoľvek</li>
              <li>✅ Rýchlosť 1000/1000 Mbps (symetrické)</li>
              <li>✅ Lokálna technická podpora</li>
              <li>✅ Transparentné podmienky</li>
            </ul>
          </div>
        </div>

        <h2>Prečo zvážiť prechod k PODA</h2>
        <h3>Regionálne výhody lokálneho poskytovateľa</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <h4>Špecifické výhody pre Moravskoslezský región:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Lokálna podpora:</strong> Technickí špecialisti v Ostrave a Havířove</li>
            <li><strong>Znalosť regiónu:</strong> Chápanie špecifík panelových domov a infraštruktúry</li>
            <li><strong>Rýchla reakcia:</strong> Servis do 24 hodín</li>
            <li><strong>Stabilné ceny:</strong> Žiadne nečakané navýšenia</li>
            <li><strong>Personálny prístup:</strong> Nie call centrum robotizácia</li>
          </ul>
        </div>

        <h3>Technické výhody PODA</h3>
        <ul>
          <li><strong>GPON technológia:</strong> Najmodernejšia optická infraštruktúra</li>
          <li><strong>Garantovaná rýchlosť:</strong> Skutočných 1000 Mbps bez "až"</li>
          <li><strong>Symetrické pripojenie:</strong> Rovnaká rýchlosť download aj upload</li>
          <li><strong>Nízka latencia:</strong> Ideálne pre gaming a video konferencie</li>
          <li><strong>99,9% dostupnosť:</strong> Minimálne výpadky</li>
        </ul>

        <h2>Ekonomická analýza prechodu</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Porovnanie mesačných nákladov:</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Poskytovateľ</th>
                <th class="text-left py-2">Rýchlosť</th>
                <th class="text-left py-2">Cena/mesiac</th>
                <th class="text-left py-2">Závazok</th>
                <th class="text-left py-2">Ročne</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-green-50">
                <td class="py-2 font-semibold">PODA</td>
                <td class="py-2">1000/1000 Mbps</td>
                <td class="py-2 text-green-600">250 Kč</td>
                <td class="py-2 text-green-600">Bez závazku</td>
                <td class="py-2">3 000 Kč</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">Vodafone (Liberty)</td>
                <td class="py-2">500/50 Mbps</td>
                <td class="py-2 text-red-600">899 Kč</td>
                <td class="py-2 text-red-600">24 mesiacov</td>
                <td class="py-2">7 188 Kč</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">O2</td>
                <td class="py-2">100/20 Mbps</td>
                <td class="py-2 text-orange-600">699 Kč</td>
                <td class="py-2 text-orange-600">24 mesiacov</td>
                <td class="py-2">7 188 Kč</td>
              </tr>
              <tr>
                <td class="py-2">T-Mobile</td>
                <td class="py-2">50/10 Mbps</td>
                <td class="py-2 text-red-600">799 Kč</td>
                <td class="py-2 text-red-600">24 mesiacov</td>
                <td class="py-2">7 188 Kč</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Ročná úspora oproti konkurencii</h3>
        <ul>
          <li><strong>Oproti Vodafone:</strong> 7 788 Kč ročne + dvojnásobok rýchlosti</li>
          <li><strong>Oproti O2:</strong> 5 388 Kč ročne + 10x vyššia rýchlosť</li>
          <li><strong>Oproti T-Mobile:</strong> 6 588 Kč ročne + 20x vyššia rýchlosť</li>
          <li><strong>Celková úspora za 2 roky:</strong> 10 000 - 15 000 Kč</li>
        </ul>

        <h2>Jednoduchý prechod s Popri.cz</h2>
        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Popri.cz - váš sprievodca prechodom:</h3>
          <ul class="space-y-2">
            <li>• <strong>Komplexné riešenie:</strong> Od výpovede po inštaláciu</li>
            <li>• <strong>Bez výpadku služby:</strong> Plynulý prechod medzi poskytovateľmi</li>
            <li>• <strong>Prioritné spracovanie:</strong> Rýchlejšia aktivácia</li>
            <li>• <strong>Osobný prístup:</strong> Konzultácia s regionálnym špecialisto</li>
            <li>• <strong>Najlepšie ceny:</strong> Exkluzívne tarify pre Moravskoslezský región</li>
          </ul>
        </div>

        <h3>Proces prechodu krok za krokom</h3>
        <ol>
          <li><strong>Kontakt cez popri.cz:</strong> Vyplnenie jednoduchého formulára</li>
          <li><strong>Konzultácia potrieb:</strong> Analýza vašich požiadaviek</li>
          <li><strong>Výber optimálneho tarifu:</strong> Personalizované odporúčanie</li>
          <li><strong>Pomoc s výpoveďou:</strong> Asistencia pri ukončení stávajúcej zmluvy</li>
          <li><strong>Plánovanie inštalácie:</strong> Termín bez výpadku služieb</li>
          <li><strong>Profesionálna inštalácia:</strong> Nastavenie a testovanie</li>
          <li><strong>Overenie funkčnosti:</strong> Kontrola všetkých parametrov</li>
          <li><strong>Odovzdanie do užívania:</strong> Zaškolenie a dokumentácia</li>
        </ol>

        <h2>Záver: Príležitosť pre zlepšenie služieb</h2>
        <p>Akvizície Nej.cz a Netboxu spoločnosťou O2 predstavujú pre zákazníkov v Moravskoslezskom regióne príležitosť prehodnotiť svoje internetové služby. PODA ako regionálny poskytovateľ ponúka stabilnú alternatívu s lepšími technickými parametrami a výhodnejšími cenami.</p>

        <h3>Kľúčové dôvody pre prechod k PODA:</h3>
        <ul>
          <li><strong>Ekonomické výhody:</strong> Úspora tisícov korún ročne</li>
          <li><strong>Technická nadradnosť:</strong> Optické pripojenie vs. zastaralé technológie</li>
          <li><strong>Regionálny prístup:</strong> Lokálna podpora namiesto call centier</li>
          <li><strong>Flexibilita:</strong> Bez závazkov a s možnosťou zmien</li>
          <li><strong>Budúcnosť:</strong> Investícia do modernej infraštruktúry</li>
        </ul>

        <div class="bg-green-50 p-6 rounded-lg my-8">
          <h3>Špeciálna ponuka pre migračných zákazníkov:</h3>
          <ul class="space-y-1">
            <li>• <strong>Bezplatná migrácia:</strong> Bez aktivačných poplatkov</li>
            <li>• <strong>Rýchla inštalácia:</strong> Prioritné spracovanie objednávok</li>
            <li>• <strong>Technická asistencia:</strong> Pomoc s prechodom zadarmo</li>
            <li>• <strong>Garancie spokojnosti:</strong> 30-dňová záruka vrátenia peňazí</li>
          </ul>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Využite príležitosť pre lepšie služby:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>Migračný špecialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná konzultácia migrácie a overenie možností pripojenia PODA na vašej adrese.</p>
        </div>

        <p class="text-center mt-8 font-medium">Transformujte akvizičné zmeny na príležitosť pre lepšie internetové služby v Moravskoslezskom regióne.</p>

        <p class="text-sm text-gray-500 mt-8 italic">PODA - stabilná voľba v čase zmien na telekomunikačnom trhu.</p>
      </div>
    `,
    date: "8. 5. 2025",
    author: "Milan Terč",
    category: "Technologie",
    image: "/lovable-uploads/9ce3244c-96d6-4078-9808-3edc99d0e01b.png",
    alt: "Futuristická vizualizácia prepojenia telekomunikačných sietí, symbolizujúca zmeny na trhu poskytovateľov internetu",
    tags: ["O2", "Nej.cz", "Netbox", "PODA", "Migrácia", "Ostrava", "Akvizícia", "Telekomunikácie"]
  }
];
