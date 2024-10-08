import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ItemBox from "./ItemBox";

const SalesData = () => {
  const { month } = useParams();
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/sales/${month}`
        );
        setSales(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch sales data. Please try again.");
        setSales([]);
      }
    };

    if (month) {
      fetchSalesData();
    }
  }, [month]);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    if (selectedMonth === "all" || selectedMonth.trim() === "" || sales.length < 0) {
      navigate(`/`); // Ensure `/getSales` route exists for fetching all sales
    } else {
      navigate(`/sales/${selectedMonth}`);
    }
  };

  return (
    <div className="sales-container">
      <select
        id="month"
        value={month || ""}
        onChange={handleMonthChange}
        required
        style={{ zIndex: 10 }} 
        className="dropdown" 
      >
        <option value="">--Select Month--</option>
        <option value="all">All Months</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

      <div className="container mx-auto  mt-10 ml-20 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {sales.map((item) => (
      <ItemBox key={item.id} item={item} />
    ))}
        
      </div>
    </div>
  );
};

export default SalesData;
