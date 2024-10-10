import React from "react";

import Statistics from "./Statistics";
import BarChart from "./BarCharts";
import PieChart from "./PieChart";

import { StatisticsProvider } from "../context/StatisticsContext";
import MonthSelector from "./MonthSelector";

function StatisticsDisplay() {
  return (
    <StatisticsProvider>
      <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Sales Dashboard
        </h1>

        {/* <MonthSelector /> */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Statistics />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <BarChart />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <PieChart />
          </div>
        </div>
      </div>
    </StatisticsProvider>
  );
}

export default StatisticsDisplay;
