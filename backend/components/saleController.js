const Sale = require('../model/sale');
const axios = require('axios')

const getData = async (req,res) => {
  try {
    
    const sales = await Sale.find({}); 
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    throw new Error('Could not fetch sales data'); 
  }
};



const initializeDatabase = async (req,res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        
        if (!response || !response.data) {
            throw new Error('Invalid response from API');
        }

        const salesData = response.data;

        if (!Array.isArray(salesData)) {
            throw new Error('Sales data is not an array');
        }

        const sales = salesData.map(item => ({
            id: item.id,
            title: item.title,
            dateOfSale: new Date(item.dateOfSale),
            image: item.image,
            category: item.category,
            description:item.description,
            sold: item.sold,
            price: item.price
        }));

        

        await Sale.deleteMany({});
        await Sale.insertMany(sales);

       
         
        console.log('Database initialized successfully with sales data!');
        res.status(200).json(sales)
    } catch (error) {
        console.error('Failed to fetch or initialize database:', error.message);
    }
};



const getSalesByMonth = async (req, res) => {
  const { month } = req.params; 
  try {
      const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth();

      const sales = await Sale.aggregate([
          {
              $match: {
                  $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }  
              }
          }
      ]);

      if (sales.length === 0) {
          return res.status(404).json({ message: "No sales found for the specified month." });
      }

      res.status(200).json(sales);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch sales data', error });
  }
};


module.exports = {getData, initializeDatabase, getSalesByMonth };
