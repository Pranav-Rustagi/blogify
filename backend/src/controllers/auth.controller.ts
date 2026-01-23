import type { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";

const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        responseHandler({ res, statusCode: 201, message: "Signed up successfully" })
    } catch (err: any) {
        throw err;
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        responseHandler({ res, message: "Signed in successfully" });
    } catch (err: any) {
        throw err;
    }
}







export {
    signUp,
    signIn
}