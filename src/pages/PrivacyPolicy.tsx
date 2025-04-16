
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-16">
      <Helmet>
        <title>Ochrana soukromí | Připojení-PODA.cz</title>
        <meta name="description" content="Zásady ochrany osobních údajů a soukromí zákazníků Připojení-PODA.cz" />
      </Helmet>
      
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-poda-blue mb-8">Ochrana soukromí</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">1. Úvod</h2>
          <p>
            Tato stránka obsahuje informace o tom, jak Milan Terč, obchodní zástupce společnosti PODA a.s., 
            zpracovává osobní údaje zákazníků a návštěvníků webu Připojení-PODA.cz v souladu s 
            Nařízením Evropského parlamentu a Rady (EU) 2016/679 ze dne 27. dubna 2016 o ochraně 
            fyzických osob v souvislosti se zpracováním osobních údajů (GDPR).
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">2. Správce osobních údajů</h2>
          <p>
            Správcem osobních údajů je Milan Terč, IČO: 75546230, se sídlem Porubská 944/5, 708 00, 
            Ostrava - Poruba, zapsán v živnostenském rejstříku (dále jen "správce").
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">3. Kategorie zpracovávaných osobních údajů</h2>
          <p>
            Zpracováváme následující kategorie osobních údajů:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Identifikační údaje (jméno, příjmení)</li>
            <li>Kontaktní údaje (e-mail, telefon, adresa)</li>
            <li>Údaje o objednávkách a smlouvách</li>
            <li>Technické údaje o používání webu (cookies, IP adresa)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">4. Účely zpracování osobních údajů</h2>
          <p>
            Osobní údaje zpracováváme pro následující účely:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Uzavření a plnění smlouvy o poskytování služeb</li>
            <li>Komunikace se zákazníky</li>
            <li>Marketing a zasílání obchodních sdělení</li>
            <li>Plnění zákonných povinností</li>
            <li>Ochrana našich práv a oprávněných zájmů</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">5. Právní základ zpracování</h2>
          <p>
            Osobní údaje zpracováváme na základě následujících právních titulů:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Plnění smlouvy</li>
            <li>Plnění právní povinnosti</li>
            <li>Oprávněný zájem správce</li>
            <li>Souhlas subjektu údajů</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">6. Doba zpracování osobních údajů</h2>
          <p>
            Osobní údaje zpracováváme po dobu nezbytně nutnou k naplnění účelu zpracování, 
            nejdéle však po dobu stanovenou právními předpisy nebo po dobu trvání souhlasu.
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">7. Příjemci osobních údajů</h2>
          <p>
            Osobní údaje můžeme předávat následujícím kategoriím příjemců:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Společnost PODA a.s. jako poskytovatel telekomunikačních služeb</li>
            <li>Poskytovatelé IT služeb a hostingu</li>
            <li>Účetní a daňoví poradci</li>
            <li>Orgány veřejné moci v případech stanovených zákonem</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">8. Práva subjektů údajů</h2>
          <p>
            Jako subjekt údajů máte následující práva:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Právo na přístup k osobním údajům</li>
            <li>Právo na opravu nepřesných údajů</li>
            <li>Právo na výmaz (právo být zapomenut)</li>
            <li>Právo na omezení zpracování</li>
            <li>Právo na přenositelnost údajů</li>
            <li>Právo vznést námitku proti zpracování</li>
            <li>Právo nebýt předmětem automatizovaného rozhodování</li>
            <li>Právo podat stížnost u dozorového úřadu (Úřad pro ochranu osobních údajů)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">9. Kontaktní údaje</h2>
          <p>
            V případě jakýchkoliv dotazů nebo žádostí týkajících se zpracování osobních údajů 
            nás můžete kontaktovat na:
          </p>
          <p className="mt-2">
            E-mail: <a href="mailto:terc@obchod.poda.cz" className="text-poda-orange hover:underline">terc@obchod.poda.cz</a><br />
            Telefon: <a href="tel:+420730431313" className="text-poda-orange hover:underline">+420 730 431 313</a><br />
            Adresa: Porubská 944/5, 708 00, Ostrava - Poruba
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">10. Aktualizace zásad ochrany soukromí</h2>
          <p>
            Tyto zásady ochrany soukromí mohou být příležitostně aktualizovány. Aktuální verze 
            je vždy k dispozici na této webové stránce.
          </p>
          <p className="mt-2">
            Poslední aktualizace: 17. dubna 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
