require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const homepage = require("./routes/homepage");

app.use("/", homepage);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
