
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Wifi, Tv } from 'lucide-react';
import { makeEditable, useEditableContent, isEditMode } from '../utils/editMode';
import { useToast } from '@/hooks/use-toast';

type CityLayoutProps = {
  cityName: string;
  cityDescription: string;
  metaTitle: string;
  metaDescription: string;
  benefits: string[];
  prices: {
    internet: string;
    tv: string;
    combo: string;
  };
};

const CityLayout: React.FC<CityLayoutProps> = ({
  cityName,
  cityDescription,
  metaTitle,
  metaDescription,
  benefits,
  prices
}) => {
  // For toast notifications
  const { toast } = useToast();
  
  // State to track whether edit elements have been initialized
  const [editInitialized, setEditInitialized] = useState(false);
  
  // For editable elements with better refs management
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const internetPriceRef = useRef<HTMLSpanElement>(null);
  const tvPriceRef = useRef<HTMLSpanElement>(null);
  const comboPriceRef = useRef<HTMLSpanElement>(null);
  
  // Get editable content with more descriptive keys
  const cityKey = cityName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const editableDescription = useEditableContent(`${cityKey}-description`, cityDescription);
  const editableInternetPrice = useEditableContent(`${cityKey}-internet-price`, prices.internet);
  const editableTvPrice = useEditableContent(`${cityKey}-tv-price`, prices.tv);
  const editableComboPrice = useEditableContent(`${cityKey}-combo-price`, prices.combo);

  console.log(`CityLayout rendering for ${cityName} with prices:`, {
    internet: editableInternetPrice,
    tv: editableTvPrice,
    combo: editableComboPrice
  });

  // Improved function to make elements editable
  const initializeEditableElements = useCallback(() => {
    console.log(`Initializing editable elements for: ${cityName}`);
    
    // Make description editable
    if (descriptionRef.current) {
      makeEditable(descriptionRef.current, `${cityKey}-description`);
    } else {
      console.warn(`Description ref not found for ${cityName}`);
    }
    
    // Make internet price editable
    if (internetPriceRef.current) {
      makeEditable(internetPriceRef.current, `${cityKey}-internet-price`);
    } else {
      console.warn(`Internet price ref not found for ${cityName}`);
    }
    
    // Make TV price editable
    if (tvPriceRef.current) {
      makeEditable(tvPriceRef.current, `${cityKey}-tv-price`);
    } else {
      console.warn(`TV price ref not found for ${cityName}`);
    }
    
    // Make combo price editable
    if (comboPriceRef.current) {
      makeEditable(comboPriceRef.current, `${cityKey}-combo-price`);
    } else {
      console.warn(`Combo price ref not found for ${cityName}`);
    }
    
    setEditInitialized(true);
    console.log(`Editable elements initialized for: ${cityName}`);
    
    // Show toast confirmation in edit mode
    if (isEditMode()) {
      toast({
        title: "Edit mód je aktivní",
        description: `Klikněte na zvýrazněné prvky pro úpravu obsahu v ${cityName}.`,
        duration: 5000,
      });
    }
  }, [cityName, cityKey, toast]);

  // Update metadata for SEO and initialize editable elements
  useEffect(() => {
    document.title = metaTitle;
    
    // Update meta description
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset edit initialization state when component updates
    setEditInitialized(false);
    
    // Initialize editable elements after a short delay to ensure refs are populated
    const timer = setTimeout(() => {
      initializeEditableElements();
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [cityName, metaTitle, metaDescription, initializeEditableElements]);
  
  // Add a listener for the content saved event
  useEffect(() => {
    const handleContentSaved = (event: CustomEvent) => {
      console.log('Content saved event detected:', event.detail);
      
      // Show confirmation toast
      toast({
        title: "Změny uloženy",
        description: `Upravený obsah pro ${cityName} byl úspěšně uložen.`,
        duration: 3000,
      });
      
      // Force re-initialization of editable elements
      setEditInitialized(false);
      setTimeout(() => initializeEditableElements(), 100);
    };
    
    // Add event listener with correct typing
    window.addEventListener('lovableContentSaved', handleContentSaved as EventListener);
    
    return () => {
      window.removeEventListener('lovableContentSaved', handleContentSaved as EventListener);
    };
  }, [cityName, initializeEditableElements, toast]);
  
  // Debug if edit mode is active
  const editModeActive = isEditMode();
  console.log(`Edit mode is: ${editModeActive ? 'ACTIVE' : 'INACTIVE'} for ${cityName}`);

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-custom mb-20">
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
            <div className="md:w-2/5 relative">
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-60" aria-hidden="true"></div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-orange-100 rounded-full filter blur-xl opacity-60" aria-hidden="true"></div>
              <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-poda-orange mr-2" />
                  <h2 className="text-xl font-semibold text-poda-blue">PODA internet {cityName}</h2>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-poda-blue mr-2" />
                      <p className="text-gray-700 font-medium">Internet</p>
                    </div>
                    <p className="text-2xl font-bold text-poda-blue mt-1">od <span ref={internetPriceRef}>{editableInternetPrice}</span> Kč/měsíc</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <Tv className="h-5 w-5 text-poda-blue mr-2" />
                      <p className="text-gray-700 font-medium">Televize</p>
                    </div>
                    <p className="text-2xl font-bold text-poda-blue mt-1">od <span ref={tvPriceRef}>{editableTvPrice}</span> Kč/měsíc</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-poda-orange mr-2" />
                      <Tv className="h-5 w-5 text-poda-orange mr-2" />
                      <p className="text-gray-700 font-medium">Kombinace</p>
                    </div>
                    <p className="text-2xl font-bold text-poda-orange mt-1">od <span ref={comboPriceRef}>{editableComboPrice}</span> Kč/měsíc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="container-custom mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-poda-blue mb-4">Pokrytí PODA v {cityName}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Podívejte se na mapu pokrytí internetového připojení PODA v {cityName} a okolí. 
            Jsme neustále v procesu rozšiřování našeho pokrytí.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 text-poda-blue/50 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">Mapa pokrytí pro {cityName}</p>
              <p className="text-sm text-gray-500 mt-2">
                Pro přesné informace o dostupnosti na vaší adrese nás kontaktujte
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/kontakt" className="btn-secondary">
              Ověřit dostupnost na vaší adrese
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-poda-blue mb-4">Časté dotazy</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Odpovědi na nejčastější otázky o připojení PODA v {cityName}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-poda-blue mb-3">Jak rychlý je internet PODA v {cityName}?</h3>
            <p className="text-gray-600">V {cityName} nabízíme připojení až 1000/1000 Mbps díky nejmodernější GPON technologii.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-poda-blue mb-3">Je internet PODA dostupný po celém {cityName}?</h3>
            <p className="text-gray-600">Pokrýváme většinu {cityName}, ale pro ověření dostupnosti na vaší adrese nás kontaktujte.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-poda-blue mb-3">Jaké TV programy mohu sledovat?</h3>
            <p className="text-gray-600">Nabízíme více než 100 TV programů v různých balíčcích, včetně možnosti výběru vlastních programů.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-poda-blue mb-3">Jak dlouho trvá instalace připojení?</h3>
            <p className="text-gray-600">Instalace v {cityName} obvykle trvá 1-2 pracovní dny od potvrzení objednávky.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/kontakt" className="btn-secondary">
            Mám další dotaz
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CityLayout;
