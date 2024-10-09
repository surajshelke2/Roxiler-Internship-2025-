const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sold: {
        type: Boolean,
        required: true,
    },
    dateOfSale: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});


saleSchema.pre('save', function(next) {
    const year = this.dateOfSale.getFullYear();
    const month = String(this.dateOfSale.getMonth() + 1).padStart(2, '0'); // Pad with zero
    this.month = `${year}-${month}`; // Format as YYYY-MM
    next();
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
