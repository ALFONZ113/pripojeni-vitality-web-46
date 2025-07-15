import { Metadata } from 'next';
import InternetOstravaContent from './InternetOstravaContent';

export const metadata: Metadata = {
  title: 'Nejlepší poskytovatel internetu Ostrava | PODA GPON | Změna od konkurence | 730 431 313',
  description: 'Nejlepší internet PODA v Ostravě pro nespokojené zákazníky jiných poskytovatelů. Změna poskytovateľa internetu Ostrava jednoduše. GPON až 2000 Mbps, bezplatná instalace.',
  keywords: 'internet Ostrava, nejlepší poskytovatel internetu Ostrava, PODA Ostrava, změna poskytovateľa internet Ostrava',
  alternates: {
    canonical: 'https://www.popri.cz/internet-ostrava/',
  }
};

export default function InternetOstravaPage() {
  return <InternetOstravaContent />;
}