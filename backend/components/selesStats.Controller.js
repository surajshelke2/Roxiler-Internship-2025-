// const Sale = require("../model/sale");

// // Helper function to validate month format (YYYY-MM)
// const validateMonth = (month) => {
//   const regex = /^\d{4}-(0[1-9]|1[0-2])$/; // Regex to check for valid YYYY-MM format
//   return regex.test(month);
// };

// const getStartAndEndDate = (month) => {
//   const [year, monthNumber] = month.split('-');
//   const startDate = new Date(`${year}-${monthNumber}-01T00:00:00.000Z`);
//   const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999);
//   return { startDate, endDate };
// };

// const getStatistics = async (req, res) => {
//   try {
//     const { month } = req.query;

//     if (!month) {
//       return res.status(400).json({ error: 'Month parameter is required' });
//     }

//     // Get the start and end date of the specified month
//     const { startDate, endDate } = getStartAndEndDate(month);

//     // Query the sales data from MongoDB
//     const sales = await Sale.aggregate([
//       {
//         $match: {
//           dateOfSale: { $gte: startDate, $lte: endDate },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: "$price" }, // Sum the total price of sold items
//           totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } }, // Count sold items
//           totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }, // Count unsold items
//         },
//       },
//     ]);

//     // Return statistics or zeroes if no data is found
//     const statistics = sales.length > 0
//       ? sales[0]
//       : { totalAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 };

//     return res.status(200).json(statistics);
//   } catch (err) {
//     console.error("Error fetching statistics:", err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };



// // Function to get all transactions for a given month
// const getTransactionsByMonth = async (month) => {
//   const { startDate, endDate } = getStartAndEndDate(month);
//   return await Sale.find({
//     dateOfSale: { $gte: startDate, $lte: endDate },
//   });
// };

// // Function to get bar chart data based on price ranges for a given month
// const getBarChart = async (month) => {
//   try {
//     const transactions = await getTransactionsByMonth(month);
//     const priceRanges = {
//       "0-100": 0,
//       "101-200": 0,
//       "201-300": 0,
//       "301-400": 0,
//       "401-500": 0,
//       "501-600": 0,
//       "601-700": 0,
//       "701-800": 0,
//       "801-900": 0,
//       "901-above": 0,
//     };

//     // Categorize transactions into price ranges
//     transactions.forEach(({ price }) => {
//       if (price <= 100) priceRanges["0-100"]++;
//       else if (price <= 200) priceRanges["101-200"]++;
//       else if (price <= 300) priceRanges["201-300"]++;
//       else if (price <= 400) priceRanges["301-400"]++;
//       else if (price <= 500) priceRanges["401-500"]++;
//       else if (price <= 600) priceRanges["501-600"]++;
//       else if (price <= 700) priceRanges["601-700"]++;
//       else if (price <= 800) priceRanges["701-800"]++;
//       else if (price <= 900) priceRanges["801-900"]++;
//       else priceRanges["901-above"]++;
//     });

//     return priceRanges;
//   } catch (err) {
//     console.error("Error fetching bar chart data:", err);
//     throw new Error("Server error");
//   }
// };

// // Function to get pie chart data based on categories for a given month
// const getPieChart = async (month) => {
//   try {
//     const transactions = await getTransactionsByMonth(month);
//     const categories = {};

//     // Count transactions by category
//     transactions.forEach(({ category }) => {
//       categories[category] = (categories[category] || 0) + 1;
//     });

//     // Format the result as an array of category data
//     return Object.keys(categories).map((cat) => ({
//       category: cat,
//       items: categories[cat],
//     }));
//   } catch (err) {
//     console.error("Error fetching pie chart data:", err);
//     throw new Error("Server error");
//   }
// };

// // Controller function to get all combined data (statistics, bar chart, pie chart)
// const getCombinedData = async (req, res) => {
//   try {
//     const { month } = req.query;

//     // Validate month format
//     if (!month || !validateMonth(month)) {
//       return res.status(400).json({ error: "Invalid or missing month parameter" });
//     }

//     // Fetch statistics, bar chart, and pie chart data concurrently
//     const [stats, barChart, pieChart] = await Promise.all([
//       getStatistics(month),
//       getBarChart(month),
//       getPieChart(month),
//     ]);


//     res.status(200).json({
//       statistics: stats,
//       barChart,
//       pieChart,
//     });
//   } catch (err) {
//     console.error("Error fetching combined data:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { getCombinedData, getBarChart, getPieChart, getStatistics };
