import React, { useState, useMemo } from 'react';
import { mockServers, type Server } from '../../data/network';
import type { SegmentationType } from '../../data/network';
import ServerCard from '../../components/ServerCard/ServerCard';
import CustomSelector from '../../components/CustomSelector/CustomSelector';
import type { Option } from '../../components/CustomSelector/CustomSelector';
import { FaFilter, FaCheck, FaQuestionCircle } from 'react-icons/fa';
import './Network.scss';

// This function is no longer needed, we will get servers directly.
// const getServers = (isAuthenticated: boolean): Server[] => {
//   if (!isAuthenticated) {
//     return [];
//   }
//   return mockServers;
// };

const getAverageConversionRate = (server: Server) => {
    if (!server.campaigns || server.campaigns.length === 0) return 0;
    const totalRate = server.campaigns.reduce((acc, c) => acc + c.conversionRate, 0);
    return totalRate / server.campaigns.length;
};

const FilterCheckbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; }> = ({ label, checked, onChange }) => (
  <div className="filter-group-checkbox" onClick={() => onChange(!checked)}>
    <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>{checked && <FaCheck />}</div>
    <label>{label}</label>
  </div>
);

const activityHourMap = { 'Morning': '6-12', 'Afternoon': '12-18', 'Evening': '18-24', 'Night': '0-6' };
const MAX_MEMBERS = 10000000;
const segmentationOptions: SegmentationType[] = ['Demographic', 'Geographic', 'Psychographic', 'Behavioral'];

const sortOptions = {
  popularity: [
    { value: 'Recommended', label: 'Recommended' },
    { value: 'Highest Rated', label: 'Highest Rated' },
    { value: 'Newest', label: 'Newest' },
  ],
  members: [
    { value: 'High to Low', label: 'Most Members' },
    { value: 'Low to High', label: 'Fewest Members' },
  ],
  performance: [
    { value: 'Highest Conversion', label: 'Highest Conversion' },
  ],
};

const categories: Option[] = ['All', 'Gaming', 'Anime', 'Tech', 'Music', 'Education', 'Art & Design'].map(c => ({ value: c, label: c }));
const languages: Option[] = ['All', 'English', 'Spanish', 'French', 'German', 'Portuguese'].map(l => ({ value: l, label: l }));

