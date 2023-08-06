require("dotenv").config();
const express = require("express");
const app = express();
const homepage = require("./routes/homepage.routes");

app.use(express.static("public"));
app.get("/", homepage);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
