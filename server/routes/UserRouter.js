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
  PreconditionMiddleware.checkParameterBody(`phone`),
  PreconditionMiddleware.checkParameterBody(`password`),
  PreconditionMiddleware.checkParameterBody(`name`),
  PreconditionMiddleware.checkParameterBody(`email`),
  (req, res, next) => {
    const { phone, name, password, email } = req.body;

    UserController.createUser(phone, name, password, email)
      .then((user) => {
        // return username, _id
        res.json({ phone: user.phone, name: user.name, _id: user._id });
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
  PreconditionMiddleware.checkParameterBody(`phone`),
  PreconditionMiddleware.checkParameterBody(`password`),
  (req, res, next) => {
    const { phone, password } = req.body;

    // User check
    UserController.hasUser(phone)
      .then((_user) => {
        if (!_user) {
          return next(new MiddlewareError(404, "User not found"));
        }

        // Compare password
        UserController.comparePassword(phone, password)
          .then(async (result) => {
            // Password not match
            if (!result) {
              return next(
                new MiddlewareError(400, Language.Response.UserNotFound)
              );
            }

            res.json({
              token: await Token.createToken(
                { phone, name: _user.name, _id: _user._id },
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
router.get(`/me`, AuthMiddleware.forciblyRequireAuth, (req, res, next) => {
  res.json({ data: req.userData });
});

/**
 * Change the password of the user. Please notice that confirm the new password in the frontend.
 * @param {*} oldPassword the old password
 * @param {*} newPassword the new password
 */
router.get(
  `change-password`,
  AuthMiddleware.forciblyRequireAuth,
  PreconditionMiddleware.checkParameterQuery(`oldPassword`),
  PreconditionMiddleware.checkParameterQuery(`newPassword`),
  (req, res, next) => {
    
  }
);

module.exports = router;
