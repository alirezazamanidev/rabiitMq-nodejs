const { UserModel } = require('../model/user');
const jwt=require('jsonwebtoken');

const router=require('express').Router();

router.use('/register',async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user) throw {message:"The user already exist"};
        await UserModel.create({name,email,password});
        res.status(201).json({
            message:"The user registerd!"
        })
    } catch (error) {
        next(error);
    }
})
router.use('/login',async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email},{__v:0});
        if(!user) throw {message:"The user not found"};
        if(user.password!==password)throw {message:"The user not found"};
        delete user.password;
        jwt.sign({userId:user.id,name:user.name,email:user.email},'secrertKey',(err,token)=>{
            if(err) return res.json({error:err.message});
            return res.json({
                token
            })
        })
    } catch (error) {
        next(error);
    }
})
module.exports={
    AuthRouter:router
}