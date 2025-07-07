
import type { BlogPost } from './types';

export const ostravaPost: BlogPost = {
  id: 500,
  title: 'Internet v Ostrave: Kde má PODA pokrytie v roku 2025',
  excerpt: 'Kompletný prehľad internetového pokrytia PODA v Ostrave. Ceny, dostupnosť, porovnanie s konkurenciou a ako si objednať.',
  content: `
    <div class="prose prose-lg max-w-none">
      <p>PODA je jedným z najvýznamnejších poskytovateľov internetu v Ostrave. Ponúka rýchle optické pripojenie v celom meste.</p>

      <h2>Pokrytie v Ostrave</h2>
      <p>PODA má pokrytie vo všetkých hlavných častiach Ostravy:</p>
      <ul>
        <li><strong>Moravská Ostrava</strong> - centrum mesta</li>
        <li><strong>Poruba</strong> - sídliskové oblasti</li>
        <li><strong>Vítkovice</strong> - priemyselná zóna</li>
        <li><strong>Ostrava-Juh</strong> - nové rozšírenie</li>
      </ul>

      <h2>Ceny a služby</h2>
      <ul>
        <li><strong>Optický internet 1000 Mbps:</strong> 250 Kč/mesiac</li>
        <li><strong>Internet + TV balíček:</strong> 390 Kč/mesiac</li>
        <li>Bez aktivačných poplatkov</li>
        <li>Bez záväzkov</li>
      </ul>

      <h2>Výhody PODA v Ostrave</h2>
      <ul>
        <li>Lokálna technická podpora</li>
        <li>Rýchla inštalácia do 48 hodín</li>
        <li>Stabilné pripojenie 99,9% uptime</li>
        <li>Bezplatné TV programy</li>
      </ul>

      <h2>Objednanie</h2>
      <p>Pre objednanie PODA internetu v Ostrave kontaktujte:</p>
      <ul>
        <li><a href="tel:+420730431313" class="text-poda-blue">730 431 313</a></li>
        <li><a href="/kontakt" class="text-poda-blue">Online formulár</a></li>
      </ul>
    </div>
  `,
  date: '3. 7. 2025',
  author: 'Milan Terč',
  category: 'Tipy a rady',
  image: '/lovable-uploads/ostrava-internet-poda-2025.jpg',
  alt: 'PODA internet v Ostrave - pokrytie mestských častí 2025',
  tags: ['Ostrava', 'PODA', 'internet', 'pokrytie', 'ceny', 'Poruba', 'Vítkovice', 'Moravská Ostrava']
};
