import express from "express";
import { config } from "dotenv";
config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running at port:${process.env.PORT}`);
});
