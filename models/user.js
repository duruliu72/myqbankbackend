const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const { Role } = require("./role");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    role: {
      type: new mongoose.Schema({
        roleName: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        roleValue: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email, role: this.role },
    "allah"
  );
};
module.exports.User = mongoose.model("user", userSchema);
module.exports.validate = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    roleid: Joi.objectId().required(),
  });
  return schema.validate(user);
};
