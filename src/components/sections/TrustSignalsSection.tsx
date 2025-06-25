
import React from 'react';
import { Shield, Clock, Users, Award, CheckCircle, Star } from 'lucide-react';

const trustSignals = [
  {
    icon: Shield,
    title: "100% Spoľahlivosť",
    description: "99.9% uptime záruka",
    color: "text-green-600"
  },
  {
    icon: Clock,
    title: "24/7 Podpora",
    description: "Non-stop technická pomoc",
    color: "text-blue-600"
  },
  {
    icon: Users,
    title: "5000+ Spokojných zákazníkov",
    description: "V Ostrave a okolí",
    color: "text-purple-600"
  },
  {
    icon: Award,
    title: "10+ Rokov skúseností",
    description: "S PODA technológiou",
    color: "text-orange-600"
  }
];

const certifications = [
  {
    name: "PODA Certifikovaný partner",
    description: "Oficiálny distribútor PODA služieb"
  },
  {
    name: "Certifikácia kvality ISO",
    description: "Medzinárodné štandardy kvality"
  },
  {
    name: "Bezpečnosť dát GDPR",
    description: "Plná ochrana osobných údajov"
  }
];

const testimonialHighlights = [
  {
    rating: 5,
    text: "Najrychlejší internet v Ostrave!",
    author: "Jana K., Poruba"
  },
  {
    rating: 5,
    text: "Bezproblémová inštalácia, perfektná podpora",
    author: "Martin P., Vítkovice"
  },
  {
    rating: 5,
    text: "Konečne stabilný internet pre prácu z domu",
    author: "Eva S., Mariánské Hory"
  }
];

const TrustSignalsSection = () => {
  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="container-custom">
        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustSignals.map((signal, index) => {
            const IconComponent = signal.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 group-hover:bg-gray-100 transition-colors p-6 rounded-xl mb-4">
                  <IconComponent className={`w-8 h-8 ${signal.color} mx-auto mb-3`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{signal.title}</h3>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-poda-blue mb-8">
            Certifikácie a záruky kvality
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Testimonials */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-poda-blue mb-8">
            Čo hovoria naši zákazníci
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialHighlights.map((testimonial, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-xl">
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 font-medium">"{testimonial.text}"</p>
                <p className="text-sm text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
