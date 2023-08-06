require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const shopRoutes = require("./routes/shop.routes");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(shopRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
