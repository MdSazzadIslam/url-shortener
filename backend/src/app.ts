import express, { Application } from "express";
import Routes from "./routes";
import Middleware from "./middlewares";
import { loadErrorHandlers } from "./utils/errorHandlers";
import * as dotenv from "dotenv";
import logger from "./utils/logger";

import DBService from "./config";
dotenv.config();

class App {
  public app: Application;
  public dbService: DBService;
  constructor(private port: number) {
    this.app = express();
    this.dbService = new DBService();
    this.config();
  }

  public async config(): Promise<void> {
    Middleware.init(this.app);
    Routes.init(this.app);
    loadErrorHandlers(this.app);
  }

  public getApp(): Application {
    return this.app;
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
