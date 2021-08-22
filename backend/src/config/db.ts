import mongoose from "mongoose";
import logger from "../utils/logger";
import * as dotenv from "dotenv";

dotenv.config();
enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

type TInput = {
  db: string;
};

export const connect = ({ db }: TInput) => {
  mongoose
    .connect(db, options)
    .then(() => {
      logger.info("Successfully connected to database");
    })
    .catch((error: Error) => {
      logger.error(
        "Error occured while connecting to database: ",
        error.message
      );
      process.exit(ExitStatus.Failure);
    });
};
export const close = (): Promise<void> => mongoose.connection.close();
