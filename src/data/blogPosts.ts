
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  alt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 11,
    title: 'Přechod od O2 k PODA po akvizici Nej.cz a Netboxu',
    excerpt: 'Zjistěte, jak vás může ovlivnit akvizice Nej.cz a Netboxu společností O2 a proč je nyní vhodný čas zvážit přechod k poskytovateli PODA, který nabízí stabilní ceny a kvalitní optické připojení.',
    date: '8. 5. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_Visual_Conce_2.webp',
    alt: 'Futuristická vizualizace propojení telekomunikačních sítí, symbolizující změny na trhu poskytovatelů internetu',
    content: `
      <p>V telekomunikačním sektoru České republiky došlo k významným změnám. Společnost O2 dokončila akvizici poskytovatele internetu Nej.cz, přičemž zákaznická základna přešla pod O2, zatímco infrastrukturu převzal CETIN. Zároveň netbox, který poskytuje internetové připojení více než 40 tisícům zákazníků především v Brně a Jihlavě, se také stal součástí O2.</p>
      
      <h3>Změny cen po akvizici</h3>
      <p>S přechodem pod O2 dochází k postupným změnám, které mohou ovlivnit vaši peněženku. Společnost O2 již začala upravovat nabídku služeb a cenovou politiku pro zákazníky získané akvizicí. Ačkoliv stávající zákazníci mohou zatím využívat své služby za původních podmínek, očekává se postupná migrace na tarify O2.</p>
      
      <h3>Proč zvážit přechod k PODA?</h3>
      <p>PODA nabízí zákazníkům alternativu s několika významnými výhodami:</p>
      <ul>
        <li>Garantovaná rychlost internetu až 1000 Mbps bez výpadků a kolísání</li>
        <li>Přes 100 televizních programů zdarma v základní nabídce</li>
        <li>Stabilní ceny bez nečekaných navýšení</li>
        <li>Non-stop zákaznická podpora a rychlé řešení případných problémů</li>
        <li>Odborná instalace bez zbytečných starostí</li>
      </ul>
      
      <h3>Jednoduchý přechod s Popri.cz</h3>
      <p>Díky webu Popri.cz je změna poskytovatele internetu na PODA snadná a bezstresová.</p>
      <p>Služba Popri.cz vám zajistí:</p>
      <ul>
        <li>Komplexní řešení přechodu bez administrativních překážek</li>
        <li>Rychlou instalaci s garantovanou rychlostí</li>
        <li>Odborné poradenství při výběru nejvhodnějšího tarifu</li>
        <li>Žádné skryté poplatky nebo nevýhodné podmínky</li>
      </ul>
      
      <h3>Výhody optického internetu od PODA</h3>
      <p>PODA poskytuje kvalitní optické připojení, které vám umožní:</p>
      <ul>
        <li>Sledovat obsah ve vysokém rozlišení bez zpomalení</li>
        <li>Hrát online hry bez nepříjemného laggování</li>
        <li>Připojit všechna zařízení v domácnosti současně bez ztráty rychlosti</li>
        <li>Pracovat z domova efektivně i při videokonferencích</li>
      </ul>
      
      <p>V době, kdy O2 po akvizici Nej.cz přizpůsobuje portfolio svých služeb a upravuje ceny, je PODA stabilní volbou pro ty, kdo hledají spolehlivé internetové připojení za výhodných podmínek. S pomocí platformy Popri.cz je přechod jednoduchý jako "objednání šálky kávy" - bez zbytečného stresu a komplikací.</p>
      
      <p>Neváhejte a zjistěte více o možnostech připojení od PODA na webu Popri.cz, kde najdete všechny potřebné informace pro bezproblémový přechod k novému poskytovateli.</p>
    `
  },
  {
    id: 10,
    title: 'Internet PODA v Ostravě-Porubě: Kvalitní připojení na vaší ulici',
    excerpt: 'Hledáte rychlý a stabilní internet v Ostravě-Porubě? PODA nabízí optické připojení až 1 Gb/s pro domácnosti i firmy ve většině porubských ulic. Instalace je zdarma a technici vám vše profesionálně zapojí až do bytu.',
    date: '24. 4. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_A_modern_apa_0.jpg',
    alt: 'Moderní bytový komplex v Ostravě-Porubě s vizualizací optické sítě, futuristický vzhled připojení PODA',
    content: `
      <h3>Dostupné ulice v Porubě:</h3>
      <p>Aloise Gavlase, Bohuslava Martinů, Bulharská, Čkalovova, Dětská, Dvorní, Francouzská, Generála Sochora, Gurťjevova, Havanská, Hlavní třída, Heyrovského, Ivana Sekaniny, Jana Šoupala, Jindřicha Plachty, Karla Pokorného, Komenského, Kosmická, Kubánská, Kyjevská, Liptaňského náměstí, Ludvíka Podéště, Marie Majerové, Matěje Kopeckého, Mongolská, Nálepkova, Náměstí Družby, Nezvalovo náměstí, Opavská, Podroužkova, Polská, Porubská, Příčná, Průběžná, Pustkovecká, Rabasova, Řecká, Resslova, Skautská, Školní, Slepá, Slavíkova, Sokolovská, Španielova, Spartakovců, Spojů, Stavební, Svojsíkova, Tř. 17. listopadu, U Oblouku, U Školky, U Soudu, U Sportoviště, U Vozovny, Ukrajinská, Urxova, Větrná, Vietnamská, Vincence Makovského, Vítězslava Nováka, Vřesinská, Záhumenní, Zdeňka Štěpánka, Zednická, Žilinská.</p>

      <h3>Výhody připojení PODA:</h3>
      <ul>
        <li>Stabilní optický internet až 1 Gb/s</li>
        <li>Bez datových limitů</li>
        <li>Rychlá instalace zdarma</li>
        <li>Výhodné balíčky s TV</li>
      </ul>

      <h3>Ověřte dostupnost na vaší adrese nebo si objednejte připojení:</h3>
      <p><strong>Web:</strong> popri.cz</p>
      <p><strong>Obchodní zástupce:</strong> Milan Terč<br>
      <strong>Tel:</strong> 730 431 313<br>
      <strong>E-mail:</strong> terc@obchod.poda.cz</p>

      <p>Připojte se k internetu nové generace v Ostravě-Porubě a užívejte si rychlost bez kompromisů!</p>
    `
  },
  {
    id: 9,
    title: 'Města s pokrytím PODA: Kde si můžete užívat rychlý internet?',
    excerpt: 'Společnost PODA pokrývá svými službami řadu měst po celé České republice. Zjistěte, kde všude můžete využívat stabilní a rychlé připojení.',
    date: '22. 4. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png',
    alt: 'Vizualizace optického připojení v městské zástavbě s modrými světelnými efekty',
    content: `
      <p>Společnost PODA patří mezi přední poskytovatele internetu v České republice a díky své moderní síti přináší rychlé a stabilní připojení nejen do velkých měst, ale i do menších obcí. Pokud hledáte spolehlivý internet pro domácnost nebo firmu, PODA je rozhodně možnost, kterou stojí za to zvážit. V tomto článku se dozvíte, kde všude můžete služby PODA využívat a jak si jednoduše ověřit dostupnost u vás doma.</p>
      
      <h3>Kde je dostupné připojení PODA?</h3>
      <p>PODA nabízí své služby v celé řadě českých měst a jejich okolí. Mezi hlavní lokality, kde se můžete na rychlé připojení spolehnout, patří:</p>
      
      <ul>
        <li><strong>Praha</strong></li>
        <li><strong>Brno</strong></li>
        <li><strong>Ostrava</strong></li>
        <li><strong>Havířov</strong></li>
        <li><strong>Karviná</strong></li>
        <li><strong>Bohumín</strong></li>
        <li><strong>Frýdek-Místek</strong></li>
        <li><strong>Havlíčkův Brod</strong></li>
        <li><strong>Horní Suchá</strong></li>
        <li><strong>Letovice</strong></li>
        <li><strong>Nové Město na Moravě</strong></li>
        <li><strong>Svitavy</strong></li>
        <li><strong>Vysoké Mýto</strong></li>
        <li><strong>Žďár nad Sázavou</strong></li>
        <li><strong>Orlová</strong></li>
        <li><strong>Znojmo</strong></li>
        <li><strong>Polička</strong></li>
      </ul>
      
      <p>Pokrývání nových oblastí se stále rozšiřuje, takže pokud vaše město zatím není na seznamu, je možné, že se brzy dočkáte i vy.</p>
      
      <h3>Jaké technologie PODA využívá?</h3>
      <p>PODA staví na dvou hlavních technologiích:</p>
      
      <ul>
        <li><strong>Optický internet</strong> – Nejmodernější způsob připojení, který zaručuje extrémně vysoké rychlosti (až 2 Gb/s) a minimální odezvu. Ideální pro streamování, hraní online her i práci z domova.</li>
        <li><strong>Bezdrátový internet</strong> – Skvělá alternativa tam, kde zatím není optická síť. Díky moderním technologiím nabízí vysokou rychlost a stabilitu připojení.</li>
      </ul>
      
      <h3>Proč si vybrat PODA?</h3>
      <ul>
        <li><strong>Rychlost a stabilita</strong> – Internet bez výpadků a s dostatečnou rychlostí pro celou rodinu.</li>
        <li><strong>Bez datových limitů</strong> – Můžete surfovat, stahovat i sledovat filmy bez omezení.</li>
        <li><strong>Výhodné ceny</strong> – Férové tarify pro domácnosti i firmy.</li>
        <li><strong>Možnost kombinace s televizí</strong> – Služba PODA TV přináší širokou nabídku programů a chytré funkce.</li>
        <li><strong>Rychlá instalace a podpora</strong> – Tým zkušených techniků je připraven vyřešit jakýkoliv problém.</li>
      </ul>
      
      <h3>Jak zjistit dostupnost a zajistit připojení PODA u vás doma?</h3>
      <p>Pokud vás zajímá, zda je připojení PODA dostupné právě na vaší adrese, stačí navštívit stránku <strong>Popri.cz (PODA připojení)</strong> a vyplnit jednoduchý kontaktní formulář. Po odeslání formuláře se vám ozvu a sdělím, zda je služba dostupná i u vás doma. Pokud bude připojení možné, pomohu vám vše zařídit – od objednávky přes instalaci až po samotné spuštění internetu. Vše rychle, přehledně a bez zbytečné administrativy.</p>
      
      <h3>Závěr</h3>
      <p>Pokud hledáte spolehlivý internet v některém z výše uvedených měst, PODA je skvělou volbou. Díky moderním technologiím, férovým cenám a osobnímu přístupu si získala důvěru tisíců domácností i firem po celé republice. Vyplňte kontaktní formulář na Popri.cz (PODA připojení) a zjistěte, jestli můžete mít rychlý internet PODA i vy!</p>
    `
  },
  {
    id: 8,
    title: '60 GHz Internet PODA: Revolučná Technológia pre Vysokorýchlostné Pripojenie',
    excerpt: 'Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti.',
    date: '10. 4. 2025',
    author: 'Tým PODA',
    category: 'Technologie',
    image: '/lovable-uploads/794ec1de-6ebd-4c0e-991a-bf48dce86900.png',
    alt: 'Vizualizácia 60 GHz internetového pripojenia v modernej bytovej zástavbe',
    content: `
      <p>Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti. Tento inovatívny systém ponúka výkon takmer porovnateľný s optickým pripojením a predstavuje významný pokrok v oblasti bezdrôtového internetu.</p>
      
      <h3>Výhody 60 GHz pripojenia</h3>
      <p>60 GHz internetové pripojenie prináša niekoľko významných výhod oproti tradičným bezdrôtovým technológiám:</p>
      
      <ul>
        <li><strong>Vysoká rychlost</strong>: Umožňuje prenosové rýchlosti až 1 000 Mb/s, čo je porovnateľné s optickým pripojením.</li>
        <li><strong>Nízka latencia</strong>: Poskytuje veľmi nízku a stabilnú odozvu, čo ocenia najmä hráči.</li>
        <li><strong>Menšie rušenie</strong>: V porovnaní s bežnými Wi-Fi sieťami (2,4 GHz a 5 GHz) dochádza k výrazne menšiemu vzájomnému rušeniu signálov.</li>
        <li><strong>Bezpečnosť</strong>: Pásmo 60 GHz je považované za veľmi bezpečné a dlhodobo ho využíva aj armáda.</li>
      </ul>
      
      <h3>Mesh Wi-Fi pre lepší signál</h3>
      <p>Mesh Wi-Fi systémy predstavujú efektívne riešenie pre rozšírenie a zlepšenie pokrytia Wi-Fi signálom v domácnostiach. Na rozdiel od tradičných Wi-Fi extenderov vytvára mesh systém jednotnú sieť s plynulým prechodom medzi jednotlivými prístupovými bodmi. Hlavné výhody mesh Wi-Fi zahŕňajú:</p>
      
      <ul>
        <li>Jednotná sieť s automatickým pripojením k najsilnejšiemu signálu</li>
        <li>Stabilné a rýchle pripojenie vďaka dynamickej optimalizácii</li>
        <li>Jednoduchá konfigurácia a správa cez mobilnú aplikáciu</li>
        <li>Škálovateľnosť - možnosť pridania ďalších mesh jednotiek pre rozšírenie pokrytia</li>
        <li>Samoopraviteľná sieť odolná voči výpadkom jednotlivých uzlov</li>
      </ul>
      
      <h3>Porovnanie s optickým internetom</h3>
      <p>Zatiaľ čo optické pripojenie zostáva špičkou v rýchlosti a stabilite, 60 GHz bezdrôtová technológia sa mu v mnohých ohľadoch približuje. Optika ponúka vyššie maximálne rýchlosti (až 100 Gb/s), ale 60 GHz pripojenie s rýchlosťami až 1 Gb/s je pre väčšinu domácností viac než dostačujúce.</p>
      
      <ul>
        <li><strong>Latencia</strong>: Obe technológie poskytujú veľmi nízku a stabilnú odozvu</li>
        <li><strong>Stabilita</strong>: Optika je menej náchylná k rušeniu, 60 GHz však tiež vykazuje vysokú stabilitu</li>
        <li><strong>Inštalácia</strong>: 60 GHz nevyžaduje nákladné pokládanie káblov, čo umožňuje rýchlejšie nasadenie</li>
        <li><strong>Dosah</strong>: Optika nemá prakticky obmedzenia v dosahu, 60 GHz je limitované na stovky metrov</li>
      </ul>
      
      <p>Pre koncových užívateľov predstavuje 60 GHz technológia výbornou alternatívu k optike, najmä v lokalitách, kde optické siete nie sú dostupné.</p>
    `
  },
  {
    id: 1,
    title: 'Výhody technologie GPON pro domácí připojení',
    excerpt: 'Objevte, proč je optické připojení GPON revoluční technologií pro stabilní a rychlý internet ve vašem bytě nebo domě.',
    content: `
      <p>Technologie GPON (Gigabit Passive Optical Network) představuje revoluci v oblasti domácího internetového připojení. Na rozdíl od tradičních metod připojení, jako jsou ADSL nebo kabelové připojení, GPON nabízí výrazně vyšší rychlosti a stabilitu.</p>
      
      <h3>Hlavní výhody GPON technologie:</h3>
      <ul>
        <li><strong>Vyšší rychlosti</strong> - GPON umožňuje symetrické rychlosti až 1000/1000 Mbps, což je ideální pro streamování, hraní her a práci z domova.</li>
        <li><strong>Nížší latence</strong> - Optické připojení má výrazně nižší odezvu než jiné typy připojení, což oceníte zejména při online hrách nebo videokonferencích.</li>
        <li><strong>Vysoká spolehlivost</strong> - Optická vlákno není ovlivněno elektromagnetickým rušením a nabízí stabilní připojení i při špatném počasí.</li>
        <li><strong>Dlouhá životnost</strong> - Optická infrastruktura má dlouhou životnost a je připravena na budoucí technologické nároky.</li>
      </ul>
      
      <p>Díky těmto vlastnostem je GPON ideální volbou pro domácnosti, které vyžadují rychlé a spolehlivé připojení k internetu. Naše služby založené na GPON technologii vám přinášejí internet budoucnosti již dnes.</p>
    `,
    date: '15. 6. 2023',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1539431001722-33ec2dbf8df1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Jak vybrat nejlepší televizní balíček pro vaši rodinu',
    excerpt: 'Průvodce výběrem televizního balíčku, který uspokojí potřeby všech členů vaší domácnosti od pohádek po sportovní přenosy.',
    content: `
      <p>Výběr správného televizního balíčku může být náročný, zejména pokud se snažíte uspokojit různorodé preference všech členů rodiny. V tomto článku vám poradíme, jak vybrat balíček, který bude vyhovovat každému.</p>
      
      <h3>Na co se zaměřit při výběru TV balíčku:</h3>
      <ol>
        <li><strong>Zmapujte potřeby rodiny</strong> - Zajímají vás primárně dětské programy, sportovní kanály, filmové stanice nebo dokumenty? Každý člen rodiny by měl mít možnost sledovat své oblíbené pořady.</li>
        <li><strong>Zvažte dodatečné funkce</strong> - Moderní TV služby nabízejí mnohem více než jen lineární vysílání. Zpětné přehrávání, nahrávání pořadů nebo sledování na více zařízeních mohou výrazně zlepšit váš televizní zážitek.</li>
        <li><strong>Porovnejte nabídky programů</strong> - Podívejte se na konkrétní kanály v jednotlivých balíčcích a zjistěte, zda obsahují vaše oblíbené stanice.</li>
        <li><strong>Zvažte poměr cena/výkon</strong> - Nejdražší balíček nemusí být nutně nejlepší. Hledejte ten, který nabízí nejlepší poměr mezi cenou a nabídkou programů.</li>
      </ol>
      
      <p>Náš balíček TV Mých 10 nabízí jedinečnou možnost zvolit si 10 vlastních prémiových stanic nad rámec základní nabídky více než 100 programů. Díky tomu si každý člen rodiny může vybrat své oblíbené kanály a vy platíte jen za to, co skutečně sledujete.</p>
    `,
    date: '2. 5. 2023',
    author: 'Tým PODA',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Snadný přechod k nám od stávajícího poskytovatele',
    excerpt: 'Přechod k novému poskytovateli internetu nemusí být komplikovaný. Přečtěte si, jak vám s tím pomůžeme krok za krokem.',
    content: `
      <p>Mnoho lidí zůstává u svého stávajícího poskytovatele internetu a TV služeb, i když nejsou spokojeni, protože se obávají komplikací spojených s přechodem. Pravdou je, že přechod může být velmi jednoduchý, zejména s naší asistencí.</p>
      
      <h3>Jak probíhá přechod k našim službám:</h3>
      <ol>
        <li><strong>Nezávazná konzultace</strong> - Náš obchodní zástupce Milan Terč vás navštíví a představí vám naše služby a možnosti připojení ve vaší lokalitě.</li>
        <li><strong>Výběr vhodného tarifu</strong> - Společně vybereme tarif, který nejlépe odpovídá vašim potřebám a rozpočtu.</li>
        <li><strong>Pomoc s výpovědí</strong> - Poskytneme vám vzor výpovědi a poradíme, jak správně ukončit smlouvu se stávajícím poskytovatelem.</li>
        <li><strong>Instalace bez výpadku</strong> - Nové připojení nainstalujeme tak, aby nedošlo k výpadku služeb mezi odpojením od stávajícího poskytovatele a připojením k našim službám.</li>
        <li><strong>Nastavení všech zařízení</strong> - Pomůžeme vám s nastavením všech vašich zařízení, včetně televizí, počítačů, tabletů a mobilních telefonů.</li>
      </ol>
      
      <p>Celý proces přechodu je navržen tak, aby byl pro vás co nejjednodušší. Nemusíte se obávat technických komplikací ani výpadku služeb. O vše se postaráme za vás.</p>
    `,
    date: '10. 4. 2023',
    author: 'Milan Terč',
    category: 'Služby',
    image: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Nejlepší sportovní přenosy v naší televizní nabídce',
    excerpt: 'Přehled sportovních kanálů a možností sledování nejdůležitějších sportovních událostí s našimi televizními balíčky.',
    content: `
      <p>Sportovní fanoušci vyžadují kvalitní a kompletní pokrytí sportovních událostí. V naší nabídce najdete širokou škálu sportovních kanálov, které vám přinesou všechny důležité sportovní přenosy.</p>
      
      <h3>Sportovní kanály v naší nabídce:</h3>
      <ul>
        <li><strong>ČT sport</strong> - Přináší nejdůležitější české i zahraniční sportovn�� události.</li>
        <li><strong>Eurosport 1 a 2</strong> - Kompletní pokrytí olympijských her, cyklistiky, tenisu a mnoha dalších sportů.</li>
        <li><strong>Nova Sport 1 a 2</strong> - Fotbalové ligy, hokej, motoristické sporty a další.</li>
        <li><strong>Arena Sport 1 a 2</strong> - Prémiové sportovní kanály s exkluzivními přenosy.</li>
      </ul>
      
      <p>S naším balíčkem TV Mých 10 si můžete zvolit své oblíbené sportovní kanály a být si jisti, že nepřijdete o žádný důležitý sportovní zážitek. Navíc díky službě PODA net.TV můžete sledovat sportovní přenosy na jakémkoli zařízení, ať už jste kdekoliv.</p>
    `,
    date: '20. 3. 2023',
    author: 'Tým PODA',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Co je to služba PODA net.TV a jak ji využít naplno',
    excerpt: 'Podrobný průvodce funkcemi služby PODA net.TV, která vám umožní sledovat televizi kdykoliv a kdekoliv.',
    content: `
      <p>Služba PODA net.TV přináší revoluci v tom, jak sledujeme televizi. Již nejste omezeni ani časem vysílání, ani místem, kde se nacházíte. V tomto článku vám představíme všechny možnosti, které tato služba nabízí.</p>
      
      <h3>Hlavní funkce PODA net.TV:</h3>
      <ol>
        <li><strong>Zpětné přehrávání</strong> - Možnost vrátit se v programu až 7 dní zpět a přehrát si jakýkoliv pořad, který vás zajímá.</li>
        <li><strong>Nahrávání pořadů</strong> - Naplánujte si nahrávání vašich oblíbených pořadů a sledujte je kdykoliv později.</li>
        <li><strong>Sledování na 4 zařízeních</strong> - Službu můžete využívat současně až na 4 různých zařízeních.</li>
        <li><strong>Pauza a přetáčení</strong> - Pozastavte nebo přetočte živé vysílání, když potřebujete.</li>
        <li><strong>Mobilní aplikace</strong> - Sledujte televizi na vašem mobilním telefonu nebo tabletu, ať jste kdekoliv.</li>
      </ol>
      
      <p>Služba PODA net.TV je automaticky součástí všech našich internetových a televizních balíčků, bez dodatečných poplatků. Stačí si pouze nainstalovat aplikaci na vaše zařízení a můžete začít využívat všechny její funkce.</p>
    `,
    date: '5. 2. 2023',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Rychlost internetu: Co je dostatečné pro různé typy uživatelů',
    excerpt: 'Jaká rychlost internetového připojení je optimální pro běžné prohlížení, streamování, hraní her nebo práci z domova? Poradíme vám.',
    content: `
      <p>Rychlost internetového připojení je jedním z nejdůležitějších parametrů při výběru poskytovatele. Různé aktivity však vyžadují různé rychlosti, a ne každý potřebuje gigabitové připojení.</p>
      
      <h3>Doporučené rychlosti pro různé aktivity:</h3>
      <ul>
        <li><strong>Běžné prohlížení webu a e-maily</strong> - Stačí 10-20 Mbps</li>
        <li><strong>Streamování videa v HD kvalitě</strong> - Minimálně 25 Mbps</li>
        <li><strong>Streamování videa v 4K kvalitě</strong> - Minimálně 50 Mbps</li>
        <li><strong>Online hry</strong> - 50-100 Mbps pro plynulý zážitek</li>
        <li><strong>Práce z domova s videokonferencemi</strong> - 50-100 Mbps</li>
        <li><strong>Domácnost s více uživateli současně</strong> - 100+ Mbps</li>
        <li><strong>Stahování velkých souborů a cloudové zálohy</strong> - 200+ Mbps</li>
      </ul>
      
      <p>Naše tarify s rychlostí 500/200 Mbps pro rodinné domy a 1000/1000 Mbps pro byty poskytují dostatečnou kapacitu i pro nejnáročnější uživatele a domácnosti s více aktivními zařízeními současně. S těmito rychlostmi budete připraveni i na budoucí technologické nároky.</p>
    `,
    date: '15. 1. 2023',
    author: 'Tým PODA',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?q=80&w=2032&auto=format&fit=crop'
  }
];

export const categories = [
  { id: 'all', name: 'Všechny články' },
  { id: 'Technologie', name: 'Technologie' },
  { id: 'Tipy a rady', name: 'Tipy a rady' },
  { id: 'Služby', name: 'Služby' }
];
