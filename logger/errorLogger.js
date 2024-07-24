const winston = require("winston");
const colors = require("colors/safe");

// Define custom log format
const errorLogFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const redTimeStamp = colors.red(timestamp);
    return `${redTimeStamp} | ${level} | ${message}`;
  }
);

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errorLogFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = errorLogger;
