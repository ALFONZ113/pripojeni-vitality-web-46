
import { BlogPost } from './types';

export const recenziePosts: BlogPost[] = [
  {
    id: 13,
    title: 'PODA recenzie 2025: Čo hovoria skutoční zákazníci?',
    excerpt: 'Prečítajte si najnovšie recenzie PODA od skutočných zákazníkov. Hodnotenia kvality, rýchlosti internetu a zákazníckej podpory.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Najlepším dôkazom kvality našich služieb sú spokojní zákazníci. Prečítajte si ich autentické recenzie.</p>

        <h2>Recenzie internetových služieb</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <blockquote class="text-lg italic mb-4">
            "Po rokoch problémov s pomalým internetom som konečne našla riešenie. PODA internet je neuveriteľne rýchly a stabilný."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Jana Svobodová, Havířov</strong>
          </footer>
        </div>

        <div class="bg-green-50 p-6 rounded-lg my-6">
          <blockquote class="text-lg italic mb-4">
            "Fantastická technická podpora! Keď som mal problém, technik prišiel do hodiny a všetko vyriešil."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Pavel Novák, Ostrava</strong>
          </footer>
        </div>

        <h2>Hodnotenie TV služieb</h2>
        
        <div class="bg-orange-50 p-6 rounded-lg my-6">
          <blockquote class="text-lg italic mb-4">
            "Kvalita obrazu je úžasná, máme veľký výber kanálov a cena je viac ako férová."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Martina Krejčová, Karviná</strong>
          </footer>
        </div>

        <h2>Štatistiky spokojnosti</h2>
        <div class="grid md:grid-cols-3 gap-6 my-6">
          <div class="text-center p-4 bg-blue-100 rounded-lg">
            <div class="text-3xl font-bold text-poda-blue">98%</div>
            <div class="text-sm text-gray-600">Spokojnosť zákazníkov</div>
          </div>
          <div class="text-center p-4 bg-green-100 rounded-lg">
            <div class="text-3xl font-bold text-green-600">4.8/5</div>
            <div class="text-sm text-gray-600">Priemerné hodnotenie</div>
          </div>
          <div class="text-center p-4 bg-orange-100 rounded-lg">
            <div class="text-3xl font-bold text-orange-600">95%</div>
            <div class="text-sm text-gray-600">Odporučilo by nás</div>
          </div>
        </div>

        <h2>Najčastejšie chválené vlastnosti</h2>
        <ul>
          <li>✅ Stabilita pripojenia - žiadne výpadky</li>
          <li>✅ Rýchlosť internetu - skutočné gigabitové rýchlosti</li>
          <li>✅ Kvalita TV signálu - krištáľovo čistý obraz</li>
          <li>✅ Zákaznícky servis - rýchla a ochotná podpora</li>
          <li>✅ Férové ceny - výborný pomer cena/výkon</li>
        </ul>
      </div>
    `,
    date: '25. 6. 2025',
    author: 'Milan Terč',
    category: 'Recenze',
    image: '/lovable-uploads/poda-recenzie-2025.jpg',
    alt: 'PODA recenzie od zákazníkov 2025',
    tags: ['PODA', 'recenzie', 'hodnotenia', 'zákazníci', 'skúsenosti', 'kvalita']
  }
];
