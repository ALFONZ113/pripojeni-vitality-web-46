
import React from 'react';
import { Helmet } from 'react-helmet';

const CookiesPolicy = () => {
  return (
    <div className="bg-white py-16">
      <Helmet>
        <title>Zásady používání cookies | Připojení-PODA.cz</title>
        <meta name="description" content="Informace o používání cookies na webu Připojení-PODA.cz" />
      </Helmet>
      
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-poda-blue mb-8">Zásady používání cookies</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">1. Co jsou cookies?</h2>
          <p>
            Cookies jsou malé textové soubory, které jsou ukládány ve vašem prohlížeči nebo 
            zařízení během návštěvy webových stránek. Tyto soubory umožňují webovým stránkám 
            zapamatovat si vaše akce a preference (jako přihlašovací údaje, jazyk, velikost 
            písma a další zobrazovací preference) po určitou dobu, abyste je nemuseli znovu 
            zadávat při každé návštěvě webových stránek.
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">2. Jaké cookies používáme?</h2>
          <p>
            Na našich webových stránkách Připojení-PODA.cz používáme následující typy cookies:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-6">
            <li>
              <strong>Nezbytné cookies</strong> - tyto cookies jsou nezbytné pro fungování 
              našich webových stránek. Bez těchto cookies by stránky nefungovaly správně. 
              Tyto cookies nesbírají žádné informace, které by mohly být použity pro 
              marketingové účely.
            </li>
            <li>
              <strong>Analytické cookies</strong> - tyto cookies nám pomáhají analyzovat, 
              jak návštěvníci používají naše webové stránky. Tyto informace používáme 
              ke zlepšování našich stránek a zlepšování uživatelského zážitku.
            </li>
            <li>
              <strong>Funkční cookies</strong> - tyto cookies umožňují webovým stránkám 
              zapamatovat si volby, které jste učinili (jako je jazyk nebo region) a 
              poskytují vylepšené, personalizované funkce.
            </li>
            <li>
              <strong>Marketingové cookies</strong> - tyto cookies se používají ke sledování 
              návštěvníků na webových stránkách. Záměrem je zobrazovat reklamy, které jsou 
              relevantní a zajímavé pro jednotlivé uživatele.
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">3. Seznam používaných cookies</h2>
          <p>
            Zde je seznam konkrétních cookies, které používáme:
          </p>
          <table className="min-w-full border border-gray-300 mt-4 mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">Název</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Typ</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Účel</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Doba trvání</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">_ga</td>
                <td className="px-4 py-2 border border-gray-300">Analytické</td>
                <td className="px-4 py-2 border border-gray-300">Google Analytics - rozlišování uživatelů</td>
                <td className="px-4 py-2 border border-gray-300">2 roky</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">_gid</td>
                <td className="px-4 py-2 border border-gray-300">Analytické</td>
                <td className="px-4 py-2 border border-gray-300">Google Analytics - rozlišování uživatelů</td>
                <td className="px-4 py-2 border border-gray-300">24 hodin</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">_gat</td>
                <td className="px-4 py-2 border border-gray-300">Analytické</td>
                <td className="px-4 py-2 border border-gray-300">Google Analytics - omezení počtu požadavků</td>
                <td className="px-4 py-2 border border-gray-300">1 minuta</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">session_id</td>
                <td className="px-4 py-2 border border-gray-300">Nezbytné</td>
                <td className="px-4 py-2 border border-gray-300">Udržení relace návštěvníka</td>
                <td className="px-4 py-2 border border-gray-300">Po dobu relace</td>
              </tr>
            </tbody>
          </table>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">4. Jak kontrolovat cookies?</h2>
          <p>
            Většina webových prohlížečů je nastavena tak, aby automaticky přijímala cookies. 
            Nicméně, můžete změnit nastavení svého prohlížeče tak, aby cookies blokoval nebo 
            aby vás informoval o odesílání cookies. Postupy pro blokování cookies se v různých 
            prohlížečích liší. Informace o nastavení cookies můžete najít v nápovědě vašeho prohlížeče.
          </p>
          <p className="mt-2">
            Vezměte prosím na vědomí, že pokud cookies zablokujete, nebudete moci využívat 
            všechny funkce našich webových stránek.
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">5. Cookies třetích stran</h2>
          <p>
            Naše webové stránky mohou obsahovat cookies třetích stran, především od 
            společnosti Google (Google Analytics). Tyto cookies nám pomáhají analyzovat 
            provoz na našich stránkách.
          </p>
          <p className="mt-2">
            Informace generované cookies o vašem používání našich webových stránek 
            (včetně vaší IP adresy) budou předány a uloženy společností Google na 
            serverech ve Spojených státech amerických. Společnost Google tyto informace 
            používá k vyhodnocení vašeho používání webových stránek, sestavování přehledů 
            o aktivitě webových stránek pro provozovatele webových stránek a poskytování 
            dalších služeb týkajících se aktivit webových stránek a používání internetu.
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">6. Aktualizace zásad používání cookies</h2>
          <p>
            Tyto zásady používání cookies mohou být příležitostně aktualizovány. 
            Aktuální verze je vždy k dispozici na této webové stránce.
          </p>
          <p className="mt-2">
            Poslední aktualizace: 17. dubna 2025
          </p>
          
          <h2 className="text-xl font-semibold text-poda-blue mt-8 mb-4">7. Kontaktní údaje</h2>
          <p>
            Pokud máte jakékoli dotazy týkající se našich zásad používání cookies, 
            neváhejte nás kontaktovat na:
          </p>
          <p className="mt-2">
            E-mail: <a href="mailto:terc@obchod.poda.cz" className="text-poda-orange hover:underline">terc@obchod.poda.cz</a><br />
            Telefon: <a href="tel:+420730431313" className="text-poda-orange hover:underline">+420 730 431 313</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
