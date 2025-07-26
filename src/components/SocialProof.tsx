import React from 'react';
import { Star, Users, CheckCircle, Clock } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    {
      icon: <Users className="h-5 w-5 text-poda-blue" />,
      number: "2000+",
      label: "Spokojných zákazníkov"
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      number: "4.8/5",
      label: "Hodnotenie zákazníkov"
    },
    {
      icon: <Clock className="h-5 w-5 text-green-500" />,
      number: "",
      label: "Rýchla inštalácia"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      number: "99.9%",
      label: "Dostupnosť služby"
    }
  ];

  const testimonials = [
    {
      name: "Martin K.",
      city: "Ostrava",
      text: "Najrychlejší internet v okolí. TV zdarma je super bonus!"
    },
    {
      name: "Jana P.", 
      city: "Poruba",
      text: "Konečne internet ktorý funguje bez výpadkov. Odporúčam!"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-poda-blue mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-poda-blue">
            Čo hovoria naši zákazníci
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="text-sm font-semibold text-poda-blue">
                  {testimonial.name} - {testimonial.city}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center space-x-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>SSL Zabezpečené</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>24/7 Podpora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;