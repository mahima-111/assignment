const express = require('express');
const router = express.Router();
const getCombinedData = require('../controllers/combinedDataController');

router.get('/:month', getCombinedData);

module.exports = router;
