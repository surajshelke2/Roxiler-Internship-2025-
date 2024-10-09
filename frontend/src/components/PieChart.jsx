import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'; // Import the required elements

import { StatisticsContext } from '../context/StatisticsContext';

// Register the elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [pieData, setPieData] = useState(null);
  const { month } = useContext(StatisticsContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/pie-chart?month=${month}`)
      .then((response) => {
        const data = response.data;
        console.log(data)
        setPieData({
          labels: data.map((item) => item.category),
          datasets: [
            {
              data: data.map((item) => item.items),
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
      })
      .catch((error) => {
        console.error('Error fetching pie chart data', error);
      });
  }, [month]);

  if (!pieData) return <div>Loading pie chart...</div>;

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
