
export const popriSection = `
    <div class="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl mb-8">
        <h2 class="text-3xl font-bold mb-6 text-center">Popri.cz - Váš průvodce nejlepšími tarify PODA</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4 text-blue-200">Proč zvolit Popri.cz pro PODA?</h3>
                <div class="space-y-3 text-blue-100">
                    <p>Popri.cz je oficiální partner společnosti PODA pro Moravskoslezský kraj. Naše služby vám umožní:</p>
                    <ul class="space-y-2 ml-4">
                        <li>Okamžité porovnání všech dostupných tarifů</li>
                        <li>Ověření pokrytí na konkrétní adrese</li>
                        <li>Regionální zákaznickou podporu</li>
                        <li>Nejlepší ceny garantované</li>
                        <li>Rychlou instalaci technikov z regionu</li>
                    </ul>
                </div>
            </div>
            
            <div class="bg-white/10 p-6 rounded-lg">
                <h4 class="text-lg font-semibold mb-4">Kontakt pro Moravskoslezský kraj</h4>
                <div class="space-y-3">
                    <div class="flex items-center">
                        <span class="font-semibold mr-2">Telefón:</span>
                        <a href="tel:+420730431313" class="text-poda-orange hover:text-orange-300 font-medium">730 431 313</a>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold mr-2">Email:</span>
                        <a href="mailto:terc@obchod.poda.cz" class="text-poda-orange hover:text-orange-300">terc@obchod.poda.cz</a>
                    </div>
                    <div class="flex items-center">
                        <span class="font-semibold mr-2">Web:</span>
                        <a href="https://www.popri.cz" target="_blank" rel="noopener noreferrer" class="text-poda-orange hover:text-orange-300">Popri.cz</a>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-white/20">
                    <a href="/kontakt" class="inline-flex items-center bg-poda-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center">
                        Získat nabídku zdarma
                    </a>
                </div>
            </div>
        </div>
    </div>`;

export const comparisonTable = `
    <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 class="text-2xl font-bold text-poda-blue mb-6">Porovnání PODA s konkurencí v regionu</h3>
        
        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="border border-gray-300 px-4 py-3 text-left font-semibold">Poskytovatel</th>
                        <th class="border border-gray-300 px-4 py-3 text-center font-semibold">Rychlost</th>
                        <th class="border border-gray-300 px-4 py-3 text-center font-semibold">Cena</th>
                        <th class="border border-gray-300 px-4 py-3 text-center font-semibold">Pokrytie Ostrava</th>
                        <th class="border border-gray-300 px-4 py-3 text-center font-semibold">Hodnotenie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-blue-50">
                        <td class="border border-gray-300 px-4 py-3 font-semibold text-poda-blue">PODA (Popri.cz)</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">1000/1000 Mb/s</td>
                        <td class="border border-gray-300 px-4 py-3 text-center font-bold text-green-600">od 250 Kč</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">95%</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">★★★★★</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-3">O2</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">300/30 Mb/s</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">890 Kč</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">85%</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">★★★☆☆</td>
                    </tr>
                    <tr class="bg-gray-50">
                        <td class="border border-gray-300 px-4 py-3">T-Mobile</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">250/25 Mb/s</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">750 Kč</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">70%</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">★★★☆☆</td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 px-4 py-3">Vodafone</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">200/20 Mb/s</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">680 Kč</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">60%</td>
                        <td class="border border-gray-300 px-4 py-3 text-center">★★☆☆☆</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-gray-700">
                <strong>Poznámka:</strong> Ceny a dostupnost sa môžu líšiť podľa konkrétnej lokality. 
                Pre najnovšie informácie kontaktujte <a href="tel:+420730431313" class="text-poda-blue font-medium">730 431 313</a> 
                alebo navštívte <a href="https://www.popri.cz" class="text-poda-blue font-medium">Popri.cz</a>.
            </p>
        </div>
    </div>`;
