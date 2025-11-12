export type SegmentationType = 'Demographic' | 'Geographic' | 'Psychographic' | 'Behavioral';

export interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // Click-Through Rate
  conversionRate: number; // Conversion Rate
}

export interface SocialLinks {
  youtube?: string;
  twitch?: string;
  twitter?: string;
  reddit?: string;
  kick?: string;
  discord?: string;
}

export interface StaffMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Server {
  id: string;
  name: string;
  iconUrl: string;
  bannerUrl: string;
  memberCount: number;
  category: string;
  description: string;
  isVerified: boolean;
  language: string;
  rating: number; 
  joinDate: Date; 
  peakActivityHours: ('Morning (6-12)' | 'Afternoon (12-18)' | 'Evening (18-24)' | 'Night (0-6)')[];
  monthlyGrowth: number; 
  messagesPerDay: number;
  promotionAcceptanceRate: number; 
  hasPreviousCollaborations: boolean;
  segmentation: SegmentationType[]; 
  hasInfluencers: boolean;
  lastPromotionDate: Date;
  campaigns: Campaign[]; // Historical campaign data
  socials: SocialLinks; // Social media links
  staff: StaffMember[];
  eventAvailability: string;
  collaborationTypes: string[];
  brandFaq: FaqItem[];
}

