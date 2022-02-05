const chai = require("chai");
const expect = chai.expect;
const validator = require("validator");
const Token = require("../utils/Token");
/**
 * Static token data
 */
const tokenData = {
  id: "5e7e7d6c8f8b8f1c8d9d9e1f",
  name: "John Doe",
};

describe(`create token`, () => {
  it(`should create a token`, (done) => {
    Token.createToken(tokenData, "1d").then((tokenString) => {
      expect(tokenString).to.be.a("string");
      // console.log(tokenString);
      expect(validator.isJWT(tokenString)).to.be.true;
      done();
    });
  });

  it(`should match with token data`, () => {
    Token.createTokenInHour(tokenData, "1d").then((tokenString) => {
      Token.verifyToken(tokenString).then((tokenData) => {
        expect(tokenData).to.deep.equal(tokenData);
        // console.log(tokenData);
        done();
      });
    });
  });
});
