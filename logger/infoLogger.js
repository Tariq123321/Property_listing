const winston = require("winston");
const colors = require("colors/safe");

const customColors = {
  info: "white",
};

// Define custom log format
const infoLogFormat = winston.format.printf(({ level, message, timestamp }) => {
  const redTimeStamp = colors.white(timestamp);
  return `${redTimeStamp} | ${level} | ${message}`;
});

winston.addColors(customColors);

const infoLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    infoLogFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = infoLogger;
