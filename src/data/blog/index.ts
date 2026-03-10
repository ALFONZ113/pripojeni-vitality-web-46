
import { BlogPost, categories } from './types';
import { technologiePosts } from './technologie';
import { sluzbyPosts } from './sluzby';
import { tipyPosts } from './tipy';
import { karvinaPost } from './karvina';
import { novinyPosts } from './noviny';
import { recenziePosts } from './recenzie';
import { ostravaPost } from './ostrava';
import { internetGuidePost } from './internet-guide';
import { slowInternetFixPost } from './slow-internet-fix';
import { gamingOstravaPost } from './gaming-ostrava';
import { polanka60ghzPost } from './polanka-60ghz';
import { panelakOtazkyPost } from './panelak-otazky';
import { iptvVsTradicionalniTvPost } from './iptv-vs-traditionalni-tv';

import { o2NejPrevzatiePodaAlternativaPost } from './o2-nej-prevzatie-poda-alternativa';
import { gponTechnologie } from './gpon-technologie';
import { internetVyberChybyPost } from './internet-vyber-chyby';
import { wifiSignalZlepseniePost } from './wifi-signal-zlepsenie';
import { homeOffice2025Post } from './home-office-2025';
import { podaInternet2026Post } from './poda-internet-2026';
import { mytyOptickyInternetPost } from './myty-opticky-internet';
import { pomalyInternetVecerPost } from './pomaly-internet-vecer';
import { aiMeniSvetInternetPost } from './ai-meni-svet-internet';
import { operatoriCenyInternetuPost } from './operatori-ceny-internetu';
import { vypadekInternetu24hPost } from './vypadek-internetu-24h';
import { ostravaGigabitPromoPost } from './ostrava-gigabit-promo';

// Combine all posts from different categories
export const blogPosts: BlogPost[] = [
  ostravaGigabitPromoPost, // Nejnovější - Ostrava gigabit promo
  vypadekInternetu24hPost, // Co se stane při výpadku
  operatoriCenyInternetuPost,
  aiMeniSvetInternetPost, // Jak AI mění svět
  pomalyInternetVecerPost, // Proč internet zpomaluje večer
  mytyOptickyInternetPost, // Mýty o optickém internetu
  podaInternet2026Post,
  homeOffice2025Post,
  wifiSignalZlepseniePost, // Ako zlepšiť WiFi signál
  internetVyberChybyPost, // Ako si vybrať internet do bytu
  gponTechnologie, // GPON technologie
  o2NejPrevzatiePodaAlternativaPost, // O2 Nej.cz prevzatie
  iptvVsTradicionalniTvPost, // IPTV vs tradiční TV
  panelakOtazkyPost, // FAQ panelák
  polanka60ghzPost, // PODA Super 2025
  gamingOstravaPost,
  slowInternetFixPost,
  internetGuidePost,
  ...sluzbyPosts,
  ...technologiePosts,
  ...tipyPosts,
  karvinaPost,
  ...novinyPosts,
  ...recenziePosts,
  ostravaPost,
];

// Export everything
export * from './types';
export * from './technologie';
export * from './sluzby';
export * from './tipy';
export * from './karvina';
export * from './noviny';
export * from './recenzie';
export * from './ostrava';
export * from './internet-guide';
export * from './slow-internet-fix';
export * from './gaming-ostrava';
export * from './polanka-60ghz';
export * from './panelak-otazky';
export * from './iptv-vs-traditionalni-tv';
export * from './o2-nej-prevzatie-poda-alternativa';
export * from './gpon-technologie';
export * from './internet-vyber-chyby';
export * from './wifi-signal-zlepsenie';
export * from './home-office-2025';
export * from './poda-internet-2026';
export * from './myty-opticky-internet';
export * from './pomaly-internet-vecer';
export * from './ai-meni-svet-internet';
export * from './operatori-ceny-internetu';
export * from './vypadek-internetu-24h';
export * from './ostrava-gigabit-promo';

// Note: WiFi blog slug changed to Czech: jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025
