import chai from "chai";
import chaiHttp from "chai-http";
import * as server from "../server";

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe("/GET absences", () => {
  it("It should GET all the absences records", (done) => {
    chai
      .request(server)
      .get("/api/v1/shorturl")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /POST route
 */
describe("/POST URL", () => {
  it("It should POST a URL record", (done) => {
    let longUrl = "https://sazzad-islam-88.vercel.app/";

    chai
      .request(longUrl)
      .get("/api/v1/shorturl")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
