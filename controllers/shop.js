const path = require("path");

exports.getHomePage = (req, res, next) => {
  const filePath = path.join(__dirname, "../public/html/main.html");
  console.log(filePath);
  res.sendFile(filePath);
};
