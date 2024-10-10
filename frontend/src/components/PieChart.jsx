import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'; // Import the required elements

// Register the elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [pieData, setPieData] = useState({
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty'],
    datasets: [
      {
        data: [25, 15, 30, 10, 20], // Example dummy data
        backgroundColor: [
          '#f87171',
          '#60a5fa',
          '#34d399',
          '#fbbf24',
          '#a78bfa',
        ],
        hoverBackgroundColor: [
          '#fca5a5',
          '#93c5fd',
          '#6ee7b7',
          '#fde047',
          '#c4b5fd',
        ],
      },
    ],
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-violet-700">
        Sales by Category
      </h2>
      <div className="w-full max-w-md mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default PieChart;
