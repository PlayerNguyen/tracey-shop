module.exports = class MiddlewareError extends Error {
  constructor(status, message, ...optional) {
    super(message);
    this.status = status;
    this.optional = optional;
  }
};
