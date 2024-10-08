import React, { useState } from 'react';
import axios from 'axios';

const SalesData = () => {
    const [month, setMonth] = useState('');
    const [sales, setSales] = useState([]);
    const [error, setError] = useState('');

    const fetchSalesData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/sales/${month}`);
            setSales(response.data);
            console.log(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch sales data. Please try again.');
        }
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSalesData();
    };

    return (
        <div className="sales-container">
            <h1>Sales Data</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={month} onChange={handleMonthChange} required>
                    <option value="">--Select Month--</option>
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
                <button type="submit">Fetch Sales Data</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {sales.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Date of Sale</th>
                            <th>Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.item}</td>
                                <td>{sale.price}</td>
                                <td>{new Date(sale.dateOfSale).toLocaleDateString()}</td>
                                <td>{sale.customer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesData;
