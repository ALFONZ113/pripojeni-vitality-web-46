
/**
 * TV Channel logos utility with fallback handling
 */

export interface ChannelLogo {
  name: string;
  logoUrl: string;
  fallbackInitials: string;
}

/**
 * Database of TV channel logos
 * Using reliable CDN sources for logos
 */
export const channelLogos: Record<string, ChannelLogo> = {
  // Dětské a mládež
  'ČT :D (Déčko)': {
    name: 'ČT :D (Déčko)',
    logoUrl: 'https://cdn-0.tvprofil.com/img/kanali-logo/ctd_40.png',
    fallbackInitials: 'ČT:D'
  },
  'Disney Channel': {
    name: 'Disney Channel',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/2019_Disney_Channel_logo.svg/120px-2019_Disney_Channel_logo.svg.png',
    fallbackInitials: 'DIS'
  },
  'Nickelodeon': {
    name: 'Nickelodeon',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nickelodeon_2009_logo.svg/120px-Nickelodeon_2009_logo.svg.png',
    fallbackInitials: 'NICK'
  },
  'Cartoon Network': {
    name: 'Cartoon Network',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/120px-Cartoon_Network_2010_logo.svg.png',
    fallbackInitials: 'CN'
  },
  'Minimax': {
    name: 'Minimax',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Minimax_Logo.svg/120px-Minimax_Logo.svg.png',
    fallbackInitials: 'MINI'
  },
  'JimJam': {
    name: 'JimJam',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/JimJam_logo.svg/120px-JimJam_logo.svg.png',
    fallbackInitials: 'JJ'
  },
  'Duck TV': {
    name: 'Duck TV',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Duck_TV_logo.png/120px-Duck_TV_logo.png',
    fallbackInitials: 'DUCK'
  },

  // Zpravodajství
  'ČT24': {
    name: 'ČT24',
    logoUrl: 'https://cdn-0.tvprofil.com/img/kanali-logo/ct24_40.png',
    fallbackInitials: 'ČT24'
  },
  'CNN Prima News': {
    name: 'CNN Prima News',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN_Prima_News_logo.svg/120px-CNN_Prima_News_logo.svg.png',
    fallbackInitials: 'CNN'
  },
  'BBC World News': {
    name: 'BBC World News',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/BBC_News_2019.svg/120px-BBC_News_2019.svg.png',
    fallbackInitials: 'BBC'
  },
  'TA3': {
    name: 'TA3',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/TA3_logo_2019.svg/120px-TA3_logo_2019.svg.png',
    fallbackInitials: 'TA3'
  },
  'Euronews': {
    name: 'Euronews',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Euronews_Logo_2016.svg/120px-Euronews_Logo_2016.svg.png',
    fallbackInitials: 'EURO'
  },

  // Dokumenty a kultura
  'National Geographic': {
    name: 'National Geographic',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/National_Geographic_Channel.svg/120px-National_Geographic_Channel.svg.png',
    fallbackInitials: 'NG'
  },
  'Discovery Channel': {
    name: 'Discovery Channel',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Discovery_Channel_-_Logo_2019.svg/120px-Discovery_Channel_-_Logo_2019.svg.png',
    fallbackInitials: 'DISC'
  },
  'ČT art': {
    name: 'ČT art',
    logoUrl: 'https://cdn-0.tvprofil.com/img/kanali-logo/ctart_40.png',
    fallbackInitials: 'ART'
  },
  'Spektrum': {
    name: 'Spektrum',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Spektrum_TV_logo.svg/120px-Spektrum_TV_logo.svg.png',
    fallbackInitials: 'SPEK'
  },
  'Viasat History': {
    name: 'Viasat History',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Viasat_History_logo.svg/120px-Viasat_History_logo.svg.png',
    fallbackInitials: 'VH'
  },
  'Animal Planet': {
    name: 'Animal Planet',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/2018_Animal_Planet_logo.svg/120px-2018_Animal_Planet_logo.svg.png',
    fallbackInitials: 'AP'
  },
  'History Channel HD': {
    name: 'History Channel HD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/History_%282021%29.svg/120px-History_%282021%29.svg.png',
    fallbackInitials: 'HIST'
  },

  // Sport
  'Eurosport 1': {
    name: 'Eurosport 1',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eurosport_1_logo.svg/120px-Eurosport_1_logo.svg.png',
    fallbackInitials: 'ES1'
  },
  'Eurosport 2': {
    name: 'Eurosport 2',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Eurosport_2_logo.svg/120px-Eurosport_2_logo.svg.png',
    fallbackInitials: 'ES2'
  },
  'Nova Sport 1': {
    name: 'Nova Sport 1',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Nova_Sport_1_logo.svg/120px-Nova_Sport_1_logo.svg.png',
    fallbackInitials: 'NS1'
  },
  'Nova Sport 2': {
    name: 'Nova Sport 2',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Nova_Sport_2_logo.svg/120px-Nova_Sport_2_logo.svg.png',
    fallbackInitials: 'NS2'
  },
  'ČT sport': {
    name: 'ČT sport',
    logoUrl: 'https://cdn-0.tvprofil.com/img/kanali-logo/ctsport_40.png',
    fallbackInitials: 'ČTS'
  },
  'Arena Sport 1': {
    name: 'Arena Sport 1',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Arena_Sport_logo.svg/120px-Arena_Sport_logo.svg.png',
    fallbackInitials: 'AS1'
  },
  'Arena Sport 2': {
    name: 'Arena Sport 2',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Arena_Sport_logo.svg/120px-Arena_Sport_logo.svg.png',
    fallbackInitials: 'AS2'
  },

  // Filmy a seriály
  'Nova Cinema': {
    name: 'Nova Cinema',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Nova_Cinema_logo.svg/120px-Nova_Cinema_logo.svg.png',
    fallbackInitials: 'NC'
  },
  'Prima Max': {
    name: 'Prima Max',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Prima_MAX_logo.svg/120px-Prima_MAX_logo.svg.png',
    fallbackInitials: 'PM'
  },
  'AXN': {
    name: 'AXN',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/AXN_logo_%282015%29.svg/120px-AXN_logo_%282015%29.svg.png',
    fallbackInitials: 'AXN'
  },
  'AMC': {
    name: 'AMC',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/AMC_logo_2019.svg/120px-AMC_logo_2019.svg.png',
    fallbackInitials: 'AMC'
  },
  'Film Europe': {
    name: 'Film Europe',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Film_Europe_logo.png/120px-Film_Europe_logo.png',
    fallbackInitials: 'FE'
  },
  'HBO HD': {
    name: 'HBO HD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/120px-HBO_logo.svg.png',
    fallbackInitials: 'HBO'
  },
  'HBO2 HD': {
    name: 'HBO2 HD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/HBO2_logo.svg/120px-HBO2_logo.svg.png',
    fallbackInitials: 'HBO2'
  },
  'HBO3 HD': {
    name: 'HBO3 HD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO3_logo.svg/120px-HBO3_logo.svg.png',
    fallbackInitials: 'HBO3'
  },
  'Cinemax HD': {
    name: 'Cinemax HD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cinemax_logo.svg/120px-Cinemax_logo.svg.png',
    fallbackInitials: 'CMAX'
  },

  // Prémiové
  'Hustler TV HD': {
    name: 'Hustler TV HD',
    logoUrl: '/placeholder.svg',
    fallbackInitials: '18+'
  }
};

/**
 * Get channel logo information
 */
export const getChannelLogo = (channelName: string): ChannelLogo => {
  return channelLogos[channelName] || {
    name: channelName,
    logoUrl: '/placeholder.svg',
    fallbackInitials: channelName.slice(0, 3).toUpperCase()
  };
};

/**
 * Handle image loading errors
 */
export const handleLogoError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackInitials: string
) => {
  const target = e.currentTarget;
  const parent = target.parentElement;
  
  if (parent) {
    // Replace img with styled div showing initials - noir+gold theme
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-12 h-8 bg-gradient-to-br from-amber-600 to-amber-500 rounded flex items-center justify-center text-white text-xs font-bold';
    fallbackDiv.textContent = fallbackInitials;
    fallbackDiv.setAttribute('aria-label', `Logo ${target.alt}`);
    
    parent.replaceChild(fallbackDiv, target);
  }
};
