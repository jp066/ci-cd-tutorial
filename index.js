const app = require("./app");
const config = require("dotenv").config;

config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
