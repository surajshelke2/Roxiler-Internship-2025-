import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CombinedData = () => {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/combined-data?month=${month}`)
      .then((response) => {
        setCombinedData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching combined data', error);
      });
  }, []);

  if (!combinedData) return <div>Loading combined data...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Combined Data</h2>
      <div>{JSON.stringify(combinedData)}</div>
    </div>
  );
};

export default CombinedData;
