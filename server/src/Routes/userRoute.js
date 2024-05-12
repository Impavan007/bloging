import express from 'express';
import { DeleteUserController, dislikeUserControl, followUserController, getUserController, likedbyUserControl, unfollowUserController, updateUserControl } from '../Controller/userController.js';
import { verifyToken } from '../UTILS/verify.js';

const userRouter  = express.Router();

//get user
userRouter.get('/find/:id',getUserController);

//update user
userRouter.put("/update/:id",verifyToken,updateUserControl);
//delete user
userRouter.delete("/delete/:id",verifyToken,DeleteUserController);
//follow user
userRouter.put('/follow/:id',verifyToken,followUserController);

//unfollow user
userRouter.put('/unfollow/:id',verifyToken,unfollowUserController);
//like user
userRouter.put('/like/:blogId',verifyToken,likedbyUserControl);
//dislike user
userRouter.put('/dislike/:blogId',verifyToken,dislikeUserControl);


export default userRouter;