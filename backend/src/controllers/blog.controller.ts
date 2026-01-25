import type { Request, Response } from "express";
import { deleteBlog, fetchBlogData, fetchBlogs, saveBlog, updateBlog } from "../services/blog.service";
import { responseErrorHandler, responseHandler } from "../utils/responseHandler";
import logger from "../config/logger";
import { blogSchema, blogSchemaWithId } from "../validators/blog.schema";
import z from "zod";
import { ERROR_TYPES, ERRORS } from "../constants/errors";

const viewBlogsController = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 30;
        const offset = (page - 1) * limit;

        const { blogs, totalCount } = await fetchBlogs(limit, offset);

        const totalPages = Math.ceil(totalCount / limit);

        const responseData = {
            blogs,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
            }
        }

        responseHandler({ res, data: responseData });
    } catch (err) {
        logger.error("Error occurred in viewBlogsController()");
        throw err;
    }
};


const viewBlogController = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.blogId as string || null;
        if (!blogId) {
            logger.error(ERRORS.NOT_FOUND.message);
            throw new Error(ERROR_TYPES.NOT_FOUND);
        }

        const responseData = await fetchBlogData(blogId);

        responseHandler({ res, data: responseData });
    } catch (err) {
        logger.error("Error occurred in viewBlogsController()");
        throw err;
    }
};


const createBlogController = async (req: Request, res: Response) => {
    try {
        const parsed = blogSchema.safeParse(req.body);

        if (!parsed.success) {
            const error = "Invalid input: " + JSON.stringify(z.flattenError(parsed.error));
            logger.error(error);
            logger.error("Error occurred in createBlogController()");
            responseErrorHandler({ res, error });
            return;
        }

        const author_id = req.user?.userId as string || null;

        if (!author_id) {
            logger.error(ERRORS.UNAUTHORIZED.message);
            throw new Error(ERROR_TYPES.UNAUTHORIZED);
        }

        await saveBlog({ author_id, ...parsed.data });

        responseHandler({ res });
    } catch (err) {
        logger.error("Error occurred in createBlogController()");
        throw err;
    }
};

const updateBlogController = async (req: Request, res: Response) => {
    try {
        const parsed = blogSchemaWithId.safeParse(req.body);
        if (!parsed.success) {
            const error = "Invalid input: " + JSON.stringify(z.flattenError(parsed.error));
            logger.error(error);
            logger.error("Error occurred in createBlogController()");
            responseErrorHandler({ res, error });
            return;
        }
        
        const author_id = req.user?.userId as string || null;

        if (!author_id) {
            logger.error(ERRORS.UNAUTHORIZED.message);
            throw new Error(ERROR_TYPES.UNAUTHORIZED);
        }

        await updateBlog({ author_id, ...parsed.data });

        responseHandler({ res });

    } catch (err) {
        logger.error("Error occurred in updateBlogController()");
        throw err;
    }
}

const deleteBlogController = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.blogId as string || null;

        if (!blogId) {
            logger.error(ERRORS.NOT_FOUND.message);
            throw new Error(ERROR_TYPES.NOT_FOUND);
        }

        const author_id = req.user?.userId as string || null;

        if (!author_id) {
            logger.error(ERRORS.UNAUTHORIZED.message);
            throw new Error(ERROR_TYPES.UNAUTHORIZED);
        }

        await deleteBlog(blogId, author_id);

        responseHandler({ res });
    } catch (err) {
        logger.error("Error occurred in deleteBlogController()");
        throw err;
    }
}


export {
    viewBlogsController,
    viewBlogController,
    createBlogController,
    updateBlogController,
    deleteBlogController
};