import { BlogPost } from './types';

// Príklad nového článku s slug
export const gamingOstravaExamplePost: BlogPost = {
  id: 101,
  title: "Gaming Internet Ostrava 2025 - Najrýchlejšie pripojenie pre hráčov",
  slug: "gaming-internet-ostrava-2025", // Nový slug parameter
  excerpt: "Objavte najrýchlejšie internetové pripojenie pre gaming v Ostrave. Nízka latencia, vysoká rýchlosť a stabilita pre profesionálnych hráčov.",
  content: `
    <h2>Gaming Internet v Ostrave - Všetko čo potrebujete vedieť</h2>
    
    <p>Pre hráčov v Ostrave je dôležité mať kvalitné internetové pripojenie s nízkou latenciou a vysokou rýchlosťou. V tomto článku sa dozviete, ako vybrať najlepší gaming internet.</p>
    
    <h3>Kľúčové faktory pre gaming internet</h3>
    <ul>
      <li><strong>Nízka latencia (ping):</strong> Pod 20ms pre optimálny gaming zážitok</li>
      <li><strong>Vysoká rýchlosť:</strong> Minimálne 100 Mbps pre 4K streaming a gaming</li>
      <li><strong>Stabilita:</strong> Konzistentné pripojenie bez výpadkov</li>
      <li><strong>Upload rýchlosť:</strong> Dôležitá pre live streaming</li>
    </ul>
    
    <h3>PODA Gaming internet v Ostrave</h3>
    <p>Naša optická sieť poskytuje ideálne podmienky pre gaming:</p>
    <ul>
      <li>Latencia pod 5ms v rámci Ostravy</li>
      <li>Rýchlosť až 1 Gbps</li>
      <li>99.9% dostupnosť služby</li>
      <li>Dedikované QoS pre gaming premávku</li>
    </ul>
    
    <h3>Kontakt</h3>
    <p>Pre viac informácií o gaming internete v Ostrave nás kontaktujte na <strong>730 431 313</strong>.</p>
  `,
  date: "2025-01-25",
  author: "Milan Terče",
  category: "Gaming",
  image: "/lovable-uploads/gaming-ostrava-2025.jpg",
  alt: "Gaming setup v Ostrave s rýchlym internetom",
  tags: ["gaming", "ostrava", "internet", "optika", "nízka latencia"]
};