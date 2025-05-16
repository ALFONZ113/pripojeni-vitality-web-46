
import React, { useEffect, useState } from 'react';
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
  // Track if city and zip were auto-filled
  const [autoFilled, setAutoFilled] = useState({
    city: false,
    zip: false
  });
  
  // Add effect to log when form data changes and track auto-filling
  useEffect(() => {
    console.log("AddressFields - formData updated:", formData);
    
    // Check if city or zip was auto-filled (non-empty value appears suddenly)
    if (formData.city && !autoFilled.city) {
      setAutoFilled(prev => ({ ...prev, city: true }));
    }
    
    if (formData.zip && !autoFilled.zip) {
      setAutoFilled(prev => ({ ...prev, zip: true }));
    }
  }, [formData]);

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
          {autoFilled.city && (
            <span className="ml-2 text-sm text-green-600">
              (auto)
            </span>
          )}
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors ${
            autoFilled.city ? 'border-green-300 bg-green-50' : 'border-gray-300'
          }`}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="zip">
          PSČ
          {autoFilled.zip && (
            <span className="ml-2 text-sm text-green-600">
              (auto)
            </span>
          )}
        </label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors ${
            autoFilled.zip ? 'border-green-300 bg-green-50' : 'border-gray-300'
          }`}
          disabled={isLoading}
          maxLength={5} // Limit to 5 characters (Czech postal code format)
          pattern="[0-9]{5}" // Ensure only numbers
        />
      </div>
    </>
  );
};

export default AddressFields;
