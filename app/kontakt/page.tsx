import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Kontakt | PODA Internet | Popri.cz',
  description: 'Kontaktujte nás pro informace o PODA internetových službách. Milan Terč - váš obchodní zástupce pro rychlé optické připojení.',
  openGraph: {
    title: 'Kontakt | PODA Internet | Popri.cz',
    description: 'Kontaktujte nás pro informace o PODA internetových službách.',
    url: 'https://www.popri.cz/kontakt/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.popri.cz/kontakt/',
  }
};

export default function ContactPage() {
  return <ContactContent />;
}