const express = require("express");
const router = express.Router();

let catalog = [];
let idCounter = 1;

router.post("/", (req, res) => {
  let product = { id: idCounter++, ...req.body };
  catalog.push(product);
  res.json(catalog);
  console.log(catalog);
});

router.patch("/:id", (req, res) => {
  let id = Number(req.params.id);
  let updateProduct = req.body;
  const index = catalog.findIndex((product) => product.id === id);
  catalog.splice(index, 1, { id: id, ...updateProduct });
  res.json(catalog);
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  const index = catalog.findIndex((product) => product.id === id);
  catalog.splice(index, 1);
  res.json(catalog);
});

module.exports = router;
