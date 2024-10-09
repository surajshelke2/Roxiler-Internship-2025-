import React, { useContext, useState } from 'react';
import { StatisticsContext } from '../context/StatisticsContext';

const MonthSelector = () => {
  const { month, setMonth } = useContext(StatisticsContext);
  

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('01');

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
 
    setMonth(`${newYear}-${selectedMonth}`);
  };


  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
   
    setMonth(`${selectedYear}-${newMonth}`);
  };

  return (
    <div className="mb-4">
      <label className="block text-lg mt-32 font-semibold mb-2">Select Year:</label>
      <select value={selectedYear} onChange={handleYearChange} className="border rounded p-2 mb-4">
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <label className="block text-lg mt-2 font-semibold mb-2">Select Month:</label>
      <select value={selectedMonth} onChange={handleMonthChange} className="border rounded p-2">
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="mt-4">
        <p>Selected Month: {month}</p>
      </div>
    </div>
  );
};

export default MonthSelector;
