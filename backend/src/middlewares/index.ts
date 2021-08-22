import express from "express";
import cors from "cors";
import helmet from "helmet";

export default class Middleware {
  static init(app: express.Application): void {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
  }
}
