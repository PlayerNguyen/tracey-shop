const bcrypt = require("bcryptjs");
const chalk = require("chalk");

/**
 * Encrypt raw password (or plain text) using bcrypt with
 * configured salt rounds.
 * @param {*} password a password to encrypt with bcrypt
 * @returns a string encrypted password
 */
async function hashPassword(password) {
  if (!process.env.BCRYPT_SALT_ROUNDS) {
    console.log(
      chalk.yellow(`WARN: process.env.BCRYPT_SALT_ROUNDS not found.`)
    );
  }
  const salt = bcrypt.genSaltSync(
    Number.parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
  );
  return bcrypt.hashSync(password, salt);
}

/**
 * Compare whether password is definitely match or not.
 *
 * @param {*} password a plain text password to encrypt
 * @param {*} encryptedPassword a encrypted password to compare
 * @returns true whether password is definitely match, false otherwise.
 */
async function comparePassword(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

const Crypt = {
  hashPassword,
  comparePassword,
};
module.exports = Crypt;
