const UserModel = require("../model/UserModel");
const Crypt = require("../utils/Crypt");

/**
 * Create a new user from database.
 * @param {*} username a username to create
 * @param {*} password a password to create
 * @param  {*} email a email
 * @param  {*} more external information such as email address
 */
async function createUser(username, password, email, more) {
  return UserModel.create({
    username: username,
    password: password,
    email: email,
    ...more,
  });
}

/**
 * Compare user password with a password in database.
 *
 * @param {*} username a username of user to compare
 * @param {*} password a plain password of user to compare
 * @returns true whether a password is matched, false otherwise
 */
async function comparePassword(username, password) {
  const user = await UserModel.findOne({ username: username });
  return Crypt.comparePassword(password, user.password);
}

/**
 *  Check whether a user exists or not.
 * @param {*} username a username to check for existence
 * @returns true whether a username exists, false otherwise
 */
async function hasUser(username) {
  return UserModel.findOne({ username });
}

/**
 * Retrieve a user from database.
 *
 * @param {*} username  a username to find
 * @returns a user which matched with username
 */
async function getUser(username) {
  return UserModel.findOne({ username });
}

const UserController = {
  createUser,
  comparePassword,
  hasUser,
  getUser,
};
module.exports = UserController;
