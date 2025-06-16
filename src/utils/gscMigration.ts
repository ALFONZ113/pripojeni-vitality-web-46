
/**
 * Google Search Console Migration Helper
 * Pomôcky pre správnu migráciu v GSC
 */

export interface GSCMigrationStep {
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  instructions: string[];
}

/**
 * Kompletnỳ checklist pre migráciu v Google Search Console
 */
export const getGSCMigrationSteps = (): GSCMigrationStep[] => {
  return [
    {
      title: "Verifikácia novej domény v GSC",
      description: "Pridať www.popri.cz do Google Search Console",
      completed: false,
      priority: 'high',
      instructions: [
        "Ísť do Google Search Console (search.google.com/search-console)",
        "Kliknúť na 'Pridať property'",
        "Vybrať 'Domain property' a zadať 'popri.cz'",
        "Verifikovať cez DNS TXT záznam alebo HTML súbor",
        "Počkať na potvrdenie verifikácie"
      ]
    },
    {
      title: "Nastavenie Change of Address",
      description: "Nastaviť presmerovanie starej domény v GSC",
      completed: false,
      priority: 'high',
      instructions: [
        "V GSC pre pripojeni-poda.cz ísť do Settings",
        "Vybrať 'Change of Address'",
        "Zadať novú doménu: www.popri.cz",
        "Potvrdiť, že 301 redirecty fungujú",
        "Odoslať žiadosť o migráciu"
      ]
    },
    {
      title: "Odoslanie sitemap na novej doméne",
      description: "Pridať sitemap.xml pre www.popri.cz",
      completed: false,
      priority: 'high',
      instructions: [
        "V GSC pre www.popri.cz ísť do Sitemaps",
        "Pridať URL: https://www.popri.cz/sitemap.xml",
        "Odoslať sitemap",
        "Skontrolovať úspešné spracovanie",
        "Monitorovať indexovanie nových URL"
      ]
    },
    {
      title: "Kontrola 301 redirectov",
      description: "Overiť, že všetky redirecty správne fungujú",
      completed: false,
      priority: 'high',
      instructions: [
        "Otestovať náhodné URL zo starej domény",
        "Skontrolovať HTTP response code 301",
        "Overiť, že redirect smeruje na www.popri.cz",
        "Testovať rôzne typy stránok (blog, kontakt, atď.)",
        "Použiť nástroje ako redirectchecker.org"
      ]
    },
    {
      title: "Monitoring indexovania",
      description: "Sledovať progress migrácie v GSC",
      completed: false,
      priority: 'medium',
      instructions: [
        "Denné kontrolovanie Index Coverage reportu",
        "Sledovanie nových vs. starých URL v indexe",
        "Kontrola 404 chýb po migrácii",
        "Monitoring organického trafficu",
        "Sledovanie pozícií kľúčových slov"
      ]
    },
    {
      title: "Aktualizácia externých odkazov",
      description: "Informovanie partnerov o zmene domény",
      completed: false,
      priority: 'medium',
      instructions: [
        "Identifikovať hlavné backlink sources",
        "Kontaktovať partnerov s žiadosťou o aktualizáciu",
        "Aktualizovať odkazy v social media profiloch",
        "Zmeniť odkazy v email podpisoch",
        "Aktualizovať business listings (Google My Business, atď.)"
      ]
    },
    {
      title: "Cleanup starej domény",
      description: "Postupné odstránenie starej domény z indexu",
      completed: false,
      priority: 'low',
      instructions: [
        "Po 6 mesiacoch skontrolovať index coverage",
        "Ak sú staré URL stále indexované, použiť removal tool",
        "Zachovať redirecty minimálne 1 rok",
        "Monitorovať 404 chyby na starej doméne",
        "Plánovať konečné vypnutie starej domény"
      ]
    }
  ];
};

/**
 * Generuje URL pre testovanie redirectov
 */
export const getTestUrls = () => {
  const oldDomain = 'https://pripojeni-poda.cz';
  const newDomain = 'https://www.popri.cz';
  
  const testPaths = [
    '',
    '/blog',
    '/blog/1',
    '/kontakt',
    '/tarify',
    '/internet-ostrava',
    '/internet-karvina'
  ];
  
  return testPaths.map(path => ({
    old: `${oldDomain}${path}`,
    expected: `${newDomain}${path}`,
    description: path || 'Homepage'
  }));
};

/**
 * Inštrukcie pre DNS nastavenie
 */
export const getDNSInstructions = () => {
  return {
    title: "DNS nastavenie pre migráciu",
    steps: [
      {
        type: "TXT record",
        name: "@",
        value: "google-site-verification=VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA",
        description: "Google Search Console verifikácia"
      },
      {
        type: "CNAME record", 
        name: "www",
        value: "popri.cz",
        description: "Redirect www.popri.cz na popri.cz"
      },
      {
        type: "A record",
        name: "@",
        value: "Váš hosting IP",
        description: "Hlavnỳ A record pre popri.cz"
      }
    ]
  };
};

/**
 * Exportuje migračné dáta pre externé nástroje
 */
export const exportMigrationData = () => {
  const data = {
    migration: {
      from: "pripojeni-poda.cz",
      to: "www.popri.cz", 
      date: "2025-06-16",
      type: "301_permanent_redirect"
    },
    steps: getGSCMigrationSteps(),
    testUrls: getTestUrls(),
    dnsInstructions: getDNSInstructions()
  };
  
  return JSON.stringify(data, null, 2);
};
