import type { BlogPost } from './types';

export const sluzbaPosts: BlogPost[] = [
  {
    id: 15,
    title: "Ako prejsť od konkurencie k PODA - Kompletný sprievodca prevodom",
    excerpt: "Podrobný návod ako bezproblémovo prejsť od vašeho súčasného poskytovateľa internetu k optickému pripojeniu PODA bez prerušenia služieb.",
    content: `
      <h2>Jednoducho prenos od konkurencie k PODA</h2>
      
      <p>Premýšľate o zmene internetového poskytovateľa? PODA vám ponúka optický internet s garantovanými rýchlosťami a bezplatnou inštaláciou. Náš proces prechodu je navrhnutý tak, aby bol čo najjednoduchší a bez prerušenia vašich služieb.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Proces prechodu v 5 krokoch</h3>
        <ol class="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Konzultácia s naším špeciaistom Milanom:</strong> Zavolajte na 596 112 112 alebo navštívte popri.cz pre bezplatnú konzultáciu</li>
          <li><strong>Výber tarifu a podpis zmluvy:</strong> Podpíšeme zmluvu hneď podľa vašich potrieb</li>
          <li><strong>Inštalácia PODA služieb:</strong> Profesionálna inštalácia optického pripojenia do 5 dní</li>
          <li><strong>Testovanie a školenie:</strong> Overíme funkčnosť a naučíme vás používať nové služby</li>
          <li><strong>Výpoveď starého poskytovateľa:</strong> Podáme výpoveď vášmu súčasnému poskytovateľovi až po úspešnej inštalácii</li>
        </ol>
      </div>

      <h3>Prečo si vybrať PODA namiesto konkurencie?</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-lg font-semibold text-red-600 mb-3">Problémy s konkurenciou</h4>
          <ul class="text-gray-600 space-y-2">
            <li>• Pomalé rýchlosti v špičke</li>
            <li>• Časté výpadky pripojenia</li>
            <li>• Slabá technická podpora</li>
            <li>• Skryté poplatky a prirážky</li>
            <li>• Zastarané technológie</li>
            <li>• Dlhé čakacie doby na opravu</li>
          </ul>
        </div>
        
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-lg font-semibold text-green-600 mb-3">Výhody PODA</h4>
          <ul class="text-gray-600 space-y-2">
            <li>• Garantované rýchlosti 24/7</li>
            <li>• 99,9% dostupnosť služieb</li>
            <li>• Osobná technická podpora</li>
            <li>• Transparentné ceny</li>
            <li>• Najmodernejšie optické technológie</li>
            <li>• Rýchla reakcia na problémy</li>
          </ul>
        </div>
      </div>

      <blockquote class="border-l-4 border-poda-blue bg-blue-50 p-6 my-8 rounded-r-lg">
        "Prechod od O2 k PODA prebehol úplne hladko. Milan mi všetko vysvetlil, inštalácia trvala len 2 hodiny a internet je konečne stabilný. Neľutujem!" - Ing. Tomáš K., Ostrava-Poruba
      </blockquote>

      <h3>Porovnanie s hlavnými poskytovateľmi</h3>
      
      <div class="overflow-x-auto my-8">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-3 text-left">Poskytovateľ</th>
              <th class="border border-gray-300 p-3 text-center">Rýchlosť</th>
              <th class="border border-gray-300 p-3 text-center">Cena</th>
              <th class="border border-gray-300 p-3 text-center">Inštalácia</th>
              <th class="border border-gray-300 p-3 text-center">Podpora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-3 font-semibold text-poda-blue">PODA</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">✓ Garantovaná</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">od 390 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">Zdarma</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">24/7 lokálna</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3">O2</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Kolísavá</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">od 599 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">990 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Call centrum</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-3">T-Mobile</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Obmedzovaná</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">od 649 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">1 490 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Automatická</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3">UPC</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Nestabilná</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">od 549 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">690 Kč</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Telefónna</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Prípadová štúdia: Prechod rodinného domu</h3>
      
      <p>Rodina Svobodových z Karvinej sa rozhodla prejsť od UPC k PODA. Ako prebiehal ich prechod:</p>
      
      <div class="timeline space-y-4 my-6">
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">Pondelok: Konzultácia</h5>
          <p class="text-gray-600">Telefonická konzultácia s Milanom, výber tarifu 500/500 Mbps</p>
        </div>
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">Pondelok: Podpis zmluvy</h5>
          <p class="text-gray-600">Podpis zmluvy hneď po konzultácii</p>
        </div>
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">Štvrtok: Inštalácia</h5>
          <p class="text-gray-600">Profesionálna inštalácia optického modemu a WiFi, trvala 3 hodiny</p>
        </div>
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">Štvrtok: Výpoveď UPC</h5>
          <p class="text-gray-600">Po úspešnom testovaní sme podali výpoveď UPC</p>
        </div>
        <div class="border-l-2 border-green-500 pl-6">
          <h5 class="font-semibold text-green-600">Výsledok</h5>
          <p class="text-gray-600">Úspora 200 Kč mesačne + stabilný internet bez výpadkov</p>
        </div>
      </div>

      <div class="bg-yellow-50 p-6 rounded-lg my-6 border border-yellow-200">
        <h4 class="text-lg font-semibold text-yellow-800 mb-3">Špeciálna akcia pre prevod</h4>
        <p class="text-yellow-700 mb-3">Pri prechode od konkurencie k PODA získate:</p>
        <ul class="text-yellow-700 space-y-1 mb-4">
          <li>• Bezplatnú inštaláciu (hodnota 1 500 Kč)</li>
          <li>• Prvé 2 mesiace za polovičnú cenu</li>
          <li>• Moderný WiFi router zadarmo</li>
          <li>• Pomoc s výpoveďou starého poskytovateľa</li>
        </ul>
        <a href="tel:596112112" class="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors">Zavolať Milanovi 596 112 112</a>
      </div>

      <h3>Najčastejšie otázky o prechode</h3>
      
      <div class="space-y-4 my-8">
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Bude prerušenie internetového pripojenia?</h5>
          <p class="text-gray-600">Nie, najprv nainštalujeme PODA pripojenie a až po otestovaní podáme výpoveď starému poskytovateľovi.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Ako dlho trvá celý proces?</h5>
          <p class="text-gray-600">Inštalácia PODA služieb trvá do 5 dní od podpisu zmluvy. Výpoveď konkurencie rieši výpovedná lehota (zvyčajne 1 mesiac).</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Pomôžete s výpoveďou súčasného poskytovateľa?</h5>
          <p class="text-gray-600">Áno, náš špecialista Milan vám pomôže s celým procesom výpovede vrátane potrebných formulárov.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Čo ak nebudem spokojný s PODA?</h5>
          <p class="text-gray-600">Ponúkame 30-dňovú záruku spokojnosti. Ak nebudete spokojní, vrátime vám peniaze a pomôžeme s návratom k pôvodnému poskytovateľovi.</p>
        </div>
      </div>

      <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-3">Pripravení na prechod?</h4>
        <p class="mb-4">Kontaktujte nášho špecialistu Milana ešte dnes a začnite využívať výhody moderného optického internetu PODA.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="https://popri.cz" class="inline-block bg-white text-poda-blue px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors text-center">Objednať na popri.cz</a>
          <a href="tel:596112112" class="inline-block bg-poda-orange text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors text-center">Zavolať Milanovi 596 112 112</a>
        </div>
      </div>
    `,
    author: "Milan Novák",
    date: "2024-03-05", 
    readTime: 10,
    category: "Služby",
    tags: ["prechod", "konkurencia", "optický internet", "zmena poskytovateľa", "PODA"],
    featured: true,
    imageUrl: "/lovable-uploads/provider-switch.jpg"
  },
  {
    id: 16,
    title: "Výhody optického internetu pre domácnosti a firmy",
    excerpt: "Zistite, prečo je optický internet od PODA ideálnym riešením pre moderné domácnosti a náročné firemné prostredie.",
    content: `
      <h2>Prečo si vybrať optický internet od PODA</h2>
      
      <p>Optický internet od PODA prináša revolúciu v pripojení pre domácnosti aj firmy. S našou modernou infraštruktúrou získate nielen rýchle, ale aj spoľahlivé a bezpečné pripojenie, ktoré spĺňa najvyššie štandardy.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Výhody pre domácnosti</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Ultra-rýchle pripojenie:</strong> Sťahovanie filmov, hranie online hier a streamovanie v 4K bez problémov</li>
          <li><strong>Stabilita a spoľahlivosť:</strong> Žiadne výpadky počas videohovorov alebo online vyučovania</li>
          <li><strong>Neobmedzené dáta:</strong> Sťahujte a streamujte bez obmedzení</li>
          <li><strong>Bezpečnosť:</strong> Ochrana pred vírusmi a kybernetickými útokmi</li>
        </ul>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Výhody pre firmy</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Vysoká produktivita:</strong> Rýchle sťahovanie a odosielanie veľkých súborov</li>
          <li><strong>Spoľahlivé cloudové služby:</strong> Bezproblémový prístup k firemným aplikáciám a dátam</li>
          <li><strong>Bezpečnosť dát:</strong> Ochrana pred kybernetickými hrozbami a únikmi dát</li>
          <li><strong>Podpora pre videokonferencie:</strong> Kvalitné videohovory bez prerušenia</li>
        </ul>
      </div>

      <h3>Porovnanie s inými technológiami</h3>
      
      <div class="overflow-x-auto my-8">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-3 text-left">Technológia</th>
              <th class="border border-gray-300 p-3 text-center">Rýchlosť</th>
              <th class="border border-gray-300 p-3 text-center">Stabilita</th>
              <th class="border border-gray-300 p-3 text-center">Cena</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-3 font-semibold text-poda-blue">Optický internet</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">Až 1 Gbps</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">Vysoká</td>
              <td class="border border-gray-300 p-3 text-center text-green-600">Priaznivá</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3">DSL</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Až 100 Mbps</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Nízka</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Vyššia</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-3">Kábel</td>
              <td class="border border-gray-300 p-3 text-center text-orange-600">Až 500 Mbps</td>
              <td class="border border-gray-300 p-3 text-center text-orange-600">Stredná</td>
              <td class="border border-gray-300 p-3 text-center text-orange-600">Stredná</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 p-3">Mobilný internet</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Až 150 Mbps</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Veľmi nízka</td>
              <td class="border border-gray-300 p-3 text-center text-red-600">Vysoká</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Ako funguje optický internet</h3>
      
      <p>Optický internet využíva tenké sklenené vlákna na prenos dát pomocou svetla. Táto technológia umožňuje prenášať obrovské množstvo dát na veľké vzdialenosti bez straty kvality. Vďaka tomu je optický internet oveľa rýchlejší a spoľahlivejší ako tradičné technológie.</p>

      <div class="bg-gray-50 p-6 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">Technické detaily</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 class="font-medium text-gray-700 mb-2">Prenos dát</h5>
            <ul class="text-gray-600 space-y-1">
              <li>• Svetelné signály</li>
              <li>• Rýchlosť svetla</li>
              <li>• Nízka latencia</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium text-gray-700 mb-2">Infraštruktúra</h5>
            <ul class="text-gray-600 space-y-1">
              <li>• Optické káble</li>
              <li>• GPON technológia</li>
              <li>• Vysoká kapacita</li>
            </ul>
          </div>
        </div>
      </div>

      <h3>Prípadové štúdie</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h4 class="text-lg font-semibold text-poda-blue mb-3">Domácnosť Novákovcov</h4>
          <p class="text-gray-700">Rodina Novákovcov prešla na optický internet od PODA a teraz si užívajú rýchle a spoľahlivé pripojenie pre prácu, zábavu a vzdelávanie.</p>
        </div>
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h4 class="text-lg font-semibold text-poda-blue mb-3">Firma ABC s.r.o.</h4>
          <p class="text-gray-700">Firma ABC s.r.o. vďaka optickému internetu od PODA zvýšila svoju produktivitu a zlepšila komunikáciu so zákazníkmi a partnermi.</p>
        </div>
      </div>

      <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-3">Získajte optický internet od PODA</h4>
        <p class="mb-4">Kontaktujte nás a zistite, ako môže optický internet od PODA zlepšiť vaše pripojenie a zvýšiť vašu produktivitu.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="https://popri.cz" class="inline-block bg-white text-poda-blue px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors text-center">Objednať na popri.cz</a>
          <a href="tel:596112112" class="inline-block bg-poda-orange text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors text-center">Zavolať 596 112 112</a>
        </div>
      </div>
    `,
    author: "Ján Procházka",
    date: "2024-02-28",
    readTime: 7,
    category: "Služby",
    tags: ["optický internet", "výhody", "domácnosti", "firmy", "PODA"],
    featured: false,
    imageUrl: "/lovable-uploads/optical-internet.jpg"
  },
  {
    id: 17,
    title: "Ako si vybrať správny internetový tarif pre vašu domácnosť",
    excerpt: "Praktické rady a tipy, ako si vybrať ideálny internetový tarif, ktorý bude vyhovovať vašim potrebám a rozpočtu.",
    content: `
      <h2>Ako si vybrať správny internetový tarif</h2>
      
      <p>Výber správneho internetového tarifu môže byť náročný, ale s našimi radami to zvládnete hravo. Zamerajte sa na svoje potreby, rozpočet a dostupné technológie vo vašej lokalite.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Krok 1: Zhodnoťte svoje potreby</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Počet používateľov:</strong> Koľko ľudí bude internet používať súčasne?</li>
          <li><strong>Aktivity:</strong> Na čo najčastejšie používate internet (práca, zábava, vzdelávanie)?</li>
          <li><strong>Zariadenia:</strong> Koľko zariadení bude pripojených k internetu (počítače, smartfóny, tablety, smart TV)?</li>
        </ul>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Krok 2: Zistite dostupné technológie</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Optický internet:</strong> Najrýchlejšie a najspoľahlivejšie pripojenie</li>
          <li><strong>DSL:</strong> Dostupný takmer všade, ale s nižšou rýchlosťou</li>
          <li><strong>Kábel:</strong> Rýchlejší ako DSL, ale s obmedzenou dostupnosťou</li>
          <li><strong>Mobilný internet:</strong> Flexibilný, ale s obmedzenými dátami a stabilitou</li>
        </ul>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Krok 3: Porovnajte ponuky</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Rýchlosť:</strong> Sťahovanie a odosielanie dát</li>
          <li><strong>Cena:</strong> Mesačný poplatok a prípadné aktivačné poplatky</li>
          <li><strong>Dátový limit:</strong> Neobmedzené dáta sú ideálne</li>
          <li><strong>Zmluvné podmienky:</strong> Dĺžka zmluvy a podmienky ukončenia</li>
        </ul>
      </div>

      <h3>Odporúčané tarify pre rôzne potreby</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h4 class="text-lg font-semibold text-poda-blue mb-3">Základný tarif</h4>
          <p class="text-gray-700">Pre nenáročných používateľov, ktorí internet používajú na bežné prehliadanie webu a e-maily.</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>• Rýchlosť: 50/50 Mbps</li>
            <li>• Cena: od 390 Kč mesačne</li>
            <li>• Ideálne pre 1-2 osoby</li>
          </ul>
        </div>
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h4 class="text-lg font-semibold text-poda-blue mb-3">Štandardný tarif</h4>
          <p class="text-gray-700">Pre rodiny, ktoré internet používajú na prácu, zábavu a vzdelávanie.</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>• Rýchlosť: 250/250 Mbps</li>
            <li>• Cena: od 590 Kč mesačne</li>
            <li>• Ideálne pre 3-4 osoby</li>
          </ul>
        </div>
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h4 class="text-lg font-semibold text-poda-blue mb-3">Premium tarif</h4>
          <p class="text-gray-700">Pre náročných používateľov, ktorí potrebujú ultra-rýchle pripojenie pre streamovanie, hranie hier a prácu s veľkými súbormi.</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>• Rýchlosť: 1000/1000 Mbps</li>
            <li>• Cena: od 990 Kč mesačne</li>
            <li>• Ideálne pre 5+ osôb</li>
          </ul>
        </div>
      </div>

      <h3>Tipy a triky</h3>
      
      <div class="space-y-4 my-8">
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Test rýchlosti</h5>
          <p class="text-gray-600">Pravidelne testujte rýchlosť svojho internetu, aby ste sa uistili, že dostávate to, za čo platíte.</p>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">WiFi router</h5>
          <p class="text-gray-600">Používajte kvalitný WiFi router, ktorý podporuje najnovšie štandardy pre optimálny výkon.</p>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Zabezpečenie</h5>
          <p class="text-gray-600">Zabezpečte svoju WiFi sieť silným heslom a pravidelne aktualizujte firmvér routera.</p>
        </div>
      </div>

      <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-3">Potrebujete poradiť?</h4>
        <p class="mb-4">Kontaktujte nás a naši odborníci vám pomôžu vybrať ideálny internetový tarif pre vašu domácnosť.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="https://popri.cz" class="inline-block bg-white text-poda-blue px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors text-center">Objednať na popri.cz</a>
          <a href="tel:596112112" class="inline-block bg-poda-orange text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors text-center">Zavolať 596 112 112</a>
        </div>
      </div>
    `,
    author: "Tomáš Kováč",
    date: "2024-02-22",
    readTime: 6,
    category: "Služby",
    tags: ["internet", "tarif", "výber", "domácnosť", "rýchlosť", "PODA"],
    featured: false,
    imageUrl: "/lovable-uploads/internet-plan.jpg"
  }
];
