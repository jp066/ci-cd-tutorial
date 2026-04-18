const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
