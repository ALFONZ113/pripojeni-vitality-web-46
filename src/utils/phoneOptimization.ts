
/**
 * Phone optimization utilities for mobile devices
 */

export const formatPhoneForMobile = (phoneNumber: string): string => {
  // Remove all non-numeric characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  return cleaned;
};

export const createPhoneLink = (phoneNumber: string): string => {
  return `tel:${formatPhoneForMobile(phoneNumber)}`;
};

export const handlePhoneClick = (event: React.MouseEvent<HTMLAnchorElement>, phoneNumber: string) => {
  // Prevent any default zoom behavior
  event.preventDefault();
  
  // Force phone call on mobile devices
  if (typeof window !== 'undefined') {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use window.location for better mobile compatibility
      window.location.href = createPhoneLink(phoneNumber);
    } else {
      // Fallback for desktop
      window.open(createPhoneLink(phoneNumber));
    }
  }
};

export const getPhoneProps = (phoneNumber: string) => {
  return {
    href: createPhoneLink(phoneNumber),
    'data-tel': formatPhoneForMobile(phoneNumber),
    'aria-label': `Zavolať ${phoneNumber}`,
    role: 'button',
    tabIndex: 0,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handlePhoneClick(e, phoneNumber),
    onTouchStart: (e: React.TouchEvent) => {
      // Prevent zoom on touch
      e.preventDefault();
    }
  };
};
