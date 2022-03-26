const UserModel = require("../model/UserModel");
const Language = require("./Language");
const MiddlewareError = require("./MiddlewareError");
const Token = require("./Token");

function forciblyRequireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return next(new MiddlewareError(401, Language.Response.Unauthorized));
  }
  // Transfer the token, and data to the next middleware
  const token = req.headers.authorization.split(" ")[1];
  req.token = token;
  Token.verifyToken(token)
    .then(async (data) => {
      // console.log(data);

      const user = await UserModel.findOne({ _id: data._id });
      if (!user) {
        return next(new MiddlewareError(404, Language.Response.UserNotFound));
      }
      // console.log(user);
      req.userData = { ...data, admin: user.admin };
      console.log(req.userData);
      return next();
    })
    .catch(next);
}

const AuthMiddleware = { forciblyRequireAuth };

module.exports = AuthMiddleware;
