
const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    
},{timestamps:true});


module.exports={
    ProductModel:mongoose.model('product',productSchema)
}