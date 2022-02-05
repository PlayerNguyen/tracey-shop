const UserModel = require("../model/UserModel");
const Crypt = require("../utils/Crypt");

/**
 * Create a new user from database.
 * @param {*} phone a phone number of user to create
 * @param {*} name a name to create
 * @param {*} password a password to create
 * @param  {*} email a email
 * @param  {*} more external information such as email address
 */
async function createUser(phone, name, password, email, more) {
  return UserModel.create({
    phone,
    name,
    password: password,
    email: email,
    ...more,
  });
}

/**
 * Compare user password with a password in database.
 *
 * @param {*} phone a phone of user to compare
 * @param {*} password a plain password of user to compare
 * @returns true whether a password is matched, false otherwise
 */
async function comparePassword(phone, password) {
  const user = await UserModel.findOne({ phone });
  return Crypt.comparePassword(password, user.password);
}

/**
 *  Check whether a user exists or not.
 * @param {*} phone a phone number to check for existence
 * @returns true whether a phone exists, false otherwise
 */
async function hasUser(phone) {
  return UserModel.findOne({ phone });
}

/**
 * Retrieve a user from database.
 *
 * @param {*} phone  a phone to find
 * @returns a user which matched with username
 */
async function getUser(phone) {
  return UserModel.findOne({ phone });
}

const UserController = {
  createUser,
  comparePassword,
  hasUser,
  getUser,
};
module.exports = UserController;
