import express from 'express'
import { GetBlogController, SearchBlogs, SearchBlogsByType, SearchByTag, UpdateblogController, addViewsToBlog, blogController, deleteBlogController, followingUsersBlogsControl, followingUsersControl, getRandomBlog, getTrendingBlog } from '../Controller/BlogController.js';
import { verifyToken } from '../UTILS/verify.js';

const BlogRouter  = express.Router();
BlogRouter.post("/createBlog",verifyToken,blogController);
BlogRouter.put("/update/:id",verifyToken,UpdateblogController);

BlogRouter.get('/find/:id',GetBlogController)
BlogRouter.delete('/find/:id',deleteBlogController);


//add views

BlogRouter.put('/view/:id',verifyToken,addViewsToBlog);

//trending video

BlogRouter.get('/trend',getTrendingBlog);

//random video

BlogRouter.get('/random',getRandomBlog);

//get all subscribers

BlogRouter.get('/followingBlogs',verifyToken,followingUsersBlogsControl);

//get following users
BlogRouter.get('/followingusers',verifyToken,followingUsersControl);
//Categorised Blogs
BlogRouter.get('/Categorised',SearchBlogsByType);


//get by tags

BlogRouter.get('/tags',SearchByTag);

//search

BlogRouter.get('/search',SearchBlogs);





export default BlogRouter

