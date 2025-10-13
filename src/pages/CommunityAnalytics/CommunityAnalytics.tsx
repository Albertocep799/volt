import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaLink, FaBullhorn, FaArrowUp, FaArrowDown, FaEye, FaMousePointer, FaDollarSign, FaPercentage, FaChartLine, FaPlusCircle } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './CommunityAnalytics.scss';
import { analyticsData } from '../../data/analytics';
import { voltCommunities } from '../../data/dash';
import DateFilter from '../../components/DateFilter/DateFilter';
import PaymentSettings from '../../components/PaymentSettings/PaymentSettings';

interface Tab { id: string; label: string; }

const TABS: Tab[] = [
  { id: 'general', label: 'General' },
  { id: 'ads', label: 'Ad Performance' },
  { id: 'audience', label: 'Audience Insights' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'payment', label: 'Payment' },
];

const CommunityAnalytics: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [activeTab, setActiveTab] = useState<string>('general');
  
  if (!communityId) return <div>Community ID not provided.</div>;
  const community = voltCommunities.find(c => c.id === communityId);
  const data = analyticsData[communityId];
  if (!data || !community) return <div>No analytics data found.</div>;

  const renderTrendIcon = (trend: number, unit: string = '%') => {
    const icon = trend >= 0 ? <FaArrowUp /> : <FaArrowDown />;
    const color = trend >= 0 ? 'trend-positive' : 'trend-negative';
    return <span className={`trend-indicator ${color}`}>{icon} {Math.abs(trend)}{unit}</span>;
  };

  const renderGeneralTab = () => (
    <>
      <section className="key-metrics-grid four-cols">
        <div className="metric-card"><div className="metric-header"><FaUsers /><span>New Members</span></div><h2>{data.keyMetrics.newMembers.value}</h2>{renderTrendIcon(data.keyMetrics.newMembers.trend)}</div>
        <div className="metric-card"><div className="metric-header"><FaLink /><span>Link Clicks</span></div><h2>{data.keyMetrics.linkClicks.value.toLocaleString()}</h2>{renderTrendIcon(data.keyMetrics.linkClicks.trend)}</div>
        <div className="metric-card"><div className="metric-header"><FaBullhorn /><span>Active Campaigns</span></div><h2>{data.keyMetrics.activeCampaigns.value}</h2>{renderTrendIcon(data.keyMetrics.activeCampaigns.trend)}</div>
        <div className="metric-card"><div className="metric-header"><FaPercentage /><span>Engagement Rate</span></div><h2>{data.keyMetrics.engagementRate.value}%</h2>{renderTrendIcon(data.keyMetrics.engagementRate.trend)}</div>
      </section>
      <section className="charts-grid">
        <div className="chart-card"><h3>Member Growth</h3><ResponsiveContainer width="100%" height={300}><LineChart data={data.memberGrowth}><CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" /><XAxis dataKey="date" stroke="#a0a0a0" /><YAxis stroke="#a0a0a0" /><Tooltip contentStyle={{ backgroundColor: '#1c1c1c'}} /><Legend /><Line type="monotone" dataKey="value" name="New Members" stroke="#FCBE03" /></LineChart></ResponsiveContainer></div>
        <div className="chart-card"><h3>Messages Sent</h3><ResponsiveContainer width="100%" height={300}><LineChart data={data.messagesSent}><CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" /><XAxis dataKey="date" stroke="#a0a0a0" /><YAxis stroke="#a0a0a0" /><Tooltip contentStyle={{ backgroundColor: '#1c1c1c'}} /><Legend /><Line type="monotone" dataKey="value" name="Messages" stroke="#00acee" /></LineChart></ResponsiveContainer></div>
      </section>
    </>
  );

  const renderAdPerformanceTab = () => (
    <>
      <section className="key-metrics-grid four-cols">
        <div className="metric-card"><div className="metric-header"><FaEye /><span>Overall CTR</span></div><h2>{data.adPerformance.overallCTR.value}%</h2>{renderTrendIcon(data.adPerformance.overallCTR.trend)}</div>
        <div className="metric-card"><div className="metric-header"><FaMousePointer /><span>Total Conversions</span></div><h2>{data.adPerformance.totalConversions.value}</h2>{renderTrendIcon(data.adPerformance.totalConversions.trend)}</div>
        <div className="metric-card"><div className="metric-header"><FaDollarSign /><span>Average CPC</span></div><h2>${data.adPerformance.averageCPC.value.toFixed(2)}</h2>{renderTrendIcon(data.adPerformance.averageCPC.trend, '%')}</div>
        <div className="metric-card"><div className="metric-header"><FaChartLine /><span>ROAS</span></div><h2>{data.adPerformance.roas.value}x</h2>{renderTrendIcon(data.adPerformance.roas.trend, 'x')}</div>
      </section>
      <section className="charts-grid">
        <div className="table-card full-width">
          <h3>Campaign Breakdown</h3>
          <table>
            <thead>
              <tr><th>Campaign</th><th>Platform</th><th>CTR</th><th>Conversions</th><th>CPC</th></tr>
            </thead>
            <tbody>
              {data.adPerformance.campaigns.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.platform}</td>
                  <td>{c.ctr}%</td>
                  <td>{c.conversions}</td>
                  <td>${c.cpc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chart-card"><h3>Conversions by Platform</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={data.adPerformance.conversionsByPlatform as any[]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>{data.adPerformance.conversionsByPlatform.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>
      </section>
    </>
  );

  const renderAudienceInsightsTab = () => (
    <>
      <section className="charts-grid">
        <div className="chart-card"><h3>Country Demographics</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={data.audience.demographics as any[]} dataKey="percentage" nameKey="country" cx="50%" cy="50%" outerRadius={100} label>{data.audience.demographics.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}</Pie><Tooltip formatter={(v) => `${v}%`} /><Legend /></PieChart></ResponsiveContainer></div>
        <div className="chart-card"><h3>New vs. Returning Users</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={data.audience.newVsReturning as any[]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>{data.audience.newVsReturning.map((e, i) => <Cell key={`cell-${i}`} fill={e.color} />)}</Pie><Tooltip formatter={(v) => `${v}%`} /></PieChart></ResponsiveContainer></div>
        <div className="chart-card full-width"><h3>Peak Activity Hours</h3><ResponsiveContainer width="100%" height={300}><BarChart data={data.audience.activityHours}><CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" /><XAxis dataKey="hour" stroke="#a0a0a0" /><YAxis stroke="#a0a0a0" /><Tooltip contentStyle={{ backgroundColor: '#1c1c1c'}} cursor={{fill: 'rgba(252, 190, 3, 0.1)'}} /><Bar dataKey="activity" name="User Activity" fill="#FCBE03" /></BarChart></ResponsiveContainer></div>
      </section>
      <section className="table-card full-width">
        <h3>Top Community Roles</h3>
        <table>
          <thead>
            <tr><th>Role</th><th>Member Count</th></tr>
          </thead>
          <tbody>
            {data.audience.topRoles.map(r => (
              <tr key={r.role}>
                <td><span className="role-name" style={{'--role-color': r.color} as React.CSSProperties}>{r.role}</span></td>
                <td>{r.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderCampaignsTab = () => {
    const calculateROAS = (revenue: number, cost?: number) => {
        if (!cost || cost === 0) return <span className="data-na">N/A</span>;
        const roas = revenue / cost;
        const color = roas < 1 ? 'trend-negative' : 'trend-positive';
        return <span className={color}>{roas.toFixed(2)}x</span>
    };

    return (
        <div className="table-card full-width">
            <h3>Managed Campaigns</h3>
            <table>
                <thead>
                    <tr>
                        <th>Campaign</th>
                        <th>Status</th>
                        <th>Clicks</th>
                        <th>Conversions</th>
                        <th>Revenue</th>
                        <th>Server Cost</th>
                        <th>ROAS</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.managedCampaigns.map(c => (
                        <tr key={c.id}>
                            <td>
                                <div className="campaign-name">{c.name}</div>
                                <div className="campaign-advertiser">by {c.advertiser}</div>
                            </td>
                            <td><span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span></td>
                            <td>{c.autoMetrics.clicks.toLocaleString()}</td>
                            <td>{c.autoMetrics.conversions.toLocaleString()}</td>
                            <td><span className="revenue-positive">${c.autoMetrics.revenue.toLocaleString()}</span></td>
                            <td>{c.manualMetrics?.serverCost ? `$${c.manualMetrics.serverCost.toLocaleString()}` : <span className="data-na">N/A</span>}</td>
                            <td>{calculateROAS(c.autoMetrics.revenue, c.manualMetrics?.serverCost)}</td>
                            <td>
                                {c.status === 'Pending Data' && (
                                    <button className="action-button"><FaPlusCircle /> Add Data</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  const renderPaymentTab = () => (
    <PaymentSettings />
  );

  return (
    <div className="analytics-container">
      <Link to="/dashboard" className="back-link"><FaArrowLeft /> Back to Dashboard</Link>

      <header className="analytics-header-redesigned">
        <div className="community-icon" />
        <div className="community-info">
            <h1>{community.name}</h1>
            <p>Community Insights</p>
        </div>
      </header>

      <div className="analytics-controls">
        <div className="tabs-nav">{TABS.map(tab => (<button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>))}</div>
         <DateFilter />
      </div>

      <div className="tab-content">
        {activeTab === 'general' && renderGeneralTab()}
        {activeTab === 'ads' && renderAdPerformanceTab()}
        {activeTab === 'audience' && renderAudienceInsightsTab()}
        {activeTab === 'campaigns' && renderCampaignsTab()}
        {activeTab === 'payment' && renderPaymentTab()}
      </div>
    </div>
  );
};

export default CommunityAnalytics;
