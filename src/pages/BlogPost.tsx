import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
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
        <li><strong>Vysoká rýchlosť</strong>: Umožňuje prenosové rýchlosti až 1 000 Mb/s, čo je porovnateľné s optickým pripojením.</li>
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
      
      <p>Pre koncových užívateľov predstavuje 60 GHz technológia výbornú alternatívu k optike, najmä v lokalitách, kde optické siete nie sú dostupné.</p>
    `,
    date: '10. 4. 2025',
    author: 'Tým PODA',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=2070&auto=format&fit=crop'
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
      <p>Sportovní fanoušci vyžadují kvalitní a kompletní pokrytí sportovních událostí. V naší nabídce najdete širokou šk��lu sportovních kanálov, které vám přinesou všechny důležité sportovní přenosy.</p>
      
      <h3>Sportovní kanály v naší nabídce:</h3>
      <ul>
        <li><strong>ČT sport</strong> - Přináší nejdůležitější české i zahraniční sportovní události.</li>
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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const navigate = useNavigate();
  
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) 
    : [];
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    
    window.scrollTo(0, 0);
    
    const foundPost = blogPosts.find(p => p.id === Number(id));
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
    
    return () => {
      cleanupAnimation();
    };
  }, [id, navigate]);
  
  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding pt-10 pb-12 bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na všechny články
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <span className="bg-blue-100 text-poda-blue px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-poda-blue mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors">
                    <Share2 className="h-5 w-5 mr-2" />
                    <span>Sdílet</span>
                  </button>
                  <button className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span>Uložit</span>
                  </button>
                </div>
                
                <Link 
                  to="/kontakt" 
                  className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Kontaktovat nás</span>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-poda-blue mb-4">Kontaktovat Milana Terče</h3>
                  <p className="text-gray-600 mb-6">
                    Máte otázky k našim službám nebo potřebujete poradit s výběrem tarifu? Neváhejte nás kontaktovat.
                  </p>
                  <Link
                    to="/kontakt"
                    className="btn-secondary w-full flex justify-center"
                  >
                    Kontaktovat
                  </Link>
                </div>
                
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-poda-blue mb-6">Související články</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <Link 
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <div className="flex items-start">
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-poda-blue group-hover:text-poda-orange transition-colors">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {relatedPost.date}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
            Zaujala vás naše nabídka?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Nezávazně se informujte o možnostech připojení ve vaší lokalitě. Milan Terč vám rád poskytne veškeré informace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link
              to="/kontakt"
              className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Kontaktovat Milana Terče
            </Link>
            <Link
              to="/internet-tv"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Zobrazit nabídku tarifů
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
