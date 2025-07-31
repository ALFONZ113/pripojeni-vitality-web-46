import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, Wifi, Clock, Phone, Star, Award, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';

const PodaInternet = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-poda-orange" />,
      title: "Gigabitové rýchlosti",
      description: "Až 1000 Mbps upload i download"
    },
    {
      icon: <Wifi className="h-6 w-6 text-poda-orange" />,
      title: "GPON technológia",
      description: "Najmodernejšie optické pripojenie"
    },
    {
      icon: <Clock className="h-6 w-6 text-poda-orange" />,
      title: "99,9% dostupnosť",
      description: "Garantovaná stabilita pripojenia"
    },
    {
      icon: <Award className="h-6 w-6 text-poda-orange" />,
      title: "TV zadarmo",
      description: "60+ kanálov bez príplatku"
    }
  ];

  const tariffs = [
    {
      name: "PODA Internet 100",
      speed: "100/100 Mbps",
      price: "199 Kč/mesiac",
      features: ["Stabilné pripojenie", "Wi-Fi router zadarmo", "Inštalácia zadarmo"]
    },
    {
      name: "PODA Internet 500",
      speed: "500/500 Mbps", 
      price: "229 Kč/mesiac",
      features: ["Ideálne pre rodiny", "Streaming vo vysokej kvalite", "Online gaming"]
    },
    {
      name: "PODA Internet 1000",
      speed: "1000/1000 Mbps",
      price: "250 Kč/mesiac",
      features: ["Maximálne rýchlosti", "TV kanály zadarmo", "Premium podpora"],
      popular: true
    }
  ];

  const reviews = [
    {
      name: "Pavel Novák",
      city: "Ostrava",
      rating: 5,
      text: "PODA internet je fantastický! Rýchlosť je presne taká, akú sľubujú. Konečne môžem pracovať z domu bez problémov."
    },
    {
      name: "Marie Svobodová", 
      city: "Karviná",
      rating: 5,
      text: "Prestúpila som z iného poskytovateľa a rozdiel je obrovský. TV kanály zadarmo sú super bonus!"
    },
    {
      name: "Tomáš Dvořák",
      city: "Havířov", 
      rating: 5,
      text: "Inštalácia bola rýchla a technická podpora je na výbornej úrovni. Jednoznačne odporúčam!"
    }
  ];

  const faqItems = [
    {
      question: "Aká je dostupnosť PODA internetu v mojej oblasti?",
      answer: "PODA pokrýva väčšinu Moravskoslezského kraja vrátane Ostravy, Karvinej, Havířova, Bohumína a ďalších miest. Kontaktujte nás pre overenie dostupnosti na vašej adrese."
    },
    {
      question: "Sú v cene nejako skryté poplatky?",
      answer: "Nie! Uvedené ceny sú konečné. Inštalácia, Wi-Fi router aj aktivácia sú zadarmo. Platíte len mesačný poplatok za pripojenie."
    },
    {
      question: "Ako dlho trvá inštalácia PODA internetu?",
      answer: "Štandardná inštalácia trvá 2-4 hodiny. Náš technik sa s vami dohodne na vhodnom termíne a všetko nastaví vrátane Wi-Fi."
    },
    {
      question: "Môžem si ponechať svoje telefónne číslo?",
      answer: "Áno, pri prechode z iného poskytovateľa si môžete ponechať vaše súčasné telefónne číslo. Pomôžeme vám s celým procesom prenosu."
    },
    {
      question: "Aká je výpovedná lehota?",
      answer: "Máme flexibilné podmienky s možnosťou výpovede na konci kalendárneho mesiaca. Žiadne dlhodobé záväzky."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>PODA Internet - Gigabitové optické pripojenie | Popri.cz</title>
        <meta name="description" content="PODA Internet - najrýchlejšie optické pripojenie v Moravskoslezskom kraji. Gigabitové rýchlosti, TV zadarmo, inštalácia zadarmo. Objednajte si už dnes!" />
        <meta name="keywords" content="PODA internet, optické pripojenie, gigabitový internet, internet Ostrava, PODA Karviná, rýchly internet" />
        <link rel="canonical" href="https://popri.cz/poda-internet" />
      </Helmet>

      {/* Hero sekcia */}
      <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-poda-blue to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-poda-orange">PODA</span> Internet
              <span className="block text-2xl md:text-3xl mt-2 text-blue-100">
                Gigabitové optické pripojenie pre váš domov
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Najrýchlejší a najspoľahlivejší internet v Moravskoslezskom kraji. 
              Až 1000 Mbps, TV zadarmo a inštalácia zdarma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-poda-orange hover:bg-poda-orange/90 text-white px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Zavolať +420 730 431 313
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-poda-blue">
                Objednať online
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Výhody PODA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Prečo vybrať PODA Internet?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Moderná GPON technológia, spoľahlivosť a výnimočný zákaznícky servis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-poda-blue mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarify */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              PODA Internet tarify
            </h2>
            <p className="text-gray-600 text-lg">
              Vyberte si tarif, ktorý vám najlepšie vyhovuje
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tariffs.map((tariff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${tariff.popular ? 'border-poda-orange border-2' : ''}`}>
                  {tariff.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-poda-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                        Najpopulárnejší
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-poda-blue">{tariff.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-poda-orange">
                      {tariff.speed}
                    </CardDescription>
                    <div className="text-3xl font-bold text-poda-blue mt-2">
                      {tariff.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tariff.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${tariff.popular 
                        ? 'bg-poda-orange hover:bg-poda-orange/90' 
                        : 'bg-poda-blue hover:bg-poda-blue/90'
                      }`}
                    >
                      Objednať
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recenzie zákazníkov */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Čo hovoria naši zákazníci
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.8/5 na základe 150+ hodnotení</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-poda-blue mr-2" />
                  <div>
                    <p className="font-semibold text-poda-blue">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Často kladené otázky
            </h2>
            <p className="text-gray-600 text-lg">
              Máte otázky? Tu nájdete odpovede na najčastejšie otázky o PODA internete
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-poda-blue mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sekcia */}
      <section className="py-16 bg-poda-blue text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pripravení na najrýchlejší internet?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Objednajte si PODA internet ešte dnes a užívajte si stabilné pripojenie 
              s gigabitovými rýchlosťami a TV zadarmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-poda-orange hover:bg-poda-orange/90 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Zavolať +420 730 431 313
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-poda-blue">
                Kontaktný formulár
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kontaktný formulár */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-poda-blue mb-4">
                Kontaktujte nás
              </h2>
              <p className="text-gray-600">
                Vyplňte formulár a my sa vám ozveme do 24 hodín
              </p>
            </motion.div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodaInternet;