import express from "express";
import itemRoute from "./routes/item.route.js";
import morgan from "morgan";
import cors from "cors";
import { configDotenv } from "dotenv";

import createTable from "./migrations/createTable.js";

createTable();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api", itemRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
