import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
const request = require("supertest");
import * as dotenv from "dotenv";
dotenv.config();
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe("/GET urls", () => {
  it("It should GET all the records", (done) => {
    chai
      .request(app)
      .get("/api/v1/urlshorteners")
      .end((err, res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).length.to.be.greaterThan(0);

        res.should.have.status(200);
        done();
      });
  });
});
describe("/GET/:shorturl", () => {
  it("It should GET a long url based on shortulr", (done) => {
    const shortUrl: string =
      "http://localhost:5000/api/v1/urlshorteners/ZzlblQ";
    chai
      .request(app)
      .get(`/api/v1/urlshorteners/${shortUrl}`)
      .end((err, res) => {
        // expect(res.body).to.be.an("object");
        res.should.have.status(200);
        done();
      });
  });
});

describe("/POST URL", () => {
  it("it should not POST a url", (done) => {
    let url = {
      longUrl: "https://sazzad-islam-88.vercel.app/",
    };
    chai
      .request(app)
      .post("/http://localhost:5000/api/v1/urlshorteners/")
      .send(url)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.book.should.have.property("shortUrl");
        res.body.book.should.have.property("longUrl");

        done();
      });
  });
});
