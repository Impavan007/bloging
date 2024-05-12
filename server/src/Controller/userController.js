import { CreateError } from "../UTILS/Error.js";
import Blog from "../models/BlogModel.js";
import User from "../models/user.js"

//get users
export const getUserController=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).send("user not found");
        const {password,email, ...others}=user._doc;
        return res.status(201).json(others);
    } catch (error) {
        next(error.message)
    }
}

//delete users
export const DeleteUserController= async(req,res,next)=>{
    try {
        if(req.params.id===req.user.id){
           await User.findByIdAndDelete(req.params.id);
            res.status(201).send("user Deleted sucessfully");
        }
    } catch (error) {
        next(error.message)
    }
}
//update users
export const updateUserControl=async(req,res,next)=>{
    if(req.params.id===req.user.id){
       try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id,
           {$set:req.body},
           {new:true}
           )
           const {password,...other}=updatedUser._doc;
           res.status(201).json(other);
       } catch (error) {
           next(error)
       }
    }
   }
   
//follow user
export const followUserController=async(req,res,next)=>{
    try {
        if(!req.user.id)return CreateError(404,"please login");
        await User.findByIdAndUpdate(req.user.id,{$push:{following:req.params.id}},{new:true});
        await User.findByIdAndUpdate(req.params.id,{$inc:{followers:1}});
        res.status(201).json("subscribe sucessfully");
    } catch (error) {
        next(error.message)
    }

}
//unfollow user
export const unfollowUserController=async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{ $pull:{following:req.params.id}},{new:true});
        await User.findByIdAndUpdate(req.params.id,{$inc:{followers:-1}});
        res.status(201).json("unsubscribe sucessfully"); 
    } catch (error) {
        next(error)
    }

}
//like user
export const likedbyUserControl=async(req,res,next)=>{
    const id= req.user.id;
    const blogId= req.params.blogId;
    
    if(!blogId)return next(CreateError(404,"blogid not found"));
    try {
        await Blog.findByIdAndUpdate(blogId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        },{new:true})
        res.status(203).json("liked sucessfully");
        
    } catch (error) {
        next(error)
    }
    }
   
//dislike user
export const dislikeUserControl=async(req,res,next)=>{
    const id= req.user.id;
    const blogId= req.params.blogId;
    if(!blogId)return next(CreateError(404,"blogid not found"));
    try {
        await Blog.findByIdAndUpdate(blogId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id},
        },{new:true})
        res.status(203).json("disliked sucessfully");
        
    } catch (error) {
        next(error)
    }
}
