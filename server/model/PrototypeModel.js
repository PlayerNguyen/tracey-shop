const mongoose = require("mongoose");

const PrototypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: String,
  },
});

module.exports =
  mongoose.models.Prototype || mongoose.model("Prototype", PrototypeSchema);
