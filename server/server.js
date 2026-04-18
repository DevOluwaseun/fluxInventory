import express from "express";
import itemRoute from "./routes/item.route.js";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";

import createTable from "./migrations/createItemsTable.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
});

createTable();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api", limiter);
app.use("/api", itemRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
