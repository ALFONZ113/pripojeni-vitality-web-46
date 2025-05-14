
import { Wifi } from 'lucide-react';

interface TariffTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileTariffTabs = ({ activeTab, onTabChange }: TariffTabsProps) => {
  return (
    <div className="flex justify-center mb-6 px-2">
      <div className="bg-gray-100 p-1 rounded-lg flex w-full">
        <button 
          onClick={() => onTabChange('byty')} 
          className={`${activeTab === 'byty' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600'} flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center`}
        >
          <Wifi className="mr-1 h-4 w-4" />
          Pro byty
        </button>
        <button 
          onClick={() => onTabChange('domy')} 
          className={`${activeTab === 'domy' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600'} flex-1 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center`}
        >
          <Wifi className="mr-1 h-4 w-4" />
          Pro domy
        </button>
      </div>
    </div>
  );
};

export default MobileTariffTabs;
