const express = require("express");
const connectDB = require("../config/database");
const { config } = require("dotenv");
config();
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
