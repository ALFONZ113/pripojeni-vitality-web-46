import type { BlogPost } from './types';

// Článok s ID 1 - Úvod do PODA služieb
export const podaIntroPost: BlogPost = {
  id: 1,
  title: "PODA - Váš spoľahlivý partner pre internet a televíziu v Moravskoslezskom kraji",
  excerpt: "Spoznajte PODA - moderného poskytovateľa internetových a televíznych služieb, ktorý prináša vysokorýchle pripojenie do domácností v Ostrave, Karvinej, Havířove a ďalších mestách regiónu.",
  content: `
    <h2>Prečo si vybrať PODA pre vaše internetové a televízne služby?</h2>
    
    <p>PODA je moderný poskytovateľ telekomunikačných služieb, ktorý sa špecializuje na dodávku vysokorýchlych internetových pripojení a digitálnej televízie v Moravskoslezskom kraji. Naša spoločnosť sa zameriava na poskytovanie kvalitných služieb za konkurencieschopné ceny pre domácnosti aj firmy.</p>

    <h3>Naše hlavné služby</h3>
    
    <h4>🌐 Vysokorýchlostný internet</h4>
    <p>Ponúkame optické pripojenie s rýchlosťami až do 1 Gb/s, ktoré uspokojí potreby aj najnáročnejších používateľov. Naša infraštruktúra je postavená na moderných technológiách GPON a Ethernet, čo zaručuje stabilné a spoľahlivé pripojenie.</p>

    <h4>📺 Digitálna televízia IPTV</h4>
    <p>Viac ako 150 programov vo vysokej kvalite, včítane HD a 4K kanálov. Naša IPTV služba ponúka interaktívne funkcie ako je nahrávanie, pozastavenie vysielania a bohatá archívna ponuka.</p>

    <h4>📞 Hlasové služby</h4>
    <p>Moderné VoIP riešenia pre domácnosti aj firmy s neobmedzenými hovormi v rámci ČR a výhodnými tarifami do zahraničia.</p>

    <h3>Pokrytie oblasti</h3>
    
    <p>PODA poskytuje služby v týchto mestách a oblastiach:</p>
    <ul>
      <li><strong>Ostrava</strong> - všetky mestské časti vrátane centra a okrajových častí</li>
      <li><strong>Karviná</strong> - kompletné pokrytie mesta a priľahlých obcí</li>
      <li><strong>Havířov</strong> - všetky mestské obvody</li>
      <li><strong>Bohumín</strong> - centrum aj okrajové časti</li>
      <li><strong>Orlová</strong> - mestské časti a priľahlé oblasti</li>
      <li><strong>Frýdek-Místek</strong> - vybrané časti mesta</li>
    </ul>

    <h3>Prečo zákazníci dôverujú PODA?</h3>
    
    <h4>✅ Spoľahlivosť</h4>
    <p>Naša sieť je navrhnutá s dôrazom na maximálnu dostupnost služieb. Redundantné pripojenia a pravidelná údržba zaručujú minimálne výpadky.</p>

    <h4>✅ Zákaznícka podpora</h4>
    <p>Náš tím odborníkov je k dispozícii 24/7 pre riešenie akýchkoľvek problémov. Ponúkame podporu v českom aj slovenskom jazyku.</p>

    <h4>✅ Transparentné ceny</h4>
    <p>Bez skrytých poplatkov a nečakaných navýšení. Naše ceny sú jasné a konkurencieschopné.</p>

    <h4>✅ Moderné technológie</h4>
    <p>Investujeme do najnovších technológií, aby sme našim zákazníkom mohli ponúknuť tie najlepšie služby na trhu.</p>

    <h3>Kontakt a objednávka</h3>
    
    <p>Ak máte záujem o naše služby alebo potrebujete viac informácií, neváhajte nás kontaktovať:</p>
    
    <ul>
      <li><strong>Telefón:</strong> +420 730 431 313</li>
      <li><strong>Email:</strong> info@popri.cz</li>
      <li><strong>Web:</strong> www.popri.cz</li>
    </ul>

    <p>Náš tím je pripravený poskytnúť vám bezplatnú konzultáciu a navrhnúť riešenie presne podľa vašich potrieb.</p>

    <h3>Záver</h3>
    
    <p>PODA je viac ako len poskytovateľ internetových služieb - sme partner, ktorý rozumie potrebám moderných domácností a firiem. Našim cieľom je priniesť vám spoľahlivé pripojenie, ktoré vám umožní naplno využívať možnosti digitálneho sveta.</p>
    
    <p>Pridajte sa k tisíckam spokojných zákazníkov, ktorí si už vybrali PODA ako svojho poskytovateľa internetových a televíznych služieb!</p>
  `,
  date: "15. 12. 2024",
  author: "Milan Terč",
  category: "Služby",
  image: "/lovable-uploads/235022db-f6c5-4a2f-8970-681e7c476589.png",
  alt: "PODA logo a moderné internetové pripojenie",
  tags: ["PODA", "internet", "IPTV", "Ostrava", "Karviná", "Havířov", "optické pripojenie", "digitálna televízia"]
};

