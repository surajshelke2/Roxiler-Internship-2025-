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
        type: String ,
        required:true,
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
    }
}, {
    timestamps: true,
});


const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;

