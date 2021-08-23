import http from "../config";
import { AxiosResponse } from "axios";
import { IUrlShortener, ApiResponse } from "../types/urlShortenerType";

const getLongUrl = async (
  data: IUrlShortener
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    debugger;
    const sortUrl: string = data.longUrl.substr(data.longUrl.length - 6); //Extracting last six character data.longUrl;
    const res: AxiosResponse<ApiResponse> = await http.get(`/${sortUrl}`);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const createShortUrl = async (
  data: IUrlShortener
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const res: AxiosResponse<ApiResponse> = await http.post("/", data);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export { getLongUrl, createShortUrl };
