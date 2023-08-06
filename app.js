require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://playtopia:playtopia@webstore.svlylpv.mongodb.net/"
);

const shopRoutes = require("./routes/shop.routes");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(shopRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
