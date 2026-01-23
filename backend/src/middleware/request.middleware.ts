import type { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Handling by errorHandler");
    const statusCode = err?.statusCode || err?.code || 500;
    const message = err?.message || "Internal Server Error";

    logger.error(`Error ${statusCode}: ${message}`);

    res.status(statusCode).json({ error: message });
};

export {
    requestLogger,
    errorHandler,
};