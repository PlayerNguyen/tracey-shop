const jwt = require("jsonwebtoken");

/**
 * Create a token with 1 hour expiration.
 * @param {*} data a data to bare in the token
 * @returns a generated token
 */
async function createTokenInHour(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
}

/**
 *  Create a token with custom expiration.
 *
 * @param {*} data a data to bare in the token
 * @param {*} expire a expiration of the token (using `ms` library format)
 * @returns a generated token
 */
async function createToken(data, expire) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expire });
}

/**
 * Verify a token.
 *
 * @param {string} token a token to verify
 * @returns a payload of the token
 */
async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const Token = {
  createToken,
  createTokenInHour,
  verifyToken,
};
module.exports = Token;
