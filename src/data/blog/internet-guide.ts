
import type { BlogPost } from './types';
import { introSection } from './content/internet-guide-intro';
import { citiesSection } from './content/internet-guide-cities';
import { technologySection } from './content/internet-guide-technology';
import { selectionSection } from './content/internet-guide-selection';
import { conclusionSection } from './content/internet-guide-conclusion';

export const internetGuidePost: BlogPost = {
  id: 101,
  title: "Jak najít nejlepší internet v Ostravě, Karviné a Havířově: Kompletní průvodce pro rok 2025",
  excerpt: "Kompletní průvodce výběrem nejlepšího internetového připojení v Ostravě, Karviné a Havířově pro rok 2025. Porovnání technologií, poskytovatelů a praktické tipy pro domácnosti i firmy.",
  content: `
    ${introSection}
    ${citiesSection}
    ${technologySection}
    ${selectionSection}
    ${conclusionSection}
  `,
  date: "23. 6. 2025",
  author: "Milan Terč",
  category: "Tipy a rady",
  image: "/lovable-uploads/4f53eb71-2c7a-4280-9b37-19e17047d420.png",
  alt: "Jak najít nejlepší internet v Ostravě, Karviné a Havířově - kompletní průvodce 2025",
  tags: [
    "internet Ostrava",
    "internet Karviná", 
    "internet Havířov",
    "PODA internet",
    "optické připojení",
    "průvodce 2025",
    "rychlý internet",
    "internetový poskytovatel",
    "srovnání internetu",
    "tarify internet"
  ]
};
