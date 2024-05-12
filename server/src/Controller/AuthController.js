import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { LoginValidate } from '../UTILS/validate.js';
import { Validate } from '../UTILS/validate.js';
import bcrypt from 'bcrypt'
import Token from '../models/Token.js';
import sendMail from '../UTILS/mailer.js';
import crypto from 'crypto'

export const register = async (req, res,next) => {
    try {
        const { error } = Validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        
        if (user) return res.status(409).send({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user = await new User({
            email: req.body.email,
            password: hashedPassword,
            userName:req.body.userName
        }).save();
        const  token = await new Token({userId:user._id,token:crypto.randomBytes(32).toString("hex")}).save();
        const url =  `${process.env.BASE_URL}auth/${user._id}/verify/${token.token}`;
        await sendMail(user.email,"Verify Email",url);
        res.status(201).send({msg:"email send sucessfully please verify your email"});
    } catch (error) {
        res.status(502).send(error.message);
    }
};

export const Signin=async(req,res)=>{
    try {
        const {error}= LoginValidate(req.body);
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(401).send("user not found");
        const validatePassword = await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword)return res.status(402).send("Incorrect password");
        if(!user.verified){
            token = await Token.findOne({userId:user._id})
            if(!token){
               token = await Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
               }).save();
               const url = `${process.env.BASE_URL}auth/${user._id}/verify/${token.token}`;
               await sendMail(user.email,"verify email",url);

            }
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '24h' });
        console.log(token);
        const {password, ...others}=user._doc;
        console.log(others);

  res.cookie("access_token",token,{
    httpOnly:true
  }).status(201).json(others);

        
    } catch (error) {
         res.status(500).send(error.message)
    }
}

export const veriFyEmail=async(req,res)=>{
try {
    const user = await User.findOne({_id:req.params.id});
    if(!user)return res.status(403).send({msg:"user not found"});
    const token = await Token.findOne({
        userId:user._id,
        token:req.params.token
    })
    if(!token) return res.status(400).send({msg:"invalid token"});
    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    res.status(200).send({message:"email verified sucessflly"});

    
} catch (error) {
    res.status(502).send(error.message);
}
}
export const googleController=async(req,res,next)=>{
    try {
      const user = await User.findOne({email:req.body.email});
      if(user){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.cookie("access_token",token,{
    httpOnly:true
  }).status(201).json(user._doc);
      }else{
        const newUser = new User({...req.body,verified:true});
        const saveUser= await newUser.save();
        const token = jwt.sign({id:saveUser._id},process.env.JWT_SECRET);
        res.cookie("access_token",token,{
          httpOnly:true
        }).status(201).json(saveUser._doc);
      }
      
    } catch (error) {
      next(error);
    }
}