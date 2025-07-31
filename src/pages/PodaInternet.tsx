import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, Wifi, Clock, Phone, Star, Award, Users, Zap, Shield, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';
import { tariffData } from '@/components/tariffs/tariffData';

const PodaInternet = () => {
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "GPON Technologie",
      description: "Nejmodernější optické připojení s garantovanou rychlostí",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Symetrické rychlosti",
      description: "Stejná rychlost upload i download až 1000 Mbps",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "99,9% spolehlivost",
      description: "Garantovaná stabilita a nepřetržité připojení",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "TV programy zdarma",
      description: "Více než 85 TV kanálů automaticky v ceně",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const allTariffs = [...tariffData.byty, ...tariffData.domy];

  const reviews = [
    {
      name: "Pavel Novák",
      city: "Ostrava",
      rating: 5,
      text: "PODA internet je fantastický! Rychlost je přesně taková, jakou slibují. Konečně můžu pracovat z domu bez problémů."
    },
    {
      name: "Marie Svobodová", 
      city: "Karviná",
      rating: 5,
      text: "Přestoupila jsem z jiného poskytovatele a rozdíl je obrovský. TV kanály zdarma jsou super bonus!"
    },
    {
      name: "Tomáš Dvořák",
      city: "Havířov", 
      rating: 5,
      text: "Instalace byla rychlá a technická podpora je na výborné úrovni. Jednoznačně doporučujem!"
    }
  ];

  const faqItems = [
    {
      question: "Jaká je dostupnost PODA internetu v mé oblasti?",
      answer: "PODA pokrývá většinu Moravskoslezského kraje včetně Ostravy, Karviné, Havířova, Bohumína a dalších měst. Kontaktujte nás pro ověření dostupnosti na vaší adrese."
    },
    {
      question: "Jsou v ceně nějaké skryté poplatky?",
      answer: "Ne! Uvedené ceny jsou konečné. Instalace, Wi-Fi router i aktivace jsou zdarma. Platíte jen měsíční poplatek za připojení."
    },
    {
      question: "Jak dlouho trvá instalace PODA internetu?",
      answer: "Standardní instalace trvá 2-4 hodiny. Náš technik se s vámi domluví na vhodném termínu a vše nastaví včetně Wi-Fi."
    },
    {
      question: "Můžu si ponechat své telefonní číslo?",
      answer: "Ano, při přechodu z jiného poskytovatele si můžete ponechat vaše současné telefonní číslo. Pomůžeme vám s celým procesem přenosu."
    },
    {
      question: "Jaká je výpovědní lhůta?",
      answer: "Máme flexibilní podmínky s možností výpovědi na konci kalendářního měsíce. Žádné dlouhodobé závazky."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA - Prémiové optické připojení | Popri.cz</title>
        <meta name="description" content="Internet PODA - nejluxusnější optické připojení v Moravskoslezském kraji. GPON technologie, symetrické gigabitové rychlosti, TV programy zdarma. Objednejte si premium internet již dnes!" />
        <meta name="keywords" content="Internet PODA, PODA internet, optické připojení, GPON technologie, internet Ostrava, PODA Karviná, prémiový internet" />
        <link rel="canonical" href="https://popri.cz/internet-poda" />
      </Helmet>

      {/* Hero sekcia */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container-custom z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8"
            >
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-purple-200 font-medium">Prémiové optické připojení</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-orange-200 bg-clip-text text-transparent">
                Internet
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                PODA
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Zažijte budoucnost internetu s <strong className="text-white">GPON technologií</strong>. 
              Symetrické gigabitové rychlosti a prémiové TV programy v jednom balíku.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button size="lg" className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Zavolat +420 730 431 313
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-400 text-purple-200 hover:bg-purple-400 hover:text-white px-10 py-4 text-lg font-semibold backdrop-blur-sm bg-white/5">
                Získat nabídku
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Výhody PODA */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Prémiové výhody
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
              Proč je Internet PODA
              <span className="block text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text">
                neporazitelný?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kombinace nejmodernějších technologií s luxusním zákaznickým zážitkem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarify */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-orange-200 font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Prémiové balíčky
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Naše <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">exkluzivní</span> tarify
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Každý balíček je navržen pro maximální komfort a spokojenost
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {allTariffs.map((tariff, index) => (
              <motion.div
                key={tariff.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className={`relative h-full backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 ${tariff.isRecommended ? 'ring-2 ring-orange-500/50' : ''}`}>
                  {tariff.isRecommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ DOPORUČENO
                      </span>
                    </div>
                  )}
                  {tariff.isPromo && (
                    <div className="absolute top-6 right-6">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        PROMO
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-3xl font-bold text-white mb-2">{tariff.title}</CardTitle>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                        {tariff.price}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{tariff.priceNote}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {tariff.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
                            <p className="text-gray-300 text-sm mt-1">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {tariff.promoInfoText && (
                      <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-lg p-4">
                        <p className="text-orange-200 text-sm">{tariff.promoInfoText}</p>
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full mt-6 h-14 text-lg font-bold transition-all duration-300 ${
                        tariff.isRecommended 
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-500/25' 
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                      }`}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Objednat nyní
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
              Co říkají naši zákazníci
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.8/5 na základě 150+ hodnocení</span>
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
              Máte otázky? Zde najdete odpovědi na nejčastější otázky o PODA internetu
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
              Připraveni na nejrychlejší internet?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Objednejte si PODA internet ještě dnes a užívejte si stabilní připojení 
              s gigabitovými rychlostmi a TV zdarma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-poda-orange hover:bg-poda-orange/90 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Zavolat +420 730 431 313
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-poda-blue">
                Kontaktní formulář
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
                Vyplňte formulář a my se vám ozveme do 24 hodin
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