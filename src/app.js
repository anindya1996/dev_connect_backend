const express = require("express");
const connectDB = require("../config/database");
const { config } = require("dotenv");
config();
const User = require("./models/user.js");
const app = express();

app.use(express.json());

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

//Add new user- /signup
app.post("/signup", async (req, res, next) => {
  // Creating a new instance of user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send(`Some error occured: ${err.message}`);
  }
});

//Update an user- /update
app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "skills",
      "password",
      "lastName",
    ];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error(`Update is not allowed`);
    }

    if (data.skills.length > 10) {
      throw new Error(`Skills cannot be more than 10`);
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send(`User updated successfully`);
  } catch (err) {
    res.status(400).send(`Update failed, ${err.message}`);
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
