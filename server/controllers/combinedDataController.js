const axios = require('axios');

const getCombinedData = async (req, res) => {
    try {
        const selectedMonth=parseInt(req.params.month);
        const response1 = await axios.get(`http://localhost:5000/statistics/${selectedMonth}`);

        const response2 = await axios.get(`http://localhost:5000/bar-chart/${selectedMonth}`);

        const response3 = await axios.get(`http://localhost:5000/pie-chart/${selectedMonth}`);

        const combinedData = {
            statisticsData: response1.data,
            barChartData: response2.data,
            pieChartData: response3.data
        };

        res.json(combinedData);
    } catch (err) {
        res.status(500).json({ message: err});
    }
};

module.exports = getCombinedData;
