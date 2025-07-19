
import React from 'react';
import { trackPhoneClick } from '../../utils/googleAdsTracking';

interface PhoneLinkProps {
  phone?: string;
  phoneNumber?: string;
  displayNumber?: string;
  className?: string;
  children?: React.ReactNode;
  trackClick?: boolean;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ 
  phone, 
  phoneNumber,
  displayNumber,
  className = '', 
  children, 
  trackClick = true 
}) => {
  // Use phoneNumber if provided, otherwise fallback to phone
  const actualPhone = phoneNumber || phone || '';
  
  const handleClick = () => {
    if (trackClick) {
      trackPhoneClick();
    }
  };

  return (
    <a 
      href={`tel:${actualPhone.replace(/\s/g, '')}`}
      className={className}
      onClick={handleClick}
    >
      {children || displayNumber || actualPhone}
    </a>
  );
};

export default PhoneLink;
