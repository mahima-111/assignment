const express=require('express');
const port=5000;
require('./db');
const app=express();
const cors=require('cors');

const initializeRouter=require('./routes/initializeRoute');
const productRouter=require('./routes/productRoute');
const statisticsRouter=require('./routes/statisticsRoute');
const barChartRouter=require('./routes/barChartRoute');
const pieChartRouter=require('./routes/pieChartRoute');
const combinedDataRouter=require('./routes/combinedDataRoute');

app.use('/initialize',initializeRouter);
app.use('/products',productRouter);
app.use('/statistics',statisticsRouter);
app.use('/bar-chart',barChartRouter);
app.use('/pie-chart',pieChartRouter);
app.use('/combined-data',combinedDataRouter);

app.use(cors());
app.listen(port,()=>{
    console.log('listening on port '+port);
})