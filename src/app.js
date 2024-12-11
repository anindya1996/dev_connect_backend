const express = require("express");
const connectDB = require("../config/database");
const { config } = require("dotenv");
config();
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res, next) => {
  //Creating a new instance of user model
  const user = new User({
    firstName: "Mayank",
    lastName: "Keshri",
    email: "mayank12@gmail.com",
    password: "Mayank@123",
  });
  try {
    await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send(`Some error occured: ${err.message}`);
  }
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully...");

    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(`Cannot connect to database!! ${err}`);
  }
};
startServer();
