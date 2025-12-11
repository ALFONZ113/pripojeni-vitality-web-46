
import React from 'react';
import { getChannelLogo, handleLogoError } from '../../utils/channelLogos';
import { responsiveImageProps } from '../../utils/imageUtils';

interface ChannelLogoProps {
  channelName: string;
  className?: string;
}

const ChannelLogo: React.FC<ChannelLogoProps> = ({ channelName, className = "w-12 h-8" }) => {
  const logoInfo = getChannelLogo(channelName);

  return (
    <div className={`${className} bg-card rounded flex items-center justify-center overflow-hidden border border-border/20`}>
      <img
        {...responsiveImageProps(logoInfo.logoUrl, `Logo ${logoInfo.name}`, 48, 32)}
        className="w-full h-full object-contain"
        onError={(e) => handleLogoError(e, logoInfo.fallbackInitials)}
      />
    </div>
  );
};

export default ChannelLogo;
