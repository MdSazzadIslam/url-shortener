import { App } from "./src/app";
import * as dotenv from "dotenv";
import logger from "./src/utils/logger";

dotenv.config();
enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );

  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(1);
});

(async (): Promise<void> => {
  const app = new App(process.env.PORT);
  app.start();
  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
  for (const exitSignal of exitSignals) {
    process.on(exitSignal, async () => {
      try {
        await app.close();
        logger.info("App shutdown with success");
        process.exit(ExitStatus.Success);
      } catch (error) {
        logger.error("App is shutdown accidently");
        process.exit(ExitStatus.Failure);
      }
    });
  }
})();
