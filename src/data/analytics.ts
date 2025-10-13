
// ====================================================================
// Interfaces de Datos de Analíticas (Final)
// ====================================================================

export interface TimeSeriesData { date: string; value: number; }
export interface PieChartData { name: string; value: number; color: string; }
export interface LinkStats { id: string; url: string; clicks: number; source: string; }
export interface AdCampaignStats { id: string; name: string; platform: 'Twitter' | 'Instagram' | 'YouTube'; ctr: number; conversions: number; cpc: number; }
export interface AudienceDemographics { country: string; percentage: number; color: string; }
export interface ActivityHour { hour: string; activity: number; }
export interface TopRole { role: string; count: number; color: string; }

// --- NUEVAS INTERFACES PARA LA PESTAÑA "CAMPAIGNS" ---
export interface ManualCampaignMetrics {
  impressions?: number;
  serverCost?: number;
}

export interface ManagedCampaign {
  id: string;
  name: string;
  advertiser: string;
  status: 'Active' | 'Completed' | 'Pending Data';
  startDate: string;
  endDate: string;
  autoMetrics: { clicks: number; conversions: number; revenue: number; };
  manualMetrics?: ManualCampaignMetrics;
}

// ====================================================================
// Estructura de Datos Principal (Final)
// ====================================================================

export interface CommunityAnalyticsData {
  // -- Pestaña General --
  keyMetrics: { newMembers: { value: number; trend: number }; linkClicks: { value: number; trend: number }; activeCampaigns: { value: number; trend: number }; engagementRate: { value: number; trend: number }; };
  memberGrowth: TimeSeriesData[];
  linkPerformance: TimeSeriesData[];
  messagesSent: TimeSeriesData[];
  topLinks: LinkStats[];
  trafficSources: PieChartData[];

  // -- Pestaña "Ad Performance" --
  adPerformance: { overallCTR: { value: number; trend: number }; totalConversions: { value: number; trend: number }; averageCPC: { value: number; trend: number }; roas: { value: number; trend: number }; campaigns: AdCampaignStats[]; ctrOverTime: TimeSeriesData[]; conversionsByPlatform: PieChartData[]; };

  // -- Pestaña "Audience Insights" --
  audience: { demographics: AudienceDemographics[]; platformDistribution: PieChartData[]; activityHours: ActivityHour[]; newVsReturning: PieChartData[]; topRoles: TopRole[]; };

  // -- PESTAÑA "CAMPAIGNS" --
  managedCampaigns: ManagedCampaign[]; 
}

// ====================================================================
// Generadores y Datos Simulados (Final)
// ====================================================================

const generateTimeSeriesData = (days: number, maxVal: number, minVal: number = 5): TimeSeriesData[] => {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (days - 1 - i));
    return { date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: Math.floor(Math.random() * maxVal) + minVal };
  });
};

const generateActivityHours = (): ActivityHour[] => {
    return Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        const activity = (i > 15 && i < 22) ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 10;
        return { hour: `${hour} ${ampm}`, activity };
    });
};

// --- DATOS SIMULADOS COMPLETOS Y FINALES ---

