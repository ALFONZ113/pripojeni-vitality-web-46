import type { BlogPost } from './types';

export const novinyPosts: BlogPost[] = [
  {
    id: 11,
    title: 'PODA rozšírila pokrytie v Moravskoslezskom kraji',
    excerpt: 'Najnovšie správy o rozšírení pokrytia PODA v regióne. Nové mestské časti, vylepšenia siete a plány na rok 2025.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 mb-8">
          PODA pokračuje v rozširovaní svojho pokrytia v Moravskoslezskom kraji, čím prináša rýchly a spoľahlivý internet do ďalších domácností a firiem.
        </p>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Nové lokality s pokrytím PODA</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="text-xl font-semibold text-poda-blue mb-4">Ostrava - Juh</h3>
            <p class="text-gray-700">
              V mestskej časti Ostrava-Juh sme sprístupnili optické pripojenie pre viac ako 500 domácností. Zákazníci si môžu vychutnať rýchlosti až 1000 Mbps.
            </p>
          </div>

          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="text-xl font-semibold text-poda-blue mb-4">Havířov - Podlesí</h3>
            <p class="text-gray-700">
              V Havířove-Podlesí sme dokončili rozsiahlu modernizáciu siete, ktorá umožňuje pripojenie s rýchlosťou až 500 Mbps pre všetkých obyvateľov.
            </p>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Vylepšenia siete a nové technológie</h2>

        <div class="mb-8">
          <p class="text-gray-700">
            Okrem rozširovania pokrytia sme investovali aj do vylepšenia existujúcej siete. Nové technológie umožňujú stabilnejšie a rýchlejšie pripojenie pre našich zákazníkov.
          </p>
          <ul class="list-disc list-inside text-gray-700 mt-4">
            <li>Zavedenie technológie GPON pre optické siete</li>
            <li>Optimalizácia bezdrôtového pripojenia v pásme 5 GHz</li>
            <li>Nové záložné zdroje pre zabezpečenie nepretržitej prevádzky</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Plány na rok 2025</h2>

        <div class="mb-8">
          <p class="text-gray-700">
            Pre rok 2025 máme ambiciózne plány na ďalšie rozširovanie a vylepšovanie našich služieb. Chceme priniesť rýchly internet do každej domácnosti v Moravskoslezskom kraji.
          </p>
          <ul class="list-disc list-inside text-gray-700 mt-4">
            <li>Pokrytie ďalších mestských častí v Ostrave, Karviné a Havířove</li>
            <li>Zavedenie nových tarifných balíčkov s vyššími rýchlosťami</li>
            <li>Investície do zákazníckej podpory a zlepšenie služieb</li>
          </ul>
        </div>

        <div class="bg-green-50 p-6 rounded-xl border border-green-200 mb-8">
          <h3 class="text-xl font-semibold text-green-800 mb-3">Prečo si vybrať PODA?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
            <div>✅ Rýchly a spoľahlivý internet</div>
            <div>✅ Široké pokrytie v Moravskoslezskom kraji</div>
            <div>✅ Moderné technológie a stabilná sieť</div>
            <div>✅ Kvalitná zákaznícka podpora</div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold text-poda-blue mb-4 text-center">Overte si dostupnosť PODA internetu vo vašej lokalite</h2>
          <p class="text-gray-700 text-center mb-6">
            Zistite, či je PODA internet dostupný aj u vás. Vyplňte formulár a my vám do 24 hodín pošleme informácie o dostupnosti a cenách.
          </p>
          <div class="flex justify-center">
            <a href="/kontakt" class="bg-poda-blue text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Overiť dostupnosť
            </a>
          </div>
        </div>
      </div>
    `,
    date: '22. 6. 2025',
    author: 'Milan Terč',
    category: 'Novinky',
    image: '/lovable-uploads/poda-rozsirenie-pokrytie.jpg',
    alt: 'PODA rozšírenie pokrytia Moravskoslezský kraj 2025',
    tags: ['PODA', 'rozšírenie', 'pokrytie', 'Moravskoslezský kraj', 'novinky', '2025']
  },
  {
    id: 12,
    title: 'Nové tarify PODA pre rok 2025: Čo sa zmenilo?',
    excerpt: 'Prehľad všetkých zmien v tarifách PODA pre rok 2025. Nové ceny, balíčky a výhody pre existujúcich zákazníkov.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 mb-8">
          PODA prichádza s novými tarifami pre rok 2025, ktoré prinášajú ešte viac výhod pre existujúcich aj nových zákazníkov. Pozrite sa, čo sa zmenilo a ako môžete ušetriť.
        </p>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Prehľad nových taríf</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="text-xl font-semibold text-poda-blue mb-4">Tarifa ZÁKLAD</h3>
            <p class="text-gray-700">
              Ideálna pre nenáročných používateľov, ktorí potrebujú spoľahlivé pripojenie na bežné prehliadanie internetu a e-maily.
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li>Rýchlosť: 50 Mbps</li>
              <li>Cena: 299 Kč mesačne</li>
              <li>Bez viazanosti</li>
            </ul>
          </div>

          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="text-xl font-semibold text-poda-blue mb-4">Tarifa ŠTANDARD</h3>
            <p class="text-gray-700">
              Vhodná pre rodiny a používateľov, ktorí radi sledujú videá, hrajú online hry a potrebujú rýchlejšie pripojenie.
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li>Rýchlosť: 200 Mbps</li>
              <li>Cena: 499 Kč mesačne</li>
              <li>Bez viazanosti</li>
            </ul>
          </div>

          <div class="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 class="text-xl font-semibold text-poda-blue mb-4">Tarifa PREMIUM</h3>
            <p class="text-gray-700">
              Pre náročných používateľov, ktorí potrebujú maximálnu rýchlosť pre streamovanie, sťahovanie a prácu z domu.
            </p>
            <ul class="list-disc list-inside text-gray-700 mt-4">
              <li>Rýchlosť: 1000 Mbps</li>
              <li>Cena: 799 Kč mesačne</li>
              <li>Bez viazanosti</li>
            </ul>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Zmeny pre existujúcich zákazníkov</h2>

        <div class="mb-8">
          <p class="text-gray-700">
            Ak ste už zákazníkom PODA, môžete si jednoducho zmeniť svoju tarifu na novú. Kontaktujte našu zákaznícku podporu a my vám radi pomôžeme s výberom.
          </p>
          <ul class="list-disc list-inside text-gray-700 mt-4">
            <li>Možnosť prechodu na vyššiu alebo nižšiu tarifu</li>
            <li>Zachovanie všetkých výhod a zliav</li>
            <li>Jednoduchá zmena cez zákaznícku linku</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-poda-blue mb-4">Výhody nových taríf</h2>

        <div class="mb-8">
          <p class="text-gray-700">
            Nové tarify PODA prinášajú množstvo výhod pre všetkých zákazníkov.
          </p>
          <ul class="list-disc list-inside text-gray-700 mt-4">
            <li>Vyššie rýchlosti za rovnakú alebo nižšiu cenu</li>
            <li>Bez viazanosti a skrytých poplatkov</li>
            <li>Kvalitná zákaznícka podpora</li>
          </ul>
        </div>

        <div class="bg-green-50 p-6 rounded-xl border border-green-200 mb-8">
          <h3 class="text-xl font-semibold text-green-800 mb-3">Prečo si vybrať nové tarify PODA?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
            <div>✅ Vyššie rýchlosti</div>
            <div>✅ Bez viazanosti</div>
            <div>✅ Atraktívne ceny</div>
            <div>✅ Kvalitná podpora</div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold text-poda-blue mb-4 text-center">Získajte nový internet PODA ešte dnes</h2>
          <p class="text-gray-700 text-center mb-6">
            Vyberte si novú tarifu PODA a užívajte si rýchly a spoľahlivý internet. Kontaktujte nás a my vám radi pomôžeme s výberom.
          </p>
          <div class="flex justify-center">
            <a href="/kontakt" class="bg-poda-blue text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Objednať internet
            </a>
          </div>
        </div>
      </div>
    `,
    date: '20. 6. 2025',
    author: 'Milan Terč',
    category: 'Novinky',
    image: '/lovable-uploads/poda-tarify-2025.jpg',
    alt: 'Nové tarify PODA 2025 - prehľad zmien',
    tags: ['PODA', 'tarify', 'ceny', '2025', 'zmeny', 'balíčky']
  }
];
