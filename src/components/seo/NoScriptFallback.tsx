
import React from 'react';

/**
 * NoScriptFallback component that renders a static version of the website for users with JavaScript disabled
 * This component is used directly in the index.html file as string content
 */
const NoScriptFallback = () => {
  return (
    <div className="noscript-container">
      <div className="noscript-header">
        <img src="/poda-logo.svg" alt="PODA Logo" className="noscript-logo" width="150" height="70" />
        <h1 className="noscript-title">Popri.cz - PODA Internet</h1>
        <p className="noscript-subtitle">Rychlý internet s TV zdarma</p>
      </div>
      
      <div className="noscript-section">
        <h2>Naše internetové tarify</h2>
        
        <h3>Pro byty:</h3>
        <div className="noscript-tariff">
          <h3>Internet + TV Basic</h3>
          <p className="noscript-tariff-price">250 Kč měsíčně + 50 Kč za zařízení</p>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Internet 1000/1000 Mbps</strong>
              <p>Symetrická rychlost pomocí GPON technologie</p>
            </div>
          </div>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Více než 85 TV programů</strong>
              <p>Automaticky v ceně</p>
            </div>
          </div>
        </div>
        
        <div className="noscript-tariff">
          <h3>Internet + TV Mých 10</h3>
          <p className="noscript-tariff-price">390 Kč měsíčně + 50 Kč za zařízení</p>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Internet 1000/1000 Mbps</strong>
              <p>Symetrická rychlost pomocí GPON technologie</p>
            </div>
          </div>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Více než 100 TV programů</strong>
              <p>Možnost výběru 10 vlastních stanic</p>
            </div>
          </div>
        </div>
        
        <h3>Pro domy:</h3>
        <div className="noscript-tariff">
          <h3>Internet + TV Basic</h3>
          <p className="noscript-tariff-price">250 Kč měsíčně + 50 Kč za zařízení</p>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Internet 500/200 Mbps</strong>
              <p>Bezdrátový internet s rychlostí optického</p>
            </div>
          </div>
          <div className="noscript-feature">
            <span className="noscript-feature-check">✓</span>
            <div>
              <strong>Více než 85 TV programů</strong>
              <p>Automaticky v ceně</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="noscript-section">
        <h2>Proč zvolit internet od Popri.cz</h2>
        <div className="noscript-feature">
          <span className="noscript-feature-check">✓</span>
          <div>
            <strong>Rychlý optický internet</strong>
            <p>PODA připojení od Popri.cz s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost</p>
          </div>
        </div>
        <div className="noscript-feature">
          <span className="noscript-feature-check">✓</span>
          <div>
            <strong>Chytrá televize</strong>
            <p>S Popri.cz získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic</p>
          </div>
        </div>
        <div className="noscript-feature">
          <span className="noscript-feature-check">✓</span>
          <div>
            <strong>Moderní technologie</strong>
            <p>Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů</p>
          </div>
        </div>
      </div>
      
      <div className="noscript-contact">
        <h2>Kontaktujte nás</h2>
        <p>Pro objednání služeb nebo získání dalších informací nás neváhejte kontaktovat:</p>
        <a href="tel:+420730431313" className="noscript-phone">+420 730 431 313</a>
        <p><strong>Email:</strong> info@popri.cz</p>
        <p><strong>Adresa:</strong> Ostrava - Poruba, Porubská 944/5, 708 00</p>
        <p>Provozováno obchodním zástupcem společnosti PODA, Milan Terč, IČO: 75546230</p>
      </div>
    </div>
  );
};

export default NoScriptFallback;
