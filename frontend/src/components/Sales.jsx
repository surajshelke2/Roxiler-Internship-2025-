import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';

const Sales = () => {
  const [sales, setSales] = useState([]);

  const initializeDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/getSales');

      if (!response || !response.data) {
        throw new Error('Invalid response from API');
      }

      const salesData = response.data;

      if (!Array.isArray(salesData)) {
        throw new Error('Sales data is not an array');
      }

      const formattedSales = salesData.map(item => ({
        id: item.id,
        title: item.title,
        dateOfSale: new Date(item.dateOfSale).toLocaleDateString(),
        image: item.image,
        category: item.category,
        description:item.description,
        sold: item.sold,
        price: item.price,
      }));

      setSales(formattedSales);
      console.log("Data", formattedSales);
    } catch (error) {
      console.error('Failed to fetch or initialize database:', error.message);
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <div className="container mx-auto mt-20 ml-20 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {sales.map((item) => (
      <ItemBox key={item.id} item={item} />
    ))}
  </div>
  );
};

export default Sales;
