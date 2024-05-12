import Blog from "../models/BlogModel.js";
import User from '../models/user.js'
import { CreateError } from '../UTILS/Error.js'


export const blogController = async(req,res,next)=>{
   
    try {
        const newBlog = await  new Blog({userId:req.user.id,...req.body}).save();
        
        res.status(201).send("blog created");

    } catch (error) {
       res.status(501).send(error.message);
    }
}

export const UpdateblogController = async(req,res,next)=>{
   
    try {
        
        const blog = await Blog.findById(req.params.id);

        if(!blog)return res.staus(404).send("blog not found");
    console.log(blog);
        if(req.user.id!==blog.userId)return res.status(402).send("you are not authenticated");
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true});
        res.status(203).send("blog updated Sucessfully");

    } catch (error) {
       res.status(501).send(error.message);
    }
}

//delete User

export const deleteBlogController=async(req,res,next)=>{
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(201).json("Deletd Blog");
        
    } catch (error) {
        res.status(501).json(error.message);
    }
}

export const GetBlogController = async(req,res,next)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(201).json(blog);
        
    } catch (error) {
        res.status(501).json(error.message);
    }
}

export const addViewsToBlog=async(req,res,next)=>{
    try {
        const views = await Blog.findByIdAndUpdate(req.params.id,{$inc:{views:1}},{new:true});
        res.status(201).json("video viewed by user sucessfully");
    } catch (error) {
        next(error)
    }
}

export const followingUsersBlogsControl=async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user)return next(CreateError(404,"user no found"));
    console.log(user.following);
    const Followingusers= user.following;
    
    const list = await Promise.all(Followingusers.map((channelId)=>{
        let followinUserBlog= Blog.find({userId:channelId});
       
        return followinUserBlog ;
    }))
    res.status(201).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt));

}



export const getRandomBlog=async(req,res,next)=>{
    try {
        const blog = await Blog.aggregate([{$sample:{size:20}}]);
        res.status(201).json(blog);
        
    } catch (error) {
        next(error);
    }
    }
    export const getTrendingBlog=async(req,res,next)=>{
        try {
            const trendingBlog= await Blog.find().sort({views:-1});
            res.status(201).json(trendingBlog);
            
        } catch (error) {
         next(error);   
        }
        }

        export const SearchByTag=async(req,res,next)=>{
            const tags = req.query.tags.split(",");
            try {
                const blogs = await Blog.find({tags:{$in:tags}}).limit(20);
                res.status(201).json(blogs);
            } catch (error) {
                next(error)
            }
        }

        export const SearchBlogs=async(req,res,next)=>{
            const query = req.query.q;
            try {
                const blogs = await Blog.find({
                    title:{$regex:query,$options:'i'}
                })
                res.status(201).json(blogs);
            } catch (error) {
                next(error)
            }
        
        }

        export const SearchBlogsByType=async(req,res,next)=>{
            const query = req.query.q;
            try {
                const blogs = await Blog.find({
                    Type:{$regex:query,$options:'i'}
                })
                res.status(201).json(blogs);
            } catch (error) {
                next(error)
            }
        
        }
        export const followingUsersControl = async (req, res, next) => {
            try {
                const user = await User.findById(req.user.id);
                if (!user) return next(CreateError(404, "User not found"));
                
                const Followingusers = user.following;
                
                const list = await Promise.all(Followingusers.map((channelId) => {
                    if (channelId !== "0") {
                        return User.findById(channelId);
                    }
                }).filter(Boolean)); // Filter out undefined values
        
                const sanitizedList = list.map(doc => {
                    const { password, email, _id, ...others } = doc._doc;
                    return others;
                });
        
                const sortedList = sanitizedList.flat().sort((a, b) => b.createdAt - a.createdAt);
        
                res.status(201).json(sortedList);
            } catch (error) {
                return next(error);
            }
        };
        