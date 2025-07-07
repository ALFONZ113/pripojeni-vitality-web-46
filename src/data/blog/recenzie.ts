import { BlogPost } from './types';

export const recenziePosts: BlogPost[] = [
  {
    id: 13,
    title: 'PODA recenzie 2025: Čo hovoria skutoční zákazníci?',
    excerpt: 'Prečítajte si najnovšie recenzie PODA od skutočných zákazníkov. Hodnotenia kvality, rýchlosti internetu a zákazníckej podpory.',
    content: `
      <div class="prose-content">
        <h2>Úvod: Hlas našich zákazníků v létě 2025</h2>
        <p>Nejlepším důkazem kvality našich služeb jsou spokojení zákazníci. Přečtěte si jejich autentické recenze a zkušenosti s PODA internetem a televizí během horkého léta 2025.</p>

        <h2>Recenze internetových služeb</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Po letech problémů s pomalým internetem jsem konečně našla řešení. PODA internet je neuvěřitelně rychlý a stabilní. Videokonference fungují bez problémů."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Jana Svobodová, Havířov</strong><br>
            <em>Zákaznice od: Březen 2023</em>
          </footer>
        </div>

        <div class="bg-green-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Fantastická technická podpora! Když jsem měl problém s nastavením, technik přišel do hodiny a všechno vyřešil. Takovou službu jsem ještě nezažil."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Pavel Novák, Ostrava</strong><br>
            <em>Zákazník od: Leden 2024</em>
          </footer>
        </div>

        <h2>Hodnocení TV služeb</h2>
        
        <div class="bg-orange-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Kvalita obrazu je úžasná, máme velký výběr kanálů a cena je více než férová. Děti si užívají dětské kanály a já sportovní přenosy v HD kvalitě."
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Martina Krejčová, Karviná</strong><br>
            <em>Zákaznice od: Červen 2023</em>
          </footer>
        </div>

        <h2>Kombinované balíčky</h2>
        
        <div class="bg-purple-50 p-6 rounded-lg my-8">
          <blockquote class="text-lg italic mb-4">
            "Rozhodl jsem se pro kombinovaný balíček internet + TV a je to nejlepší rozhodnutí. Ušetřím peníze a mám všechno od jednoho poskytovatele. Bez problémů!"
          </blockquote>
          <footer class="text-sm text-gray-600">
            <strong>⭐⭐⭐⭐⭐ Michal Dvořák, Bohumín</strong><br>
            <em>Zákazník od: Září 2023</em>
          </footer>
        </div>

        <h2>Statistiky spokojenosti</h2>
        <div class="grid md:grid-cols-3 gap-6 my-8">
          <div class="text-center p-4 bg-blue-100 rounded-lg">
            <div class="text-3xl font-bold text-poda-blue">98%</div>
            <div class="text-sm text-gray-600">Spokojenost zákazníků</div>
          </div>
          <div class="text-center p-4 bg-green-100 rounded-lg">
            <div class="text-3xl font-bold text-green-600">4.8/5</div>
            <div class="text-sm text-gray-600">Průměrné hodnocení</div>
          </div>
          <div class="text-center p-4 bg-orange-100 rounded-lg">
            <div class="text-3xl font-bold text-orange-600">95%</div>
            <div class="text-sm text-gray-600">Doporučilo by nás</div>
          </div>
        </div>

        <h2>Nejčastěji chválené vlastnosti</h2>
        <ul class="space-y-2">
          <li>✅ <strong>Stabilita připojení</strong> - žádné výpadky</li>
          <li>✅ <strong>Rychlost internetu</strong> - skutečné gigabitové rychlosti</li>
          <li>✅ <strong>Kvalita TV signálu</strong> - křišťálově čistý obraz</li>
          <li>✅ <strong>Zákaznický servis</strong> - rychlá a ochotná podpora</li>
          <li>✅ <strong>Férové ceny</strong> - výborný poměr cena/výkon</li>
          <li>✅ <strong>Jednoduchá instalace</strong> - profesionální technici</li>
        </ul>

        <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
          <h3 class="text-white mb-4">Chcete se připojit ke spokojeným zákazníkům v létě 2025?</h3>
          <p class="mb-4">Objednejte si PODA internet a TV už dnes a přesvědčte se o kvalitě našich služeb na vlastní kůži během horúceho léta 2025.</p>
          <p class="text-sm">Všechny recenze jsou autentické a ověřené. Respektujeme soukromí našich zákazníků.</p>
        </div>

        <p class="text-center mt-8 font-medium">Děkujeme všem našim zákazníkům za důvěru a pozitivní hodnocení v roce 2025!</p>
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
