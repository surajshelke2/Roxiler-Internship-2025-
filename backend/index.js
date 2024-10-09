const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const saleRoutes = require("./routes/seed.route");
const connectDB = require("./database/db");
const { initializeDatabase } = require('./components/saleController'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const start = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB successfully.");
        
        await initializeDatabase();
        console.log("Database initialized successfully.");

        app.use("/api", saleRoutes);
        

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1);
    }
};

start();

module.exports = app;