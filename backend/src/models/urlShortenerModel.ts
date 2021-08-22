import { Document, model, Schema } from "mongoose";

export interface IUrlShortener extends Document {
  id?: string;
  longUrl: string;
  shortUrl: string;
  visit: number;
  urlCode: string;
}

const UrlShortenerSchema: Schema = new Schema(
  {
    longUrl: {
      type: String,
      required: [true, "Long URL is required"],
      unique: true, //making unique so that same url don't save in the database again
      index: true,
    },
    shortUrl: {
      type: String,
      required: [true, "Short URL is required"],
      unique: true,
      index: true,
    },

    visit: {
      type: Number,
      required: [true, "Number of visit is required"],
      default: 0,
    },

    urlCode: {
      // i added this column for unique url purpose [http:localhost:5000/shortUrl/urlCode]
      type: String,
      required: [true, "URL Code is required"],
    },
  },
  { timestamps: true }
);
// define indexes to be create
//UrlSchema.index({ longUrl: 1, shortUrl: 1 }, { unique: true });
export const UrlShortener = model<IUrlShortener>(
  "UrlShortener",
  UrlShortenerSchema
);
