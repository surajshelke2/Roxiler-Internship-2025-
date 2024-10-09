import React from "react";

import Statistics from "./Statistics";
import BarChart from "./BarCharts";
import PieChart from "./PieChart";
import MonthSelector from "./MonthSelector";
import { StatisticsProvider } from "../context/StatisticsContext";

function StatisticsDisplay() {
  return (
    <StatisticsProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Sales Dashboard</h1>

        <MonthSelector />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Statistics />
          {/* <CombinedData /> */}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
          <BarChart />
          <PieChart />
        </div>
      </div>
    </StatisticsProvider>
  );
}

export default StatisticsDisplay;
