import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import ResponseTimeChart from './ResponseTimeChart';
import LatencyDistribution from './LatencyDistribution';
import StatusCodeChart from './StatusCodeChart';
import DependencyGraph from './DependencyGraph';
import RequestVolume from './RequestVolume';
import TopEndpoints from './TopEndpoints';

const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #f5f7fa;
`;

const DashboardHeader = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthChart = styled.div`
  grid-column: 1 / -1;
`;

// Hardcoded data for different APIs
const apiData = {
  'frontend-proxy': {
    responseTimes: [
      { timestamp: '2025-04-05T17:46:42.959Z', latency: 354115 },
      { timestamp: '2025-04-05T17:46:42.971Z', latency: 33825 },
      { timestamp: '2025-04-05T17:46:43.003Z', latency: 881 },
      { timestamp: '2025-04-05T17:46:44.120Z', latency: 1200 },
      { timestamp: '2025-04-05T17:46:45.250Z', latency: 850 },
    ],
    statusCodes: [
      { code: 200, count: 85 },
      { code: 404, count: 5 },
      { code: 500, count: 2 },
    ],
    endpoints: [
      { path: '/images/Banner.png', count: 45, avgLatency: 354115 },
      { path: '/_next/static/chunks/main.js', count: 30, avgLatency: 33825 },
      { path: '/_next/static/buildManifest.js', count: 20, avgLatency: 881 },
    ],
    dependencies: [
      { from: 'frontend-proxy', to: 'image-provider', requests: 45 },
      { from: 'frontend-proxy', to: 'frontend', requests: 50 },
    ]
  },
  'image-provider': {
    responseTimes: [
      { timestamp: '2025-04-05T17:46:42.959Z', latency: 250 },
      { timestamp: '2025-04-05T17:46:43.500Z', latency: 180 },
      { timestamp: '2025-04-05T17:46:44.200Z', latency: 320 },
      { timestamp: '2025-04-05T17:46:45.100Z', latency: 150 },
    ],
    statusCodes: [
      { code: 200, count: 92 },
      { code: 404, count: 3 },
      { code: 500, count: 1 },
    ],
    endpoints: [
      { path: '/images/Banner.png', count: 45, avgLatency: 250 },
      { path: '/images/Logo.png', count: 30, avgLatency: 180 },
      { path: '/images/Header.jpg', count: 20, avgLatency: 320 },
    ],
    dependencies: [
      { from: 'image-provider', to: 'storage-service', requests: 95 },
    ]
  },
  'kafka': {
    responseTimes: [
      { timestamp: '2025-04-05T17:46:41.972Z', latency: 2 },
      { timestamp: '2025-04-05T17:46:41.973Z', latency: 1 },
      { timestamp: '2025-04-05T17:46:42.500Z', latency: 3 },
    ],
    statusCodes: [
      { code: 200, count: 100 },
    ],
    endpoints: [
      { path: '__cluster_metadata-0', count: 60, avgLatency: 2 },
      { path: '__consumer_offsets', count: 40, avgLatency: 1 },
    ],
    dependencies: [
      { from: 'kafka', to: 'zookeeper', requests: 100 },
    ]
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('frontend-proxy');
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>API Monitoring Dashboard</h1>
        <p>Real-time performance metrics and analytics</p>
      </DashboardHeader>
      
      <Tabs selectedIndex={Object.keys(apiData).indexOf(activeTab)} onSelect={(index) => setActiveTab(Object.keys(apiData)[index])}>
        <TabList>
          {Object.keys(apiData).map(apiName => (
            <Tab key={apiName}>{apiName}</Tab>
          ))}
        </TabList>
        
        {Object.entries(apiData).map(([apiName, data]) => (
          <TabPanel key={apiName}>
            <ChartGrid>
              <div>
                <h2>Response Time (ms)</h2>
                <ResponseTimeChart data={data.responseTimes} />
              </div>
              
              <div>
                <h2>HTTP Status Codes</h2>
                <StatusCodeChart data={data.statusCodes} />
              </div>
              
              <div>
                <h2>Top Endpoints</h2>
                <TopEndpoints data={data.endpoints} />
              </div>
              
              <div>
                <h2>Request Volume</h2>
                <RequestVolume data={data.responseTimes} />
              </div>
              
              <FullWidthChart>
                <h2>Latency Distribution</h2>
                <LatencyDistribution data={data.responseTimes} />
              </FullWidthChart>
              
              <FullWidthChart>
                <h2>Service Dependencies</h2>
                <DependencyGraph data={data.dependencies} currentService={apiName} />
              </FullWidthChart>
            </ChartGrid>
          </TabPanel>
        ))}
      </Tabs>
    </DashboardContainer>
  );
};

export default Dashboard;