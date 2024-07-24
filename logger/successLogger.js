const winston = require("winston");
const colors = require("colors/safe");

// Define custom log format
const successLogFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const redTimeStamp = colors.green(timestamp);
    return `${redTimeStamp} | ${level} | ${message}`;
  }
);

const customColors = {
  http: "green",
};

winston.addColors(customColors);

const successLogger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    successLogFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = successLogger;
