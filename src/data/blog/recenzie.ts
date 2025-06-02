
import { BlogPost } from './types';

export const recenziePosts: BlogPost[] = [
  {
    id: 13,
    title: "Recenzie zákazníkov PODA: Skutočné skúsenosti s našimi službami",
    excerpt: "Prečítajte si autentické recenzie a hodnotenia od našich spokojných zákazníkov z celého Moravskoslezského kraja.",
    content: `
      <div class="prose-content">
        <h2>Úvod: Hlas našich zákazníkov</h2>
        <p>Najlepším dôkazom kvality našich služieb sú spokojní zákazníci. Prečítajte si ich autentické recenzie a skúsenosti s PODA internetom a televíziou.</p>

        <h2>Recenzie internetových služieb</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Po rokoch problémov s pomalým internetom som konečne našla riešenie. PODA internet je neuveriteľne rýchly a stabilný. Videokonferencie fungujú bez problémov."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Jana Svobodová, Havířov</strong><br>
            <em>Zákazníčka od: Marec 2023</em>
          </footer>
        </div>

        <div class="bg-green-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Fantastická technická podpora! Keď som mal problém s nastavením, technik prišiel do hodiny a všetko vyriešil. Takúto službu som ešte nezažil."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Pavel Novák, Ostrava</strong><br>
            <em>Zákazník od: Január 2024</em>
          </footer>
        </div>

        <h2>Hodnotenia TV služieb</h2>
        
        <div class="bg-orange-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Kvalita obrazu je úžasná, máme veľký výber kanálov a cena je viac ako férová. Deti si užívajú detské kanály a ja športové prenosy v HD kvalite."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Martina Krejčová, Karviná</strong><br>
            <em>Zákazníčka od: Jún 2023</em>
          </footer>
        </div>

        <h2>Kombinované balíčky</h2>
        
        <div class="bg-purple-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Rozhodol som sa pre kombinovaný balíček internet + TV a je to najlepšie rozhodnutie. Ušetrím peniaze a mám všetko od jedného poskytovateľa. Bez problémov!"
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Michal Dvořák, Bohumín</strong><br>
            <em>Zákazník od: September 2023</em>
          </footer>
        </div>

        <h2>Štatistiky spokojnosti</h2>
        <div class="grid md:grid-cols-3 gap-6 my-8">
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
        <ul class="space-y-2">
          <li>✅ <strong>Stabilnosť pripojenia</strong> - žiadne výpadky</li>
          <li>✅ <strong>Rýchlosť internetu</strong> - skutočné gigabitové rýchlosti</li>
          <li>✅ <strong>Kvalita TV signálu</strong> - krištáľovo čistý obraz</li>
          <li>✅ <strong>Zákaznícky servis</strong> - rýchla a ochotná podpora</li>
          <li>✅ <strong>Férové ceny</strong> - výborný pomer cena/výkon</li>
          <li>✅ <strong>Jednoduchá inštalácia</strong> - profesionálni technici</li>
        </ul>

        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Chcete sa pridať k spokojeným zákazníkom?</h3>
          <p class="mb-4">Objednajte si PODA internet a TV už dnes a presvedčte sa o kvalite našich služieb na vlastnej koži.</p>
          <p class="text-sm">Všetky recenzie sú autentické a overené. Rešpektujeme súkromie našich zákazníkov.</p>
        </div>

        <p class="text-center mt-8 font-medium">Ďakujeme všetkým našim zákazníkom za dôveru a pozitívne hodnotenia!</p>
      </div>
    `,
    date: "22. 5. 2025",
    author: "Lucie Horáková",
    category: "Recenzie",
    image: "/lovable-uploads/8a151fa2-b198-402b-9ead-89329b8b9ab2.png",
    alt: "Spokojní zákazníci PODA s pozitívnymi recenziami",
    tags: ["Recenzie", "Zákazníci", "Spokojnosť", "Hodnotenia", "Skúsenosti", "Kvalita služieb"]
  }
];
