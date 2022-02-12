const multer = require("multer");

const MulterMiddleware = multer({ dest: process.env.UPLOAD_TEMP_DIRECTORY });
module.exports = MulterMiddleware;
