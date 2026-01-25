import express from "express";
import { logoutAuthController, signInController, signUpController, verifyAuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);
authRouter.get('/logout', logoutAuthController);
authRouter.get('/verify', authMiddleware, verifyAuthController);

export {
    authRouter
};
