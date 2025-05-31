import type { BlogPost } from './types';

export const karvinaPosts: BlogPost[] = [
  {
    id: 21,
    title: "Optický internet PODA v Porube - Pokrytie a služby pre najväčšiu mestskú časť Ostravy",
    excerpt: "Komplexný prehľad optického internetového pokrytia PODA v Ostrave-Porube. Zistite dostupnosť, ceny a výhody našich služieb v najväčšej mestskej časti.",
    content: `
      <h2>PODA v Ostrave-Porube - Lídri optického pripojenia</h2>
      
      <p>Ostrava-Poruba je najväčšou mestskou časťou Ostravy s viac ako 67 000 obyvateľmi. PODA poskytuje v tejto oblasti komplexné optické internetové služby s pokrytím takmer 98% všetkých adries. Naša moderná infraštruktúra zabezpečuje spolnhlivé pripojenie pre domácnosti aj firmy.</p>

      <div class="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-6 border-l-4 border-poda-blue">
        <h3 class="text-lg font-semibold text-poda-blue mb-3">Pokrytie PODA v Porube</h3>
        <p class="text-gray-700 mb-3">Naša optická sieť pokrýva všetky hlavné oblasti Poruby:</p>
        <ul class="text-gray-700 space-y-1">
          <li>• Poruba-Sever (sídliská Poruba I-IV)</li>
          <li>• Poruba-Jih (rodinné domy, vilová štvrť)</li>
          <li>• Technologický park</li>
          <li>• Priemyselná zóna</li>
          <li>• Vysokoškolské mestečko</li>
        </ul>
      </div>

      <h3>Cenové balíčky pre Porubu</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Štartovací</h4>
          <div class="text-3xl font-bold text-poda-orange mb-2">390 Kč</div>
          <div class="text-gray-600 mb-4">mesačne</div>
          <ul class="text-gray-600 space-y-2 mb-6">
            <li>• 100/100 Mbps garantované</li>
            <li>• Bezplatná inštalácia</li>
            <li>• WiFi router zadarmo</li>
            <li>• 24/7 technická podpora</li>
          </ul>
          <a href="tel:596112112" class="block w-full bg-poda-blue text-white text-center py-2 rounded hover:bg-poda-blue-dark transition-colors">Objednať</a>
        </div>

        <div class="bg-white p-6 rounded-lg border-2 border-poda-orange shadow-lg relative">
          <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-poda-orange text-white px-4 py-1 rounded-full text-sm font-medium">Najpopulárnejší</div>
          <h4 class="text-xl font-bold text-poda-blue mb-3">Rodinný</h4>
          <div class="text-3xl font-bold text-poda-orange mb-2">590 Kč</div>
          <div class="text-gray-600 mb-4">mesačne</div>
          <ul class="text-gray-600 space-y-2 mb-6">
            <li>• 500/500 Mbps garantované</li>
            <li>• Bezplatná inštalácia</li>
            <li>• Premium WiFi router</li>
            <li>• Prioritná technická podpora</li>
            <li>• Antivírová ochrana</li>
          </ul>
          <a href="tel:596112112" class="block w-full bg-poda-orange text-white text-center py-2 rounded hover:bg-orange-600 transition-colors">Objednať</a>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-poda-blue mb-3">Biznis</h4>
          <div class="text-3xl font-bold text-poda-orange mb-2">990 Kč</div>
          <div class="text-gray-600 mb-4">mesačne</div>
          <ul class="text-gray-600 space-y-2 mb-6">
            <li>• 1000/1000 Mbps garantované</li>
            <li>• Bezplatná inštalácia</li>
            <li>• Profesionálne zariadenia</li>
            <li>• Dedikovaná podpora</li>
            <li>• SLA 99,9%</li>
            <li>• Záložné pripojenie</li>
          </ul>
          <a href="tel:596112112" class="block w-full bg-poda-blue text-white text-center py-2 rounded hover:bg-poda-blue-dark transition-colors">Objednať</a>
        </div>
      </div>

      <blockquote class="border-l-4 border-poda-blue bg-blue-50 p-6 my-8 rounded-r-lg">
        "V Porube máme PODA internet už 3 roky. Nikdy žiadne problémy, rýchlosť presne taká, ako sľúbili. Navyše, keď sme volali s otázkou, Milan nám hneď pomohol." - Mgr. Eva S., Poruba IV
      </blockquote>

      <h3>Špecifické výhody pre Porubu</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h4 class="text-lg font-semibold text-yellow-800 mb-3">Pre študentov VŠB-TUO</h4>
          <p class="text-yellow-700 mb-3">Špeciálne zvýhodnené tarifly pre študentov Vysokej školy bánskej:</p>
          <ul class="text-yellow-700 space-y-1">
            <li>• 20% zľava na všetky tariffy</li>
            <li>• Bezplatná inštalácia na internátoch</li>
            <li>• Flexibilné zmluvy na dobu štúdia</li>
            <li>• Prioritná technická podpora</li>
          </ul>
        </div>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 class="text-lg font-semibold text-green-800 mb-3">Pre firmy v technologickom parku</h4>
          <p class="text-green-700 mb-3">Špeciálne podnikateľské balíčky pre firmy:</p>
          <ul class="text-green-700 space-y-1">
            <li>• Dedikované pripojenia až 10 Gbps</li>
            <li>• SLA s garantovanou dostupnosťou</li>
            <li>• 24/7 monitoring a podpora</li>
            <li>• Záložné pripojenia cez LTE</li>
          </ul>
        </div>
      </div>

      <h3>Prípadová štúdia: Pokrytie sídliska Poruba III</h3>
      
      <p>Sídlisko Poruba III s približne 15 000 obyvateľmi predstavuje jeden z našich najväčších projektov. Kompletná optická infraštruktúra bola vybudovaná v rokoch 2019-2021:</p>
      
      <div class="timeline space-y-4 my-6">
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">2019: Projektová príprava</h5>
          <p class="text-gray-600">Detailný prieskum a projekcia optickej siete pre 45 panelových domov</p>
        </div>
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">2020: Výstavba infraštruktúry</h5>
          <p class="text-gray-600">Položenie 12 km optických káblov a inštalácia 45 rozvodných uzlov</p>
        </div>
        <div class="border-l-2 border-poda-blue pl-6">
          <h5 class="font-semibold text-poda-blue">2021: Spustenie služieb</h5>
          <p class="text-gray-600">Prvé pripojenia zákazníkov a postupné pokrytie všetkých bytov</p>
        </div>
        <div class="border-l-2 border-green-500 pl-6">
          <h5 class="font-semibold text-green-600">2024: 100% pokrytie</h5>
          <p class="text-gray-600">Každý byt má k dispozícii optické pripojenie PODA</p>
        </div>
      </div>

      <h3>Technické špecifikácie pre Porubu</h3>
      
      <div class="bg-gray-50 p-6 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">Infraštruktúra PODA v Porube</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 class="font-medium text-gray-700 mb-2">Optická sieť</h5>
            <ul class="text-gray-600 space-y-1">
              <li>• GPON technológia</li>
              <li>• Kapacita až 2,5 Gbps na port</li>
              <li>• Redundantné pripojenia</li>
              <li>• Záložné napájanie 8 hodín</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium text-gray-700 mb-2">Pokrytie</h5>
            <ul class="text-gray-600 space-y-1">
              <li>• 156 bytových domov</li>
              <li>• 2 400 rodinných domov</li>
              <li>• 45 km optických káblov</li>
              <li>• 67 distribučných uzlov</li>
            </ul>
          </div>
        </div>
      </div>

      <h3>Referencie spokojných zákazníkov</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-poda-blue rounded-full flex items-center justify-center text-white font-bold">JS</div>
            <div class="ml-3">
              <h5 class="font-semibold">Ing. Jan Svoboda</h5>
              <p class="text-gray-600 text-sm">Poruba IV, bytový dom</p>
            </div>
          </div>
          <p class="text-gray-700">"Už 2 roky používame PODA internet v Porube. Rýchlosť je skutočne taká, ako bola sľúbená. Výborná je aj cena v porovnaní s konkurenciou."</p>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-poda-orange rounded-full flex items-center justify-center text-white font-bold">MK</div>
            <div class="ml-3">
              <h5 class="font-semibold">Mgr. Marie Krásná</h5>
              <p class="text-gray-600 text-sm">Poruba-Sever, rodinný dom</p>
            </div>
          </div>
          <p class="text-gray-700">"Prechod od T-Mobile prebehol bez problémov. Technická podpora je výborná, vždy rýchlo reagujú na naše potreby."</p>
        </div>
      </div>

      <div class="bg-poda-blue text-white p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-3">Pripojte sa k tisíckam spokojných zákazníkov v Porube</h4>
        <p class="mb-4">Získajte moderný optický internet s garantovanými rýchlosťami a bezplatnou inštaláciou. Naši špecialisti vám pomôžu vybrať ideálny tarif.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a href="https://popri.cz" class="inline-block bg-white text-poda-blue px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors text-center">Objednať na popri.cz</a>
          <a href="tel:596112112" class="inline-block bg-poda-orange text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors text-center">Zavolať 596 112 112</a>
        </div>
      </div>

      <h3>Časté otázky o službách v Porube</h3>
      
      <div class="space-y-4 my-8">
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Je možné pripojenie v staršich bytových domoch?</h5>
          <p class="text-gray-600">Áno, máme skúsenosti s pripojovaním vo všetkých typoch budov v Porube. Naši technici nájdu optimálne riešenie pre každú situáciu.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Aká je skutočná rýchlosť internetu v Porube?</h5>
          <p class="text-gray-600">Vďaka optickej infraštruktúre dosahujete plnú objednanú rýchlosť 24/7. Pravidelne testujeme a garantujeme minimálne 95% objednanej rýchlosti.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <h5 class="font-semibold text-poda-blue mb-2">Ponúkate služby aj pre firmy v Porube?</h5>
          <p class="text-gray-600">Určite, poskytujeme špecializované biznis riešenia vrátane dedikovaných pripojení, SLA zmlúv a priority podpory pre firmy v celej Porube.</p>
        </div>
      </div>
    `,
    author: "Milan Novák",
    date: "2024-02-20",
    readTime: 12,
    category: "Lokálne služby",
    tags: ["Poruba", "Ostrava", "optický internet", "pokrytie", "PODA", "ceny"],
    featured: true,
    imageUrl: "/lovable-uploads/poruba-coverage.jpg"
  },
];
