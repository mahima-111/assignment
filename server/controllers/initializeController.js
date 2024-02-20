const axios=require('axios');
const Product=require('../models/Product');
const initializeDatabase=async(req,res)=>{
    try {
        const {data}=await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products=data;
        console.log(products);
    
        await Product.insertMany(products);
    
        res.json({message: 'database initialize successful'})
    } 
    catch (err){
        console.error('Error initializing database:', err);
    }
}

module.exports=initializeDatabase;