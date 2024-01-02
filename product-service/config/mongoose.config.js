const mongoose=require('mongoose');


const uri='mongodb://127.0.0.1:27017/product-service'
mongoose.connect(uri)
.then(()=>console.log('coonect to product-service db'))
.catch((err)=>console.log(err.message));