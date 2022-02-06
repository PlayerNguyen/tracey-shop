const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prototype: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prototype" }],
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
