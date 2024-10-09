const express = require('express');
const { getStatistics, getBarChart, getPieChart, getCombinedData } = require('../components/selesStats.Controller');

const router = express.Router();
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined-data', getCombinedData);

module.exports = router;
