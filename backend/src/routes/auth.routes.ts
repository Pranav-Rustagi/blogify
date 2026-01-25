import express from "express";
import { signInController, signUpController, verifyAuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);
authRouter.get('/verify', authMiddleware, verifyAuthController);

export {
    authRouter
};