export const mockServers: Server[] = [
  {
    id: 'pixel-world',
    name: 'Pixel World',
    iconUrl: 'https://i.imgur.com/kHsk2fC.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 12500,
    category: 'Gaming',
    description: 'A vibrant community for gamers. Discuss your favorite titles, find teammates, and join exclusive events. Home to Pixelmon players and more.',
    isVerified: true,
    language: 'English',
    rating: 4.8,
    joinDate: new Date('2022-01-15'),
    peakActivityHours: ['Evening (18-24)'],
    monthlyGrowth: 1200,
    messagesPerDay: 25000,
    promotionAcceptanceRate: 90,
    hasPreviousCollaborations: true,
    segmentation: ['Geographic', 'Behavioral'],
    hasInfluencers: true,
    lastPromotionDate: new Date('2024-05-10'),
    campaigns: [
      { id: 'pw-q1', name: 'Pixelmon Launch', startDate: new Date('2024-01-15'), endDate: new Date('2024-02-15'), impressions: 50000, clicks: 2500, conversions: 500, ctr: 5.0, conversionRate: 20.0 },
      { id: 'pw-q2', name: 'Summer Gaming Fest', startDate: new Date('2024-04-01'), endDate: new Date('2024-04-30'), impressions: 75000, clicks: 3500, conversions: 650, ctr: 4.7, conversionRate: 18.6 },
    ],
    socials: {
      twitter: 'https://twitter.com/pixelworld',
      discord: 'https://discord.gg/pixelworld',
      twitch: 'https://twitch.tv/pixelworld',
    },
    staff: [
      { name: 'Alex', role: 'Community Manager', avatarUrl: 'https://i.imgur.com/kHsk2fC.jpeg' },
      { name: 'Jasmine', role: 'Event Coordinator', avatarUrl: 'https://i.imgur.com/gC5c5jE.jpeg' },
      { name: 'Leo', role: 'Moderator Lead', avatarUrl: 'https://i.imgur.com/kHsk2fC.jpeg' },
    ],
    eventAvailability: 'Weekends, 18:00 - 22:00 UTC',
    collaborationTypes: ['Monetary Sponsorship', 'Giveaways', 'Product Placement', 'Custom Events'],
    brandFaq: [
      { question: 'What is the primary age group of your members?', answer: 'Our primary audience is between 16 and 24 years old.' },
      { question: 'Can we host a branded tournament?', answer: 'Absolutely! We have a dedicated team to help organize and promote custom events.' },
      { question: 'What are your sponsorship packages?', answer: 'We offer various packages including banner placements, announcement pings, and full event sponsorships. Please contact our management for a detailed price list.' },
    ],
  },
  {
    id: 'anime-realm',
    name: 'Anime Realm',
    iconUrl: 'https://i.imgur.com/gC5c5jE.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 25000,
    category: 'Anime',
    description: 'The ultimate hub for anime and manga fans. Share your favorite series, discover new ones, and participate in community art contests.',
    isVerified: true,
    language: 'English',
    rating: 4.9,
    joinDate: new Date('2021-03-20'),
    peakActivityHours: ['Night (0-6)'],
    monthlyGrowth: 2500,
    messagesPerDay: 45000,
    promotionAcceptanceRate: 95,
    hasPreviousCollaborations: true,
    segmentation: ['Demographic'],
    hasInfluencers: true,
    lastPromotionDate: new Date('2024-04-25'),
    campaigns: [
      { id: 'ar-q1', name: 'New Season Watch Party', startDate: new Date('2024-01-20'), endDate: new Date('2024-02-20'), impressions: 120000, clicks: 8000, conversions: 1500, ctr: 6.7, conversionRate: 18.8 },
      { id: 'ar-q2', name: 'Manga Readers Club', startDate: new Date('2024-04-10'), endDate: new Date('2024-05-10'), impressions: 150000, clicks: 9500, conversions: 1800, ctr: 6.3, conversionRate: 18.9 },
    ],
    socials: {
      reddit: 'https://reddit.com/r/animerealm',
      discord: 'https://discord.gg/animerealm',
    },
    staff: [
      { name: 'Yuki', role: 'Head Admin', avatarUrl: 'https://i.imgur.com/kHsk2fC.jpeg' },
      { name: 'Kenji', role: 'Content Curator', avatarUrl: 'https://i.imgur.com/gC5c5jE.jpeg' },
    ],
    eventAvailability: 'Fridays, 20:00 - 24:00 JST',
    collaborationTypes: ['Giveaways', 'Watch-along Events'],
    brandFaq: [
      { question: 'Can we promote our anime streaming service?', answer: 'Yes, we welcome partnerships with legal streaming services. We can arrange announcement pings and featured sections.' },
      { question: 'Do you host art competitions?', answer: 'Yes, we host monthly art competitions and are open to sponsored prizes.' },
    ],
  },
  // ... other servers will be updated similarly but kept brief for this example
  {
    id: 'code-and-coffee',
    name: 'Code & Coffee',
    iconUrl: 'https://i.imgur.com/gC5c5jE.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 18000,
    category: 'Tech',
    description: 'A server for developers, designers, and tech enthusiasts. Get help with your code, discuss the latest trends, and collaborate on exciting projects.',
    isVerified: true,
    language: 'English',
    rating: 4.7,
    joinDate: new Date('2022-11-01'),
    peakActivityHours: ['Afternoon (12-18)'],
    monthlyGrowth: 800,
    messagesPerDay: 15000,
    promotionAcceptanceRate: 75,
    hasPreviousCollaborations: false,
    segmentation: ['Demographic', 'Psychographic'],
    hasInfluencers: false,
    lastPromotionDate: new Date('2023-12-01'),
    campaigns: [
        { id: 'cc-q4', name: 'End of Year Hackathon', startDate: new Date('2023-12-01'), endDate: new Date('2023-12-15'), impressions: 40000, clicks: 1500, conversions: 250, ctr: 3.8, conversionRate: 16.7 },
        { id: 'cc-q1', name: 'Frontend Frameworks Challenge', startDate: new Date('2024-03-01'), endDate: new Date('2024-03-31'), impressions: 55000, clicks: 2200, conversions: 400, ctr: 4.0, conversionRate: 18.2 },
    ],
    socials: {
        youtube: 'https://youtube.com/codeandcoffee',
        twitter: 'https://twitter.com/codeandcoffee',
    },
    staff: [],
    eventAvailability: 'Office Hours, Mon-Fri 14:00-16:00 UTC',
    collaborationTypes: ['Tech Talks', 'Hackathons', 'API Sponsorship'],
    brandFaq: [],
  },
    {
    id: 'music-maestros',
    name: 'Music Maestros',
    iconUrl: 'https://i.imgur.com/gC5c5jE.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 11200,
    category: 'Music',
    description: 'Connect with music lovers from around the world. Discuss your favorite artists, share playlists, and discover new genres.',
    isVerified: false,
    language: 'Spanish',
    rating: 4.5,
    joinDate: new Date('2023-08-12'),
    peakActivityHours: ['Evening (18-24)'],
    monthlyGrowth: 500,
    messagesPerDay: 8000,
    promotionAcceptanceRate: 80,
    hasPreviousCollaborations: true,
    segmentation: [],
    hasInfluencers: false,
    lastPromotionDate: new Date('2024-05-20'),
    campaigns: [
        { id: 'mm-q1', name: 'Discover Weekly Challenge', startDate: new Date('2024-02-01'), endDate: new Date('2024-02-28'), impressions: 30000, clicks: 1200, conversions: 150, ctr: 4.0, conversionRate: 12.5 },
    ],
    socials: {},
    staff: [],
    eventAvailability: 'Flexible',
    collaborationTypes: ['Listening Parties', 'Artist AMAs'],
    brandFaq: [],
  },
    {
    id: 'study-hub',
    name: 'Study Hub',
    iconUrl: 'https://i.imgur.com/kHsk2fC.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 5200,
    category: 'Education',
    description: 'A productive and supportive community for students of all levels. Find study partners, get help with your homework, and stay motivated.',
    isVerified: false,
    language: 'Portuguese',
    rating: 4.6,
    joinDate: new Date('2024-02-10'),
    peakActivityHours: ['Evening (18-24)'],
    monthlyGrowth: 1500, 
    messagesPerDay: 5000,
    promotionAcceptanceRate: 60,
    hasPreviousCollaborations: false,
    segmentation: ['Demographic'],
    hasInfluencers: false,
    lastPromotionDate: new Date('2024-03-01'),
    campaigns: [],
    socials: {
      discord: 'https://discord.gg/studyhub'
    },
     staff: [],
    eventAvailability: 'N/A',
    collaborationTypes: [],
    brandFaq: [],
  },
  {
    id: 'german-gamers',
    name: 'German Gamers',
    iconUrl: 'https://i.imgur.com/kHsk2fC.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 8900,
    category: 'Gaming',
    description: 'Die zentrale Anlaufstelle für Gamer aus Deutschland, Österreich und der Schweiz. Finde Mitspieler für Valorant, CS, und mehr.',
    isVerified: true,
    language: 'German',
    rating: 4.8,
    joinDate: new Date('2023-01-30'),
    peakActivityHours: ['Evening (18-24)'],
    monthlyGrowth: 400,
    messagesPerDay: 11000,
    promotionAcceptanceRate: 85,
    hasPreviousCollaborations: true,
    segmentation: ['Geographic', 'Demographic'],
    hasInfluencers: false,
    lastPromotionDate: new Date('2024-04-15'),
    campaigns: [
        { id: 'gg-q1', name: 'DACH Valorant Tournament', startDate: new Date('2024-03-15'), endDate: new Date('2024-04-15'), impressions: 60000, clicks: 3000, conversions: 450, ctr: 5.0, conversionRate: 15.0 },
    ],
    socials: {
      twitch: 'https://twitch.tv/germangamers'
    },
     staff: [],
    eventAvailability: 'Abends unter der Woche',
    collaborationTypes: ['Turniere', 'Giveaways'],
    brandFaq: [],
  },
  {
    id: 'les-artistes-francophones',
    name: 'Les Artistes Francophones',
    iconUrl: 'https://i.imgur.com/gC5c5jE.jpeg',
    bannerUrl: 'https://i.imgur.com/Y9o1stf.jpeg',
    memberCount: 4100,
    category: 'Art & Design',
    description: 'Un espace pour les artistes francophones pour partager leurs créations, recevoir des conseils et collaborer.',
    isVerified: false,
    language: 'French',
    rating: 4.9,
    joinDate: new Date('2024-04-05'),
    peakActivityHours: ['Evening (18-24)'],
    monthlyGrowth: 2000,
    messagesPerDay: 3000,
    promotionAcceptanceRate: 98,
    hasPreviousCollaborations: false,
    segmentation: ['Psychographic', 'Behavioral'],
    hasInfluencers: true,
    lastPromotionDate: new Date('2024-05-01'),
    campaigns: [],
    socials: {},
     staff: [],
    eventAvailability: 'Weekends',
    collaborationTypes: ['Concours d\'art', 'Ateliers en direct'],
    brandFaq: [],
  }
];
