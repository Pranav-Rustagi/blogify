import fs from "fs";
import path from "path";
import { Pool } from "pg";
import logger from "../config/logger";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

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
  } finally {
    await pool.end();
  }
}

init().catch(() => {
  process.exit(1);
});

export {
  pool
};