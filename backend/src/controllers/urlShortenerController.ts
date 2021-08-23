import { Request, Response } from "express";
import { UrlShortener, IUrlShortener } from "../models/urlShortenerModel";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { isValidURL } from "../utils/index";
export class UrlShortenerController {
  private urlShortener = UrlShortener;
  constructor() {
    this.urlShortener = UrlShortener;
  }

  /**
   * Fetching all urls
   * @route GET
   * @access Public
   */
  public getUrls = (req: Request, res: Response) => {
    this.urlShortener
      .find({})
      .exec()
      .then((data: IUrlShortener[]) => {
        if (data != null) {
          return res.status(200).json(data);
        }
        return res.status(402).json({
          success: false,
          status: 404,
          message: "No url found",
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Error occured while fetching the data " + error.message,
        });
      });
  };

  /**
   * Fetching a longurl
   * @route GET/shortUrl:
   * @access Public
   */
  public getLongUrl = (req: Request, res: Response) => {
    const { shortUrl } = req.params;

    this.urlShortener
      .findOne({ shortUrl })
      .exec()
      .then((data) => {
        if (data != null) {
          return res.status(200).json({ longUrl: data.longUrl });
        }
        return res.status(402).json({
          success: false,
          status: 404,
          message: `No url found for this Url :  ${shortUrl}`,
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Error occured while fetching the data " + error.message,
        });
      });
  };

  /**
   * Creating a shorturl
   * @route POST
   * @access Public
   */
  //Converting a long Url to Short URL then saving the record into the databse
  public createShortUrl = (req: Request, res: Response) => {
    const longUrl = req.body.longUrl;
    const port = process.env.PORT;
    const preUrl = "http://localhost:" + `${port}` + "/api/v1/urlshorteners"; // Since i am going to save only hasing data without URL into the database
    //that is why we need preUrl so that system can send full url to the customers.

    //if the request URL is valid then going to sort the url

    const valid = isValidURL(longUrl);

    if (valid) {
      this.urlShortener
        .findOne({ longUrl })
        .exec()
        .then((data) => {
          //if long URL  not exist in the database then going to insert otherwise return the existing documents

          if (data === null) {
            const urlCode = nanoid(5); //generating unique id to handle concurrency

            // constructing the short URL by the help of

            const shortUrl = crypto
              .randomBytes(Math.ceil((5 * 3) / 4))
              .toString("base64")
              .replace(/\+/g, "0")
              .replace(/\//g, "0")
              .slice(0, 6);

            // adding urlCode to make the sort url more unique
            let visit: number = 0;

            const url = new this.urlShortener({
              longUrl,
              shortUrl,
              urlCode,
              visit,
            });
            //creating a new URL document
            return url
              .save()

              .then((result) => {
                return res
                  .status(200)
                  .json({ shortUrl: `${preUrl}` + "/" + shortUrl });
              })
              .catch((error: Error) => {
                return res.status(500).json({
                  success: false,
                  status: 500,
                  message: "Error occured while saving the record" + error,
                });
              });
          }
          // since the document exists, we return it without creating a new entry

          return res
            .status(200)
            .json({ shortUrl: `${preUrl}` + "/" + data.shortUrl });
        })
        .catch((error: Error) => {
          return res.status(400).json({
            success: false,
            status: 500,
            message: "Error occured while saving the record" + error,
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Request url is not valid",
      });
    }
  };
}
