const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../index");
const mongoose = require("mongoose");
const UserModel = require("../model/UserModel");
const Token = require("../utils/Token");

const userSample = {
  username: "test",
  password: "c9kVoOAjdhHXks@!I",
  email: "test@email.com",
};

afterEach(async function () {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
});
describe("User", function () {
  describe(`User create`, () => {
    it("should create a new user ", (done) => {
      chai
        .request(app)
        .post("/users/new")
        .send(userSample)
        .end((_err, res) => {
          // check response status
          expect(res).to.have.status(200);
          // check response body
          expect(res.body).to.have.property("username");
          expect(res.body).to.have.property("_id");
          // check user in database
          UserModel.findOne({ username: userSample.username })
            .then((user) => {
              expect(user).to.not.be.null;
              expect(user.username).to.equal(userSample.username);
              expect(user.email).to.equal(userSample.email);
              // check password is bcrypt
              expect(user.password).to.not.equal(userSample.password);
            })
            .then(done);
        });
    });
    it(`should thrown error when the username is empty`, (done) => {
      const user = {
        username: "",
        password: "c9kVoOAjdhHXks@!I",
        email: "",
      };
      chai
        .request(app)
        .post("/users/new")
        .send(user)
        .end((_err, res) => {
          expect(res).to.have.status(400);
          // expect(res.body.code).to.equal(400);
          // expect(res.body.optionals).to.deep.equal(["username"]);
          done();
        });
    });
  });
  describe("User get", () => {
    it(`should response an array of requests`, (done) => {
      chai
        .request(app)
        .get("/users/")
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });
  describe(`User sign in`, () => {
    before((done) => {
      chai.request(app).post("/users/new").send(userSample).end(done);
    });

    it(`should sign in and bare token`, (done) => {
      chai
        .request(app)
        .post("/users/signin")
        .send({
          username: userSample.username,
          password: userSample.password,
        })
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");

          done();
        });
    });
  });
});