const Network: React.FC = () => {
  // We directly use mockServers, no longer dependent on isAuthenticated
  const [servers] = useState<Server[]>(mockServers);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [activeSort, setActiveSort] = useState<Option | null>(null);
  const [memberSort, setMemberSort] = useState<Option | null>(null);
  const [performanceSort, setPerformanceSort] = useState<Option | null>(null);

  const [memberRange, setMemberRange] = useState<[number, number]>([0, MAX_MEMBERS]);
  const [categoryFilter, setCategoryFilter] = useState<Option>(categories[0]);
  const [languageFilter, setLanguageFilter] = useState<Option>(languages[0]);
  const [segmentationFilters, setSegmentationFilters] = useState<SegmentationType[]>([]);
  const [growthRate, setGrowthRate] = useState(0);
  const [messageRate, setMessageRate] = useState(0);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [activeHours, setActiveHours] = useState<string[]>([]);
  const [hasCollaborations, setHasCollaborations] = useState(false);
  const [hasInfluencers, setHasInfluencers] = useState(false);
  const [notSaturated, setNotSaturated] = useState(false);

  const handleActivityHourChange = (hour: string) => {
    setActiveHours(prev => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]);
  };

  const handleMemberRangeChange = (type: 'min' | 'max', value: number) => {
    let [min, max] = memberRange;
    if (type === 'min') min = Math.max(0, Math.min(value, max));
    else max = Math.min(MAX_MEMBERS, Math.max(value, min));
    setMemberRange([min, max]);
  };

  const handleSegmentationChange = (segment: SegmentationType) => {
    setSegmentationFilters(prev => prev.includes(segment) ? prev.filter(s => s !== segment) : [...prev, segment]);
  };

  const getSortOrder = () => {
      if (activeSort) return activeSort.value;
      if (memberSort) return memberSort.value;
      if (performanceSort) return performanceSort.value;
      return 'Recommended'; // Default sort
  }

  const filteredAndSortedServers = useMemo(() => {
    // The check for isAuthenticated is removed from here as well.
    let filtered = servers.filter(server => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (searchTerm && !server.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (categoryFilter.value !== 'All' && server.category !== categoryFilter.value) return false;
      if (languageFilter.value !== 'All' && server.language !== languageFilter.value) return false;
      if (server.memberCount < memberRange[0] || server.memberCount > memberRange[1]) return false;
      if (segmentationFilters.length > 0 && !segmentationFilters.every(filter => server.segmentation.includes(filter))) return false;
      if (server.monthlyGrowth < growthRate) return false;
      if (server.messagesPerDay < messageRate) return false;
      if (server.promotionAcceptanceRate < acceptanceRate) return false;
      if (hasCollaborations && !server.hasPreviousCollaborations) return false;
      if (hasInfluencers && !server.hasInfluencers) return false;
      if (notSaturated && server.lastPromotionDate > thirtyDaysAgo) return false;
      if (activeHours.length > 0 && !activeHours.some(h => server.peakActivityHours.includes(h as any))) return false;
      return true;
    });

    const currentSortOrder = getSortOrder();
    return filtered.sort((a, b) => {
      switch (currentSortOrder) {
        case 'Highest Rated': return b.rating - a.rating;
        case 'Newest': return b.joinDate.getTime() - a.joinDate.getTime();
        case 'Most Members': case 'High to Low': return b.memberCount - a.memberCount;
        case 'Fewest Members': case 'Low to High': return a.memberCount - b.memberCount;
        case 'Highest Conversion': return getAverageConversionRate(b) - getAverageConversionRate(a);
        case 'Recommended': default: return (b.rating * b.memberCount) - (a.rating * a.memberCount);
      }
    });
  }, [servers, searchTerm, activeSort, memberSort, performanceSort, categoryFilter, languageFilter, memberRange, segmentationFilters, growthRate, messageRate, acceptanceRate, hasCollaborations, hasInfluencers, notSaturated, activeHours]);

  // The entire !isAuthenticated block is removed.

  return (
    <div className="network-page">
      <div className="network-hero"><h1>Explore Our Server Network</h1><p>Discover vibrant communities and find your next favorite server.</p></div>
      <div className="search-controls-container">
        <div className="main-filters">
          <input type="text" placeholder="Search servers by name..." className="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <div className="sort-selectors">
            <CustomSelector id="popularity-sort" options={sortOptions.popularity} value={activeSort} onChange={o => { setActiveSort(o); setMemberSort(null); setPerformanceSort(null); }} placeholder="Popularity" />
            <CustomSelector id="member-sort" options={sortOptions.members} value={memberSort} onChange={o => { setMemberSort(o); setActiveSort(null); setPerformanceSort(null); }} placeholder="Members" />
            <CustomSelector id="performance-sort" options={sortOptions.performance} value={performanceSort} onChange={o => { setPerformanceSort(o); setActiveSort(null); setMemberSort(null); }} placeholder="Performance" />
          </div>
          <button className={`advanced-filter-btn ${showAdvanced ? 'active' : ''}`} onClick={() => setShowAdvanced(!showAdvanced)}><FaFilter /><span>Advanced</span></button>
        </div>
        {showAdvanced && (
          <div className="advanced-filters"> 
             <div className="filter-column">
                <h4 className="filter-column-title">Audience</h4>
                <div className="filter-row">
                  <CustomSelector options={categories} value={categoryFilter} onChange={setCategoryFilter} label="Category" />
                  <CustomSelector options={languages} value={languageFilter} onChange={setLanguageFilter} label="Language" />
                </div>
                <div className="filter-group">
                    <label>Market Segmentation</label>
                    <div className="button-grid">
                        {segmentationOptions.map(segment => (
                            <button key={segment} className={`activity-btn ${segmentationFilters.includes(segment) ? 'active' : ''}`} onClick={() => handleSegmentationChange(segment)}>{segment}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="filter-column"><h4 className="filter-column-title">Server Metrics</h4><div className="filter-group range-group"><label>Member Count</label><div className="range-inputs"><input type="text" value={memberRange[0].toLocaleString()} onChange={(e) => { const num = parseInt(e.target.value.replace(/[,.]/g, ''), 10); if (!isNaN(num)) handleMemberRangeChange('min', num); }} /><span>-</span><input type="text" value={memberRange[1].toLocaleString()} onChange={(e) => { const num = parseInt(e.target.value.replace(/[,.]/g, ''), 10); if (!isNaN(num)) handleMemberRangeChange('max', num); }} /></div><div className="range-slider"><div className="slider-track"></div><div className="slider-range" style={{ left: `${(memberRange[0] / MAX_MEMBERS) * 100}%`, right: `${100 - (memberRange[1] / MAX_MEMBERS) * 100}%` }}></div><input type="range" min="0" max={MAX_MEMBERS} step="1000" value={memberRange[0]} onChange={(e) => handleMemberRangeChange('min', parseInt(e.target.value, 10))} className="thumb" /><input type="range" min="0" max={MAX_MEMBERS} step="1000" value={memberRange[1]} onChange={(e) => handleMemberRangeChange('max', parseInt(e.target.value, 10))} className="thumb" /></div></div><div className="filter-group slider-group"><label>Growth Rate (New Members/mo): &gt;{growthRate.toLocaleString()}</label><input type="range" min="0" max="10000" step="100" value={growthRate} onChange={e => setGrowthRate(parseInt(e.target.value))} /></div><div className="filter-group slider-group"><label>Message Rate (Msgs/day): &gt;{messageRate.toLocaleString()}</label><input type="range" min="0" max="50000" step="500" value={messageRate} onChange={e => setMessageRate(parseInt(e.target.value))} /></div></div>
            <div className="filter-column"><h4 className="filter-column-title">Campaign Performance</h4><div className="filter-group slider-group"><label>Min. Promotion Acceptance: {acceptanceRate}%</label><input type="range" min="0" max="100" value={acceptanceRate} onChange={e => setAcceptanceRate(parseInt(e.target.value))} /></div><div className="filter-group"><div className="filter-label-with-tooltip"><label>Peak Activity Hours</label><div className="tooltip-container"><FaQuestionCircle /><div className="tooltip-content">{Object.entries(activityHourMap).map(([n, h]) => (<span key={n}><b>{n}:</b> {h}</span>))}</div></div></div><div className="button-grid">{Object.keys(activityHourMap).map(name => { const value = `${name} (${activityHourMap[name as keyof typeof activityHourMap]})`; return (<button key={name} className={`activity-btn ${activeHours.includes(value) ? 'active' : ''}`} onClick={() => handleActivityHourChange(value)}>{name}</button>); })}</div></div></div>
            <div className="advanced-filters-checkbox-row">
              <FilterCheckbox label="Has Known Influencers" checked={hasInfluencers} onChange={setHasInfluencers} />
              <FilterCheckbox label="Has Previous Collabs" checked={hasCollaborations} onChange={setHasCollaborations} />
              <FilterCheckbox label="Not Recently Saturated (30d)" checked={notSaturated} onChange={setNotSaturated} />
            </div>
          </div>
        )}
      </div>
      <div className="network-grid">{filteredAndSortedServers.map(server => (<ServerCard key={server.id} server={server} />))}</div>
    </div>
  );
};

export default Network;
