const mongoose = require("mongoose");
const Crypt = require("../utils/Crypt");

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  point: {
    type: Number,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await Crypt.hashPassword(this.password);
  this.password = salt;
  next();
});

module.exports = mongoose.models.User || mongoose.model(`User`, UserSchema);
