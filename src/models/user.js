const mongoose = require("mongoose");
const validator = require("validator");

//Creating USer Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Email is not valid: ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 16,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Password is not strong, ${value}`);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(`Gender is not valid!!`);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`Invalid photo URL: ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "I am a developer",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

//Creating User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
