
import type { CityTariff } from './types';

export const ostravaTariffs: CityTariff[] = [
  {
    city: 'Ostrava',
    price: '250 Kč/měsíc',
    speed: '1000/1000 Mb/s',
    features: 'TV zdarma (bez Nová a Prima)'
  },
  {
    city: 'Karviná',
    price: '250 Kč/měsíc',
    speed: '1000/1000 Mb/s',
    features: 'TV zdarma (důchodcovský tarif)'
  },
  {
    city: 'Havířov',
    price: '250 Kč/měsíc',
    speed: '1000/1000 Mb/s',
    features: 'možnost 10% slevy'
  },
  {
    city: 'Bohumín',
    price: '250 Kč/měsíc',
    speed: '1000/1000 Mb/s',
    features: 'mestská optika'
  },
  {
    city: 'Orlová',
    price: '250 Kč/měsíc',
    speed: '1000/1000 Mb/s',
    features: 'TV zdarma'
  }
];

export const generateTariffTable = (tariffs: CityTariff[]): string => {
  const rows = tariffs.map(tariff => 
    `<tr><td class="px-6 py-4 whitespace-nowrap">${tariff.city}</td><td class="px-6 py-4 whitespace-nowrap">${tariff.price}</td><td class="px-6 py-4 whitespace-nowrap">${tariff.speed}</td><td class="px-6 py-4 whitespace-nowrap">${tariff.features}</td></tr>`
  ).join('\n          ');

  return `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Město</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Základní tarif</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rychlost</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zvláštnosti</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          ${rows}
        </tbody>
      </table>
    </div>`;
};
