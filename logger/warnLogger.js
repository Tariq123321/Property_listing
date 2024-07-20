const winston = require("winston");
const colors = require("colors/safe");

// Define custom log format
const warnLogFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const redTimeStamp = colors.yellow(timestamp);
    return `${redTimeStamp} | ${level} | ${message}`;
  }
);

const customColors = {
  warn: "yellow",
};

winston.addColors(customColors);

const warnLogger = winston.createLogger({
  level: "warn",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    warnLogFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = warnLogger;
