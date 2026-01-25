import express from "express";
import { createBlogController, viewBlogsController } from "../controllers/blog.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const blogRouter = express.Router();

blogRouter.get('/', viewBlogsController);

blogRouter.post('/create', authMiddleware, createBlogController);

export {
    blogRouter
};