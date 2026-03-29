import express from "express";
import itemRoute from "./routes/item.route.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api", itemRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
