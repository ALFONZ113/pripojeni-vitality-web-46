import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, Users, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMetadata from '../components/page/PageMetadata';
import PhoneLink from '../components/ui/phone-link';

const PomocPrechodem = () => {
  const steps = [
    { icon: Phone, title: "1. Kontaktujte nás", description: "Zavolejte nám na +420 730 431 313 nebo vyplňte kontaktní formulář" },
    { icon: Users, title: "2. Konzultace zdarma", description: "Projdeme s vámi současnou smlouvu a najdeme nejlepší řešení" },
    { icon: CheckCircle, title: "3. Vyřídíme vše za vás", description: "Postaráme se o výpověď u současného poskytovatele i novou instalaci" },
    { icon: Shield, title: "4. Bezproblémový přechod", description: "Zajistíme kontinuitu služeb bez výpadku internetu" }
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
    <div className="min-h-screen bg-background">
      <PageMetadata 
        title="Pomoc s přechodem od jiného poskytovatele | PODA Internet"
        description="Vyřídíme za vás přechod od současného poskytovatele internetu. Bezplatná konzultace."
      />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              Pomůžeme vám s přechodem
              <span className="text-gradient-gold block">od jiného poskytovatele</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Nestarejte se o složité vyřizování. Postaráme se o vše - od výpovědi současné smlouvy 
              až po instalaci nového PODA připojení. Vše zdarma a bez starostí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneLink 
                phoneNumber="+420730431313"
                className="btn-gold inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Zavolat +420 730 431 313
              </PhoneLink>
              <Link to="/kontakt" className="btn-noir inline-flex items-center justify-center">
                Kontaktní formulář
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Jak přechod <span className="text-gradient-gold">probíhá</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Celý proces je jednoduchý a rychlý. Vyřídíme vše za vás během několika dní.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center glow-gold">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Co za vás <span className="text-gradient-gold">vyřídíme</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
              Často kladené <span className="text-gradient-gold">otázky</span>
            </h2>

            <div className="space-y-6">
              {[
                { q: "Kolik stojí přechod od jiného poskytovatele?", a: "Naše služby spojené s přechodem jsou zcela zdarma." },
                { q: "Jak dlouho přechod trvá?", a: "Celý proces obvykle trvá 7-14 dní." },
                { q: "Budu mít výpadek internetu?", a: "Ne, koordinujeme termíny tak, aby byla kontinuita služeb zachována." },
                { q: "Můžu si ponechat své telefonní číslo?", a: "Ano, přenos telefonního čísla zajistíme zdarma." }
              ].map((faq, index) => (
                <div key={index} className="card-luxury">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-6">
              Začněte ještě dnes
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Zavolejte nám nebo vyplňte kontaktní formulář.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PhoneLink 
                phoneNumber="+420730431313"
                className="btn-gold inline-flex items-center justify-center text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                +420 730 431 313
              </PhoneLink>
              <Link 
                to="/kontakt" 
                className="btn-noir inline-flex items-center justify-center text-lg"
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
