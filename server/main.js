const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5174" }));

let products = [];

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Flux inventory" });
});

app.post("/api", (req, res) => {
  products.push(req.body);
  console.log("Product added successfully");
  res.json(products);
  console.log(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