// Článok s ID 9 - Porovnanie internetových technológií
export const internetTechComparisonPost: BlogPost = {
  id: 9,
  title: "ADSL vs Optika vs 5G: Kompletné porovnanie internetových technológií v roku 2025",
  excerpt: "Detailné porovnanie všetkých dostupných internetových technológií. Zistite, ktorá technológia je najlepšia pre vaše potreby a prečo optické pripojenie dominuje trhu.",
  content: `
    <h2>Prehľad internetových technológií dostupných v ČR</h2>
    
    <p>V súčasnosti máte na výber z niekoľkých typov internetového pripojenia. Každá technológia má svoje výhody a nevýhody. V tomto článku si detailne porovnáme všetky dostupné možnosti.</p>

    <h3>1. ADSL technológia</h3>
    
    <h4>Čo je ADSL?</h4>
    <p>ADSL (Asymmetric Digital Subscriber Line) využíva existujúce medené telefónne linky. Je to jedna z najstarších digitálnych technológií, ktorá je stále používaná.</p>

    <h4>Výhody ADSL:</h4>
    <ul>
      <li>✅ Dostupné takmer všade kde je telefónna linka</li>
      <li>✅ Nižšie náklady na pripojenie</li>
      <li>✅ Stabilné pripojenie pre základné potreby</li>
    </ul>

    <h4>Nevýhody ADSL:</h4>
    <ul>
      <li>❌ Nízke rýchlosti (max 24 Mb/s)</li>
      <li>❌ Kvalita závisí na vzdialenosti od ústredne</li>
      <li>❌ Asymetrické pripojenie (pomalý upload)</li>
      <li>❌ Nedostačuje pre moderné potreby</li>
    </ul>

    <h3>2. Optické pripojenie (FTTH/FTTB)</h3>
    
    <h4>Čo je optické pripojenie?</h4>
    <p>Optické vlákno prenáša dáta pomocou svetelných signálov. Je to najmodernejšia a najrýchlejšia technológia dostupná pre domácnosti.</p>

    <h4>Výhody optiky:</h4>
    <ul>
      <li>✅ Najvyššie rýchlosti (až 1 Gb/s a viac)</li>
      <li>✅ Symetrické pripojenie (rovnaký upload ako download)</li>
      <li>✅ Minimálna latencia</li>
      <li>✅ Stabilné pripojenie nezávislé na vzdialenosti</li>
      <li>✅ Odolné voči interferenciám</li>
      <li>✅ Perspektívna technológia</li>
    </ul>

    <h4>Nevýhody optiky:</h4>
    <ul>
      <li>❌ Vyššie náklady na vybudovanie infraštruktúry</li>
      <li>❌ Nie je dostupné všade</li>
      <li>❌ Inštalácia môže byť komplikovanejšia</li>
    </ul>

    <h3>3. Mobilný 5G internet</h3>
    
    <h4>Čo je 5G?</h4>
    <p>5G je najnovšia generácia mobilných sietí, ktorá ponúka vysoké rýchlosti prostredníctvom rádiových vĺn.</p>

    <h4>Výhody 5G:</h4>
    <ul>
      <li>✅ Vysoké rýchlosti (teoreticky až 10 Gb/s)</li>
      <li>✅ Rýchla inštalácia</li>
      <li>✅ Mobilita</li>
      <li>✅ Nová technológia s veľkým potenciálom</li>
    </ul>

    <h4>Nevýhody 5G:</h4>
    <ul>
      <li>❌ Obmedzené pokrytie</li>
      <li>❌ Variabilné rýchlosti podľa signálu</li>
      <li>❌ Datové limity</li>
      <li>❌ Vyššie ceny za vysoké rýchlosti</li>
      <li>❌ Závisí na počasí a prekážkach</li>
    </ul>

    <h3>4. Káblovkový internet</h3>
    
    <h4>Čo je káblovký internet?</h4>
    <p>Využíva koaxiálne káble pôvodne určené pre televizne vysielanie. Technológia DOCSIS umožňuje vysokorýchlostný prenos dát.</p>

    <h4>Výhody káblovky:</h4>
    <ul>
      <li>✅ Vysoké rýchlosti</li>
      <li>✅ Dobré pokrytie v mestách</li>
      <li>✅ Kombinuje internet s TV</li>
    </ul>

    <h4>Nevýhody káblovky:</h4>
    <ul>
      <li>❌ Zdieľaná kapacita medzi používateľmi</li>
      <li>❌ Asymetrické pripojenie</li>
      <li>❌ Rýchlosť sa môže meniť počas dňa</li>
    </ul>

    <h3>Porovnávacia tabuľka technológií</h3>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #ddd; padding: 12px;">Technológia</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Max. rýchlosť</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Latencia</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Stabilita</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Cena</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">ADSL</td>
          <td style="border: 1px solid #ddd; padding: 12px;">24 Mb/s</td>
          <td style="border: 1px solid #ddd; padding: 12px;">30-50ms</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Stredná</td>
          <td style="border: 1px solid #ddd; padding: 12px;">€€</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Optika</td>
          <td style="border: 1px solid #ddd; padding: 12px;">1000+ Mb/s</td>
          <td style="border: 1px solid #ddd; padding: 12px;">1-5ms</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Vysoká</td>
          <td style="border: 1px solid #ddd; padding: 12px;">€€€</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">5G</td>
          <td style="border: 1px solid #ddd; padding: 12px;">100-1000 Mb/s</td>
          <td style="border: 1px solid #ddd; padding: 12px;">10-20ms</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Variabilná</td>
          <td style="border: 1px solid #ddd; padding: 12px;">€€€€</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Káblovka</td>
          <td style="border: 1px solid #ddd; padding: 12px;">500 Mb/s</td>
          <td style="border: 1px solid #ddd; padding: 12px;">10-25ms</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Dobrá</td>
          <td style="border: 1px solid #ddd; padding: 12px;">€€€</td>
        </tr>
      </tbody>
    </table>

    <h3>Ktorú technológiu si vybrať?</h3>
    
    <h4>Pre domácnosti:</h4>
    <p><strong>Optické pripojenie</strong> je jednoznačne najlepšou voľbou pre domácnosti. Ponúka najvyššie rýchlosti, najnižšiu latenciu a najvyššiu stabilitu. Je ideálne pre:</p>
    <ul>
      <li>Streamovanie 4K a 8K videa</li>
      <li>Online gaming</li>
      <li>Prácu z domu</li>
      <li>Viacero používateľov súčasne</li>
    </ul>

    <h4>Pre firmy:</h4>
    <p><strong>Optické pripojenie</strong> je taktiež najlepšou voľbou. Symetrické rýchlosti sú kľúčové pre:</p>
    <ul>
      <li>Cloud služby</li>
      <li>Video konferencie</li>
      <li>Zálohovanie dát</li>
      <li>Vzdialený pristup k systémom</li>
    </ul>

    <h3>PODA a optické pripojenie</h3>
    
    <p>PODA ponúka modern optické pripojenie GPON technológiou v Moravskoslezském kraji. Naše výhody:</p>
    
    <ul>
      <li>🚀 Rýchlosti až 1 Gb/s</li>
      <li>🔄 Symetrické pripojenie</li>
      <li>⚡ Latencia pod 5ms</li>
      <li>🛡️ 99.9% dostupnosť služby</li>
      <li>💰 Konkurencieschopné ceny</li>
      <li>🔧 Profesionálna inštalácia a podpora</li>
    </ul>

    <h3>Záver</h3>
    
    <p>Optické pripojenie je budúcnosťou internetu. Ak máte možnosť, vždy si vyberte optiku. PODA vám ponúka najmodernejšie optické pripojenie v regióne za výhodné ceny.</p>
    
    <p>Kontaktujte nás na <strong>730 431 313</strong> a zistite, či je optické pripojenie PODA dostupné vo vašej lokalite!</p>
  `,
  date: "2. 1. 2025",
  author: "Tomáš Novák",
  category: "Technologie",
  image: "/lovable-uploads/4fc5ce47-bd2b-4c44-8e84-4bf330cbf57c.png",
  alt: "Porovnanie internetových technológií - optické vlákno vs ADSL vs 5G",
  tags: ["ADSL", "optika", "5G", "technologie", "porovnanie", "FTTH", "GPON", "internetové pripojenie"]
};

