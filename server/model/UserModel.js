const mongoose = require("mongoose");
const Crypt = require("../utils/Crypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
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
