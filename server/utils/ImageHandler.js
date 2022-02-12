const jimp = require("jimp");

async function handler(fileName) {
  return jimp.read(fileName, (err, image) => {
    if (err) return reject(err);

    console.log(` processing file ${fileName}`);
    return image.resize(325, 325).quality(40).write(fileName);
  });
}

const ImageHandler = {
  handler,
};

module.exports = ImageHandler;
