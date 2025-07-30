import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello my Express server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

export default app;
