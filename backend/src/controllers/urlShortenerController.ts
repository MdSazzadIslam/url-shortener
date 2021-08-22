import { Request, Response } from "express";
import { UrlShortener, IUrlShortener } from "../models/urlShortenerModel";
import validUrl from "valid-url";
import { nanoid } from "nanoid";
import crypto from "crypto";
import url from "url";

export class UrlShortenerController {
  private urlShortener = UrlShortener;
  constructor() {
    this.urlShortener = UrlShortener;
  }

  /**
   * Fetching a longurl
   * @route GET
   * @access Public
   */
  public getLongUrl = (req: Request, res: Response) => {
    const urlPart = url.parse(req.url, true); //receving url request
    let shortUrl: string = urlPart.query.shortUrl as string; // to get query from urlPart

    this.urlShortener
      .findOne({ shortUrl })
      .then((data) => {
        if (data != null) {
          return res.status(200).json({ longUrl: data.shortUrl });
        }
        return res.status(402).json({
          success: false,
          status: 402,
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

    //if the request URL is valid then going to sort the url
    if (validUrl.isUri(longUrl)) {
      this.urlShortener
        .findOne({ longUrl })
        .then((data) => {
          //if long URL  not exist in the database then going to insert otherwise return the existing documents

          if (data === null) {
            const PORT = process.env.PORT;
            const urlCode = nanoid(5); //generating unique id to handle concurrency

            // constructing the short URL by the help of

            const cryptoUrl = crypto
              .randomBytes(Math.ceil((5 * 3) / 4))
              .toString("base64")
              .replace(/\+/g, "0")
              .replace(/\//g, "0")
              .slice(0, 6);

            const shortUrl = "http://localhost:" + `${PORT}` + "/" + cryptoUrl;
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
                res.status(200).json({ shortUrl });
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

          return res.status(200).json({ shortUrl: data.shortUrl });
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
