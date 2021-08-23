import express, { Application } from "express";
import Routes from "./routes";
import Middleware from "./middlewares";
import { loadErrorHandlers } from "./utils/errorHandlers";
import * as dotenv from "dotenv";
import logger from "./utils/logger";
import { connect, close } from "./config/db";

dotenv.config();

class App {
  public app: Application;

  constructor(private port: number) {
    this.app = express();
    Middleware.init(this.app);
    Routes.init(this.app);
    this.config();
  }

  public async config(): Promise<void> {
    await this.databaseSetup();
    loadErrorHandlers(this.app);
  }

  private async databaseSetup(): Promise<void> {
    const db: string = process.env.MONGO_URI as string;
    await connect({ db });
  }

  public getApp(): Application {
    return this.app;
  }
  public async close(): Promise<void> {
    await close();
  }

  public start(): void {
    this.app
      .listen(this.port, () => {
        logger.info(`Server listening on port:  ${this.port}`);
      })
      .on("error", (e) => logger.error(e));
  }
}
export default App;
