
import React from 'react';
import { getChannelLogo, handleLogoError } from '../../utils/channelLogos';
import OptimizedImage from '../ui/optimized-image';

interface ChannelLogoProps {
  channelName: string;
  className?: string;
}

const ChannelLogo: React.FC<ChannelLogoProps> = ({ channelName, className = "w-12 h-8" }) => {
  const logoInfo = getChannelLogo(channelName);

  return (
    <div className={`${className} bg-gray-50 rounded flex items-center justify-center overflow-hidden`}>
      <OptimizedImage
        src={logoInfo.logoUrl}
        alt={`Logo ${logoInfo.name}`}
        className="w-full h-full object-contain"
        onError={(e) => handleLogoError(e, logoInfo.fallbackInitials)}
        enableWebP={true}
        responsive={false}
        priority={false}
      />
    </div>
  );
};

export default ChannelLogo;
