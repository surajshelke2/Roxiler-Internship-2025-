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
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };



  const monthIndex = monthMap[month.toLowerCase()];
  if (monthIndex === undefined) {
    return res.status(400).json({ message: 'Invalid month' });
  }
  

   

  try {
    const sales = await Sale.find({
      dateOfSale: {
        $gte: new Date(new Date().getFullYear(), monthIndex, 1),
        $lt: new Date(new Date().getFullYear(), monthIndex + 1, 1),
      },
    });
    console.log(sales)
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales data.', error });
  }
};

module.exports = {getData, initializeDatabase, getSalesByMonth };
