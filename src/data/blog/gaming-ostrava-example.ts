import { BlogPost } from './types';

// Příklad nového článku s slug
export const gamingOstravaExamplePost: BlogPost = {
  id: 101,
  title: "Gaming Internet Ostrava 2025 - Nejrychlejší připojení pro hráče",
  slug: "gaming-internet-ostrava-2025", // Nový slug parametr
  excerpt: "Objevte nejrychlejší internetové připojení pro gaming v Ostravě. Nízká latence, vysoká rychlost a stabilita pro profesionální hráče.",
  content: `
    <h2>Gaming Internet v Ostravě - Všechno co potřebujete vědět</h2>
    
    <p>Pro hráče v Ostravě je důležité mít kvalitní internetové připojení s nízkou latencí a vysokou rychlostí. V tomto článku se dozvíte, jak vybrat nejlepší gaming internet.</p>
    
    <h3>Klíčové faktory pro gaming internet</h3>
    <ul>
      <li><strong>Nízká latence (ping):</strong> Pod 20ms pro optimální gaming zážitek</li>
      <li><strong>Vysoká rychlost:</strong> Minimálně 100 Mbps pro 4K streaming a gaming</li>
      <li><strong>Stabilita:</strong> Konzistentní připojení bez výpadků</li>
      <li><strong>Upload rychlost:</strong> Důležitá pro live streaming</li>
    </ul>
    
    <h3>PODA Gaming internet v Ostravě</h3>
    <p>Naše optická síť poskytuje ideální podmínky pro gaming:</p>
    <ul>
      <li>Latence pod 5ms v rámci Ostravy</li>
      <li>Rychlost až 1 Gbps</li>
      <li>99.9% dostupnost služby</li>
      <li>Dedikované QoS pro gaming provoz</li>
    </ul>
    
    <h3>Kontakt</h3>
    <p>Pro více informací o gaming internetu v Ostravě nás kontaktujte na <strong>730 431 313</strong>.</p>
  `,
  date: "2025-01-25",
  author: "Odborník na internet",
  category: "Gaming",
  image: "/lovable-uploads/gaming-ostrava-2025.jpg",
  alt: "Gaming setup v Ostravě s rychlým internetem",
  tags: ["gaming", "ostrava", "internet", "optika", "nízká latence"]
};