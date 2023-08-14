const path = require("path");

exports.get404 = (req, res, next) => {
  const pathTo404 = path.join(__dirname, "../public/html/404.html");
  res.status(404).sendFile(pathTo404);
};
