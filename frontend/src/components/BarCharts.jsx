import React, { useContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { StatisticsContext } from '../context/StatisticsContext';

// Register the scales and elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [barData, setBarData] = useState({
    labels: ['Under $10', '$10 - $50', '$50 - $100', '$100 - $500', 'Over $500'], // Dummy labels
    datasets: [
      {
        label: 'Number of Transactions',
        data: [15, 25, 40, 20, 10], // Dummy data
        backgroundColor: '#60a5fa',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-violet-700">
        Sales by Price Range
      </h2>
      <div className="w-full max-w-lg mx-auto">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default BarChart;
