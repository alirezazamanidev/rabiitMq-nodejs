const jwt=require('jsonwebtoken')

async function IsAuth(req,res,next){
    try {
        const token=req.headers?.['token']?.split(" ")?.[1];
        jwt.verify(token,'secrertKey',(err,payload)=>{
            if(err)return res.json({error:err});
            req.user=payload;
            next();
        })
    } catch (error) {
        return res.json({error:error.message});
    }
}

module.exports={
    IsAuth
}