import { Wifi, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface TariffTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TariffTabs = ({ activeTab, onTabChange }: TariffTabsProps) => {
  const tabs = [
    { id: 'byty', label: 'Pro byty (GPON)', icon: Wifi },
    { id: 'domy', label: 'Pro rodinné domy', icon: Home }
  ];

  return (
    <div className="flex justify-center mb-8 md:mb-12 px-4">
      <div className="bg-secondary/50 p-1.5 rounded-xl inline-flex border border-border/50">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)} 
            className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 flex items-center text-sm md:text-base ${
              activeTab === tab.id 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              <tab.icon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TariffTabs;
