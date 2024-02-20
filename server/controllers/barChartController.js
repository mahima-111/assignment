const Product = require('../models/Product');

const getBarChartData = async (req, res) => {
    const selectedMonth = parseInt(req.params.month);

    try {
        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];

        const barChartData = [];

        for (const range of priceRanges) {
            const count = await Product.countDocuments({
                $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
                price: { $gte: range.min, $lte: range.max }
            });
            barChartData.push({name:`${range.min}-${range.max === Infinity ? 'above' : range.max}`,value:count})
        }

        res.json(barChartData);
    } catch (err) {
        res.status(500).json({ message: err});
    }
};

module.exports = getBarChartData;
