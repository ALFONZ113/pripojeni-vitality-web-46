
import React from 'react';

interface BasicFieldsProps {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const BasicFields = ({ formData, handleChange, isLoading }: BasicFieldsProps) => {
  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Jméno a příjmení *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Telefonní číslo *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          E-mailová adresa *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          required
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default BasicFields;