// Článok s ID 15 - Riešenie problémov s internetom
export const internetTroubleshootingPost: BlogPost = {
  id: 15,
  title: "Pomalý internet? 10 krokov ako vyriešiť problémy s pripojením",
  excerpt: "Máte problémy s pomalým internetom? Naučte sa diagnostikovať a riešiť najčastejšie problémy s internetovým pripojením. Praktické tipy a rady od expertov PODA.",
  content: `
    <h2>Najčastejšie problémy s internetom a ich riešenia</h2>
    
    <p>Pomalý internet môže byť frustrujúci, ale väčšinu problémov si môžete vyriešiť sami. V tomto článku nájdete systematický návod na diagnostiku a riešenie najčastejších problémov s internetovým pripojením.</p>

    <h3>1. Meranie skutočnej rýchlosti internetu</h3>
    
    <h4>Ako správne zmerať rýchlosť?</h4>
    <p>Pred riešením problémov si najprv zmerajte skutočnú rýchlosť vašeho pripojenia:</p>
    
    <ol>
      <li><strong>Ukončite všetky aplikácie</strong> - Zatvorte prehliadače, streamovacie služby, cloud sync</li>
      <li><strong>Pripojte sa cez kábel</strong> - Ethernet pripojenie je presnejšie ako Wi-Fi</li>
      <li><strong>Použite spoľahlivý test</strong> - Odporúčame Speedtest.net alebo Fast.com</li>
      <li><strong>Opakujte meranie</strong> - Zmerajte aspoň 3x v rôznych časoch</li>
    </ol>

    <h4>Čo robiť s výsledkami?</h4>
    <ul>
      <li>Ak dosahujete <strong>80-90%</strong> objednanej rýchlosti = normálne</li>
      <li>Ak dosahujete <strong>50-80%</strong> objednanej rýchlosti = možný problém</li>
      <li>Ak dosahujete <strong>menej ako 50%</strong> = definitívny problém</li>
    </ul>

    <h3>2. Reštart zariadení - prvá pomoc</h3>
    
    <h4>Správny postup reštartu:</h4>
    <ol>
      <li><strong>Vypnite router</strong> - Odpojte zo zásuvky na 30 sekúnd</li>
      <li><strong>Vypnite modem</strong> - Ak máte samostatný modem</li>
      <li><strong>Zapnite v správnom poradí</strong>:
        <ul>
          <li>1. Modem (ak je samostatný)</li>
          <li>2. Router (počkajte 2 minúty)</li>
          <li>3. Zariadenia (PC, tablet, telefón)</li>
        </ul>
      </li>
    </ol>

    <p><strong>Tip:</strong> Reštart zariadení vyrieši až 70% problémov s internetom!</p>

    <h3>3. Kontrola Wi-Fi signálu</h3>
    
    <h4>Ako zistiť kvalitu Wi-Fi signálu?</h4>
    <ul>
      <li><strong>Windows:</strong> Otvorte CMD a napíšte <code>netsh wlan show profiles</code></li>
      <li><strong>Android:</strong> Nastavenia → Wi-Fi → Pokročilé</li>
      <li><strong>iPhone:</strong> Nastavenia → Wi-Fi → Symbol "i" vedľa siete</li>
    </ul>

    <h4>Hodnoty signálu:</h4>
    <ul>
      <li><strong>-30 až -50 dBm</strong> = Výborný signál</li>
      <li><strong>-50 až -60 dBm</strong> = Dobrý signál</li>
      <li><strong>-60 až -70 dBm</strong> = Slabý signál</li>
      <li><strong>Horšie ako -70 dBm</strong> = Veľmi slabý signál</li>
    </ul>

    <h3>4. Optimalizácia umiestnenia routera</h3>
    
    <h4>Ideálne umiestnenie routera:</h4>
    <ul>
      <li>✅ <strong>Stred bytu/domu</strong> - Rovnaká vzdialenosť do všetkých miestností</li>
      <li>✅ <strong>Výška 1-2 metre</strong> - Na polici alebo skrinke</li>
      <li>✅ <strong>Voľné miesto</strong> - Aspoň 30 cm voľného priestoru okolo</li>
      <li>✅ <strong>Vertikálne antény</strong> - Ak má router externé antény</li>
    </ul>

    <h4>Vyhýbajte sa:</h4>
    <ul>
      <li>❌ Uzavretým priestorom (skrinky, zásuvky)</li>
      <li>❌ Blízkosti mikrovlnky, TV, rádia</li>
      <li>❌ Kovových predmetov</li>
      <li>❌ Rohom miestnosti</li>
    </ul>

    <h3>5. Kontrola Wi-Fi kanálov</h3>
    
    <h4>Prečo je dôležitý správny kanál?</h4>
    <p>Ak viacero routerov v okolí používa ten istý kanál, dochádza k interferenciám a spomaleniu internetu.</p>

    <h4>Ako zmeniť kanál:</h4>
    <ol>
      <li>Otvorte web prehliadač a zadajte IP adresu routera (zvyčajne 192.168.1.1)</li>
      <li>Prihláste sa (obvykle admin/admin alebo admin/prázdne)</li>
      <li>Nájdite sekciu Wi-Fi alebo Wireless</li>
      <li>Zmeňte kanál na 1, 6 alebo 11 (pre 2.4 GHz)</li>
      <li>Pre 5 GHz skúste kanály 36, 40, 44, 48</li>
    </ol>

    <h3>6. Aktualizácia firmvéru routera</h3>
    
    <h4>Prečo aktualizovať?</h4>
    <ul>
      <li>Oprava bezpečnostných chýb</li>
      <li>Zlepšenie výkonu</li>
      <li>Nové funkcie</li>
      <li>Lepšia stabilita</li>
    </ul>

    <h4>Postup aktualizácie:</h4>
    <ol>
      <li>Zistite model a výrobcu routera</li>
      <li>Stiahnite najnovší firmvér z oficiálnej stránky výrobcu</li>
      <li>Prihláste sa do administrácie routera</li>
      <li>Nájdite sekciu "Firmware Update" alebo "Aktualizácia"</li>
      <li>Nahrajte súbor a čakajte na dokončenie</li>
    </ol>

    <p><strong>Pozor:</strong> Nikdy nevypínajte router počas aktualizácie firmvéru!</p>

    <h3>7. Kontrola na malvér a vírusy</h3>
    
    <h4>Príznaky napadnutia malvérom:</h4>
    <ul>
      <li>Náhle spomalenie internetu</li>
      <li>Neznáme programy v zozname procesov</li>
      <li>Presmerovanie webových stránok</li>
      <li>Neočakávané reklamy</li>
    </ul>

    <h4>Riešenie:</h4>
    <ol>
      <li><strong>Spustite antivírus</strong> - Úplné skenovanie systému</li>
      <li><strong>Použite Malwarebytes</strong> - Špecializovaný nástroj na malvér</li>
      <li><strong>Vyčistite prehliadač</strong> - Vymažte cache, cookies, rozšírenia</li>
      <li><strong>Aktualizujte systém</strong> - Nainštalujte najnovšie bezpečnostné záplaty</li>
    </ol>

    <h3>8. Optimalizácia sieťových nastavení</h3>
    
    <h4>Windows optimalizácia:</h4>
    <ol>
      <li>Otvorte <strong>Správcu zariadení</strong></li>
      <li>Nájdite <strong>Sieťové adaptéry</strong></li>
      <li>Kliknite pravým na váš adaptér → <strong>Vlastnosti</strong></li>
      <li>Zakážte <strong>"Allow computer to turn off this device"</strong></li>
    </ol>

    <h4>DNS servery:</h4>
    <p>Zmena DNS serverov môže urýchliť načítavanie webových stránok:</p>
    <ul>
      <li><strong>Google DNS:</strong> 8.8.8.8, 8.8.4.4</li>
      <li><strong>Cloudflare:</strong> 1.1.1.1, 1.0.0.1</li>
      <li><strong>Quad9:</strong> 9.9.9.9, 149.112.112.112</li>
    </ul>

    <h3>9. Kontrola pripojených zariadení</h3>
    
    <h4>Ako zistiť, kto využíva váš internet:</h4>
    <ol>
      <li>Prihláste sa do administrácie routera</li>
      <li>Nájdite sekciu "Connected Devices" alebo "DHCP"</li>
      <li>Skontrolujte zoznam pripojených zariadení</li>
      <li>Identifikujte neznáme zariadenia</li>
    </ol>

    <h4>Ak nájdete nepovolené zariadenia:</h4>
    <ul>
      <li>Zmeňte heslo Wi-Fi siete</li>
      <li>Použite WPA3 alebo WPA2 zabezpečenie</li>
      <li>Zakážte WPS funkciu</li>
      <li>Nastavte MAC filtrovanie</li>
    </ul>

    <h3>10. Kedy kontaktovať poskytovateľa</h3>
    
    <h4>Kontaktujte PODA ak:</h4>
    <ul>
      <li>Ani jeden z vyššie uvedených krokov nepomohol</li>
      <li>Dosahujete menej ako 50% objednanej rýchlosti</li>
      <li>Máte časté výpadky pripojenia</li>
      <li>Problém trvá viac ako 24 hodín</li>
    </ul>

    <h4>Informácie, ktoré by ste mali mať pripravené:</h4>
    <ul>
      <li>Výsledky speed testov</li>
      <li>Model routera a firmvér</li>
      <li>Kedy sa problém začal</li>
      <li>Aké kroky ste už vyskúšali</li>
    </ul>

    <h3>Preventívne opatrenia</h3>
    
    <h4>Ako predchádzať problémom:</h4>
    <ul>
      <li>🔄 <strong>Pravidelný reštart</strong> - Raz týždenne reštartujte router</li>
      <li>🛡️ <strong>Aktualizácie</strong> - Aktualizujte firmvér a ovládače</li>
      <li>🧹 <strong>Čistenie</strong> - Pravidelne čistite router od prachu</li>
      <li>📊 <strong>Monitorovanie</strong> - Sledujte rýchlosť internetu</li>
      <li>🔐 <strong>Bezpečnosť</strong> - Používajte silné heslá</li>
    </ul>

    <h3>Kontakt na PODA podporu</h3>
    
    <p>Ak potrebujete pomoc s vyriešením problémov s internetom PODA:</p>
    
    <ul>
      <li><strong>Telefón:</strong> +420 730 431 313</li>
      <li><strong>Email:</strong> podpora@popri.cz</li>
      <li><strong>Technická podpora:</strong> 24/7</li>
    </ul>

    <p>Náš tím technikov vám rád pomôže vyriešiť akýkoľvek problém s internetovým pripojením!</p>
  `,
  date: "18. 1. 2025",
  author: "Pavel Svoboda",
  category: "Tipy a rady",
  image: "/lovable-uploads/3f530f22-64ab-45d8-9db3-0280fa731f62.png",
  alt: "Riešenie problémov s internetom - diagnostika a oprava pripojenia",
  tags: ["problémy s internetom", "pomalý internet", "Wi-Fi problémy", "diagnostika", "router", "troubleshooting", "tech podpora"]
};

export const missingPosts: BlogPost[] = [
  podaIntroPost,
  internetTechComparisonPost,
  internetTroubleshootingPost
];