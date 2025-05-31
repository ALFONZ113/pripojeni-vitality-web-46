
import { BlogPost } from './types';

export const tipyPosts: BlogPost[] = [
  {
    id: 2,
    title: 'Ako vybrať najlepší televizny balíček pre vašu rodinu v Moravskoslezskom regióne',
    excerpt: 'Komplexný sprievodca výberom televizného balíčka PODA TV, ktorý uspokojí potreby všetkých členov vašej domácnosti v Ostrave, Karvinej a okolí - od rozprávok po športové prenosy.',
    content: `
      <div class="prose-content">
        <h2>Úvod: Televizná revolúcia v moravskoslezských domácnostiach</h2>
        <p>Výber správneho televizného balíčka môže byť náročný, najmä ak sa snažíte uspokojiť rôznorodé preferencie všetkých členov rodiny v Moravskoslezskom regióne. Od detských programov pre najmenších v Ostrave-Porube až po športové prenosy pre fanúšikov v Karvinej - v tomto článku vám poradíme, ako vybrať balíček PODA TV, ktorý bude vyhovovať každému.</p>

        <h2>Regionálne preferencie v Moravskoslezskom kraji</h2>
        <h3>Typické potreby moravskoslezských rodín</h3>
        <ul>
          <li><strong>Športové prenosy:</strong> Vysoký záujem o hokej (HC Vítkovice), futbal a zimné športy</li>
          <li><strong>Regionálne spravodajstvo:</strong> ČT Ostrava, lokálne médiá</li>
          <li><strong>Kultúrne programy:</strong> Dokumenty o histórii regiónu, báňskom dedičstve</li>
          <li><strong>Jazykové preferencie:</strong> Česky hovorené programy, slovenské kanály</li>
        </ul>

        <h2>Analýza potrieb rôznych typov domácností</h2>
        <h3>Mladé rodiny (Ostrava-Poruba, nové sídliská)</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Typické potreby:</h4>
          <ul class="space-y-1">
            <li><strong>Detské programy:</strong> ČT :D, Minimax, JimJam</li>
            <li><strong>Rodinné filmy:</strong> HBO Family, Prima COOL</li>
            <li><strong>Vzdelávacie kanály:</strong> National Geographic, Discovery</li>
            <li><strong>Slovenské kanály:</strong> Pre slovenské rodiny v regióne</li>
          </ul>
        </div>

        <h3>Stredný vek (Karviná, Havířov - rodinné domy)</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Prioritne kanály:</h4>
          <ul class="space-y-1">
            <li><strong>Správy a publicistika:</strong> ČT24, CNN Prima News</li>
            <li><strong>Športové kanály:</strong> ČT sport, Eurosport, O2 Sport</li>
            <li><strong>Filmové stanice:</strong> HBO, Nova Cinema</li>
            <li><strong>Dokumentárne kanály:</strong> Viasat History, Viasat Nature</li>
          </ul>
        </div>

        <h3>Seniori (Bohumín, Orlová - starší obyvatelia)</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Obľúbené programy:</h4>
          <ul class="space-y-1">
            <li><strong>Verejnoprávne kanály:</strong> ČT1, ČT2, ČT art</li>
            <li><strong>Regionálne spravodajstvo:</strong> Ostrava Television</li>
            <li><strong>Retro programy:</strong> Šlágr TV, Óčko Star</li>
            <li><strong>Náboženské programy:</strong> TV Noe</li>
          </ul>
        </div>

        <h2>Prípadová štúdia: Optimalizácia TV balíčka pre rodinu v Ostrave</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Máme trojizbový byt v Ostrave-Jih a každý člen rodiny mal iné požiadavky. Syn (15 rokov) chcel športové kanály kvôli hokeju, dcéra (8 rokov) potrebovala detské programy a my s manželkou sme chceli kvalitné filmy a správy. PODA TV Mých 10 nám umožnilo vybrať si presne tie kanály, ktoré skutočne sledujeme. Ušetrili sme 200 Kč mesačne oproti predchádzajúcemu poskytovateľovi."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Martina Nováková, Ostrava-Jih</strong><br>
            Učiteľka, 4-členná rodina
          </footer>
        </blockquote>

        <h3>Optimálne riešenie pre túto rodinu:</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>PODA TV Mých 10 - výber kanálov:</h4>
          <ol class="space-y-1 mt-2">
            <li><strong>1. ČT sport</strong> - hokejové zápasy Vítkovic</li>
            <li><strong>2. Eurosport 1</strong> - ďalšie športové prenosy</li>
            <li><strong>3. Minimax</strong> - detské programy pre dcéru</li>
            <li><strong>4. JimJam</strong> - ďalšie detské kanály</li>
            <li><strong>5. HBO</strong> - kvalitné filmy pre rodičov</li>
            <li><strong>6. National Geographic</strong> - vzdelávacie programy</li>
            <li><strong>7. Discovery Channel</strong> - dokumenty</li>
            <li><strong>8. Comedy Central</strong> - zábava pre celú rodinu</li>
            <li><strong>9. Travel Channel</strong> - cestovateľské programy</li>
            <li><strong>10. Markíza</strong> - slovenské programy</li>
          </ol>
        </div>

        <h2>Sprievodca výberom TV balíčka PODA</h2>
        <h3>KROK 1: Zmapujte potreby rodiny</h3>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
          <h4>Otázky na zamyslenie:</h4>
          <ul class="space-y-2 mt-4">
            <li>• Aké žánre sleduje každý člen rodiny najčastejšie?</li>
            <li>• V akých časoch sa díva na televíziu?</li>
            <li>• Sú dôležité športové prenosy? Aké športy?</li>
            <li>• Potrebujete detské programy? Pre aký vek?</li>
            <li>• Uprednostňujete české alebo medzinárodné produkcie?</li>
            <li>• Sledujete programy naživo alebo využívate replay?</li>
          </ul>
        </div>

        <h3>KROK 2: Zvážte dodatočné funkcie PODA TV</h3>
        <ul>
          <li><strong>Spätné prehrávanie (replay):</strong> Sledovanie programov až 7 dní dozadu</li>
          <li><strong>Nahrávanie:</strong> Možnosť nahrávania obľúbených pořadov</li>
          <li><strong>Multiscreen:</strong> Sledovanie na tablete, mobile či PC</li>
          <li><strong>Pause & Play:</strong> Pozastavenie a pokračovanie živého vysielania</li>
          <li><strong>Elektronický program (EPG):</strong> Prehľadný program na 14 dní dopredu</li>
        </ul>

        <h3>KROK 3: Porovnajte jednotlivé balíčky</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-green-50 p-6 rounded-lg">
            <h4>TV Základ (160+ kanálov)</h4>
            <ul class="space-y-1">
              <li><strong>Cena:</strong> Súčasť internetového balíčka</li>
              <li><strong>Obsah:</strong> Všetky základné české kanály</li>
              <li><strong>Športové kanály:</strong> ČT sport, Nova Sport</li>
              <li><strong>Detské programy:</strong> ČT :D, Minimax</li>
              <li><strong>Pre koho:</strong> Štandardné potreby</li>
            </ul>
          </div>
          <div class="bg-orange-50 p-6 rounded-lg">
            <h4>TV Mých 10 (160+ plus 10 prémiových)</h4>
            <ul class="space-y-1">
              <li><strong>Cena:</strong> +140 Kč k internetu</li>
              <li><strong>Obsah:</strong> Základ + 10 kanálov na výber</li>
              <li><strong>Výhoda:</strong> Prispôsobenie presne vašim potrebám</li>
              <li><strong>Prémiové kanály:</strong> HBO, Sport1, Discovery atď.</li>
              <li><strong>Pre koho:</strong> Náročnejšie požiadavky</li>
            </ul>
          </div>
        </div>

        <h2>Regionálne špecifiká Moravskoslezského kraja</h2>
        <h3>Športové prenosy populárne v regióne</h3>
        <ul>
          <li><strong>Hokej:</strong> HC Vítkovice Ridera - živé prenosy na ČT sport</li>
          <li><strong>Futbal:</strong> FC Baník Ostrava - zápasy na O2 Sport</li>
          <li><strong>Zimné športy:</strong> Lyžovanie, biatlon - Eurosport</li>
          <li><strong>Motorsport:</strong> Formuly, motocykly - Sport1</li>
        </ul>

        <h3>Kulturné programy s regionálnym zameraním</h3>
        <ul>
          <li><strong>História baníctva:</strong> Dokumenty na Discovery Channel</li>
          <li><strong>Priemyselne dedičstvo:</strong> Viasat History</li>
          <li><strong>Regionálne spravodajstvo:</strong> ČT1 - regionálne okná</li>
          <li><strong>Hudobné programy:</strong> Óčko, Šlágr TV</li>
        </ul>

        <h2>Optimalizácia nákladov na televíziu</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Porovnanie nákladov (mesačne):</h3>
          <ul class="space-y-2 mt-4">
            <li><strong>Len internet (250 Kč)</strong> + Netflix (199 Kč) + HBO Max (179 Kč) = <span class="text-red-600">628 Kč</span></li>
            <li><strong>PODA Internet + TV Základ:</strong> <span class="text-green-600">250 Kč</span></li>
            <li><strong>PODA Internet + TV Mých 10:</strong> <span class="text-blue-600">390 Kč</span></li>
            <li><strong>Konkurencia s podobnou ponukou:</strong> <span class="text-red-600">800-1200 Kč</span></li>
          </ul>
        </div>

        <h3>Výhody kombinovaného balíčka PODA</h3>
        <ul>
          <li><strong>Jedna faktúra:</strong> Internet + TV v jednej platbe</li>
          <li><strong>Technická podpora:</strong> Jeden kontakt pre všetky služby</li>
          <li><strong>Stabilita služieb:</strong> Optická infraštruktúra pre internet aj TV</li>
          <li><strong>Žiadne závazky:</strong> Možnosť zmeny balíčka kedykoľvek</li>
        </ul>

        <h2>Praktické tipy pre výber kanálov TV Mých 10</h2>
        <h3>Pre rodiny s deťmi</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Odporúčané detské kanály:</h4>
          <ul class="space-y-1">
            <li><strong>Minimax (0-6 rokov):</strong> Predškolské programy</li>
            <li><strong>JimJam (3-10 rokov):</strong> Vzdelávacie programy</li>
            <li><strong>Cartoon Network (6+ rokov):</strong> Animované seriály</li>
            <li><strong>Disney Channel (všetky vekové kategórie):</strong> Rodinné filmy</li>
          </ul>
        </div>

        <h3>Pre športových fanúšikov</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Nevyhnutné športové kanály:</h4>
          <ul class="space-y-1">
            <li><strong>Eurosport 1 & 2:</strong> Najširšia ponuka športov</li>
            <li><strong>Sport1:</strong> Motorsport, tenis, bojové športy</li>
            <li><strong>Sport2:</strong> Futbal, basketbal, ďalšie športy</li>
            <li><strong>Arena Sport:</strong> Premiérové zápasy</li>
          </ul>
        </div>

        <h3>Pre milovníkov filmov a seriálov</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Prémiové filmové kanály:</h4>
          <ul class="space-y-1">
            <li><strong>HBO:</strong> Najkvalitnejšie seriály a filmy</li>
            <li><strong>Cinemax:</strong> Hollywoodské blockbustery</li>
            <li><strong>AXN:</strong> Akčné filmy a seriály</li>
            <li><strong>Universal Channel:</strong> Americké seriály</li>
          </ul>
        </div>

        <h2>Technické možnosti PODA TV</h2>
        <h3>Set-top box a ovládanie</h3>
        <ul>
          <li><strong>4K Ultra HD podpora:</strong> Najvyššia kvalita obrazu</li>
          <li><strong>HDR technológia:</strong> Realistické farby a kontrast</li>
          <li><strong>Dolby Digital:</strong> Kinosálová kvalita zvuku</li>
          <li><strong>Hlasové ovládanie:</strong> Vyhľadávanie pomocou hlasu</li>
        </ul>

        <h3>Mobilné aplikácie</h3>
        <ul>
          <li><strong>PODA net.TV:</strong> Sledovanie na smartfóne a tablete</li>
          <li><strong>Offline sledovanie:</strong> Stiahnutie programov na cestovanie</li>
          <li><strong>Rodičovská kontrola:</strong> Obmedzenie prístupu k obsahu</li>
          <li><strong>Personalizácia:</strong> Vlastné obľúbené kanály a programy</li>
        </ul>

        <h2>Proces objednania a inštalácie</h2>
        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Jednoduchá cesta k PODA TV:</h3>
          <ol class="space-y-2">
            <li><strong>1. Konzultácia cez popri.cz</strong> - analýza vašich potrieb</li>
            <li><strong>2. Výber balíčka</strong> - TV Základ alebo TV Mých 10</li>
            <li><strong>3. Výber prémiových kanálov</strong> - ak ste si vybrali Mých 10</li>
            <li><strong>4. Objednávka</strong> - online alebo telefonicky</li>
            <li><strong>5. Inštalácia</strong> - profesionálne nastavenie technikami</li>
            <li><strong>6. Zaškolenie</strong> - vysvetlenie všetkých funkcií</li>
          </ol>
        </div>

        <h3>Doba inštalácie v Moravskoslezskom regióne</h3>
        <ul>
          <li><strong>Ostrava centrum:</strong> 1-3 dni od objednania</li>
          <li><strong>Karviná, Havířov:</strong> 2-5 dní</li>
          <li><strong>Okrajové obce:</strong> 5-10 dní</li>
          <li><strong>Nové lokality:</strong> Individuálne posúdenie</li>
        </ul>

        <h2>Záver: Televízia šitá na mieru</h2>
        <p>PODA TV v Moravskoslezskom regióne ponúka jedinečnú možnosť prispôsobiť si televízne služby presne podľa potrieb vašej rodiny. Či už bývate v panelovom dome v Ostrave-Porube alebo v rodinnom dome v Karvinej, náš balíček TV Mých 10 vám umožní vybrať si presne tie kanály, ktoré skutočne sledujete.</p>

        <h3>Hlavné výhody PODA TV:</h3>
        <ul>
          <li><strong>Flexibilita:</strong> Možnosť zmeny kanálov podľa aktuálnych potrieb</li>
          <li><strong>Kvalita:</strong> 4K obraz a Dolby Digital zvuk</li>
          <li><strong>Dostupnosť:</strong> Sledovanie kdekoľvek cez mobilnú aplikáciu</li>
          <li><strong>Podpora:</strong> Lokálni technici a zákaznícka podpora</li>
          <li><strong>Cena:</strong> Transparentné ceny bez skrytých poplatkov</li>
        </ul>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Konzultácia výberu TV balíčka:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>TV špecialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná konzultácia a pomoc s výberom optimálneho TV balíčka pre vašu rodinu.</p>
        </div>

        <p class="text-center mt-8 font-medium">Objavte svet televízie bez obmedzení s PODA TV v Moravskoslezskom regióne.</p>

        <p class="text-sm text-gray-500 mt-8 italic">TV Mých 10 - televízia šitá presne na mieru vašej rodiny.</p>
      </div>
    `,
    date: '2. 5. 2023',
    author: 'Milan Terč',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop',
    tags: ['Televizné balíčky', 'TV Mých 10', 'PODA TV', 'Ostrava', 'Karviná', 'Rodinný balíček', 'Športové kanály', 'Detské programy'],
  },
  {
    id: 4,
    title: 'Najlepšie športové prenosy v našej televiznej ponuke pre fanúšikov v Moravskoslezskom regióne',
    excerpt: 'Kompletný prehľad športových kanálov PODA TV a možností sledovania najdôležitejších športových udalostí s našimi televiznými balíčkami, vrátane regionálnych športov.',
    content: `
      <div class="prose-content">
        <h2>Úvod: Športová vášeň Moravskoslezského regiónu</h2>
        <p>Moravskoslezský región má bohatú športovú tradíciu - od hokejových Vítkovic v Ostrave až po futbalový Baník. Športoví fanúšici vyžadujú kvalitné a kompletné pokrytie športových udalostí. V našej ponuke PODA TV nájdete širokú škálu športových kanálov, ktoré vám prinesú všetky dôležité športové prenosy z domova aj zo sveta.</p>

        <h2>Regionálne športové priority</h2>
        <h3>Hokej - srdce moravskoslezského športu</h3>
        <ul>
          <li><strong>HC Vítkovice Ridera:</strong> Všetky zápasy na ČT sport a O2 Sport</li>
          <li><strong>Extraliga:</strong> Kompletné pokrytie najvyššej súťaže</li>
          <li><strong>Reprezentácia:</strong> MS, ZOH a ďalšie turnaje</li>
          <li><strong>NHL:</strong> Najlepšia hokejová liga sveta na Sport1</li>
        </ul>

        <h3>Futbal - tradícia a vášeň</h3>
        <ul>
          <li><strong>FC Baník Ostrava:</strong> Zápasy 2. ligy na O2 Sport</li>
          <li><strong>Premier League:</strong> Anglická liga na Sport1</li>
          <li><strong>Reprezentácia:</strong> Kvalifikácie a turnaje na ČT sport</li>
          <li><strong>Európske poháre:</strong> Liga majstrov na O2 Sport</li>
        </ul>

        <h2>Kompletný prehľad športových kanálov PODA TV</h2>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3>Základné športové kanály (TV Základ)</h3>
            <ul class="space-y-1">
              <li><strong>ČT sport:</strong> Český verejnoprávny šport</li>
              <li><strong>Nova Sport 1:</strong> Futbal, hokej, tenis</li>
              <li><strong>Nova Sport 2:</strong> Motorsport, basketbal</li>
              <li><strong>O2 Sport:</strong> Český a slovenský šport</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h3>Prémiové športové kanály (TV Mých 10)</h3>
            <ul class="space-y-1">
              <li><strong>Eurosport 1 & 2:</strong> Olympijské športy</li>
              <li><strong>Sport1:</strong> Premier League, Formula 1</li>
              <li><strong>Sport2:</strong> NBA, NFL, ďalšie ligy</li>
              <li><strong>Arena Sport 1 & 2:</strong> Balkánske športy</li>
            </ul>
          </div>
        </div>

        <h2>Prípadová štúdia: Hokejový fanúšik z Vítkovic</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Som celoživotný fanúšik Vítkovic a potreboval som sledovať všetky zápasy. S predchádzajúcim poskytovateľom som mal len základné kanály a musel som si kupovať ďalšie športové balíčky za 400 Kč mesačne. S PODA TV Mých 10 som si vybral Eurosport 1, Sport1 a Arena Sport za 140 Kč navyše a mám pokrytých 95% všetkých hokejových zápasov, plus Formula 1 a tenis."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Pavel Svoboda, Ostrava-Vítkovice</strong><br>
            Strojný inžinier, hokejový fanúšik
          </footer>
        </blockquote>

        <h3>Analýza pokrytia hokejových zápasov:</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>Sezóna 2023/24 - kde sledovať Vítkovice:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>ČT sport (zadarmo v TV Základ):</strong> 15 zápasov v základnej časti</li>
            <li><strong>O2 Sport (zadarmo v TV Základ):</strong> 12 zápasov + play-off</li>
            <li><strong>Arena Sport (TV Mých 10):</strong> 25 zápasov vrátane súbojov s českobudějovickými</li>
            <li><strong>Online stream PODA net.TV:</strong> Všetky kanály dostupné aj na mobile</li>
          </ul>
        </div>

        <h2>Detailný prehľad športových kanálov</h2>
        <h3>ČT sport - verejnoprávny športový kanál</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Najdôležitejšie prenosy:</h4>
          <ul class="space-y-1">
            <li><strong>Hokej:</strong> Extraliga, MS, reprezentácia</li>
            <li><strong>Futbal:</strong> Reprezentácia, MOL Cup</li>
            <li><strong>Zimné športy:</strong> Lyžovanie, biatlon, skoky</li>
            <li><strong>Letné športy:</strong> Atletika, cyklistika</li>
            <li><strong>Olympijské hry:</strong> Kompletné pokrytie</li>
          </ul>
        </div>

        <h3>Eurosport 1 & 2 - olympijské športy</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Špecializácia kanálov:</h4>
          <ul class="space-y-1">
            <li><strong>Tenis:</strong> Grand Slam turnaje, ATP, WTA</li>
            <li><strong>Cyklistika:</strong> Tour de France, Giro d'Italia</li>
            <li><strong>Zimné športy:</strong> Svetové poháre v lyžovaní</li>
            <li><strong>Motorsport:</strong> Formule 1, MotoGP</li>
            <li><strong>Olympijské hry:</strong> Hlavný partner olympiády</li>
          </ul>
        </div>

        <h3>Sport1 - prémiové športové prenosy</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Exkluzívne ligy a turnaje:</h4>
          <ul class="space-y-1">
            <li><strong>Premier League:</strong> Anglická futbalová liga</li>
            <li><strong>Formula 1:</strong> Všetky závody sezóny</li>
            <li><strong>NHL:</strong> Najlepšia hokejová liga</li>
            <li><strong>UFC/MMA:</strong> Bojové športy</li>
            <li><strong>Basketbal:</strong> Európske súťaže</li>
          </ul>
        </div>

        <h2>Kalendár najdôležitejších športových udalostí 2024</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Kľúčové športové udalosti a ich pokrytie:</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Udalosť</th>
                <th class="text-left py-2">Dátum</th>
                <th class="text-left py-2">Kanál</th>
                <th class="text-left py-2">Balíček</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2">MS v hokeji</td>
                <td class="py-2">Máj 2024</td>
                <td class="py-2">ČT sport</td>
                <td class="py-2 text-green-600">TV Základ</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">EURO 2024</td>
                <td class="py-2">Jún-Júl 2024</td>
                <td class="py-2">ČT sport, Nova Sport</td>
                <td class="py-2 text-green-600">TV Základ</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">Olympijské hry Paríž</td>
                <td class="py-2">Júl-August 2024</td>
                <td class="py-2">ČT sport, Eurosport</td>
                <td class="py-2 text-orange-600">TV Mých 10</td>
              </tr>
              <tr>
                <td class="py-2">Formula 1</td>
                <td class="py-2">Marec-November</td>
                <td class="py-2">Sport1</td>
                <td class="py-2 text-orange-600">TV Mých 10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Špecializované športové balíčky pre rôzne preferencie</h2>
        <h3>Pre hokejových fanúšikov</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Odporúčený výber kanálov v TV Mých 10:</h4>
          <ol class="space-y-1 mt-2">
            <li><strong>Arena Sport 1:</strong> Ďalšie extraligové zápasy</li>
            <li><strong>Sport1:</strong> NHL a medzinárodný hokej</li>
            <li><strong>Eurosport 1:</strong> MS a olympijské turnaje</li>
            <li><strong>Zostávajúcich 7 kanálov:</strong> Podľa ďalších záujmov</li>
          </ol>
        </div>

        <h3>Pre futbalových fanúšikov</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Musí mať kanály pre futbal:</h4>
          <ol class="space-y-1 mt-2">
            <li><strong>Sport1:</strong> Premier League a La Liga</li>
            <li><strong>Sport2:</strong> Bundesliga a Serie A</li>
            <li><strong>Arena Sport 1:</strong> Liga majstrov</li>
            <li><strong>Arena Sport 2:</strong> Európska liga</li>
          </ol>
        </div>

        <h3>Pre milovníkov motoršportu</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Kompletné pokrytie motorsportu:</h4>
          <ol class="space-y-1 mt-2">
            <li><strong>Sport1:</strong> Formula 1 - všetky závody</li>
            <li><strong>Eurosport 1:</strong> MotoGP a rally</li>
            <li><strong>Eurosport 2:</strong> DTM, WRC, motokros</li>
            <li><strong>Nova Sport 2:</strong> NASCAR a IndyCar</li>
          </ol>
        </div>

        <h2>Pokročilé funkcie pre športových fanúšikov</h2>
        <h3>PODA net.TV - sport kdekoľvek</h3>
        <ul>
          <li><strong>Živé prenosy:</strong> Všetky kanály dostupné na mobile a tablete</li>
          <li><strong>Replay funkcia:</strong> Pozrieť zápas až 7 dní dozadu</li>
          <li><strong>Multi-view:</strong> Sledovanie viacerých zápasov súčasne</li>
          <li><strong>Notifikácie:</strong> Upozornenie na začiatok obľúbených zápasov</li>
        </ul>

        <h3>Nahrávanie športových prenosov</h3>
        <ul>
          <li><strong>Automatické nahrávanie:</strong> Nastavenie obľúbených tímov</li>
          <li><strong>Konfliktná kontrola:</strong> Riešenie súčasných prenosov</li>
          <li><strong>Cloudové úložisko:</strong> Nahrávky dostupné 30 dní</li>
          <li><strong>Mobilný prístup:</strong> Sledovanie nahrávok aj mimo domova</li>
        </ul>

        <h2>Regionálne športové udalosti</h2>
        <h3>Lokálne športové kluby a ich pokrytie</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>Športové kluby Moravskoslezského regiónu na TV:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>HC Vítkovice Ridera (hokej):</strong> ČT sport, O2 Sport, Arena Sport</li>
            <li><strong>FC Baník Ostrava (futbal):</strong> O2 Sport, ČT sport (poháre)</li>
            <li><strong>Karviná FC (futbal):</strong> O2 Sport (1. liga)</li>
            <li><strong>NH Ostrava (hádzaná):</strong> ČT sport (európske poháre)</li>
            <li><strong>Basketbal Ostrava:</strong> Nova Sport (NBL)</li>
          </ul>
        </div>

        <h2>Cenové porovnanie športových balíčkov</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Mesačné náklady na športové programy:</h3>
          <ul class="space-y-2 mt-4">
            <li><strong>PODA TV Základ (4 športové kanály):</strong> <span class="text-green-600">0 Kč navyše</span></li>
            <li><strong>PODA TV Mých 10 (až 8 športových kanálov):</strong> <span class="text-blue-600">140 Kč navyše</span></li>
            <li><strong>Konkurencia - športový balíček:</strong> <span class="text-red-600">300-500 Kč navyše</span></li>
            <li><strong>Samostatné streamovacie služby:</strong> <span class="text-red-600">200-800 Kč/mesiac</span></li>
          </ul>
        </div>

        <h2>Technická kvalita športových prenosov</h2>
        <h3>4K Ultra HD športové prenosy</h3>
        <ul>
          <li><strong>Dostupné v 4K:</strong> Vybrané zápasy na Sport1 a Eurosport</li>
          <li><strong>HDR technológia:</strong> Realistické farby trávnika a ľadu</li>
          <li><strong>50 fps:</strong> Plynulý obraz pri rýchlych pohyboch</li>
          <li><strong>Dolby Atmos:</strong> 3D zvuk pre kinosálový zážitok</li>
        </ul>

        <h3>Špeciálne funkcie pre šport</h3>
        <ul>
          <li><strong>Instant replay:</strong> Okamžité zopakovanie akcií</li>
          <li><strong>Multi-angle:</strong> Viacero kamier z rôznych uhlov</li>
          <li><strong>Štatistiky v reálnom čase:</strong> Live údaje priamo na obrazovke</li>
          <li><strong>Interaktívne informácie:</strong> Profily hráčov a história zápasov</li>
        </ul>

        <h2>Záver: Komplexný športový zážitok</h2>
        <p>PODA TV ponúka najkomplexnejšie športové pokrytie v Moravskoslezskom regióne. Od domácich Vítkovic až po svetové športové ligy - všetko na jednom mieste, v najvyššej kvalite a za výhodnú cenu.</p>

        <h3>Prečo zvoliť športové kanály PODA TV:</h3>
        <ul>
          <li><strong>Kompletné pokrytie:</strong> Od lokálnych tímov po svetové ligy</li>
          <li><strong>Vysoká kvalita:</strong> 4K obraz a Dolby Digital zvuk</li>
          <li><strong>Flexibilita:</strong> Sledovanie doma aj na cestách</li>
          <li><strong>Výhodná cena:</strong> Najlepší pomer cena/výkon na trhu</li>
          <li><strong>Technická podpora:</strong> Lokálni experti kedykoľvek k dispozícii</li>
        </ul>

        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Špeciálna ponuka pre športových fanúšikov:</h3>
          <ul class="space-y-2">
            <li>• <strong>Bezplatná konzultácia</strong> - výber optimálnych športových kanálov</li>
            <li>• <strong>Test balíčka</strong> - 14 dní zadarmo TV Mých 10</li>
            <li>• <strong>Flexibilná zmena</strong> - možnosť meniť kanály podľa sezóny</li>
            <li>• <strong>Športové notifikácie</strong> - nikdy nezmeškáte dôležitý zápas</li>
          </ul>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Objednajte si športové kanály PODA TV:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>Športový konzultant:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná analýza vašich športových preferencií a výber optimálneho balíčka.</p>
        </div>

        <p class="text-center mt-8 font-medium">Sledujte svoj obľúbený šport bez kompromisov s PODA TV v Moravskoslezskom regióne.</p>

        <p class="text-sm text-gray-500 mt-8 italic">PODA TV - váš spolahlivý partner pre všetky športové zážitky.</p>
      </div>
    `,
    date: '20. 3. 2023',
    author: 'Milan Terč',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2070&auto=format&fit=crop',
    tags: ['Šport', 'Televizné kanály', 'Športové prenosy', 'ČT Sport', 'Eurosport', 'Hokej', 'Futbal', 'Ostrava', 'Vítkovice', 'PODA TV'],
  },
  {
    id: 6,
    title: 'Rýchlosť internetu v Moravskoslezskom regióne: Čo je dostatočné pre rôzne typy používateľov',
    excerpt: 'Podrobný sprievodca optimálnymi rýchlosťami internetového pripojenia pre rôzne aktivity v Ostrave, Karvinej a okolí. Od bežného prehliadania až po 4K streaming a prácu z domova.',
    content: `
      <div class="prose-content">
        <h2>Úvod: Digitálne potreby moravskoslezských domácností</h2>
        <p>Rýchlosť internetového pripojenia je jedným z najdôležitejších parametrov pri výbere poskytovateľa v Moravskoslezskom regióne. Rôzne aktivity však vyžadujú rôzne rýchlosti, a nie každý potrebuje gigabitové pripojenie. V tomto článku vám poradíme, aká rýchlosť je optimálna pre vaše konkrétne potreby v Ostrave, Karvinej, Havířove a okolí.</p>

        <h2>Geografické špecifiká regiónu</h2>
        <h3>Hustota obyvateľstva a internetové potreby</h3>
        <ul>
          <li><strong>Ostrava centrum:</strong> Vysoká koncentrácia home office pracovníkov</li>
          <li><strong>Panelové sídliská:</strong> Viacčlenné rodiny s vysokou spotreba</li>
          <li><strong>Rodinné domy:</strong> Smart home systémy a vonkajšie kamery</li>
          <li><strong>Priemyselné zóny:</strong> Firemné potreby s vysokými nárokmi</li>
        </ul>

        <h2>Komplexný sprievodca rýchlosťami pre rôzne aktivity</h2>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
          <h3>Základné internetové aktivity (1-25 Mbps)</h3>
          <ul class="space-y-2 mt-4">
            <li><strong>E-mail a správy (1-3 Mbps):</strong> Základná komunikácia</li>
            <li><strong>Prehliadanie webu (3-5 Mbps):</strong> Sociálne siete, nakupovanie</li>
            <li><strong>Streamovanie hudby (1-3 Mbps):</strong> Spotify, Apple Music</li>
            <li><strong>Video hovory HD (5-10 Mbps):</strong> Skype, WhatsApp video</li>
            <li><strong>Streamovanie videa SD (3-5 Mbps):</strong> YouTube v štandardnej kvalite</li>
          </ul>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
          <h3>Pokročilé multimédiá (25-100 Mbps)</h3>
          <ul class="space-y-2 mt-4">
            <li><strong>Streamovanie HD videa (15-25 Mbps):</strong> Netflix, HBO Max v 1080p</li>
            <li><strong>Online hry (25-50 Mbps):</strong> CS:GO, Fortnite, FIFA online</li>
            <li><strong>Video konferencie HD (10-15 Mbps):</strong> Zoom, Teams pre prácu</li>
            <li><strong>Sťahovanie súborov (50-100 Mbps):</strong> Hry, filmy, aktualizácie</li>
            <li><strong>Cloud zálohovanie (25-50 Mbps):</strong> Google Drive, OneDrive</li>
          </ul>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 my-8">
          <h3>Náročné aplikácie (100+ Mbps)</h3>
          <ul class="space-y-2 mt-4">
            <li><strong>4K streaming (50-100 Mbps):</strong> Ultra HD Netflix, Amazon Prime</li>
            <li><strong>8K streaming (100-200 Mbps):</strong> Budúcnosť televizného obsahu</li>
            <li><strong>Profesionálna práca z domova (100-200 Mbps):</strong> Video editing, CAD</li>
            <li><strong>Smart home (50-100 Mbps):</strong> Viacero zariadení súčasne</li>
            <li><strong>Multiple streams (200+ Mbps):</strong> Viacero 4K streamov súčasne</li>
          </ul>
        </div>

        <h2>Prípadová štúdia: Optimalizácia pre 4-člennú rodinu v Ostrave</h2>
        <blockquote class="border-l-4 border-poda-blue pl-4 italic my-6">
          <p>"Bývame v panelovom dome v Ostrave-Porube s dvoma deťmi (10 a 15 rokov). Najprv sme mali 50 Mbps pripojenie, ale keď otec pracoval z domova cez Zoom, syn hral online hry a dcéra sledovala YouTube, internet sa prakticky zastavil. Po prechode na PODA s 1000 Mbps môže každý robiť čo potrebuje súčasne, dokonca streamujeme 4K filmy večer."</p>
          <footer class="mt-2 text-sm text-gray-600">
            <strong>Kateřina Svobodová, Ostrava-Poruba</strong><br>
            Účtovníčka, matka dvoch detí, panelový byt 85 m²
          </footer>
        </blockquote>

        <h3>Analýza súčasnej spotreby v domácnosti:</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>Súčasné aktivity v špičke (18:00-22:00):</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Otec - home office:</strong> 15 Mbps (HD video konferencie)</li>
            <li><strong>Matka - Netflix 4K:</strong> 50 Mbps (večerný film)</li>
            <li><strong>Syn - online gaming:</strong> 30 Mbps (CS:GO + stream na Twitch)</li>
            <li><strong>Dcéra - sociálne siete:</strong> 10 Mbps (YouTube, TikTok)</li>
            <li><strong>Smart zariadenia:</strong> 20 Mbps (TV, bezpečnostné kamery)</li>
            <li><strong>Celková potreba:</strong> <strong>125 Mbps minimum</strong></li>
          </ul>
        </div>

        <h2>Špecializované potreby rôznych skupín používateľov</h2>
        <h3>Home office pracovníci (IT sektor v Ostrave)</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Profesionálne požiadavky:</h4>
          <ul class="space-y-1">
            <li><strong>Video konferencie 4K (50 Mbps):</strong> Prezentácie a porady</li>
            <li><strong>VPN pripojenie (20 Mbps):</strong> Bezpečný prístup do firmy</li>
            <li><strong>Cloud synchronizácia (100 Mbps):</strong> Veľké súbory v reálnom čase</li>
            <li><strong>Backup na server (50 Mbps):</strong> Denné zálohovanie práce</li>
            <li><strong>Odporúčané minimum:</strong> <strong>200 Mbps symetricky</strong></li>
          </ul>
        </div>

        <h3>Online gameri (študenti VŠB-TUO)</h3>
        <div class="bg-green-50 p-6 rounded-lg my-6">
          <h4>Herné požiadavky:</h4>
          <ul class="space-y-1">
            <li><strong>Konkurenčné hry (25-50 Mbps):</strong> CS:GO, Valorant, Apex</li>
            <li><strong>Nízka latencia (< 10 ms):</strong> Kritická pre online hry</li>
            <li><strong>Streaming na Twitch (50-100 Mbps):</strong> Kvalitný prenos</li>
            <li><strong>Sťahovanie hier (500+ Mbps):</strong> Nové hry až 100 GB</li>
            <li><strong>Odporúčané minimum:</strong> <strong>500 Mbps s nízkou latenciou</strong></li>
          </ul>
        </div>

        <h3>Veľké rodiny (5+ členov)</h3>
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <h4>Náročné domácnosti:</h4>
          <ul class="space-y-1">
            <li><strong>Viacero 4K streamov (200 Mbps):</strong> Každý člen má svoj obsah</li>
            <li><strong>Smart home zariadenia (50 Mbps):</strong> Bezpečnostné systémy</li>
            <li><strong>Vzdelávanie online (100 Mbps):</strong> Deti na dištančnom vzdelávaní</li>
            <li><strong>Práca z domova (100 Mbps):</strong> Jeden alebo obaja rodičia</li>
            <li><strong>Odporúčané minimum:</strong> <strong>1000 Mbps (1 Gbit)</strong></li>
          </ul>
        </div>

        <h2>Technické faktory ovplyvňujúce rýchlosť</h2>
        <h3>Typ pripojenia v Moravskoslezskom regióne</h3>
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h4>Optické pripojenie (PODA)</h4>
            <ul class="space-y-1">
              <li><strong>Maximum:</strong> 1000 Mbps symetricky</li>
              <li><strong>Stabilita:</strong> 99,9% dostupnosť</li>
              <li><strong>Latencia:</strong> 1-3 ms</li>
              <li><strong>Vhodné pre:</strong> Všetky aplikácie</li>
              <li><strong>Pokrytie:</strong> Ostrava, Karviná, Havířov</li>
            </ul>
          </div>
          <div class="bg-red-50 p-6 rounded-lg">
            <h4>Iné technológie</h4>
            <ul class="space-y-1">
              <li><strong>DSL:</strong> Maximum 100 Mbps, vysoká latencia</li>
              <li><strong>Kábel:</strong> Zdieľaná rýchlosť, kolísanie</li>
              <li><strong>LTE:</strong> Obmedzené dáta, vysoká latencia</li>
              <li><strong>Satelit:</strong> Vysoká latencia (600+ ms)</li>
              <li><strong>Nevhodné pre:</strong> Náročné aplikácie</li>
            </ul>
          </div>
        </div>

        <h2>Wi-Fi vs. kábel - dopad na skutočnú rýchlosť</h2>
        <h3>Faktory ovplyvňujúce Wi-Fi rýchlosť</h3>
        <ul>
          <li><strong>Vzdialenosť od routeru:</strong> 50% pokles na 10 metrov</li>
          <li><strong>Prekážky:</strong> Steny znižujú signál o 20-80%</li>
          <li><strong>Rušenie:</strong> Iné Wi-Fi siete v okolí</li>
          <li><strong>Počet zariadení:</strong> Zdieľanie bandwidth medzi zariadeniami</li>
          <li><strong>Štandard Wi-Fi:</strong> Wi-Fi 6 vs. staršie verzie</li>
        </ul>

        <h3>Optimalizácia domácej siete</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h4>Odporúčania pre maximálnu rýchlosť:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Ethernet kábel:</strong> Pre najbardziej náročné aplikácie</li>
            <li><strong>Moderný router:</strong> Wi-Fi 6 alebo novší štandard</li>
            <li><strong>Mesh systém:</strong> Pre väčšie domy a byty</li>
            <li><strong>Optimálne umiestnenie:</strong> Router v centre domácnosti</li>
            <li><strong>5 GHz pásmo:</strong> Pre rýchlejšie pripojenie</li>
          </ul>
        </div>

        <h2>Cenová analýza rýchlostných balíčkov</h2>
        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>PODA tarify vs. potreby používateľov:</h3>
          <table class="w-full mt-4 text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Rýchlosť</th>
                <th class="text-left py-2">Cena/mesiac</th>
                <th class="text-left py-2">Vhodné pre</th>
                <th class="text-left py-2">Počet používateľov</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2">100/100 Mbps</td>
                <td class="py-2 text-green-600">250 Kč</td>
                <td class="py-2">Základné potreby</td>
                <td class="py-2">1-2 osoby</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">500/200 Mbps</td>
                <td class="py-2 text-blue-600">250 Kč</td>
                <td class="py-2">Home office + streaming</td>
                <td class="py-2">2-4 osoby</td>
              </tr>
              <tr>
                <td class="py-2">1000/1000 Mbps</td>
                <td class="py-2 text-orange-600">250 Kč</td>
                <td class="py-2">Náročné aplikácie</td>
                <td class="py-2">4+ osôb</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Budúcnosť internetových rýchlostí</h2>
        <h3>Pripravované technológie (2024-2026)</h3>
        <ul>
          <li><strong>8K streaming:</strong> Bude vyžadovať 100-200 Mbps</li>
          <li><strong>Virtual Reality:</strong> 150-300 Mbps pre plynulý zážitok</li>
          <li><strong>Augmented Reality:</strong> 50-100 Mbps pre real-time aplikácie</li>
          <li><strong>IoT expansion:</strong> Stovky pripojených zariadení</li>
          <li><strong>Cloud gaming:</strong> Hry bez konzoly, 100+ Mbps</li>
        </ul>

        <h2>Testovanie a monitoring rýchlosti</h2>
        <h3>Spoľahlivé nástroje na meranie</h3>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h4>Odporúčané testovacie nástroje:</h4>
          <ul class="space-y-1">
            <li><strong>Speedtest.net:</strong> Najpopulárnejší test rýchlosti</li>
            <li><strong>Fast.com (Netflix):</strong> Test optimalizovaný pre streaming</li>
            <li><strong>Google Speed Test:</strong> Integrovaný do vyhľadávania</li>
            <li><strong>PODA Speed Test:</strong> Optimalizovaný pre našu sieť</li>
          </ul>
        </div>

        <h3>Interpretácia výsledkov testov</h3>
        <ul>
          <li><strong>Download rychlost:</strong> Sťahovanie obsahu z internetu</li>
          <li><strong>Upload rychlost:</strong> Nahrávanie súborov, video hovory</li>
          <li><strong>Ping/latencia:</strong> Odozva siete (dôležité pre hry)</li>
          <li><strong>Jitter:</strong> Stabilita pripojenia</li>
          <li><strong>Packet loss:</strong> Strata dátových balíčkov</li>
        </ul>

        <h2>Riešenie problémov s pomalým internetom</h2>
        <div class="bg-orange-50 p-6 rounded-lg my-8">
          <h4>Najčastejšie príčiny pomalého internetu:</h4>
          <ul class="space-y-2 mt-4">
            <li><strong>Zastaraný router:</strong> Výmena za Wi-Fi 6 model</li>
            <li><strong>Slabý Wi-Fi signál:</strong> Mesh systém alebo repeater</li>
            <li><strong>Príliš zariadení:</strong> Upgrade na vyššiu rýchlosť</li>
            <li><strong>Malware:</strong> Antivírová kontrola všetkých zariadení</li>
            <li><strong>Zastaraný tarif:</strong> Prechod na moderné riešenie</li>
          </ul>
        </div>

        <h2>Záver: Investícia do správnej rýchlosti</h2>
        <p>Výber správnej rýchlosti internetu v Moravskoslezskom regióne je investíciou do produktivity a pohodlia celej vašej domácnosti. S optickým pripojením PODA získate:</p>

        <ul>
          <li><strong>Garantované rýchlosti:</strong> Bez "až" a asteriskov</li>
          <li><strong>Symetrické pripojenie:</strong> Rovnaká rýchlosť pre download aj upload</li>
          <li><strong>Minimálnu latenciu:</strong> Ideálne pre náročné aplikácie</li>
          <li><strong>Stabilitu:</strong> 99,9% dostupnosť služby</li>
          <li><strong>Budúcnosť:</strong> Pripravenosť na nové technológie</li>
        </ul>

        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Bezplatná analýza vašich potrieb:</h3>
          <ul class="space-y-2">
            <li>• <strong>Konzultácia používania:</strong> Analýza vašich internetových aktivít</li>
            <li>• <strong>Test súčasnej rýchlosti:</strong> Overenie skutočného výkonu</li>
            <li>• <strong>Odporúčanie tarifu:</strong> Optimálna rýchlosť pre váš dom</li>
            <li>• <strong>Optimalizácia siete:</strong> Nastavenie routeru a Wi-Fi</li>
          </ul>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg my-8">
          <h3>Konzultácia optimálnej rýchlosti:</h3>
          <p><strong>Web:</strong> popri.cz<br>
          <strong>Internetový špecialista:</strong> Milan Terč<br>
          <strong>Tel:</strong> 730 431 313<br>
          <strong>E-mail:</strong> terc@obchod.poda.cz</p>
          <p class="mt-4 text-sm text-gray-600">Bezplatná analýza vašich internetových potrieb a odporúčanie optimálneho riešenia.</p>
        </div>

        <p class="text-center mt-8 font-medium">Získajte presne takú rýchlosť internetu, akú potrebujete v Moravskoslezskom regióne.</p>

        <p class="text-sm text-gray-500 mt-8 italic">PODA internet - správna rýchlosť pre váš digitálny život.</p>
      </div>
    `,
    date: '15. 1. 2023',
    author: 'Milan Terč',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?q=80&w=2032&auto=format&fit=crop',
    tags: ['Rýchlosť internetu', 'Streamovanie', 'Online hry', 'Práca z domova', 'HD kvalita', '4K kvalita', 'Ostrava', 'Karviná', 'PODA', 'Home office'],
  }
];
