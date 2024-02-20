const express = require('express');
const router = express.Router();
const getPieChartData = require('../controllers/pieChartController');

router.get('/:month',getPieChartData);

module.exports = router;
