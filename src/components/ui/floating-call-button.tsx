
import React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPhoneProps } from '@/utils/phoneOptimization';

interface FloatingCallButtonProps {
  className?: string;
}

const FloatingCallButton: React.FC<FloatingCallButtonProps> = ({ className }) => {
  const phoneNumber = '+420730431313';
  const phoneProps = getPhoneProps(phoneNumber);

  return (
    <a
      {...phoneProps}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-14 h-14 md:w-16 md:h-16",
        "bg-gradient-to-r from-poda-orange to-poda-orange/90",
        "hover:from-poda-orange/90 hover:to-poda-orange",
        "text-white rounded-full shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "hover:scale-110 active:scale-95",
        "backdrop-blur-sm border border-white/20",
        "animate-pulse hover:animate-none",
        "focus:outline-none focus:ring-4 focus:ring-poda-orange/30",
        "group",
        className
      )}
      aria-label="Zavolať +420 730 431 313"
    >
      <Phone 
        className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:rotate-12" 
        aria-hidden="true"
      />
      
      {/* Pulse effect ring */}
      <div className="absolute inset-0 rounded-full bg-poda-orange/30 animate-ping"></div>
      
      {/* Tooltip on hover - only visible on larger screens */}
      <div className="absolute bottom-full right-0 mb-2 hidden md:group-hover:block">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          Zavolať +420 730 431 313
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      </div>
    </a>
  );
};

export default FloatingCallButton;
