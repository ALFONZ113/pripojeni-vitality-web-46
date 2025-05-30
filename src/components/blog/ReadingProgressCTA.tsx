
import { useState, useEffect } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';

interface ReadingProgressCTAProps {
  postTitle: string;
  category: string;
}

const ReadingProgressCTA = ({ postTitle, category }: ReadingProgressCTAProps) => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / total;

      // Show CTA when user has read 70% of content
      if (progress > 0.7 && !show) {
        setShow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [show, dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const getCtaMessage = (category: string) => {
    switch (category) {
      case 'Technologie':
        return 'Potrebujete pomoc s technickým nastavením?';
      case 'Služby':
        return 'Zaujíma vás naša ponuka služieb?';
      case 'Tipy':
        return 'Chcete viac tipov pre optimálne pripojenie?';
      default:
        return 'Máte otázky k pripojeniu?';
    }
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-slide-up">
        <div className="flex items-start justify-between mb-3">
          <div className="text-sm">
            <p className="font-medium text-gray-800 mb-1">
              {getCtaMessage(category)}
            </p>
            <p className="text-gray-600 text-xs">
              Milan Terč vám rád poradí
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href="tel:+420774100200"
            className="flex-1 flex items-center justify-center px-3 py-2 bg-poda-blue text-white rounded-md hover:bg-poda-blue-dark transition-colors text-sm"
          >
            <Phone className="h-3 w-3 mr-1" />
            Zavolať
          </a>
          <a 
            href="/kontakt"
            className="flex-1 flex items-center justify-center px-3 py-2 border border-poda-blue text-poda-blue rounded-md hover:bg-blue-50 transition-colors text-sm"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Napísať
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReadingProgressCTA;
