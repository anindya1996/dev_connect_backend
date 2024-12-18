const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const validator = require("validator");

const profileRouter = express.Router();

//Get profile API- /profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error(`Invalid edit request`);
    }
    const loggedInUser = req.user;

    Object.keys(req?.body).forEach(
      (key) => (loggedInUser[key] = req?.body[key])
    );
    await loggedInUser.save();

    res.json({
      message: `Profile updated successfully..`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

module.exports = profileRouter;
