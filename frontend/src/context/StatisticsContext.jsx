import React, { createContext, useState } from "react";

export const StatisticsContext = createContext();

export const StatisticsProvider = ({ children }) => {

  const [month, setMonth] = useState("2024-01");

  console.log(month)

  return (
    <StatisticsContext.Provider value={{ month, setMonth }}>
      {children}
    </StatisticsContext.Provider>
  );
};
