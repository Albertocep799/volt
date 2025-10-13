
export interface User {
  username: string;
  avatar: string;
}

export interface Community {
  id: string;
  name: string;
  guildStatus: 'Active' | 'Inactive';
  imageUrl?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'pending-approval' | 'pending' | 'active' | 'completed';
  communityName: string;
  paymentInfo: string;
  postCount: number;
  activationDate: string;
  link: string;
  briefUrl: string;
}

// --- DATOS ESTÁTICOS INVENTADOS ---

export const voltUser: User = {
  username: 'iron7ii',
  avatar: 'https://example.com/path/to/iron7ii-avatar.png', // Placeholder avatar
};

export const voltCommunities: Community[] = [
  {
    id: 'comm-1',
    name: 'Volt Raiders',
    guildStatus: 'Active',
    imageUrl: 'https://example.com/path/to/volt-raiders-icon.png', // Placeholder icon
  },
  {
    id: 'comm-2',
    name: 'Pixel Pioneers',
    guildStatus: 'Active',
    imageUrl: 'https://example.com/path/to/pixel-pioneers-icon.png',
  },
];

export const voltCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Cyberpunk 2077 DLC Launch',
    status: 'pending-approval',
    communityName: 'Volt Raiders',
    paymentInfo: '1500 VOLT',
    postCount: 5,
    activationDate: 'Not activated',
    link: 'No link',
    briefUrl: 'https://volt.gg/brief/cp2077-dlc',
  },
  {
    id: 'camp-2',
    name: 'Apex Legends Season 21',
    status: 'pending',
    communityName: 'Volt Raiders',
    paymentInfo: '750 USD',
    postCount: 3,
    activationDate: 'Not activated',
    link: 'No link',
    briefUrl: 'https://volt.gg/brief/apex-s21',
  },
  {
    id: 'camp-3',
    name: 'Secretlab Chair Collab',
    status: 'active',
    communityName: 'Pixel Pioneers',
    paymentInfo: '1000 USD',
    postCount: 2,
    activationDate: '2024-07-15',
    link: 'volt.gg/secretlab',
    briefUrl: 'https://volt.gg/brief/secretlab-collab',
  },
];
