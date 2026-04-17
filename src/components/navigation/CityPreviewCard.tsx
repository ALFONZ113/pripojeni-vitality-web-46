import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Tv, Wrench, Phone } from 'lucide-react';
import { CityData } from '@/data/cities/citiesData';

interface CityPreviewCardProps {
  city: CityData;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

const CityPreviewCard: React.FC<CityPreviewCardProps> = ({ 
  city, 
  variant = 'desktop',
  onNavigate 
}) => {
  const benefits = [
    { icon: Zap, label: '1000 Mbps' },
    { icon: Tv, label: '85+ programů' },
    { icon: Wrench, label: 'Instalace 0 Kč' },
    { icon: Phone, label: 'Podpora 24/7' },
  ];

  if (variant === 'mobile') {
    return (
      <div className="bg-secondary/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 mt-2">
        {/* Price Headline */}
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gradient-gold font-heading">
            Gigabit jen za 300 Kč
          </h4>
          <p className="text-sm text-muted-foreground">měsíčně s TV v ceně</p>
        </div>

        {/* Benefits - horizontal scroll on mobile */}
        <div className="flex flex-wrap gap-2 mb-3">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-1.5 text-xs bg-background/50 px-2 py-1 rounded-lg"
            >
              <benefit.icon className="h-3 w-3 text-primary" />
              <span className="text-foreground/80">{benefit.label}</span>
            </div>
          ))}
        </div>

        {/* Districts for Ostrava */}
        {city.districts && city.districts.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1.5">Čtvrti:</p>
            <div className="flex flex-wrap gap-1">
              {city.districts.slice(0, 5).map((district, idx) => (
                <span 
                  key={district.name}
                  className="text-xs text-foreground/70"
                >
                  {district.name}
                  {idx < Math.min(city.districts!.length - 1, 4) && (
                    <span className="text-primary mx-1">•</span>
                  )}
                </span>
              ))}
              {city.districts.length > 5 && (
                <span className="text-xs text-muted-foreground">+{city.districts.length - 5}</span>
              )}
            </div>
          </div>
        )}

        {/* Highlight */}
        {city.highlight && (
          <p className="text-xs text-muted-foreground italic mb-3 line-clamp-2">
            "{city.highlight}"
          </p>
        )}

        {/* CTA */}
        <Link
          to={`/internet-${city.slug}`}
          onClick={onNavigate}
          className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-center py-2.5 rounded-lg font-semibold text-sm transition-colors"
        >
          Zobrazit detail →
        </Link>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="w-72 p-4">
      {/* City Name */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🏙️</span>
        <h4 className="text-lg font-bold text-foreground font-heading uppercase tracking-wide">
          {city.name}
        </h4>
      </div>

      {/* Price Headline */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gradient-gold font-heading">
          Gigabit jen za 300 Kč
        </h3>
        <p className="text-sm text-muted-foreground">měsíčně s TV v ceně</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50 mb-4" />

      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {benefits.map((benefit, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-2 text-sm"
          >
            <benefit.icon className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-foreground/80">{benefit.label}</span>
          </div>
        ))}
      </div>

      {/* Highlight */}
      {city.highlight && (
        <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">
          "{city.highlight}"
        </p>
      )}

      {/* Districts for Ostrava */}
      {city.districts && city.districts.length > 0 && (
        <div className="mb-4 p-2 bg-background/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1.5">Čtvrti s pokrytím:</p>
          <div className="flex flex-wrap gap-1">
            {city.districts.slice(0, 4).map((district, idx) => (
              <span 
                key={district.name}
                className="text-xs text-foreground/70 hover:text-primary transition-colors cursor-default"
              >
                {district.name}
                {idx < Math.min(city.districts!.length - 1, 3) && (
                  <span className="text-primary mx-1">•</span>
                )}
              </span>
            ))}
            {city.districts.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">+{city.districts.length - 4} dalších</span>
            )}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex gap-2">
        <Link
          to={`/internet-${city.slug}`}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-center py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          Zobrazit detail
        </Link>
        <a
          href="tel:+420730431313"
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary hover:bg-secondary/80 border border-border/50 rounded-lg text-sm text-foreground transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

export default React.memo(CityPreviewCard);