export const analyticsData: { [key: string]: CommunityAnalyticsData } = {
  'comm-1': { // Volt Raiders
    keyMetrics: { newMembers: {value: 73, trend: 15.2}, linkClicks: {value: 1245, trend: 30.5}, activeCampaigns: {value: 2, trend: 0}, engagementRate: { value: 68.5, trend: 4.2 } },
    memberGrowth: generateTimeSeriesData(30, 15),
    linkPerformance: generateTimeSeriesData(30, 200),
    messagesSent: generateTimeSeriesData(30, 1500, 500),
    topLinks: [{id: 'l1', url: 'volt.gg/crypto', clicks: 452, source: 'Twitter'}, {id: 'l2', url: 'volt.gg/invite', clicks: 312, source: 'Website'}, {id: 'l3', url: 'volt.gg/promo', clicks: 150, source: 'Instagram'}],
    trafficSources: [{name: 'Twitter', value: 45, color: '#00acee'}, {name: 'Website', value: 30, color: '#FCBE03'}, {name: 'Instagram', value: 15, color: '#e1306c'}, {name: 'Other', value: 10, color: '#a0a0a0'}],
    adPerformance: {
      overallCTR: { value: 4.7, trend: 8.2 }, totalConversions: { value: 89, trend: 12.5 }, averageCPC: { value: 0.85, trend: -5.5 }, roas: { value: 2.5, trend: 18 },
      campaigns: [{ id: 'ad-1', name: 'Summer Game Fest Promo', platform: 'Twitter', ctr: 5.2, conversions: 45, cpc: 0.75 }, { id: 'ad-2', name: 'New Merch Drop', platform: 'Instagram', ctr: 3.8, conversions: 25, cpc: 0.90 }, { id: 'ad-3', name: 'YouTube Collab Teaser', platform: 'YouTube', ctr: 4.9, conversions: 19, cpc: 0.95 }],
      ctrOverTime: generateTimeSeriesData(30, 3),
      conversionsByPlatform: [{name: 'Twitter', value: 45, color: '#00acee'}, {name: 'Instagram', value: 25, color: '#e1306c'}, {name: 'YouTube', value: 19, color: '#ff0000'}]
    },
    audience: {
      demographics: [{ country: 'USA', percentage: 45, color: '#4285f4' }, { country: 'Germany', percentage: 25, color: '#db4437' }, { country: 'Brazil', percentage: 15, color: '#f4b400' }, { country: 'Other', percentage: 15, color: '#a0a0a0' }],
      platformDistribution: [{ name: 'Discord', value: 70, color: '#7289da' }, { name: 'Web App', value: 20, color: '#FCBE03' }, { name: 'Mobile', value: 10, color: '#2dd36f' }],
      activityHours: generateActivityHours(),
      newVsReturning: [{name: 'New', value: 35, color: '#2dd36f'}, {name: 'Returning', value: 65, color: '#FCBE03'}],
      topRoles: [{role: 'Pro Gamer', count: 250, color: '#FCBE03'}, {role: 'Streamer', count: 120, color: '#9146ff'}, {role: 'Community Mod', count: 45, color: '#4285f4'}, {role: 'Newbie', count: 800, color: '#a0a0a0'}],
    },
    managedCampaigns: [
        { id: 'm-1', name: 'Raid Shadow Legends Collab', advertiser: 'Plarium', status: 'Completed', startDate: '2023-09-01', endDate: '2023-09-30', autoMetrics: { clicks: 12500, conversions: 850, revenue: 1500 }, manualMetrics: { impressions: 250000, serverCost: 1000 } },
        { id: 'm-2', name: 'G-Fuel Partnership', advertiser: 'G-Fuel', status: 'Active', startDate: '2023-10-01', endDate: '2023-10-31', autoMetrics: { clicks: 7600, conversions: 420, revenue: 950 } },
        { id: 'm-3', name: 'SecretLab Chair Giveaway', advertiser: 'SecretLab', status: 'Pending Data', startDate: '2023-10-10', endDate: '2023-10-24', autoMetrics: { clicks: 3200, conversions: 50, revenue: 200 } }
    ]
  },
  'comm-2': { // Pixel Pioneers
    keyMetrics: { newMembers: {value: 152, trend: -5.8}, linkClicks: {value: 2890, trend: 12.1}, activeCampaigns: {value: 4, trend: 25}, engagementRate: { value: 82.1, trend: -1.5 } },
    memberGrowth: generateTimeSeriesData(30, 40),
    linkPerformance: generateTimeSeriesData(30, 450),
    messagesSent: generateTimeSeriesData(30, 3500, 1200),
    topLinks: [{id: 'l4', url: 'volt.gg/event', clicks: 1234, source: 'Twitch'}, {id: 'l5', url: 'volt.gg/skin', clicks: 987, source: 'YouTube'}, {id: 'l6', url: 'volt.gg/home', clicks: 345, source: 'Google'}],
    trafficSources: [{name: 'Twitch', value: 50, color: '#9146ff'}, {name: 'YouTube', value: 35, color: '#ff0000'}, {name: 'Google', value: 10, color: '#4285f4'}, {name: 'Other', value: 5, color: '#a0a0a0'}],
    adPerformance: {
      overallCTR: { value: 6.1, trend: 15.0 }, totalConversions: { value: 215, trend: 20.1 }, averageCPC: { value: 1.15, trend: 2.1 }, roas: { value: 4.1, trend: 25 },
      campaigns: [{ id: 'ad-4', name: 'Indie Game Showcase', platform: 'Twitter', ctr: 7.5, conversions: 120, cpc: 1.05 }, { id: 'ad-5', name: 'Pixel Art Contest', platform: 'Instagram', ctr: 4.5, conversions: 65, cpc: 1.25 }, { id: 'ad-6', name: 'Dev Stream Highlight', platform: 'YouTube', ctr: 5.8, conversions: 30, cpc: 1.10 }],
      ctrOverTime: generateTimeSeriesData(30, 4),
      conversionsByPlatform: [{name: 'Twitter', value: 120, color: '#00acee'}, {name: 'Instagram', value: 65, color: '#e1306c'}, {name: 'YouTube', value: 30, color: '#ff0000'}]
    },
    audience: {
      demographics: [{ country: 'Canada', percentage: 35, color: '#db4437' }, { country: 'UK', percentage: 30, color: '#4285f4' }, { country: 'Australia', percentage: 20, color: '#f4b400' }, { country: 'Other', percentage: 15, color: '#a0a0a0' }],
      platformDistribution: [{ name: 'Discord', value: 85, color: '#7289da' }, { name: 'Web App', value: 10, color: '#FCBE03' }, { name: 'Mobile', value: 5, color: '#2dd36f' }],
      activityHours: generateActivityHours(),
      newVsReturning: [{name: 'New', value: 45, color: '#2dd36f'}, {name: 'Returning', value: 55, color: '#FCBE03'}],
      topRoles: [{role: 'Pixel Artist', count: 400, color: '#FCBE03'}, {role: 'Developer', count: 150, color: '#9146ff'}, {role: 'Beta Tester', count: 600, color: '#4285f4'}, {role: 'Community Helper', count: 75, color: '#a0a0a0'}],
    },
    managedCampaigns: [
        { id: 'm-4', name: 'Adobe Creative Jam', advertiser: 'Adobe', status: 'Completed', startDate: '2023-08-15', endDate: '2023-09-15', autoMetrics: { clicks: 8900, conversions: 1200, revenue: 2500 }, manualMetrics: { impressions: 450000, serverCost: 1800 } },
        { id: 'm-5', name: 'Game Dev Market Assets', advertiser: 'GDM', status: 'Pending Data', startDate: '2023-10-05', endDate: '2023-11-05', autoMetrics: { clicks: 4100, conversions: 310, revenue: 600 } },
        { id: 'm-6', name: 'Steam Wishlist Drive', advertiser: 'IndieDev Co.', status: 'Active', startDate: '2023-09-20', endDate: '2023-10-20', autoMetrics: { clicks: 15230, conversions: 0, revenue: 1200 } }
    ]
  },
};