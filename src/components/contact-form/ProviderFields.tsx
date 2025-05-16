
import React from 'react';

interface ProviderFieldsProps {
  formData: {
    currentProvider: string;
    currentPrice: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const ProviderFields = ({ formData, handleChange, isLoading }: ProviderFieldsProps) => {
  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="currentProvider">
          Aktuální poskytovatel internetu
        </label>
        <input
          type="text"
          id="currentProvider"
          name="currentProvider"
          value={formData.currentProvider}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          placeholder="např. O2, T-Mobile, UPC, ..."
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="currentPrice">
          Kolik platíte měsíčně za internet
        </label>
        <input
          type="text"
          id="currentPrice"
          name="currentPrice"
          value={formData.currentPrice}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          placeholder="např. 500 Kč"
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default ProviderFields;
