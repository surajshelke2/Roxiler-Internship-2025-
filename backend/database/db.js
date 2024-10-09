const mongoose = require('mongoose');

  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
      });
      console.log('MongoDB connected successfully.');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
     
    }
  };
  


module.exports = connectDB;
