const express=require('express');
const { AuthRouter } = require('./handler/auth');
const app=express();
require('dotenv').config();
const {PORT}=process.env;
require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth',AuthRouter);
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
    console.log("Run > localhost:3001");
})