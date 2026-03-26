const express = require("express");
const itemRoute = require("./routes/item.route");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5174" }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api", itemRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
