const express = require("express");
const { validateSignupData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

//Add new user- /signup
authRouter.post("/signup", async (req, res, next) => {
  try {
    //Validation of data
    validateSignupData(req);
    const { firstName, lastName, email, password, age, gender } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      gender,
      age,
      email,
      password: passwordHash,
    });
    await user.save();
    res.json({ message: "${user.firstName} added successfully!!" });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

//Login API- /login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`Invalid Credentials!!`);
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      //Add the token to cookie and send back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error(`Invalid Credentials!!`);
    }
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

//Logout API- /logout
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({ message: `Logged out successfully!!` });
});

module.exports = authRouter;
