import { BlogPost } from './types';

export const sluzbyPosts: BlogPost[] = [
  {
    id: 2,
    title: "GPON technologie v Moravskoslezském regionu: Revoluce optického internetu",
    excerpt: "Komplexní přehled GPON technologie a jejích výhod pro domácnosti v Ostravě, Karviné a okolí. Proč je považována za standard budoucnosti pro domácí internetové připojení.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Digitální revoluce v Moravskoslezském regionu</h2>
        <p>GPON (Gigabit Passive Optical Network) představuje nejmodernější technologii pro dodávání vysokorychlostního internetu přímo do domácností v Moravskoslezském regionu. Tato technologie využívá optická vlákna pro přenos dat rychlostí až 2,5 Gbps downstream a 1,25 Gbps upstream, což mění způsob, jakým obyvatelé Ostravy, Karviné a okolí využívají internet.</p>

        <h2>Geografické pokrytí GPON v regionu</h2>
        <h3>Města s plnou GPON infrastrukturou</h3>
        <ul>
          <li><strong>Ostrava a okolí:</strong> Kompletní pokrytí všech městských částí</li>
          <li><strong>Karviná:</strong> Plné pokrytí Ráje, Hranic, Mizerova</li>
          <li><strong>Havířov:</strong> Celé město včetně okrajových částí</li>
          <li><strong>Bohumín:</strong> Strategické pokrytí centra a sídlišť</li>
          <li><strong>Frýdek-Místek:</strong> Postupné rozšiřování optické sítě</li>
        </ul>

        <h2>Co je GPON technologie?</h2>
        <p>GPON je technologie optických sítí, která umožňuje přenos dat rychlostí až 2,5 Gbps downstream a 1,25 Gbps upstream. Na rozdíl od tradičních metalických sítí využívá GPON optická vlákna, která přenášejí data pomocí světelných impulzů s minimálními ztrátami a maximální stabilitou.</p>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
          <h3>Technické specifikace GPON sítě PODA:</h3>
          <ul class="space-y-2 mt-4">
            <li>✓ <strong>Downstream rychlost:</strong> až 2,5 Gbps sdílené</li>
            <li>✓ <strong>Upstream rychlost:</strong> až 1,25 Gbps sdílené</li>
            <li>✓ <strong>Dosah bez zesílení:</strong> až 20 km</li>
            <li>✓ <strong>Splitting ratio:</strong> 1:32 až 1:64</li>
            <li>✓ <strong>Latence:</strong> < 2 ms</li>
            <li>✓ <strong>Životnost infrastruktury:</strong> 25+ let</li>
          </ul>
        </div>

        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Náš rodinný dům v Havířově-Šumbarku měl vážné problémy s internetem. Starý DSL s rychlostí 25 Mbps nezvládal potřeby naší 5-členné rodiny. Dva synové hráli online hry, dcera studovala online na VŠB-TUO a my s manželkou jsme pracovali z domova. Po přechodu na GPON od PODA s 1000 Mbps symetricky se náš digitální život úplně změnil. Každý může dělat co potřebuje bez omezení."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Ing. Pavel Dvořák, Havířov-Šumbark</strong><br>
            IT manažer, 5-členná rodina, rodinný dům 180 m²
          </footer>
        </blockquote>

        <h3>Konkrétní benefity po přechodu na GPON:</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-red-50 p-6 rounded-lg">
            <h4>Před GPON (25 Mbps DSL)</h4>
            <ul class="space-y-1">
              <li>🔴 Časté výpadky ve špičkách</li>
              <li>🔴 Nemožnost 4K streamování</li>
              <li>🔴 Problémy s video konferencemi</li>
              <li>🔴 Pomalé nahrávání do cloudu</li>
              <li>🔴 Lagy v online hrách</li>
              <li>🔴 Limitované současné používání</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h4>Po GPON (1000 Mbps symetricky)</h4>
            <ul class="space-y-1">
              <li>✅ Stabilní připojení 24/7</li>
              <li>✅ Více 4K streamů současně</li>
              <li>✅ Bezproblémové home office</li>
              <li>✅ Rychlé zálohování (1 GB za 8 sekund)</li>
              <li>✅ Ping < 3 ms pro gaming</li>
              <li>✅ Neomezené současné používání</li>
            </ul>
          </div>
        </div>

        <h2>Hlavní výhody GPON technologie</h2>
        <h3>1. Extrémně vysoká rychlost a kapacita</h3>
        <p>GPON technologie umožňuje dosáhnout rychlosti, které daleko převyšují možnosti běžných metalických sítí:</p>
        <ul>
          <li><strong>Garantované rychlosti:</strong> Skutečné, ne "až" rychlosti</li>
          <li><strong>Symetrické připojení:</strong> Stejná rychlost download i upload</li>
          <li><strong>Škálovatelnost:</strong> Jednoduché zvyšování rychlosti</li>
          <li><strong>Bezlimitní provoz:</strong> Žádná FUP omezení</li>
        </ul>

        <h3>2. Minimální latence pro náročné aplikace</h3>
        <div class="bg-orange-50 p-6 rounded-lg">
          <h4>Porovnání latencí různých technologií:</h4>
          <ul class="space-y-1 mt-2">
            <li><strong>GPON (PODA):</strong> 1-3 ms - ideální pro gaming a VoIP</li>
            <li><strong>Coaxial (Vodafone):</strong> 15-25 ms - vyhovující</li>
            <li><strong>DSL (O2):</strong> 25-50 ms - omezující</li>
            <li><strong>LTE (T-Mobile):</strong> 30-80 ms - problematické</li>
            <li><strong>Satelit:</strong> 600+ ms - nepoužitelné pro real-time</li>
          </ul>
        </div>

        <h3>3. Bezkonkurenční stabilita připojení</h3>
        <p>Optická vlákna jsou odolná vůči elektromagnetickému rušení, což zajistí stabilnější připojení:</p>
        <ul>
          <li><strong>Odolnost vůči počasí:</strong> Žádné výpadky během bouřek</li>
          <li><strong>Bez elektromagnetického rušení:</strong> Stabilní signál</li>
          <li><strong>Nízká chybovost:</strong> 99,9% dostupnost služby</li>
          <li><strong>Dlouhodobá spolehlivost:</strong> Infrastruktura s životností 25+ let</li>
        </ul>

        <h2>Technická implementace GPON v různých typech zástavby</h2>
        <h3>Panelové domy (Ostrava, Karviná)</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>FTTH (Fiber to the Home) v panelákoch:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Přivedení optiky:</strong> Hlavní šachta → rozvaděč na patře</li>
            <li><strong>Distribuce po bytech:</strong> Individuální optická vlákna</li>
            <li><strong>ONT instalace:</strong> Optický modem přímo v bytě</li>
            <li><strong>Připojení k TV/routeru:</strong> Ethernet kabel</li>
            <li><strong>Kapacita:</strong> Až 64 bytů z jednoho splitteru</li>
            <li><strong>Rychlost pro byt:</strong> Garantovaných 1000/1000 Mbps</li>
          </ul>
        </div>

        <h3>Rodinné domy (Havířov, Bohumín)</h3>
        <div class="bg-green-50 p-6 rounded-lg my-8">
          <h4>Přímé optické připojení:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Vedení optiky:</strong> Od distribučního bodu přímo k domu</li>
            <li><strong>Vnitřní instalace:</strong> ONT v technické místnosti/předsíni</li>
            <li><strong>Rozvedení po domě:</strong> Cat6 Ethernet nebo Wi-Fi 6</li>
            <li><strong>Možnost rozšíření:</strong> Více optických zakončení</li>
            <li><strong>Budoucnost:</strong> Připravenost na 10G služby</li>
          </ul>
        </div>

        <h2>Ekonomická analýza GPON vs. alternativní technologie</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Celkové náklady vlastnictví (TCO) za 5 let:</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Technologie</th>
                <th class="text-left py-2">Měsíčně</th>
                <th class="text-left py-2">5 let</th>
                <th class="text-left py-2">Skutečná rychlost</th>
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
                <td class="py-2">Coaxial (Vodafone)</td>
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

        <h2>Environmentální a energetické výhody GPON</h2>
        <h3>Udržitelnost a ekologičnost</h3>
        <ul>
          <li><strong>Nižší spotřeba energie:</strong> 60% úspora oproti DSL infrastruktuře</li>
          <li><strong>Delší životnost:</strong> Méně elektronického odpadu</li>
          <li><strong>Pasivní komponenty:</strong> Optické splittery nepotřebují elektřinu</li>
          <li><strong>Centralizované napájení:</strong> Efektivnější řízení spotřeby</li>
          <li><strong>Recyklovatelné materiály:</strong> Optická vlákna jsou 100% recyklovatelná</li>
        </ul>

        <h2>Budoucnost GPON technologie a její rozšíření</h2>
        <h3>Plánované inovace (2024-2027)</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Technologická vylepšení:</h4>
          <ul class="space-y-1">
            <li><strong>XGS-PON:</strong> 10 Gbps symetrické připojení</li>
            <li><strong>25G-PON:</strong> 25 Gbps pro extrémně náročné uživatele</li>
            <li><strong>50G-PON:</strong> Budoucnost pro smart cities</li>
            <li><strong>Wavelength division:</strong> Více služeb na jednom vlákně</li>
            <li><strong>Time-sensitive networking:</strong> Garantovaná latence pro IoT</li>
          </ul>
        </div>

        <h2>Instalační proces GPON v Moravskoslezském regionu</h2>
        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Kompletní proces aktivace GPON:</h3>
          <ol class="space-y-2">
            <li><strong>1. Objednávka přes <a href="/kontakt" class="text-white hover:text-poda-orange">popri.cz</a></strong> - jednoduchý online formulář</li>
            <li><strong>2. Technická prohlídka</strong> - ověření trasování optiky</li>
            <li><strong>3. Projektová dokumentace</strong> - návrh optimálního řešení</li>
            <li><strong>4. Výkopové práce</strong> - profesionální vedení kabelů</li>
            <li><strong>5. Instalace ONT</strong> - optický modem ve vaší domácnosti</li>
            <li><strong>6. Konfigurace a testování</strong> - ověření všech parametrů</li>
            <li><strong>7. Zaškolení zákazníka</strong> - vysvětlení funkcí a ovládání</li>
            <li><strong>8. Dokumentace</strong> - předání záručních listů</li>
          </ol>
        </div>

        <h3>Doba realizace podle typu nemovitosti</h3>
        <ul>
          <li><strong>Panelové domy s optikou:</strong> 2-5 dnů</li>
          <li><strong>Rodinné domy v pokrytých oblastech:</strong> 1-2 týdny</li>
          <li><strong>Nové lokality vyžadující infrastrukturu:</strong> 4-8 týdnů</li>
          <li><strong>Komplexní projekty:</strong> Individuální posouzení</li>
        </ul>

        <h2>Specializované GPON aplikace</h2>
        <h3>Smart Home integrace</h3>
        <ul>
          <li><strong>IoT zařízení:</strong> Stovky připojených zařízení bez problémů</li>
          <li><strong>4K/8K streaming:</strong> Více streamů současně</li>
          <li><strong>Domácí bezpečnostní systémy:</strong> HD kamery s cloudovým úložištěm</li>
          <li><strong>Automatizace domácnosti:</strong> Real-time řízení všech systémů</li>
        </ul>

        <h3>Profesionální home office</h3>
        <ul>
          <li><strong>Video konference 4K:</strong> Profesionální kvalita komunikace</li>
          <li><strong>Cloud synchronizace:</strong> Okamžité zálohování práce</li>
          <li><strong>VPN připojení:</strong> Bezpečný přístup do firemních sítí</li>
          <li><strong>Collaboration tools:</strong> Real-time spolupráce na projektech</li>
        </ul>

        <h2>Závěr: GPON jako investice do digitální budoucnosti</h2>
        <p>GPON technologie v Moravskoslezském regionu představuje více než jen rychlejší internet. Je to kompletní digitální transformace, která umožňuje plně využít potenciál moderních technologií a připravuje vaši domácnost na budoucnost.</p>

        <h3>Klíčové benefity GPON od PODA:</h3>
        <ul>
          <li><strong>Garantované rychlosti:</strong> Skutečných 1000 Mbps symetricky</li>
          <li><strong>Minimální latence:</strong> Ideální pro gaming a VoIP</li>
          <li><strong>Maximální stabilita:</strong> 99,9% dostupnost služby</li>
          <li><strong>Budoucnost bez omezení:</strong> Připravenost na 10G+ technologie</li>
          <li><strong>Lokální podpora:</strong> Techničtí specialisté v regionu</li>
          <li><strong>Transparentní ceny:</strong> Bez skrytých poplatků</li>
        </ul>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Objednejte si GPON připojení:</h3>
          <p><strong>Web:</strong> <a href="/kontakt" class="text-poda-blue hover:text-poda-orange">popri.cz</a><br>
          <strong>GPON specialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> <a href="tel:+420730431313" class="text-poda-blue hover:text-poda-orange font-medium">730 431 313</a><br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná technická konzultace a ověření dostupnosti GPON technologie na vaší adrese v Moravskoslezském regionu.</p>
        </div>

        <p class="text-center mt-8 font-medium">Vstupte do éry gigabitového internetu s GPON technologií od PODA.</p>

        <p class="text-sm text-gray-500 mt-8 italic">GPON od PODA - technologie budoucnosti již dnes ve vašem domě.</p>
      </div>
    `,
    date: '24. 4. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/lovable-uploads/3f530f22-64ab-45d8-9db3-0280fa731f62.png',
    alt: 'Moderní bytový komplex v Ostravě-Porubě s vizualizací optické sítě, futuristický vzhled připojení PODA',
    tags: ['Internet', 'Ostrava', 'Poruba', 'PODA', 'Optické připojení', 'Instalace zdarma', 'Rychlý internet'],
  },
];
