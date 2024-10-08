import React from 'react';
import './App.css';
import Sales from './components/Sales'; // Make sure this component exists
import Navbar from './components/Navbar';
import SalesData from './components/SalesData';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="bg-white">
            <Navbar />
            <Routes>
                <Route path="/sales/:month" element={<SalesData />} />
                <Route path="/" element={<Sales />} /> {/* Home or Overview page */}
            </Routes>
        </div>
    );
}

export default App;
