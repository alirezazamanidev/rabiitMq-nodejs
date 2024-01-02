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
router.post('/buy',async(req,res,next)=>{
    try {
      const {productsId=[]}=req.body;
      const products=await ProductModel.find({_id:{$in:productsId}}); 
    } catch (error) {
        next(error)
    }
})
module.exports={
    ProductRouter:router
}