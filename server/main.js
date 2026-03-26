const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5174" }));

let products = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Flux inventory" });
});

app.post("/api", (req, res) => {
  let product = { id: idCounter++, ...req.body };
  products.push(product);
  res.json(products);
  console.log(products);
});

app.delete("/api/:id", (req, res) => {
  let id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);
  res.json(products);
});

app.patch("/api/:id", (req, res) => {
  let id = Number(req.params.id);
  let updateProduct = req.body;
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1, updateProduct);
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
