
import { useEffect, useState } from 'react';
import { Calendar, User, Search, Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const blogPosts = [
  {
    id: 8,
    title: '60 GHz Internet PODA: Revolučná Technológia pre Vysokorýchlostné Pripojenie',
    excerpt: 'Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti.',
    content: `
      <p>Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti. Tento inovatívny systém ponúka výkon takmer porovnateľný s optickým pripojením a predstavuje významný pokrok v oblasti bezdrôtového internetu.</p>
      
      <h3>Výhody 60 GHz pripojenia</h3>
      <p>60 GHz internetové pripojenie prináša niekoľko významných výhod oproti tradičným bezdrôtovým technológiám:</p>
      
      <ul>
        <li><strong>Vysoká rýchlosť</strong>: Umožňuje prenosové rýchlosti až 1 000 Mb/s, čo je porovnateľné s optickým pripojením</li>
        <li><strong>Nízka latencia</strong>: Poskytuje veľmi nízku a stabilnú odozvu, čo ocenia najmä hráči</li>
        <li><strong>Menšie rušenie</strong>: V porovnaní s bežnými Wi-Fi sieťami (2,4 GHz a 5 GHz) dochádza k výrazne menšiemu vzájomnému rušeniu signálov</li>
        <li><strong>Bezpečnosť</strong>: Pásmo 60 GHz je považované za veľmi bezpečné a dlhodobo ho využíva aj armáda</li>
      </ul>
      
      <p>Napriek kratšiemu dosahu signálu (do cca 400 metrov) predstavuje 60 GHz technológia optimálne riešenie pre rodinné domy bez prístupu k optickej sieti, ponúkajúc stabilné a vysokorýchlostné pripojenie.</p>
    `,
    date: '10. 4. 2025',
    author: 'Team PODA',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    customUrl: '/blog/60ghz-internet'
  },
  {
    id: 7,
    title: 'Rozšíření optické sítě PODA v brněnském Komárově',
    excerpt: 'Společnost PODA nově připojila několik ulic v městské části Komárov k vysokorychlostní optické síti s rychlostí až 1 Gb/s.',
    content: `
      <p>Společnost PODA, významný poskytovatel telekomunikačních služeb v České republice, rozšířila svou moderní optickou síť do dalších ulic v brněnské městské části Komárov. Podle zpráv byly nově připojeny ulice Schwaigrova, Hodonínská, Za školou a Za mostem, což přináší obyvatelům této oblasti přístup k vysokorychlostnímu internetu s rychlostí až 1 Gb/s a možnost sledování více než 160 televizních kanálů.</p>
      
      <h3>Význam optické sítě v Komárově</h3>
      <p>Rozšíření optické sítě PODA v Komárově představuje významný krok k modernizaci internetové infrastruktury v této části Brna. Optické připojení nabízí obyvatelům řadu výhod oproti tradičním technologiím:</p>
      
      <ul>
        <li><strong>Extrémně vysoké rychlosti</strong> až 1 Gb/s umožňují bezproblémové streamování, online gaming a práci z domova.</li>
        <li><strong>Stabilita a nízká latence</strong> (kolem 10 ms) zajišťují plynulý provoz i při náročných aplikacích.</li>
        <li><strong>Odolnost vůči elektromagnetickému rušení</strong> a povětrnostním vlivům zaručuje spolehlivé připojení za všech podmínek.</li>
        <li><strong>Možnost současného využívání</strong> vysokorychlostního internetu a sledování IPTV s více než 160 programy rozšiřuje multimediální možnosti domácností.</li>
      </ul>
      
      <p>Tato investice do moderní infrastruktury zvyšuje atraktivitu Komárova pro nové obyvatele a podniky, podporuje digitální rozvoj oblasti a zlepšuje kvalitu života místních občanů.</p>
      
      <h3>Technologie GPON a její přínosy</h3>
      <p>GPON (Gigabit Passive Optical Network) je moderní technologie optického připojení, kterou PODA využívá pro poskytování vysokorychlostního internetu v Komárově. Tato technologie umožňuje přenos dat rychlostí až 2,5 Gb/s směrem k uživateli a 1,25 Gb/s směrem od uživatele. GPON vyniká několika klíčovými výhodami:</p>
      
      <ul>
        <li>Vysoká přenosová kapacita umožňující bezproblémové streamování 4K videa a online gaming</li>
        <li>Nízká latence, která je ideální pro aplikace vyžadující okamžitou odezvu</li>
        <li>Efektivní využití optických vláken - jedno vlákno může obsluhovat až 64 uživatelů</li>
        <li>Odolnost vůči elektromagnetickému rušení zajišťující stabilní připojení</li>
        <li>Možnost budoucího navýšení rychlosti bez nutnosti výměny optických kabelů</li>
      </ul>
      
      <p>Díky těmto vlastnostem přináší GPON technologie obyvatelům Komárova spolehlivé a rychlé internetové připojení, které plně odpovídá nárokům moderní digitální doby.</p>
      
      <h3>Seznam nově připojených ulic</h3>
      <p>Společnost PODA rozšířila svou optickou síť v brněnské městské části Komárov o několik nových ulic. Konkrétně se jedná o tyto lokality:</p>
      
      <ul>
        <li>Schwaigrova</li>
        <li>Hodonínská</li>
        <li>Za školou</li>
        <li>Za mostem</li>
      </ul>
      
      <p>Tyto ulice jsou nyní připojeny k moderní optické infrastruktuře, která umožňuje obyvatelům využívat vysokorychlostní internet s rychlostí až 1 Gb/s a sledovat více než 160 televizních programů. Zajímavostí je, že tyto ulice jsou součástí tzv. Bloku 1a, který je pravidelně čištěn v rámci blokového čištění městské části Brno-jih. Rozšíření optické sítě tak přispívá nejen k digitálnímu rozvoji této oblasti, ale také k celkovému zlepšení kvality života místních obyvatel.</p>
    `,
    date: '1. 4. 2025',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1557191358-57dfbc468c2e?q=80&w=2070&auto=format&fit=crop'
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
        <li><strong>Nižší latence</strong> - Optické připojení má výrazně nižší odezvu než jiné typy připojení, což oceníte zejména při online hrách nebo videokonferencích.</li>
        <li><strong>Vysoká spolehlivost</strong> - Optické vlákno není ovlivněno elektromagnetickým rušením a nabízí stabilní připojení i při špatném počasí.</li>
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
      <p>Sportovní fanoušci vyžadují kvalitní a kompletní pokrytí sportovních událostí. V naší nabídce najdete širokou škálu sportovních kanálů, které vám přinesou všechny důležité sportovní přenosy.</p>
      
      <h3>Sportovní kanály v naší nabídce:</h3>
      <ul>
        <li><strong>ČT sport</strong> - Přináší nejdůležitější české i zahraniční sportovní události.</li>
        <li><strong>Eurosport 1 a 2</strong> - Kompletní pokrytí olympijských her, cyklistiky, tenisu a mnoha dalších sportů.</li>
        <li><strong>Nova Sport 1 a 2</strong> - Fotbalové ligy, hokej, motoristické sporty a další.</li>
        <li><strong>Arena Sport 1 a 2</strong> - Prémiové sportovní kanály s exkluzivními přenosy.</li>
      </ul>
      
      <p>S naším balíčkem TV Mých 10 si můžete zvolit své oblíbené sportovní kanály a být si jisti, že nepřijdete o žádný důležitý sportovní zážitek. Navíc díky službě PODA net.TV můžete sledovat sportovní přenosy na jakémkoli zařízení, ať už jste doma nebo na cestách.</p>
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
    excerpt: 'Jaká rychlost internetu je optimální pro běžné prohlížení, streamování, hraní her nebo práci z domova? Poradíme vám.',
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Všechny články' },
    { id: 'Technologie', name: 'Technologie' },
    { id: 'Tipy a rady', name: 'Tipy a rady' },
    { id: 'Služby', name: 'Služby' }
  ];
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    return () => {
      cleanupAnimation();
    };
  }, []);
  
  useEffect(() => {
    filterPosts();
  }, [searchTerm, selectedCategory]);
  
  const filterPosts = () => {
    let filtered = blogPosts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(filtered);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Blog a novinky
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation delay-100">
              Zajímavé články a informace
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed reveal-animation delay-200">
              Přečtěte si nejnovější články o technologiích, tipech pro lepší využití vašeho internetu 
              a televize, a mnoho dalšího.
            </p>
            
            <div className="relative max-w-xl mx-auto reveal-animation delay-300">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Hledat články..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="section-padding pt-4 pb-4 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-white text-poda-blue shadow-sm'
                      : 'text-gray-600 hover:text-poda-blue'
                  } px-4 py-2 rounded-lg font-medium transition-colors`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Žádné články nenalezeny</h3>
              <p className="text-gray-500">
                Zkuste změnit vyhledávací kritéria nebo vybrat jinou kategorii.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-poda-blue hover:text-poda-orange font-medium"
              >
                Zobrazit všechny články
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group reveal-animation"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span className="bg-blue-50 text-poda-blue px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-poda-blue mb-3 group-hover:text-poda-orange transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <Link 
                        to={post.customUrl || `/blog/${post.id}`} 
                        className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
                      >
                        Číst více <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
