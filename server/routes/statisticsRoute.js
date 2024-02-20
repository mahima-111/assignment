const express = require('express');
const router = express.Router();
const getStatistics = require('../controllers/statisticsController');

router.get('/:month', getStatistics);

module.exports = router;
