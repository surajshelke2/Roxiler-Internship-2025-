const Sale = require("../model/sale");

const getStartAndEndDate = (month) => {
  const [year, monthNumber] = month.split("-");
  
  const startDate = new Date(`${year}-${monthNumber}-01T00:00:00.000Z`); // Start of the month
  const endDate = new Date(year, monthNumber, 0, 23, 59, 59, 999); // Last day of the month
  
  return { startDate, endDate };
};

const getStatistics = async (month) => {
  try {
    const { startDate, endDate } = getStartAndEndDate(month);

    const sales = await Sale.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate }, // Match sales between start and end of month
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          totalSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] },
          },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
    ]);

    return sales.length > 0
      ? sales[0]
      : { totalAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 };
  } catch (err) {
    console.error("Error fetching statistics:", err);
    throw new Error("Server error");
  }
};

const getTransactionsByMonth = async (month) => {
  const { startDate, endDate } = getStartAndEndDate(month);
  return await Sale.find({
    dateOfSale: { $gte: startDate, $lte: endDate },
  });
};

const getBarChart = async (month) => {
  try {
    const transactions = await getTransactionsByMonth(month);
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    transactions.forEach(({ price }) => {
      if (price <= 100) priceRanges["0-100"]++;
      else if (price <= 200) priceRanges["101-200"]++;
      else if (price <= 300) priceRanges["201-300"]++;
      else if (price <= 400) priceRanges["301-400"]++;
      else if (price <= 500) priceRanges["401-500"]++;
      else if (price <= 600) priceRanges["501-600"]++;
      else if (price <= 700) priceRanges["601-700"]++;
      else if (price <= 800) priceRanges["701-800"]++;
      else if (price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    return priceRanges;
  } catch (err) {
    console.error("Error fetching bar chart data:", err);
    throw new Error("Server error");
  }
};

const getPieChart = async (month) => {
  try {
    const transactions = await getTransactionsByMonth(month);
    const categories = {};

    transactions.forEach(({ category }) => {
      categories[category] = (categories[category] || 0) + 1;
    });

    return Object.keys(categories).map((cat) => ({
      category: cat,
      items: categories[cat],
    }));
  } catch (err) {
    console.error("Error fetching pie chart data:", err);
    throw new Error("Server error");
  }
};

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month parameter is required" });
    }

    const [stats, barChart, pieChart] = await Promise.all([
      getStatistics(month),
      getBarChart(month),
      getPieChart(month),
    ]);

    res.status(200).json({
      statistics: stats,
      barChart,
      pieChart,
    });
  } catch (err) {
    console.error("Error fetching combined data:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCombinedData  , getBarChart , getPieChart , getStatistics};
