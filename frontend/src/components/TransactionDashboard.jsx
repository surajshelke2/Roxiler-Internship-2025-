import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionDashboard = () => {
    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState('');
    const [perPage, setPerPage] = useState(10);

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getTransation', {
                params: { search, page, perPage, month }
            });
            setSales(response.data.sales);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, [search, page, perPage, month]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Transaction Dashboard</h1>

            <div className="flex justify-between mb-4">
                {/* Search Field */}
                <input
                    type="text"
                    placeholder="Search transaction"
                    className="p-2 border rounded w-full max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* Month Filter */}
                <input
                    type="month"
                    className="p-2 border rounded ml-4"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </div>

            {/* Transaction Table */}
            <table className="min-w-full table-auto bg-yellow-100">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Sold</th>
                        <th className="px-4 py-2">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id} className="text-center">
                            <td className="border px-4 py-2">{sale.id}</td>
                            <td className="border px-4 py-2">{sale.title}</td>
                            <td className="border px-4 py-2">{sale.description}</td>
                            <td className="border px-4 py-2">${sale.price}</td>
                            <td className="border px-4 py-2">{sale.category}</td>
                            <td className="border px-4 py-2">{sale.sold ? 'Yes' : 'No'}</td>
                            <td className="border px-4 py-2">
                                <img src={sale.image} alt={sale.title} className="h-16 mx-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div>
                    Page {page} of {totalPages}
                </div>
                <div>
                    <button
                        className="mr-2 p-2 border rounded"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                    <button
                        className="p-2 border rounded"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
                <div>
                    Per Page:
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="ml-2 p-2 border rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TransactionDashboard;
