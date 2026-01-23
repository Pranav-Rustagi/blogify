import type { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { ERRORS } from "../constants/errors";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err?.statusCode || err?.code || 500;
    const message = err?.message || "Internal Server Error";
    
    let responseStatusCode = statusCode;
    let responseMessage = message;

    if (message in ERRORS) {
        const errorData = ERRORS[message as keyof typeof ERRORS];
        responseStatusCode = errorData.statusCode;
        responseMessage = errorData.message;
    }

    res.status(responseStatusCode).json({ success: false, error: responseMessage });
};

export {
    requestLogger,
    errorHandler,
};