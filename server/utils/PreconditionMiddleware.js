const Language = require("./Language");
const MiddlewareError = require("./MiddlewareError");
/**
 *  Check if the given param in body is existed or not.
 *
 * @param {*} name a string name in body to check existence
 * @returns a middleware function to check parameter in body. Throw error unless the parameter exists.
 */
function checkParameterBody(name) {
  return function predicate(req, _res, next) {
    const field = req.body[name];
    if (!field) {
      return next(
        new MiddlewareError(
          400,
          `${Language.Response.FieldNotFoundOrEmpty} (${name})`
        )
      );
    }
    return next();
  };
}

const PreconditionMiddleware = {
  checkParameterBody,
};

module.exports = PreconditionMiddleware;
