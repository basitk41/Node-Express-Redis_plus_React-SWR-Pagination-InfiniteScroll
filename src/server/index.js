require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());
require("./routes")(app);

const PORT = process.env.SERVER_PORT || 9000;

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});
app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
