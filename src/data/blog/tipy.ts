import type { BlogPost } from './types';

export const tipyPosts: BlogPost[] = [
  {
    id: 8,
    title: "Mestá pokryté sieťou PODA - Kde poskytujeme optický internet",
    excerpt: "Kompletný prehľad všetkých miest a oblastí, kde PODA poskytuje optické internetové pripojenie s garantovanými rýchlosťami.",
    content: `
      <h2>Pokrytie siete PODA - Kde všade poskytujeme optický internet</h2>
      
      <p>PODA je regionálnym lídrom v poskytovaní optického internetu v Moravskosliezskom kraji. Naša moderná optická infraštruktúra pokrýva kľúčové mestá a obce regiónu s garantovanými rýchlosťami až do 1 Gbps.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Hlavné mestá s pokrytím PODA</h3>
        <p class="text-gray-700">V týchto mestách poskytujeme komplexné optické pripojenie s 24/7 podporou:</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Ostrava</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Ostrava-Poruba</li>
            <li>• Ostrava-Jih</li>
            <li>• Mariánské Hory</li>
            <li>• Moravská Ostrava</li>
            <li>• Vítkovice</li>
            <li>• Hrabůvka</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">98% pokrytie</div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Karviná</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Karviná-Centrum</li>
            <li>• Karviná-Hranice</li>
            <li>• Karviná-Mizerov</li>
            <li>• Karviná-Nové Město</li>
            <li>• Karviná-Ráj</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">95% pokrytie</div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Havířov</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Havířov-Město</li>
            <li>• Havířov-Podlesí</li>
            <li>• Havířov-Prostřední Suchá</li>
            <li>• Havířov-Šumbark</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">92% pokrytie</div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Frýdek-Místek</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Frýdek - centrum</li>
            <li>• Místek - centrum</li>
            <li>• Sídliště Slezská</li>
            <li>• Chlebovice</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">88% pokrytie</div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Bohumín</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Bohumín-centrum</li>
            <li>• Starý Bohumín</li>
            <li>• Nový Bohumín</li>
            <li>• Skřečoň</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">85% pokrytie</div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Orlová</h4>
          <ul class="text-gray-600 space-y-1">
            <li>• Orlová-Město</li>
            <li>• Orlová-Poruba</li>
            <li>• Orlová-Lutyně</li>
            <li>• Lazy</li>
          </ul>
          <div class="mt-4 text-sm text-poda-blue font-medium">82% pokrytie</div>
        </div>
      </div>

      <blockquote class="border-l-4 border-poda-blue bg-blue-50 p-6 my-8 rounded-r-lg">
        "Výber PODA bol najlepším rozhodnutím. Máme stabilný internet vo všetkých našich pobočkách v Ostrave a Karvinej. Odporúčame!" - Mgr. Jana K., vedúca IT oddelenia
      </blockquote>

      <h3>Špeciálne výhody pre jednotlivé mestá</h3>
      
      <div class="space-y-6 my-8">
        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h4 class="text-lg font-semibold text-yellow-800 mb-3">Ostrava - Kompletné pokrytie</h4>
          <p class="text-yellow-700 mb-3">Ako najväčšie mesto v našej sieti má Ostrava najhustejšie pokrytie s redundantnými pripojeniami pre maximálnu spoľahlivosť.</p>
          <ul class="text-yellow-700 space-y-1">
            <li>• Garantovaná dostupnosť 99,9%</li>
            <li>• Najrýchlejšie pripojenie (až 1 Gbps)</li>
            <li>• Bezplatná inštalácia do 48 hodín</li>
            <li>• Dedikovaná technická podpora</li>
          </ul>
        </div>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 class="text-lg font-semibold text-green-800 mb-3">Karviná - Rozširujúce sa pokrytie</h4>
          <p class="text-green-700 mb-3">Aktívne rozširujeme optickú sieť v Karvinej s plánovaným 100% pokrytím do konca roku 2024.</p>
          <ul class="text-green-700 space-y-1">
            <li>• Nové optické trasy každý mesiac</li>
            <li>• Špeciálne ceny pre nových zákazníkov</li>
            <li>• Bezplatná konzultácia dostupnosti</li>
            <li>• Prioritná inštalácia</li>
          </ul>
        </div>
      </div>

      <h3>Ako zistiť dostupnosť vo vašej lokalite</h3>
      
      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-poda-blue mb-3">3 jednoduché kroky</h4>
        <ol class="list-decimal list-inside space-y-2 text-gray-700">
          <li>Navštívte <a href="https://popri.cz" class="text-poda-blue hover:text-poda-orange font-medium">popri.cz</a> a zadajte vašu adresu</li>
          <li>Zavolajte na číslo <a href="tel:596112112" class="text-poda-blue hover:text-poda-orange font-medium">596 112 112</a> pre okamžitú konzultáciu</li>
          <li>Naplánujte si bezplatnú obhliadku s naším technikom</li>
        </ol>
      </div>

      <h3>Prípadová štúdia: Rozšírenie siete v roku 2024</h3>
      
      <p>V prvom polroku 2024 sme rozšírili našu optickú sieť o:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Nové pripojenia</h5>
          <ul class="text-gray-600 space-y-1">
            <li>• 2 400 nových zákazníkov</li>
            <li>• 35 km nových optických káblov</li>
            <li>• 12 nových distribučných uzlov</li>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Vylepšenia siete</h5>
          <ul class="text-gray-600 space-y-1">
            <li>• Upgrade na GPON technológiu</li>
            <li>• Zdvojnásobenie kapacity</li>
            <li>• Nové záložné pripojenia</li>
          </ul>
        </div>
      </div>

      <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-3">Pripojte sa k PODA sieti</h4>
        <p class="mb-4">Zistite, či je optický internet PODA dostupný vo vašej lokalite. Naši špecialisti vám pomôžu vybrať ideálny tarif.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="https://popri.cz" class="inline-block bg-white text-poda-blue px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors text-center">Overiť dostupnosť</a>
          <a href="tel:596112112" class="inline-block bg-poda-orange text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors text-center">Zavolať 596 112 112</a>
        </div>
      </div>
    `,
    author: "Milan Novák", 
    date: "2024-03-10",
    readTime: 6,
    category: "Tipy a rady",
    tags: ["pokrytie", "mestá", "dostupnosť", "optický internet", "PODA"],
    featured: false,
    imageUrl: "/lovable-uploads/network-coverage.jpg"
  },
  {
    id: 9,
    title: "Ako vybrať správny internetový tarif pre vašu domácnosť",
    excerpt: "Tipy a rady, ako si vybrať optimálny internetový tarif podľa počtu zariadení, využitia a rýchlosti.",
    content: `
      <h2>Výber správneho internetového tarifu</h2>
      
      <p>Pri výbere internetového pripojenia je dôležité zvážiť niekoľko faktorov, ktoré ovplyvnia vašu spokojnosť a výkon siete.</p>

      <h3>1. Počet zariadení</h3>
      <p>Ak máte v domácnosti viacero zariadení (smartfóny, počítače, televízory), odporúčame vyššiu rýchlosť pre plynulý chod všetkých zariadení.</p>

      <h3>2. Typ využitia</h3>
      <p>Pre bežné prehliadanie internetu a sociálne siete postačuje nižšia rýchlosť, no pre streamovanie videí vo vysokom rozlíšení alebo online hry je potrebná vyššia kapacita.</p>

      <h3>3. Stabilita a podpora</h3>
      <p>Zvoľte poskytovateľa s garantovanou dostupnosťou a kvalitnou technickou podporou, aby ste predišli výpadkom a problémom.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Odporúčané tarify PODA</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Štartovací:</strong> 100/100 Mbps pre menšie domácnosti a nenáročné používanie</li>
          <li><strong>Rodinný:</strong> 500/500 Mbps pre rodiny s viacerými zariadeniami a streamovaním</li>
          <li><strong>Biznis:</strong> 1000/1000 Mbps pre náročných používateľov a home office</li>
        </ul>
      </div>

      <p>Ak si nie ste istí, neváhajte nás kontaktovať na <a href="tel:596112112" class="text-poda-blue hover:text-poda-orange font-medium">596 112 112</a> alebo navštívte <a href="https://popri.cz" class="text-poda-blue hover:text-poda-orange font-medium">popri.cz</a> pre bezplatnú konzultáciu.</p>
    `,
    author: "Milan Novák",
    date: "2024-01-15",
    readTime: 5,
    category: "Tipy a rady",
    tags: ["tarify", "internet", "výber", "PODA", "rýchlosť"],
    featured: false,
    imageUrl: "/lovable-uploads/internet-tariffs.jpg"
  },
  {
    id: 10,
    title: "Bezpečnosť na internete - Ako chrániť svoje dáta a zariadenia",
    excerpt: "Základné tipy na zabezpečenie vášho internetového pripojenia a ochranu osobných údajov pri používaní internetu.",
    content: `
      <h2>Bezpečnosť na internete s PODA</h2>
      
      <p>V dnešnej dobe je ochrana osobných údajov a bezpečnosť na internete kľúčová. PODA vám prináša niekoľko jednoduchých rád, ako si zabezpečiť svoje zariadenia a dáta.</p>

      <h3>1. Silné heslá</h3>
      <p>Používajte jedinečné a silné heslá pre všetky svoje účty a pravidelne ich meníte.</p>

      <h3>2. Aktualizácie softvéru</h3>
      <p>Pravidelne aktualizujte operačný systém a aplikácie, aby ste predišli zraniteľnostiam.</p>

      <h3>3. Firewall a antivírus</h3>
      <p>Aktivujte firewall a používajte spoľahlivý antivírusový program na ochranu pred škodlivým softvérom.</p>

      <h3>4. Bezpečné WiFi</h3>
      <p>Zabezpečte svoju WiFi sieť silným heslom a používajte šifrovanie WPA3, ak je dostupné.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Ako vám PODA pomáha</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>• Moderné WiFi routery s pokročilou bezpečnosťou</li>
          <li>• Pravidelné aktualizácie firmvéru</li>
          <li>• Technická podpora pre bezpečnostné otázky</li>
          <li>• Možnosť antivírusovej ochrany priamo v sieti</li>
        </ul>
      </div>

      <p>Pre viac informácií nás kontaktujte na <a href="tel:596112112" class="text-poda-blue hover:text-poda-orange font-medium">596 112 112</a> alebo navštívte <a href="https://popri.cz" class="text-poda-blue hover:text-poda-orange font-medium">popri.cz</a>.</p>
    `,
    author: "Milan Novák",
    date: "2023-12-05",
    readTime: 7,
    category: "Tipy a rady",
    tags: ["bezpečnosť", "internet", "ochrana", "PODA", "WiFi"],
    featured: false,
    imageUrl: "/lovable-uploads/internet-security.jpg"
  }
];
