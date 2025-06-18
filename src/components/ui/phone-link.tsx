
import React from 'react';
import { getPhoneProps } from '../../utils/phoneOptimization';
import { cn } from '../../lib/utils';

interface PhoneLinkProps {
  phoneNumber: string;
  children: React.ReactNode;
  className?: string;
  displayNumber?: string;
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ 
  phoneNumber, 
  children, 
  className,
  displayNumber 
}) => {
  const phoneProps = getPhoneProps(phoneNumber);

  return (
    <a
      {...phoneProps}
      className={cn(
        'phone-link transition-colors duration-200 touch-manipulation',
        'focus:outline-none focus:ring-2 focus:ring-poda-blue focus:ring-offset-2',
        'active:scale-95 transform transition-transform',
        className
      )}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {children || displayNumber || phoneNumber}
    </a>
  );
};

export default PhoneLink;
