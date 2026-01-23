import app from "./app";
import logger from "./config/logger";
import { pool } from "./database/db";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down (SIGINT)...");
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down (SIGTERM)...");
  await pool.end();
  process.exit(0);
});