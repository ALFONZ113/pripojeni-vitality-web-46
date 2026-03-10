import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Users, Wifi, Clock, Phone, Mail, MapPin, Award, CheckCircle, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Breadcrumb from '@/components/common/Breadcrumb';

const ONas = () => {
  const baseUrl = 'https://www.popri.cz';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Popri.cz',
    alternateName: 'PODA Internet - Autorizovaný partner',
    url: baseUrl,
    logo: `${baseUrl}/popri-logo.png`,
    description: 'Autorizovaný obchodní zástupce PODA a.s. — poskytujeme gigabitový optický internet a IPTV služby v Moravskoslezském kraji a dalších regionech ČR.',
    telephone: '+420730431313',
    email: 'terc@obchod.poda.cz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ostrava',
      addressRegion: 'Moravskoslezský kraj',
      postalCode: '70200',
      addressCountry: 'CZ'
    },
    areaServed: [
      { '@type': 'State', name: 'Moravskoslezský kraj' },
      { '@type': 'State', name: 'Jihomoravský kraj' },
      { '@type': 'State', name: 'Pardubický kraj' }
    ],
    sameAs: [
      'https://www.facebook.com/popricz/',
      'https://www.instagram.com/poda.cz/',
      'https://www.linkedin.com/company/poda-a-s-/'
    ],
    foundingDate: '1998',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 230,
      unitText: 'techniků a zaměstnanců'
    }
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${baseUrl}/o-nas`,
    name: 'O nás — Popri.cz',
    description: 'Zjistěte více o Popri.cz — autorizovaném partnerovi PODA internetu. 26+ let zkušeností, 110 000+ zákazníků, gigabitová optická síť.',
    url: `${baseUrl}/o-nas`,
    mainEntity: { '@id': `${baseUrl}/#organization` }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Úvod', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'O nás', item: `${baseUrl}/o-nas` }
    ]
  };

  const stats = [
    { icon: Users, value: '33 000+', label: 'spokojených zákazníků' },
    { icon: Clock, value: '26+', label: 'let na trhu' },
    { icon: Wifi, value: '509 km', label: 'optických tras' },
    { icon: Award, value: '4.8/5', label: 'průměrné hodnocení' },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Gigabitová rychlost',
      description: 'Symetrické připojení až 1000/1000 Mbps na moderní GPON technologii bez datových limitů.'
    },
    {
      icon: Shield,
      title: 'Spolehlivost a stabilita',
      description: 'Vlastní optická síť s 99,9% dostupností. Žádné sdílení kapacity, žádné výpadky ve špičce.'
    },
    {
      icon: CheckCircle,
      title: 'Bez závazků',
      description: 'Smlouva na dobu neurčitou s měsíční výpovědní lhůtou. Férové podmínky bez skrytých poplatků.'
    },
    {
      icon: Users,
      title: 'Lokální podpora',
      description: '230+ techniků v regionu. Rychlá instalace do 7 dnů, osobní přístup a podpora v češtině.'
    },
  ];

  return (
    <>
      <Helmet>
        <title>O nás — Autorizovaný partner PODA | Popri.cz</title>
        <meta name="description" content="Popri.cz je autorizovaný partner PODA internetu. 26+ let zkušeností, 110 000+ zákazníků, gigabitová optika. Volejte 730 431 313." />
        <link rel="canonical" href={`${baseUrl}/o-nas`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        
        <meta property="og:title" content="O nás — Autorizovaný partner PODA | Popri.cz" />
        <meta property="og:description" content="Zjistěte více o Popri.cz — gigabitový optický internet a IPTV od PODA." />
        <meta property="og:url" content={`${baseUrl}/o-nas`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="cs_CZ" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-noir" />
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, hsl(38, 92%, 50%, 0.3) 0%, transparent 70%)' }} />
          
          <div className="container-custom relative z-10">
            <Breadcrumb
              items={[
                { title: 'Úvod', href: '/' },
                { title: 'O nás' }
              ]}
              className="mb-8"
            />
            
            <div className="max-w-3xl">
              <span className="badge-gold mb-4 inline-flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Autorizovaný partner PODA
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Váš lokální partner pro <span className="text-gradient-gold">rychlý internet</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Popri.cz je autorizovaný obchodní zástupce společnosti PODA a.s. — jednoho z největších 
                regionálních poskytovatelů internetu v České republice s více než 26 lety zkušeností.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O PODA */}
        <section className="py-20 lg:py-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Kdo je <span className="text-gradient-gold">PODA</span>?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    PODA a.s. je český regionální poskytovatel telekomunikačních služeb, založený v roce 1998 v Ostravě. 
                    Za více než 26 let vybudoval jednu z nejmodernějších optických sítí v ČR s více než 509 km optických tras.
                  </p>
                  <p>
                    Dnes obsluhuje přes 110 000 zákazníků v Ostravě, Brně, Praze, Havířově, Karviné, Bohumíně 
                    a dalších městech. Vlastní infrastruktura znamená plnou kontrolu nad kvalitou služeb, rychlé 
                    řešení problémů a férové ceny bez mezioperátorských poplatků.
                  </p>
                  <p>
                    Popri.cz jako autorizovaný partner PODA zajišťuje kompletní servis — od poradenství přes objednávku 
                    až po koordinaci instalace. Jsme váš lokální kontakt pro nejlepší internetové připojení v regionu.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="glass-card rounded-xl p-5 flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - reuse existing component */}
        <TestimonialsSection />

        {/* Contact CTA */}
        <section className="py-20 lg:py-28 border-t border-border">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Máte otázky? <span className="text-gradient-gold">Ozvěte se nám</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Rádi vám poradíme s výběrem tarifu, ověříme dostupnost na vaší adrese nebo zodpovíme jakékoli dotazy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <a 
                href="tel:+420730431313"
                className="flex items-center gap-3 bg-primary/10 border border-primary/30 text-primary px-6 py-3 rounded-xl hover:bg-primary/20 transition-colors font-semibold"
              >
                <Phone className="h-5 w-5" />
                +420 730 431 313
              </a>
              <a 
                href="mailto:terc@obchod.poda.cz"
                className="flex items-center gap-3 bg-secondary border border-border text-foreground px-6 py-3 rounded-xl hover:bg-secondary/80 transition-colors font-semibold"
              >
                <Mail className="h-5 w-5" />
                terc@obchod.poda.cz
              </a>
            </div>

            <Link to="/kontakt" className="btn-gold px-8 py-3 rounded-xl text-base font-semibold inline-block">
              Kontaktní formulář
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ONas;
