import express from "express";
import pool from "../db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query(`SELECT * FROM items`);
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const {
    name,
    quantity,
    sku,
    category,
    unit_price,
    unit,
    reorder_point,
    description,
  } = req.body;
  const query = await pool.query(
    `INSERT INTO items (name,
        quantity,
        sku,
        category,
        unit_price,
        unit,
        reorder_point,
        description)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      name,
      quantity,
      sku,
      category,
      unit_price,
      unit,
      reorder_point,
      description,
    ],
  );

  const result = await pool.query(`SELECT * FROM items`);
  res.json(result.rows);
});

router.patch("/:id", async (req, res) => {
  const {
    name,
    quantity,
    sku,
    category,
    unit_price,
    unit,
    reorder_point,
    description,
  } = req.body;

  let query = await pool.query(
    `UPDATE items
SET name = $1,
    quantity = $2,
    sku= $3,
    category =$4,
    unit_price =$5,
    unit = $6,
    reorder_point = $7,
    description= $8
WHERE id = $9`,
    [
      name,
      quantity,
      sku,
      category,
      unit_price,
      unit,
      reorder_point,
      description,
      req.params.id,
    ],
  );

  const result = await pool.query(`SELECT * FROM items`);
  res.json(result.rows);
});

router.delete("/:id", async (req, res) => {
  const query = await pool.query(
    `DELETE FROM items
WHERE id = $1`,
    [req.params.id],
  );

  const result = await pool.query(`SELECT * FROM items`);
  res.json(result.rows);
});

export default router;
