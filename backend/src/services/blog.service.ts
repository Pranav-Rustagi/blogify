import logger from "../config/logger";
import { ERROR_TYPES, ERRORS } from "../constants/errors";
import { pool } from "../database/db";

const fetchPaginatedBlogs = async (limit: number, offset: number) => {
    try {
        const query = "SELECT b.id, u.username AS author_name, b.title, b.body, b.created_at FROM blogs b JOIN users u ON b.author_id = u.id ORDER BY b.created_at DESC LIMIT $1 OFFSET $2;";
        const records = await pool.query(query, [limit, offset]);
        return records.rows;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in fetchBlogs()");
        throw err;
    }
}

const fetchTotalCount = async () => {
    try {
        const query = "SELECT COUNT(*) FROM blogs";
        const records = await pool.query(query);
        return records.rows[0].count;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in fetchTotalCount()");
        throw err;
    }
}

const fetchBlogs = async (limit: number, offset: number) => {
    try {
        const [blogs, totalCount] = await Promise.all([
            fetchPaginatedBlogs(limit, offset),
            fetchTotalCount()
        ]);

        return { blogs, totalCount };
    } catch (err) {
        logger.error("Error occurred in fetchBlogs()");
        throw err;
    }
}


const fetchBlogData = async (blogId: string) => {
    try {
        const query = "SELECT b.id, u.id as author_id, u.username AS author_name, b.title, b.body, b.created_at, b.updated_at FROM blogs b JOIN users u ON b.author_id = u.id WHERE b.id = $1";
        const records = await pool.query(query, [blogId]);

        if (records.rowCount === 0) {
            logger.error(ERRORS.NOT_FOUND.message);
            throw new Error(ERROR_TYPES.NOT_FOUND);
        }
        return records.rows[0];
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in fetchBlogData()");
        throw err;
    }
}


interface BlogProps {
    id?: string
    author_id: string,
    title: string,
    body: string
}

const saveBlog = async ({ author_id, title, body }: BlogProps) => {
    try {
        const query = "INSERT INTO blogs (author_id, title, body) VALUES ($1, $2, $3)";
        const result = await pool.query(query, [author_id, title, body]);
        return true;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in saveBlog()");
        throw err;
    }
}

const updateBlog = async ({ id, title, body, author_id }: BlogProps) => {
    try {
        const query = "UPDATE blogs SET title = $1, body = $2, updated_at = NOW() WHERE id = $3 AND author_id = $4";
        const result = await pool.query(query, [title, body, id, author_id]);
        return true;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in updateBlog()");
        throw err;
    }
}

const deleteBlog = async (blogId: string, author_id: string) => {
    try {
        const query = "DELETE FROM blogs WHERE id = $1 AND author_id = $2";
        const result = await pool.query(query, [blogId, author_id]);
        return true;
    } catch (err: any) {
        logger.error(err.message);
        logger.error("Error occurred in deleteBlog()");
        throw err;
    }
}

export {
    fetchBlogs,
    saveBlog,
    fetchBlogData,
    updateBlog,
    deleteBlog
}