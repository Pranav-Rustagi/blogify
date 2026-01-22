import express from "express";
import logger from "./config/logger";

const app = express();

app.use(express.json());

export default app;