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
    .then((data) => {
      req.userData = data;
      return next();
    })
    .catch(next);
}

const AuthMiddleware = { forciblyRequireAuth };

module.exports = AuthMiddleware;
