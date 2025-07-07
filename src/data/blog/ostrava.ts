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
  id: 500,
  title: 'Internet v Ostrave: Kde má PODA pokrytie v roku 2025',
  excerpt: 'Kompletný prehľad internetového pokrytia PODA v Ostrave. Ceny, dostupnosť, porovnanie s konkurenciou a ako si objednať.',
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
  date: '3. 7. 2025',
  author: 'Milan Terč',
  category: 'Tipy a rady',
  image: '/lovable-uploads/ostrava-internet-poda-2025.jpg',
  alt: 'PODA internet v Ostrave - pokrytie mestských častí 2025',
  tags: ['Ostrava', 'PODA', 'internet', 'pokrytie', 'ceny', 'Poruba', 'Vítkovice', 'Moravská Ostrava']
};
