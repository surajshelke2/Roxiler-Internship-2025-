import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StatisticsContext } from '../context/StatisticsContext';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const { month } = useContext(StatisticsContext); 

  useEffect(() => {
    if (month) {
      axios.get(`http://localhost:4000/api/v1/statistics?month=${month}`)
        .then((response) => {
          setStats(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching statistics', error);
        });
    }
  }, [month]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <ul className="list-disc list-inside">
        {Object.keys(stats).map((key) => (
          <li key={key}>
            <span className="font-medium">{key}:</span> {stats[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
