import { BlogPost } from './types';
import { karvinaPost } from './karvina';

export const sluzbyPosts: BlogPost[] = [
  karvinaPost,
  {
    id: 1,
    title: "GPON technológia v Moravskoslezskom regióne: Revolúcia optického internetu",
    excerpt: "Komplexný prehľad GPON technológie a jej výhod pre domácnosti v Ostrave, Karvinej a okolí. Prečo je považovaná za štandard budúcnosti pre domáce internetové pripojenie.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Digitálna revolúcia v Moravskoslezskom regióne</h2>
        <p>GPON (Gigabit Passive Optical Network) predstavuje najmodernějšiu technológiu pre dodávanie vysokorýchlostného internetu priamo do domácností v Moravskoslezskom regióne. Táto technológia využíva optické vlákna pre prenos dát rýchlosťou až 2,5 Gbps downstream a 1,25 Gbps upstream, čo mení spôsob, akým obyvatelia Ostravy, Karvinej a okolia využívajú internet.</p>

        <h2>Geografické pokrytie GPON v regióne</h2>
        <h3>Mestá s plnou GPON infraštruktúrou</h3>
        <ul>
          <li><strong>Ostrava a okolie:</strong> Kompletné pokrytie všetkých mestských častí</li>
          <li><strong>Karviná:</strong> Plné pokrytie Ráje, Hraníc, Mizerova</li>
          <li><strong>Havířov:</strong> Celé mesto vrátane okrajových častí</li>
          <li><strong>Bohumín:</strong> Strategické pokrytie centra a sídlisk</li>
          <li><strong>Frýdek-Místek:</strong> Postupné rozširovanie optickej siete</li>
        </ul>

        <h2>Čo je GPON technológia?</h2>
        <p>GPON je technológia optických sietí, ktorá umožňuje prenos dát rýchlosťou až 2,5 Gbps downstream a 1,25 Gbps upstream. Na rozdiel od tradičných metalických sietí využíva GPON optické vlákna, ktoré prenášajú dáta pomocou svetelných impulzov s minimálnymi stratami a maximálnou stabilitou.</p>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
          <h3>Technické špecifikácie GPON siete PODA:</h3>
          <ul class="space-y-2 mt-4">
            <li>✓ <strong>Downstream rýchlosť:</strong> až 2,5 Gbps zdieľané</li>
            <li>✓ <strong>Upstream rýchlosť:</strong> až 1,25 Gbps zdieľané</li>
            <li>✓ <strong>Dosah bez zosilnenia:</strong> až 20 km</li>
            <li>✓ <strong>Splitting ratio:</strong> 1:32 až 1:64</li>
            <li>✓ <strong>Latencia:</strong> < 2 ms</li>
            <li>✓ <strong>Životnosť infraštruktúry:</strong> 25+ rokov</li>
          </ul>
        </div>

        <h2>Prípadová štúdia: Transformácia rodinného domu v Havířove</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Náš rodinný dom v Havířove-Šumbarku mal vážne problémy s internetom. Starý DSL s rýchlosťou 25 Mbps nezvládal potreby našej 5-člennej rodiny. Dvaja synovia hrali online hry, dcéra študovala online na VŠB-TUO a my s manželkou sme pracovali z domova. Po prechode na GPON od PODA s 1000 Mbps symetricky sa náš digitálny život úplne zmenil. Každý môže robiť čo potrebuje bez obmedzení."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Ing. Pavel Dvořák, Havířov-Šumbark</strong><br>
            IT manažér, 5-členná rodina, rodinný dom 180 m²
          </footer>
        </blockquote>

        <h3>Konkrétne benefity po prechode na GPON:</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-red-50 p-6 rounded-lg">
            <h4>Pred GPON (25 Mbps DSL)</h4>
            <ul class="space-y-1">
              <li>🔴 Časté výpadky v špičkách</li>
              <li>🔴 Nemožnosť 4K streamovania</li>
              <li>🔴 Problémy s video konferenciami</li>
              <li>🔴 Pomalé nahrávanie do cloudu</li>
              <li>🔴 Lagy v online hrách</li>
              <li>🔴 Limitované súčasné používanie</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h4>Po GPON (1000 Mbps symetricky)</h4>
            <ul class="space-y-1">
              <li>✅ Stabilné pripojenie 24/7</li>
              <li>✅ Viacero 4K streamov súčasne</li>
              <li>✅ Bezproblémové home office</li>
              <li>✅ Rýchle zálohovanie (1 GB za 8 sekúnd)</li>
              <li>✅ Ping < 3 ms pre gaming</li>
              <li>✅ Neobmedzené súčasné používanie</li>
            </ul>
          </div>
        </div>

        <h2>Hlavné výhody GPON technológie</h2>
        <h3>1. Extrémne vysoká rýchlosť a kapacita</h3>
        <p>GPON technológia umožňuje dosiahnuť rýchlosti, ktoré ďaleko prevyšujú možnosti bežných metalických sietí:</p>
        <ul>
          <li><strong>Garantované rýchlosti:</strong> Skutočné, nie "až" rýchlosti</li>
          <li><strong>Symetrické pripojenie:</strong> Rovnaká rýchlosť download aj upload</li>
          <li><strong>Škálovateľnosť:</strong> Jednoduché zvyšovanie rýchlostí</li>
          <li><strong>Bezlimitná prevádzka:</strong> Žiadne FUP obmedzenia</li>
        </ul>

        <h3>2. Minimálna latencia pre náročné aplikácie</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Porovnanie latencií rôznych technológií:</h4>
          <ul class="space-y-1 mt-2">
            <li><strong>GPON (PODA):</strong> 1-3 ms - ideálne pre gaming a VoIP</li>
            <li><strong>Coaxial (UPC):</strong> 15-25 ms - vyhovujúce</li>
            <li><strong>DSL (O2):</strong> 25-50 ms - obmedzujúce</li>
            <li><strong>LTE (T-Mobile):</strong> 30-80 ms - problematické</li>
            <li><strong>Satelit:</strong> 600+ ms - nepoužiteľné pre real-time</li>
          </ul>
        </div>

        <h3>3. Bezkonkurenčná stabilita pripojenia</h3>
        <p>Optické vlákna sú odolné voči elektromagnetickému rušeniu, čo zaistí stabilnejšie pripojenie:</p>
        <ul>
          <li><strong>Odolnosť voči počasiu:</strong> Žiadne výpadky počas búrok</li>
          <li><strong>Bez elektromagnetického rušenia:</strong> Stabilný signál</li>
          <li><strong>Nízka chybovosť:</strong> 99,9% dostupnosť služby</li>
          <li><strong>Dlhodobá spoľahlivosť:</strong> Infraštruktúra s životnosťou 25+ rokov</li>
        </ul>

        <h2>Technická implementácia GPON v rôznych typoch zástavby</h2>
        <h3>Panelové domy (Ostrava, Karviná)</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>FTTH (Fiber to the Home) v panelákoch:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Privedenie optiky:</strong> Hlavná šachta → rozvádzač na poschodí</li>
            <li><strong>Distribúcia po bytoch:</strong> Individuálne optické vlákna</li>
            <li><strong>ONT inštalácia:</strong> Optický modem priamo v byte</li>
            <li><strong>Pripojenie k TV/routeru:</strong> Ethernet kábel</li>
            <li><strong>Kapacita:</strong> Až 64 bytov z jedného splitteru</li>
            <li><strong>Rýchlosť pre byt:</strong> Garantovaných 1000/1000 Mbps</li>
          </ul>
        </div>

        <h3>Rodinné domy (Havířov, Bohumín)</h3>
        <div class="bg-green-50 p-6 rounded-lg my-8">
          <h4>Priame optické pripojenie:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Vedenie optiky:</strong> Od distribučného bodu priamo k domu</li>
            <li><strong>Vnútorná inštalácia:</strong> ONT v technickej miestnosti/predsieni</li>
            <li><strong>Rozvodenie po dome:</strong> Cat6 Ethernet alebo Wi-Fi 6</li>
            <li><strong>Možnosť rozšírenia:</strong> Viacero optických zakončení</li>
            <li><strong>Budúcnosť:</strong> Pripravenosť na 10G služby</li>
          </ul>
        </div>

        <h2>Ekonomická analýza GPON vs. alternatívne technológie</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Celkové náklady vlastníctva (TCO) za 5 rokov:</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Technológia</th>
                <th class="text-left py-2">Mesačne</th>
                <th class="text-left py-2">5 rokov</th>
                <th class="text-left py-2">Skutočná rýchlosť</th>
                <th class="text-left py-2">Stabilita</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2">GPON (PODA)</td>
                <td class="py-2 text-green-600">250 Kč</td>
                <td class="py-2">15 000 Kč</td>
                <td class="py-2">1000/1000 Mbps</td>
                <td class="py-2 text-green-600">99,9%</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">Coaxial (UPC)</td>
                <td class="py-2 text-orange-600">699 Kč</td>
                <td class="py-2">41 940 Kč</td>
                <td class="py-2">300/30 Mbps</td>
                <td class="py-2 text-orange-600">95%</td>
              </tr>
              <tr>
                <td class="py-2">DSL (O2)</td>
                <td class="py-2 text-red-600">899 Kč</td>
                <td class="py-2">53 940 Kč</td>
                <td class="py-2">50/10 Mbps</td>
                <td class="py-2 text-red-600">90%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Environmentálne a energetické výhody GPON</h2>
        <h3>Udržateľnosť a ekologickosť</h3>
        <ul>
          <li><strong>Nižšia spotreba energie:</strong> 60% úspora oproti DSL infraštruktúre</li>
          <li><strong>Dlhšia životnosť:</strong> Menej elektronického odpadu</li>
          <li><strong>Pasívne komponenty:</strong> Optické splittery nepotrebujú elektrinu</li>
          <li><strong>Centralizované napájanie:</strong> Efektívnejšie riadenie spotreby</li>
          <li><strong>Recyklovateľné materiály:</strong> Optické vlákna sú 100% recyklovateľné</li>
        </ul>

        <h2>Budúcnosť GPON technológie a jej rozšírenia</h2>
        <h3>Plánované inovácie (2024-2027)</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Technologické vylepšenia:</h4>
          <ul class="space-y-1">
            <li><strong>XGS-PON:</strong> 10 Gbps symetrické pripojenie</li>
            <li><strong>25G-PON:</strong> 25 Gbps pre extrémne náročných používateľov</li>
            <li><strong>50G-PON:</strong> Budúcnosť pre smart cities</li>
            <li><strong>Wavelength division:</strong> Viacero služieb na jednom vlákne</li>
            <li><strong>Time-sensitive networking:</strong> Garantovaná latencia pre IoT</li>
          </ul>
        </div>

        <h2>Inštalačný proces GPON v Moravskoslezskom regióne</h2>
        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Kompletný proces aktivácie GPON:</h3>
          <ol class="space-y-2">
            <li><strong>1. Objednávka cez popri.cz</strong> - jednoduchý online formulár</li>
            <li><strong>2. Technická prehliadka</strong> - overenie trasovanie optiky</li>
            <li><strong>3. Projektová dokumentácia</strong> - návrh optimálneho riešenia</li>
            <li><strong>4. Výkopové práce</strong> - profesionálne vedenie káblov</li>
            <li><strong>5. Inštalácia ONT</strong> - optický modem vo vašej domácnosti</li>
            <li><strong>6. Konfigurácia a testovanie</strong> - overenie všetkých parametrov</li>
            <li><strong>7. Zaškolenie zákazníka</strong> - vysvetlenie funkcií a ovládania</li>
            <li><strong>8. Dokumentácia</strong> - odovzdanie záručných listov</li>
          </ol>
        </div>

        <h3>Doba realizácie podľa typu nehnuteľnosti</h3>
        <ul>
          <li><strong>Panelové domy s optikou:</strong> 2-5 dní</li>
          <li><strong>Rodinné domy v pokrytých oblastiach:</strong> 1-2 týždne</li>
          <li><strong>Nové lokality vyžadujúce infraštruktúru:</strong> 4-8 týždňov</li>
          <li><strong>Komplexné projekty:</strong> Individuálne posúdenie</li>
        </ul>

        <h2>Špecializované GPON aplikácie</h2>
        <h3>Smart Home integrácia</h3>
        <ul>
          <li><strong>IoT zariadenia:</strong> Stovky pripojených zariadení bez problémov</li>
          <li><strong>4K/8K streaming:</strong> Viacero streamov súčasne</li>
          <li><strong>Domáce bezpečnostné systémy:</strong> HD kamery s cloudovým úložiskom</li>
          <li><strong>Automatizácia domácnosti:</strong> Real-time riadenie všetkých systémov</li>
        </ul>

        <h3>Profesionálne home office</h3>
        <ul>
          <li><strong>Video konferencie 4K:</strong> Profesionálna kvalita komunikácie</li>
          <li><strong>Cloud synchronizácia:</strong> Okamžité zálohovanie práce</li>
          <li><strong>VPN pripojenia:</strong> Bezpečný prístup do firemných sietí</li>
          <li><strong>Collaboration tools:</strong> Real-time spolupráca na projektoch</li>
        </ul>

        <h2>Záver: GPON ako investícia do digitálnej budúcnosti</h2>
        <p>GPON technológia v Moravskoslezskom regióne predstavuje viac než len rýchlejší internet. Je to kompletná digitálna transformácia, ktorá umožňuje plne využiť potenciál moderných technológií a pripravuje vašu domácnosť na budúcnosť.</p>

        <h3>Kľúčové benefity GPON od PODA:</h3>
        <ul>
          <li><strong>Garantované rýchlosti:</strong> Skutočných 1000 Mbps symetricky</li>
          <li><strong>Minimálna latencia:</strong> Ideálne pre gaming a VoIP</li>
          <li><strong>Maximálna stabilita:</strong> 99,9% dostupnosť služby</li>
          <li><strong>Budúcnosť bez obmedzení:</strong> Pripravenosť na 10G+ technológie</li>
          <li><strong>Lokálna podpora:</strong> Technickí špecialisti v regióne</li>
          <li><strong>Transparentné ceny:</strong> Bez skrytých poplatkov</li>
        </ul>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Objednajte si GPON pripojenie:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>GPON špecialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná technická konzultácia a overenie dostupnosti GPON technológie na vašej adrese v Moravskoslezskom regióne.</p>
        </div>

        <p class="text-center mt-8 font-medium">Vstúpte do éry gigabitového internetu s GPON technológiou od PODA.</p>

        <p class="text-sm text-gray-500 mt-8 italic">GPON od PODA - technológia budúcnosti už dnes vo vašom dome.</p>
      </div>
    `,
    date: '24. 4. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_A_modern_apa_0.jpg',
    alt: 'Moderný bytový komplex v Ostrave-Porubě s vizualizáciou optickej siete, futuristický vzhľad pripojenia PODA',
    tags: ['Internet', 'Ostrava', 'Poruba', 'PODA', 'Optické pripojenie', 'Inštalácia zadarmo', 'Rýchly internet'],
    content: `
      <div class="prose-content">
        <h2>Úvod: Poruba vstupuje do gigabitovej éry</h2>
        <p>Ostrava-Poruba, najväčšia mestská časť Ostravy s viac ako 67 000 obyvateľmi, sa stáva digitálnym centrom Moravskoslezského regiónu vďaka modernej optickej infraštruktúre PODA. Poruba sa dělí na několik menších částí, které se nazývají porubské obvody. Mezi ně patří například: Poruba 1, která zahrnuje oblast kolem hlavního náměstí. Poruba 2, kde najdeme například Oblastní nemocnici. Poruba 3, která se rozkládá v blízkosti Vysoké školy báňské. Poruba 8, kde se nacházejí převážně panelová sídliště. Toto jsou některé z částí, na které se Poruba dělí.</p>

        <h2>Geografické pokrytie: Komplexná mapa dostupnosti</h2>
        <h3>Úplný zoznam pokrytých ulíc v Porube</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Pokryté lokality (abecedne):</h4>
          <p class="text-sm mt-2">Aloise Gavlase, Bohuslava Martinů, Bulharská, Čkalovova, Dětská, Dvorní, Francouzská, Generála Sochora, Gurťjevova, Havanská, Hlavní třída, Heyrovského, Ivana Sekaniny, Jana Šoupala, Jindřicha Plachty, Karla Pokorného, Komenského, Kosmická, Kubánská, Kyjevská, Liptaňského náměstí, Ludvíka Podéště, Marie Majerové, Matěje Kopeckého, Mongolská, Nálepkova, Náměstí Družby, Nezvalovo náměstí, Opavská, Podroužkova, Polská, Porubská, Příčná, Průběžná, Pustkovecká, Rabasova, Řecká, Resslova, Skautská, Školní, Slepá, Slavíkova, Sokolovská, Španielova, Spartakovců, Spojů, Stavební, Svojsíkova, Tř. 17. listopadu, U Oblouku, U Školky, U Soudu, U Sportoviště, U Vozovny, Ukrajinská, Urxova, Větrná, Vietnamská, Vincence Makovského, Vítězslava Nováka, Vřesinská, Záhumenní, Zdeňka Štěpánka, Zednická, Žilinská.</p>
        </div>

        <h3>Špeciálne zóny s prioritným pokrytím</h3>
        <ul>
          <li><strong>Sídlisko porubské obvody:</strong> Kompletné pokrytie všetkých panelových domov</li>
          <li><strong>Poruba-centrum:</strong> Plná dostupnosť v komerčnej zóne</li>
          <li><strong>Poruba-sever:</strong> Novšie sídlištní domy a rodinné domy</li>
          <li><strong>Průmyslová zóna:</strong> Specializovaná firemní řešení</li>
        </ul>

        <h2>Případová studie: Digitální transformace rodiny na sídlišti</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Bydlíme v panelovém domě v 4-pokojovém bytě. Předtím jsme měli DSL s rychlostí 25 Mbps od O2, ale to vůbec nestačilo pro naši rodinu. Otec pracuje z domova jako programátor, syn studuje na VŠB-TUO online, dcera streamuje filmy a já vedu videokonference pro práci. Po přechodu na PODA s optickým internetem 1000 Mbps se náš digitální život úplně změnil - každý může dělat co potřebuje současně."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Ing. Jana Svobodová, Ostrava-Poruba</strong><br>
            Projektová manažerka, 4-členná rodina, byt 92 m²
          </footer>
        </blockquote>

        <h3>Konkrétní dopad na každodenní život:</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-red-50 p-6 rounded-lg">
            <h4>Před PODA (25 Mbps DSL)</h4>
            <ul class="space-y-1">
              <li>🔴 Nemožnost současné práce z domu</li>
              <li>🔴 Přerušované video hovory</li>
              <li>🔴 Pomalé stahování studijních materiálů</li>
              <li>🔴 Problémy s online hrami</li>
              <li>🔴 Čekání na upload fotek do cloudu</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h4>Po PODA (1000 Mbps optika)</h4>
            <ul class="space-y-1">
              <li>✅ Plynulá práce z domu všech členů</li>
              <li>✅ 4K video hovory bez přerušení</li>
              <li>✅ Okamžité stahování (1 GB za 8 sekund)</li>
              <li>✅ Gaming bez lagů (ping < 3 ms)</li>
              <li>✅ Automatické zálohování do cloudu</li>
            </ul>
          </div>
        </div>

        <h2>Technické specifikace pro porubské domácnosti</h2>
        <h3>Řešení pro panelové domy</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>FTTH instalace v panelácích:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Vstup do budovy:</strong> Optický kabel přes existující šachty</li>
            <li><strong>Distribuce po podlažích:</strong> Rozvaděče na každém patře</li>
            <li><strong>Připojení do bytu:</strong> Individuální optické vlákno</li>
            <li><strong>Zakončení:</strong> ONT modem v bytě + Wi-Fi 6 router</li>
            <li><strong>Rychlost:</strong> Garantovaných 1000/1000 Mbps</li>
          </ul>
        </div>

        <h3>Řešení pro rodinné domy</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <h4>Přímé optické připojení:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Vedení optiky:</strong> Podzemní nebo vzdušné vedení</li>
            <li><strong>Vnitřní instalace:</strong> Profesionální zakončení v domě</li>
            <li><strong>Pokrytí celého domu:</strong> Mesh systém nebo kabelový rozvod</li>
            <li><strong>Smart home ready:</strong> Připravenost pro IoT zařízení</li>
          </ul>
        </div>

        <h2>Cenová analýza a porovnání s konkurencí</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Měsíční náklady v Porubě (včetně DPH):</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Poskytovatel</th>
                <th class="text-left py-2">Rychlost</th>
                <th class="text-left py-2">Cena/měsíc</th>
                <th class="text-left py-2">Aktivace</th>
                <th class="text-left py-2">Závazek</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-green-50">
                <td class="py-2 font-semibold">PODA</td>
                <td class="py-2">1000/1000 Mbps</td>
                <td class="py-2 text-green-600">250 Kč</td>
                <td class="py-2 text-green-600">Zdarma</td>
                <td class="py-2 text-green-600">Bez závazku</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">UPC (Liberty)</td>
                <td class="py-2">500/50 Mbps</td>
                <td class="py-2 text-red-600">899 Kč</td>
                <td class="py-2 text-red-600">990 Kč</td>
                <td class="py-2 text-red-600">24 měsíců</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">O2</td>
                <td class="py-2">100/20 Mbps</td>
                <td class="py-2 text-orange-600">699 Kč</td>
                <td class="py-2 text-orange-600">500 Kč</td>
                <td class="py-2 text-orange-600">24 měsíců</td>
              </tr>
              <tr>
                <td class="py-2">T-Mobile</td>
                <td class="py-2">50/10 Mbps</td>
                <td class="py-2 text-red-600">799 Kč</td>
                <td class="py-2 text-red-600">800 Kč</td>
                <td class="py-2 text-red-600">24 měsíců</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Roční úspora oproti konkurenci</h3>
        <ul>
          <li><strong>Oproti UPC:</strong> 7 788 Kč ročně + dvojnásobek rychlosti</li>
          <li><strong>Oproti O2:</strong> 5 388 Kč ročně + 10x vyšší rychlost</li>
          <li><strong>Oproti T-Mobile:</strong> 6 588 Kč ročně + 20x vyšší rychlost</li>
          <li><strong>Celková úspora za 2 roky:</strong> 10 000 - 15 000 Kč</li>
        </ul>

        <h2>Specializované služby pro Porubu</h2>
        <h3>Řešení pro studenty VŠB-TUO</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Studentské potřeby:</h4>
          <ul class="space-y-1">
            <li><strong>Online výuka:</strong> Stabilní připojení pro e-learning</li>
            <li><strong>Výzkumné projekty:</strong> Rychlý přístup k databázím</li>
            <li><strong>Kolaborace:</strong> Sdílení velkých souborů</li>
            <li><strong>Gaming a zábava:</strong> Volný čas bez omezení</li>
          </ul>
        </div>

        <h3>Firemní řešení v průmyslové zóně</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Biznis služby PODA:</h4>
          <ul class="space-y-1">
            <li><strong>Dedikované připojení:</strong> Garantovaná rychlost 24/7</li>
            <li><strong>SLA garance:</strong> 99,9% dostupnost s kompenzacemi</li>
            <li><strong>Statické IP adresy:</strong> Pro servery a aplikace</li>
            <li><strong>VPN řešení:</strong> Bezpečné propojení poboček</li>
          </ul>
        </div>

        <h2>Instalační proces v Porubě</h2>
        <h3>Typická doba realizace</h3>
        <ul>
          <li><strong>Panelové domy s optikou:</strong> 1-3 dny</li>
          <li><strong>Panelové domy bez optiky:</strong> 1-2 týdny</li>
          <li><strong>Rodinné domy:</strong> 3-7 dní</li>
          <li><strong>Nové budovy:</strong> Koordinace s developmentem</li>
        </ul>

        <h3>Proces instalace krok za krokem</h3>
        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Profesionální instalace PODA v Porubě (5 bodů):</h3>
          <ol class="space-y-2">
            <li><strong>1. Objednávka přes popri.cz</strong> - ověření dostupnosti na adrese</li>
            <li><strong>2. Technická prohlídka</strong> - návrh optimálního řešení</li>
            <li><strong>3. Koordinace s bytovým družstvem</strong> - získání souhlasů</li>
            <li><strong>4. Instalace optiky</strong> - vedení kabelů do bytu/domu</li>
            <li><strong>5. Nastavení zařízení</strong> - konfigurace modemu a routeru</li>
          </ol>
        </div>

        <h2>Smart home řešení pro Porubu</h2>
        <h3>IoT aplikace podporované PODA internetem</h3>
        <ul>
          <li><strong>Bezpečnostní systémy:</strong> HD kamery s cloudovým úložištěm</li>
          <li><strong>Klimatizace a vytápění:</strong> Inteligentní termoregulátory</li>
          <li><strong>Osvětlení:</strong> Automatické řízení osvětlení</li>
          <li><strong>Domácí spotřebiče:</strong> Připojené pračky, ledničky, atd.</li>
          <li><strong>Energie:</strong> Monitoring spotřeby v reálném čase</li>
        </ul>

        <h2>Zákaznická podpora specifická pro Porubu</h2>
        <h3>Lokální servisní centrum</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Technická podpora v regionu:</h4>
          <ul class="space-y-1">
            <li><strong>Poloha:</strong> Servisní centrum v Ostravě-centru</li>
            <li><strong>Doba reakce:</strong> Do 4 hodin v pracovní dny</li>
            <li><strong>Víkendový servis:</strong> Dostupný pro kritické případy</li>
            <li><strong>Preventivní údržba:</strong> Pravidelné kontroly sítě</li>
          </ul>
        </div>

        <h3>Digitální podpora</h3>
        <ul>
          <li><strong>Mobilní aplikace:</strong> Správa služeb z telefonu</li>
          <li><strong>Online chat:</strong> Okamžitá pomoc 24/7</li>
          <li><strong>Vzdálená diagnostika:</strong> Řešení problémů na dálku</li>
          <li><strong>Selfcare portál:</strong> Samostatná správa účtu</li>
        </ul>

        <h2>Budoucnost internetového připojení v Porubě</h2>
        <h3>Plánovaná vylepšení infrastruktury</h3>
        <ul>
          <li><strong>5G integrace:</strong> PODA optika jako backhaul pro 5G sítě</li>
          <li><strong>10G připojení:</strong> Příprava na 10 Gbps pro nejnáročnější</li>
          <li><strong>Smart city projekty:</strong> Spolupráce s městem na digitalizaci</li>
          <li><strong>Rozšíření pokrytí:</strong> Dostavba infrastruktury v okrajových částech</li>
        </ul>

        <h2>Závěr: Poruba jako digitální centrum Moravskoslezského regionu</h2>
        <p>Internet PODA v Ostravě-Porubě představuje komplexní řešení pro moderní digitální potřeby největší městské části. Od studentů VŠB-TUO až po rodiny na sídlištích - každý najde optimální řešení pro své potřeby.</p>

        <h3>Proč si vybrat PODA v Porubě:</h3>
        <ul>
          <li><strong>Nejlepší poměr cena/výkon:</strong> Nejrychlejší internet za nejnižší cenu</li>
          <li><strong>Lokální podpora:</strong> Technici z regionu, kteří znají specifika</li>
          <li><strong>Flexibilita:</strong> Bez závazků s možností změn</li>
          <li><strong>Moderní technologie:</strong> GPON optika připravená na budoucnost</li>
          <li><strong>Komplexní pokrytí:</strong> Dostupnost ve většině porubských ulic</li>
        </ul>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Ověření dostupnosti a objednávka:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>Porubský specialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná konzultace a ověření dostupnosti PODA internetu na vaší konkrétní adrese v Porubě.</p>
        </div>

        <p class="text-center mt-8 font-medium">Připojte se k tisícům spokojených zákazníků v Ostravě-Porubě a získejte internet bez kompromisů!</p>

        <p class="text-sm text-gray-500 mt-8 italic">PODA v Porubě - váš vstup do gigabitové budoucnosti.</p>
      </div>
    `
  },
];
