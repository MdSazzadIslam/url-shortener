import { createLogger, format, transports } from "winston";
import * as fs from "fs";
import DailyRotateFile from "winston-daily-rotate-file";
import * as dotenv from "dotenv";
dotenv.config();

let dir: string = process.env.LOG_DIRECTORY as string;

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}
const isProduction = process.env.NODE_ENV;
const logLevel = isProduction != "production" ? "debug" : "warn";

const logFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const options = {
  file: {
    level: logLevel,
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: "20m",
    colorize: true,
    maxFiles: "14d",
  },
};

export default createLogger({
  transports: [
    new transports.Console({
      stderrLevels: ["info", "error"],
      format: logFormat,
    }),
  ],
  levels: {
    silly: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },

  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
