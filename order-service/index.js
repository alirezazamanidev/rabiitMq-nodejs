const express=require('express');
const { OrderRouter } = require('./handler/order');
const app=express();
require('dotenv').config();
const {PORT}=process.env;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/order',OrderRouter);
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Not Found!"
    })
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message:err.message
    })
})

app.listen(PORT,()=>{
    console.log("Run > localhost:3002");
})