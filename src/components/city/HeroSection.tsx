
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

type HeroSectionProps = {
  cityName: string;
  description: string;
  benefits: string[];
  descriptionRef: React.RefObject<HTMLParagraphElement>;
  editableDescription: string;
};

const HeroSection = ({ 
  cityName, 
  description, 
  benefits, 
  descriptionRef, 
  editableDescription 
}: HeroSectionProps) => {
  return (
    <div className="container-custom mb-20">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-3/5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-poda-blue mb-4">
              Rychlý internet PODA v {cityName}
            </h1>
            <p ref={descriptionRef} className="text-lg text-gray-600 mb-6">
              {editableDescription}
            </p>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-poda-orange flex-shrink-0 mt-1 mr-2" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/internet-tv" className="btn-primary">
                Zobrazit nabídku
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/kontakt" className="btn-outline">
                Kontaktujte nás
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
