import React, { useState, useRef } from "react";
import Button from "./components/Button";
import TextBox from "./components/TextBox";
import { IUrlShortener } from "./types/urlShortenerType";
import { createShortUrl, getLongUrl } from "./services/urlShortenerService";

import "./App.css";

const App: React.FC = () => {
  const initialState = {
    longUrl: "",
    shortUrl: "",
  };
  const [urlShortener, setUrlShortener] = useState<IUrlShortener>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [choice, setChoice] = useState<string>("1");
  const [url, setUrl] = useState<string>("");

  const longUrlRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrlShortener((urlShortener) => ({
      ...urlShortener,
      [e.target.name]: e.target.value,
    }));
  };

  const onFocus = () => {
    if (!longUrlRef.current) return;
    longUrlRef.current.blur();
  };

  const handleSubmit = (
    e: React.FormEvent,
    urlShortener: IUrlShortener
  ): void => {
    e.preventDefault();

    choice === "1"
      ? longToShort(e, urlShortener)
      : shortToLong(e, urlShortener);
  };

  const longToShort = (e: React.FormEvent, urlShortener: IUrlShortener) => {
    debugger;
    e.preventDefault();
    setError("");
    setSubmitted(true);
    createShortUrl(urlShortener)
      .then(({ data }: any) => {
        debugger;
        setUrl(data.shortUrl);
        setSubmitted(false);
        console.log(data);
      })
      .catch((error: Error) => {
        setSubmitted(false);
        setError(error.message);
        console.error(error.message);
        setUrl("");
      });
  };

  const shortToLong = (e: React.FormEvent, urlShortener: IUrlShortener) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);
    debugger;
    getLongUrl(urlShortener)
      .then(({ data }: any) => {
        debugger;
        setUrl(data.longUrl);
        setSubmitted(false);
      })
      .catch((error: Error) => {
        setSubmitted(false);
        setError(error.message);
        console.error(error.message);
        setUrl("");
      });
  };

  const selectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const element = e.target as HTMLSelectElement;
    setChoice(element.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="form_main">
            <h4 className="heading">
              <strong>URL </strong> Shortener <span />
            </h4>

            {error.length > 0 ? (
              <div>
                <h6 style={{ color: "red" }}>{error}</h6>
              </div>
            ) : null}

            {url.length > 0 ? (
              <div>
                <h6>{url}</h6>
              </div>
            ) : null}

            <form onSubmit={(e) => handleSubmit(e, urlShortener)}>
              <select
                name="urlShortener"
                id="urlShortener"
                onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                  selectChange(e)
                }
                value={choice}
              >
                <option value="1">Long to Short</option>
                <option value="2">Sort to Long</option>
              </select>

              <TextBox
                type="text"
                disabled={false}
                required={true}
                placeholder="Please write or paste URL here..."
                className="txt"
                name="longUrl"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
                ref={longUrlRef}
                onFocus={onFocus}
              />

              <Button
                type="submit"
                title="Submit"
                disabled={submitted ? true : false} //After submitting long URL button will be disable untill getting the response from the server
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
