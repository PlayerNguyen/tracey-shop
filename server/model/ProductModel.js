const mongoose = require("mongoose");

const productPropertiesSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  sale: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ImageResource",
    default: null,
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "ImageResource" }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  properties: [{ type: productPropertiesSchema }],
});

// productSchema.pre(`save`, function() {

// })

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
