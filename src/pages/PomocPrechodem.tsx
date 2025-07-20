
import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, Users, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMetadata from '../components/page/PageMetadata';
import PhoneLink from '../components/ui/phone-link';

const PomocPrechodem = () => {
  const steps = [
    {
      icon: Phone,
      title: "1. Kontaktujte nás",
      description: "Zavolejte nám na +420 730 431 313 nebo vyplňte kontaktní formulář"
    },
    {
      icon: Users,
      title: "2. Konzultace zdarma",
      description: "Projdeme s vámi současnou smlouvu a najdeme nejlepší řešení"
    },
    {
      icon: CheckCircle,
      title: "3. Vyřídíme vše za vás",
      description: "Postaráme se o výpověď u současného poskytovatele i novou instalaci"
    },
    {
      icon: Shield,
      title: "4. Bezproblémový přechod",
      description: "Zajistíme kontinuitu služeb bez výpadku internetu"
    }
  ];

  const benefits = [
    "Výpověď současné smlouvy vyřídíme za vás",
    "Koordinace termínů instalace a odpojení",
    "Přenos telefonního čísla zdarma",
    "Technická podpora během celého procesu",
    "Garance nejlepší ceny na trhu",
    "Bez poplatků za přechod"
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageMetadata 
        title="Pomoc s přechodem od jiného poskytovatele | PODA Internet"
        description="Vyřídíme za vás přechod od současného poskytovatele internetu. Bezplatná konzultace, výpověď smlouvy a koordinace instalace. Zavolejte +420 730 431 313"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6">
              Pomůžeme vám s přechodem
              <span className="text-poda-orange block">od jiného poskytovatele</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Nestarajte se o složité vyřizování. Postaráme se o vše - od výpovědi současné smlouvy 
              až po instalaci nového PODA připojení. Vše zdarma a bez starostí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneLink 
                phoneNumber="+420730431313"
                className="btn-primary inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Zavolat hned +420 730 431 313
              </PhoneLink>
              <Link to="/kontakt" className="btn-outline inline-flex items-center justify-center">
                Kontaktní formulář
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Jak přechod probíhá?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celý proces je jednoduchý a rychlý. Vyřídíme vše za vás během několika dní.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-poda-blue rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-poda-blue mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
                Co za vás vyřídíme?
              </h2>
              <p className="text-xl text-gray-600">
                Postaráme se o každý detail vašeho přechodu
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-12 text-center">
              Často kladené otázky
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">
                  Kolik stojí přechod od jiného poskytovatele?
                </h3>
                <p className="text-gray-600">
                  Naše služby spojené s přechodem jsou zcela zdarma. Neúčtujeme žádne poplatky 
                  za vyřízení výpovědi ani za koordinaci přechodu.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">
                  Jak dlouho přechod trvá?
                </h3>
                <p className="text-gray-600">
                  Celý proces obvykle trvá 7-14 dní. Závisí na výpovědní lhůtě u vašeho současného 
                  poskytovatele a dostupnosti našich techniků pro instalaci.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">
                  Budu mít výpadek internetu?
                </h3>
                <p className="text-gray-600">
                  Ne, koordinujeme termíny tak, aby byla kontinuita služeb zachována. 
                  Nové připojení instalujeme před odpojením toho současného.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">
                  Můžu si ponechat své telefonní číslo?
                </h3>
                <p className="text-gray-600">
                  Ano, přenos telefonního čísla zajistíme zdarma. Váše číslo zůstane stejné 
                  a všechny služby budou fungovat bez změny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-poda-blue">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Začněte ještě dnes
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Zavolejte nám nebo vyplňte kontaktní formulář. Poradíme vám zdarma 
              a vyřídíme vše potřebné pro váš přechod.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneLink 
                phoneNumber="+420730431313"
                className="bg-poda-orange hover:bg-poda-orange/90 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                +420 730 431 313
              </PhoneLink>
              <Link 
                to="/kontakt" 
                className="bg-white hover:bg-gray-100 text-poda-blue px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center text-lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Kontaktní formulář
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PomocPrechodem;
