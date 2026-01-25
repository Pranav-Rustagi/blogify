import express from "express";
import { createBlogController, viewBlogController, viewBlogsController } from "../controllers/blog.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const blogRouter = express.Router();

blogRouter.get('/', viewBlogsController);
blogRouter.get('/:blogId', viewBlogController);

blogRouter.post('/create', authMiddleware, createBlogController);


export {
    blogRouter
};