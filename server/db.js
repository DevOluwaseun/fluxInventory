import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

// const pool = new Pool({
//   user: "postgres",
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.PORT,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
