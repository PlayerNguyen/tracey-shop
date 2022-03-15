const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const ErrorHandler = require("./utils/ErrorHandler");
const { loadStaticService, getStaticServe } = require("./utils/StaticService");
// require("dotenv").config({ debug: true });
const STATIC_IMAGE_FOLDER = process.env.UPLOAD_TEMP_DIRECTORY;
/**
 * Third-party application level
 */
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

/**
 * Router level
 */
app.use(`/users`, require("./routes/UserRouter"));
app.use(`/products`, require(`./routes/Product/ProductRouter`));
app.use(`/resources`, require(`./routes/ImageResource/ImageResourceRouter`));
app.use(`/category`, require(`./routes/Category/CategoryRouter`));
app.use(`/manufacturer`, require(`./routes/Manufacturer/ManufacturerRouter`));
/**
 * Image Serve

 */
loadStaticService(STATIC_IMAGE_FOLDER);
app.use(`/images`, getStaticServe(STATIC_IMAGE_FOLDER));

/**
 * Error handler level
 */
app.use(ErrorHandler);

// mongoose.set(`debug`, true);
mongoose.connect(process.env.MONGODB_URL, (error) => {
  if (error) throw error;
  console.log(`Connected to MongoDB`);
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // url log
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
