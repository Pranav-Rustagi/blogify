import type { Response } from "express";

interface ResponseHandlerProps {
    res: Response,
    statusCode?: number,
    message?: string,
    data?: any
}

const responseHandler = ({res, statusCode = 200, message = 'Success', data = null} : ResponseHandlerProps): void => {
    res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        data: data
    });
};

export {
    responseHandler
};