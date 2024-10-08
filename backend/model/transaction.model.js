const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);