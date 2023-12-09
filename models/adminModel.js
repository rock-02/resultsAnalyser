const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hashSync(this.password, 10);
  next();
});
adminSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
  this.save({ validateBeforeSave: false });
  return token;
};

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.authToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
