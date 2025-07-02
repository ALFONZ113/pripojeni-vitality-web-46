
import type { BlogPost } from './types';
import { introSection } from './content/ostrava-intro';
import { karvinaSection, havirovSection, bohuminSection, orlovaSection } from './content/ostrava-cities';
import { popriSection, comparisonTable } from './content/ostrava-popri';
import { ostravaTariffs, generateTariffTable } from './content/ostrava-tariffs';
import { 
  technicalSection, 
  seoSection, 
  orderingSection, 
  supportSection, 
  reviewsSection, 
  futureSection, 
  conclusionSection 
} from './content/ostrava-remaining';

export const ostravaPost: BlogPost = {
  id: 16,
  title: 'Internet PODA Ostrava: Nejrychlejší optické připojení v Moravskoslezském kraji 2025',
  excerpt: 'Hledáte rychlý internet v Ostravě? Potřebujete spolehlivé připojení v Karviné nebo optický internet v Havířově? Společnost PODA prostřednictvím platformy Popri.cz nabízí nejkonkurenceschopnější internetové služby v celém Moravskoslezském kraji.',
  content: `
    ${introSection}

    ${karvinaSection}

    ${havirovSection}

    ${bohuminSection}

    ${orlovaSection}

    ${popriSection}
    ${generateTariffTable(ostravaTariffs)}

    ${comparisonTable}

    ${technicalSection}

    ${seoSection}

    ${orderingSection}

    ${supportSection}

    ${reviewsSection}

    ${futureSection}

    ${conclusionSection}
  `,
  date: '13. 06. 2025',
  author: 'Milan Terč',
  category: 'Služby',
  image: '/lovable-uploads/d043e07c-8916-4d2d-b35d-8f0ba81b4ebc.png',
  alt: 'Rychlý optický internet PODA Ostrava s moderním vlakem v pozadí',
  tags: ["PODA", "Popri.cz", "Internet", "Ostrava", "Karviná", "Havířov", "Bohumín", "Orlová", "Moravskoslezský kraj", "Optické připojení", "GPON", "Rychlý internet", "Služby"],
};
