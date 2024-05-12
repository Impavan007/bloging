import { CreateError } from "../UTILS/Error.js";
import Comment from "../Models/Commentmodel.js";
import Blog from "../models/BlogModel.js";


export const NewCommentControl=async(req,res,next)=>{

    const comment =  new Comment({...req.body,userId:req.user.id,BlogId:req.params.BlogId});
    try {
        const newComment = await comment.save();
        await Blog.findByIdAndUpdate(newComment.BlogId,{$push:{Comments:newComment._id}});

        res.status(201).json(newComment);
        
    } catch (error) {
        next(error);
        console.log(error.message)
    }
}

export const CommentDeleteControl=async(req,res,next)=>{
try {
    const comment = await Comment.findById(req.params.id);
    if(!comment)return  next(CreateError(404,"comment not found"));
    const blog = await  Blog.findById(req.params.videoId);
    if(req.user.id===comment.userId||req.user.id===blog.userId){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(204).json("comment deleted sucessfully");    
    }else{
        next(CreateError(404,"not authorised for this action"));
    }
    
} catch (error) {
    next(error)
}
}

export const GetCommentControl=async(req,res,next)=>{
   try {
    const comment= await Comment.find({BlogId:req.params.BlogId});
    res.status(201).json(comment);
   } catch (error) {
    next(error);
   }
}

