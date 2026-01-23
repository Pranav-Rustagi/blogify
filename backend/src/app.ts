import express from "express";
import cors from "cors";
import { errorHandler, requestLogger } from "./middleware/request.middleware";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;