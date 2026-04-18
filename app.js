const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.json({ message: "Hello, this is a web server!" });
});

module.exports = app;