import express from "express";
import pool from "../db.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router hit:", req.method, req.url);
  next();
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await pool.query(`SELECT * FROM items ORDER BY id DESC`);
    res.json(result.rows);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
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

    const result = await pool.query(
      `INSERT INTO items (name,
        quantity,
        sku,
        category,
        unit_price,
        unit,
        reorder_point,
        description)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
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

    res.status(201).json(result.rows[0]);
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
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

    const result = await pool.query(
      `UPDATE items
SET name = $1,
    quantity = $2,
    sku= $3,
    category =$4,
    unit_price =$5,
    unit = $6,
    reorder_point = $7,
    description= $8
WHERE id = $9 RETURNING *`,
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

    if (result.rowCount === 0) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }

    res.json(result.rows[0]);
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const result = await pool.query(
      `DELETE FROM items
WHERE id = $1 RETURNING *`,
      [req.params.id],
    );

    if (result.rowCount === 0) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }

    res.json(result.rows[0]);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const err = new Error("Invalid ID");
      err.status = 400;
      throw err;
    }

    const result = await pool.query(`SELECT * FROM items WHERE id = $1;`, [id]);

    if (result.rowCount === 0) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json(result.rows[0]);
  }),
);

export default router;
