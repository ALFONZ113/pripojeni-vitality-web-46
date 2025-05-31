import { BlogPost } from './types';
import { karvinaPost } from './karvina';

export const sluzbyPosts: BlogPost[] = [
  karvinaPost,
  {
    id: 1,
    title: "GPON technologie: Budoucnost optického internetu",
    excerpt: "Objevte výhody GPON technologie a proč je považována za standard budoucnosti pro domácí internetové připojení.",
    content: `
      <h2>Co je GPON technologie?</h2>
      <p>GPON (Gigabit Passive Optical Network) představuje nejmodernější technologii pro dodávání vysokorychlostního internetu přímo do domácností. Tato technologie využívá optická vlákna pro přenos dat rychlostí až 2,5 Gbps downstream a 1,25 Gbps upstream.</p>
      
      <h3>Hlavní výhody GPON</h3>
      <ul>
        <li><strong>Vysoká rychlost:</strong> Gigabitové rychlosti pro domácnosti</li>
        <li><strong>Stabilita:</strong> Minimální latence a výpadky</li>
        <li><strong>Škálovatelnost:</strong> Snadné rozšíření kapacity</li>
        <li><strong>Budoucnost:</strong> Technologie připravená na další desetiletí</li>
      </ul>

      <h3>Jak GPON funguje?</h3>
      <p>GPON síť využívá pasivní optické prvky, které nevyžadují elektrické napájení. Jeden optický terminál (OLT) může obsluhovat až 64 domácností prostřednictvím optických splitterů.</p>

      <h3>PODA a GPON technologie</h3>
      <p>Společnost PODA využívá nejmodernější GPON infrastrukturu pro dodávání spolehlivého a rychlého internetového připojení. Naše síť je navržena s ohledem na budoucí potřeby a umožňuje snadné zvyšování rychlostí.</p>
    `,
    date: "15. 4. 2024",
    author: "Milan Terč",
    category: "Služby",
    image: "/lovable-uploads/56ebeef3-04d0-42a6-ac4f-f47224a075fb.png",
    alt: "Optický kabel s modrým světelným efektem znázorňujícím GPON technologii",
    tags: ["GPON", "Optické připojení", "Vysokorychlostní internet"]
  },
  {
    id: 11,
    title: 'Přechod od O2 k PODA po akvizici Nej.cz a Netboxu',
    excerpt: 'Zjistěte, jak vás může ovlivnit akvizice Nej.cz a Netboxu společností O2 a proč je nyní vhodný čas zvážit přechod k poskytovateli PODA, který nabízí stabilní ceny a kvalitní optické připojení.',
    date: '8. 5. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_Visual_Conce_2.webp',
    alt: 'Futuristická vizualizace propojení telekomunikačních sítí, symbolizující změny na trhu poskytovatelů internetu',
    tags: ['Přechod poskytovatele', 'O2', 'PODA', 'Nej.cz', 'Netbox', 'Optické připojení', 'Internet'],
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
    tags: ['Internet', 'Ostrava', 'Poruba', 'PODA', 'Optické připojení', 'Instalace zdarma', 'Rychlý internet'],
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
    id: 12,
    title: 'Internet PODA v Púchove: Rychlé pripojenie pre váš domov',
    excerpt: 'Hľadáte kvalitný internet v Púchove? PODA ponúka optické pripojenie až do 1 Gb/s pre domácnosti i firmy. Inštalácia zadarmo a technici vám všetko profesionálne zapoja.',
    date: '20. 4. 2025',
    author: 'Milan Terč',
    category: 'Služby',
    image: '/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png',
    alt: 'Vizualizácia optického pripojenia v Púchove',
    tags: ['Internet', 'Púchov', 'PODA', 'Optické pripojenie', 'Inštalácia zadarmo', 'Rýchly internet'],
    content: `
      <h3>Internet PODA v Púchove</h3>
      <p>Spoločnosť PODA prináša do Púchova najmodernejšie optické pripojenie, ktoré zabezpečí vašej domácnosti či firme rýchly a stabilný internet. Naša infraštruktúra pokrýva väčšinu mestských častí a neustále rozširujeme dostupnosť našich služieb.</p>
      
      <h3>Výhody pripojenia PODA v Púchove:</h3>
      <ul>
        <li>Optický internet až 1 Gb/s s garantovanou rýchlosťou</li>
        <li>Bez dátových limitov - neobmedzené surfovanie</li>
        <li>Profesionálna inštalácia zadarmo</li>
        <li>Možnosť kombinovania s TV službami</li>
        <li>Nonstop technická podpora</li>
        <li>Stabilné ceny bez skrytých poplatkov</li>
      </ul>

      <h3>Prečo si vybrať PODA?</h3>
      <p>PODA je moderný poskytovateľ internetových služieb, ktorý sa zameriava na kvalitu a spokojenosť zákazníkov. Naše optické pripojenie využíva najnovšie technológie GPON, ktoré zaručujú vysokú rychlosť a stabilitu pripojenia.</p>

      <h3>Dostupnosť v Púchove</h3>
      <p>Naše služby sú dostupné vo väčšine mestských častí Púchova. Pokrytie neustále rozširujeme, takže ak vaša adresa zatiaľ nie je pokrytá, môžete sa zaregistrovať na zoznam čakateľov a budeme vás informovať o možnosti pripojenia.</p>

      <h3>Ověrte dostupnosť alebo si objednajte pripojenie:</h3>
      <p><strong>Web:</strong> popri.cz</p>
      <p><strong>Obchodný zástupca:</strong> Milan Terč<br>
      <strong>Tel:</strong> 730 431 313<br>
      <strong>E-mail:</strong> terc@obchod.poda.cz</p>

      <p>Pripojte sa k internetu novej generácie v Púchove a užívajte si rýchlosť bez kompromisov!</p>
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
    tags: ['PODA', 'Pokrytí', 'Internet', 'Města', 'Optické připojení', 'Bezdrátový internet', 'Rychlé připojení'],
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
      
      <p>Pokrytí neustále rozšiřuje, takže pokud vaše město zatím není na seznamu, je možné, že se brzy dočkáte i vy.</p>
      
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
    id: 3,
    title: 'Snadný přechod k nám od stávajícího poskytovatele',
    excerpt: 'Přechod k novému poskytovatele internetu nemusí být komplikovaný. Přečtěte si, jak vám s tím pomůžeme krok za krokem.',
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
    image: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?q=80&w=2070&auto=format&fit=crop',
    tags: ['Změna poskytovatele', 'Přechod k PODA', 'Internet', 'Instalace', 'Pomoc s výpovědí', 'Milan Terč'],
  }
];
