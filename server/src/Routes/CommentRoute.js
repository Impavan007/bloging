import express from 'express'
import { verifyToken } from '../UTILS/verify.js';
import { CommentDeleteControl, GetCommentControl, NewCommentControl } from '../Controller/CommentContoroler.js';

const CommentRouter=express.Router();

CommentRouter.post("/:BlogId",verifyToken,NewCommentControl);

//delete

CommentRouter.delete("/:id",verifyToken,CommentDeleteControl)

CommentRouter.get('/:BlogId',verifyToken,GetCommentControl);

export default CommentRouter;