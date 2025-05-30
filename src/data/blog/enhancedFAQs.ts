
/**
 * Enhanced FAQ data for specific blog posts to improve Google snippets
 */

import type { FAQItem } from '../../utils/structuredData';

export const blogFAQs: Record<number, FAQItem[]> = {
  // GPON technologie blog
  7: [
    {
      question: "Čo je GPON technológia?",
      answer: "GPON (Gigabit Passive Optical Network) je technológia optických sietí, ktorá umožňuje prenos dát rýchlosťou až 2,5 Gbps pre download a 1,25 Gbps pre upload."
    },
    {
      question: "Aké sú výhody GPON oproti bežnému internetu?",
      answer: "GPON ponúka extrémne vysoké rýchlosti, nízku latenciu, stabilné pripojenie, symetrické rýchlosti a je pripravená na budúcnosť."
    },
    {
      question: "Je GPON dostupná vo všetkých mestách?",
      answer: "PODA postupne rozširuje GPON pokrytie. Dostupnosť môžete overiť na stránke popri.cz alebo kontaktovaním obchodného zástupcu."
    },
    {
      question: "Koľko stojí GPON pripojenie od PODA?",
      answer: "Ceny GPON pripojenia začínajú od 250 Kč mesačne za 1 Gbit/s pripojenie. Presné ceny závisia od vybratého balíčka a lokality."
    }
  ],

  // Karviná blog
  10: [
    {
      question: "Je PODA internet dostupný v celej Karviné?",
      answer: "Áno, PODA pokrýva všetky hlavné časti Karviné vrátane Ráje, Hraníc, Mizerova a centra mesta."
    },
    {
      question: "Koľko stojí internet v Karviné?",
      answer: "Optický internet 1 Gbit/s stojí 250 Kč mesačne, kombinovaný balíček s TV stojí 390 Kč mesačne."
    },
    {
      question: "Ako dlho trvá inštalácia internetu v Karviné?",
      answer: "Inštalácia obvykle trvá 1-2 pracovné dni od potvrdenia objednávky cez popri.cz."
    },
    {
      question: "Sú nejaké skryté poplatky?",
      answer: "Nie, PODA má transparentný cenník bez skrytých poplatkov. Cena zahŕňa všetky služby a technickú podporu."
    }
  ],

  // Router blog
  1: [
    {
      question: "Aký router je najlepší pre domácnosť?",
      answer: "Pre domácnosť odporúčame router s Wi-Fi 6 štandardom, dostatočným dosahom a pokročilými bezpečnostnými funkciami."
    },
    {
      question: "Poskytuje PODA router k pripojeniu?",
      answer: "Áno, PODA poskytuje kvalitný router s podporou najnovších Wi-Fi štandardov a pokročilými bezpečnostnými funkciami."
    },
    {
      question: "Môžem používať vlastný router s PODA internetom?",
      answer: "Áno, môžete používať vlastný router. Naši technici vám pomôžu s nastavením pre optimálny výkon."
    }
  ],

  // TV balíčky blog
  2: [
    {
      question: "Koľko kanálov obsahuje TV balíček od PODA?",
      answer: "Základný balíček obsahuje viac ako 100 programov, TV Mých 10 umožňuje vybrať si 10 vlastných prémiových staníc."
    },
    {
      question: "Sú v balíčku zahrnuté športové kanály?",
      answer: "Áno, PODA TV obsahuje športové kanály ako ČT Sport, Eurosport, Nova Sport a Arena Sport."
    },
    {
      question: "Môžem sledovať TV na viacerých zariadeniach?",
      answer: "Áno, s PODA net.TV môžete sledovať programy na akomkoľvek zariadení - tablet, telefón, počítač."
    }
  ]
};

/**
 * Get FAQs for a specific blog post
 */
export const getFAQsForPost = (postId: number): FAQItem[] => {
  return blogFAQs[postId] || [];
};
