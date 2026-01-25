import express from "express";
import { createBlogController, deleteBlogController, updateBlogController, viewBlogController, viewBlogsController } from "../controllers/blog.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const blogRouter = express.Router();

blogRouter.get('/', viewBlogsController);
blogRouter.get('/:blogId', viewBlogController);

blogRouter.post('/create', authMiddleware, createBlogController);
blogRouter.patch('/update', authMiddleware, updateBlogController);
blogRouter.delete('/delete', authMiddleware, deleteBlogController);


export {
    blogRouter
};