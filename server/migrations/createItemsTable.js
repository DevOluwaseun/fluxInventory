import pool from "../db.js";

const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS items (
    id serial PRIMARY KEY,
name VARCHAR(255) NOT null,
sku VARCHAR(100) NOT NULL,
category VARCHAR(100),
description Text,
unit_price DECIMAL(10, 2) NOT NULL,
quantity INTEGER NOT NULL,
unit VARCHAR(50) NOT NULL,
reorder_point INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`);
    console.log("success");
  } catch (err) {
    console.error(err.message);
  }
};

export default createTable;
createTable();
