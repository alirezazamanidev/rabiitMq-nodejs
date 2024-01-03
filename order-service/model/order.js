
const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    products:[{
    }],
    email:{type:String,required:true},
    totalPrice:{type:Number,default:0},
    
},{timestamps:true});


module.exports={
    OrderModel:mongoose.model('order',orderSchema)
}