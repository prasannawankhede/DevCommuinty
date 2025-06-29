const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email" + value);
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/imgres?q=dog%20images&imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod%2Fimages%2Fgolden-retriever-dog-royalty-free-image-505534037-1565105327.jpg%3Fcrop%3D0.760xw%3A1.00xh%3B0.204xw%2C0%26resize%3D980%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fadvice%2Fg1825%2Fmedium-sized-dogs%2F&docid=ekDEdTaoR83OUM&tbnid=2rPPxSWqfZxMQM&vet=12ahUKEwj68--UzZOOAxUUyzgGHfbjNlMQM3oECH8QAA..i&w=980&h=978&hcb=2&ved=2ahUKEwj68--UzZOOAxUUyzgGHfbjNlMQM3oECH8QAA",
    },
    about: {
      type: String,
      default: "default data",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  const user = this;

  const token = jwt.sign(
    { id: user._id }, 
    "dev@tinder",
    { expiresIn: "7d" } 
  );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
