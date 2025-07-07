
import type { BlogPost } from './types';

export const slowInternetFixPost: BlogPost = {
  id: 30,
  title: 'Pomalý internet? 7 spôsobov ako ho zrýchliť',
  excerpt: 'Praktické tipy na zrýchlenie pomalého internetového pripojenia. Diagnostika problémov, optimalizácia routera a kedy zmeniť poskytovateľa.',
  content: `
    <div class="prose prose-lg max-w-none">
      <p>Pomalý internet dokáže pokaziť deň. Tu sú najúčinnejšie spôsoby, ako problém vyriešiť.</p>

      <h2>1. Testovanie rýchlosti</h2>
      <p>Najprv zistite skutočnú rýchlosť vašeho pripojenia pomocí online testov ako Speedtest.net.</p>

      <h2>2. Reštart routera</h2>
      <p>Vypnite router na 30 sekúnd a znovu ho zapnite. Tento jednoduchý krok vyrieši 80% problémov.</p>

      <h2>3. Kontrola káblov</h2>
      <p>Skontrolujte všetky káble - poškodené alebo staré káble môžu výrazne spomaľovať pripojenie.</p>

      <h2>4. Pozícia routera</h2>
      <p>Router umiestnite do centra bytu, vo výške a bez prekážok. Vyhýbajte sa mikrovlnkám a kovým predmetom.</p>

      <h2>5. Aktualizácia firmvéru</h2>
      <p>Pravidelne aktualizujte firmvér routera pre lepší výkon a bezpečnosť.</p>

      <h2>6. Zmena Wi-Fi kanála</h2>
      <p>V husto osídlených oblastiach skúste zmeniť Wi-Fi kanál na menej preplnený.</p>

      <h2>7. Zmena poskytovateľa</h2>
      <p>Ak nič nepomáha, možno je čas zmeniť poskytovateľa. PODA ponúka stabilný internet až 1000 Mbps.</p>

      <h2>Kedy kontaktovať PODA</h2>
      <p>Ak máte v Ostrave, Karvinej alebo Havířove problémy s internetom:</p>
      <ul>
        <li>Telefón: <a href="tel:+420730431313" class="text-poda-blue">730 431 313</a></li>
        <li><a href="/kontakt" class="text-poda-blue">Kontaktný formulár</a></li>
      </ul>
    </div>
  `,
  date: '1. 7. 2025',
  author: 'Milan Terč',
  category: 'Tipy a rady',
  image: '/lovable-uploads/slow-internet-fix-guide.jpg',
  alt: 'Sprievodca riešením pomalého internetu',
  tags: ['pomalý internet', 'riešenie problémov', 'router', 'Wi-Fi', 'diagnostika', 'optimalizácia']
};
