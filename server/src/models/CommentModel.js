import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
{userId:{type:String,required:true},
BlogId:{type:String,required:true},
description:{type:String,required:true}


},{timestamps:true});

const Comment = mongoose.model("Comment",CommentSchema);

export default Comment;