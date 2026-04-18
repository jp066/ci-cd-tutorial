const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Content-type", "application/json");
  const data = "João Pedro";
  res.json({ message: `Hello, ${data}!` });
});

module.exports = app;