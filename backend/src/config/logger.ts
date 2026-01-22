import { createLogger, format, transports } from "winston";

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info", // minimum level to log
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    new transports.File({ filename: "logs/server.log" }),
  ],
});

export default logger;