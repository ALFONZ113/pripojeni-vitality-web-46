
import React from 'react';
import AddressSuggester from './AddressSuggester';

interface AddressFieldsProps {
  formData: {
    address: string;
    city: string;
    zip: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  setFormData: (data: any) => void;
}

const AddressFields = ({ formData, handleChange, isLoading, setFormData }: AddressFieldsProps) => {
  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
          Ulice a číslo popisné
        </label>
        <AddressSuggester 
          value={formData.address}
          onChange={handleChange}
          isDisabled={isLoading}
          setFormData={setFormData}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
          Město
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="zip">
          PSČ
        </label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          disabled={isLoading}
          maxLength={5} // Limit to 5 characters (Czech postal code format)
        />
      </div>
    </>
  );
};

export default AddressFields;
