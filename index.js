const app = require("./app");
const config = require("dotenv").config;

config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
