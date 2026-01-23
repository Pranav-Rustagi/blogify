import fs from "fs";
import path from "path";
import logger from "../config/logger";
import { pool } from "./db";

async function init() {
  try {
    logger.info("Initializing database tables...");

    const initSql = path.join(__dirname, "../database/init.sql");
    logger.info(`Executing ${initSql}`);

    const sql = fs.readFileSync(initSql, "utf8");
    await pool.query(sql);

    logger.info("Database initialized");
  } catch (error) {
    logger.error("Error initializing database", error);
    throw error;
  }
}

init().catch(() => {
  process.exit(1);
});