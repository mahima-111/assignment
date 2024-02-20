const express = require('express');
const router = express.Router();
const getBarChartData = require('../controllers/barChartController');

router.get('/:month', getBarChartData);

module.exports = router;
