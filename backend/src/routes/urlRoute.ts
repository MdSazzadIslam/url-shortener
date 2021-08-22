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
    this.router.get("/", this.urlShortenerController.getUrls);
    this.router.get("/:shortUrl", this.urlShortenerController.getLongUrl);
    this.router.post("/", this.urlShortenerController.createShortUrl);
  }
}
