import React, { useContext, useEffect, useState } from 'react';
import { StatisticsContext } from '../context/StatisticsContext';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const { month } = useContext(StatisticsContext);

  // Dummy data to display
  const dummyStats = {
    totalAmount: 5000,
    totalSoldItems: 120,
    totalNotSoldItems: 30,
  };

  // Set the stats to dummy data on mount
  useEffect(() => {
    setStats(dummyStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-white rounded-lg mt-24 shadow-md">
      <h2 className="text-3xl font-bold mb-6">Statistics</h2>
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
