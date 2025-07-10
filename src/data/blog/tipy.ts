
import { BlogPost } from './types';

export const tipyPosts: BlogPost[] = [
  {
    id: 1,
    title: "Jak vybrat správný internetový tarif pro domácnost",
    excerpt: "Praktický průvodce výběrem optimálního internetového tarifu podle potřeb vaší domácnosti. Zjistěte, jaká rychlost internetu skutečně potřebujete.",
    content: `
      <div class="prose-content">
        <h2>Úvod</h2>
        <p>Výběr správného internetového tarifu může být složitý. V tomto článku vám poradíme, jak vybrat optimální rychlost a služby.</p>
        
        <h2>Kolik rychlosti skutečně potřebujete?</h2>
        <h3>Pro jednotlivce (1-2 osoby)</h3>
        <ul>
          <li>Základní surfování: 10-25 Mbps</li>
          <li>Streaming HD: 25-50 Mbps</li>
          <li>Práce z domova: 50-100 Mbps</li>
        </ul>
        
        <h3>Pro rodiny (3-5 osob)</h3>
        <ul>
          <li>Běžné použití: 100-200 Mbps</li>
          <li>Intenzivní streaming: 200-500 Mbps</li>
          <li>Gaming + streaming: 500+ Mbps</li>
        </ul>
        
        <h2>Další faktory k zvážení</h2>
        <ul>
          <li>Stabilita připojení</li>
          <li>Kvalita zákaznického servisu</li>
          <li>Cena a smluvní podmínky</li>
          <li>Možnost upgrade/downgrade</li>
        </ul>
        
        <h2>Doporučení pro PODA</h2>
        <p>Naše gigabitové připojení za 250 Kč/měsíc nabízí dostatek rychlosti pro všechny domácnosti bez kompromisů.</p>
      </div>
    `,
    date: "15. 5. 2024",
    author: "Pavel Novák",
    category: "Tipy",
    image: "/lovable-uploads/77099393-c42f-4da8-8d98-a7a65e08a093.png",
    alt: "Rodina používající internet doma",
    tags: ["Tarify", "Rychlost internetu", "Domácnost", "Výběr tarifu"]
  },
  {
    id: 2,
    title: "Optimalizace Wi-Fi sítě pro maximální výkon",
    excerpt: "Naučte se, jak správně nastavit a optimalizovat vaši Wi-Fi síť pro nejlepší možný výkon a pokrytí v celé domácnosti.",
    content: `
      <div class="prose-content">
        <h2>Úvod</h2>
        <p>Dobrá Wi-Fi síť je základem moderní domácnosti. Ukážeme vám, jak ji správně nastavit a optimalizovat.</p>
        
        <h2>Umístění routeru</h2>
        <h3>Ideální pozice</h3>
        <ul>
          <li>Centrální místo v domácnosti</li>
          <li>Výška 1-2 metry nad zemí</li>
          <li>Mimo kovové předměty</li>
          <li>Volný prostor kolem antén</li>
        </ul>
        
        <h2>Nastavení sítě</h2>
        <h3>Základní optimalizace</h3>
        <ul>
          <li>Použití správného kanálu (1, 6, 11 pro 2.4 GHz)</li>
          <li>Zapnutí dual-band (2.4 + 5 GHz)</li>
          <li>Silné heslo (WPA3 pokud dostupné)</li>
          <li>Pravidelné aktualizace firmware</li>
        </ul>
        
        <h2>Rozšíření pokrytí</h2>
        <p>Pro větší domy doporučujeme:</p>
        <ul>
          <li>Mesh systémy</li>
          <li>Wi-Fi repeatery</li>
          <li>Powerline adaptéry</li>
        </ul>
        
        <h2>PODA router</h2>
        <p>Naše profesionální routery jsou přednastavené pro optimální výkon a pokrytí.</p>
      </div>
    `,
    date: "10. 5. 2024",
    author: "Jana Svobodová",
    category: "Tipy",
    image: "/lovable-uploads/83abcdfd-2464-4e25-9286-3d0e01a157b7.png",
    alt: "Moderní pracovní prostředí s Wi-Fi routerem a připojenými zařízeními - laptop, tablet, smartphone",
    tags: ["Wi-Fi", "Router", "Optimalizace", "Síť"]
  },
  {
    id: 3,
    title: "Bezpečnost na internetu: Ochrana před kyberútoky",
    excerpt: "Kompletní průvodce bezpečností na internetu. Naučte se, jak se chránit před malwarem, phishingem a dalšími kyberútoky.",
    content: `
      <div class="prose-content">
        <h2>Úvod</h2>
        <p>Bezpečnost na internetu je v dnešní době klíčová. Zde jsou základní zásady pro ochranu vás i vaší rodiny.</p>
        
        <h2>Základní bezpečnostní pravidla</h2>
        <h3>Silná hesla</h3>
        <ul>
          <li>Minimálně 12 znaků</li>
          <li>Kombinace písmen, čísel a symbolů</li>
          <li>Unikátní heslo pro každý účet</li>
          <li>Použití správce hesel</li>
        </ul>
        
        <h3>Dvoufázové ověření</h3>
        <p>Zapněte 2FA všude, kde je to možné:</p>
        <ul>
          <li>Email účty</li>
          <li>Sociální sítě</li>
          <li>Bankovní aplikace</li>
          <li>Cloudové služby</li>
        </ul>
        
        <h2>Rozpoznání podvodů</h2>
        <h3>Phishing emaily</h3>
        <ul>
          <li>Podezřelé odesílatele</li>
          <li>Urgentní výzvy k akci</li>
          <li>Podezřelé odkazy</li>
          <li>Žádosti o osobní údaje</li>
        </ul>
        
        <h2>Bezpečnost dětí</h2>
        <p>Tipy pro rodiče:</p>
        <ul>
          <li>Rodičovské kontroly</li>
          <li>Vzdělávání o rizicích</li>
          <li>Monitoring aktivity</li>
          <li>Otevřená komunikace</li>
        </ul>
      </div>
    `,
    date: "5. 5. 2024",
    author: "Michal Dvořák",
    category: "Tipy",
    image: "/lovable-uploads/f86fd39a-dbf4-4b01-a94b-09904dbce094.png",
    alt: "Moderní domácnost s lidmi používajícími různá zařízení - laptopy, tablety, telefony - ilustrující potřebu kybernetické bezpečnosti",
    tags: ["Bezpečnost", "Kyberútoky", "Phishing", "Ochrana"]
  }
];
