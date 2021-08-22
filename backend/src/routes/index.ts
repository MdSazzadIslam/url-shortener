import express from "express";
import UrlRoute from "./urlRoute";

export default class Routes {
  static init(app: express.Application): void {
    app.use("/api/v1/shorturl", new UrlRoute().router);
  }
}
