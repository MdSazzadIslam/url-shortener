import React, { useState } from "react";
import Button from "./components/Button";
import TextBox from "./components/TextBox";
import { IUrlShortener } from "./types/urlShortenerType";
import { createShortUrl } from "./services/urlShortenerService";

import "./App.css";

const App: React.FC = () => {
  const initialState = {
    longUrl: "",
    shortUrl: "",
  };
  const [urlShortener, setUrlShortener] = useState<IUrlShortener>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlShortener((urlShortener) => ({
      ...urlShortener,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent,
    urlShortener: IUrlShortener
  ): void => {
    e.preventDefault();

    setSubmitted(true);
    createShortUrl(urlShortener)
      .then(({ data }: any) => {
        setUrlShortener({
          longUrl: urlShortener.longUrl,
          shortUrl: data.shortUrl,
        });
        //setSubmitted(false);
      })
      .catch((error: Error) => {
        setSubmitted(false);
        console.error(error);
      });

    clearRecord();
  };

  const clearRecord = () => {
    setUrlShortener(initialState);
    setSubmitted(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="form_main">
            <h4 className="heading">
              <strong>URL </strong> Shortener <span />
            </h4>

            {urlShortener.shortUrl.length > 0 ? (
              <div>
                <h5>{urlShortener.shortUrl}</h5>
              </div>
            ) : null}

            <form onSubmit={(e) => handleSubmit(e, urlShortener)}>
              <TextBox
                type="text"
                disabled={false}
                required={true}
                placeholder="Please write your URL here..."
                className="txt"
                name="longUrl"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
              />

              <Button
                type="submit"
                title="Submit"
                disabled={submitted ? true : false}
                className="txt2"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
