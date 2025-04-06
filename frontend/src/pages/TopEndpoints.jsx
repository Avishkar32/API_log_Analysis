import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopEndpoints = ({ data }) => {
  // Sort by count descending
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 5);

  const chartData = {
    labels: sortedData.map(item => item.path),
    datasets: [
      {
        label: 'Request Count',
        data: sortedData.map(item => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
      {
        label: 'Avg Latency (ms)',
        data: sortedData.map(item => item.avgLatency),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // This makes the bar chart horizontal
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}${context.datasetIndex === 1 ? 'ms' : ''}`;
          }
        }
      }
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TopEndpoints;