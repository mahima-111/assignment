const Product = require('../models/Product');

const getPieChartData = async (req, res) => {
    const selectedMonth = parseInt(req.params.month);

    try {
        const pieChartData = await Product.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
                }
            },
            {
                $group: {
                    _id: "$category",
                    itemCount: { $sum: 1 }
                }
            }
        ]);

        console.log(pieChartData);

        const formattedData = pieChartData.reduce((acc, curr) => {
            acc[curr._id] = curr.itemCount;
            return acc;
        }, {});

        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ message: err});
    }
};

module.exports =getPieChartData;
