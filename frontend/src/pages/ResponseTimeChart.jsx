import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ResponseTimeChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: data.map(item => item.latency),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}ms`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Milliseconds'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default ResponseTimeChart;