import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
{userId:{type:String,required:true},
title: { type: String , required : true }, 
description: { type: String , required : true},
ImgUrl:{type:String,required:true},
views:{type:Number,default:0},
tags:{type: [String]},
likes: { type: [String] , default : 0 },
dislikes: { type: [String] , default : 0 },
Type: { type: String,required:true } ,
Comments:{type:[String],default:0}

},{timestamps:true});

const Blog = mongoose.model("Blog",BlogSchema);

export default Blog;