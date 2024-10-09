const express = require('express');
const { getSalesByMonth, getData, getSales } = require('../components/saleController');


const router = express.Router();

router.get('/getSales', getData);
router.get('/getTransation',getSales);

router.get('/sales/:month', getSalesByMonth);
module.exports = router;
