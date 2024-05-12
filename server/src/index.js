import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './databaseConnect/db.js';
import cors from 'cors'
import Authrouter from './Routes/RegisterRoute.js';
import userRouter from './Routes/userRoute.js';
import cookieParser from 'cookie-parser'
import BlogRouter from './Routes/BlogRoutes.js';
import CommentRouter from './Routes/CommentRoute.js';

const app=express();

app.use(cors());

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth',Authrouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/blog',BlogRouter);
app.use('/api/v1/Comment',CommentRouter);


app.use((err,req,res,next)=>{
    const status= err.status||500;
    const message=err.message||"something went wrong";
    return res.status(status).json({
         success:false,
         status,message
     })
 })

app.listen(process.env.PORT,()=>{
    dbConnect();
    console.log(`app is running on http//localhost:${process.env.PORT||4000}`);
})