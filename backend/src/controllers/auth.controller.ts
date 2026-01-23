import type { Request, Response } from "express";
import { responseErrorHandler, responseHandler } from "../utils/responseHandler";
import { signUpSchema, signInSchema } from "../validators/auth.schema";
import z from "zod";
import { registerUser, signInUser } from "../services/user.service";
import { RESPONSE_TYPES } from "../constants/response";
import logger from "../config/logger";
import { signToken } from "../utils/jwt";

const signUpController = async (req: Request, res: Response) => {
    try {
        const parsed = signUpSchema.safeParse(req.body);

        if (!parsed.success) {
            const error = "Invalid input: " + JSON.stringify(z.flattenError(parsed.error));
            logger.error(error);
            logger.error("Error occurred in signUpController()");
            responseErrorHandler({ res, error });
            return;
        }

        await registerUser({ ...parsed.data });

        const responseCode = RESPONSE_TYPES.USER_CREATED as keyof typeof RESPONSE_TYPES;

        responseHandler({ res, responseCode });
    } catch (err: any) {
        logger.error("Error occurred in signUpController()");
        throw err;
    }
}

const signInController = async (req: Request, res: Response) => {
    try {
        const parsed = signInSchema.safeParse(req.body);

        if (!parsed.success) {
            const error = "Invalid input: " + JSON.stringify(z.flattenError(parsed.error));
            logger.error(error);
            logger.error("Error occurred in signInController()");
            responseErrorHandler({ res, error });
            return;
        }

        const user = await signInUser({ ...parsed.data });

        const token = signToken({
            userId: user.userId,
            email: user.email
        });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const responseCode = RESPONSE_TYPES.SIGN_IN_SUCCESS as keyof typeof RESPONSE_TYPES;

        responseHandler({ res, responseCode });
    } catch (err: any) {
        logger.error("Error occurred in signInController()");
        throw err;
    }
}







export {
    signUpController,
    signInController
}