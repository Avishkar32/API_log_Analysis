import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RequestVolume = ({ data }) => {
  // Group by minute
  const timeBuckets = {};
  data.forEach(item => {
    const date = new Date(item.timestamp);
    const minute = `${date.getHours()}:${date.getMinutes()}`;
    timeBuckets[minute] = (timeBuckets[minute] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(timeBuckets),
    datasets: [
      {
        label: 'Requests per minute',
        data: Object.values(timeBuckets),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
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

export default RequestVolume;