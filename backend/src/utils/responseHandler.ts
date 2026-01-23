import type { Response } from "express";
import { RESPONSES } from "../constants/response";
import { ERRORS } from "../constants/errors";
import logger from "../config/logger";

interface ResponseHandlerProps<T = any> {
    res: Response,
    statusCode?: number,
    message?: string,
    data?: T,
    responseCode?: keyof typeof RESPONSES | null
}

interface ResponseErrorHandlerProps<T = any> {
    res: Response,
    statusCode?: number,
    error?: T,
    errorCode?: keyof typeof ERRORS | null
}

const responseHandler = ({ res, statusCode = 200, message = 'Success', data = null, responseCode = null }: ResponseHandlerProps): void => {
    let responseStatusCode = statusCode;
    let responseMessage = message;

    if (responseCode) {
        if (responseCode in RESPONSES) {
            const responseData = RESPONSES[responseCode];
            responseStatusCode = responseData.statusCode;
            responseMessage = responseData.message;
        } else {
            logger.warn(`Unrecognized responseCode received: ${responseCode}`);
        }
    }

    res.status(responseStatusCode).json({
        success: true,
        message: responseMessage,
        data
    });

};

const responseErrorHandler = ({ res, statusCode = 400, error = 'Something went wrong', errorCode = null }: ResponseErrorHandlerProps): void => {
    let responseStatusCode = statusCode;
    let responseMessage = error;

    if (errorCode) {
        if (errorCode in ERRORS) {
            const errorData = ERRORS[errorCode];
            responseStatusCode = errorData.statusCode;
            responseMessage = errorData.message;
        } else {
            logger.warn(`Unrecognized errorCode received: ${errorCode}`);
        }
    }

    res.status(responseStatusCode).json({
        success: false,
        error: responseMessage
    });
};


export {
    responseHandler,
    responseErrorHandler
};