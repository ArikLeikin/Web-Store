const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../public/html/main.html");
  console.log(filePath);
  res.sendFile(filePath);
});

module.exports = router;
