import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ERROR_TYPES } from "../constants/errors";
import logger from "../config/logger";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw Error(ERROR_TYPES.UNAUTHORIZED);
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            throw Error(ERROR_TYPES.UNAUTHORIZED);
        }

        const decoded = verifyToken(token);
        req.user = decoded;

        next();
    } catch (err: any) {
        logger.error(err.message);
        throw err;
    }
};