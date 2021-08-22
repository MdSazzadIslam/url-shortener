import { Router } from "express";
import { UrlShortenerController } from "../controllers/urlShortenerController";

export default class UrlRoute {
  private urlShortenerController: UrlShortenerController;
  public router: Router;

  constructor() {
    this.router = Router();
    this.urlShortenerController = new UrlShortenerController();
    this.configRoutes();
  }

  public configRoutes() {
    this.router.get("/", this.urlShortenerController.getLongUrl);
    this.router.post("/", this.urlShortenerController.createShortUrl);
  }
}
