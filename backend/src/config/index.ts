import mongoose from "mongoose";
import logger from "../utils/logger";

class DBService {
  private mongoURI = process.env.MONGO_URI as string;
  private count = 0;
  private mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
  };

  constructor() {
    this.connectDB();
  }

  getMongoose() {
    return mongoose;
  }

  connectDB = () => {
    logger.info("Attempting to connect database (will retry if needed)");
    mongoose
      .connect(this.mongoURI, this.mongooseOptions)
      .then(() => {
        logger.info("Database connection successfull");
      })
      .catch((err) => {
        const retrySeconds = 5;
        logger.error(
          `Database connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectDB, retrySeconds * 1000);
      });
  };

  disconnectDB = () => {
    return mongoose.disconnect();
  };
}
export default DBService;
