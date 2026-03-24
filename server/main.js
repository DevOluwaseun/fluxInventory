const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5174" }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Flux inventory" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
