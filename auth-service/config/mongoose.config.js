const mongoose=require('mongoose');


const uri='mongodb://127.0.0.1:27017/auth-service'
mongoose.connect(uri)
.then(()=>console.log('coonect to auth-service db'))
.catch((err)=>console.log(err.message));