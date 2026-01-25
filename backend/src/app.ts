import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, requestLogger } from "./middleware/request.middleware";
import { authRouter } from "./routes/auth.routes";
import { blogRouter } from "./routes/blog.routes";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

app.use(errorHandler);

export default app;