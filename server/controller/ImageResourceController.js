const MiddlewareError = require(`../utils/MiddlewareError`);
const Language = require(`../utils/Language`);
const ImageHandler = require("../utils/ImageHandler");
const ImageResourceModel = require("../model/ImageResourceModel");
const fs = require("fs");

async function createFile(req, res, next) {
  const files = req.files;

  // File not found
  if (!files) {
    return next(
      new MiddlewareError(400, Language.Response.FieldNotFoundOrEmpty)
    );
  }

  // Empty file
  if (files.length === 0) {
    return next(new MiddlewareError(400, Language.Response.EmptyFile));
  }

  Promise.all(
    [...files].map((file) => {
      // check if file is an image
      if (!file.mimetype.startsWith(`image/`)) {
        return next(new MiddlewareError(500, Language.Response.FileNotImage));
      }
      console.log(file);
      // Process a image
      ImageHandler.handler(file.path);
      // Transmit to next promise
      return file;
    })
  ).then(async (files) => {
    Promise.all(
      [...files].map(async (file) => {
        // Create a file in database
        return ImageResourceModel.create({
          name: file.originalname,
          path: file.path.replace(/public/g, ""),
          uploadedAt: new Date(),
          size: file.size,
        });
      })
    ).then((responses) => {
      // console.log(responses);
      // Response to user
      res.status(200).json({
        success: true,
        data: responses,
      });
    });
  });
}

async function getFileMetadata(req, res, next) {
  const fileId = req.params.id;
  const file = await ImageResourceModel.findById(fileId);

  if (!file) {
    return next(new MiddlewareError(404, Language.Response.FileNotFound));
  }

  res.status(200).json({
    success: true,
    data: file,
  });
}

async function getFileBuffer(req, res, next) {
  const fileId = req.params.id;
  const file = await ImageResourceModel.findById(fileId);

  if (!file) {
    return next(new MiddlewareError(404, Language.Response.FileNotFound));
  }

  const filePath = file.path;
  const fileBuffer = fs.readFileSync(filePath);

  res.status(200).end(fileBuffer);
}

const ImageResourceController = {
  createFile,
  getFileMetadata,
  getFileBuffer,
};
module.exports = ImageResourceController;
