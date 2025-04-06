import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LatencyDistribution = ({ data }) => {
  // Group latencies into buckets
  const latencyBuckets = {
    '0-100ms': 0,
    '101-500ms': 0,
    '501-1000ms': 0,
    '1-5s': 0,
    '5s+': 0
  };

  data.forEach(item => {
    const latency = item.latency;
    if (latency <= 100) latencyBuckets['0-100ms']++;
    else if (latency <= 500) latencyBuckets['101-500ms']++;
    else if (latency <= 1000) latencyBuckets['501-1000ms']++;
    else if (latency <= 5000) latencyBuckets['1-5s']++;
    else latencyBuckets['5s+']++;
  });

  const chartData = {
    labels: Object.keys(latencyBuckets),
    datasets: [
      {
        label: 'Request Count',
        data: Object.values(latencyBuckets),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default LatencyDistribution;