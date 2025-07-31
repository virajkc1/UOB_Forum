import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./db";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello my Express server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  mongoConnect();
});

export default app;
