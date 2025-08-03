import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./db";
import authRoutes from "./routes/auth.route";
import questionRoutes from "./routes/question.route";
import answerRoutes from "./routes/answer.route";

dotenv.config();
const app = express();
//Middleware added to parse the request body
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

app.use("/question", questionRoutes);

app.use("/answer", answerRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello my Express server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  console.log(`http://localhost:5000/`);
  mongoConnect();
});

export default app;
