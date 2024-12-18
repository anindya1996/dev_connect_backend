const express = require("express");
const connectDB = require("../config/database");
const { config } = require("dotenv");
config();
const User = require("./models/user.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//Get user by email-/getUser
app.get("/getUser", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    if (!users) {
      res.status(404).send(`User not found`);
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send(`Something went wrong,  ${err.message}`);
  }
});

//Feed API-GET/feed- get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(`Something went wrong,  ${err.message}`);
  }
});

//Delete user by id- /delete
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send(`User deleted successfully`);
  } catch (err) {
    res.status(400).send(`Something went wrong  ${err.message}`);
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
