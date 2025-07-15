'use client';

import Link from 'next/link';
import TariffSection from '../../src/components/TariffSection';

export default function TarifyContent() {
  // Aktuální datum pro dynamickou aktualizaci metadat
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <nav className="flex mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-poda-blue">Úvod</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <span className="text-gray-700">Tarify</span>
              </li>
            </ol>
          </nav>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-4">Internetové a TV tarify PODA</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vyberte si z naší nabídky výhodných tarifů PODA internetu s garantovanou rychlostí a stabilitou.
              Všechny tarify zahrnují TV programy zdarma.
            </p>
          </div>
        </div>
      </div>
      
      <TariffSection />
    </div>
  );
}