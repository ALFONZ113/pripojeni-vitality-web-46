
import React from 'react';
import { trackPhoneClick } from '../../utils/googleAdsTracking';

interface PhoneLinkProps {
  phone: string;
  className?: string;
  children?: React.ReactNode;
  trackClick?: boolean;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ 
  phone, 
  className = '', 
  children, 
  trackClick = true 
}) => {
  const handleClick = () => {
    if (trackClick) {
      trackPhoneClick();
    }
  };

  return (
    <a 
      href={`tel:${phone.replace(/\s/g, '')}`}
      className={className}
      onClick={handleClick}
    >
      {children || phone}
    </a>
  );
};

export default PhoneLink;
