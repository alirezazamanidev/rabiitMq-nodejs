const mongoose=require('mongoose');


const uri='mongodb://127.0.0.1:27017/order-service'
mongoose.connect(uri)
.then(()=>console.log('coonect to order-service db'))
.catch((err)=>console.log(err.message));