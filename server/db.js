const mongoose=require('mongoose');

const mongoUrl='mongodb://127.0.0.1:27017/ShoppingSite';

mongoose.connect(mongoUrl);

const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to mongoDB');
})
db.on('error',(err)=>{
    console.log('error connecting '+err);
})
db.on('disconnected',()=>{
    console.log('mongoDB disconnected');
})
module.exports=db;