const UserController = require("../controller/UserController");

const express = require("express");
const MiddlewareError = require("../utils/MiddlewareError");
const Language = require("../utils/Language");
const PreconditionMiddleware = require("../utils/PreconditionMiddleware");
const Token = require("../utils/Token");
const AuthMiddleware = require("../utils/AuthMiddleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json([
    {
      name: "Create a new user",
      url: "/users/new/",
      method: "POST",
      params: ["username", "password"],
      responses: {
        200: "Success",
        400: "Bad Request",
        500: "Internal Server Error",
      },
    },
    {
      name: "Sign in as user",
      url: "/users/signin/",
      method: "POST",
      params: ["username", "password"],
      responses: {
        200: "Success",
        400: "Bad Request",
        500: "Internal Server Error",
        404: "User not found",
      },
    },
  ]);
});

/**
 * Create new user.
 * @param {*} username a string username without special character
 * @param {*} password a string password
 */
router.post(
  `/new/`,
  PreconditionMiddleware.checkParameterBody(`username`),
  PreconditionMiddleware.checkParameterBody(`password`),
  PreconditionMiddleware.checkParameterBody(`email`),
  (req, res, next) => {
    const { username, password, email } = req.body;

    UserController.createUser(username, password, email)
      .then((user) => {
        // return username, _id
        res.json({ username: user.username, _id: user._id });
      })
      .catch(next);
  }
);

/**
 * Sign in as user.
 * @param {*} username a string username without special character
 * @param {*} password a string password
 *
 */
router.post(
  `/signin`,
  PreconditionMiddleware.checkParameterBody(`username`),
  PreconditionMiddleware.checkParameterBody(`password`),
  (req, res, next) => {
    const { username, password } = req.body;

    // User check
    UserController.hasUser(username)
      .then((result) => {
        if (!result) {
          return next(new MiddlewareError(404));
        }

        // Compare password
        UserController.comparePassword(username, password)
          .then(async (result) => {
            // Password not match
            if (!result) {
              return next(
                new MiddlewareError(400, Language.Response.UserNotFound)
              );
            }

            res.json({
              token: await Token.createToken(
                { username, _id: result._id },
                process.env.USER_SESSION_EXPIRATION || "15m"
              ),
            });
          })
          .catch(next);
      })
      .catch(next);
  }
);

/**
 * Get user information.
 */
router.get("/me", AuthMiddleware.forciblyRequireAuth, (req, res, next) => {
  res.json({ data: req.userData });
});

module.exports = router;
