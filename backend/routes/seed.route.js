const express = require('express');
const { getSalesByMonth, getData } = require('../components/saleController');

const router = express.Router();

router.get('/getSales', getData);
router.get('/sales/:month', getSalesByMonth);

module.exports = router;
