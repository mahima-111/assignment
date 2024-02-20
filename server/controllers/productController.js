const Product = require('../models/Product');
const getProducts = async (req, res) => {
    const mon = parseInt(req.params.mon);
    const searchTerm = req.query.q || '';
    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10;
    const skip=(page-1)*perPage;
    try{
        const totalItems= await Product.countDocuments({
            $and:[
                {$expr: {$eq :[{ $month: "$dateOfSale" }, mon]}},
                {$or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]}
            ]
        });
        const totalPages=Math.ceil(totalItems/perPage) || 1;
        const productList =await Product.aggregate([
            {
                $match: {
                    $and:[
                        {$expr: {$eq :[{ $month: "$dateOfSale" }, mon]}},
                        {$or: [
                            { title: { $regex: searchTerm, $options: 'i' } },
                            { description: { $regex: searchTerm, $options: 'i' } }
                        ]}
                    ]
                }
            },
            {
                $skip: skip
            },
            {
                $limit: perPage
            }
        ]);
        res.json({productList,totalPages});
    }
    catch(err){
        res.json({'message': err})
    }
};
module.exports = getProducts;