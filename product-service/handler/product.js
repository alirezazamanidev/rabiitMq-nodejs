const { ProductModel } = require('../model/product');

const router=require('express').Router();

router.post('/create',async(req,res,next)=>{
    try {
        await ProductModel.create({...req.body});
        res.status(201).json({
            message:"The product has been created!"
        })
    } catch (error) {
        next(error)
    }
})

module.exports={
    ProductRouter:router
}