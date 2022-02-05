const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../index");
const UserModel = require("../model/UserModel");
const validator = require("validator");

const userSample = {
  // username: "test",
  name: "test",
  phone: "01919140284",
  password: "c9kVoOAjdhHXks@!I",
  email: "test@email.com",
};

afterEach(async function () {
  // const collections = await mongoose.connection.db.collections();

  // for (let collection of collections) {
  //   await collection.deleteMany();
  // }
  await UserModel.deleteMany({});
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
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("phone");
          expect(res.body).to.have.property("name");
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
          phone: userSample.phone,
          password: userSample.password,
        })
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          // console.log(res.body);
          expect(res.body.token).to.be.a("string");
          expect(validator.isJWT(res.body.token)).to.be.true;
          done();
        });
    });

    it(`should thrown error when the phone is empty`, (done) => {
      chai
        .request(app)
        .post("/users/signin")
        .send({
          phone: "",
          password: userSample.password,
        })
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);

          done();
        });
    });

    it(`should thrown error when the password is empty`, (done) => {
      chai
        .request(app)
        .post("/users/signin")
        .send({
          phone: userSample.phone,
          password: "",
        })
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);

          done();
        });
    });
  });
  describe(`User me `, () => {
    before((done) => {
      chai.request(app).post("/users/new").send(userSample).end(done);
    });
    it(`should provides data information about the user`, (done) => {
      chai
        .request(app)
        .post("/users/signin")
        .send({
          phone: userSample.phone,
          password: userSample.password,
        })
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          expect(validator.isJWT(res.body.token)).to.be.true;
          chai
            .request(app)
            .get("/users/me")
            .set("Authorization", `JWT ${res.body.token}`)
            .end((_err, res) => {
              expect(res).to.have.status(200);
              // the data not empty
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("data");
              expect(res.body.data).to.have.property("phone");
              expect(res.body.data).to.have.property("name");
              expect(res.body.data).to.have.property("_id");
              done();
            });
        });
    });
  });

  describe(`User update`, () => {
    before((done) => {
      chai.request(app).post("/users/new").send(userSample).end(done);
    });
    /**
     * Change password
     */
    it(`should change password`, (done) => {
      chai
        .request(app)
        .post("/users/signin")
        .send({
          phone: userSample.phone,
          password: userSample.password,
        })
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          expect(validator.isJWT(res.body.token)).to.be.true;
          chai
            .request(app)
            .put("/users/change-password")
            .set("Authorization", `JWT ${res.body.token}`)
            .send({
              oldPassword: userSample.oldPassword,
              newPassword: "newpassword",
            })
            .end((_err, res) => {
              console.log(`res.body`, res.body);
              expect(res).to.have.status(200);
              // expect(res.body).to.have.property("token");
              // expect(validator.isJWT(res.body.token)).to.be.true;
              done();
            });
        });
    });
  });
});
