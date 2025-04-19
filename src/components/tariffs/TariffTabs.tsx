
import { Wifi } from 'lucide-react';

interface TariffTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TariffTabs = ({ activeTab, onTabChange }: TariffTabsProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button 
          onClick={() => onTabChange('byty')} 
          className={`${activeTab === 'byty' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center`}
        >
          <Wifi className="mr-2 h-5 w-5" />
          Pro byty (GPON)
        </button>
        <button 
          onClick={() => onTabChange('domy')} 
          className={`${activeTab === 'domy' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center`}
        >
          <Wifi className="mr-2 h-5 w-5" />
          Pro rodinné domy
        </button>
      </div>
    </div>
  );
};

export default TariffTabs;
