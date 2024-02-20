const Product = require('../models/Product');

const getStatistics = async (req, res) => {
    const selectedMonth = parseInt(req.params.month);

    try {
        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
                    sold: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$price" }
                }
            }
        ]);

        const totalSoldItems = await Product.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
            sold: true 
        });

        const totalNotSoldItems = await Product.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
            sold: false
        });

        res.json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getStatistics;
