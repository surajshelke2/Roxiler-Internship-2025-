import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [barData, setBarData] = useState(null);
  const { month } = useContext(StatisticsContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/bar-chart?month=${month}`)
      .then((response) => {
        const data = response.data;
        setBarData({
          labels: Object.keys(data), // Labels from the price range keys
          datasets: [
            {
              label: 'Number of Transactions',
              data: Object.values(data), // Data from price ranges
              backgroundColor: '#60a5fa',
              borderColor: '#3b82f6',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching bar chart data', error);
      });
  }, [month]);

  if (!barData) return <div>Loading bar chart...</div>;

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
