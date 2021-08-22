export interface IUrlShortener {
  _id?: string;
  longUrl: string;
  shortUrl: string;
}

export type UrlShortenerProps = {
  urlShortener: IUrlShortener;
};

export type ApiResponse = {
  msg: string;
  status: string;
  user?: IUrlShortener;
};
