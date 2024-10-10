import React, { useEffect, useState } from 'react';

const CombinedData = () => {
  const [combinedData, setCombinedData] = useState(null);

  // Dummy combined data
  const dummyCombinedData = {
    statistics: {
      totalAmount: 5000,
      totalSoldItems: 120,
      totalNotSoldItems: 30,
    },
    barChart: {
      '0-100': 10,
      '101-200': 8,
      '201-300': 15,
      '301-400': 12,
      '401-500': 7,
    },
    pieChart: [
      { category: 'Electronics', items: 30 },
      { category: 'Clothing', items: 50 },
      { category: 'Furniture', items: 40 },
    ],
  };

  // Set the combined data to dummy data directly on mount
  useEffect(() => {
    setCombinedData(dummyCombinedData);
  }, []);

  if (!combinedData) return <div>Loading combined data...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Combined Sales Data
      </h2>
      <pre className="whitespace-pre-wrap p-4 bg-gray-100 rounded-md">
        {JSON.stringify(combinedData, null, 2)}
      </pre>
    </div>
  );
};

export default CombinedData;
