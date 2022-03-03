const multer = require("multer");

/**
 * Set up the disk storage using file name and so on.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_TEMP_DIRECTORY);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

/**
 * The multer globally distribute
 */
const MulterMiddleware = multer({
  storage: storage,
});
module.exports = MulterMiddleware;
