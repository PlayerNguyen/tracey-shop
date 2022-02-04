const chalk = require("chalk");
module.exports = function ErrorHandler(err, req, res, next) {
  let status = 500;
  if (err.status) {
    status = err.status;
  }

  let optionals = null;
  if (err.optional) {
    optionals = err.optional;
  }

  console.log(chalk.red(`--------- [ ERROR ] ---------`));
  console.log(chalk.red(`     Code ${err.status ? err.status : "Unknown"}`));
  console.groupCollapsed("Stack trace");
  console.log(chalk.gray(`    ${err.stack}`));
  console.groupEnd();
  console.log(chalk.red(`------------------- ---------`));

  res.status(status).json({
    error: err.message,
    code: status,
    optionals,
  });
};
