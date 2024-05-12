import jwt from 'jsonwebtoken';
import { CreateError } from './Error.js';

export  const verifyToken=(req,res,next)=>{
const token = req.cookies.access_token
if(!token) return next(CreateError(401,"you are not authenticated"));
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return next(CreateError(403,"not autherised"));
    req.user=user;
    next();
})
}