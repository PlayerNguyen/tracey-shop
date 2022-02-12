const mongoose = require("mongoose");

const imageResourceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    required: true,
  },
  // size: {
  //   type: Number,
  //   required: true,
  // },
});

module.exports =
  mongoose.models.ImageResource ||
  mongoose.model("ImageResource", imageResourceSchema);
