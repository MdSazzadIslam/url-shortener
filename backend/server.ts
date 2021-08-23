import App from "./src/app";
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

export async function bootstrap() {
  try {
    const server = new App(parseInt(process.env.PORT as string) || 5000);
    server.start();
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await server.close();
          logger.info("App shutdown with success");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error("App shutdown abnormally");
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    logger.error("App shutdown abnormally");
    process.exit(1);
  }
}

//An Immediately-invoked Function Expression is a way to execute functions immediately, as soon as they are created.
(async () => {
  await bootstrap();
})();
