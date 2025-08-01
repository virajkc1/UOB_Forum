import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./db";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
//Middleware added to parse the request body
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello my Express server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  mongoConnect();
});

export default app;
