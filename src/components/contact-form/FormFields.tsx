
import React from 'react';
import BasicFields from './BasicFields';
import AddressFields from './AddressFields';
import ProviderFields from './ProviderFields';
import MessageField from './MessageField';

interface FormFieldsProps {
  formData: {
    name: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    currentProvider: string;
    currentPrice: string;
    message: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isLoading: boolean;
  compact?: boolean;
  setFormData: (data: any) => void;
}

const FormFields = ({ formData, handleChange, isLoading, compact = false, setFormData }: FormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BasicFields 
          formData={formData}
          handleChange={handleChange}
          isLoading={isLoading}
        />
        
        {/* Additional form fields */}
        {!compact && (
          <>
            <AddressFields
              formData={formData}
              handleChange={handleChange}
              isLoading={isLoading}
              setFormData={setFormData}
            />
            
            <ProviderFields
              formData={formData}
              handleChange={handleChange}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
      
      <MessageField
        value={formData.message}
        onChange={handleChange}
        isLoading={isLoading}
        compact={compact}
      />
    </>
  );
};

export default FormFields;
